/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { getBanners } from "../api-client";
import BannerCarousel from "../components/BannerCarousel";
import ProductCarousel from "../components/ProductCarousel";
import CategorySection from "../components/CategorySection";
import HomePhotos from "../components/HomePhotos";
import { TextHoverEffect } from "../components/ui/text-hover-effect";
import { VelocityScroll } from "../components/magicui/scroll-based-velocity";
import { noOfOrders, noOfProducts, noOfRating, noOfRatingAD } from "../config";
import NumberTicker from "../components/magicui/number-ticker";

const HomePage: React.FC = () => {
  const [banners, setBanners] = useState<any[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const bannerData = await getBanners();
        setBanners(bannerData);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <div>
      <BannerCarousel banners={banners} />

      <div className="mt-10">
        <VelocityScroll
          text="Update Fashion "
          default_velocity={5}
          className="font-display  text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl my-0"
        />
      </div>
      <ProductCarousel />



      <div className="max-w-6xl mx-auto px-2 gap-3 grid grid-cols-1 md:grid-cols-3 justify-center items-center text-center  poppins mt-10">
        <div className="text-5xl font-semibold">
        <NumberTicker value={noOfOrders}/>+
          <p className="text-xl">Happy Customers</p>
        </div>
        <div className="text-5xl font-semibold">
        <NumberTicker value={noOfProducts}/>+
          <p className="text-xl">High-Quality Products</p>
        </div>
        <div className="text-5xl font-semibold">
        <NumberTicker value={noOfRating}/>.<NumberTicker value={noOfRatingAD}/>/5
          <p className="text-xl">Positive Rating</p>
        </div>
      </div>




      <CategorySection />
      <div className="-my-20 portrait:hidden flex items-center justify-center">
        <TextHoverEffect text="NEW DAY NEW COLLECTION" />
      </div>
      <HomePhotos />
    </div>
  );
};

export default HomePage;
