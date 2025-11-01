import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Image from "../../assets/hero/QRCODE.png"; // นำเข้ารูปภาพ QR Code
import html2canvas from 'html2canvas'; // นำเข้า html2canvas สำหรับการแปลง DOM เป็นภาพ

const Order = () => {

  const [myOrders, setMyOrders] = useState([])

  const fee = 100

  useEffect(() => {
    let orders = JSON.parse(localStorage.getItem("orders"))

    if (orders && orders.length > 0) {
      console.log(orders)

      setMyOrders(orders)
    }

  }, [])

  return (
    <div className='p-[20px]'>
      <h1 className='font-[medium] text-[24px] mb-[10px]'>สรุปคำสั่งซื้อ</h1>


      <div className='grid grid-cols-3 gap-[20px] max-[1200px]:grid-cols-2 max-[700px]:grid-cols-1'>
        {myOrders && myOrders.length > 0 ? myOrders.map((order, index) => {

          let cart = JSON.parse(order.cart)

          let total = cart.reduce((sum, item) => {
            return sum + (item.price * item.quantity)
          }, 0)

          return (
            <div>
              <p className='font-[bold]'>ออเดอร์ที่ : {index}</p>
              <p className='font-[medium]'>ชื่อผู้รับ {order.username}</p>
              <p className='font-[medium]'>ที่อยู่ {order.address}</p>
              {cart && cart.length > 0 ? cart.map((item) => {
                return (
                  <div className='font-[light]'>
                    <p>{item.name} x {item.quantity} = {item.price.toLocaleString('TH-th')} บาท</p>
                  </div>
                )
              }) : null}
              <p className='font-[medium]'>ค่าจัดส่ง {fee}</p>
              {order.discount <= 0 ? null : <p className='font-[medium]'>ส่วนลด {order.discount.toLocaleString('TH-th')}</p>}
              <p className='font-[medium]'>ยอดรวมทั้งสิ้น {((total + fee) - order.discount).toLocaleString('TH-th')}</p>
            </div>
          )
        }) : null}
      </div>

      {/* <div className='grid grid-cols-3 gap-[20px]'>
        {myOrders && myOrders.length > 0 ? myOrders.map((order, index) => {

          let total = order.reduce((sum, item) => {
            return sum + (item.price * item.quantity)
          }, 0)

          return (
            <div>
              <div className='flex gap-[30px]'>
                <p className='font-[medium]'>ออเดอร์ที่ {index}</p>
                <p>สถานะ รอการชำระเงิน</p>
              </div>
              {order && order.length > 0 ? order.map((item, index) => {
                return (
                  <div>
                    <div className='flex gap-[5px]'>
                      <p className='font-[light]'>{item.name}</p>
                      <p className='font-[light]'>x{item.quantity}</p>
                    </div>
                    <p className='font-[light]'>{item.price}</p>
                  </div>
                )
              }) : null}

              <p className='font-[medium]'>รวม : {total.toLocaleString('TH-th')} บาท</p>
            </div>
          )
        }) : null}

      </div> */}
    </div>
  );
};

export default Order;
