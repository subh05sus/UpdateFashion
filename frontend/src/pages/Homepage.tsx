/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { getBanners } from "../api-client";
import BannerCarousel from "../components/BannerCarousel";
import ProductCarousel from "../components/ProductCarousel";
import CategorySection from "../components/CategorySection";

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
    <CategorySection/>
    </div>
  );
};

export default HomePage;
