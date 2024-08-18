/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { getFeaturedProducts, getFootwearProducts, getJerseys } from "../api-client";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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

  const LeftArrow = () => {
    const { scrollPrev } = React.useContext(VisibilityContext);
    return (
      <button onClick={() => scrollPrev()} className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-800 z-50 bg-white mx-4 p-4 border shadow-lg rounded-full">
        <FaArrowLeft />
      </button>
    );
  };

  const RightArrow = () => {
    const { scrollNext } = React.useContext(VisibilityContext);
    return (
      <button onClick={() => scrollNext()} className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-800 z-50 bg-white mx-4 p-4 border shadow-lg rounded-full">
        <FaArrowRight />
      </button>
    );
  };

  const ProductCard = ({ product }: { product: any }) => (
    <div className="flex-shrink-0 w-64 bg-gray-100 p-4 rounded-md">
      <img src={product.imageUrl.split(',')[0]} alt={product.title} className="w-full h-32 object-cover mb-2" />
      <h3 className="font-semibold">{product.title}</h3>
      <p className="text-sm text-gray-600">{product.shortDescription}</p>
    </div>
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Featured Products</h2>
      <div className="relative">
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} scrollContainerClassName="no-visible-scrollbar">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </ScrollMenu>
      </div>

      <h2 className="text-xl font-bold mt-8 mb-4">Footwear Products</h2>
      <div className="relative">
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}  scrollContainerClassName="no-visible-scrollbar">
          {footwearProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </ScrollMenu>
      </div>

      <h2 className="text-xl font-bold mt-8 mb-4">Jerseys</h2>
      <div className="relative">
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}  scrollContainerClassName="no-visible-scrollbar">
          {jerseys.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </ScrollMenu>
      </div>
    </div>
  );
};

export default ProductCarousel;
