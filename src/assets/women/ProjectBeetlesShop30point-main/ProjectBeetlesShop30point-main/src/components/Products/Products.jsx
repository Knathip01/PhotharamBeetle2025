import React from "react"; 
import { useNavigate } from "react-router-dom";
import Img1 from "../../assets/women/dmat.png";
import Img2 from "../../assets/women/dmatpro.png";
import Img3 from "../../assets/women/Elmatpro.png";
import Img4 from "../../assets/women/lmatpro.png";
import Img5 from "../../assets/women/hed.png";
import { FaStar } from "react-icons/fa6";

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Dmat pro",
    rating: 5.0,
    color: "วัสดุรองพื้นด้วงกว่างเล็ก",
    aosDelay: "0",
  },
  {
    id: 2,
    img: Img2,
    title: "Dmat pro",
    rating: 5.0,
    color: "วัสดุรองพื้นด้วงกว่างใหญ่",
    aosDelay: "200",
  },
  {
    id: 3,
    img: Img3,
    title: "ELmatpro",
    rating: 5.0,
    color: "วัสดุรองพื้นตัวอ่อนด้วงคีม",
    aosDelay: "400",
  },
  {
    id: 4,
    img: Img4,
    title: "lmatpro",
    rating: 5.0,
    color: "วัสดุรองพื้นด้วงคีม",
    aosDelay: "600",
  },
  {
    id: 5,
    img: Img5,
    title: "Fairy mushroom fungus",
    rating: 5.0,
    color: "อาหารหนอนด้วงคีม",
    aosDelay: "800",
  },
];

const Products = () => {
  const navigate = useNavigate();

  const handleViewAllClick = () => {
    navigate("/beetle-food");
  };

  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary">
            Top Selling Products for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            วัสดุรองพื้น/อาหารหนอนด้วงคีม/อาหารหนอนด้วงกว่าง ✴สูตรเพิ่มสารอาหารเน้นการวางไข่✴
          </p>
        </div>
        {/* Body section */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
            {/* card section */}
            {ProductsData.map((data) => (
              <div
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                key={data.id}
                className="space-y-3"
              >
                <img
                  src={data.img}
                  alt=""
                  className="h-[220px] w-[150px] object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{data.title}</h3>
                  <p className="text-sm text-gray-600">{data.color}</p>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span>{data.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* view all button */}
          <div className="flex justify-center">
            <button
              onClick={handleViewAllClick}
              className="text-center mt-10 cursor-pointer bg-primary text-white py-1 px-5 rounded-md"
            >
              View All Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;