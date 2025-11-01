import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'

// ข้อมูลสินค้า
const products = [
  { id: 1, name: '《ไม้โอ๊ค》', price: 500, image: 'https://lzd-img-global.slatic.net/g/p/f27fa2b9a32ed68e23f1c99f5ab1ace1.jpg_720x720q80.jpg' },
  { id: 2, name: '《Dmat natural 50ลิตร》', price: 770, image: 'https://down-th.img.susercontent.com/file/34a574f2078bc4973e3f4338a3efca03@resize_w450_nl.webp' },
  { id: 3, name: '《Dmat Pro+ 50ลิตร》', price: 1670, image: 'https://down-th.img.susercontent.com/file/95744de44983a5d5e7f79e1c91bb424f@resize_w450_nl.webp' },
  { id: 4, name: '《Lmat pro+  50ลิตร》', price: 1670, image: 'https://down-th.img.susercontent.com/file/1ddf799791a64f9cccde56b91b314104@resize_w450_nl.webp' },
  { id: 5, name: '《Dmat natural 9ลิตร》', price: 136, image: 'https://down-th.img.susercontent.com/file/12620519fa219127072194bd6fbf6556.webp' },
  { id: 6, name: '《Dmat Pro+ 9ลิตร》', price: 156, image: 'https://down-th.img.susercontent.com/file/44abb54911ce45ecee05754183b5669e@resize_w450_nl.webp' },
  { id: 7, name: '《Lmat Pro+ 9ลิตร》', price: 153, image: 'https://down-th.img.susercontent.com/file/119b264860900209a4bf3b2d5cba3d65@resize_w450_nl.webp' },
  { id: 8, name: '《ELmat Pro+》', price: 153, image: 'https://down-th.img.susercontent.com/file/ff020ce2b8377164e07c15a8eac41ff2@resize_w450_nl.webp' },
  { id: 9, name: 'เชื้อเห็ดนางฟ้า 1600cc', price: 100, image: 'https://down-th.img.susercontent.com/file/824a8a3239fa1e4ccae2f429e6f50f4e.webp' },
  { id: 10, name: 'Kabuto mat', price: 150, image: 'https://down-th.img.susercontent.com/file/a2836a648c52a1b4dd6e0dccf72c2c16@resize_w450_nl.webp' },
  { id: 11, name: 'Kuwa mat', price: 150, image: 'https://down-th.img.susercontent.com/file/15ff109327acc0125d15bf1d7bc2fe9a.webp' },
  { id: 12, name: 'Kinshi', price: 150, image: 'https://down-th.img.susercontent.com/file/sg-11134201-22120-cilqssb5nqlv23.webp' },
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

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % couponColors.length);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  const ordered = (cart) => {
    let orders = JSON.parse(localStorage.getItem("orders"))

    Swal.fire({ icon: 'success', title: 'การสั่งซื้อสำเร็จ', text: 'ทางร้านกำลังจัดส่งสินค้า', timerProgressBar: true, timer: 2000, showConfirmButton: false }).then(() => {
      window.location.href = "/Order"
    })
    setModal(false)
    setCart([])
    setName('')
    setAddress('')



    if (orders && orders.length > 0) {
      let updated = JSON.stringify([...orders, { username: name, address: address, discount: discount, cart: JSON.stringify(cart) }])
      localStorage.setItem("orders", updated)
    } else {
      localStorage.setItem("orders", JSON.stringify([{ username: name, address: address, discount: discount, cart: JSON.stringify(cart) }]))
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

      <p className='font-[medium] text-[18px] text-center mt-[20px]'>BeetleFood (อาหารด้วง)</p>

      {couponMessage && (
        <p style={{ textAlign: 'center', fontSize: '16px', color: coupon ? 'green' : 'red' }}>
          {couponMessage}
        </p>
      )}

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
                      <p className='font-[light]'>{product.name}</p>
                      <p className='text-black/60 font-[light]'>x {product.quantity}</p>
                    </div>
                    <p className='font-[medium] text-green-600'>{(product.price).toLocaleString("TH-th")}  ฿</p>
                  </div>
                  <div className='flex justify-between mt-[5px]'>
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
