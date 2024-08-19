import React from 'react';
import {Link} from 'react-router-dom';
interface ProductCardProps {
  imageUrl: string;
  title: string;
  shortDescription: string;
  longDescription?: string;
  price: number;
  category: string;
  isSpecialPrice?: boolean;
  highlights?: string[];
  specs?: { key: string; value: string }[];
  adminRating?: number;
  prioritizeAdminRating?: boolean;
  reviews?: string[];
  link?:string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  shortDescription,
  price,
  isSpecialPrice,
  adminRating,
  category,
  link
}) => {
    const renderStars = (rating: number) => {
        const totalStars = 5;
        return (
          <div className="flex justify-end items-center mt-2 absolute bottom-3 right-3">
            {[...Array(totalStars)].map((_, index) => (
              <svg
                key={index}
                className={`h-4 w-4 fill-current ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                viewBox="0 0 24 24"
              >
                <path d="M12 .288l2.833 8.718h9.167l-7.417 5.38 2.834 8.719-7.417-5.384-7.417 5.384 2.834-8.719-7.417-5.38h9.167z" />
              </svg>
            ))}
          </div>
        );
      };


  return (
    <Link className="bg-gray-100 hover:bg-white hover:shadow-xl shadow-md rounded-xl border p-4 poppins-medium relative" to={link!}>
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover rounded-lg "/>
      <span className='rounded-full px-1.5 py-0.5 bg-yellow-100 text-yellow-800 text-xs absolute top-5 left-5'>{category}</span>
      <h3 className="mt-2 text-xl font-semibold text-[#222]">{title}</h3>
      <p className="mt-0 text-sm text-gray-600">{shortDescription}</p>
      <div className="mt-2 flex justify-between items-center">
        <span className={`text-lg font-semibold`}>
          <span className='text-sm'>INR</span> <span className='text-xl'>{price.toFixed(2)}</span>
          <br/>
        </span>
      </div>
          {isSpecialPrice && <span className='rounded-full px-1.5 py-0.5 bg-green-300 text-green-800 text-xs'>Special Price</span>}
          {adminRating !== undefined && renderStars(adminRating)}

    </Link>
  );
};

export default ProductCard;
