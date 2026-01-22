import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Translate from "./Translate";

const companyLogos = [
  { name: "Hexagon", img: "/company01.jpeg" },
  { name: "Chervon", img: "/company02.jpg" },
  { name: "Agrinnovate India", img: "/company03.jpeg" },
  { name: "Bharat Dynamics Limited (BDL)", img: "/Bharat_Dynamics_Logo.png" },
  { name: "Bansagar Control Board (BCB)", img: "/compny04.png" },
  { name: "ALDI", img: "/company05.jpg" },
  { name: "Nintendo", img: "/company08.jpg" },
  { name: "LANXESS", img: "/company07.jpg" },
];

export default function CompanyLogoSlider({ advertis }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    setSwiperReady(true);
  }, []);

  return (
    <div className="bg-white py-6 sm:py-8 px-4 sm:px-6">
      {/* Header + Buttons */}
      <div className=" mx-auto flex items-center justify-between sm:px-4 mb-4">
        {/* Left: Header */}
        <h2 className="text-xl sm:text-2xl font-bold text-primary-700">
          <Translate text="web-advertisement" />
        </h2>

        {/* Right: Buttons */}
        <div className="flex items-center gap-2">
          <button
            ref={prevRef}
            aria-label="Previous advertisement"
            className="bg-gray-500 bg-opacity-40 hover:bg-opacity-70 text-white p-2 rounded-full shadow-md transition"
          >
            <FaChevronLeft size={16} aria-hidden="true" />
          </button>
          <button
            ref={nextRef}
            aria-label="Next advertisement"
            className="bg-gray-500 bg-opacity-40 hover:bg-opacity-70 text-white p-2 rounded-full shadow-md transition"
          >
            <FaChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Swiper Slider */}
      {swiperReady && (
        <div
          onMouseEnter={() => swiperInstance?.autoplay?.stop()}
          onMouseLeave={() => swiperInstance?.autoplay?.start()}
          onFocus={() => swiperInstance?.autoplay?.stop()}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              swiperInstance?.autoplay?.start();
            }
          }}
        >
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={2}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            onSwiper={setSwiperInstance}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              340: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              992: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
              1280: { slidesPerView: 6 },
            }}
          >
            {advertis.map((company, index) => (
              <SwiperSlide key={index}>
                <a
                  href={company.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-[10px]"
                >
                  <div className="bg-white border border-gray-200 h-32 rounded-[10px] overflow-hidden shadow-sm group-hover:shadow-lg transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
                    <img
                      src={company.image}
                      alt={company.name || "Advertisement"}
                      className="object-contain max-h-24 w-auto"
                    />
                  </div>
                  <p className="text-center text-[14px] mt-2 text-gray-600 font-medium tracking-wide group-hover:text-primary-700">
                    {company.title}
                  </p>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
