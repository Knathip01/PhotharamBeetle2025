import React, { useEffect, useState, useRef } from "react";
import Logo from "../../assets/logo.png";
import { FaCaretDown, FaTimes } from "react-icons/fa";
import DarkMode from "./DarkMode";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Menu = [
  { id: 1, name: "🏠 Home", link: "/" },
  { id: 2, name: "รายการเต็มวัย", link: "/beetle" },
  { id: 3, name: "ตัวอ่อนด้วงคีม", link: "/Pliers-beetle" },
  { id: 4, name: "ตัวอ่อนกว่างและดอกไม้", link: "/beetle-food" },
  { id: 5, name: "อาหารตัวอ่อน", link: "/beetle-feeding-equipment" },
];

const DropdownLinks = [
  { id: 1, name: "🔜 Beetles Coming Soon", link: "/trending-products" },
  { id: 2, name: "🎮 Beetle Feeding Game", link: "/top-rated" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);        // เปิด/ปิด drawer
  const [openGroup, setOpenGroup] = useState(true); // ยุบ/ขยายหมวดใน drawer
  const drawerRef = useRef(null);

  // ล็อกสกรอลตอนเปิด drawer
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : original || "";
    return () => (document.body.style.overflow = original || "");
  }, [open]);

  // ปิดด้วยปุ่ม Esc
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (to) => {
    // ไฮไลต์ลิงก์: ตรงเป๊ะหรือขึ้นต้น path เดียวกัน
    if (to === "/") return location.pathname === "/";
    return location.pathname === to || location.pathname.startsWith(to + "/");
  };

  const closeAndGo = (to) => {
    setOpen(false);
    navigate(to);
  };

  return (
    <div className="sticky top-0 z-40">
      {/* Glass/Gradient ribbon ด้านบน */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/25 via-transparent to-primary/25 opacity-80 dark:from-primary/20 dark:to-primary/20" />
        <div className="backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset] dark:shadow-[0_1px_0_0_rgba(0,0,0,0.4)_inset] border-b border-white/40 dark:border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex h-16 items-center justify-between">
              <Link
                to="/"
                className="group flex items-center gap-3"
                aria-label="Go to homepage"
              >
                <span className="relative">
                  <img
                    src={Logo}
                    alt="Logo"
                    className="w-10 h-10 rounded-2xl object-cover ring-2 ring-primary/50 shadow-sm transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* วงแหวนเรืองเบาๆ */}
                  <span className="pointer-events-none absolute inset-0 rounded-2xl ring-4 ring-primary/10 blur-[2px]" />
                </span>
                <span className="font-bold text-lg sm:text-xl tracking-wide text-gray-900 dark:text-gray-100">
                  PhotharamBeetle
                </span>
              </Link>

              {/* Desktop menu */}
              <nav className="hidden sm:flex items-center gap-1">
                {Menu.map((m) => {
                  const active = isActive(m.link);
                  return (
                    <Link
                      key={m.id}
                      to={m.link}
                      className={[
                        "relative px-4 py-2 rounded-xl transition",
                        "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white",
                        active
                          ? "bg-white/70 dark:bg-white/5 ring-1 ring-primary/30"
                          : "hover:bg-white/60 dark:hover:bg-white/5",
                      ].join(" ")}
                    >
                      <span className="relative z-10">{m.name}</span>
                      {/* เส้นไฮไลต์ใต้ลิงก์ */}
                      <span
                        className={[
                          "absolute left-3 right-3 -bottom-1 h-[2px] rounded-full transition-all",
                          active
                            ? "bg-primary/70 scale-x-100"
                            : "bg-primary/50 scale-x-0 group-hover:scale-x-100",
                        ].join(" ")}
                        aria-hidden="true"
                      />
                    </Link>
                  );
                })}

                {/* Dropdown */}
                <div className="relative group">
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/5 transition"
                    aria-haspopup="menu"
                    aria-expanded="false"
                  >
                    Beetles Coming Soon
                    <FaCaretDown className="transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                  <div
                    className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute right-0 mt-2 w-64 rounded-2xl border border-gray-200/60 dark:border-white/10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl ring-1 ring-black/5"
                    role="menu"
                  >
                    <div className="p-2">
                      {DropdownLinks.map((d) => (
                        <Link
                          key={d.id}
                          to={d.link}
                          className="block px-3 py-2 rounded-xl hover:bg-primary/10 dark:hover:bg-primary/20 text-gray-800 dark:text-gray-100"
                          role="menuitem"
                        >
                          {d.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dark mode toggle */}
                <div className="ml-2">
                  <DarkMode />
                </div>
              </nav>

              {/* Mobile: ปุ่มเปิด Drawer */}
              <div className="sm:hidden flex items-center gap-2">
                <DarkMode />
                <button
                  className="relative inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/60 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md shadow-sm active:scale-95 transition"
                  onClick={() => setOpen(true)}
                  aria-label="Open menu"
                >
                  <span role="img" aria-hidden="true">🪲</span>
                  <span className="text-sm font-medium">เมนู</span>
                  <span className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-primary/20 to-transparent opacity-70" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-[1px] transition-opacity duration-300 sm:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Drawer (Right) */}
      <aside
        ref={drawerRef}
        className={`fixed right-0 top-0 h-full w-[82%] max-w-[360px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl text-gray-900 dark:text-gray-100 shadow-2xl sm:hidden transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200/60 dark:border-white/10">
          <div className="flex items-center gap-2 text-xl">
            <span role="img" aria-hidden="true">🪲</span>
            <span className="font-semibold text-base">Menu</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close menu"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Body */}
        <div className="px-3 py-2 overflow-y-auto h-[calc(100%-56px)]">
          {/* เมนูหลัก */}
          <nav className="flex flex-col">
            {Menu.map((item) => {
              const active = isActive(item.link);
              return (
                <button
                  key={item.id}
                  className={[
                    "text-left px-3 py-3 rounded-xl transition",
                    "hover:bg-primary/10 dark:hover:bg-primary/20",
                    active ? "ring-1 ring-primary/40 bg-primary/5 dark:bg-primary/10" : "",
                  ].join(" ")}
                  onClick={() => closeAndGo(item.link)}
                >
                  {item.name}
                </button>
              );
            })}
          </nav>

          <div className="my-3 h-px bg-gray-200/70 dark:bg-white/10" />

          {/* กลุ่มย่อยแบบยุบ/ขยาย */}
          <div>
            <button
              onClick={() => setOpenGroup((s) => !s)}
              className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-primary/10 dark:hover:bg-primary/20 transition"
              aria-expanded={openGroup}
              aria-controls="drawer-subgroup"
            >
              <span className="font-medium">Beetles Coming Soon</span>
              <FaCaretDown
                className={`transition-transform duration-200 ${openGroup ? "rotate-180" : ""}`}
              />
            </button>
            <div
              id="drawer-subgroup"
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                openGroup ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                {DropdownLinks.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => closeAndGo(d.link)}
                    className="w-full text-left ml-2 mt-1 px-3 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20"
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Navbar;
