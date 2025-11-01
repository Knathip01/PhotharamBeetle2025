import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Products from "./components/Products/Products";
import TopProducts from "./components/TopProducts/TopProducts";
import Banner from "./components/Banner/Banner";
import Subscribe from "./components/Subscribe/Subscribe";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";
import Popup from "./components/Popup/Popup";
import Beetle from "./components/pages/Beetle";
import PliersBeetle from "./components/pages/PliersBeetle";
import BeetleFood from "./components/pages/BeetleFood";
import BeetleFeedingEquipment from "./components/pages/BeetleFeedingEquipment";
import BestSelling from "./components/pages/BestSelling";
import TopRated from "./components/pages/TopRated";
import Order from "./components/pages/Order";
import TrendingProducts from "./components/pages/Trendingproducts";


import AOS from "aos";
import "aos/dist/aos.css";



const App = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);
  const [cart, setCart] = React.useState([])

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

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
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
        <Navbar cart={cart} handleOrderPopup={handleOrderPopup} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero handleOrderPopup={handleOrderPopup} />
                <Products />
                <TopProducts handleOrderPopup={handleOrderPopup} />
                <Banner />
                <Subscribe />
                <Products />
                <Testimonials />
                <Footer />
              </>
            }
          />
          <Route path="/beetle" element={<Beetle cart={cart} setCart={setCart}/>} />
          <Route path="/pliers-beetle" element={<PliersBeetle cart={cart} setCart={setCart}/>} />
          <Route path="/beetle-food" element={<BeetleFood cart={cart} setCart={setCart} />} />
          <Route path="/beetle-feeding-equipment" element={<BeetleFeedingEquipment cart={cart} setCart={setCart} />} />
          <Route path="/trending-products" element={<TrendingProducts cart={cart}  setCart={setCart}/>} />
          <Route path="/best-selling" element={<BestSelling cart={cart} setCart={setCart} />} />
          <Route path="/top-rated" element={<TopRated cart={cart} setCart={setCart} />} />
          <Route path="/order" element={<Order />} />


        </Routes>
        <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
      </div>
    </Router>
  );
};

export default App;
