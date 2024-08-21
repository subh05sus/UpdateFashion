import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById, getReviewsByProductId, addReview, createOrder, addToFavorites, getFavorites, removeFromFavorites } from '../api-client';
import { FaStar } from 'react-icons/fa';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BiHeart } from 'react-icons/bi';
import { useAppContext } from '../contexts/AppContext';
import { AiFillHeart } from 'react-icons/ai';

interface Spec {
  key: string;
  value: string;
}

interface SizeOption {
  size: string;
  quantityAvailable: number;
}

interface Review {
  rating: number;
  title: string;
  description: string;
}

interface Product {
  _id: string;
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
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newReview, setNewReview] = useState<Review>({
    rating: 0,
    title: '',
    description: ''
  });

  const {userId, isLoggedIn} = useAppContext()

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [showBuyNowModal, setShowBuyNowModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [address, setAddress] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pinCode: '',
  });
  const [isFavorite, setIsFavorite] = useState<boolean>(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductById(id!);
        setProduct(productData);

        const reviewsData = await getReviewsByProductId(id!);
        setReviews(reviewsData);

        if (reviewsData.length > 0) {
          const avgRating = reviewsData.reduce((acc: number, review: Review) => acc + review.rating, 0) / reviewsData.length;
          setAverageRating(avgRating);
        }

        const favorites = await getFavorites();
        const isFav = favorites.some((fav: Product) => fav._id === id);
        setIsFavorite(isFav);


      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchData();
  }, [id]);



  const handleBuyNow = () => {
    if (selectedSize) {
      console.log("Product ID:", id);
      console.log("Selected Size:", selectedSize);
      setShowBuyNowModal(true);
    } else {
      alert("Please select a size first.");
    }
  };

  const handleContinue = () => {
    setShowBuyNowModal(false);
    setShowAddressModal(true);
  };

  const handlePlaceOrder = async () => {
    if (!product) {
      return;
    }
    const orderDetails = {
      productId: product._id,
      address,
      email,
      phone,
      orderStatus: "ORDER PLACED",
      amountToBePaid: product.price,
      alreadyPaid: false,
      size: selectedSize,
      userId
    };

    console.log(orderDetails)
    try {
      await createOrder(orderDetails);
      
      alert("Order placed successfully!");
      setShowAddressModal(false);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place the order.");
    }
  };











  const handleToggleFavorite = async () => {
    if (isFavorite) {
      await removeFromFavorites(id!);
      setIsFavorite(false);
    } else {
      await addToFavorites(id!);
      setIsFavorite(true);
    }
  };



  // const handleAddToCart = () => {
  //   if (selectedSize) {
  //     console.log("Product ID:", id);
  //     console.log("Selected Size:", selectedSize);
  //   } else {
  //     alert("Please select a size first.");
  //   }
  // };

  const handleAddReview = async () => {
    if (product) {
      try {
        const reviewData = { ...newReview, productId: product._id };
        console.log(reviewData)
        await addReview(reviewData);
        // Refresh the reviews after adding a new one
        const reviewsData = await getReviewsByProductId(product._id);
        setReviews(reviewsData);
        setShowModal(false);
      } catch (error) {
        console.error("Error adding review:", error);
      }
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

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
          {product.prioritizeAdminRating ?
            <div className="flex items-center my-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar
                  key={index}
                  className={`h-5 w-5 ${index < (product.adminRating || 0) ? 'text-yellow-500' : 'text-gray-300'}`}
                />
              ))}
              <span className="ml-2 text-gray-600">{product.adminRating ? product.adminRating.toFixed(1) : 'No ratings yet'}</span>
            </div>


            :
            <div className="flex items-center my-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar
                  key={index}
                  className={`h-5 w-5 ${index < (averageRating || 0) ? 'text-yellow-500' : 'text-gray-300'}`}
                />
              ))}
              <span className="ml-2 text-gray-600">{averageRating ? averageRating.toFixed(1) : 'No ratings yet'}</span>
            </div>
          }
          <Slider {...settings} className="w-full mb-6 landscape:hidden">
            {product.imageUrl.split(',').map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={product.title} className="w-full h-96 object-cover rounded-lg border" />
            ))}
          </Slider>

          <p className="text-xl font-semibold my-2">
            <span className="text-sm">INR</span> <span className="text-2xl">{product.price.toFixed(2)}</span>
          </p>
          {product.sizeOptions.length > 0 && (
            <div className="mb-4">
              <div className="flex gap-3 flex-wrap">
                {product.sizeOptions.map((sizeOption, index) => (
                  <div key={index} className='flex flex-col text-center justify-start items-center gap-2'>
                    <div
                      onClick={() => sizeOption.quantityAvailable !== 0 && setSelectedSize(sizeOption.size)}
                      className={`text-sm w-12 h-12 rounded-full border border-2 ${sizeOption.quantityAvailable !== 0 ? `cursor-pointer text-gray-700 hover:bg-gray-200` : `cursor-not-allowed text-gray-500`}  relative flex items-center text-center justify-center ${selectedSize === sizeOption.size ? 'bg-gray-200' : ''}`}
                    >
                      <span className="font-medium">{sizeOption.size}</span>
                    </div>
                    {sizeOption.quantityAvailable < 10 && (
                      <span className={`w-full text-xs py-1 rounded ${sizeOption.quantityAvailable >= 5 ? `bg-yellow-200` : `bg-red-200`}`}>
                        {sizeOption.quantityAvailable} left
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

            {isLoggedIn ?
          <div className='flex gap-3 mb-6 mt-4'>
            <div
              onClick={handleBuyNow}
              className='flex-1 poppins-semibold text-center py-2 text-white bg-orange-600 items-center flex justify-center rounded-md hover:bg-slate-800 transition-all duration-200 cursor-pointer'
            >
              Buy Now
            </div>
            <div
              onClick={handleToggleFavorite}
              className='duration-200 border transition-all flex flex-col items-center justify-center poppins-medium text-sm bg-neutral-100 text-red-600 px-4 py-2 hover:bg-slate-200  rounded-md cursor-pointer'
            >
              {isFavorite ? (
                <>
                  <AiFillHeart className="text-red-500 text-lg" />
                </>
              ) : (
                <>
                  <BiHeart className="text-lg" />
                </>
              )}
            </div>
          </div>
           :
           <Link to={`/sign-in`} className='mb-6 mt-4 poppins-semibold text-center py-2 text-white bg-orange-600 items-center flex justify-center rounded-md hover:bg-slate-800 transition-all duration-200'>
            Login First
           </Link> }

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

          <div className="mb-4">
            <h2 className="text-lg font-semibold">Reviews</h2>
            {reviews.length === 0 ? (

              <p className="text-sm text-gray-600">Be the first one to write a review!</p>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4">
                  {reviews.map((review, index) => (
                    <div key={index} className="p-4 border rounded-md shadow-sm">
                      <div className="flex items-center mb-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <FaStar key={i} className="h-4 w-4 text-yellow-500" />
                        ))}
                        <span className="ml-2 text-base font-semibold text-gray-950">{review.title}</span>
                      </div>
                      <p className="text-xs text-gray-700">{review.description}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="mt-4">
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
              >
                {reviews.length === 0 ? 'Write a Review' : 'Add a Review'}
              </button>
            </div>

            {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-md w-96">
                  <h2 className="text-lg font-semibold mb-4">Add a Review</h2>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Rating</label>
                    <div className="flex gap-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={`h-6 w-6 cursor-pointer ${i < newReview.rating ? 'text-yellow-500' : 'text-gray-300'
                            }`}
                          onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                      type="text"
                      value={newReview.title}
                      maxLength={50}
                      onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                      className="w-full border rounded-md px-3 py-2"
                    />
                    <p className="text-xs text-gray-500">{newReview.title.length}/50</p>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      value={newReview.description}
                      maxLength={300}
                      onChange={(e) => setNewReview({ ...newReview, description: e.target.value })}
                      className="w-full border rounded-md px-3 py-2"
                    ></textarea>
                    <p className="text-xs text-gray-500">{newReview.description.length}/300</p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleAddReview}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
                    >
                      Submit Review
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}



            {showBuyNowModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-md w-96">
                  <h2 className="text-lg font-semibold mb-4">Confirm Order</h2>
                  <img src={product.imageUrl.split(',')[0]} alt={product.title} />
                  <p className='text-xl font-bold'>{product.title}</p>
                  <p className='text-xs text-gray-700'>{product.shortDescription}</p>
                  <p>Size: {selectedSize}</p>
                  <p className='font-bold text-lg'>INR {product.price.toFixed(2)}</p>
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setShowBuyNowModal(false)} className='flex-1 py-2 px-4 poppins-semibold text-center bg-gray-600 items-center flex justify-center rounded-md hover:text-white hover:bg-slate-800 transition-all duration-200 cursor-pointer'>Cancel</button>
                    <button onClick={handleContinue} className='flex-1 py-2 px-4 poppins-semibold text-center bg-orange-600 items-center flex justify-center rounded-md hover:text-white hover:bg-slate-800 transition-all duration-200 cursor-pointer'>Continue</button>
                  </div>
                </div>
              </div>
            )}

            {showAddressModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-md w-96">
                  <h2 className="text-lg font-semibold mb-4">Enter Details</h2>
                  <div className='grid  grid-cols-2 gap-2'>

                  <input type="text" className='p-2 w-full border' placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value )} />
                  <input type="text" className='p-2 w-full border' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value )} />
                  <input type="text" className='p-2 w-full border  col-span-2' placeholder="Address Line 1" value={address.addressLine1} onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })} />
                  <input type="text" className='p-2 w-full border  col-span-2' placeholder="Address Line 2" value={address.addressLine2} onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })} />
                  <input type="text" className='p-2 w-full border' placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                  <input type="text" className='p-2 w-full border' placeholder="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
                  <input type="text" className='p-2 w-full border col-span-2' placeholder="Pin Code" value={address.pinCode} onChange={(e) => setAddress({ ...address, pinCode: e.target.value })} />
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <button onClick={() => setShowAddressModal(false)} className='flex-1 py-2 px-4 poppins-semibold text-center bg-gray-600 items-center flex justify-center rounded-md hover:text-white hover:bg-slate-800 transition-all duration-200 cursor-pointer'>Cancel</button>
                    <button onClick={handlePlaceOrder} className='flex-1 py-2 px-4 poppins-semibold text-center bg-orange-600 items-center flex justify-center rounded-md hover:text-white hover:bg-slate-800 transition-all duration-200 cursor-pointer'>Place Order</button>
                  </div>
                </div>
              </div>
            )}






          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
