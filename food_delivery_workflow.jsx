import React, { useState } from 'react';
import { ChevronDown, Package, MapPin, DollarSign, Check, Clock } from 'lucide-react';

export default function FoodDeliveryWorkflow() {
  const [activeScene, setActiveScene] = useState(1);

  const scenes = [
    {
      id: 1,
      name: 'ฉากที่ 1: User เลือกอาหาร & กรอกข้อมูล',
      color: 'from-blue-400 to-cyan-400',
      content: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="font-bold text-lg mb-4">📱 USER INTERFACE - แอปสั่งอาหาร</h3>
            <div className="space-y-3 border-l-4 border-blue-500 pl-4">
              <div className="bg-blue-50 p-3 rounded">
                <p className="font-semibold">🍜 เลือกเมนูอาหาร</p>
                <p className="text-sm text-gray-600">- ผัดไทย x2 = 180 บาท</p>
                <p className="text-sm text-gray-600">- น้ำปั่น x1 = 60 บาท</p>
              </div>

              <div className="bg-blue-50 p-3 rounded">
                <p className="font-semibold">🏪 เลือกวิธีจัดส่ง</p>
                <p className="text-sm text-green-600 font-bold">✓ ให้ร้านจัดส่ง (Delivery)</p>
              </div>

              <div className="bg-blue-50 p-3 rounded">
                <p className="font-semibold">📍 ที่อยู่จัดส่ง</p>
                <p className="text-sm text-gray-600">ชื่อผู้รับ: สมชาย ด.ต.อ.</p>
                <p className="text-sm text-gray-600">ที่อยู่: ซ. มิตรภาพ 5 กม.7 เมืองขอนแก่น</p>
                <p className="text-sm text-gray-600">เบอร์โทร: 088-xxx-xxxx</p>
              </div>

              <div className="bg-blue-50 p-3 rounded">
                <p className="font-semibold">💰 วิธีชำระเงิน</p>
                <p className="text-sm text-green-600 font-bold">✓ จ่ายเงินสด (เมื่อรับอาหาร)</p>
              </div>

              <div className="bg-green-100 p-3 rounded border-2 border-green-500">
                <p className="font-semibold text-green-700">💵 รวมทั้งสิ้น: 240 บาท</p>
              </div>

              <button className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600">
                ✓ ยืนยันการสั่งซื้อ
              </button>
            </div>
          </div>
        </div>
      )
    },

    {
      id: 2,
      name: 'ฉากที่ 2: ข้อมูลที่ส่งไป Backend/Database',
      color: 'from-purple-400 to-pink-400',
      content: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="font-bold text-lg mb-4">🔄 ข้อมูลที่ Server บันทึก</h3>
            <div className="space-y-2 bg-gray-900 text-green-400 p-4 rounded font-mono text-xs overflow-auto">
              <pre>{`{
  orderId: "ORD-2024-001234",
  userId: "USER-5678",
  userName: "สมชาย ด.ต.อ.",
  timestamp: "2024-06-05 14:30:00",
  
  orderItems: [
    { 
      itemId: "item-001",
      itemName: "ผัดไทย",
      quantity: 2,
      pricePerUnit: 90,
      subtotal: 180
    },
    {
      itemId: "item-045",
      itemName: "น้ำปั่น",
      quantity: 1,
      pricePerUnit: 60,
      subtotal: 60
    }
  ],
  
  deliveryInfo: {
    type: "delivery",
    recipientName: "สมชาย ด.ต.อ.",
    address: "ซ. มิตรภาพ 5 กม.7 เมืองขอนแก่น",
    phoneNumber: "088-xxx-xxxx",
    estimatedDeliveryTime: "30-45 mins"
  },
  
  paymentInfo: {
    method: "cash",
    totalAmount: 240,
    status: "pending_delivery"
  },
  
  orderStatus: "pending_confirmation",
  createdAt: "2024-06-05 14:30:00"
}`}</pre>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-400">
            <p className="font-bold text-blue-900">⚠️ สำคัญ: ข้อมูลที่บันทึก</p>
            <ul className="text-sm text-blue-800 mt-2 space-y-1">
              <li>✓ ออเดอร์ ID (เพื่อติดตาม)</li>
              <li>✓ รายการอาหาร + จำนวน + ราคา</li>
              <li>✓ ที่อยู่จัดส่งจริง (พร้อมเบอร์โทร)</li>
              <li>✓ วิธีชำระเงิน = เงินสด</li>
              <li>✓ สถานะ = รอ Confirmed</li>
            </ul>
          </div>
        </div>
      )
    },

    {
      id: 3,
      name: 'ฉากที่ 3: Admin Dashboard - ออเดอร์ใหม่',
      color: 'from-orange-400 to-red-400',
      content: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="font-bold text-lg mb-4">👨‍💼 ADMIN PANEL - การจัดการออเดอร์</h3>
            
            <div className="border-2 border-red-500 bg-red-50 p-4 rounded-lg mb-4">
              <p className="font-bold text-red-700 text-center">🔔 มีออเดอร์ใหม่เข้ามา!</p>
            </div>

            <div className="bg-gray-50 border-2 border-orange-400 p-4 rounded-lg space-y-3">
              <div className="flex justify-between items-center pb-3 border-b-2">
                <span className="font-bold">ออเดอร์ #ORD-2024-001234</span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  ใหม่
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded border-l-4 border-blue-500">
                  <p className="text-xs text-gray-600">ชื่อผู้สั่ง</p>
                  <p className="font-bold">สมชาย ด.ต.อ.</p>
                </div>
                <div className="bg-white p-3 rounded border-l-4 border-green-500">
                  <p className="text-xs text-gray-600">เบอร์โทร</p>
                  <p className="font-bold">088-xxx-xxxx</p>
                </div>
              </div>

              <div className="bg-white p-3 rounded border-l-4 border-purple-500">
                <p className="text-xs text-gray-600">📍 ที่อยู่จัดส่ง</p>
                <p className="font-bold">ซ. มิตรภาพ 5 กม.7 เมืองขอนแก่น</p>
              </div>

              <div className="bg-yellow-50 p-3 rounded border-2 border-yellow-400">
                <p className="text-xs text-gray-600">📦 รายการอาหาร</p>
                <p className="font-bold">• ผัดไทย x2 = 180 บาท</p>
                <p className="font-bold">• น้ำปั่น x1 = 60 บาท</p>
              </div>

              <div className="bg-blue-50 p-3 rounded border-2 border-blue-400">
                <p className="text-xs text-gray-600">💰 วิธีชำระ</p>
                <p className="font-bold text-green-700">เงินสด (จ่ายเมื่อรับอาหาร)</p>
                <p className="text-lg font-bold text-red-600">รวม: 240 บาท</p>
              </div>

              <div className="flex gap-2 pt-3">
                <button className="flex-1 bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600">
                  ✓ ยอมรับออเดอร์
                </button>
                <button className="flex-1 bg-red-500 text-white font-bold py-2 rounded-lg hover:bg-red-600">
                  ✗ ปฏิเสธ
                </button>
              </div>
            </div>

            <div className="mt-4 bg-green-50 p-4 rounded-lg border-2 border-green-400">
              <p className="font-bold text-green-900">✓ Admin ต้องทำ</p>
              <ul className="text-sm text-green-800 mt-2 space-y-1">
                <li>1. ตรวจสอบจำนวนและชนิดของอาหาร</li>
                <li>2. ยืนยันการรับออเดอร์</li>
                <li>3. เตรียมวัสดุและเริ่มทำอาหาร</li>
                <li>4. อัปเดตสถานะ → "กำลังเตรียม"</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },

    {
      id: 4,
      name: 'ฉากที่ 4: User เห็นการอัปเดตสถานะ',
      color: 'from-green-400 to-emerald-400',
      content: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="font-bold text-lg mb-4">📱 USER APP - ติดตามสถานะการสั่ง</h3>
            
            <div className="space-y-3">
              <div className="border-2 border-green-500 bg-green-50 p-3 rounded-lg">
                <p className="font-bold text-green-700 text-center mb-2">✓ ออเดอร์ได้รับการยืนยัน</p>
                <p className="text-center text-sm text-gray-600">เวลา: 14:31:00</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <p className="font-bold">📦 กำลังเตรียมอาหาร</p>
                    <p className="text-sm text-gray-600">14:31 - 14:40 (ประมาณ 9 นาที)</p>
                  </div>
                  <div className="ml-auto text-blue-500">●●●</div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <p className="font-bold">🚚 กำลังจัดส่ง</p>
                    <p className="text-sm text-gray-600">ตัวขับสาน อยู่ระหว่างทาง</p>
                  </div>
                  <div className="ml-auto text-gray-300">○○○</div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border-l-4 border-gray-400">
                  <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <p className="font-bold">📍 ได้รับอาหารแล้ว</p>
                    <p className="text-sm text-gray-600">รอการจัดส่ง...</p>
                  </div>
                  <div className="ml-auto text-gray-300">○○○</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-100 to-green-100 p-4 rounded-lg border-2 border-blue-400">
                <p className="text-sm font-semibold text-gray-700">📍 GPS ติดตาม</p>
                <p className="text-xs text-gray-600 mt-1">ตัวขับหลังมา 1.2 กม. - ETA 14:45</p>
                <div className="bg-white rounded mt-2 h-24 flex items-center justify-center text-gray-400 text-xs">
                  🗺️ [แผนที่ GPS ตัวอักษร]
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-400 p-3 rounded-lg">
                <p className="font-bold text-yellow-800">💬 สามารถติดต่อได้</p>
                <button className="mt-2 w-full bg-yellow-500 text-white font-bold py-2 rounded hover:bg-yellow-600">
                  📱 แชท/โทรติดต่อร้าน
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    },

    {
      id: 5,
      name: 'ฉากที่ 5: Admin จัดส่งและชำระเงิน',
      color: 'from-teal-400 to-cyan-400',
      content: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="font-bold text-lg mb-4">👨‍🍳 ร้านอาหาร - เมื่อจัดส่งถึงจุดหมาย</h3>
            
            <div className="space-y-3">
              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-500">
                <p className="font-bold mb-2">🚚 พนักงานจัดส่ง (Delivery Staff)</p>
                <p className="text-sm text-gray-700">ป้อนข้อมูล: "ได้รับอาหารแล้ว" → จ่ายเงินสด</p>
              </div>

              <div className="space-y-2">
                <div className="bg-green-100 p-3 rounded border-l-4 border-green-600">
                  <p className="font-semibold text-green-800">ผู้สั่ง: สมชาย ด.ต.อ.</p>
                  <p className="text-sm text-gray-700">เวลา: 14:45</p>
                </div>

                <div className="bg-yellow-100 p-3 rounded border-l-4 border-yellow-600">
                  <p className="font-semibold text-yellow-800">💰 รับเงินสด: 240 บาท</p>
                  <p className="text-sm text-gray-700">ลูกค้าโอนเงินให้พนักงาน</p>
                </div>

                <div className="bg-purple-100 p-3 rounded border-l-4 border-purple-600">
                  <p className="font-semibold text-purple-800">✓ ตรวจสอบอาหารครบ</p>
                  <p className="text-sm text-gray-700">ผัดไทย x2, น้ำปั่น x1 ✓</p>
                </div>
              </div>

              <div className="bg-teal-50 border-2 border-teal-500 p-4 rounded-lg">
                <p className="font-bold mb-3">📱 Admin ต้องป้อนข้อมูล</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                    <span>ออเดอร์ ID: ORD-2024-001234</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                    <span>เวลาจัดส่ง: 14:45</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                    <span>เงินสดรับได้: 240 บาท</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                    <span>สถานะ: ✓ เสร็จสิ้น (Completed)</span>
                  </div>
                </div>

                <button className="w-full mt-3 bg-green-500 text-white font-bold py-2 rounded hover:bg-green-600">
                  ✓ ยืนยันการจัดส่ง / เก็บเงิน
                </button>
              </div>

              <div className="bg-green-50 border-2 border-green-400 p-3 rounded-lg">
                <p className="font-bold text-green-900">💾 ระบบบันทึก</p>
                <ul className="text-sm text-green-800 mt-2 space-y-1">
                  <li>✓ เงินสด: +240 บาท (ใส่กระเป๋า)</li>
                  <li>✓ สถานะออเดอร์ → "Completed"</li>
                  <li>✓ User ได้รับการแจ้งเตือน</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },

    {
      id: 6,
      name: 'สรุป: วงจรการทำงานเต็ม',
      color: 'from-indigo-400 to-purple-400',
      content: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="font-bold text-lg mb-4">🔄 วงจรการทำงานเต็มรูปแบบ</h3>
            
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 rounded-lg">
                <p className="font-bold text-blue-900 mb-2">1️⃣ USER กดซื้อ (14:30)</p>
                <p className="text-sm text-gray-700">→ กรอกที่อยู่ + เลือกจ่ายเงินสด</p>
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-purple-50 p-4 rounded-lg">
                <p className="font-bold text-purple-900 mb-2">2️⃣ SERVER บันทึกข้อมูล (14:30)</p>
                <p className="text-sm text-gray-700">→ JSON ทั้งหมด: สั่ง + ที่อยู่ + จ่ายเงิน</p>
              </div>

              <div className="bg-gradient-to-r from-orange-100 to-orange-50 p-4 rounded-lg">
                <p className="font-bold text-orange-900 mb-2">3️⃣ ADMIN เห็นออเดอร์ (14:30)</p>
                <p className="text-sm text-gray-700">→ ดูรายได้, ที่อยู่, โทร ลูกค้า</p>
              </div>

              <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 p-4 rounded-lg">
                <p className="font-bold text-yellow-900 mb-2">4️⃣ ADMIN ยืนยัน & ทำอาหาร (14:31)</p>
                <p className="text-sm text-gray-700">→ Update สถานะ → "กำลังเตรียม"</p>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-green-50 p-4 rounded-lg">
                <p className="font-bold text-green-900 mb-2">5️⃣ USER เห็นสถานะ (Real-time)</p>
                <p className="text-sm text-gray-700">→ GPS, เวลาคาดหมาย, สามารถโทร</p>
              </div>

              <div className="bg-gradient-to-r from-teal-100 to-teal-50 p-4 rounded-lg">
                <p className="font-bold text-teal-900 mb-2">6️⃣ จัดส่งและชำระเงิน (14:45)</p>
                <p className="text-sm text-gray-700">→ Admin ป้อนเงิน → System บันทึก</p>
              </div>
            </div>

            <div className="mt-4 border-2 border-indigo-500 bg-indigo-50 p-4 rounded-lg">
              <p className="font-bold text-indigo-900 mb-3">📊 ข้อมูลที่ Admin ต้องอัปเดตทีละขั้นตอน</p>
              <table className="w-full text-sm">
                <thead className="bg-indigo-200">
                  <tr>
                    <th className="p-2 text-left">ขั้นตอน</th>
                    <th className="p-2 text-left">สถานะที่ Update</th>
                    <th className="p-2 text-left">User เห็น</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="hover:bg-indigo-100">
                    <td className="p-2">1. ยืนยันออเดอร์</td>
                    <td className="p-2 font-mono text-xs">pending_confirmation → confirmed</td>
                    <td className="p-2">✓ ยืนยันแล้ว</td>
                  </tr>
                  <tr className="hover:bg-indigo-100">
                    <td className="p-2">2. ทำอาหาร</td>
                    <td className="p-2 font-mono text-xs">confirmed → preparing</td>
                    <td className="p-2">🍳 กำลังเตรียม</td>
                  </tr>
                  <tr className="hover:bg-indigo-100">
                    <td className="p-2">3. ส่งออเดอร์</td>
                    <td className="p-2 font-mono text-xs">preparing → out_for_delivery</td>
                    <td className="p-2">🚚 ออกจัดส่ง</td>
                  </tr>
                  <tr className="hover:bg-indigo-100">
                    <td className="p-2">4. ส่งสำเร็จ</td>
                    <td className="p-2 font-mono text-xs">out_for_delivery → delivered</td>
                    <td className="p-2">✓ ได้รับแล้ว</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentScene = scenes.find(s => s.id === activeScene);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-2">
            🍜 Workflow: ระบบแอปสั่งอาหาร
          </h1>
          <p className="text-gray-400 text-lg">ตามสถานการณ์: User สั่งและให้จัดส่ง + จ่ายเงินสด</p>
        </div>

        {/* Scene Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
          {scenes.map(scene => (
            <button
              key={scene.id}
              onClick={() => setActiveScene(scene.id)}
              className={`py-3 px-2 rounded-lg font-bold transition-all ${
                activeScene === scene.id
                  ? 'bg-white text-slate-900 shadow-lg scale-105'
                  : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}
            >
              <div className="text-xs">ฉาก {scene.id}</div>
            </button>
          ))}
        </div>

        {/* Current Scene */}
        {currentScene && (
          <div className={`rounded-2xl overflow-hidden shadow-2xl`}>
            {/* Scene Header */}
            <div className={`bg-gradient-to-r ${currentScene.color} p-6 text-white`}>
              <h2 className="text-2xl font-black">{currentScene.name}</h2>
            </div>

            {/* Scene Content */}
            <div className="bg-white p-8">
              {currentScene.content}
            </div>

            {/* Navigation Footer */}
            <div className="bg-slate-900 p-4 flex justify-between items-center">
              <button
                onClick={() => setActiveScene(Math.max(1, activeScene - 1))}
                disabled={activeScene === 1}
                className={`px-6 py-2 rounded-lg font-bold transition-all ${
                  activeScene === 1
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                ← ก่อนหน้า
              </button>

              <span className="text-white font-bold">
                {activeScene} / {scenes.length}
              </span>

              <button
                onClick={() => setActiveScene(Math.min(scenes.length, activeScene + 1))}
                disabled={activeScene === scenes.length}
                className={`px-6 py-2 rounded-lg font-bold transition-all ${
                  activeScene === scenes.length
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                ถัดไป →
              </button>
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-700 rounded-lg p-4 text-white">
            <p className="font-bold text-lg mb-2">📱 User ต้อง</p>
            <ul className="text-sm space-y-1">
              <li>✓ เลือกอาหาร</li>
              <li>✓ กรอกที่อยู่</li>
              <li>✓ เลือกจ่ายสด</li>
              <li>✓ ยืนยันสั่ง</li>
            </ul>
          </div>

          <div className="bg-orange-600 rounded-lg p-4 text-white">
            <p className="font-bold text-lg mb-2">👨‍💼 Admin ต้อง</p>
            <ul className="text-sm space-y-1">
              <li>✓ ยืนยันออเดอร์</li>
              <li>✓ อัปเดตสถานะ</li>
              <li>✓ เก็บเงินสด</li>
              <li>✓ บันทึกในระบบ</li>
            </ul>
          </div>

          <div className="bg-green-600 rounded-lg p-4 text-white">
            <p className="font-bold text-lg mb-2">🔄 System ต้อง</p>
            <ul className="text-sm space-y-1">
              <li>✓ บันทึก JSON</li>
              <li>✓ ส่ง Notification</li>
              <li>✓ Update Real-time</li>
              <li>✓ GPS Tracking</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
