/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { getBanners } from "../api-client";
import BannerCarousel from "../components/BannerCarousel";
import ProductCarousel from "../components/ProductCarousel";
import CategorySection from "../components/CategorySection";
import HomePhotos from "../components/HomePhotos";
import { TextHoverEffect } from "../components/ui/text-hover-effect";
import { VelocityScroll } from "../components/magicui/scroll-based-velocity";

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
      <VelocityScroll
        text="Update Fashion "
        default_velocity={5}
        className="font-display my-4 text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]"
      />
      <ProductCarousel />
      <div className="-my-20 portrait:hidden flex items-center justify-center">
        <TextHoverEffect text="NEW DAY NEW COLLECTION" />
      </div>
      <CategorySection />
      <HomePhotos />
    </div>
  );
};

export default HomePage;
