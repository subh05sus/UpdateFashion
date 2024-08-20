/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
// import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
// import 'react-horizontal-scrolling-menu/dist/styles.css';
import { getFeaturedProducts, getFootwearProducts, getJerseys } from "../api-client";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { PiSneaker } from "react-icons/pi";
import { TbShirtSport } from "react-icons/tb";
import { HeroText } from "./HeroText";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const ProductCarousel: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [footwearProducts, setFootwearProducts] = useState<any[]>([]);
  const [jerseys, setJerseys] = useState<any[]>([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const featured = await getFeaturedProducts();
        const footwear = await getFootwearProducts();
        const jerseys = await getJerseys();
        setFeaturedProducts(featured);
        setFootwearProducts(footwear);
        setJerseys(jerseys);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); 

  
  const LeftArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-800 z-50 bg-white mx-4 p-4 border shadow shadow-slate-500 rounded-full"
      >
        <FaArrowLeft />
      </button>
    );
  };

  const RightArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-800 z-50 bg-white mx-4 p-4 border shadow shadow-slate-500 rounded-full"
      >
        <FaArrowRight />
      </button>
    );
  };



  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    
    prevArrow:<LeftArrow/>,
    nextArrow: <RightArrow/>,
  };

  const ProductCard = ({ product }: { product: any }) => (
    <Link className="  bg-slate-200 p-4 rounded-xl border hover:bg-white  hover:shadow-xl" to={`/product/${product._id}`}>
      <img src={product.imageUrl.split(',')[0]} alt={product.title} className="w-full h-32 object-cover mb-2" />
      <h3 className="font-semibold">{product.title}</h3>
      <p className="text-xs text-gray-600">{product.shortDescription}</p>
    </Link>
  );

  return (
    <div className="p-4">
      <h2 className="text-6xl portrait:text-3xl font-bold mt-8 mb-4 text-left poppins-bold">Featured <span className="text-orange-600 hover:text-slate-200 duration-300 transition-all">Products</span></h2>
      <div className="bg-white">
  <Slider {...settings} className="w-full" centerPadding="30px">
    {featuredProducts.map((product) => (
    <Link className=" p-1" to={`/product/${product._id}`}>
      <div className=" bg-white border-2 p-4  rounded-xl border hover:bg-white  hover:shadow-xl">

    <img src={product.imageUrl.split(',')[0]} alt={product.title} className="w-full h-32 object-cover mb-2" />
    <h3 className="font-semibold">{product.title}</h3>
    <p className="text-xs text-gray-600">{product.shortDescription}</p>
      </div>
  </Link>    ))}
  </Slider>
</div>


          <HeroText/>


      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 max-w-fit mx-auto">

        <div className="flex flex-col justify-between gap-4 items-center">

          <h2 className="text-4xl portrait:text-3xl font-semibold mt-8 text-center poppins-semibold"><span className="flex items-center justify-center gap-3">Sneakers <PiSneaker className=" portrait:text-4xl"/></span></h2>
          <div className="grid gap-2 grid-cols-2">
              {footwearProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
              <Link to={`/sub-category/sneakers`} className="px-6 py-2 border border-2 border-orange-600 rounded-full hover:bg-orange-600 text-orange-600 poppins-semibold hover:text-white duration-300 transition-all w-fit">View More</Link>
        </div>
        <div className="flex flex-col justify-between gap-4 items-center">

          <h2 className="text-4xl portrait:text-3xl font-semibold mt-8 text-center poppins-semibold"><span className="flex items-center justify-center gap-3">Jerseys <TbShirtSport className=" portrait:text-4xl"/></span></h2>
          <div className="grid gap-2 grid-cols-2">
              {jerseys.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <Link to={`/sub-category/jerseys`} className="px-6 py-2 border border-2 border-orange-600 rounded-full hover:bg-orange-600 text-orange-600 poppins-semibold hover:text-white duration-300 transition-all w-fit">View More</Link>
        </div>

      </div>
    </div>
  );
};

export default ProductCarousel;
