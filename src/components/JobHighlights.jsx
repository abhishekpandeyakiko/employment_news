import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from "react-icons/fa";
import { IoBagSharp } from "react-icons/io5";
import Translate from "./Translate";



export default function JobHighlights({ jobHighlight, carouselImages, sliderTime }) {

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-change carousel every 5s
  useEffect(() => {
    if (paused) return; // Stop auto-slide if paused

    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    }, [sliderTime[current]]);
    return () => clearInterval(interval);
  }, [carouselImages.length, paused]);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === carouselImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="bg-primary-100 p-2 sm:p-4">
      <div className="max-w-9xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-4">

        {/* Carousel Section */}
        <div className="col-span-1 md:col-span-9 bg-white rounded-lg shadow-md relative overflow-hidden h-48 xs:h-64 sm:h-80 md:h-[500px]">
          <div className="relative w-full h-full">
            <img
              src={carouselImages[current]}
              alt=""
              className="w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <button
                onClick={() => setPaused(!paused)}
                aria-label={paused ? "Play slider" : "Pause slider"}
                className="bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-sm transition-all pointer-events-auto"
              >
                {paused ? <FaPlay size={24} /> : <FaPause size={24} />}
              </button>
            </div>
          </div>
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 cursor-pointer p-1 sm:p-2 rounded-full text-white bg-gray-500 bg-opacity-50 hover:bg-opacity-75 transition"
          >
            <FaChevronLeft size={18} className="sm:w-6 sm:h-6" />
          </button>
          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 cursor-pointer p-1 sm:p-2 rounded-full text-white bg-gray-500 bg-opacity-50 hover:bg-opacity-75 transition"
          >
            <FaChevronRight size={18} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Job Highlights Section */}
        <div id="skip-target" tabIndex="-1" className="col-span-1 md:col-span-3 mt-2 md:mt-0 focus:outline-none scroll-mt-32">
          <a href="https://i5l.95d.mytemp.website/empnews/backend/members" className="flex items-center mb-2 text-primary-700">
            <IoBagSharp size={18} className="sm:w-6 sm:h-6" aria-hidden="true" />
            <h2 className="text-base sm:text-lg font-semibold ml-2"><Translate text={'job-highlights'} /></h2>
          </a>

          {/* Auto-scrolling list */}
          <div className="relative h-32 xs:h-48 sm:h-[415px] overflow-hidden bg-primary-700 rounded-sm px-1 sm:px-2">
            <div className="scroll-container">
              {/* First copy */}
              {jobHighlight.map((job, index) => (
                <a
                  key={`job-${index}`}
                  href={`https://i5l.95d.mytemp.website/empnews/backend/members`}
                  className="flex justify-between items-center p-1 sm:p-2 border-b border-primary-400 text-white text-xs sm:text-sm cursor-pointer hover:bg-primary-600 transition"
                >
                  <span className="text-white text-xs sm:text-sm mr-2">
                    {job.last_date} | {job.post} | {job.method_of_appointment} |{" "}
                    {job.organisation}
                  </span>
                  <FaChevronRight size={12} className="sm:w-4 sm:h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Button */}
          <div className="pt-1">
            <button className="w-full bg-white text-primary-700 font-semibold py-1 sm:py-2 px-2 sm:px-4 rounded-sm shadow-md border border-primary-400 text-xs sm:text-base">
              <Translate text={'see-more'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
