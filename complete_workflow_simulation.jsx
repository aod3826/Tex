import React, { useState } from 'react';
import { ChevronRight, Database, Users, ShoppingCart, Truck, DollarSign, BarChart3, Lock, Clock } from 'lucide-react';

export default function CompleteWorkflowSimulation() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: '🔐 ขั้นตอน 1: User ล็อคอิน',
      color: 'from-blue-500 to-cyan-500',
      description: 'ระบบตรวจสอบตัวตน และเก็บข้อมูล Session',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* UI ด้าน User */}
            <div className="bg-white rounded-lg p-4 border-2 border-blue-400">
              <h3 className="font-bold text-blue-900 mb-3">📱 User Screen</h3>
              <div className="space-y-3">
                <input type="email" placeholder="อีเมล" className="w-full p-2 border rounded" defaultValue="somchai@email.com" />
                <input type="password" placeholder="รหัสผ่าน" className="w-full p-2 border rounded" defaultValue="••••••••" />
                <button className="w-full bg-blue-500 text-white p-2 rounded font-bold hover:bg-blue-600">
                  ↓ เข้าสู่ระบบ
                </button>
              </div>
            </div>

            {/* Database ที่ Save */}
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs space-y-2">
              <p className="font-bold text-green-300">💾 Server บันทึก</p>
              <div className="bg-black p-2 rounded">
                <pre>{`users {
  userId: "USER-5678"
  email: "somchai@email.com"
  phone: "088-xxx-xxxx"
  name: "สมชาย"
  password: "hash***"
  createdAt: "2024-01-01"
}`}</pre>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-400 p-4 rounded-lg">
            <p className="font-bold text-blue-900 mb-2">🔑 Session ที่ระบบสร้าง</p>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
              <pre>{`sessions {
  sessionId: "SESSION-abc123xyz"
  userId: "USER-5678"
  loginTime: "2024-06-05 10:00:00"
  expiryTime: "2024-06-05 22:00:00"
  ipAddress: "192.168.1.1"
  deviceInfo: "iPhone 12"
  status: "active"
}`}</pre>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-400 p-4 rounded-lg">
            <p className="font-bold text-yellow-900">✓ ผลลัพธ์</p>
            <p className="text-sm text-gray-700 mt-2">User เข้าสู่ระบบสำเร็จ → ไปหน้าเมนูอาหาร</p>
          </div>
        </div>
      )
    },

    {
      id: 2,
      title: '🛒 ขั้นตอน 2: User ดูเมนูและเลือกอาหาร',
      color: 'from-green-500 to-emerald-500',
      description: 'ระบบดึงเมนูและบันทึกการคลิก',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border-2 border-green-400">
              <h3 className="font-bold text-green-900 mb-3">📱 Menu Screen</h3>
              <div className="space-y-2">
                <div className="border p-2 rounded cursor-pointer hover:bg-green-100">
                  <p className="font-semibold">🍜 ผัดไทย</p>
                  <p className="text-sm text-gray-600">90 บาท</p>
                </div>
                <div className="border p-2 rounded cursor-pointer hover:bg-green-100">
                  <p className="font-semibold">🍲 ต้มยำกุ้ง</p>
                  <p className="text-sm text-gray-600">120 บาท</p>
                </div>
                <div className="border-2 border-green-500 bg-green-100 p-2 rounded font-bold">
                  <p>🥤 น้ำปั่น</p>
                  <p className="text-sm text-gray-600">60 บาท ✓</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs space-y-2">
              <p className="font-bold text-green-300">💾 Cart (Local + Server)</p>
              <div className="bg-black p-2 rounded overflow-auto max-h-40">
                <pre>{`cart {
  cartId: "CART-5678-001"
  userId: "USER-5678"
  items: [
    {
      itemId: "MENU-001",
      itemName: "ผัดไทย",
      price: 90,
      quantity: 0,
      addedAt: "10:05"
    },
    {
      itemId: "MENU-040",
      itemName: "ต้มยำกุ้ง",
      price: 120,
      quantity: 0,
      addedAt: "10:06"
    },
    {
      itemId: "MENU-055",
      itemName: "น้ำปั่น",
      price: 60,
      quantity: 1,
      addedAt: "10:07",
      status: "selected"
    }
  ],
  totalItems: 1,
  totalPrice: 60
}`}</pre>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-2 border-green-400 p-4 rounded-lg">
            <p className="font-bold text-green-900 mb-2">📊 User Behavior Log</p>
            <div className="space-y-1 text-sm">
              <p>✓ viewed_menu: 10:02</p>
              <p>✓ clicked_item: "ผัดไทย" (10:05)</p>
              <p>✓ clicked_item: "ต้มยำกุ้ง" (10:06)</p>
              <p>✓ added_to_cart: "น้ำปั่น" (10:07)</p>
            </div>
          </div>
        </div>
      )
    },

    {
      id: 3,
      title: '📦 ขั้นตอน 3: User ตัดสินใจซื้อ (Checkout)',
      color: 'from-purple-500 to-pink-500',
      description: 'ระบบบันทึกรายการและสร้าง Temp Order',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border-2 border-purple-400">
              <h3 className="font-bold text-purple-900 mb-3">📱 Checkout Form</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <label className="font-semibold block mb-1">🍽️ รายการสั่ง</label>
                  <p className="bg-purple-50 p-2 rounded">น้ำปั่น x1 = 60 บาท</p>
                </div>
                <div>
                  <label className="font-semibold block mb-1">📍 ที่อยู่จัดส่ง</label>
                  <input type="text" placeholder="ที่อยู่" className="w-full p-2 border rounded text-xs" defaultValue="ซ. มิตรภาพ 5 กม.7" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">📱 เบอร์โทร</label>
                  <input type="tel" placeholder="เบอร์" className="w-full p-2 border rounded text-xs" defaultValue="088-xxx-xxxx" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">🚚 วิธีจัดส่ง</label>
                  <select className="w-full p-2 border rounded text-xs">
                    <option>Delivery (จัดส่ง)</option>
                    <option>Pickup (รับเอง)</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1">💰 วิธีชำระเงิน</label>
                  <select className="w-full p-2 border rounded text-xs">
                    <option>Cash (เงินสด)</option>
                    <option>Card (บัตรเครดิต)</option>
                    <option>Mobile Wallet</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs space-y-2 overflow-auto">
              <p className="font-bold text-green-300">💾 Temp Order</p>
              <div className="bg-black p-2 rounded">
                <pre>{`tempOrders {
  tempOrderId: "TEMP-5678-001"
  userId: "USER-5678"
  sessionId: "SESSION-abc123xyz"
  items: [
    {
      itemId: "MENU-055",
      name: "น้ำปั่น",
      price: 60,
      qty: 1
    }
  ],
  deliveryAddress: "ซ. มิตรภาพ 5 กม.7"
  phoneNumber: "088-xxx-xxxx"
  deliveryMethod: "delivery",
  paymentMethod: "cash",
  totalAmount: 60,
  status: "pending_payment",
  createdAt: "2024-06-05 10:10:00",
  expiryAt: "2024-06-05 10:30:00"
}`}</pre>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border-2 border-purple-400 p-4 rounded-lg">
            <p className="font-bold text-purple-900">⏳ สถานะ Temp Order</p>
            <p className="text-sm text-gray-700 mt-2">• เก็บชั่วคราว (20 นาที)</p>
            <p className="text-sm text-gray-700">• ถ้า User ไม่ยืนยัน → ลบอัตโนมัติ</p>
            <p className="text-sm text-gray-700">• รอการชำระเงิน...</p>
          </div>
        </div>
      )
    },

    {
      id: 4,
      title: '💳 ขั้นตอน 4: User ชำระเงิน',
      color: 'from-yellow-500 to-orange-500',
      description: 'ระบบประมวลผลการชำระเงินและสร้าง Order จริง',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border-2 border-yellow-400">
              <h3 className="font-bold text-yellow-900 mb-3">📱 Payment Screen</h3>
              <div className="space-y-3 text-sm">
                <div className="bg-yellow-50 p-3 rounded">
                  <p className="font-semibold">น้ำปั่น x1</p>
                  <p className="flex justify-between">
                    <span>60 บาท</span>
                    <span className="font-bold">60 บาท</span>
                  </p>
                </div>
                <div className="border-t-2 pt-2">
                  <p className="flex justify-between font-bold">
                    <span>รวมทั้งสิ้น:</span>
                    <span className="text-orange-600">60 บาท</span>
                  </p>
                </div>
                <div className="bg-orange-100 border-2 border-orange-400 p-3 rounded">
                  <p className="font-bold text-orange-900">วิธีชำระ: เงินสด</p>
                  <p className="text-xs text-gray-700">จ่ายเมื่อรับสินค้า</p>
                </div>
                <button className="w-full bg-orange-500 text-white p-3 rounded font-bold hover:bg-orange-600">
                  ✓ ยืนยันและสั่งซื้อ
                </button>
              </div>
            </div>

            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-auto">
              <p className="font-bold text-green-300">💾 Payment Record</p>
              <div className="bg-black p-2 rounded">
                <pre>{`payments {
  paymentId: "PAY-5678-001"
  tempOrderId: "TEMP-5678-001"
  userId: "USER-5678"
  amount: 60
  method: "cash",
  status: "pending_delivery",
  initiatedAt: "2024-06-05 10:12:00",
  processedAt: null,
  dueAt: "delivery_time"
}`}</pre>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-400 p-4 rounded-lg">
            <p className="font-bold text-yellow-900 mb-2">✓ ยืนยันการสั่ง</p>
            <p className="text-sm text-gray-700">↓ TempOrder → Confirmed Order</p>
          </div>
        </div>
      )
    },

    {
      id: 5,
      title: '✓ ขั้นตอน 5: สร้าง Order ID และบันทึกในฐานข้อมูล',
      color: 'from-red-500 to-rose-500',
      description: 'ระบบสร้างเอกสารออเดอร์อย่างเป็นทางการ',
      content: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border-2 border-red-400">
            <h3 className="font-bold text-red-900 mb-3">📋 Official Order Record</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-auto max-h-64">
              <pre>{`orders {
  orderId: "ORD-2024-001234",
  userId: "USER-5678",
  userName: "สมชาย ด.ต.อ.",
  userPhone: "088-xxx-xxxx",
  userEmail: "somchai@email.com",
  
  orderItems: [
    {
      itemId: "MENU-055",
      itemName: "น้ำปั่น",
      price: 60,
      quantity: 1,
      subtotal: 60,
      notes: "",
      prepTime: 5
    }
  ],
  
  deliveryInfo: {
    type: "delivery",
    address: "ซ. มิตรภาพ 5 กม.7 เมืองขอนแก่น",
    latitude: 16.4419,
    longitude: 102.8343,
    estimatedTime: 30
  },
  
  paymentInfo: {
    method: "cash",
    totalAmount: 60,
    status: "pending",
    dueAt: "on_delivery"
  },
  
  orderStatus: "confirmed",
  priority: "normal",
  specialNotes: "none",
  
  timestamps: {
    createdAt: "2024-06-05 10:12:30",
    confirmedAt: "2024-06-05 10:12:35",
    preparingStartAt: null,
    readyAt: null,
    sentAt: null,
    deliveredAt: null,
    completedAt: null
  },
  
  assignedStaff: {
    kitchenStaff: null,
    deliveryPersonId: null,
    deliveryPersonName: null,
    deliveryPersonPhone: null,
    vehicleId: null
  }
}`}</pre>
            </div>
          </div>

          <div className="bg-red-50 border-2 border-red-400 p-4 rounded-lg">
            <p className="font-bold text-red-900 mb-2">🔗 Linked Tables</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-white p-2 rounded border">users → linked by userId</div>
              <div className="bg-white p-2 rounded border">menu_items → linked by itemId</div>
              <div className="bg-white p-2 rounded border">payments → linked by orderId</div>
              <div className="bg-white p-2 rounded border">delivery_tracking → will link</div>
            </div>
          </div>
        </div>
      )
    },

    {
      id: 6,
      title: '🍳 ขั้นตอน 6: Admin รับออเดอร์ & ทำการ Update สถานะ',
      color: 'from-indigo-500 to-blue-500',
      description: 'ระบบบันทึกการเปลี่ยนแปลงสถานะแต่ละครั้ง',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border-2 border-indigo-400">
              <h3 className="font-bold text-indigo-900 mb-3">👨‍💼 Admin Actions</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-indigo-50 p-2 rounded border-l-4 border-green-500">
                  <p className="font-bold text-green-700">✓ 10:13 - ยืนยันออเดอร์</p>
                </div>
                <div className="bg-indigo-50 p-2 rounded border-l-4 border-blue-500">
                  <p className="font-bold text-blue-700">→ 10:14 - เริ่มเตรียม</p>
                </div>
                <div className="bg-indigo-50 p-2 rounded border-l-4 border-orange-500">
                  <p className="font-bold text-orange-700">→ 10:19 - เสร็จเตรียม</p>
                </div>
                <div className="bg-indigo-50 p-2 rounded border-l-4 border-purple-500">
                  <p className="font-bold text-purple-700">→ 10:20 - มอบให้ขับส่ง</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-auto max-h-64">
              <p className="font-bold text-green-300">💾 Status History</p>
              <div className="bg-black p-2 rounded">
                <pre>{`orderStatusHistory {
  orderId: "ORD-2024-001234",
  statusChanges: [
    {
      statusId: "STAT-001",
      previousStatus: null,
      newStatus: "confirmed",
      changedBy: "ADMIN-001",
      changedAt: "2024-06-05 10:13:00",
      notes: "ยืนยันออเดอร์"
    },
    {
      statusId: "STAT-002",
      previousStatus: "confirmed",
      newStatus: "preparing",
      changedBy: "ADMIN-001",
      changedAt: "2024-06-05 10:14:00",
      notes: "เริ่มเตรียมอาหาร"
    },
    {
      statusId: "STAT-003",
      previousStatus: "preparing",
      newStatus: "ready_for_delivery",
      changedBy: "ADMIN-001",
      changedAt: "2024-06-05 10:19:00",
      notes: "เสร็จเตรียม"
    },
    {
      statusId: "STAT-004",
      previousStatus: "ready_for_delivery",
      newStatus: "out_for_delivery",
      changedBy: "DELIVERY-001",
      changedAt: "2024-06-05 10:20:00",
      notes: "มอบให้พนักงานจัดส่ง"
    }
  ]
}`}</pre>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 border-2 border-indigo-400 p-4 rounded-lg text-sm">
            <p className="font-bold text-indigo-900">📊 Assigned Staff</p>
            <p className="mt-2">• Kitchen Staff: สมหญิง (ผู้ทำอาหาร)</p>
            <p>• Delivery Staff: สมชาติ (ไรเดอร์)</p>
            <p>• Vehicle: Bike-001 (รถจักรยาน)</p>
          </div>
        </div>
      )
    },

    {
      id: 7,
      title: '🚚 ขั้นตอน 7: Delivery & GPS Tracking',
      color: 'from-teal-500 to-cyan-500',
      description: 'ระบบบันทึก GPS และเวลาจริง',
      content: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border-2 border-teal-400">
            <h3 className="font-bold text-teal-900 mb-3">📍 Real-time Tracking</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-auto max-h-48">
              <pre>{`deliveryTracking {
  trackingId: "TRACK-001234",
  orderId: "ORD-2024-001234",
  deliveryPersonId: "DELIVERY-001",
  startTime: "2024-06-05 10:20:00",
  
  gpsPoints: [
    {
      timestamp: "10:20:15",
      latitude: 16.4419,
      longitude: 102.8343,
      speed: 0,
      location: "ร้านอาหาร"
    },
    {
      timestamp: "10:25:30",
      latitude: 16.4450,
      longitude: 102.8380,
      speed: 20,
      distance: 0.5
    },
    {
      timestamp: "10:30:00",
      latitude: 16.4480,
      longitude: 102.8410,
      speed: 25,
      distance: 1.2
    }
  ],
  
  currentLocation: {
    latitude: 16.4480,
    longitude: 102.8410,
    accuracy: 5,
    lastUpdate: "2024-06-05 10:30:00"
  },
  
  estimatedArrival: "2024-06-05 10:35:00",
  status: "in_transit"
}`}</pre>
            </div>
          </div>

          <div className="bg-teal-50 border-2 border-teal-400 p-4 rounded-lg">
            <p className="font-bold text-teal-900 mb-2">📱 User เห็น</p>
            <p className="text-sm">• 🗺️ GPS ของพนักงาน</p>
            <p className="text-sm">• ⏱️ ETA (Estimated Time of Arrival)</p>
            <p className="text-sm">• 📞 สามารถโทรติดต่อได้</p>
          </div>
        </div>
      )
    },

    {
      id: 8,
      title: '✓ ขั้นตอน 8: Delivery Complete & Payment',
      color: 'from-green-500 to-emerald-500',
      description: 'ระบบบันทึกการจัดส่งเสร็จสิ้นและการชำระเงิน',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border-2 border-green-400">
              <h3 className="font-bold text-green-900 mb-3">🏁 Delivery Complete</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-green-50 p-2 rounded">
                  <p className="font-bold">⏰ เวลา: 10:35:00</p>
                </div>
                <div className="bg-green-50 p-2 rounded">
                  <p className="font-bold">📍 สถานที่: บ้านลูกค้า</p>
                </div>
                <div className="bg-yellow-100 p-2 rounded border-2 border-yellow-400">
                  <p className="font-bold text-yellow-900">💰 รับเงินสด: 60 บาท</p>
                </div>
                <div className="bg-green-50 p-2 rounded">
                  <p className="font-bold">✓ ลูกค้าได้รับครบ</p>
                </div>
                <button className="w-full bg-green-500 text-white p-2 rounded font-bold mt-2">
                  ✓ ยืนยันจัดส่งเสร็จ
                </button>
              </div>
            </div>

            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-auto max-h-64">
              <p className="font-bold text-green-300">💾 Delivery Record</p>
              <div className="bg-black p-2 rounded">
                <pre>{`deliveryRecords {
  deliveryId: "DEL-001234",
  orderId: "ORD-2024-001234",
  deliveryPersonId: "DELIVERY-001",
  
  pickupInfo: {
    pickedUpAt: "2024-06-05 10:20:00",
    pickedUpBy: "DELIVERY-001"
  },
  
  deliveryInfo: {
    deliveredAt: "2024-06-05 10:35:00",
    deliveredTo: "สมชาย ด.ต.อ.",
    signature: "signature_001",
    photo: "photo_001.jpg",
    notes: "ลูกค้าพอใจ"
  },
  
  paymentCollection: {
    amount: 60,
    method: "cash",
    collectedAt: "2024-06-05 10:35:00",
    collectedBy: "DELIVERY-001",
    status: "collected"
  },
  
  status: "completed",
  completedAt: "2024-06-05 10:35:00"
}`}</pre>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-2 border-green-400 p-4 rounded-lg">
            <p className="font-bold text-green-900">📊 Updates</p>
            <p className="text-sm mt-2">✓ Order Status → "delivered"</p>
            <p className="text-sm">✓ Payment Status → "paid"</p>
            <p className="text-sm">✓ User ได้รับ Notification</p>
          </div>
        </div>
      )
    },

    {
      id: 9,
      title: '📊 ขั้นตอน 9: Admin Dashboard - ประวัติคำสั่ง',
      color: 'from-purple-500 to-pink-500',
      description: 'ระบบแสดงข้อมูลประวัติออเดอร์ทั้งหมด',
      content: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border-2 border-purple-400">
            <h3 className="font-bold text-purple-900 mb-4">👨‍💼 Admin Dashboard</h3>
            
            <div className="space-y-3">
              {/* Overview Cards */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-blue-100 p-2 rounded">
                  <p className="font-bold text-blue-900">45</p>
                  <p className="text-gray-700">เสร็จสิ้น</p>
                </div>
                <div className="bg-orange-100 p-2 rounded">
                  <p className="font-bold text-orange-900">8</p>
                  <p className="text-gray-700">จัดส่งอยู่</p>
                </div>
                <div className="bg-yellow-100 p-2 rounded">
                  <p className="font-bold text-yellow-900">3</p>
                  <p className="text-gray-700">กำลังเตรียม</p>
                </div>
                <div className="bg-green-100 p-2 rounded">
                  <p className="font-bold text-green-900">₿2,680</p>
                  <p className="text-gray-700">วันนี้</p>
                </div>
              </div>

              {/* Order List */}
              <div className="border-t-2 pt-3">
                <p className="font-bold text-purple-900 mb-2">📋 รายการออเดอร์ (วันนี้)</p>
                <div className="space-y-2 max-h-64 overflow-auto">
                  {/* Completed Orders */}
                  <div className="bg-gray-50 p-3 rounded border-l-4 border-green-500 text-xs">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold">ORD-2024-001234</p>
                        <p className="text-gray-600">สมชาย | น้ำปั่น</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-700">✓ เสร็จ</p>
                        <p className="text-gray-600">60 ฿</p>
                      </div>
                    </div>
                    <div className="mt-2 space-y-1 text-gray-700">
                      <p>📍 ซ. มิตรภาพ 5 กม.7</p>
                      <p>💰 เงินสด | ✓ เก็บแล้ว</p>
                      <p>⏱️ 10:12 → 10:35 (23 นาที)</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded border-l-4 border-green-500 text-xs">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold">ORD-2024-001233</p>
                        <p className="text-gray-600">ธนา | ผัดไทย, ต้มยำ</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-700">✓ เสร็จ</p>
                        <p className="text-gray-600">210 ฿</p>
                      </div>
                    </div>
                  </div>

                  {/* In Transit */}
                  <div className="bg-yellow-50 p-3 rounded border-l-4 border-orange-500 text-xs">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold">ORD-2024-001235</p>
                        <p className="text-gray-600">อนงค์ | น้ำส้ม</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-orange-700">🚚 จัดส่ง</p>
                        <p className="text-gray-600">45 ฿</p>
                      </div>
                    </div>
                    <p className="mt-1 text-gray-700">📍 ETA: 10:42 | ไรเดอร์: สมชาติ</p>
                  </div>

                  {/* Preparing */}
                  <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500 text-xs">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold">ORD-2024-001236</p>
                        <p className="text-gray-600">สมหญิง | ลาบหมู</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-700">🍳 เตรียม</p>
                        <p className="text-gray-600">90 ฿</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border-2 border-purple-400 p-4 rounded-lg">
            <p className="font-bold text-purple-900 mb-3">📊 ข้อมูลที่ Admin เห็นจากแต่ละออเดอร์</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2 rounded border">✓ Order ID & Time</div>
              <div className="bg-white p-2 rounded border">📝 รายการอาหาร</div>
              <div className="bg-white p-2 rounded border">👤 ชื่อ + เบอร์ลูกค้า</div>
              <div className="bg-white p-2 rounded border">📍 ที่อยู่จัดส่ง</div>
              <div className="bg-white p-2 rounded border">💰 ราคา + สถานะเงิน</div>
              <div className="bg-white p-2 rounded border">🚚 ไรเดอร์ที่จัดส่ง</div>
              <div className="bg-white p-2 rounded border">⏱️ เวลา & ETA</div>
              <div className="bg-white p-2 rounded border">📊 Profit/Revenue</div>
            </div>
          </div>
        </div>
      )
    },

    {
      id: 10,
      title: '📱 ขั้นตอน 10: User History - ประวัติของลูกค้า',
      color: 'from-pink-500 to-rose-500',
      description: 'ระบบแสดงประวัติการสั่งอาหารของลูกค้า',
      content: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border-2 border-pink-400">
            <h3 className="font-bold text-pink-900 mb-3">📱 User - My Orders</h3>
            
            <div className="space-y-2">
              <div className="bg-green-50 p-3 rounded border-l-4 border-green-500 text-xs">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">ORD-2024-001234</p>
                    <p className="text-gray-600">น้ำปั่น</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-700">✓ เสร็จ</p>
                    <p className="text-gray-600">60 ฿</p>
                    <p className="text-gray-500 text-xs">10:35 วันนี้</p>
                  </div>
                </div>
                <button className="mt-2 w-full text-center text-blue-600 text-xs font-bold p-1 border border-blue-300 rounded hover:bg-blue-50">
                  ⭐ ให้คะแนน | 📖 ดูรายละเอียด
                </button>
              </div>

              <div className="bg-green-50 p-3 rounded border-l-4 border-green-500 text-xs">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">ORD-2024-001220</p>
                    <p className="text-gray-600">ผัดไทย, น้ำปั่น</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-700">✓ เสร็จ</p>
                    <p className="text-gray-600">150 ฿</p>
                    <p className="text-gray-500 text-xs">เมื่อวาน</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-3 rounded border-l-4 border-green-500 text-xs">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">ORD-2024-001205</p>
                    <p className="text-gray-600">ต้มยำกุ้ง</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-700">✓ เสร็จ</p>
                    <p className="text-gray-600">120 ฿</p>
                    <p className="text-gray-500 text-xs">3 วันที่แล้ว</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-pink-50 border-2 border-pink-400 p-4 rounded-lg">
            <p className="font-bold text-pink-900 mb-2">📊 User Profile Summary</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2 rounded">👤 ชื่อ: สมชาย</div>
              <div className="bg-white p-2 rounded">📱 เบอร์: 088-xxx</div>
              <div className="bg-white p-2 rounded">🛒 สั่งทั้งหมด: 25 ครั้ง</div>
              <div className="bg-white p-2 rounded">💰 รวมใช้เงิน: 3,450 ฿</div>
              <div className="bg-white p-2 rounded">⭐ เรตติ้ง: 4.8/5</div>
              <div className="bg-white p-2 rounded">🎯 สมาชิกตั้งแต่: 2024-01-01</div>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-400 p-4 rounded-lg">
            <p className="font-bold text-blue-900">💾 Data Stored for User</p>
            <div className="text-xs space-y-1 text-gray-700">
              <p>✓ Order History (ทั้งหมด)</p>
              <p>✓ Payment History</p>
              <p>✓ Favorite Items</p>
              <p>✓ Saved Addresses</p>
              <p>✓ Rating & Reviews</p>
              <p>✓ Total Spending</p>
              <p>✓ Loyalty Points (ถ้ามี)</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentStep = steps.find(s => s.id === activeStep);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-2">
            🍜 COMPLETE WORKFLOW SIMULATION
          </h1>
          <p className="text-gray-400 text-lg">ระบบแอปสั่งอาหาร: ตั้งแต่ Login จนถึง Dashboard</p>
          <p className="text-gray-500 text-sm mt-2">จำลองการไหลของข้อมูลและสิ่งที่ระบบต้องบันทึก</p>
        </div>

        {/* Step Navigation */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2 scroll-smooth">
          {steps.map(step => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                activeStep === step.id
                  ? 'bg-white text-slate-900 shadow-lg scale-105'
                  : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}
            >
              <span className="text-sm">ขั้น {step.id}</span>
            </button>
          ))}
        </div>

        {/* Current Step */}
        {currentStep && (
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            {/* Step Header */}
            <div className={`bg-gradient-to-r ${currentStep.color} p-6 text-white`}>
              <h2 className="text-3xl font-black mb-2">{currentStep.title}</h2>
              <p className="text-white/90 text-sm">{currentStep.description}</p>
            </div>

            {/* Step Content */}
            <div className="bg-white p-8">
              {currentStep.content}
            </div>

            {/* Navigation */}
            <div className="bg-slate-900 p-4 flex justify-between items-center">
              <button
                onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                disabled={activeStep === 1}
                className={`px-6 py-2 rounded-lg font-bold transition-all ${
                  activeStep === 1
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                ← ก่อนหน้า
              </button>

              <div className="text-white font-bold text-center">
                <p className="text-sm">ขั้นตอน {activeStep} / {steps.length}</p>
                <div className="w-48 h-2 bg-slate-700 rounded-full mt-2">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-pink-400 rounded-full transition-all"
                    style={{ width: `${(activeStep / steps.length) * 100}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => setActiveStep(Math.min(steps.length, activeStep + 1))}
                disabled={activeStep === steps.length}
                className={`px-6 py-2 rounded-lg font-bold transition-all ${
                  activeStep === steps.length
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                ถัดไป →
              </button>
            </div>
          </div>
        )}

        {/* Summary Footer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-700 rounded-lg p-4 text-white">
            <p className="font-bold text-lg mb-3">🗄️ Main Tables</p>
            <ul className="text-sm space-y-1">
              <li>• users</li>
              <li>• sessions</li>
              <li>• menu_items</li>
              <li>• cart</li>
              <li>• orders</li>
              <li>• order_items</li>
            </ul>
          </div>

          <div className="bg-orange-600 rounded-lg p-4 text-white">
            <p className="font-bold text-lg mb-3">📊 Supporting Tables</p>
            <ul className="text-sm space-y-1">
              <li>• payments</li>
              <li>• delivery_tracking</li>
              <li>• order_status_history</li>
              <li>• delivery_records</li>
              <li>• user_behavior_log</li>
              <li>• staff_assignments</li>
            </ul>
          </div>

          <div className="bg-green-600 rounded-lg p-4 text-white">
            <p className="font-bold text-lg mb-3">🎯 Key Data Points</p>
            <ul className="text-sm space-y-1">
              <li>✓ User Identity</li>
              <li>✓ Order Details</li>
              <li>✓ Real-time Status</li>
              <li>✓ GPS Location</li>
              <li>✓ Payment Info</li>
              <li>✓ Complete History</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
