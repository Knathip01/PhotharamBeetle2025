import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

const LS_KEY = "orders";

const Order = () => {
  const [myOrders, setMyOrders] = useState([]);
  const fee = 100;
  const captureRef = useRef(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    setMyOrders(Array.isArray(orders) ? orders : []);
  }, []);

  // ===== helpers =====
  const persist = (orders) => {
    localStorage.setItem(LS_KEY, JSON.stringify(orders));
    setMyOrders(orders);
  };

  const handleDeleteOrder = (index) => {
    // ยืนยันก่อนลบ
    const ok = window.confirm(`ต้องการลบออเดอร์ที่ ${index + 1} ใช่ไหม?`);
    if (!ok) return;

    setMyOrders((prev) => {
      const next = [...prev];
      next.splice(index, 1);
      localStorage.setItem(LS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const handleClearAll = () => {
    const ok = window.confirm("ต้องการลบออเดอร์ทั้งหมดใช่ไหม?");
    if (!ok) return;
    localStorage.removeItem(LS_KEY);
    setMyOrders([]);
  };

  // แคปหน้า + ติดต่อแอดมิน
  const captureAndContact = async () => {
    if (!captureRef.current) return;

    try {
      const canvas = await html2canvas(captureRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      const blob = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b), "image/png")
      );
      if (!blob) return;

      const filename = `order-summary-${Date.now()}.png`;
      const file = new File([blob], filename, { type: "image/png" });

      // พยายามแชร์ด้วย Web Share API (มือถือที่รองรับ)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: "สรุปรายการสินค้า",
            text: "รบกวนตรวจสอบออเดอร์ครับ/ค่ะ 🙏",
          });
          window.open("https://www.facebook.com/photharambeetle", "_blank");
          return;
        } catch (err) {
          console.debug("Share cancelled or failed. Fallback to download.", err);
        }
      }

      // Fallback: ดาวน์โหลดรูป + เปิดเพจให้แนบเอง
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      window.open("https://www.facebook.com/photharambeetle", "_blank");
    } catch (e) {
      console.error(e);
      alert("ขออภัย เกิดข้อผิดพลาดในการสร้างรูปสรุป");
    }
  };

  return (
    <div className="p-5 text-gray-800 dark:text-gray-100">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h1 className="font-medium text-2xl">สรุปคำสั่งซื้อ</h1>

        {/* ปุ่มลบทั้งหมด */}
        {myOrders.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 active:scale-[0.98] transition"
            title="ลบออเดอร์ทั้งหมด"
          >
            ลบทั้งหมด
          </button>
        )}
      </div>

      {/* ส่วนที่จะ capture */}
      <div
        ref={captureRef}
        className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div className="grid grid-cols-3 gap-5 max-[1200px]:grid-cols-2 max-[700px]:grid-cols-1">
          {myOrders && myOrders.length > 0 ? (
            myOrders.map((order, index) => {
              const cart = JSON.parse(order.cart || "[]");
              const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

              return (
                <div
                  key={order?.id ?? index}
                  className="rounded-xl p-4 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
                >
                  {/* แถวหัวการ์ด + ปุ่มลบรายการนี้ */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold">ออเดอร์ที่ : {index + 1}</p>
                      <p className="font-medium">ชื่อผู้รับ: {order.username}</p>
                      <p className="font-medium">ที่อยู่: {order.address}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteOrder(index)}
                      className="px-3 py-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 active:scale-[0.98] transition text-sm"
                      title="ลบออเดอร์นี้"
                    >
                      ลบออเดอร์นี้
                    </button>
                  </div>

                  <div className="mt-2">
                    {cart.map((item, i) => (
                      <div key={`${item.name}-${i}`} className="flex justify-between font-light">
                        <p>{item.name} × {item.quantity}</p>
                        <p>{item.price.toLocaleString('th-TH')} บาท</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 border-t border-gray-300 dark:border-gray-600 pt-2">
                    <div className="flex justify-between">
                      <p className="font-medium">ค่าจัดส่ง</p>
                      <p className="font-medium">{fee.toLocaleString('th-TH')}</p>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between">
                        <p className="font-medium">ส่วนลด</p>
                        <p className="font-medium">{order.discount.toLocaleString('th-TH')}</p>
                      </div>
                    )}
                    <div className="flex justify-between mt-1 text-primary">
                      <p className="font-semibold">ยอดรวมทั้งสิ้น</p>
                      <p className="font-semibold">
                        {((total + fee) - (order.discount || 0)).toLocaleString('th-TH')} บาท
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 dark:text-gray-400">ยังไม่มีคำสั่งซื้อในระบบ</p>
          )}
        </div>
      </div>

      {/* ปุ่มติดต่อแอดมิน & ส่งรูปสรุป */}
      <div className="mt-5 flex flex-col gap-2">
        <button
          onClick={captureAndContact}
          className="bg-gradient-to-r from-primary to-secondary text-white px-5 py-3 rounded-xl shadow hover:opacity-95 active:scale-[0.99] transition"
        >
          ติดต่อแอดมิน & ส่งรูปสรุป
        </button>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          ระบบจะสร้างรูป “สรุปรายการสินค้า” และเปิด Facebook:{" "}
          <span className="underline">photharambeetle</span> เพื่อให้แนบรูปภาพส่งหาแอดมิน
        </p>
      </div>
    </div>
  );
};

export default Order;
