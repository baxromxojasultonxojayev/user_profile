import React from "react";
import MenuList from "src/components/navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import "./style.scss";

const HomePage = () => {
  const sectionSlider = [
    "https://picsum.photos/id/1/200/300",
    "https://picsum.photos/id/2/200/300",
    "https://picsum.photos/id/3/200/300",
  ];

  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => console.log(data));
  return (
    <div className="home-page">
      <MenuList />
      <div className="container">
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
        {/* <div className="slider-container">
          <Slider {...settings}>
            {sectionSlider.map((item) => (
              <div className="slider">
                <img src={item} alt="" />
              </div>
            ))}
          </Slider>
        </div> */}
      </div>
    </div>
  );
};

export default HomePage;
