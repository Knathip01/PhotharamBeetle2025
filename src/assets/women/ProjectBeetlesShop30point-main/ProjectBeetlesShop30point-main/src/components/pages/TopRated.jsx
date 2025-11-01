import { useState } from "react";    

const person = {
  name: 'Beetle feeding game',
  theme: {
    backgroundImage: 'linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100vw',  
    height: '100vh',  
    overflow: 'hidden'
  }
};

export default function TodoList() {
  const [level, setLevel] = useState(0);
  const [size, setSize] = useState(100); 
  const [image, setImage] = useState("https://i1.wp.com/www.nextsteptv.com/wp-content/uploads/2017/11/Hercules_beetle_.jpg?resize=735%2C400"); 

  const feed = (foodLevel) => {
    const newLevel = level + foodLevel;

    if (newLevel > 100) {
      setImage("https://external-preview.redd.it/62-different-types-of-beetles-in-kansas-v0-NKwC3n7oSzyg4vwbfN5gy_p0HT5zBg6UESeoAqw0hBk.jpg?width=640&crop=smart&auto=webp&s=bfa8b3e99223fff29cb49500f0ff8ff9f99b65d7"); 
    }

    setLevel(newLevel);
    setSize(100 + newLevel); 
  };

  return (
    <div style={person.theme}>
      <h1>{person.name}</h1>
      <img
        className="avatar"
        src={image}
        alt="https://external-preview.redd.it/62-different-types-of-beetles-in-kansas-v0-NKwC3n7oSzyg4vwbfN5gy_p0HT5zBg6UESeoAqw0hBk.jpg?width=640&crop=smart&auto=webp&s=bfa8b3e99223fff29cb49500f0ff8ff9f99b65d7"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          maxWidth: '90vw',  
          maxHeight: '90vh', 
          objectFit: 'cover', 
          border: '5px solid #ffffff',  // กำหนดสีขาวสำหรับกรอบ
          borderRadius: '10px'          // เพิ่มความโค้งมนให้กรอบ
        }}
      />

      <h2>Beetle Feeding</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button 
          onClick={() => feed(5)}
          style={{ backgroundColor: 'red', color: 'black' }}
        >
          Dmat pro (+5)
        </button>
        <button 
          onClick={() => feed(10)}
          style={{ backgroundColor: 'yellow', color: 'black' }}
        >
         Dmat pro(+10)
        </button>
        <button 
          onClick={() => feed(20)}
          style={{ backgroundColor: 'lightgreen', color: 'black' }}
        >
         ELmatpro (+20)
        </button>
        <button 
          onClick={() => feed(15)}
          style={{ backgroundColor: 'blue', color: 'white' }}
        >
          Lmat pro (+15)
        </button>
        <button 
          onClick={() => feed(25)}
          style={{ backgroundColor: 'purple', color: 'white' }}
        >
        Kabuto mat (+25)
        </button>
      </div>

      <p>Current Level: {level}</p>
    </div>
  );
}
