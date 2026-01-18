const CHANNEL_ACCESS_TOKEN = 'YOUR_CHANNEL_ACCESS_TOKEN_HERE';
const LINE_GROUP_ID = 'YOUR_GROUP_ID_HERE'; // ❗️ เพิ่มบรรทัดนี้ และใส่ Group ID ของคุณ
// Global variable for the spreadsheet
const ss = SpreadsheetApp.getActiveSpreadsheet();
// FOLDER_NAME: โฟลเดอร์ใน Google Drive สำหรับเก็บไฟล์สลิปและรูปภาพ
const FOLDER_NAME = "Lottery_Documents"; 

const SHEETS_CONFIG = {
    'Members': ['ID', 'Username', 'Password', 'FullName', 'Phone', 'BankName', 'BankAccount', 'IdCardPhotoUrl', 'Status', 'Credit', 'Timestamp'],
    'Deposits': ['ID', 'MemberID', 'MemberName', 'Amount', 'SlipUrl', 'Status', 'Timestamp', 'Phone'],
    'Withdrawals': ['ID', 'MemberID', 'MemberName', 'Amount', 'Status', 'Timestamp', 'BankAccount', 'Phone'],
    'LotteryTypes': ['ID', 'Name', 'Description', 'Digits'],
    'Purchases': ['ID', 'MemberID', 'LotteryTypeID', 'Number', 'Amount', 'Status', 'Timestamp', 'WinningAmount', 'RoundID', 'ClaimedTimestamp'], // <-- แก้ไขที่นี่
    'BankAccounts': ['ID', 'BankName', 'AccountNumber', 'AccountName', 'QrCodeUrl', 'Status'],
    'Announcements': ['RoundID', 'AnnouncementDate', 'WinningNumbers', 'ProcessedByAdmin'], // <-- เพิ่มชีตใหม่ที่นี่
    'WinningNumbers': ['ID', 'LotteryTypeID', 'WinningNumber', 'AnnouncementDate', 'PayoutRate', 'WinningType'],
    'Admins': ['Username', 'Password']
};
/**
 * ฟังก์ชันหลักที่รันเมื่อมีการเข้าถึง Web App (HTTP GET)
 */
function doGet(e) {
  try {
    initialSetup(); // ตรวจสอบและสร้างชีต
    return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('ระบบรางวัลเลขสลากการกุศล')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } catch (error) {
    Logger.log('FATAL ERROR in doGet: ' + error.toString());
    const errorHtml = `<div style="font-family: Arial, sans-serif; padding: 20px; color: #cc0000; background: #ffeeee; border: 1px solid #cc0000; margin: 20px; border-radius: 8px;">
        <h2 style="font-size: 1.5em; margin-top: 0;">เกิดข้อผิดพลาดร้ายแรง (Fatal Error)</h2>
        <p>ไม่สามารถโหลดแอปพลิเคชันได้ ข้อผิดพลาดที่พบ: <span style="font-weight: bold; word-break: break-all;">${error.message}</span></p>
        <p style="margin-top: 15px;">โปรดตรวจสอบ Logs และสิทธิ์การเข้าถึง Google Drive</p>
      </div>`;
    return HtmlService.createHtmlOutput(errorHtml);
  }
}

/**
 * Function to get or create a sheet with headers
 */
function getSheetAndHeaders(sheetName, headers) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    if (headers && headers.length > 0) {
      sheet.appendRow(headers);
    }
  } else {
    if (sheet.getLastRow() < 1 && headers && headers.length > 0) {
       sheet.appendRow(headers);
    }
  }
  return sheet;
}

/**
 * Initial Setup for all sheets
 */
function initialSetup() {
  for (const sheetName in SHEETS_CONFIG) {
    const headers = SHEETS_CONFIG[sheetName];
    getSheetAndHeaders(sheetName, headers);
  }
  
  // ตั้งค่า Admin เริ่มต้น
  const adminSheet = getSheetAndHeaders('Admins');
  if (adminSheet.getLastRow() < 2) {
    adminSheet.appendRow(['admin', '1234']);
  }
  
  // ตั้งค่าบัญชีธนาคารเริ่มต้น
  const bankSheet = getSheetAndHeaders('BankAccounts');
  if (bankSheet.getLastRow() < 2) {
    bankSheet.appendRow(['BANK'+Date.now(), 'ธนาคารกรุงไทย', '123-456-7890', 'บัญชีโรงเรียน', 'https://placehold.co/200x200/166534/ffffff?text=QR+Code+Placeholder', 'Active']);
  }

  // ตั้งค่าประเภทรางวัลเริ่มต้น
  const lotterySheet = getSheetAndHeaders('LotteryTypes');
  if (lotterySheet.getLastRow() < 2) {
    lotterySheet.appendRow(['L2U', 'เลข 2 ตัวบน', '00-99', 2]);
    lotterySheet.appendRow(['L2L', 'เลข 2 ตัวล่าง', '00-99', 2]);
    lotterySheet.appendRow(['L3L', 'เลขชุด 3 ตัวหลัง', '000-999', 3]);
  }
}

/**
 * Function to handle file upload to a specific Drive folder
 * @param {string} base64Data - Base64 encoded string of the file.
 * @param {string} fileName - Original file name.
 * @param {string} memberId - Member ID for unique file naming.
 * @returns {string|null} URL of the saved file, or null on error.
 */
function uploadFileToDrive(base64Data, fileName, memberId) {
  try {
    let folders = DriveApp.getFoldersByName(FOLDER_NAME);
    let folder;
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(FOLDER_NAME);
    }
    
    // Decode Base64 data to Blob
    const contentType = base64Data.substring(5, base64Data.indexOf(';'));
    const bytes = Utilities.base64Decode(base64Data.substr(base64Data.indexOf('base64,') + 7));
    const blob = Utilities.newBlob(bytes, contentType, fileName);
    
    // Create file and set sharing
    const file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    return file.getUrl();
  } catch (e) {
    Logger.log("Upload Error: " + e.toString());
    return null;
  }
}


// --- User Registration ---
function registerUser(formData, fileObject) {
  try {
    const memberSheet = getSheetAndHeaders('Members');
    const data = memberSheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
      if (data[i][1] === formData.username) {
        return { success: false, message: 'ชื่อผู้ใช้งานนี้มีอยู่แล้ว' };
      }
    }

    const newId = 'MEM' + Date.now();
    let photoUrl = ''; 
    if (fileObject && fileObject.data) {
      photoUrl = uploadFileToDrive(fileObject.data, fileObject.fileName, newId);
      if (!photoUrl) {
           return { success: false, message: 'การสมัครล้มเหลว: ไม่สามารถอัปโหลดรูปบัตรประชาชนได้' };
      }
    }

    const newRow = [
      newId,
      formData.username,
      formData.password, // Password (plaintext, use HTTPS)
      formData.fullName,
      "'" + formData.phone, // Store phone as text to preserve leading zero
      formData.bankName,
      "'" + formData.bankAccount, // Store account as text
      photoUrl,
      'Pending',
      0, // Credit
      new Date().toISOString()
    ];
    memberSheet.appendRow(newRow);
    return { success: true, message: 'สมัครสมาชิกสำเร็จ! รอการอนุมัติจากผู้ดูแลระบบ' };
  } catch (e) {
    Logger.log("Registration Error: " + e.toString());
    return { success: false, message: 'เกิดข้อผิดพลาดในการสมัคร: ' + e.toString() };
  }
}

// --- User & Admin Login ---
function login(credentials) {
  try {
    const adminSheet = getSheetAndHeaders('Admins');
    const adminData = adminSheet.getDataRange().getValues();
    for (let i = 1; i < adminData.length; i++) {
      if (adminData[i][0] === credentials.username && String(adminData[i][1]) === credentials.password) {
        return { success: true, role: 'admin', message: 'เข้าสู่ระบบผู้ดูแลสำเร็จ' };
      }
    }

    const memberSheet = getSheetAndHeaders('Members');
    const memberData = memberSheet.getDataRange().getValues();

    const headers = memberData[0];
    const usernameCol = headers.indexOf('Username');
    const passwordCol = headers.indexOf('Password');
    const statusCol = headers.indexOf('Status');
    const creditCol = headers.indexOf('Credit');

    for (let i = 1; i < memberData.length; i++) {
      if (memberData[i][usernameCol] === credentials.username && memberData[i][passwordCol] === credentials.password) {
        if (memberData[i][statusCol] === 'Approved') {
          return { 
            success: true, 
            role: 'member', 
            message: 'เข้าสู่ระบบสำเร็จ', 
            memberInfo: {
              id: memberData[i][0],
              name: memberData[i][headers.indexOf('FullName')],
              credit: parseFloat(memberData[i][creditCol] || 0),
              phone: String(memberData[i][headers.indexOf('Phone')]).startsWith("'") ? String(memberData[i][headers.indexOf('Phone')]).slice(1) : memberData[i][headers.indexOf('Phone')],
              bankAccount: String(memberData[i][headers.indexOf('BankAccount')]).startsWith("'") ? String(memberData[i][headers.indexOf('BankAccount')]).slice(1) : memberData[i][headers.indexOf('BankAccount')],
            }
          };
        } else {
          return { success: false, message: 'บัญชีของคุณยังไม่ได้รับการอนุมัติ' };
        }
      }
    }
    return { success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' };
  } catch(e) {
    return { success: false, message: 'เกิดข้อผิดพลาด: ' + e.toString() };
  }
}
function requestCreditDeposit(depositInfo, fileObject) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const depositSheet = getSheetAndHeaders('Deposits');
    const newId = 'DEP' + Date.now();
    let slipUrl = 'No Slip Attached';
    if (fileObject && fileObject.data) {
       slipUrl = uploadFileToDrive(fileObject.data, fileObject.fileName, newId);
       if (!slipUrl) { throw new Error('ไม่สามารถอัปโหลดไฟล์สลิปได้'); }
    } else {
        throw new Error('ไม่พบไฟล์สลิปแนบ');
    }

    const newRow = [ newId, depositInfo.memberId, depositInfo.memberName, parseFloat(depositInfo.amount), slipUrl, 'Pending', new Date().toISOString(), "'" + depositInfo.phone ];
    depositSheet.appendRow(newRow);

    // --- REVISED: Simplified LINE Notification call ---
    const message = `
🔔 มีรายการแจ้งฝากเงิน 🔔
-------------------------
ชื่อ: ${depositInfo.memberName}
เบอร์โทร: ${depositInfo.phone}
ยอดฝาก: ${parseFloat(depositInfo.amount).toFixed(2)} บาท
-------------------------
ดูสลิป: ${slipUrl}
-------------------------
กรุณาตรวจสอบและอนุมัติในระบบ`;
    sendPushMessage(message); // <-- แก้ไขการเรียกใช้ตรงนี้

    return { success: true, message: 'ส่งคำขอเติมเครดิตสำเร็จ รอการตรวจสอบ' };
  } catch(e) {
    Logger.log("Deposit Request Error: " + e.toString());
    return { success: false, message: 'เกิดข้อผิดพลาดในการส่งคำขอ: ' + e.message };
  } finally {
    lock.releaseLock();
  }
}

// --- Admin: Approve Deposit (REVISED & MORE ROBUST) ---
function approveDeposit(depositId, memberId, amount) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000); // Increased wait time
  try {
    const depositSheet = getSheetAndHeaders('Deposits');
    const memberSheet = getSheetAndHeaders('Members');
    const depositData = depositSheet.getDataRange().getValues();
    const memberData = memberSheet.getDataRange().getValues();
    
    const depositHeaders = depositData[0];
    const depositStatusCol = depositHeaders.indexOf('Status') + 1;
    const memberHeaders = memberData[0];
    const memberIDCol = memberHeaders.indexOf('ID'); // Use 0-based index for searching
    const creditCol = memberHeaders.indexOf('Credit'); // Use 0-based index for searching

    // Robustness Check: Ensure critical columns exist
    if (depositStatusCol === 0 || memberIDCol === -1 || creditCol === -1) {
      throw new Error('Critical column not found. Check sheet headers: Status, ID, Credit.');
    }

    let depositRowIndex = -1;
    for (let i = 1; i < depositData.length; i++) {
      if (depositData[i][0] === depositId && depositData[i][depositStatusCol - 1] === 'Pending') {
        depositRowIndex = i;
        break;
      }
    }

    if (depositRowIndex === -1) { 
      return { success: false, message: 'ไม่พบรายการเติมเงินที่รออนุมัติ หรือรายการนี้ถูกจัดการไปแล้ว' };
    }

    let memberFound = false;
    for (let i = 1; i < memberData.length; i++) {
      if (memberData[i][memberIDCol] === memberId) {
        const currentCredit = parseFloat(memberData[i][creditCol] || 0);
        const newCredit = currentCredit + parseFloat(amount);
        
        // Update credit in Members sheet
        memberSheet.getRange(i + 1, creditCol + 1).setValue(newCredit);
        
        // Update status in Deposits sheet ONLY after successful credit update
        depositSheet.getRange(depositRowIndex + 1, depositStatusCol).setValue('Approved');
        
        memberFound = true;
        return { success: true, message: `อนุมัติการเติมเงิน ${amount} บาท และอัปเดตเครดิตสำเร็จ`, newCredit: newCredit };
      }
    }
    
    // If loop finishes and member was not found
    if (!memberFound) {
      depositSheet.getRange(depositRowIndex + 1, depositStatusCol).setValue('Error: Member Not Found');
      return { success: false, message: 'อนุมัติการเติมเงินล้มเหลว: ไม่พบสมาชิก ID: ' + memberId };
    }

  } catch (e) {
    Logger.log("Approve Deposit Error: " + e.toString());
    return { success: false, message: 'เกิดข้อผิดพลาดร้ายแรง: ' + e.message };
  } finally {
    lock.releaseLock();
  }
}

// --- Admin: Get Pending Deposits (FIXED) ---
function getPendingDeposits() {
  try {
    const sheet = getSheetAndHeaders('Deposits');
    if (sheet.getLastRow() < 2) return [];
    const data = sheet.getDataRange().getValues();
    const headers = data.shift(); // Get headers to find column index
    const statusCol = headers.indexOf('Status');

    if (statusCol === -1) {
      Logger.log("Critical Error: 'Status' column not found in 'Deposits' sheet.");
      return [];
    }

    // FIX: Filter by status column index correctly
    const pending = data.filter(row => row[statusCol] === 'Pending');
    
    return pending.map(row => ({
      id: row[headers.indexOf('ID')],
      memberId: row[headers.indexOf('MemberID')],
      memberName: row[headers.indexOf('MemberName')],
      amount: parseFloat(row[headers.indexOf('Amount')]),
      slipUrl: row[headers.indexOf('SlipUrl')],
      status: row[headers.indexOf('Status')],
      timestamp: row[headers.indexOf('Timestamp')],
      phone: String(row[headers.indexOf('Phone')] || '').startsWith("'") ? String(row[headers.indexOf('Phone')] || '').slice(1) : row[headers.indexOf('Phone')]
    }));
  } catch(e) {
    Logger.log("Error in getPendingDeposits: " + e.toString());
    return [];
  }
}
// --- Dummy/Placeholder Functions for Admin & Member features ---

function getAllMembers() {
  try {
    const sheet = getSheetAndHeaders('Members');
    if (sheet.getLastRow() < 2) return [];
    const data = sheet.getDataRange().getValues();
    data.shift(); 
    const filteredData = data.filter(row => row[0] && row[0] !== ""); 
    const headers = SHEETS_CONFIG.Members;
    const creditCol = headers.indexOf('Credit');

    return filteredData.map(row => ({
      id: row[0],
      username: row[1],
      fullName: row[3],
      phone: String(row[4]).startsWith("'") ? String(row[4]).slice(1) : row[4],
      bankName: row[5],
      bankAccount: String(row[6]).startsWith("'") ? String(row[6]).slice(1) : row[6],
      idCardPhotoUrl: row[7],
      status: row[8],
      credit: parseFloat(row[creditCol] || 0),
      timestamp: row[10]
    }));
  } catch (e) {
    Logger.log("Error in getAllMembers: " + e.toString());
    return []; 
  }
}
/**
 * (NEW) Approves a member by changing their status from 'Pending' to 'Approved'.
 * @param {string} memberId - The ID of the member to approve.
 * @returns {Object} A result object with success status and message.
 */
function approveMember(memberId) {
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
        const memberSheet = getSheetAndHeaders('Members');
        const data = memberSheet.getDataRange().getValues();
        const headers = data[0];
        const idCol = headers.indexOf('ID');
        const statusCol = headers.indexOf('Status');

        for (let i = 1; i < data.length; i++) {
            if (data[i][idCol] === memberId) {
                if (data[i][statusCol] === 'Pending') {
                    memberSheet.getRange(i + 1, statusCol + 1).setValue('Approved');
                    return { success: true, message: 'อนุมัติสมาชิกเรียบร้อยแล้ว' };
                } else {
                    return { success: false, message: 'สมาชิกคนนี้ไม่อยู่ในสถานะรออนุมัติ' };
                }
            }
        }
        return { success: false, message: 'ไม่พบข้อมูลสมาชิก' };
    } catch (e) {
        Logger.log("Approve Member Error: " + e.toString());
        return { success: false, message: 'เกิดข้อผิดพลาด: ' + e.message };
    } finally {
        lock.releaseLock();
    }
}
function getLotteryTypes() { 
  const sheet = getSheetAndHeaders('LotteryTypes');
  if (sheet.getLastRow() < 2) return [];
  const data = sheet.getDataRange().getValues();
  data.shift();
  return data.map(row => ({ id: row[0], name: row[1], description: row[2], digits: row[3] }));
}
/**
 * (NEW) Adds or updates a lottery type.
 * If typeInfo.id is provided, it updates. Otherwise, it adds a new one.
 */
function updateLotteryType(typeInfo) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheetAndHeaders('LotteryTypes');
    const data = sheet.getDataRange().getValues();
    
    // Basic validation
    if (!typeInfo.name || !typeInfo.description || !typeInfo.digits) {
      throw new Error("กรุณากรอกข้อมูลให้ครบถ้วน: Name, Description, Digits");
    }
    
    if (typeInfo.id) {
      // --- EDIT LOGIC ---
      let rowIndex = -1;
      for (let i = 1; i < data.length; i++) {
        if (data[i][0] === typeInfo.id) {
          rowIndex = i + 1;
          break;
        }
      }
      
      if (rowIndex !== -1) {
        // Update Name, Description, Digits
        sheet.getRange(rowIndex, 2, 1, 3).setValues([[
          typeInfo.name,
          typeInfo.description,
          typeInfo.digits
        ]]);
        return { success: true, message: 'แก้ไขประเภทสลากสำเร็จ' };
      } else {
        throw new Error('ไม่พบประเภทสลากที่ต้องการแก้ไข');
      }
    } else {
      // --- ADD LOGIC ---
      // Generate a new ID, e.g., L3F (Lottery 3 Front), L6 (Lottery 6 digits)
      const newId = (typeInfo.name || 'L').substring(0, 2).toUpperCase() + (typeInfo.digits || 'X') + Date.now().toString().slice(-3);
      const newRow = [
        newId,
        typeInfo.name,
        typeInfo.description,
        typeInfo.digits
      ];
      sheet.appendRow(newRow);
      return { success: true, message: 'เพิ่มประเภทสลากใหม่สำเร็จ' };
    }
  } catch (e) {
    Logger.log("Update Lottery Type Error: " + e.toString());
    return { success: false, message: 'เกิดข้อผิดพลาด: ' + e.message };
  } finally {
    lock.releaseLock();
  }
}

/**
 * (NEW) Deletes a lottery type by its ID.
 */
function deleteLotteryType(typeId) {
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
        const sheet = getSheetAndHeaders('LotteryTypes');
        const data = sheet.getRange(2, 1, sheet.getLastRow(), 1).getValues();
        let rowIndexToDelete = -1;

        for (let i = 0; i < data.length; i++) {
            if (data[i][0] === typeId) {
                rowIndexToDelete = i + 2;
                break;
            }
        }
        
        if (rowIndexToDelete !== -1) {
            sheet.deleteRow(rowIndexToDelete);
            return { success: true, message: 'ลบประเภทสลากสำเร็จ' };
        } else {
            return { success: false, message: 'ไม่พบประเภทสลากที่ต้องการลบ' };
        }
    } catch (e) {
        Logger.log("Delete Lottery Type Error: " + e.toString());
        return { success: false, message: 'เกิดข้อผิดพลาด: ' + e.message };
    } finally {
        lock.releaseLock();
    }
}
function getBankAccounts(forAdmin = false) { // Add a parameter
  try {
    const sheet = getSheetAndHeaders('BankAccounts');
    if (sheet.getLastRow() < 2) return [];
    
    const data = sheet.getDataRange().getValues();
    data.shift(); // Remove headers
    
    let accounts = data.map(row => ({ 
        id: row[0], 
        bankName: row[1], 
        accountNumber: row[2], 
        accountName: row[3], 
        qrCodeUrl: row[4], 
        status: row[5] 
    }));

    if (forAdmin) {
        // For admin, return all accounts
        return accounts;
    } else {
        // For members (deposit page), return only the active account
        return accounts.filter(acc => acc.status === 'Active');
    }
  } catch(e) { 
    Logger.log("Error in getBankAccounts: " + e.toString());
    return [];
  }
}

/**
 * Records multiple lottery purchases from a bet slip array.
 * @param {Array<Object>} purchases - An array of purchase objects {lotteryTypeId, number, amount}.
 * @param {string} memberId - The ID of the member making the purchase.
 * @returns {Object} A result object with success status, message, and new credit.
 */
function recordPurchases(purchases, memberId) {
  if (!purchases || purchases.length === 0) {
    return { success: false, message: 'ไม่มีรายการซื้อ' };
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(15000);

  try {
    const memberSheet = getSheetAndHeaders('Members');
    const purchaseSheet = getSheetAndHeaders('Purchases');
    
    const memberData = memberSheet.getDataRange().getValues();
    const memberHeaders = memberData[0];
    const memberIdCol = memberHeaders.indexOf('ID');
    const creditCol = memberHeaders.indexOf('Credit');

    if (memberIdCol === -1 || creditCol === -1) {
      throw new Error("ไม่พบคอลัมน์ 'ID' หรือ 'Credit' ในชีต Members");
    }

    let memberRowIndex = -1;
    for (let i = 1; i < memberData.length; i++) {
      if (memberData[i][memberIdCol] === memberId) {
        memberRowIndex = i;
        break;
      }
    }

    if (memberRowIndex === -1) {
      return { success: false, message: 'ไม่พบข้อมูลสมาชิก' };
    }

    const currentCredit = parseFloat(memberData[memberRowIndex][creditCol] || 0);
    const totalCost = purchases.reduce((sum, p) => sum + parseFloat(p.amount), 0);

    if (currentCredit < totalCost) {
      return { success: false, message: 'เครดิตไม่เพียงพอ (ต้องการ ' + totalCost.toFixed(2) + ' บาท)' };
    }

    const newCredit = currentCredit - totalCost;
    
    // Update member's credit first
    memberSheet.getRange(memberRowIndex + 1, creditCol + 1).setValue(newCredit);

    // Record all purchases
    const rowsToAppend = purchases.map(p => {
      const newId = 'PUR' + Date.now() + Math.random().toString(36).substring(2, 7);
      return [
        newId,
        memberId,
        p.lotteryTypeId,
        "'" + p.number,
        parseFloat(p.amount),
        'Pending', // Status: Pending for winner announcement
        new Date().toISOString(),
        0 // WinningAmount
      ];
    });
    
    purchaseSheet.getRange(purchaseSheet.getLastRow() + 1, 1, rowsToAppend.length, rowsToAppend[0].length).setValues(rowsToAppend);

    return { success: true, message: 'บันทึกการซื้อสำเร็จ!', newCredit: newCredit };

  } catch (e) {
    Logger.log("Purchase Error: " + e.toString());
    return { success: false, message: 'เกิดข้อผิดพลาดในการบันทึก: ' + e.message };
  } finally {
    lock.releaseLock();
  }
}
function requestWithdrawal(withdrawalData) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    // ... (ส่วนการตรวจสอบข้อมูลสมาชิกเหมือนเดิม) ...
    const { memberId, amount } = withdrawalData;
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) { return { success: false, message: 'จำนวนเงินถอนไม่ถูกต้อง' }; }
    const memberSheet = getSheetAndHeaders('Members');
    const memberData = memberSheet.getDataRange().getValues();
    const headers = memberData[0];
    const idCol = headers.indexOf('ID');
    const creditCol = headers.indexOf('Credit');
    const nameCol = headers.indexOf('FullName');
    const bankNameCol = headers.indexOf('BankName');
    const bankAccCol = headers.indexOf('BankAccount');
    const phoneCol = headers.indexOf('Phone');
    let memberRow = null;
    for(let i = 1; i < memberData.length; i++) {
        if (memberData[i][idCol] === memberId) {
            memberRow = memberData[i];
            break;
        }
    }
    if (!memberRow) { return { success: false, message: 'ไม่พบข้อมูลสมาชิก' }; }
    const currentCredit = parseFloat(memberRow[creditCol] || 0);
    if (currentCredit < numericAmount) { return { success: false, message: 'เครดิตคงเหลือไม่เพียงพอ' }; }

    const withdrawalSheet = getSheetAndHeaders('Withdrawals');
    const newId = 'WTH' + Date.now();
    const bankAccount = String(memberRow[bankAccCol]).startsWith("'") ? String(memberRow[bankAccCol]).slice(1) : memberRow[bankAccCol];
    const phone = String(memberRow[phoneCol]).startsWith("'") ? String(memberRow[phoneCol]).slice(1) : memberRow[phoneCol];
    const bankName = memberRow[bankNameCol];
    const newRow = [ newId, memberId, memberRow[nameCol], numericAmount, 'Pending', new Date().toISOString(), bankAccount, phone ];
    withdrawalSheet.appendRow(newRow);

    // --- REVISED: Simplified LINE Notification call ---
    const message = `
💸 มีรายการแจ้งถอนเงิน 💸
-------------------------
ชื่อ: ${memberRow[nameCol]}
เบอร์โทร: ${phone}
ธนาคาร: ${bankName}
เลขบัญชี: ${bankAccount}
ยอดถอน: ${numericAmount.toFixed(2)} บาท
-------------------------
กรุณาตรวจสอบและอนุมัติในระบบ`;
    sendPushMessage(message); // <-- แก้ไขการเรียกใช้ตรงนี้

    return { success: true, message: 'ส่งคำขอถอนเงินสำเร็จ! กรุณารอผู้ดูแลระบบตรวจสอบ' };
  } catch (e) {
    Logger.log("Withdrawal Request Error: " + e.toString());
    return { success: false, message: 'เกิดข้อผิดพลาด: ' + e.message };
  } finally {
    lock.releaseLock();
  }
}
// --- Member: Get Transaction History (FULLY IMPLEMENTED) ---
function getMemberHistory(memberId) {
  try {
    const depositsSheet = getSheetAndHeaders('Deposits');
    const withdrawalsSheet = getSheetAndHeaders('Withdrawals');
    
    let history = [];

    // Get Deposits
    if (depositsSheet.getLastRow() > 1) {
      const depositData = depositsSheet.getRange(2, 1, depositsSheet.getLastRow() - 1, depositsSheet.getLastColumn()).getValues();
      const userDeposits = depositData.filter(row => row[1] === memberId);
      userDeposits.forEach(row => {
        history.push({
          Type: 'Deposit',
          Timestamp: row[6],
          Amount: row[3],
          Status: row[5],
          SlipUrl: row[4]
        });
      });
    }

    // Get Withdrawals
    if (withdrawalsSheet.getLastRow() > 1) {
      const withdrawalData = withdrawalsSheet.getRange(2, 1, withdrawalsSheet.getLastRow() - 1, withdrawalsSheet.getLastColumn()).getValues();
      const userWithdrawals = withdrawalData.filter(row => row[1] === memberId);
      userWithdrawals.forEach(row => {
        history.push({
          Type: 'Withdrawal',
          Timestamp: row[5],
          Amount: row[3],
          Status: row[4],
          SlipUrl: null // Withdrawals don't have slips
        });
      });
    }

    // Sort by date, newest first
    history.sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp));
    
    return history;
  } catch(e) {
    Logger.log("Error in getMemberHistory: " + e.toString());
    return []; // Return empty on error
  }
}

// --- Admin: Get Pending Withdrawals (REVISED TO INCLUDE FULL MEMBER DETAILS) ---
function getPendingWithdrawals() {
  try {
    const withdrawalSheet = getSheetAndHeaders('Withdrawals');
    if (withdrawalSheet.getLastRow() < 2) return [];
    
    const memberSheet = getSheetAndHeaders('Members');
    const memberData = memberSheet.getRange(2, 1, memberSheet.getLastRow() - 1, memberSheet.getLastColumn()).getValues();
    const mHeaders = memberSheet.getRange(1, 1, 1, memberSheet.getLastColumn()).getValues()[0];
    
    // Create a map of members for easy lookup
    const mIdCol = mHeaders.indexOf('ID');
    const mPhoneCol = mHeaders.indexOf('Phone');
    const mBankNameCol = mHeaders.indexOf('BankName');
    const membersMap = new Map();
    memberData.forEach(m => {
        membersMap.set(m[mIdCol], {
            phone: String(m[mPhoneCol] || '').startsWith("'") ? String(m[mPhoneCol]).slice(1) : m[mPhoneCol],
            bankName: m[mBankNameCol] || 'N/A'
        });
    });

    const data = withdrawalSheet.getDataRange().getValues();
    const headers = data.shift();
    const statusCol = headers.indexOf('Status');
    
    const pending = data.filter(row => row[statusCol] === 'Pending');
    
    return pending.map(row => {
      const memberId = row[headers.indexOf('MemberID')];
      const memberDetails = membersMap.get(memberId) || { phone: 'ไม่พบ', bankName: 'ไม่พบ' };

      return {
        id: row[headers.indexOf('ID')],
        memberId: memberId,
        memberName: row[headers.indexOf('MemberName')],
        amount: parseFloat(row[headers.indexOf('Amount')]),
        status: row[headers.indexOf('Status')],
        timestamp: row[headers.indexOf('Timestamp')],
        bankAccount: row[headers.indexOf('BankAccount')],
        phone: memberDetails.phone, // Data from Members sheet
        bankName: memberDetails.bankName // Data from Members sheet
      };
    });
  } catch(e) {
    Logger.log("Error in getPendingWithdrawals: " + e.toString());
    return [];
  }
}
/**
 * (REVISED & FULLY IMPLEMENTED) Adds or updates a bank account.
 * If bankInfo.id is provided, it updates. Otherwise, it adds a new one.
 */
function updateBankAccount(bankInfo) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheetAndHeaders('BankAccounts');
    const data = sheet.getDataRange().getValues();
    
    if (bankInfo.id) {
      // --- EDIT LOGIC ---
      let rowIndex = -1;
      for (let i = 1; i < data.length; i++) {
        if (data[i][0] === bankInfo.id) {
          rowIndex = i + 1; // Sheet range is 1-based
          break;
        }
      }
      
      if (rowIndex !== -1) {
        sheet.getRange(rowIndex, 2, 1, 5).setValues([[
          bankInfo.bankName,
          bankInfo.accountNumber,
          bankInfo.accountName,
          bankInfo.qrCodeUrl,
          'Active'
        ]]);
        return { success: true, message: 'แก้ไขข้อมูลบัญชีสำเร็จ' };
      } else {
        throw new Error('ไม่พบบัญชีที่ต้องการแก้ไข');
      }
    } else {
      // --- ADD LOGIC ---
      const newId = 'BANK' + Date.now();
      const newRow = [
        newId,
        bankInfo.bankName,
        bankInfo.accountNumber,
        bankInfo.accountName,
        bankInfo.qrCodeUrl,
        'Active'
      ];
      sheet.appendRow(newRow);
      return { success: true, message: 'เพิ่มบัญชีใหม่สำเร็จ' };
    }
  } catch (e) {
    Logger.log("Update Bank Account Error: " + e.toString());
    return { success: false, message: 'เกิดข้อผิดพลาด: ' + e.message };
  } finally {
    lock.releaseLock();
  }
}

/**
 * (NEW) Deletes a bank account by its ID.
 */
function deleteBankAccount(bankId) {
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
        const sheet = getSheetAndHeaders('BankAccounts');
        const data = sheet.getRange(2, 1, sheet.getLastRow(), 1).getValues(); // Get only IDs
        let rowIndexToDelete = -1;

        for (let i = 0; i < data.length; i++) {
            if (data[i][0] === bankId) {
                rowIndexToDelete = i + 2; // +2 because data starts from row 2
                break;
            }
        }
        
        if (rowIndexToDelete !== -1) {
            sheet.deleteRow(rowIndexToDelete);
            return { success: true, message: 'ลบบัญชีสำเร็จ' };
        } else {
            return { success: false, message: 'ไม่พบบัญชีที่ต้องการลบ' };
        }
    } catch (e) {
        Logger.log("Delete Bank Account Error: " + e.toString());
        return { success: false, message: 'เกิดข้อผิดพลาด: ' + e.message };
    } finally {
        lock.releaseLock();
    }
}

// --- Admin: Approve a Withdrawal (FULLY IMPLEMENTED) ---
function approveWithdrawal(withdrawalId, memberId, amount) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const withdrawalSheet = getSheetAndHeaders('Withdrawals');
    const withdrawalData = withdrawalSheet.getDataRange().getValues();
    const wHeaders = withdrawalData[0];
    const wIdCol = wHeaders.indexOf('ID');
    const wStatusCol = wHeaders.indexOf('Status');

    let withdrawalRowIndex = -1;
    for (let i = 1; i < withdrawalData.length; i++) {
      if (withdrawalData[i][wIdCol] === withdrawalId) {
        if (withdrawalData[i][wStatusCol] !== 'Pending') {
          return { success: false, message: 'รายการนี้ถูกจัดการไปแล้ว' };
        }
        withdrawalRowIndex = i;
        break;
      }
    }

    if (withdrawalRowIndex === -1) {
      return { success: false, message: 'ไม่พบรายการที่ต้องการอนุมัติ' };
    }

    const memberSheet = getSheetAndHeaders('Members');
    const memberData = memberSheet.getDataRange().getValues();
    const mHeaders = memberData[0];
    const mIdCol = mHeaders.indexOf('ID');
    const mCreditCol = mHeaders.indexOf('Credit');
    let memberRowIndex = -1;

    for (let i = 1; i < memberData.length; i++) {
      if (memberData[i][mIdCol] === memberId) {
        memberRowIndex = i;
        break;
      }
    }

    if (memberRowIndex === -1) {
      return { success: false, message: 'ไม่พบข้อมูลสมาชิกเพื่อหักเครดิต' };
    }

    const numericAmount = parseFloat(amount);
    const currentCredit = parseFloat(memberData[memberRowIndex][mCreditCol] || 0);

    if (currentCredit < numericAmount) {
      withdrawalSheet.getRange(withdrawalRowIndex + 1, wStatusCol + 1).setValue('Rejected');
      return { success: false, message: `ไม่อนุมัติ: เครดิตสมาชิกไม่พอ (คงเหลือ ${currentCredit.toFixed(2)})` };
    }

    // หักเครดิตสมาชิก
    const newCredit = currentCredit - numericAmount;
    memberSheet.getRange(memberRowIndex + 1, mCreditCol + 1).setValue(newCredit);
    
    // อัปเดตสถานะการถอนเป็น 'Approved'
    withdrawalSheet.getRange(withdrawalRowIndex + 1, wStatusCol + 1).setValue('Approved');
    
    return { success: true, message: 'อนุมัติการถอนเงินและหักเครดิตเรียบร้อยแล้ว' };

  } catch (e) {
    Logger.log("Approve Withdrawal Error: " + e.toString());
    return { success: false, message: 'เกิดข้อผิดพลาด: ' + e.message };
  } finally {
    lock.releaseLock();
  }
}

/**
 * (FULLY IMPLEMENTED) Generates a summary report of all members' spending and winnings.
 * @returns {Object} An object containing summary totals and detailed data for each member.
 */
function getMemberReport() {
  try {
    const memberSheet = getSheetAndHeaders('Members');
    const purchaseSheet = getSheetAndHeaders('Purchases');

    if (memberSheet.getLastRow() < 2) {
      return { summary: { totalSpent: 0, totalWinnings: 0 }, members: [] };
    }

    // --- Read data into memory for fast processing ---
    const memberData = memberSheet.getRange(2, 1, memberSheet.getLastRow() - 1, memberSheet.getLastColumn()).getValues();
    const mHeaders = memberSheet.getRange(1, 1, 1, memberSheet.getLastColumn()).getValues()[0];
    
    const purchaseData = purchaseSheet.getLastRow() > 1 ?
                         purchaseSheet.getRange(2, 1, purchaseSheet.getLastRow() - 1, purchaseSheet.getLastColumn()).getValues() :
                         [];
    const pHeaders = purchaseSheet.getLastRow() > 1 ?
                         purchaseSheet.getRange(1, 1, 1, purchaseSheet.getLastColumn()).getValues()[0] :
                         [];

    // --- Create a map for quick lookups ---
    const purchaseMap = new Map();
    if (purchaseData.length > 0) {
        const pMemberIdCol = pHeaders.indexOf('MemberID');
        const pAmountCol = pHeaders.indexOf('Amount');
        const pWinningAmountCol = pHeaders.indexOf('WinningAmount');
        
        purchaseData.forEach(p => {
            const memberId = p[pMemberIdCol];
            if (!purchaseMap.has(memberId)) {
                purchaseMap.set(memberId, { totalSpent: 0, totalWinnings: 0 });
            }
            const stats = purchaseMap.get(memberId);
            stats.totalSpent += parseFloat(p[pAmountCol] || 0);
            stats.totalWinnings += parseFloat(p[pWinningAmountCol] || 0);
        });
    }

    // --- Process member data ---
    const mIdCol = mHeaders.indexOf('ID');
    const mFullNameCol = mHeaders.indexOf('FullName');
    const mPhoneCol = mHeaders.indexOf('Phone');
    const mBankAccCol = mHeaders.indexOf('BankAccount');

    const memberDetails = memberData.map(m => {
        const memberId = m[mIdCol];
        const stats = purchaseMap.get(memberId) || { totalSpent: 0, totalWinnings: 0 };
        const phone = String(m[mPhoneCol]).startsWith("'") ? String(m[mPhoneCol]).slice(1) : m[mPhoneCol];
        const bankAcc = String(m[mBankAccCol]).startsWith("'") ? String(m[mBankAccCol]).slice(1) : m[mBankAccCol];
        
        return {
            FullName: m[mFullNameCol],
            Phone: phone,
            BankAcc: bankAcc,
            TotalSpent: stats.totalSpent,
            TotalWinnings: stats.totalWinnings
        };
    });

    // --- Calculate overall summary ---
    const summary = {
        totalSpent: memberDetails.reduce((sum, m) => sum + m.TotalSpent, 0),
        totalWinnings: memberDetails.reduce((sum, m) => sum + m.TotalWinnings, 0)
    };
    
    return { summary: summary, members: memberDetails };

  } catch (e) {
    Logger.log("getMemberReport Error: " + e.toString());
    // Return empty structure on error
    return { summary: { totalSpent: 0, totalWinnings: 0 }, members: [] };
  }
}
// =================================================================
// REVISED & NEW FUNCTIONS FOR ROUND-BASED WINNINGS & CLAIMS
// =================================================================

/**
 * (REVISED) Processes winning numbers, logs the announcement, and updates purchase records
 * without paying out credit directly.
 */
function announceWinners(winningNumbers) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const PAYOUT_RATES = { 'L2U': 90, 'L2L': 90, 'L3L': 500 };

    const purchaseSheet = getSheetAndHeaders('Purchases');
    if (purchaseSheet.getLastRow() < 2) {
      return { success: true, message: 'ไม่พบรายการซื้อที่ต้องตรวจ' };
    }
    
    // Create a new announcement round
    const roundId = 'RND' + Date.now();
    const announcementSheet = getSheetAndHeaders('Announcements', SHEETS_CONFIG.Announcements);
    announcementSheet.appendRow([
        roundId,
        new Date().toISOString(),
        JSON.stringify(winningNumbers),
        'ADMIN' // Placeholder for admin user who processed
    ]);

    const purchaseRange = purchaseSheet.getRange(2, 1, purchaseSheet.getLastRow() - 1, purchaseSheet.getLastColumn());
    const purchaseValues = purchaseRange.getValues();
    const pHeaders = purchaseSheet.getRange(1, 1, 1, purchaseSheet.getLastColumn()).getValues()[0];
    
    const pTypeIdCol = pHeaders.indexOf('LotteryTypeID');
    const pNumberCol = pHeaders.indexOf('Number');
    const pAmountCol = pHeaders.indexOf('Amount');
    const pStatusCol = pHeaders.indexOf('Status');
    const pWinningAmountCol = pHeaders.indexOf('WinningAmount');
    const pRoundIdCol = pHeaders.indexOf('RoundID');

    let winnersFound = 0;
    purchaseValues.forEach(row => {
      if (row[pStatusCol] === 'Pending') {
        const typeId = row[pTypeIdCol];
        const number = String(row[pNumberCol]).replace("'", "");
        const amount = parseFloat(row[pAmountCol]);
        const winningNumber = winningNumbers[typeId];

        row[pRoundIdCol] = roundId; // Assign round ID to every processed purchase

        if (winningNumber && number === winningNumber) {
          const payoutRate = PAYOUT_RATES[typeId] || 0;
          row[pWinningAmountCol] = amount * payoutRate;
          row[pStatusCol] = 'Won';
          winnersFound++;
        } else {
          row[pWinningAmountCol] = 0;
          row[pStatusCol] = 'Lost';
        }
      }
    });

    purchaseRange.setValues(purchaseValues);
    return { success: true, message: `ประกาศผลสำเร็จ! กำหนดผลให้กับการซื้อที่รอดำเนินการเรียบร้อยแล้ว พบผู้ชนะ ${winnersFound} รายการ` };

  } catch (e) {
    Logger.log("Announce Winners Error: " + e.toString());
    return { success: false, message: 'เกิดข้อผิดพลาด: ' + e.message };
  } finally {
    lock.releaseLock();
  }
}
/**
 * (REVISED & MORE ROBUST) Gets purchase history and joins it with announcement data.
 */
function getMemberPurchaseHistory(memberId) {
  try {
    const purchaseSheet = getSheetAndHeaders('Purchases');
    const typesSheet = getSheetAndHeaders('LotteryTypes');
    const announcementsSheet = getSheetAndHeaders('Announcements');

    if (purchaseSheet.getLastRow() < 2) return [];

    // Create lookup maps for performance
    const typesMap = new Map(typesSheet.getRange(2, 1, typesSheet.getLastRow() - 1, 2).getValues().map(row => [row[0], row[1]]));
    
    // --- ✨ FIX STARTS HERE: Make Announcement lookup more robust ---
    const announcementsMap = new Map();
    if (announcementsSheet.getLastRow() > 1) {
        announcementsSheet.getRange(2, 1, announcementsSheet.getLastRow() - 1, 3).getValues().forEach(row => {
            try {
                // Only parse if there is valid data in the cell
                if (row[0] && row[2]) {
                    announcementsMap.set(row[0], JSON.parse(row[2]));
                }
            } catch (e) {
                Logger.log(`Could not parse JSON for Announcement Round ID ${row[0]}`);
            }
        });
    }
    // --- ✨ FIX ENDS HERE ---

    const data = purchaseSheet.getDataRange().getValues();
    const headers = data.shift();
    const memberIdCol = headers.indexOf('MemberID');

    const history = data
      .filter(row => {
        return String(row[memberIdCol] || '').trim() === String(memberId || '').trim();
      })
      .map(row => {
        const rowData = {};
        headers.forEach((header, i) => rowData[header] = row[i]);
        
        const typeId = rowData.LotteryTypeID;
        const roundId = rowData.RoundID;
        const winningNumbers = announcementsMap.get(roundId) || {};

        return {
          PurchaseId: rowData.ID,
          Timestamp: rowData.Timestamp,
          LotteryType: typesMap.get(typeId) || typeId,
          Number: String(rowData.Number).replace("'", ""),
          CreditSpent: parseFloat(rowData.Amount || 0),
          WinningAmount: parseFloat(rowData.WinningAmount || 0),
          Status: rowData.Status,
          AnnouncedNumber: winningNumbers[typeId] || null,
          ClaimedTimestamp: rowData.ClaimedTimestamp || null
        };
      });

    return history.sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp));
  } catch (e) {
    Logger.log("Error in getMemberPurchaseHistory: " + e.toString() + " at line " + e.lineNumber);
    return [];
  }
}

/**
 * (NEW) Allows a member to claim their winnings for a specific purchase.
 */
function claimWinnings(purchaseId, memberId) {
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
        const purchaseSheet = getSheetAndHeaders('Purchases');
        const pRange = purchaseSheet.getDataRange();
        const pValues = pRange.getValues();
        const pHeaders = pValues.shift();

        const pIdCol = pHeaders.indexOf('ID');
        const pMemberIdCol = pHeaders.indexOf('MemberID');
        const pStatusCol = pHeaders.indexOf('Status');
        const pWinningAmountCol = pHeaders.indexOf('WinningAmount');
        const pClaimedCol = pHeaders.indexOf('ClaimedTimestamp');

        let purchaseRowIndex = -1;
        for (let i = 0; i < pValues.length; i++) {
            if (pValues[i][pIdCol] === purchaseId) {
                purchaseRowIndex = i;
                break;
            }
        }
        
        if (purchaseRowIndex === -1) throw new Error("ไม่พบรายการซื้อ");
        
        const purchase = pValues[purchaseRowIndex];
        if (purchase[pMemberIdCol] !== memberId) throw new Error("ไม่มีสิทธิ์รับรางวัลนี้");
        if (purchase[pStatusCol] !== 'Won') throw new Error("รายการนี้ไม่ถูกรางวัล");
        if (purchase[pClaimedCol]) throw new Error("รับรางวัลนี้ไปแล้ว");

        const winningAmount = parseFloat(purchase[pWinningAmountCol]);
        if (winningAmount <= 0) throw new Error("ไม่มียอดเงินรางวัลให้รับ");

        // Add credit to member
        const memberSheet = getSheetAndHeaders('Members');
        const mRange = memberSheet.getDataRange();
        const mValues = mRange.getValues();
        const mHeaders = mValues.shift();
        const mIdCol = mHeaders.indexOf('ID');
        const mCreditCol = mHeaders.indexOf('Credit');

        let memberRowIndex = -1;
        for (let i = 0; i < mValues.length; i++) {
            if (mValues[i][mIdCol] === memberId) {
                memberRowIndex = i;
                break;
            }
        }

        if (memberRowIndex === -1) throw new Error("ไม่พบข้อมูลสมาชิก");

        const currentCredit = parseFloat(mValues[memberRowIndex][mCreditCol] || 0);
        const newCredit = currentCredit + winningAmount;
        mValues[memberRowIndex][mCreditCol] = newCredit;

        // Update purchase status to claimed
        pValues[purchaseRowIndex][pClaimedCol] = new Date().toISOString();

        // Batch write updates
        mRange.offset(1, 0, mValues.length).setValues(mValues);
        pRange.offset(1, 0, pValues.length).setValues(pValues);

        return { success: true, message: `รับรางวัลสำเร็จ! เครดิตของคุณคือ ${newCredit.toFixed(2)} บาท`, newCredit: newCredit };

    } catch (e) {
        Logger.log("Claim Winnings Error: " + e.toString());
        return { success: false, message: e.message };
    } finally {
        lock.releaseLock();
    }
}

/**
 * (NEW) Gets past announcement rounds for the admin page.
 */
function getPastAnnouncements() {
    try {
        const sheet = getSheetAndHeaders('Announcements');
        if (sheet.getLastRow() < 2) return [];
        const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
        
        return data.map(row => ({
            roundId: row[0],
            date: row[1],
            numbers: JSON.parse(row[2])
        })).sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (e) {
        return [];
    }
}
// =================================================================


/**
 * (REVISED) Sends a push message to a pre-configured group using the Messaging API.
 * @param {string} messageText - The text message to be sent.
 */
function sendPushMessage(messageText) {
  if (!CHANNEL_ACCESS_TOKEN || CHANNEL_ACCESS_TOKEN === 'YOUR_CHANNEL_ACCESS_TOKEN_HERE') {
    Logger.log('Channel Access Token is not set. Skipping notification.');
    return;
  }
  if (!LINE_GROUP_ID || LINE_GROUP_ID === 'YOUR_GROUP_ID_HERE') {
    Logger.log('Group ID is not set. Skipping notification.');
    return;
  }

  const url = 'https://api.line.me/v2/bot/message/push';
  const payload = {
    'to': LINE_GROUP_ID, // <-- ใช้ ID จากตัวแปรส่วนกลาง
    'messages': [{
      'type': 'text',
      'text': messageText
    }]
  };
  
  const options = {
    'method': 'post',
    'contentType': 'application/json',
    'headers': {
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
    },
    'payload': JSON.stringify(payload),
    'muteHttpExceptions': true
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    Logger.log('Messaging API response: ' + response.getContentText());
  } catch (e) {
    Logger.log('Error sending Messaging API push message: ' + e.toString());
  }
}
/**
 * (NEW) Sets a specific bank account as 'Active' and all others as 'Inactive'.
 * @param {string} bankId - The ID of the bank account to activate.
 * @returns {Object} A result object with success status and message.
 */
function setActiveBankAccount(bankId) {
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
        const sheet = getSheetAndHeaders('BankAccounts');
        if (sheet.getLastRow() < 2) {
            throw new Error('No bank accounts found.');
        }

        const range = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn());
        const values = range.getValues();
        const idCol = 0;
        const statusCol = 5; // Column F is index 5

        let found = false;
        // First, set all to Inactive, then set the chosen one to Active
        values.forEach(row => {
            row[statusCol] = 'Inactive'; // Set all to inactive first
        });
        
        values.forEach(row => {
            if (row[idCol] === bankId) {
                row[statusCol] = 'Active';
                found = true;
            }
        });

        if (!found) {
            return { success: false, message: 'ไม่พบบัญชีที่ต้องการตั้งค่า' };
        }

        // Write all changes back to the sheet at once
        range.setValues(values);
        
        return { success: true, message: 'ตั้งค่าบัญชีที่ใช้งานสำเร็จ' };

    } catch (e) {
        Logger.log("Set Active Bank Error: " + e.toString());
        return { success: false, message: 'เกิดข้อผิดพลาด: ' + e.message };
    } finally {
        lock.releaseLock();
    }
}
/**
 * (NEW) Gets all deposit history for the admin panel.
 */
function getDepositHistory() {
  try {
    const sheet = getSheetAndHeaders('Deposits');
    if (sheet.getLastRow() < 2) return [];
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
    const headers = SHEETS_CONFIG.Deposits;
    
    // Sort by timestamp descending (newest first)
    data.sort((a, b) => new Date(b[headers.indexOf('Timestamp')]) - new Date(a[headers.indexOf('Timestamp')]));

    return data.map(row => ({
      id: row[headers.indexOf('ID')],
      memberId: row[headers.indexOf('MemberID')],
      memberName: row[headers.indexOf('MemberName')],
      amount: parseFloat(row[headers.indexOf('Amount')]),
      slipUrl: row[headers.indexOf('SlipUrl')],
      status: row[headers.indexOf('Status')],
      timestamp: row[headers.indexOf('Timestamp')],
      phone: String(row[headers.indexOf('Phone')] || '').startsWith("'") ? String(row[headers.indexOf('Phone')] || '').slice(1) : row[headers.indexOf('Phone')]
    }));
  } catch(e) {
    Logger.log("Error in getDepositHistory: " + e.toString());
    return [];
  }
}

/**
 * (NEW) Gets all withdrawal history for the admin panel.
 */
function getWithdrawalHistory() {
  try {
    const sheet = getSheetAndHeaders('Withdrawals');
    if (sheet.getLastRow() < 2) return [];
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
    const headers = SHEETS_CONFIG.Withdrawals;

    // Sort by timestamp descending (newest first)
    data.sort((a, b) => new Date(b[headers.indexOf('Timestamp')]) - new Date(a[headers.indexOf('Timestamp')]));
    
    return data.map(row => ({
      id: row[headers.indexOf('ID')],
      memberId: row[headers.indexOf('MemberID')],
      memberName: row[headers.indexOf('MemberName')],
      amount: parseFloat(row[headers.indexOf('Amount')]),
      status: row[headers.indexOf('Status')],
      timestamp: row[headers.indexOf('Timestamp')],
      bankAccount: row[headers.indexOf('BankAccount')],
      phone: row[headers.indexOf('Phone')]
    }));
  } catch(e) {
    Logger.log("Error in getWithdrawalHistory: " + e.toString());
    return [];
  }
}
constconstconstconstconstconstconstconst
