import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api-client';
import { FaStar } from 'react-icons/fa';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BiCart } from 'react-icons/bi';

interface Spec {
  key: string;
  value: string;
}

interface SizeOption {
  size: string;
  quantityAvailable: number;
}

interface Product {
  imageUrl: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  category: "footwear" | "clothing";
  subCategory: string | string[];
  isSpecialPrice: boolean;
  isFeatured: boolean;
  highlights: string[];
  specs: Spec[];
  adminRating: number;
  prioritizeAdminRating: boolean;
  sizeOptions: SizeOption[];
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductById(id!);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
  };

  const handleBuyNow = () => {
    if (selectedSize) {
      console.log("Product ID:", id);
      console.log("Selected Size:", selectedSize);
    } else {
      alert("Please select a size first.");
    }
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      console.log("Product ID:", id);
      console.log("Selected Size:", selectedSize);
    } else {
      alert("Please select a size first.");
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <></>,
    prevArrow: <></>,
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 grid grid-cols-2 gap-2 portrait:hidden">
          {product.imageUrl.split(',').map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={product.title} className="w-full h-96 object-cover rounded-lg border" />
          ))}
        </div>
        <div className="lg:w-1/2 lg:pl-6">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-sm text-gray-600 mb-2">{product.shortDescription}</p>
          <div className="flex items-center my-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar
                key={index}
                className={`h-5 w-5 ${index < (product.adminRating || 0) ? 'text-yellow-500' : 'text-gray-300'}`}
              />
            ))}
          </div>

          <Slider {...settings} className="w-full mb-6 landscape:hidden">
            {product.imageUrl.split(',').map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={product.title} className="w-full h-96 object-cover rounded-lg border " />
            ))}
          </Slider>

          <p className="text-xl font-semibold my-2">
            <span className="text-sm">INR</span> <span className="text-2xl">{product.price.toFixed(2)}</span>
          </p>
          {product.sizeOptions.length > 0 && (
            <div className="mb-4">
              <div className="flex gap-3 flex-wrap">
                {product.sizeOptions.map((sizeOption, index) => (
                  <div className='flex flex-col text-center justify-start items-center gap-2' key={index}>
                    <div
                      onClick={() => sizeOption.quantityAvailable !== 0 && handleSizeSelection(sizeOption.size)}
                      className={`text-sm w-12 h-12 rounded-full border border-2 ${sizeOption.quantityAvailable !== 0 ? `cursor-pointer text-gray-700 hover:bg-gray-200` : `cursor-not-allowed text-gray-500`} ${selectedSize === sizeOption.size ? 'bg-gray-300' : ''} relative flex items-center text-center justify-center`}>
                      <span className="font-medium">{sizeOption.size}</span>
                    </div>
                    {sizeOption.quantityAvailable < 10 && <span className={` w-full text-xs py-1 rounded ${sizeOption.quantityAvailable >= 5 ? `bg-yellow-200` : `bg-red-200`}`}>{sizeOption.quantityAvailable} left</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className='flex gap-3 mb-6 mt-4'>
            <div onClick={handleBuyNow} className='flex-1 poppins-semibold text-center bg-orange-600 items-center flex justify-center rounded-md hover:text-white hover:bg-slate-800 transition-all duration-200 cursor-pointer'>Buy Now</div>
            <div onClick={handleAddToCart} className='duration-200 transition-all flex flex-col items-center justify-center poppins-medium text-sm bg-slate-800 text-white px-4 py-2 hover:bg-slate-900  rounded-md cursor-pointer'><BiCart className='text-2xl' />Add To Cart</div>
          </div>

          <p className="text-base mb-4">{product.longDescription}</p>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">Highlights</h2>
            <ul className="list-disc pl-5">
              {product.highlights.map((highlight, index) => (
                <li key={index} className="text-sm text-gray-700">{highlight}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">Specifications</h2>
            <ul className="list-none grid grid-cols-2">
              {product.specs.map((spec, index) => (
                <li key={index} className="text-sm text-gray-700 my-2 flex flex-col">
                  <span className="font-medium text-xs">{spec.key}</span>
                  <div className='h-[0.05rem] w-24 bg-gray-300 mt-0.5' />
                  <span>{spec.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
