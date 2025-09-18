import React from "react";
import footerLogo from "../../assets/logo.png";
import Banner from "../../assets/website/footer-pattern.jpg";
import { FaFacebookMessenger } from "react-icons/fa";

// ——— Styles ———
const bannerStyle = (url) => ({
  backgroundImage: `linear-gradient(180deg, rgba(10,10,10,.6), rgba(10,10,10,.85)), url(${url})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
});

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl shadow-black/20 ${className}`}>
    {children}
  </div>
);

const Divider = () => <div className="h-px w-full bg-gradient-to-r from-white/0 via-white/15 to-white/0" />;

const Footer = () => {
  return (
    <footer style={bannerStyle(Banner)} className="text-white">
      <div className="container mx-auto px-6 md:px-10 lg:px-14">
        <div data-aos="zoom-in" className="pt-10 lg:pt-14 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Brand / About */}
            <Card className="p-6 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img src={footerLogo} alt="ShopBeetle logo" className="w-12 h-12 object-contain" />
                <div>
                  
                  <h2 className="text-xl font-semibold">Photharam Beetle</h2>
                </div>
              </div>
              <p className="text-white/80 leading-relaxed text-sm">
                ยินดีต้อนรับสู่ Photharam Beetle!
                 Beetle breeding by Photharam beetle in thailand🛒
              </p>
            </Card>

            {/* Contact Admin Button (Upgraded) */}
            <Card className="p-8 md:col-span-2 flex flex-col items-center justify-center text-center gap-4">
             
              <a
                href="https://m.me/1793673580933878"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ติดต่อแอดมินผ่าน Facebook Messenger"
                className="relative group inline-flex items-center justify-center rounded-2xl p-[2px] focus:outline-none focus:ring-2 focus:ring-fuchsia-400/60 focus:ring-offset-2 focus:ring-offset-transparent"
              >
                {/* Animated gradient border */}
                <span className="absolute inset-0 rounded-2xl bg-[conic-gradient(at_0%_0%,#f0abfc_0%,#a78bfa_30%,#60a5fa_50%,#34d399_70%,#f0abfc_100%)] opacity-90 blur-[6px] group-hover:blur-[10px] transition-all duration-300 animate-[spin_6s_linear_infinite]" />

                {/* Inner button */}
                <span className="relative flex items-center gap-3 px-8 py-4 rounded-2xl bg-black/30 backdrop-blur-md border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,.35)]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <FaFacebookMessenger className="text-2xl" />
                  </span>
                  <span className="text-left">
                    <span className="block text-base md:text-lg font-semibold tracking-wide">ติดต่อแอดมิน</span>
                   
                  </span>

                  {/* Shine sweep */}
                  <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                    <span className="absolute -left-1/3 top-0 h-full w-1/3 bg-white/30 translate-x-[-120%] -skew-x-12 group-hover:translate-x-[260%] transition-transform duration-700 ease-out" />
                  </span>
                </span>

                {/* Pulse ring on hover */}
                <span className="absolute -z-10 inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="absolute inset-0 rounded-2xl animate-ping bg-fuchsia-500/10" />
                </span>
              </a>

              {/* mini helpers */}
              <div className="flex items-center gap-2 text-xs text-white/60">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                ออนไลน์ตอนนี้
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pb-8">
          <Divider />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 text-sm text-white/70">
            <p>© {new Date().getFullYear()} PhotharamBeetle · By ADMIN Knathip Sasibut.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
