import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import Banner from "../../assets/website/orange-pattern.jpg";

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleButtonClick = (e) => {
    e.preventDefault();
    console.log("Subscribed email:", email); // แสดงค่าอีเมลใน console หรือสามารถส่งไปยัง backend ได้
    navigate("/trending-products");
  };

  return (
    <div
      data-aos="zoom-in"
      className="mb-20 bg-gray-100 dark:bg-gray-800 text-white"
      style={BannerImg}
    >
      <div className="container backdrop-blur-sm py-10">
        <div className="space-y-6 max-w-xl mx-auto">
          <h1 className="text-2xl !text-center sm:text-left sm:text-4xl font-semibold">
            Get notified about new beetles
          </h1>
          <form onSubmit={handleButtonClick}>
            <input
              data-aos="fade-up"
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 text-black bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="mt-4 p-3 bg-blue-600 text-white w-full"
            >
              Subscribe
            </button>
          </form>
          {message && <p className="mt-4 text-center">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Subscribe;




