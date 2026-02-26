import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from "react-icons/fa";
import { IoBagSharp } from "react-icons/io5";
import Translate from "./Translate";



export default function JobHighlights({ jobHighlight, carouselImages, sliderTime }) {

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-change carousel every 5s
  // Auto-change carousel every 5s
  useEffect(() => {
    if (paused) return; // Stop auto-slide if paused

    const delay = 5000;
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    }, delay);
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
            {carouselImages && carouselImages.length > 0 ? (
              <>
                {/* Background blurred image to fill empty space */}
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat blur-[20px] scale-110 opacity-60 transition-all duration-700"
                  style={{ backgroundImage: `url(${carouselImages[current]})` }}
                  aria-hidden="true"
                ></div>
                {/* Foreground fully visible image */}
                <img
                  src={carouselImages[current]}
                  alt={`Job Highlight Illustration ${current + 1}`}
                  className="relative z-10 w-full h-full object-contain drop-shadow-lg transition-all duration-700"
                />
                <div className="absolute z-20 inset-0 flex items-center justify-center pointer-events-none">
                  <button
                    onClick={() => setPaused(!paused)}
                    aria-label={paused ? "Start job highlights animation" : "Stop job highlights animation"}
                    className="bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-md transition-all pointer-events-auto shadow-md ring-1 ring-white/10"
                    title={paused ? "Play" : "Pause"}
                  >
                    {paused ? <FaPlay size={18} /> : <FaPause size={18} />}
                  </button>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400 italic">
                No slide images available
              </div>
            )}
          </div>
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            aria-label="Previous image"
            className="absolute z-30 top-1/2 left-2 sm:left-4 -translate-y-1/2 cursor-pointer p-1 sm:p-2 rounded-full text-white bg-black/30 hover:bg-black/50 transition-all shadow-lg focus:ring-2 focus:ring-white"
          >
            <FaChevronLeft size={18} className="sm:w-6 sm:h-6" />
          </button>
          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            aria-label="Next image"
            className="absolute z-30 top-1/2 right-2 sm:right-4 -translate-y-1/2 cursor-pointer p-1 sm:p-2 rounded-full text-white bg-black/30 hover:bg-black/50 transition-all shadow-lg focus:ring-2 focus:ring-white"
          >
            <FaChevronRight size={18} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Job Highlights Section */}
        <div id="skip-target" tabIndex="-1" className="col-span-1 md:col-span-3 mt-2 md:mt-0 focus:outline-none scroll-mt-32">
          <a href="https://i5l.95d.mytemp.website/empnews/backend/members" className="flex items-center mb-2 text-primary-700">
            <IoBagSharp size={18} className="sm:w-6 sm:h-6" aria-hidden="true" />
            <h2 className="text-sm lg:text-lg font-semibold ml-2"><Translate text={'job-highlights'} /></h2>
          </a>

          {/* Auto-scrolling list */}
          <div className="relative h-32 xs:h-48 sm:h-[415px] overflow-hidden bg-primary-700 rounded-sm px-1 sm:px-2">
            {jobHighlight && jobHighlight.length > 0 ? (
              <div className="scroll-container">
                {/* First copy */}
                {jobHighlight.map((job, index) => (
                  <a
                    key={`job-${index}`}
                    href={`https://i5l.95d.mytemp.website/empnews/backend/members`}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 sm:p-3 border-b border-primary-400 text-white text-sm cursor-pointer hover:bg-primary-600 transition break-words"
                  >
                    <span className="text-white text-sm mr-2 mb-2 sm:mb-0">
                      {job.last_date} | {job.post} | {job.method_of_appointment} |{" "}
                      {job.organisation}
                    </span>
                    <FaChevronRight size={12} className="w-4 h-4 hidden sm:block self-end sm:self-auto" aria-hidden="true" />
                  </a>
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-white font-medium text-sm sm:text-base">
                Data Not Found
              </div>
            )}
          </div>

          {/* Button */}
          <div className="pt-1">
            <button className="w-full bg-white text-primary-700 font-semibold py-1 sm:py-2 px-2 sm:px-4 rounded-sm shadow-md border border-primary-400 text-xs sm:text-base" aria-label="See more job highlights">
              <Translate text={'see-more'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
