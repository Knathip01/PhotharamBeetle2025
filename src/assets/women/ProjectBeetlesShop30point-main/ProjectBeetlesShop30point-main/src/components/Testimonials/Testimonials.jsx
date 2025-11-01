import React from "react";
import Slider from "react-slick";

const TestimonialData = [
  {
    id: 1,
    name: "Dynastes hercules",
    text: "เป็นด้วงกว่างที่มีความยาวและความใหญ่ที่สุดในโลก ตัวผู้ยาวได้ถึง 178 มิลลิเมตร และมีบันทึกไว้ว่ายาวที่สุดคือ 190 มิลลิเมตรตัวหนอนกินซากผุของต้นไม้เป็นอาหาร และมีระยะการเป็นตัวหนอนยาวนานถึง 16 เดือน",
    img: "https://image.jimcdn.com/app/cms/image/transf/dimension=4096x4096:format=jpg/path/s44cc5de277a6183e/image/i004f5245949e8585/version/1432450645/image.jpg",
  },
  {
    id: 2,
    name: "Chalcosoma caucasus",
    text: "ด้วงกว่างสามเขาสีดำที่มีขนาดใหญ่ที่สุดในประเทศไทย ตัวที่ใหญ่ที่สุดพบเก็บรักษาอยู่ที่พิพิธภัณฑ์แมลงของมหาวิทยาลัยเกษตรศาสตร์ บางเขน มีขนาดลำตัวยาวถึง 120 มิลลิเมตร",
    img: "https://rankinglabo.com/wp-content/uploads/2023/08/4694b07c13a3b0c4983ce0e8f33c2a8f-1024x683.webp",
  },
  {
    id: 3,
    name: "Dorcus antaeus",
    text: "ด้วงคีมกระทิงดำกระทิงดำของไทยเคยได้รับความนิยมอันดับหนึ่ง เพราะการหากระทิงดำจากอินเดีย พม่า และมาเลย์",
    img: "https://trvimg.r10s.jp/share/image_up/70864/LARGE/BmpSnx.jpeg",
  },
  {
    id: 5,
    name: "Allomyrina dichotoma",
    text: "นับเป็นด้วงกว่างอีกชนิดหนึ่งที่นิยมเลี้ยงเป็นสัตว์เลี้ยง โดยเฉพาะเด็ก ๆ ชาวญี่ปุ่น ซึ่งสามารถใช้ขวิดต่อสู้กันได้ ด้วงกว่างญี่ปุ่นมีจุดเด่น คือ เขาล่างมีความใหญ่กว่าเขาด้านบน โดยที่ปลายเขาจะมีแขนงแตกออกเป็น 2 แฉกด้วย",
    img: "https://img.aucfree.com/c1042985545.1.jpg",
  },
];

const Testimonials = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-10 mb-10">
      <div className="container">
        {/* header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary">
          🔝Top most popular beetles in Thailand
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
          History of the beetle
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            ประวัติด้วงกว่างที่นิยมเลี้ยงมากที่สุดในประเทศไทย
          </p>
        </div>

        {/* Testimonial cards */}
        <div data-aos="zoom-in">
          <Slider {...settings}>
            {TestimonialData.map((data) => (
              <div className="my-6">
                <div
                  key={data.id}
                  className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl dark:bg-gray-800 bg-primary/10 relative"
                >
                  <div className="mb-4">
                    <img
                      src={data.img}
                      alt=""
                      className="rounded-full w-20 h-20"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="space-y-3">
                      <p className="text-xs text-gray-500">{data.text}</p>
                      <h1 className="text-xl font-bold text-black/80 dark:text-light">
                        {data.name}
                      </h1>
                    </div>
                  </div>
                  <p className="text-black/20 text-9xl font-serif absolute top-0 right-0">
                    ,,
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
