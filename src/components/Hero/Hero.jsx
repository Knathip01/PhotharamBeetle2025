import React, { useState } from "react";
import Slider from "react-slick";
import BiryaniImg1 from "../../assets/hero/beetle-banner.png";
import BiryaniImg2 from "../../assets/hero/biryani23.png";
import BiryaniImg3 from "../../assets/hero/biryani32.png";
import Vector from "../../assets/vector3.png";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const ImageList = [
  { id: 1, img: BiryaniImg1 },
  { id: 2, img: BiryaniImg2 },
  { id: 3, img: BiryaniImg3 },
];

const Hero = () => {
  const [imageId, setImageId] = useState(BiryaniImg1);

  const bgImage = {
    backgroundImage: `url(${Vector})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
  };

  return (
    <div
      style={bgImage}
      className="min-h-[550px] sm:min-h-[600px] bg-gray-100 dark:bg-gray-800 flex justify-center items-center duration-200"
    >
      <div className="container pb-8 sm:pb-0">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Text content section */}
          <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black dark:text-white">
              <span className="text-orange-500">Photharam Beetle</span> Shop
            </h1>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              ยินดีต้อนรับสู่ Photharam Beetle ที่ที่คุณจะได้สัมผัสประสบการณ์การการเลี้ยงแมลง
            </p>
          </div>

          {/* Image section */}
          <div className="min-h-[450px] sm:min-h-[450px] flex justify-center items-center relative order-1 sm:order-2">
            <div className="h-[300px] sm:h-[450px] overflow-hidden flex justify-center items-center">
              <img
                src={imageId}
                alt="biryani img"
                className="w-[300px] sm:w-[450px] sm:scale-125 mx-auto animate-spin-slow"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex lg:flex-col lg:top-1/2 lg:-translate-y-1/2 lg:py-2 justify-center gap-4 absolute bottom-[0px] lg:-right-10 bg-white/30 dark:bg-gray-600/50 rounded-full">
              {ImageList.map((item) => (
                <img
                  key={item.id}
                  src={item.img}
                  onClick={() => setImageId(item.img)}
                  alt="biryani img"
                  className="max-w-[80px] h-[80px] object-contain inline-block hover:scale-105 duration-200 cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
