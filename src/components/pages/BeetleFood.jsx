import React, { useState, useEffect } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaFacebookMessenger,
  FaTimes,
  FaComments,
} from "react-icons/fa";
import { RiTruckLine, RiFlashlightLine } from "react-icons/ri";

// ✅ รูปจากโปรเจกต์ (ใช้เป็นภาพสินค้า + fallback)
import LocalBeetleImg1 from "../../assets/Beetle/มูดำ.jpg";
import LocalBeetleImg2 from "../../assets/Beetle/ดำxแดง.jpg";
import LocalBeetleImg3 from "../../assets/Beetle/ไต้หวัน.jpg";
import LocalBeetleImg4 from "../../assets/Beetle/เฮอร์.jpg";
import LocalBeetleImg5 from "../../assets/Beetle/เนปจูน.jpg";

// ================== ลิงก์ติดต่อ ==================
const LINKS = {
  messenger: "https://www.facebook.com/messages/t/1793673580933878",
  facebook: "https://www.facebook.com/PhotharamBeetle",
  instagram: "https://www.instagram.com/photharam_beetle?igsh=OWEyeWZyMG82ZjF2&utm_source=qr",
};

// ================== สินค้า ==================
const products = [
  {
    id: 1,
    name: "Allomyrina dichotomus politus",
    price: 190,
    image: LocalBeetleImg1,
    description: "มูชิคิงดำ:ตัวอ่อน:L3: 1 คู่",
    tags: ["CBF2", "75xff"],
  },
  {
    id: 2,
    name: "Allomyrina dichotoma",
    price: 290,
    image: LocalBeetleImg2,
    description: "มูชิคิงแดงพ่อตาดำxแม่ตาแดง:ตัวอ่อน:L3: 1 คู่",
    tags: ["CBF1", "70xff"],
  },
  {
    id: 3,
    name: "Allomyrina dichotoma tunobosonis",
    price: 80,
    image: LocalBeetleImg3,
    description: "มูชิคิงไต้หวัน:ตัวอ่อน:L1-2: 1 ตัว",
    tags: ["WF1", "คุ้มค่า"],
  },
  {
    id: 4,
    name: "Dynastes hercules hercules",
    price: 240,
    image: LocalBeetleImg4,
    description:
      "ด้วงกว่างเฮอร์คิวลิส:[ISS-JP01×S×][FF136×C68 meteor]×[No18·No19 × C68] ต้นตระกูลสายหนาจากญี่ปุ่น: ตัวอ่อน:L1-2: 1 ตัว",
    tags: ["WF1", "คุ้มค่า"],
  },
  {
    id: 5,
    name: "Dynastes neptunus",
    price: 390,
    image: LocalBeetleImg5,
    description: "มูชิคิงไต้หวัน:ตัวอ่อน:L1-2: 1 ตัว",
    tags: ["WF1", "122xff"],
  },
];

/* ================== พื้นหลังอนิเมชันธรรมชาติ + แมลงบิน (ตัวเลือก) ================== */
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
      `}</style>

      <div className="bg-sky-forest" />
      <div className="bg-mist" />
      <div className="stars" />

      <div className="bug-layer">
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
        className="fixed bottom-5 right-5 z-50 group"
        aria-label="Open contact panel"
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
        className={`fixed bottom-24 right-5 z-50 w-[300px] rounded-2xl border border-white/20 backdrop-blur-xl bg-white/70 dark:bg-gray-900/60 shadow-[0_10px_40px_rgba(0,0,0,0.25)] transition-all ${
          open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="font-semibold text-gray-900 dark:text-gray-100">ติดต่อแอดมิน </p>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">เลือกช่องทางที่สะดวกได้เลย</p>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <a
              href={LINKS.facebook}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center gap-1 p-3 rounded-xl bg-white/60 dark:bg-gray-800/60 hover:bg-white/90 dark:hover:bg-gray-800 transition"
            >
              <FaFacebook className="text-[#1877F2] group-hover:scale-110 transition" size={26} />
              <span className="text-[11px] text-gray-800 dark:text-gray-200">Facebook</span>
            </a>
            <a
              href={LINKS.instagram}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center gap-1 p-3 rounded-xl bg-white/60 dark:bg-gray-800/60 hover:bg-white/90 dark:hover:bg-gray-800 transition"
            >
              <FaInstagram className="text-pink-500 group-hover:scale-110 transition" size={26} />
              <span className="text:[11px] text-gray-800 dark:text-gray-200">Instagram</span>
            </a>
            <a
              href={`${LINKS.messenger}?text=${encodeURIComponent(
                "สวัสดีค่ะ สนใจสอบถามรายละเอียดสินค้า/สั่งซื้อค่ะ"
              )}`}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center gap-1 p-3 rounded-xl bg-white/60 dark:bg-gray-800/60 hover:bg-white/90 dark:hover:bg-gray-800 transition"
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

/* ================== Shipping ================== */
const SHIPPING_METHODS = {
  flash: {
    id: "flash",
    name: "Flash Express",
    price: 60,
    from: "from-amber-400",
    to: "to-orange-500",
    icon: <RiFlashlightLine size={18} />,
    tagline: "ประหยัด คุ้มค่า",
  },
  ems: {
    id: "ems",
    name: "ไปรษณีย์ไทย EMS",
    price: 80,
    from: "from-rose-500",
    to: "to-red-500",
    icon: <RiTruckLine size={18} />,
    tagline: "ด่วน มั่นใจ",
  },
};

function ShippingDock({ value, onChange }) {
  const m = SHIPPING_METHODS[value] ?? SHIPPING_METHODS.flash;

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-4 z-40 w-[95%] sm:w-[720px]">
      <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)]">
        <div className="rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-gray-900/60 border border-white/30 dark:border-white/10 px-4 py-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            {/* Left */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-white shadow">
                <RiTruckLine />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">เลือกวิธีขนส่ง</p>
                <p className="text-[11px] text-gray-600 dark:text-gray-300">ค่าส่งคิดต่อออเดอร์ (เปลี่ยนได้ตลอด)</p>
              </div>
            </div>

            {/* Center */}
            <div className="flex items-center gap-2">
              {Object.values(SHIPPING_METHODS).map((opt) => {
                const active = value === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => onChange(opt.id)}
                    aria-pressed={active}
                    className={`group inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-white shadow transition
                      ${active ? `bg-gradient-to-r ${opt.from} ${opt.to}` : "bg-gray-800/80 hover:bg-gray-800"}`}
                  >
                    <span className="opacity-90">{opt.icon}</span>
                    <span className="whitespace-nowrap">{opt.name}</span>
                    <span className="text-white/90 text-xs">฿{opt.price}</span>
                  </button>
                );
              })}
            </div>

            {/* Right */}
            <div className="text-right">
              <p className="text-[12px] text-gray-600 dark:text-gray-300">ค่าส่งที่เลือก</p>
              <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                {m.name} · {m.tagline} · ฿{m.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShippingRibbon({ shipping }) {
  const opt = SHIPPING_METHODS[shipping] ?? SHIPPING_METHODS.flash;
  return (
    <div
      className={`absolute top-2 left-2 z-10 px-2 py-1 rounded-lg text-[10px] font-bold text-white shadow
        bg-gradient-to-r ${opt.from} ${opt.to}`}
      title={`${opt.name} ฿${opt.price}`}
    >
      {opt.id === "flash" ? "Flash 60฿" : "EMS 80฿"}
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
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => setBroken(true)}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

/* ================== การ์ดสินค้า — เวอร์ชันทันสมัย + ค่าส่ง ================== */
function ProductCard({ product, shipping }) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, scale: 1 });
  const ship = SHIPPING_METHODS[shipping] ?? SHIPPING_METHODS.flash;
  const total = product.price + ship.price;

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ rx: (py - 0.5) * -8, ry: (px - 0.5) * 10, scale: 1.02 });
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
    >
      <div className="shine relative rounded-2xl bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl border border-white/30 dark:border-white/10 w-[270px]">
        {/* Ribbon ค่าส่ง */}
        <ShippingRibbon shipping={shipping} />

        {/* รูป */}
        <ProductImage className="h-[180px]" src={product.image} alt={product.name} />

        {/* เนื้อหา */}
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug line-clamp-2">
              {product.name}
            </h3>
            <span className="shrink-0 px-2 py-1 rounded-full text-[11px] font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow">
              {product.price.toLocaleString("th-TH")} ฿
            </span>
          </div>

          <p className="text-[12px] text-gray-600 dark:text-gray-300 line-clamp-2">
            {product.description}
          </p>

          {/* Tags */}
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

          {/* รวมราคาพร้อมค่าส่ง */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] text-gray-600 dark:text-gray-300">รวมพร้อมค่าส่ง</span>
            <span
              className={`px-2 py-1 rounded-lg text-[12px] font-bold text-white bg-gradient-to-r ${ship.from} ${ship.to} shadow`}
              title={`${ship.name} ฿${ship.price}`}
            >
              {total.toLocaleString("th-TH")} ฿
            </span>
          </div>
        </div>

        {/* Glow ขอบล่าง */}
        <div className="pointer-events-none absolute -bottom-2 left-6 right-6 h-6 blur-xl bg-gradient-to-r from-emerald-400/40 via-cyan-400/40 to-blue-500/40 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}

// ================== หน้ารายการสินค้า ==================
export default function Beetle() {
  const [shipping, setShipping] = useLocalStorage("shipping_choice", "flash"); // "flash" | "ems"

  return (
    <div style={{ minHeight: "100vh", padding: "20px" }}>
      <AnimatedNatureBackground />

      {/* แถบเลือกค่าส่งติดขอบล่าง */}
      <ShippingDock value={shipping} onChange={setShipping} />

      <div className="flex flex-wrap justify-center pb-24">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} shipping={shipping} />
        ))}
      </div>

      <ContactFloat />
    </div>
  );
}
