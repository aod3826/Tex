import React, { useState } from 'react';
import { ChevronRight, MessageCircle, Smartphone, QrCode, ShoppingCart } from 'lucide-react';

export default function LineIntegrationGuide() {
  const [activeMethod, setActiveMethod] = useState(1);

  const methods = [
    {
      id: 1,
      title: '✨ วิธีที่ 1: LINE Official Account + Bot',
      icon: '🤖',
      color: 'from-green-500 to-teal-500',
      description: 'สร้าง LINE OA พร้อม Chatbot สำหรับสั่งอาหาร',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* ด้าน User */}
            <div className="bg-white rounded-lg p-4 border-2 border-green-400">
              <h3 className="font-bold text-green-900 mb-3">📱 Customer (LINE App)</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-semibold">1. Add ร้านอาหาร</p>
                  <p className="text-xs text-gray-600 mt-1">
                    ค้นหา @foodshop_official
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-semibold">2. คลิก Start Chat</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Welcome message ขึ้นมา
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-semibold">3. ดูเมนู</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Rich Menu ปรากฏ
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-semibold">4. สั่งอาหาร</p>
                  <p className="text-xs text-gray-600 mt-1">
                    แชท + ยืนยันสั่ง
                  </p>
                </div>
              </div>
            </div>

            {/* ด้าน Backend */}
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-auto max-h-96">
              <p className="font-bold text-green-300 mb-2">⚙️ Backend Setup</p>
              <div className="bg-black p-2 rounded space-y-2">
                <p className="text-blue-300">// LINE Messaging API Setup</p>
                <pre>{`Channel ID: "xxxxxxx"
Channel Secret: "xxxxx"
Access Token: "xxxxx"
Webhook URL: https://myapp.com/webhook/line

// Messaging API Endpoints
- Send Message API
- Rich Menu API
- Push Message API
- Flex Message API`}</pre>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-2 border-green-400 p-4 rounded-lg">
            <p className="font-bold text-green-900 mb-2">✓ ข้อดี</p>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>✓ ไม่ต้องติดตั้งแอป (ใช้ LINE เดิม)</li>
              <li>✓ ส่ง Notification ตรงได้ทันที</li>
              <li>✓ เก็บ User ID จาก LINE</li>
              <li>✓ สามารถแสดง Order Status ในแชท</li>
            </ul>
          </div>
        </div>
      )
    },

    {
      id: 2,
      title: '📋 วิธีที่ 2: LINE Rich Menu',
      icon: '🎨',
      color: 'from-blue-500 to-indigo-500',
      description: 'เมนูแบบกลุ่มปุ่ม (หรือเรียก Quick Menu)',
      content: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border-2 border-blue-400">
            <h3 className="font-bold text-blue-900 mb-3">📱 Rich Menu on LINE</h3>
            <p className="text-xs text-gray-600 mb-3">ปุ่มปรากฏตั้งแต่เปิดแชท</p>
            
            <div className="bg-gray-100 p-4 rounded border-2 border-gray-300">
              <p className="text-xs font-bold text-gray-600 mb-3">Rich Menu Preview:</p>
              <div className="bg-white rounded border space-y-1">
                {/* Mock Rich Menu */}
                <div className="grid grid-cols-3 gap-1">
                  <button className="bg-green-100 border border-green-400 p-3 text-center text-xs font-bold hover:bg-green-200 rounded">
                    <p>🍜</p>
                    <p className="text-green-900">เมนูอาหาร</p>
                  </button>
                  <button className="bg-blue-100 border border-blue-400 p-3 text-center text-xs font-bold hover:bg-blue-200 rounded">
                    <p>🛒</p>
                    <p className="text-blue-900">ตะกร้า</p>
                  </button>
                  <button className="bg-orange-100 border border-orange-400 p-3 text-center text-xs font-bold hover:bg-orange-200 rounded">
                    <p>📍</p>
                    <p className="text-orange-900">ที่อยู่</p>
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <button className="bg-purple-100 border border-purple-400 p-3 text-center text-xs font-bold hover:bg-purple-200 rounded">
                    <p>📦</p>
                    <p className="text-purple-900">ประวัติ</p>
                  </button>
                  <button className="bg-pink-100 border border-pink-400 p-3 text-center text-xs font-bold hover:bg-pink-200 rounded">
                    <p>⭐</p>
                    <p className="text-pink-900">ติดตาม</p>
                  </button>
                  <button className="bg-yellow-100 border border-yellow-400 p-3 text-center text-xs font-bold hover:bg-yellow-200 rounded">
                    <p>❓</p>
                    <p className="text-yellow-900">ช่วยเหลือ</p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-400 p-4 rounded-lg">
            <p className="font-bold text-blue-900 mb-2">🔄 ประเภท Rich Menu</p>
            <div className="space-y-2 text-sm">
              <div className="bg-white p-2 rounded">
                <p className="font-bold">📸 Image-based Rich Menu</p>
                <p className="text-xs text-gray-600">อัปโหลดภาพปุ่ม (800x810 px)</p>
              </div>
              <div className="bg-white p-2 rounded">
                <p className="font-bold">📱 Text + Icon</p>
                <p className="text-xs text-gray-600">ข้อความ + emoji + ลิงก์</p>
              </div>
              <div className="bg-white p-2 rounded">
                <p className="font-bold">📲 URI + Postback</p>
                <p className="text-xs text-gray-600">คลิก → เปิด Web หรือ ส่ง Action</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-400 p-4 rounded-lg">
            <p className="font-bold text-blue-900">⚙️ Technical Flow</p>
            <div className="font-mono text-xs mt-2 space-y-1">
              <p className="text-blue-600">User clicks → POST to Webhook</p>
              <p className="text-blue-600">Backend processes → Send Reply Message</p>
              <p className="text-blue-600">Show Menu Items (Flex Message)</p>
            </div>
          </div>
        </div>
      )
    },

    {
      id: 3,
      title: '🎯 วิธีที่ 3: Flex Message (รายการอาหาร)',
      icon: '📋',
      color: 'from-purple-500 to-pink-500',
      description: 'แสดงเมนูแบบ Card ที่สวยงาม',
      content: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border-2 border-purple-400">
            <h3 className="font-bold text-purple-900 mb-3">📱 Flex Message Example</h3>
            <p className="text-xs text-gray-600 mb-3">เมื่อ User เลือก "เมนูอาหาร"</p>

            {/* Mock Flex Message Cards */}
            <div className="space-y-2">
              <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-4 rounded-lg border-2 border-orange-300">
                <div className="flex gap-3">
                  <div className="text-3xl">🍜</div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">ผัดไทย</p>
                    <p className="text-sm text-gray-700">เส้นสด ผัดร้อน อบรม</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="font-bold text-lg text-orange-600">90 ฿</p>
                      <button className="bg-green-500 text-white px-3 py-1 rounded text-xs font-bold hover:bg-green-600">
                        + เพิ่ม
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-lg border-2 border-red-300">
                <div className="flex gap-3">
                  <div className="text-3xl">🍲</div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">ต้มยำกุ้ง</p>
                    <p className="text-sm text-gray-700">เผ็ด เปรี้ยว หอม</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="font-bold text-lg text-red-600">120 ฿</p>
                      <button className="bg-green-500 text-white px-3 py-1 rounded text-xs font-bold hover:bg-green-600">
                        + เพิ่ม
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-4 rounded-lg border-2 border-blue-300">
                <div className="flex gap-3">
                  <div className="text-3xl">🥤</div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">น้ำปั่น</p>
                    <p className="text-sm text-gray-700">สตรอเบอรี่ สด เย็น</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="font-bold text-lg text-blue-600">60 ฿</p>
                      <button className="bg-green-500 text-white px-3 py-1 rounded text-xs font-bold hover:bg-green-600">
                        + เพิ่ม
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border-2 border-purple-400 p-4 rounded-lg">
            <p className="font-bold text-purple-900 mb-2">📐 Flex Message JSON Structure</p>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs overflow-auto max-h-48">
              <pre>{`{
  type: "flex",
  altText: "Menu - ผัดไทย",
  contents: {
    type: "bubble",
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "image",
          url: "https://...menu.jpg",
          size: "full",
          aspectRatio: "20:13"
        },
        {
          type: "box",
          contents: [
            { type: "text", text: "ผัดไทย" },
            { type: "text", text: "90 ฿" }
          ]
        }
      ]
    },
    footer: {
      type: "box",
      contents: [
        {
          type: "button",
          action: {
            type: "postback",
            label: "+ เพิ่ม",
            data: "action=add&menu=001"
          }
        }
      ]
    }
  }
}`}</pre>
            </div>
          </div>

          <div className="bg-purple-50 border-2 border-purple-400 p-4 rounded-lg">
            <p className="font-bold text-purple-900">✓ Flex Message ได้</p>
            <ul className="text-sm space-y-1 text-gray-700 mt-2">
              <li>✓ แสดงรูปภาพเมนู</li>
              <li>✓ ชื่อ + ราคา + รายละเอียด</li>
              <li>✓ ปุ่มเพิ่มลงตะกร้า</li>
              <li>✓ สลับ Carousel (หลายเมนู)</li>
            </ul>
          </div>
        </div>
      )
    },

    {
      id: 4,
      title: '🛒 วิธีที่ 4: ตะกร้า + ยืนยันสั่ง',
      icon: '💬',
      color: 'from-yellow-500 to-orange-500',
      description: 'แชทตอบกลับ + ข้อมูลอัตโนมัติ',
      content: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border-2 border-yellow-400">
            <h3 className="font-bold text-yellow-900 mb-3">💬 Chat Conversation Example</h3>
            
            <div className="space-y-3 max-h-96 overflow-auto bg-gray-50 p-3 rounded">
              {/* Chat bubbles */}
              <div className="flex justify-end">
                <div className="bg-green-100 text-gray-900 p-3 rounded-lg max-w-xs text-sm">
                  ผัดไทย 2 ที่ + น้ำปั่น 1 ที่
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-blue-100 text-gray-900 p-3 rounded-lg max-w-xs text-sm">
                  ✓ ได้ครับ! ตะกร้าของคุณ:
                  <div className="mt-2 space-y-1 text-xs">
                    <p>🍜 ผัดไทย x2 = 180 ฿</p>
                    <p>🥤 น้ำปั่น x1 = 60 ฿</p>
                    <p className="font-bold text-yellow-700">รวม: 240 ฿</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="bg-green-100 text-gray-900 p-3 rounded-lg max-w-xs text-sm">
                  ที่อยู่: ซ. มิตรภาพ เมืองขอนแก่น
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-blue-100 text-gray-900 p-3 rounded-lg max-w-xs text-sm">
                  ✓ พบแล้ว
                  <p className="text-xs text-gray-600 mt-2">ค่าจัดส่ง: 20 ฿</p>
                  <p className="text-xs text-gray-600">รวมทั้งสิ้น: 260 ฿</p>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="bg-green-100 text-gray-900 p-3 rounded-lg max-w-xs text-sm">
                  จ่ายแบบเงินสดนะคะ
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-blue-100 text-gray-900 p-3 rounded-lg max-w-xs">
                  <p className="text-sm mb-3">ยืนยันการสั่งซื้อหรือไม่?</p>
                  <div className="flex gap-2">
                    <button className="bg-green-500 text-white px-4 py-2 rounded text-xs font-bold">
                      ✓ ยืนยัน
                    </button>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded text-xs font-bold">
                      ✗ ยกเลิก
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-400 p-4 rounded-lg">
            <p className="font-bold text-yellow-900 mb-2">🔄 Flow Process</p>
            <div className="space-y-2 text-sm">
              <p>1️⃣ User พิมพ์ / เลือก items</p>
              <p>2️⃣ Backend parse ข้อมูล → Query DB</p>
              <p>3️⃣ Bot ตอบกลับ: รายการ + ราคา</p>
              <p>4️⃣ User บอกที่อยู่ / วิธีชำระ</p>
              <p>5️⃣ Bot ยืนยันรวมทั้งสิ้น + ปุ่มยืนยัน</p>
              <p>6️⃣ User กด ✓ ยืนยัน</p>
              <p>7️⃣ Backend สร้าง Order ID + ส่ง Confirmation</p>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-400 p-4 rounded-lg">
            <p className="font-bold text-yellow-900">⚙️ Backend สำคัญ</p>
            <div className="space-y-2 text-xs text-gray-700 mt-2">
              <p>🤖 NLP Parser: ตีความข้อความของ User</p>
              <p>📊 Inventory Check: ตรวจสินค้า</p>
              <p>📍 Address Geocode: ตรวจที่อยู่ & ระยะทาง</p>
              <p>💰 Calculate: ราคา + ค่าจัดส่ง</p>
              <p>💾 Save: สร้าง Order Record</p>
            </div>
          </div>
        </div>
      )
    },

    {
      id: 5,
      title: '💳 วิธีที่ 5: Payment Gateway (QR Code / PromptPay)',
      icon: '💰',
      color: 'from-pink-500 to-rose-500',
      description: 'ชำระเงินผ่าน QR Code / PromptPay',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border-2 border-pink-400">
              <h3 className="font-bold text-pink-900 mb-3">💳 Payment Methods</h3>
              
              <div className="space-y-3 text-sm">
                <div className="bg-pink-50 p-3 rounded border-l-4 border-green-500">
                  <p className="font-bold text-green-700">ตัวเลือก 1: เงินสด (COD)</p>
                  <p className="text-xs text-gray-600 mt-1">
                    ผู้ส่งเก็บเงิน (Default)
                  </p>
                </div>

                <div className="bg-pink-50 p-3 rounded border-l-4 border-blue-500">
                  <p className="font-bold text-blue-700">ตัวเลือก 2: QR Code</p>
                  <p className="text-xs text-gray-600 mt-1">
                    PromptPay / ทรูมันนี่ / ธนาคาร
                  </p>
                </div>

                <div className="bg-pink-50 p-3 rounded border-l-4 border-purple-500">
                  <p className="font-bold text-purple-700">ตัวเลือก 3: Line Pay</p>
                  <p className="text-xs text-gray-600 mt-1">
                    โดยตรงในแอป Line
                  </p>
                </div>

                <div className="bg-pink-50 p-3 rounded border-l-4 border-orange-500">
                  <p className="font-bold text-orange-700">ตัวเลือก 4: Card</p>
                  <p className="text-xs text-gray-600 mt-1">
                    บัตรเครดิต (Stripe / 2C2P)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border-2 border-pink-400">
              <h3 className="font-bold text-pink-900 mb-3">🔲 QR Code Flow</h3>
              
              <div className="space-y-3 text-sm">
                <div className="bg-gradient-to-b from-white to-gray-100 p-4 rounded border-2 border-gray-300 text-center">
                  <p className="text-xs font-bold text-gray-700 mb-2">Generated QR Code:</p>
                  <div className="bg-white p-3 rounded inline-block border-2 border-gray-400">
                    <div className="text-center">
                      <div className="inline-block">
                        <div className="grid grid-cols-6 gap-px bg-black p-2">
                          {Array(36).fill(0).map((_, i) => (
                            <div key={i} className="w-2 h-2 bg-black"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    มูลค่า: 260 ฿
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-pink-50 border-2 border-pink-400 p-4 rounded-lg">
            <p className="font-bold text-pink-900 mb-3">📲 How It Works</p>
            <div className="space-y-2 text-sm">
              <div className="bg-white p-3 rounded">
                <p className="font-bold">1. Bot ส่ง QR Code ใน LINE Chat</p>
                <p className="text-xs text-gray-600">พร้อมข้อมูล: จำนวนเงิน + Ref Number</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="font-bold">2. Customer สแกน QR ด้วย PromptPay App</p>
                <p className="text-xs text-gray-600">Transfer เงินจากแอปธนาคาร</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="font-bold">3. Bank ส่ง Callback ให้ Bot</p>
                <p className="text-xs text-gray-600">Confirm Payment + Reference Number</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="font-bold">4. Bot ส่ง Receipt + Order ID ไป LINE</p>
                <p className="text-xs text-gray-600">Payment Status: ✓ Paid</p>
              </div>
            </div>
          </div>

          <div className="bg-pink-50 border-2 border-pink-400 p-4 rounded-lg">
            <p className="font-bold text-pink-900">⚙️ Integration Services</p>
            <div className="grid grid-cols-2 gap-2 text-xs mt-2">
              <div className="bg-white p-2 rounded">• PromptPay API</div>
              <div className="bg-white p-2 rounded">• Stripe</div>
              <div className="bg-white p-2 rounded">• 2C2P</div>
              <div className="bg-white p-2 rounded">• LINE Pay API</div>
              <div className="bg-white p-2 rounded">• Omise</div>
              <div className="bg-white p-2 rounded">• Kasikornbank</div>
            </div>
          </div>
        </div>
      )
    },

    {
      id: 6,
      title: '📡 วิธีที่ 6: Order Status Updates ผ่าน LINE',
      icon: '🔔',
      color: 'from-teal-500 to-cyan-500',
      description: 'ส่ง Notification ตอนสถานะเปลี่ยน',
      content: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border-2 border-teal-400">
            <h3 className="font-bold text-teal-900 mb-3">📢 Push Notification Flow</h3>
            
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">✓</div>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-teal-900">สั่งเสร็จ (10:12)</p>
                  <p className="text-sm text-gray-600">Order ID: ORD-2024-001234</p>
                  <div className="bg-green-50 p-2 rounded mt-2 text-xs">
                    <p>✓ ได้รับออเดอร์แล้ว</p>
                    <p>⏱️ เวลาประมาณ 30 นาที</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">→</div>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-teal-900">กำลังเตรียม (10:14)</p>
                  <p className="text-sm text-gray-600">ผู้เตรียม: สมหญิง</p>
                  <div className="bg-blue-50 p-2 rounded mt-2 text-xs">
                    <p>🍜 กำลังเตรียมอาหาร</p>
                    <p>⏱️ เหลือประมาณ 25 นาที</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm">→</div>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-teal-900">เสร็จเตรียม (10:19)</p>
                  <p className="text-sm text-gray-600">พร้อมมอบให้ผู้ส่ง</p>
                  <div className="bg-orange-50 p-2 rounded mt-2 text-xs">
                    <p>📦 อาหารพร้อมแล้ว</p>
                    <p>🚚 รอผู้ส่งไป</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm">🚚</div>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-teal-900">ออกจัดส่ง (10:20)</p>
                  <p className="text-sm text-gray-600">ผู้ส่ง: สมชาติ</p>
                  <div className="bg-purple-50 p-2 rounded mt-2 text-xs">
                    <p>📍 ไรเดอร์ออกจากร้าน</p>
                    <p>🗺️ เปิดแผนที่ได้ที่นี่</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">✓</div>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-teal-900">ส่งสำเร็จ (10:35)</p>
                  <p className="text-sm text-gray-600">ได้รับอาหารแล้ว</p>
                  <div className="bg-green-50 p-2 rounded mt-2 text-xs">
                    <p>✓ ลูกค้ายืนยันการรับ</p>
                    <p>⭐ ให้คะแนนร้าน</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-teal-50 border-2 border-teal-400 p-4 rounded-lg">
            <p className="font-bold text-teal-900 mb-3">🔧 How to Send via LINE</p>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs overflow-auto max-h-48">
              <pre>{`// Push Message to User's LINE
const response = await fetch(
  'https://api.line.biz/v2/bot/message/push',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to: userLineId,  // ได้จากตอนแรก add OA
      messages: [
        {
          type: 'flex',
          altText: 'Status Updated',
          contents: {
            type: 'bubble',
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: '✓ ได้รับออเดอร์แล้ว'
                },
                {
                  type: 'text',
                  text: 'Order: ORD-001234'
                }
              ]
            }
          }
        }
      ]
    })
  }
);`}</pre>
            </div>
          </div>

          <div className="bg-teal-50 border-2 border-teal-400 p-4 rounded-lg">
            <p className="font-bold text-teal-900">⏰ When to Send Notification</p>
            <ul className="text-sm space-y-1 text-gray-700 mt-2">
              <li>✓ เมื่อได้รับออเดอร์ (Immediate)</li>
              <li>✓ เมื่อเริ่มเตรียม (เบิก DB)</li>
              <li>✓ เมื่อเสร็จเตรียม (ยืนยันจาก Chef)</li>
              <li>✓ เมื่อออกจัดส่ง + GPS</li>
              <li>✓ เมื่อส่งสำเร็จ (ลูกค้ายืนยัน)</li>
            </ul>
          </div>
        </div>
      )
    },

    {
      id: 7,
      title: '🤖 วิธีที่ 7: NLP (Natural Language Processing)',
      icon: '💬',
      color: 'from-indigo-500 to-blue-500',
      description: 'ทำให้ Bot เข้าใจภาษาธรรมชาติ',
      content: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border-2 border-indigo-400">
            <h3 className="font-bold text-indigo-900 mb-3">🧠 AI-Powered Bot Examples</h3>
            
            <div className="space-y-3 text-sm">
              <div className="bg-indigo-50 p-3 rounded">
                <p className="font-bold">User: "ผัดไทย 2 ที่ เผ็ด"</p>
                <p className="text-xs text-gray-600 mt-2">↓ NLP Parser</p>
                <div className="bg-white p-2 rounded mt-1 border-l-4 border-green-500">
                  <p className="font-mono text-xs">
                    {`{
  items: ["ผัดไทย"],
  quantity: 2,
  special_request: "เผ็ด"
}`}
                  </p>
                </div>
              </div>

              <div className="bg-indigo-50 p-3 rounded">
                <p className="font-bold">User: "ราคาต้มยำเท่าไหร่"</p>
                <p className="text-xs text-gray-600 mt-2">↓ Intent: Query Price</p>
                <div className="bg-white p-2 rounded mt-1 border-l-4 border-blue-500">
                  <p className="font-semibold text-blue-700">Bot: ต้มยำกุ้ง 120 ฿</p>
                </div>
              </div>

              <div className="bg-indigo-50 p-3 rounded">
                <p className="font-bold">User: "ส่งไปที่บ้านฉัน ซ.มิตรภาพ"</p>
                <p className="text-xs text-gray-600 mt-2">↓ NLP: Extract Address</p>
                <div className="bg-white p-2 rounded mt-1 border-l-4 border-orange-500">
                  <p className="font-mono text-xs">
                    {`{
  action: "set_delivery_address",
  address: "ซ. มิตรภาพ"
}`}
                  </p>
                </div>
              </div>

              <div className="bg-indigo-50 p-3 rounded">
                <p className="font-bold">User: "ดูประวัติการสั่งสินค้า"</p>
                <p className="text-xs text-gray-600 mt-2">↓ Intent: View History</p>
                <div className="bg-white p-2 rounded mt-1 border-l-4 border-purple-500">
                  <p className="font-semibold text-purple-700">Bot: ส่ง Order History List</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 border-2 border-indigo-400 p-4 rounded-lg">
            <p className="font-bold text-indigo-900 mb-3">🔧 NLP Tools & Services</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2 rounded border">
                <p className="font-bold">Google Dialogflow</p>
                <p className="text-gray-600">Intent + Entity</p>
              </div>
              <div className="bg-white p-2 rounded border">
                <p className="font-bold">AWS Lex</p>
                <p className="text-gray-600">ML-based</p>
              </div>
              <div className="bg-white p-2 rounded border">
                <p className="font-bold">Microsoft LUIS</p>
                <p className="text-gray-600">Language Understanding</p>
              </div>
              <div className="bg-white p-2 rounded border">
                <p className="font-bold">ChatGPT / Claude API</p>
                <p className="text-gray-600">Custom Training</p>
              </div>
              <div className="bg-white p-2 rounded border">
                <p className="font-bold">Thai NLP Lib</p>
                <p className="text-gray-600">pyThaiNLP (Python)</p>
              </div>
              <div className="bg-white p-2 rounded border">
                <p className="font-bold">Custom Rule-based</p>
                <p className="text-gray-600">Regex + Keywords</p>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 border-2 border-indigo-400 p-4 rounded-lg">
            <p className="font-bold text-indigo-900">💡 Implementation Example</p>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs overflow-auto max-h-40">
              <pre>{`// Simple NLP with Regex
const userMessage = "ผัดไทย 2 ที่";

const menuPattern = /ผัดไทย|ต้มยำ|น้ำปั่น/;
const qtyPattern = /(\d+)\s*ที่/;

const menu = userMessage.match(menuPattern)[0];
const qty = parseInt(userMessage.match(qtyPattern)[1]);

// Output: {menu: "ผัดไทย", qty: 2}`}</pre>
            </div>
          </div>
        </div>
      )
    },

    {
      id: 8,
      title: '📊 วิธีที่ 8: Analytics & Reporting',
      icon: '📈',
      color: 'from-green-500 to-emerald-500',
      description: 'เก็บข้อมูล User Behavior สำหรับวิเคราะห์',
      content: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border-2 border-green-400">
            <h3 className="font-bold text-green-900 mb-3">📊 LINE User Data Collection</h3>
            
            <div className="space-y-3 text-sm">
              <div className="bg-green-50 p-3 rounded">
                <p className="font-bold text-green-700">User Profile (จาก LINE)</p>
                <p className="text-xs text-gray-600 mt-1">Line User ID, Display Name, Profile Image, Status Message</p>
              </div>

              <div className="bg-green-50 p-3 rounded">
                <p className="font-bold text-green-700">Message Behavior</p>
                <p className="text-xs text-gray-600 mt-1">Message Type, Keywords, Timestamp, Response Time, Rich Menu Clicks</p>
              </div>

              <div className="bg-green-50 p-3 rounded">
                <p className="font-bold text-green-700">Order Metrics</p>
                <p className="text-xs text-gray-600 mt-1">Order Frequency, Average Order Value, Favorite Items, Delivery Address, Payment Method</p>
              </div>

              <div className="bg-green-50 p-3 rounded">
                <p className="font-bold text-green-700">Engagement</p>
                <p className="text-xs text-gray-600 mt-1">Last Interaction, Open Rate (Notification), Click Rate (Menu), Conversion Rate</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-2 border-green-400 p-4 rounded-lg">
            <p className="font-bold text-green-900 mb-3">📈 Dashboard Example</p>
            <div className="grid grid-cols-4 gap-2 text-center text-xs mb-3">
              <div className="bg-blue-100 p-2 rounded">
                <p className="font-bold text-blue-900">2,350</p>
                <p className="text-gray-600">Followers</p>
              </div>
              <div className="bg-orange-100 p-2 rounded">
                <p className="font-bold text-orange-900">45%</p>
                <p className="text-gray-600">Active Rate</p>
              </div>
              <div className="bg-green-100 p-2 rounded">
                <p className="font-bold text-green-900">1,250</p>
                <p className="text-gray-600">Orders/Month</p>
              </div>
              <div className="bg-purple-100 p-2 rounded">
                <p className="font-bold text-purple-900">42.5K</p>
                <p className="text-gray-600">Revenue</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <p className="font-bold text-green-900">📊 Top Items</p>
              <div className="bg-white p-2 rounded">
                <p>🍜 ผัดไทย: 450 orders (36%)</p>
                <p>🍲 ต้มยำกุ้ง: 280 orders (22%)</p>
                <p>🥤 น้ำปั่น: 520 orders (42%)</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-2 border-green-400 p-4 rounded-lg">
            <p className="font-bold text-green-900">💾 Store Data Structure</p>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs overflow-auto max-h-40">
              <pre>{`lineUserBehavior {
  lineUserId: "U1234567...",
  displayName: "สมชาย",
  profilePictureUrl: "...",
  followedAt: "2024-01-01",
  messages: [{
    messageId, type, text, timestamp
  }],
  richMenuClicks: [{
    label, timestamp, action
  }],
  orders: [{
    orderId, items, total,
    deliveryAddress, paymentMethod
  }]
}`}</pre>
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentMethod = methods.find(m => m.id === activeMethod);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mb-2">
            🍜 LINE Integration for Food Delivery App
          </h1>
          <p className="text-gray-400 text-lg">วิธีต่างๆในการให้ลูกค้าใช้งานผ่าน LINE</p>
          <p className="text-gray-500 text-sm mt-2">8 วิธีที่ใช้งานจริง + Technical Implementation</p>
        </div>

        {/* Method Navigation */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2 scroll-smooth">
          {methods.map(method => (
            <button
              key={method.id}
              onClick={() => setActiveMethod(method.id)}
              className={`px-4 py-3 rounded-lg font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                activeMethod === method.id
                  ? 'bg-white text-slate-900 shadow-lg scale-105'
                  : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}
            >
              <span className="text-lg mr-2">{method.icon}</span>
              <span className="text-sm">วิธี {method.id}</span>
            </button>
          ))}
        </div>

        {/* Current Method */}
        {currentMethod && (
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            {/* Method Header */}
            <div className={`bg-gradient-to-r ${currentMethod.color} p-6 text-white`}>
              <h2 className="text-3xl font-black mb-2">{currentMethod.title}</h2>
              <p className="text-white/90 text-sm">{currentMethod.description}</p>
            </div>

            {/* Method Content */}
            <div className="bg-white p-8">
              {currentMethod.content}
            </div>

            {/* Navigation */}
            <div className="bg-slate-900 p-4 flex justify-between items-center">
              <button
                onClick={() => setActiveMethod(Math.max(1, activeMethod - 1))}
                disabled={activeMethod === 1}
                className={`px-6 py-2 rounded-lg font-bold transition-all ${
                  activeMethod === 1
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                ← ก่อนหน้า
              </button>

              <div className="text-white font-bold text-center">
                <p className="text-sm">วิธี {activeMethod} / {methods.length}</p>
                <div className="w-48 h-2 bg-slate-700 rounded-full mt-2">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full transition-all"
                    style={{ width: `${(activeMethod / methods.length) * 100}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => setActiveMethod(Math.min(methods.length, activeMethod + 1))}
                disabled={activeMethod === methods.length}
                className={`px-6 py-2 rounded-lg font-bold transition-all ${
                  activeMethod === methods.length
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                ถัดไป →
              </button>
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded-lg p-6 text-white">
            <p className="font-bold text-lg mb-3">🎯 วิธีที่ดีที่สุดสำหรับสต้อร์นายไปโล้ก</p>
            <ul className="space-y-2 text-sm">
              <li>✓ Rich Menu (Simple Navigation)</li>
              <li>✓ Flex Message (Beautiful Display)</li>
              <li>✓ Chat + Confirmation (Easy Ordering)</li>
              <li>✓ QR Code Payment (Secure)</li>
              <li>✓ Push Notification (Real-time Updates)</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg p-6 text-white">
            <p className="font-bold text-lg mb-3">💻 Tech Stack ที่ต้อง</p>
            <ul className="space-y-2 text-sm">
              <li>✓ LINE Messaging API</li>
              <li>✓ Webhook Server</li>
              <li>✓ Payment Gateway (QR/PromptPay)</li>
              <li>✓ NLP Library (Optional)</li>
              <li>✓ Database (Orders + Users)</li>
            </ul>
          </div>
        </div>

        {/* Flow Chart */}
        <div className="mt-8 bg-slate-700 rounded-lg p-6 text-white">
          <p className="font-bold text-lg mb-4">🔄 Complete LINE Flow</p>
          <div className="space-y-2 text-sm font-mono overflow-x-auto">
            <p>Customer Add OA</p>
            <p>   ↓ (Show Rich Menu)</p>
            <p>Click Menu → Send Postback Event</p>
            <p>   ↓ (Webhook Received)</p>
            <p>Backend Parse Event → Database Query</p>
            <p>   ↓ (Send Flex Message)</p>
            <p>Display Items in Chat</p>
            <p>   ↓ (User Selects + Confirms)</p>
            <p>Create Order → Generate QR Code</p>
            <p>   ↓ (Send QR via Message)</p>
            <p>Customer Scans → Payment Gateway</p>
            <p>   ↓ (Payment Callback)</p>
            <p>Confirm Order → Push Notification</p>
            <p>   ↓ (Status Updates)</p>
            <p>Preparing → Out for Delivery → Delivered</p>
            <p>   ↓ (Send Receipt + Rating Request)</p>
            <p>Order Complete</p>
          </div>
        </div>
      </div>
    </div>
  );
}
