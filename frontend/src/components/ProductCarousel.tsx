/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
// import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
// import 'react-horizontal-scrolling-menu/dist/styles.css';
import { getFeaturedProducts, getFootwearProducts, getJerseys } from "../api-client";
import { PiSneaker } from "react-icons/pi";
import { TbShirtSport } from "react-icons/tb";
import { HeroText } from "./HeroText";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HyperText from "./magicui/hyper-text";
import BoxReveal from "./magicui/box-reveal";
import { ExpandableCardDemo } from "./Expandable";


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
        console.log(footwear);

        setFeaturedProducts(featured);
        // setFootwearProducts(footwear);
        // setJerseys(jerseys);

        // Transforming the footwear data into the cards format
        const footWearCards = footwear.map((product: any) => ({
          description: product.shortDescription,
          title: product.title,
          src: product.imageUrl.split(",")[0],
          ctaText: "Buy Now",
          ctaLink: "/product/" + product._id,
          content: product.longDescription

        }));

        // Transforming the footwear data into the cards format
        const jerseyCards = jerseys.map((product: any) => ({
          description: product.shortDescription,
          title: product.title,
          src: product.imageUrl.split(",")[0],
          ctaText: "Buy Now",
          ctaLink: "/product/" + product._id,
          content: product.longDescription

        }));
        setFootwearProducts(footWearCards);
        setJerseys(jerseyCards);
        // console.log(footWearCards);

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);






  // const ProductCard = ({ product }: { product: any }) => (
  //   <Link className="  bg-slate-200 p-4 rounded-xl border hover:bg-white  hover:shadow-xl" to={`/product/${product._id}`}>
  //     <img src={product.imageUrl.split(',')[0]} alt={product.title} className="w-full h-32 object-cover mb-2" />
  //     <h3 className="font-semibold">{product.title}</h3>
  //     <p className="text-xs text-gray-600">{product.shortDescription}</p>
  //   </Link>
  // );

  return (
    <div className="p-4">
      <BoxReveal boxColor={"#de5c00"} duration={0.5}>

        <h2 className="text-6xl portrait:text-3xl font-bold mt-8 mb-4 text-left poppins-bold">Featured <HyperText text="Products." className=" text-orange-600 poppins-bold" /></h2>
      </BoxReveal>
      <div className="">
        {featuredProducts &&
          <div className="grid grid-flow-col-dense gap-2 overflow-x-scroll w-full no-visible-scrollbar">
            {featuredProducts.map((product) => (
              <Link className=" p-1 w-56 h-64 bg-white border-2 p-4  rounded-xl border hover:bg-white  hover:shadow-xl relative" to={`/product/${product._id}`} >


                <img src={product.imageUrl.split(',')[0]} alt={product.title} className="w-full h-32 object-cover mb-2" />
                <h3 className="font-semibold">{product.title}</h3>
                <p className="text-xs text-gray-600">{product.shortDescription}</p>

              </Link>))}
          </div>
        }
      </div>


      <HeroText />








      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 max-w-5xl mx-auto z-[99999999999]">
        <div>
          <BoxReveal boxColor={"#de5c00"} duration={0.5}>

            <h2 className="text-4xl portrait:text-3xl font-semibold mt-8 text-center poppins-semibold"><span className="flex items-center justify-center gap-3"><HyperText text="Sneakers" className="poppins-semibold" /> <PiSneaker className=" portrait:text-4xl" /></span></h2>
          </BoxReveal>
          <ExpandableCardDemo cards={footwearProducts} />
          <div className="mt-4">

          <Link to={`/sub-category/sneakers`} className="px-6 py-2 border border-2   border-orange-600 rounded-full hover:bg-orange-600 text-orange-600 poppins-semibold hover:text-white duration-300 transition-all w-fit">View More</Link>
          </div>
        </div>
        <div>
          <BoxReveal boxColor={"#de5c00"} duration={0.5}>
            <h2 className="text-4xl portrait:text-3xl font-semibold mt-8 text-center poppins-semibold"><span className="flex items-center justify-center gap-3"><HyperText text="Jerseys" className="poppins-semibold" />  <TbShirtSport className=" portrait:text-4xl" /></span></h2>
          </BoxReveal>
          <ExpandableCardDemo cards={jerseys} />
          <div className="mt-4">
            
          <Link to={`/sub-category/jerseys`} className="px-6 py-2 border border-2   border-orange-600 rounded-full hover:bg-orange-600 text-orange-600 poppins-semibold hover:text-white duration-300 transition-all w-fit">View More</Link>
          </div>
        </div>
      </div>





    </div>
  );
};

export default ProductCarousel;
