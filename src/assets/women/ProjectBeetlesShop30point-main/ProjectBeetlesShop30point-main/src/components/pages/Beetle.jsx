import { useState, useEffect, use } from 'react';
import Swal from 'sweetalert2';

// ข้อมูลสินค้า
const products = [
  { id: 1, name: 'white Eye Body kabuto Beetle', price: 7000, image: 'https://img.aucfree.com/c1042985545.1.jpg' },
  { id: 2, name: 'Megasoma actaeon', price: 9000, image: 'https://mushinavi.com/kabukabu/jp-actaeon/f-actaeon12.jpg' },
  { id: 3, name: 'Golofa pizarro', price: 9500, image: 'https://i.pinimg.com/originals/9e/37/76/9e37766c431c4141028d26e676f1c929.jpg' },
  { id: 4, name: 'Dynastes granti', price: 10000, image: 'https://th.bing.com/th/id/R.018ed2233dc9c9b7ec7c3f590b00233e?rik=RFlUGYESzdAeCA&riu=http%3a%2f%2fwww.zap-co.com%2fstaff_blog%2fwp-content%2fuploads%2f2015%2f06%2ff-grant56.jpg&ehk=O2ACKWHug959l%2fTtaXIWysQpwhzWnocbiOep80EVy1w%3d&risl=&pid=ImgRaw&r=0' },
  { id: 5, name: 'Dynastes maya', price: 5000, image: 'https://mushinavi.com/kabukabu/jp-hyllus/f-hyllus20.jpg' },
  { id: 6, name: 'Megasoma elephas elephas', price: 7500, image: 'https://s.kaskus.id/images/2013/11/11/5512667_20131111064323.jpg' },
  { id: 7, name: 'Dynastes hercules ecuatorianus', price: 12000, image: 'https://th.bing.com/th/id/R.8b5be19c5026933e5ec45d0a30368eb9?rik=5K5z0SNf%2bV%2fcwA&riu=http%3a%2f%2fbeetlespace.wz.cz%2fdruhy%2ffotky%2fDynastes_hercules_ecuatorianus_09.jpg&ehk=ZdqL6PRJr3xoq%2boCRgdrNHpfb%2fs7b4v5z8x1MkuTD0k%3d&risl=&pid=ImgRaw&r=0' },
  { id: 8, name: 'Sumatran Atlas', price: 10000, image: 'https://dorcusdanke.itembox.design/item/1254908991.jpg?t=20210218095400' },
  { id: 9, name: 'Dynastes hercules hercules', price: 19000, image: 'https://img.aucfree.com/f149659226.1.jpg' },
  { id: 10, name: 'Dynastes Satanas', price: 9500, image: 'https://i.pinimg.com/736x/10/11/dd/1011dd5333e53be34a1ec6bf0480f88a.jpg' },
];


function ProductCard({ product, addToCart, colorIndex, couponColors }) {

  const [addText, setAddText] = useState('')


  return (
    <div className='flex-col items-center shadow-xl border-[1px] rounded-[8px]' style={{
      // border: '1px solid #ccc',
      margin: '25px',
      padding: '5px',
      // backgroundColor: '#f0fff0',
      // textAlign: 'center',
      transition: 'transform 0.2s',
      borderRadius: '8px',
      width: '200px',
      height: '330px',
      position: 'relative',
      display: 'flex',
    }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
      <img src={product.image} alt={product.name} className='rounded-[5px] mb-[5px] h-[141px] w-full object-cover' />
      <div className='flex w-full justify-between'>
        <div>
          <p className='font-[bold] w-[100px] text-nowrap text-ellipsis overflow-hidden'>{product.name}</p>
          <p onClick={() => {
            setAddText(product.name)
          }} className='font-[regular] text-[14px] text-black/60'>{addText ? addText : 'เพิ่มเติม'}</p>
        </div>
        <p className='text-green-600 font-[bold] '>{(product.price).toLocaleString('TH-th')} ฿</p>
      </div>
      <button onClick={() => addToCart(product)} className='w-[90%] mt-[20px] absolute bg-black text-white rounded-[8px] h-[40px] bottom-3 font-[medium]'>
        🛒 เพิ่มลงตะกร้า
      </button>
    </div>
  );
}

export default function ProductList({ cart, setCart }) {


  const [colorIndex, setColorIndex] = useState(0);
  const [coupon, setCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState('');
  const [shippingFee] = useState(100);
  const [modal, setModal] = useState(false)
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')

  const couponColors = ['red', 'green', 'black', 'blue', 'cyan'];

  // ตะกร้า function

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  const updateQuantity = (product, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(product);
    } else {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const generateRandomCoupon = () => {
    const isLucky = Math.random() < 0.1; // โอกาส 10% ในการได้รับคูปอง
    if (isLucky) {
      setCoupon(0.3); // ให้ส่วนลด 30%
      setCouponMessage('ยินดีด้วย! คุณได้รับคูปองส่วนลด 30%!');
    } else {
      setCoupon(null); // ไม่ได้รับส่วนลด
      setCouponMessage('เสียใจด้วย! คุณไม่ได้รับคูปองส่วนลด');
    }
  };

  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);
  const discount = coupon ? coupon * totalPrice : 0;

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  const ordered = (cart) => {
    // ดึงข้อจาก localstorage ที่ key เป็น orders
    let orders = JSON.parse(localStorage.getItem("orders"))

    Swal.fire({ icon: 'success', title: 'การสั่งซื้อสำเร็จ', text: 'ทางร้านกำลังจัดส่งสินค้า', timerProgressBar: true, timer: 2000, showConfirmButton: false }).then(() => {
      window.location.href = "/Order"
    })
    // ปิดหน้าต่าง
    setModal(false)
    // เซ้ตของในตะกร้าเป่ลา
    setCart([])
    // reset ช้อมูล
    setName('')
    setAddress('')




    //ถ้าไม่ JSON.stringyfy => [object,object]
    //ถ้าใช้ => [{"username":"asf","address":"fas","discount":8550]

    if (orders && orders.length > 0) {
      let updated = JSON.stringify([...orders, { username: name, address: address, discount: discount ,cart: JSON.stringify(cart) }])
      localStorage.setItem("orders", updated)
    } else {
      localStorage.setItem("orders", JSON.stringify([{ username: name, address: address, discount: discount ,cart: JSON.stringify(cart) }]))
    }
  }

  return (
    <div style={{
      // backgroundImage: 'linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)', 
      minHeight: '100vh',
      padding: '20px'
    }}>
      {/* 
      <div className="bg-[url('./imgs/bg.png')] w-[100%] h-[100vh]">
          <img className='absolute object-cover' src='./imgs/bg.png'></img>
      </div> */}

      {/* <h1 className='font-[medium] text-[20px]' style={{ 
        textAlign: 'center', 
        color: 'black', 
        display: 'flex', 
        justifyContent: 'end', 
        alignItems: 'end',
      }}>
        Photharam Beetle Shop
        <div className='font-[medium]' style={{ marginLeft: '10px', display: 'inline-block' }}>
          🛒 ({totalItemsInCart})
        </div>
      </h1> */}

      <button onClick={generateRandomCoupon} className='font-[light]' style={{ display: 'block', margin: '0 auto' }}>
        🎁 สุ่มคูปองส่วนลด
      </button>

      {couponMessage && (
        <p style={{ textAlign: 'center', fontSize: '16px', color: coupon ? 'green' : 'red' }}>
          {couponMessage}
        </p>
      )}

      <p className='font-[medium] text-[18px] text-center mt-[20px]'>Beetle (ด้วง)</p>

      <div className='flex items-start max-[1200px]:flex-col'>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} colorIndex={colorIndex} couponColors={couponColors} />
          ))}
        </div>

        <div className='w-[600px] max-[1200px]:w-full max-[1200px]:mb-[50px] relative' style={{ marginTop: '20px', textAlign: 'center', border: '1px solid #000', borderRadius: '8px', padding: '20px' }}>
          <h2 className='font-[bold] text-[24px]'>ตะกร้าสินค้า</h2>
          {/* <hr className='text-black'/> */}

          {cart && cart.length > 0 ? <div className='border-[1px] border-black mb-[10px] mt-[5px]'></div> : null}

          {cart.length === 0 ? (
            <p className='mt-[10px]' style={{ color: 'black' }}>ไม่มีสินค้าในตะกร้า :(</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {cart.map((product) => (
                <li key={product.id} style={{ color: 'black' }}>
                  {/* {product.name} - {product.price} บาท x {product.quantity} */}
                  <div className='flex justify-between'>
                    <div className='flex gap-[10px]'>
                      <p className='font-[light] '>{product.name}</p>
                      <p className='text-black/60 font-[light]'>x {product.quantity}</p>
                    </div>
                    <p className='font-[medium] text-green-600'>{(product.price).toLocaleString("TH-th")}  ฿</p>
                  </div>
                  <div className='flex justify-between mt-[5px] mb-[20px]'>
                    <div className='flex items-center gap-[10px]'>
                      <button className='p-[2px] bg-gray-200 rounded-full' onClick={() => updateQuantity(product, product.quantity - 1)}>➖</button>
                      <p>{product.quantity}</p>
                      <button className='p-[2px] bg-gray-200 rounded-full' onClick={() => updateQuantity(product, product.quantity + 1)}>➕</button>
                    </div>
                    <button className='p-[2px] bg-gray-200 rounded-full' onClick={() => removeFromCart(product)}>❌ ลบ</button>
                  </div>
                  <div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {cart && cart.length > 0 ? <div className='border-[1px] border-black mb-[10px] mt-[5px]'></div> : null}

          {cart && cart.length > 0 ? <div>
            <div className='flex justify-between'>
              <p className='font-[medium]'>ยอดรวม</p>
              <p className='font-[medium]'>{totalPrice.toLocaleString("TH-th")} บาท</p>
            </div>
            {/* {coupon && <p style={{ color: 'black' }}>ส่วนลด: {discount} บาท</p>} */}
            <div className='flex justify-between'>
              <p className='font-[medium]'>ค่าจัดส่ง</p>
              <p className='font-[medium]'>{shippingFee.toLocaleString("TH-th")} บาท</p>
            </div>

            <div className='flex justify-between'>
              <p className='font-[medium]'>ส่วนลด</p>
              <p className='font-[medium]'>{discount.toLocaleString("TH-th")} บาท</p>
            </div>

            <div className='flex justify-between'>
              <p className='font-[bold]'>ยอดชำระทั้งสิ้น</p>
              <p className='font-[bold]'>{(totalPrice - discount + shippingFee).toLocaleString("TH-th")} บาท</p>
            </div>
          </div> : null}

          <button disabled={cart && cart.length <= 0 ? true : false} onClick={() => {
            setModal(true)
          }} className={`w-[100%] text-white rounded-[8px] h-[40px] font-[medium] mt-[20px] ${cart && cart.length <= 0 ? 'bg-black/60' : 'bg-black'}`}>
            ชำระเงิน
          </button>
        </div>
      </div>

      {modal ? <div className='w-full h-[100vh] bg-black/60 fixed left-0 top-0 z-[9999] flex justify-center items-center'>
        <div className='w-[400px] h-[500px] bg-white rounded-[8px] shadow-md p-[20px]'>
          <div>
            <p className='font-[medium]'>ชื่อผู้รับ</p>
            <input onChange={(e) => {
              setName(e.target.value)
            }} className='w-full h-[40px] mt-[5px]'></input>
          </div>
          <div className='mt-[10px]'>
            <p className='font-[medium]'>ที่อยู่</p>
            <input onChange={(e) => {
              setAddress(e.target.value)
            }} className='w-full h-[40px] mt-[5px]'></input>
          </div>

          <div onClick={() => {
            if (name && address) {
              ordered(cart)

            }
          }} className={`w-full h-[40px] ${name && address ? 'bg-black' : 'bg-black/60'} mt-[20px] rounded-[8px] flex justify-center items-center`}>
            <p className=' text-white font-[medium]'>ชำระเงิน</p>
          </div>

        </div>
      </div> : null}
    </div>
  );
}
