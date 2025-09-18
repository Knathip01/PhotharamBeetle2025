import React, { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaFacebookMessenger,
  FaTimes,
  FaComments,
  FaClock,
} from "react-icons/fa";

// ✅ รูปจากโปรเจกต์ (ใช้เป็นภาพสินค้า + fallback)
import LocalBeetleImg1 from "../../assets/COMING SOON/73d1b7ce-5a00-4988-8980-f8c1e18a8bb0.jpg";
import LocalBeetleImg2 from "../../assets/COMING SOON/ยีราฟ.jpg";
import LocalBeetleImg3 from "../../assets/COMING SOON/เขี้ยวจันทร์.jpg";
import LocalBeetleImg4 from "../../assets/COMING SOON/ปลวก.jpg";
import LocalBeetleImg5 from "../../assets/COMING SOON/เขี้ยวย้น.jpg";
import LocalBeetleImg6 from "../../assets/COMING SOON/สมันอกดำ.jpg";
import LocalBeetleImg7 from "../../assets/COMING SOON/4f243101-faf8-475f-83df-0670491d3b55.jpg";
import LocalBeetleImg8 from "../../assets/COMING SOON/079ebd3e-d7ea-4ef7-827c-893c88dc2620.jpg";


// ================== ลิงก์ติดต่อ ==================
const LINKS = {
  messenger: "https://www.facebook.com/messages/t/1793673580933878",
  facebook: "https://www.facebook.com/PhotharamBeetle",
  instagram: "https://www.instagram.com/photharam_beetle?igsh=OWEyeWZyMG82ZjF2&utm_source=qr",
};

// ================== สินค้า (โหมด SOON: ไม่ต้องมี price) ==================
const products = [
  {
    id: 1,
    name: "lucanus cervus akbesianus",
    image: LocalBeetleImg1,
    description: "",
    tags: ["กำลังมา", "70xffxff"],
  },
{
    id: 7,
    name: "Cyclommatus metalifer",
    image: LocalBeetleImg7,
    description: "ด้วงคีมเนื้อทรายเมทาลิเฟอร์(ม่วง)",
    tags: ["กำลังมา", "80xff"],
  },

   {
    id: 8,
    name: "Dorcus titanus palawanicus",
    image: LocalBeetleImg8,
    description: "ด้วงคีมพาราวัล",
    tags: ["กำลังมา", "98"],
  },
  {
    id: 2,
    name: "Prosopocoilus giraffa",
    image: LocalBeetleImg2,
    description: "ด้วงคีมยีราฟ",
    tags: ["กำลังเพาะ", "94xffxff"],
  },
  {
    id: 3,
    name: "Cyclommatus lunifer",
    image: LocalBeetleImg3,
    description: "ด้วงคีมเนื้อทรายเขี้ยวจันทร์",
    tags: ["กำลังเพาะ", "44xffxff"],
  },
  {
    id: 4,
    name: "Homoderus mellyi",
    image: LocalBeetleImg4,
    description: "ด้วงคีมปลวก",
    tags: ["พักตัว", "51xffxff"],
  },
  {
    id: 5,
    name: "Prosopocoilus spencei mandiburalis",
    image: LocalBeetleImg5,
    description: "ด้วงคีมเขี้ยวย้น",
    tags: ["กำลังเพาะ", "31xffxff"],
  },
  {
    id: 6, // แก้จาก 5 -> 6 เพื่อไม่ให้ซ้ำ
    name: "Rhaetulus crenatus boileaui",
    image: LocalBeetleImg6,
    description: "ด้วงสมันอกดำ, สมันเวียดนาม",
    tags: ["พักตัว", "42 x FF"],
  },
];

// ================== พื้นหลังอนิเมชันธรรมชาติ + แมลงบิน ==================
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

        /* ── Shine overlay สำหรับการ์ด */
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

/* ================== รูปสินค้าแบบมี fallback + skeleton ================== */
function ProductImage({ src, alt, className }) {
  const [broken, setBroken] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const resolvedSrc = broken ? LocalBeetleImg1 : src;

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      {/* Skeleton */}
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

      {/* Overlay COMING SOON บนรูป */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-90 pointer-events-none" />
      <div className="absolute bottom-2 left-2 inline-flex items-center gap-2 px-2 py-1 rounded-lg text-[11px] font-bold text-white bg-white/10 backdrop-blur-md border border-white/20 shadow">
        <FaClock className="opacity-90" />
        <span>COMING SOON</span>
      </div>
    </div>
  );
}

/* ================== ริบบิ้น SOON ================== */
function SoonRibbon() {
  return (
    <div
      className="absolute top-2 left-2 z-10 px-2 py-1 rounded-lg text-[10px] font-extrabold text-white shadow
                 bg-gradient-to-r from-fuchsia-500 to-violet-500"
      title="Coming soon"
    >
    
    </div>
  );
}

/* ================== การ์ดสินค้า — โหมด COMING SOON ================== */
function ProductCard({ product }) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, scale: 1 });

  const onMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
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
    >
      <div className="shine relative rounded-2xl bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl border border-white/30 dark:border-white/10 w-[270px]">
        {/* Ribbon SOON */}
        <SoonRibbon />

        {/* รูป */}
        <ProductImage className="h-[180px]" src={product.image} alt={product.name} />

        {/* เนื้อหา */}
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug line-clamp-2">
              {product.name}
            </h3>
            {/* ป้าย SOON แทนราคา */}
            <span className="shrink-0 px-2 py-1 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white shadow">
           
            </span>
          </div>

          <p className="text-[12px] text-gray-600 dark:text-gray-300 line-clamp-2">
            {product.description || "เตรียมพบกันเร็วๆ นี้"}
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

          {/* แถบแจ้งเตือนด้านล่าง */}
          <div className="mt-2 rounded-lg border border-dashed border-violet-400/40 bg-violet-500/10 px-2 py-1 text-[11px] text-violet-700 dark:text-violet-300">
            ติดตามเพจเพื่ออัปเดตวันเปิดขาย
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
  return (
    <div style={{ minHeight: "100vh", padding: "20px" }}>
      <AnimatedNatureBackground />
      <div className="flex flex-wrap justify-center">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <ContactFloat />
    </div>
  );
}
