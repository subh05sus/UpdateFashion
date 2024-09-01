/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { getBanners } from "../api-client";
import BannerCarousel from "../components/BannerCarousel";
import ProductCarousel from "../components/ProductCarousel";
import CategorySection from "../components/CategorySection";
import HomePhotos from "../components/HomePhotos";
import { TextHoverEffect } from "../components/ui/text-hover-effect";

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
    <ProductCarousel/>
    <div className="-my-20 portrait:hidden flex items-center justify-center">
      <TextHoverEffect text="NEW DAY NEW COLLECTION" />
    </div>
    <CategorySection/>
    <HomePhotos/>
    </div>
  );
};

export default HomePage;
