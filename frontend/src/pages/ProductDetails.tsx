import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api-client';
import { FaStar } from 'react-icons/fa';

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

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2">
          <img src={product.imageUrl} alt={product.title} className="w-full h-96 object-cover rounded-lg" />
        </div>
        <div className="lg:w-1/2 lg:pl-6">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-xl font-semibold mb-2">
            <span className="text-sm">INR</span> <span className="text-2xl">{product.price.toFixed(2)}</span>
          </p>
          <p className="text-sm text-gray-600 mb-4">{product.shortDescription}</p>
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
            <ul className="list-none">
              {product.specs.map((spec, index) => (
                <li key={index} className="text-sm text-gray-700">
                  <span className="font-medium">{spec.key}:</span> {spec.value}
                </li>
              ))}
            </ul>
          </div>

          {product.sizeOptions.length > 0 && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Available Sizes</h2>
              <ul className="list-none">
                {product.sizeOptions.map((sizeOption, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    <span className="font-medium">{sizeOption.size}:</span> {sizeOption.quantityAvailable} available
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center">
            <span className="text-lg font-semibold mr-2">Admin Rating:</span>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar
                  key={index}
                  className={`h-5 w-5 ${index < (product.adminRating || 0) ? 'text-yellow-500' : 'text-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
