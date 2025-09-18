import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Products from "./components/Products/Products";
import Products1 from "./components/Products/Products1";
import TopProducts from "./components/TopProducts/TopProducts";
// import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";
import Popup from "./components/Popup/Popup";

// Pages
import Beetle from "./components/pages/Beetle";
import PliersBeetle from "./components/pages/PliersBeetle";
import BeetleFood from "./components/pages/BeetleFood";
import BeetleFeedingEquipment from "./components/pages/BeetleFeedingEquipment";
import BestSelling from "./components/pages/BestSelling";
import TopRated from "./components/pages/TopRated";
import Order from "./components/pages/Order";
// ✅ ให้ตรงชื่อไฟล์เป๊ะ + ระบุ .jsx
import TrendingProducts from "./components/pages/Trendingproducts.jsx";

import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);

  // คง cart ไว้เผื่อหน้าอื่นใช้
  const [cart, setCart] = React.useState([]);

  const handleOrderPopup = () => setOrderPopup((v) => !v);

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      {/* พื้นหลังจาก DarkMode ใน Navbar */}
      <div className="relative z-10 bg-transparent dark:bg-transparent dark:text-white duration-200">
        <Navbar cart={cart} handleOrderPopup={handleOrderPopup} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero handleOrderPopup={handleOrderPopup} />
                <Products />
                <TopProducts handleOrderPopup={handleOrderPopup} />
                <Products1 />
                <Footer />
              </>
            }
          />

          {/* Products pages */}
          <Route path="/beetle" element={<Beetle cart={cart} setCart={setCart} />} />
          <Route path="/beetle-food" element={<BeetleFood cart={cart} setCart={setCart} />} />
          <Route
            path="/beetle-feeding-equipment"
            element={<BeetleFeedingEquipment cart={cart} setCart={setCart} />}
          />

          {/* รองรับทั้งตัวพิมพ์ใหญ่/เล็ก สำหรับลิงก์เดิม */}
          <Route path="/Pliers-beetle" element={<PliersBeetle cart={cart} setCart={setCart} />} />
          <Route path="/pliers-beetle" element={<PliersBeetle cart={cart} setCart={setCart} />} />

          {/* Collections */}
          <Route
            path="/trending-products"
            element={<TrendingProducts cart={cart} setCart={setCart} />}
          />
          <Route path="/best-selling" element={<BestSelling cart={cart} setCart={setCart} />} />
          <Route path="/top-rated" element={<TopRated cart={cart} setCart={setCart} />} />

          {/* Order page */}
          <Route path="/order" element={<Order />} />
        </Routes>

        <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
      </div>
    </Router>
  );
};

export default App;
