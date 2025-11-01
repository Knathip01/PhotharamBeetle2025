import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

// Import i18next สำหรับการจัดการหลายภาษา
import { useTranslation } from 'react-i18next';

const Popup = ({ orderPopup, setOrderPopup, selectedProducts, setSelectedProducts, coupon, shippingFee }) => {
  const { t } = useTranslation(); // ใช้ฟังก์ชัน t() สำหรับการแปลภาษา
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // ฟังก์ชันจัดการการสั่งซื้อ
  const handleOrderNow = () => {
    setOrderPopup(false);

    if (selectedProducts.length > 0 && name && email && address) {
      const totalPrice = selectedProducts.reduce((acc, product) => acc + product.price, 0);
      const discount = coupon ? coupon * totalPrice : 0;
      const finalPrice = totalPrice - discount + shippingFee;

      navigate('/order', {
        state: { 
          selectedProducts,
          name,
          email,
          address,
          finalPrice,
        },
      });
    } else {
      alert(t('errorFillInfo')); // ข้อความแปล
    }
  };

  // ฟังก์ชันเพิ่มสินค้า
  const handleAddProduct = (product) => {
    setSelectedProducts([...selectedProducts, product]);
  };

  // ฟังก์ชันเอาสินค้าออก
  const handleRemoveProduct = (index) => {
    const updatedProducts = selectedProducts.filter((_, i) => i !== index);
    setSelectedProducts(updatedProducts);
  };

  const totalPrice = selectedProducts.reduce((acc, product) => acc + product.price, 0);
  const discount = coupon ? coupon * totalPrice : 0;
  const finalPrice = totalPrice - discount + shippingFee;

  return (
    <>
      {orderPopup && (
        <div className="popup">
          <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 w-[300px]">
              <div className="flex items-center justify-between">
                <h1>{t('orderNow')}</h1> {/* ข้อความแปล */}
                <IoCloseOutline className="text-2xl cursor-pointer" onClick={() => setOrderPopup(false)} />
              </div>
              <div className="mt-4">
                {selectedProducts.map((product, index) => (
                  <div key={index} className="flex justify-between items-center mb-2">
                    <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                    <p>{product.name} - {t('price')}: {product.price} {t('currency')}</p> {/* ข้อความแปล */}
                    <button onClick={() => handleRemoveProduct(index)} className="text-red-500">
                      {t('remove')} {/* ข้อความแปล */}
                    </button>
                  </div>
                ))}
                <p>{t('totalPrice')}: {totalPrice} {t('currency')}</p> {/* ข้อความแปล */}
                {coupon && <p>{t('discount')}: {discount} {t('currency')}</p>} {/* ข้อความแปล */}
                <p>{t('shippingFee')}: {shippingFee} {t('currency')}</p> {/* ข้อความแปล */}
                <p>{t('finalPrice')}: {finalPrice} {t('currency')}</p> {/* ข้อความแปล */}

                <input
                  type="text"
                  placeholder={t('name')} // ข้อความแปล
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-full border px-2 py-1 mb-4"
                />
                <input
                  type="email"
                  placeholder={t('email')} // ข้อความแปล
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-full border px-2 py-1 mb-4"
                />
                <input
                  type="text"
                  placeholder={t('address')} // ข้อความแปล
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-full border px-2 py-1 mb-4"
                />

                <div className="flex justify-center">
                  <button
                    className="bg-gradient-to-r from-primary to-secondary text-white py-1 px-4 rounded-full"
                    onClick={handleOrderNow}
                    disabled={!name || !email || !address || selectedProducts.length === 0}
                  >
                    {t('orderNow')} {/* ข้อความแปล */}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
