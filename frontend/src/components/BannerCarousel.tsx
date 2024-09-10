import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

interface Banner {
  _id: string;
  imageUrl: string;
  link: string;
}

interface BannerCarouselProps {
  banners: Banner[];
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <></>,
    prevArrow:<></>,
  };

  return (
    <div className="relative min-h-[40rem]">
      <Slider {...settings} className="w-full">
        {banners.map((banner) => (
          <Link key={banner._id} to={banner.link}>
            <img
              src={banner.imageUrl}
              alt="Banner"
              className="w-full h-[40rem] object-cover"
            />
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default BannerCarousel;
