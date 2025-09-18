import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import StarRatings from "react-star-ratings";

import Img1 from "../../assets/women/dmat.png";
import Img2 from "../../assets/women/dmatpro.png";
import Img3 from "../../assets/women/Elmatpro.png";
import Img4 from "../../assets/women/lmatpro.png";
import Img5 from "../../assets/women/hed.png";



const ProductsData = [
  {
    id: 1,
    img: Img1,
    name: "",
    description:
      "",
    rating: 5,
  },
  {
    id: 2,
    img: Img2,
    name: "",
    description:
      "",
       rating: 5,
  },
  {
    id: 3,
    img: Img3,
    name: "",
    description:
      "",
    rating: 5,
  },
];

const Products = () => {
  return (
    <>
      <span id="products"></span>
      <div className="py-10">
        <div className="container">
          <div className="text-center mb-20 max-w-[400px] mx-auto">
            <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              เห็ดนางฟ้า
            </p>
            <h1 className="text-3xl font-bold"></h1>
            <p className="text-xs text-gray-400 dark:text-gray-300">
              
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 md:gap-5 place-items-center">
            {ProductsData.map((product) => (
              <div
                key={product.id}
                data-aos="zoom-in"
                data-aos-duration="300"
                className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-primary hover:text-white relative shadow-xl duration-300 group max-w-[300px]"
              >
                <div className="h-[100px]">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="max-w-[200px] block mx-auto transform -translate-y-14
                    group-hover:scale-105 group-hover:rotate-6 duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <div className="w-full mb-2">
                    <StarRatings
                      rating={product.rating}
                      starRatedColor="yellow"
                      isSelectable={false}
                      starDimension="20px"
                      starSpacing="2px"
                      numberOfStars={5}
                      name="rating"
                    />
                  </div>
                  <h1 className="text-xl font-bold">{product.name}</h1>
                  <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
