// PliersBeetle.jsx — รายการสินค้า + ตะกร้า + ส่งสรุป Messenger + บันทึก PNG
// เงื่อนไข: ไม่มี ShippingDock, เลือกวิธีขนส่งได้เฉพาะในตะกร้า,
// การ์ดสินค้าไม่แสดงตัวเลขค่าส่ง (โชว์ชื่อวิธีส่งอย่างเดียว), ใช้ตะกร้าร่วมกับหน้าก่อนหน้า

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaFacebookMessenger,
  FaTimes,
  FaComments,
  FaShoppingCart,
  FaPlus,
  FaMinus,
  FaTrash,
  FaDownload,
} from "react-icons/fa";
import * as htmlToImage from "html-to-image";

// ✅ รูปจากโปรเจกต์ (ใช้เป็นภาพสินค้า + fallback)
import LocalBeetleImg1 from "../../assets/PliersBeetle/ด้วงคีมเนื้อทรายเชียงใหม่.jpg";
import LocalBeetleImg2 from "../../assets/PliersBeetle/ด้วงคีมฟันเลื่อยเหนือ.jpg";
import LocalBeetleImg3 from "../../assets/PliersBeetle/ด้วงคีมสายรุ้ง.jpg";
import LocalBeetleImg9 from "../../assets/PliersBeetle/568806848_1234643452023762_4006766338099356887_n.jpg";
import LocalBeetleImg5 from "../../assets/PliersBeetle/566556860_1327375795170154_1995548746738752829_n.jpg";
import LocalBeetleImg6 from "../../assets/PliersBeetle/ด้วงคีมแลมพลีม่า.jpg";
import LocalBeetleImg7 from "../../assets/PliersBeetle/ด้วงคีมหลังม้าลาย.jpg";
import LocalBeetleImg8 from "../../assets/PliersBeetle/ด้วงคีมดาบญี่ปุ่น.jpg";
import LocalBeetleImg10 from "../../assets/PliersBeetle/567157107_24927779830241695_3009823137840965_n.jpg";
import LocalBeetleImg12 from "../../assets/PliersBeetle/569746139_1512363023347573_4045520004946656290_n.jpg";
import LocalBeetleImg13 from "../../assets/PliersBeetle/77ed2781-c9f2-4b1f-b9a6-2b1b09666a4f.jpg";
import LocalBeetleImg14 from "../../assets/PliersBeetle/581945496_1676019290379003_656026647770290313_n.jpg";

// ================== ลิงก์ติดต่อ ==================
const LINKS = {
  messenger: "https://www.facebook.com/messages/t/1793673580933878",
  facebook: "https://www.facebook.com/PhotharamBeetle",
  instagram:
    "https://www.instagram.com/photharam_beetle?igsh=OWEyeWZyMG82ZjF2&utm_source=qr",
};

// ================== สินค้า ==================
const products = [
 
 
 
 
 
  {
    id: 14,
    name: "Prosopocoilus giraffa",
    price: 250,
    image: LocalBeetleImg10,
    description: "ด้วงคีมคอยาว:ตัวอ่อน:L1: 1 ตัว",
    tags: ["wf1"],
    stock: 5,
  },

{
    id: 15,
    name: "prosopocoilus spencei ",
    price: 200,
    image: LocalBeetleImg12,
    description: "ด้วงคีมเขียวย่นน่าน:ตัวอ่อน:L1: 1 ตัว",
    tags: ["wf3"],
    stock: 5,
  },

 {
    id: 16,
    name: "Cyclommatus pahangensis chiangmaiensis",
    price: 400,
    image: LocalBeetleImg1,
    description: "ด้วงคีมเนื้อทรายเชียงใหม่:ตัวอ่อน:L3: 1 คู่",
    tags: ["wf1"],
    stock: 0,
  },





  {
    id: 17,
    name: "Dorcus titanus platymelus",
    price: 200,
    image: LocalBeetleImg2,
    description: "ด้วงคีมฟันเลื่อยเหนือ:ตัวอ่อน:L3: 1 ตัว พร้อมก้อนเห็ด",
    tags: ["wf1", "76xff"],
    stock: 3,
  },
  {
    id: 18,
    name: "Phalacrognathus mueller",
    price: 900,
    image: LocalBeetleImg3,
    description: "ด้วงคีมสายรุ้งสีแดงตัวเพาะไต้หวัน:ตัวอ่อน:L2-3: 1 คู่",
    tags: ["CBF2", "55xff"],
    stock: 0,
  },
 

  {
    id: 19,
    name: "Lamprima adolphinae",
    price: 800,
    image: LocalBeetleImg6,
    description: "ด้วงคีมแลมพลีม่าตัวเพาะญี่ปุ่น:ตัวอ่อน:L2-3: 1 คู่",
    tags: ["CBF1"],
    stock: 0,
  },
    {
    id: 20,
    name: "Prosopocoilus zebra nobuyuki",
    price: 300,
    image: LocalBeetleImg5,
    description: "ด้วงคีมหลังม้าลาย:อินโดนีเซีย :ตัวอ่อน:L1-2: 1 ตัว",
    tags: ["Wf5"],
    stock: 0,
  },
  {
    id: 21,
    name: "Prosopocoilus zebra nobuyuki",
    price: 800,
    image: LocalBeetleImg7,
    description: "ด้วงคีมหลังม้าลาย:อินโดนีเซีย :ตัวอ่อน:L3: 1 คู่",
    tags: ["Wf5"],
    stock: 0,
  },
  {
    id: 22,
    name: "Prosopocoilus inclinatus inclinatus",
    price: 300,
    image: LocalBeetleImg8,
    description: "ด้วงคีมดาบญี่ปุ่น:ตัวอ่อน:L1–2: 1 ตัว",
    tags: ["WF1", "55xff"],
    stock: 0,

  },
  {
    id: 23,
    name: "Prosopocoilus inclinatus inclinatus",
    price: 700,
    image: LocalBeetleImg9,
    description: "ด้วงคีมดาบญี่ปุ่น:ตัวอ่อน:L2-3: 1 คู่",
    tags: ["WF1", "55xff"],
    stock: 0,
  },
  {
    id: 41,
    name: "Cyclommatus metallifer",
    price: 400,
    image: LocalBeetleImg13,
    description: "ด้วงคีมเนื้อทรายเมทาลิเฟอร์:ตัวอ่อน:L1: 1 ตัว",
    tags: ["CBF1"],
    stock: 0,
  },

 {
    id: 44,
    name: "Homoderus mellyi",
    price: 350,
    image: LocalBeetleImg14,
    description: "ด้วงคีมเมลยี:ตัวอ่อน:L1: 1 ตัว",
    tags: ["CBF1"],
    stock: 0,
  },


];

// ================== Utils ==================
const formatTHB = (n) =>
  new Intl.NumberFormat("th-TH", { maximumFractionDigits: 0 }).format(n);

/* ================== พื้นหลังอนิเมชันธรรมชาติ + แมลงบิน ================== */
function AnimatedNatureBackground() {
  return (
    <>
      <style>{`
        .bg-sky-forest {
          position: fixed; inset: 0; z-index: -2;
          background: linear-gradient(120deg, #e0f7fa, #f1f8e9, #ffffff);
          background-size: 300% 300%;
          animation: skyDrift 30s ease-in-out infinite;
        }
        :root.dark .bg-sky-forest, .dark .bg-sky-forest {
          background: radial-gradient(1200px 600px at 70% -10%, #1b2a41, transparent 60%),
                      linear-gradient(140deg, #0b132b, #1c2541 40%, #3a506b);
          background-size: cover; animation: skyDriftDark 40s linear infinite;
        }
        @keyframes skyDrift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes skyDriftDark{0%{filter:brightness(1)}50%{filter:brightness(.95)}100%{filter:brightness(1)}}

        .bg-mist{
          position:fixed; inset:-10%; z-index:-1;
          background: radial-gradient(50% 40% at 30% 20%, rgba(255,255,255,0.35), transparent 60%),
                      radial-gradient(40% 35% at 80% 10%, rgba(255,255,255,0.25), transparent 60%),
                      radial-gradient(60% 45% at 50% 90%, rgba(255,255,255,0.2), transparent 60%);
          animation: mistFloat 60s ease-in-out infinite alternate; pointer-events:none;
        }
        :root.dark .bg-mist, .dark .bg-mist{
          background: radial-gradient(50% 40% at 30% 20%, rgba(255,255,255,0.07), transparent 60%),
                      radial-gradient(40% 35% at 80% 10%, rgba(255,255,255,0.06), transparent 60%),
                      radial-gradient(60% 45% at 50% 90%, rgba(255,255,255,0.05), transparent 60%);
        }
        @keyframes mistFloat{0%{transform:translateY(0)}100%{transform:translateY(-30px)}}

        .bug-layer{position:fixed; inset:0; z-index:-1; pointer-events:none; overflow:hidden}
        .bug{position:absolute; font-size:18px; opacity:.9; filter:drop-shadow(0 2px 2px rgba(0,0,0,.15))}
        @keyframes fly1{0%{transform:translate(-10%,110%) rotate(0);opacity:0}10%{opacity:1}50%{transform:translate(40vw,40vh) rotate(15deg)}100%{transform:translate(110%,-10%) rotate(0);opacity:0}}
        @keyframes fly2{0%{transform:translate(110%,100%) rotate(0);opacity:0}10%{opacity:1}50%{transform:translate(55vw,30vh) rotate(-10deg)}100%{transform:translate(-20%,-10%) rotate(0);opacity:0}}
        @keyframes fly3{0%{transform:translate(-10%,50%) rotate(0) scale(.9);opacity:0}10%{opacity:1}50%{transform:translate(50vw,10vh) rotate(5deg) scale(1)}100%{transform:translate(110%,0) rotate(-5deg) scale(.95);opacity:0}}
        .bug:nth-child(1){left:5%; bottom:-10%; animation:fly1 22s linear infinite; animation-delay:0s}
        .bug:nth-child(2){left:-5%; bottom:-8%;  animation:fly2 28s linear infinite; animation-delay:4s}
        .bug:nth-child(3){left:10%; bottom:-12%; animation:fly3 26s linear infinite; animation-delay:8s}
        .bug:nth-child(4){left:15%; bottom:-5%;  animation:fly1 24s linear infinite; animation-delay:12s}
        .bug:nth-child(5){left:-8%; bottom:-6%;  animation:fly2 30s linear infinite; animation-delay:16s}
        .bug:nth-child(6){left:20%; bottom:-9%;  animation:fly3 25s linear infinite; animation-delay:20s}

        .stars{position:fixed; inset:0; z-index:-1;
          background-image:
            radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.5), transparent 60%),
            radial-gradient(1.5px 1.5px at 40% 70%, rgba(255,255,255,0.4), transparent 60%),
            radial-gradient(2px 2px at 75% 20%, rgba(255,255,255,0.45), transparent 60%),
            radial-gradient(1.8px 1.8px at 65% 60%, rgba(255,255,255,0.35), transparent 60%);
          animation: twinkle 6s ease-in-out infinite alternate; pointer-events:none
        }
        :root.dark .stars, .dark .stars{opacity:.5}
        @keyframes twinkle{0%{opacity:.3;filter:blur(0)}100%{opacity:.6;filter:blur(.2px)}}

        .shine::before{
          content:""; position:absolute; inset:0; pointer-events:none;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,.25) 15%, transparent 30%);
          transform: translateX(-120%); transition: transform .6s ease;
        }
        .shine:hover::before{ transform: translateX(120%); }

        /* Safe Area */
        .pb-safe { padding-bottom: max(env(safe-area-inset-bottom), 16px); }
      `}</style>

      <div className="bg-sky-forest" />
      <div className="bg-mist" />
      <div className="stars" />

      <div className="bug-layer" aria-hidden="true">
        <span className="bug">🪲</span>
        <span className="bug">🦋</span>
        <span className="bug">🐞</span>
        <span className="bug">🪲</span>
        <span className="bug">🦋</span>
        <span className="bug">🐞</span>
      </div>
    </>
  );
}

/* ================== Floating Contact (AI style) ================== */
function ContactFloat() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen((s) => !s)}
        className="fixed bottom-5 right-5 z-40 group"
        aria-label={open ? "Close contact panel" : "Open contact panel"}
      >
        <div className="relative">
          <span className="absolute inset-0 rounded-full blur-md opacity-60 animate-ping bg-gradient-to-r from-blue-500 to-cyan-400" />
          <span className="absolute inset-0 rounded-full blur-[10px] opacity-60 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:opacity-80 transition" />
          <span className="relative inline-flex items-center justify-center w-14 h-14 rounded-full text-white shadow-2xl bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400 group-hover:scale-105 transition">
            {open ? <FaTimes size={22} /> : <FaComments size={22} />}
          </span>
        </div>
      </button>

      <div
        className={`fixed bottom-24 right-5 z-40 w-[300px] rounded-2xl border border-white/20 backdrop-blur-xl bg-white/70 dark:bg-gray-900/60 shadow-[0_10px_40px_rgba(0,0,0,0.25)] transition-all ${
          open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
        role="dialog"
        aria-label="ช่องทางติดต่อ"
      >
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="font-semibold text-gray-900 dark:text-gray-100">ติดต่อแอดมิน</p>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">เลือกช่องทางที่สะดวกได้เลย</p>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <a
              href={LINKS.facebook}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center gap-1 p-3 rounded-xl bg-white/60 dark:bg-gray-800/60 hover:bg-white/90 dark:hover:bg-gray-800 transition"
              title="ไปที่ Facebook"
            >
              <FaFacebook className="text-[#1877F2] group-hover:scale-110 transition" size={26} />
              <span className="text-[11px] text-gray-800 dark:text-gray-200">Facebook</span>
            </a>
            <a
              href={LINKS.instagram}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center gap-1 p-3 rounded-xl bg-white/60 dark:bg-gray-800/60 hover:bg-white/90 dark:hover:bg-gray-800 transition"
              title="ไปที่ Instagram"
            >
              <FaInstagram className="group-hover:scale-110 transition" size={26} />
              <span className="text-[11px] text-gray-800 dark:text-gray-200">Instagram</span>
            </a>
            <a
              href={`${LINKS.messenger}?text=${encodeURIComponent(
                "สวัสดีค่ะ สนใจสอบถามรายละเอียดสินค้า/สั่งซื้อค่ะ"
              )}`}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center gap-1 p-3 rounded-xl bg-white/60 dark:bg-gray-800/60 hover:bg-white/90 dark:hover:bg-gray-800 transition"
              title="แชตผ่าน Messenger"
            >
              <FaFacebookMessenger className="text-[#0084FF] group-hover:scale-110 transition" size={26} />
              <span className="text-[11px] text-gray-800 dark:text-gray-200">Messenger</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

/* ================== Hook: localStorage state ================== */
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);
  return [value, setValue];
}

/* ================== ล็อกสกอลล์เมื่อเปิดตะกร้า ================== */
function useLockBodyScroll(locked) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (locked) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

/* ================== Shipping ================== */
// ❗ ไม่แสดงตัวเลขค่าส่งบนการ์ด + ไม่มีไอคอน (เหมือน Beetle.jsx)
const SHIPPING_METHODS = {
  flash: {
    id: "flash",
    name: "Flash Express",
    price: 60,
    from: "from-amber-400",
    to: "to-orange-500",
  },
  ems: {
    id: "ems",
    name: "ไปรษณีย์ไทย EMS",
    price: 80,
    from: "from-rose-500",
    to: "to-red-500",
  },
};

function ShippingRibbon({ shipping }) {
  const opt = SHIPPING_METHODS[shipping] ?? SHIPPING_METHODS.flash;
  const label = opt.id === "flash" ? "Flash" : "EMS"; // ไม่มีตัวเลข
  return (
    <div
      className={`absolute top-2 left-2 z-10 px-2 py-1 rounded-lg text-[10px] font-bold text-white shadow bg-gradient-to-r ${opt.from} ${opt.to}`}
      title={opt.name}
    >
      {label}
    </div>
  );
}

/* ================== Cart Core (แชร์ตะกร้าร่วมกัน) ================== */
function useCart() {
  // ใช้ key เดียวกับหน้า Beetle.jsx เพื่อแชร์ตะกร้า
  const [items, setItems] = useLocalStorage("beetle_cart", []);

  const add = (product, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((it) => it.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty,
        },
      ];
    });
  };

  const remove = (id) => setItems((prev) => prev.filter((it) => it.id !== id));

  const setQty = (id, qty) =>
    setItems((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, qty: Math.max(1, qty) } : it))
        .filter((it) => it.qty > 0)
    );

  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((s, it) => s + it.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items]);

  return { items, add, remove, setQty, clear, count, subtotal };
}

/* ================== Cart UI ================== */
function CartFloat({ count, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="fixed bottom-5 right-24 z-40 group"
      aria-label="เปิดตะกร้าสินค้า"
      title="เปิดตะกร้าสินค้า"
    >
      <div className="relative">
        <span className="absolute -top-1 -right-1 min-w-6 h-6 px-1 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center shadow">
          {count}
        </span>
        <span className="absolute inset-0 rounded-full blur-md opacity-60 animate-ping bg-gradient-to-r from-emerald-400 to-cyan-400" />
        <span className="absolute inset-0 rounded-full blur-[10px] opacity-60 bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover:opacity-80 transition" />
        <span className="relative inline-flex items-center justify-center w-14 h-14 rounded-full text-white shadow-2xl bg-gradient-to-br from-emerald-600 via-cyan-500 to-blue-500 group-hover:scale-105 transition">
          <FaShoppingCart size={20} />
        </span>
      </div>
    </button>
  );
}

function CartPanel({ open, onClose, cart, shipping, onShippingChange }) {
  useLockBodyScroll(open);

  const ship = SHIPPING_METHODS[shipping] ?? SHIPPING_METHODS.flash;
  const shippingCost = cart.subtotal > 0 ? ship.price : 0;
  const total = cart.subtotal + shippingCost;

  // ===== ฟอร์มผู้รับสำหรับใบสรุป =====
  const [buyerName, setBuyerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // ===== อ้างอิงใบสรุป + ฟังก์ชันบันทึกรูป =====
  const receiptRef = useRef(null);
  const handleSaveImage = async () => {
    if (!receiptRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(receiptRef.current, {
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.download = `order-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Save image failed", err);
      alert("ไม่สามารถบันทึกรูปได้ กรุณาลองใหม่อีกครั้ง");
    }
  };

  const composeMessengerText = () => {
    const lines = [
      "สรุปคำสั่งซื้อจาก ShopBeetle",
      "รายการสินค้า:",
      ...cart.items.map(
        (it) => `- ${it.name} x${it.qty} = ฿${formatTHB(it.price * it.qty)}`
      ),
      `\nยอดรวมสินค้า: ฿${formatTHB(cart.subtotal)}`,
      `ค่าส่ง (${ship.name}): ฿${formatTHB(shippingCost)}`,
      `ยอดชำระรวม: ฿${formatTHB(total)}`,
      `\nชื่อผู้รับ: ${buyerName || "__________"}`,
      `เบอร์โทร: ${phone || "__________"}`,
      `ที่อยู่: ${address || "__________"}`,
    ];
    return encodeURIComponent(lines.join("\n"));
  };

  const todayTH = new Date().toLocaleString("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div
      className={`fixed inset-0 z-50 ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[620px] bg-white dark:bg-gray-900 border-l border-white/20 dark:border-white/10 shadow-2xl transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
        role="dialog"
        aria-label="ตะกร้าสินค้า"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-black/10 dark:border-white/10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 text-white shadow">
                <FaShoppingCart size={16} />
              </span>
              <h2 className="font-semibold">ตะกร้าสินค้า</h2>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {cart.count} รายการ
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg:white/5"
              aria-label="ปิด"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
          {/* ฟอร์มข้อมูลผู้รับ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            <div>
              <label className="text-xs text-gray-600 dark:text-gray-300">
                ชื่อผู้รับ
              </label>
              <input
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-gray-800"
                placeholder="ระบุชื่อผู้รับ"
                autoComplete="name"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 dark:text-gray-300">
                เบอร์โทร
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-gray-800"
                placeholder="ระบุเบอร์โทร"
                inputMode="tel"
                autoComplete="tel"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-gray-600 dark:text-gray-300">
                ที่อยู่จัดส่ง
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-gray-800"
                placeholder="บ้านเลขที่, ถนน, ตำบล, อำเภอ, จังหวัด, รหัสไปรษณีย์"
                autoComplete="street-address"
              />
            </div>
          </div>

          {/* รายการสินค้า */}
          <div className="space-y-3">
            {cart.items.length === 0 ? (
              <div className="text-center text-gray-600 dark:text-gray-300 py-10">
                ยังไม่มีสินค้าในตะกร้า
              </div>
            ) : (
              cart.items.map((it) => (
                <div
                  key={it.id}
                  className="flex items-center gap-3 p-3 rounded-xl border border-black/10 dark:border-white/10 bg-black/2 dark:bg-white/2"
                >
                  <img
                    src={it.image || LocalBeetleImg1}
                    alt={it.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold line-clamp-2">
                      {it.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      ฿{formatTHB(it.price)} / ชิ้น
                    </p>
                    <p className="text-xs font-semibold mt-1">
                      รวม: ฿{formatTHB(it.price * it.qty)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="w-8 h-8 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
                      onClick={() => cart.setQty(it.id, it.qty - 1)}
                      aria-label="ลดจำนวน"
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="w-8 text-center font-semibold">
                      {it.qty}
                    </span>
                    <button
                      className="w-8 h-8 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
                      onClick={() => cart.setQty(it.id, it.qty + 1)}
                      aria-label="เพิ่มจำนวน"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                  <button
                    className="ml-2 w-8 h-8 rounded-lg bg-rose-500/90 hover:bg-rose-600 text-white grid place-items-center"
                    onClick={() => cart.remove(it.id)}
                    aria-label="ลบสินค้า"
                    title="ลบสินค้า"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* ใบสรุป (ส่วนที่จะถูกแคปเป็นรูป) */}
          <div>
            <div
              ref={receiptRef}
              className="mx-auto w-[640px] max-w-full bg-white text-gray-900 rounded-2xl border border-black/10 shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-extrabold">
                    ShopBeetle — ใบสรุปคำสั่งซื้อ
                  </h3>
                  <p className="text-xs text-gray-600">{todayTH}</p>
                </div>
                <div className="text-right text-xs">
                  <p>วิธีส่ง: {ship.name}</p>
                  <p>ค่าส่ง: ฿{formatTHB(shippingCost)}</p>
                </div>
              </div>

              <hr className="my-4" />

              <div className="text-sm">
                <p>
                  <span className="font-semibold">ผู้รับ:</span>{" "}
                  {buyerName || "-"}
                </p>
                <p>
                  <span className="font-semibold">โทร:</span>{" "}
                  {phone || "-"}
                </p>
                <p>
                  <span className="font-semibold">ที่อยู่:</span>{" "}
                  {address || "-"}
                </p>
              </div>

              <div className="mt-4 border rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr className="text-left">
                      <th className="p-2">สินค้า</th>
                      <th className="p-2 text-right">ราคา/ชิ้น</th>
                      <th className="p-2 text-center">จำนวน</th>
                      <th className="p-2 text-right">รวม</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.items.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="p-4 text-center text-gray-500"
                        >
                          ไม่มีสินค้า
                        </td>
                      </tr>
                    ) : (
                      cart.items.map((it) => (
                        <tr key={it.id} className="border-t">
                          <td className="p-2">{it.name}</td>
                          <td className="p-2 text-right">
                            ฿{formatTHB(it.price)}
                          </td>
                          <td className="p-2 text-center">{it.qty}</td>
                          <td className="p-2 text-right">
                            ฿{formatTHB(it.price * it.qty)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>ยอดรวมสินค้า</span>
                  <span className="font-semibold">
                    ฿{formatTHB(cart.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>ค่าส่ง</span>
                  <span className="font-semibold">
                    ฿{formatTHB(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="font-bold">ยอดชำระรวม</span>
                  <span className="font-extrabold">
                    ฿{formatTHB(total)}
                  </span>
                </div>
              </div>

              <p className="mt-6 text-center text-xs text-gray-500">
                ขอบคุณที่อุดหนุน — Photharam Beetle
              </p>
            </div>
          </div>
        </div>

        {/* Footer: sticky bottom */}
        <div className="sticky bottom-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-t border-black/10 dark:border-white/10">
          <div className="px-4 py-3 pb-safe space-y-3">
            {/* เลือกวิธีขนส่ง (เฉพาะในตะกร้า) */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">ค่าส่ง</span>
                <div className="flex gap-2">
                  {Object.values(SHIPPING_METHODS).map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => onShippingChange(opt.id)}
                      className={`px-3 py-2 rounded-md text-xs sm:text-sm font-semibold text-white transition ${
                        (SHIPPING_METHODS[shipping] ?? SHIPPING_METHODS.flash)
                          .id === opt.id
                          ? `bg-gradient-to-r ${opt.from} ${opt.to}`
                          : "bg-gray-800/80 hover:bg-gray-800"
                      }`}
                      title={opt.name}
                    >
                      {opt.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  สินค้า ฿{formatTHB(cart.subtotal)} + ค่าส่ง ฿
                  {formatTHB(shippingCost)}
                </div>
                <div className="text-base sm:text-lg font-extrabold">
                  รวม ฿{formatTHB(total)}
                </div>
              </div>
            </div>

            {/* ปุ่มการทำงาน */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={cart.clear}
                className="px-3 py-3 rounded-lg text-sm sm:text-base font-semibold border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
                disabled={cart.items.length === 0}
              >
                ลบทั้งหมด
              </button>

              <button
                onClick={handleSaveImage}
                className={`px-3 py-3 rounded-lg text-sm sm:text-base font-semibold text-white ${
                  cart.items.length === 0
                    ? "bg-gray-400 opacity-60"
                    : "bg-gray-900 dark:bg-gray-800"
                }`}
                disabled={cart.items.length === 0}
                title="บันทึกสรุปออเดอร์เป็นรูปภาพ (PNG)"
              >
                <span className="inline-flex items-center gap-2 justify-center w-full">
                  <FaDownload /> บันทึก PNG
                </span>
              </button>

              <a
                href={`${LINKS.messenger}?text=${composeMessengerText()}`}
                target="_blank"
                rel="noreferrer"
                className={`col-span-2 inline-flex items-center justify-center px-4 py-3 rounded-lg text-sm sm:text-base font-bold text-white shadow ${
                  cart.items.length === 0
                    ? "pointer-events-none opacity-50 bg-gray-400"
                    : `bg-gradient-to-r ${ship.from} ${ship.to}`
                }`}
              >
                ส่งสรุปรายการสั่งซื้อทาง Messenger
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
/* ================== รูปสินค้าแบบมี fallback + skeleton ================== */
function ProductImage({ src, alt, className }) {
  const [broken, setBroken] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const resolvedSrc = broken ? LocalBeetleImg1 : src;

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800" />
      )}
      <img
        src={resolvedSrc}
        alt={alt}
        className={`h-full w-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        onError={() => setBroken(true)}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

/* ================== การ์ดสินค้า — ไม่แสดงตัวเลขค่าส่งบนการ์ด ================== */
function ProductCard({ product, shipping, onAdd }) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, scale: 1 });
  const ship = SHIPPING_METHODS[shipping] ?? SHIPPING_METHODS.flash;

  const stock = typeof product.stock === "number" ? product.stock : Infinity;
  const soldOut = stock === 0;

  const onMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -8;
    const ry = (px - 0.5) * 10;
    setTilt({ rx, ry, scale: 1.02 });
  };
  const onLeave = () => setTilt({ rx: 0, ry: 0, scale: 1 });

  return (
    <div
      className="group relative p-[1px] rounded-2xl bg-gradient-to-br from-emerald-300/70 via-cyan-400/70 to-blue-500/70 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)] transition-shadow"
      style={{
        transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.scale})`,
        transformStyle: "preserve-3d",
        willChange: "transform",
        margin: "18px",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      title={product.name}
    >
      <div className="shine relative rounded-2xl bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl border border-white/30 dark:border-white/10 w-[270px] overflow-hidden">
        {/* Ribbon วิธีส่ง (ไม่มีตัวเลข) */}
        <ShippingRibbon shipping={shipping} />

        {/* รูป + ป้ายสินค้าหมด */}
        <div className="relative h-[180px]">
          <ProductImage
            className={`h-[180px] ${soldOut ? "opacity-60 grayscale" : ""}`}
            src={product.image}
            alt={product.name}
          />
          {soldOut && (
            <div className="absolute inset-0 grid place-items-center">
              <span className="px-3 py-1 rounded-full bg-black/70 text-white text-xs font-bold">สินค้าหมด</span>
            </div>
          )}
        </div>

        {/* เนื้อหา */}
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug line-clamp-2">
              {product.name}
            </h3>
            <span className="shrink-0 px-2 py-1 rounded-full text-[11px] font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow">
              {formatTHB(product.price)} ฿
            </span>
          </div>

          <p className="text-[12px] text-gray-600 dark:text-gray-300 line-clamp-2">{product.description}</p>

          {product.tags?.length ? (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {product.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-[2px] rounded-full text-[10px] font-medium bg-gray-900/5 dark:bg-white/5 text-gray-700 dark:text-gray-200 border border-gray-900/10 dark:border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}

          {/* วิธีขนส่งที่เลือก (ไม่มีตัวเลข) */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] text-gray-600 dark:text-gray-300">วิธีขนส่งที่เลือก</span>
            <span
              className={`px-2 py-1 rounded-lg text-[12px] font-bold text-white bg-gradient-to-r ${ship.from} ${ship.to} shadow`}
              title={ship.name}
            >
              {ship.name}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onAdd(product)}
            disabled={soldOut}
            className={`w-full mt-2 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold shadow ${
              soldOut ? "bg-gray-400 text-white cursor-not-allowed" : "text-white bg-gradient-to-r from-emerald-600 via-cyan-500 to-blue-500 hover:opacity-95"
            }`}
            title={soldOut ? "สินค้าหมด" : "เพิ่มลงตะกร้า"}
          >
            <FaShoppingCart /> {soldOut ? "สินค้าหมด" : "เพิ่มลงตะกร้า"}
          </button>
        </div>

        {/* Glow ขอบล่าง */}
        <div className="pointer-events-none absolute -bottom-2 left-6 right-6 h-6 blur-xl bg-gradient-to-r from-emerald-400/40 via-cyan-400/40 to-blue-500/40 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}

// ================== หน้ารายการสินค้า (เหมือนไฟล์ก่อนหน้า) ==================
export default function PliersBeetle() {
  const [shipping, setShipping] = useLocalStorage("shipping_choice", "flash"); // "flash" | "ems"
  const cart = useCart();
  const [openCart, setOpenCart] = useState(false);

  // เพิ่มสินค้าแล้วเปิดตะกร้าอัตโนมัติ
  const handleAdd = (p) => {
    if (typeof p.stock === "number" && p.stock <= 0) return; // กันกดเพิ่มถ้าหมด
    cart.add(p, 1);
    setTimeout(() => setOpenCart(true), 150);
  };

  return (
    <div className="min-h-screen p-5">
      <AnimatedNatureBackground />

      {/* ตะกร้าลอย + ช่องทางติดต่อ */}
      <CartFloat count={cart.count} onOpen={() => setOpenCart(true)} />
      <ContactFloat />

      {/* สินค้า */}
      <div className="flex flex-wrap justify-center pb-24">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} shipping={shipping} onAdd={handleAdd} />
        ))}
      </div>

      {/* แผงตะกร้า (เลือกวิธีขนส่งได้ที่นี่เท่านั้น) */}
      <CartPanel
        open={openCart}
        onClose={() => setOpenCart(false)}
        cart={cart}
        shipping={shipping}
        onShippingChange={setShipping}
      />
    </div>
  );
}
