import React from "react";

export default function RegisterPaySubscribeFlow() {
  return (
    <div className="flex flex-col items-center my-6 sm:my-8">
      <div className="flex items-center justify-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8">
        {/* Register Step */}
        <div className="flex items-center">
          <div className="bg-primary-50 border-2 border-primary-500 rounded-full px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 min-w-20 sm:min-w-24 md:min-w-32 text-center">
            <span className="text-primary-600 font-semibold text-xs sm:text-sm md:text-base">Register</span>
          </div>
          {/* Arrow */}
          <div className="ml-2 sm:ml-3 md:ml-4 lg:ml-6">
            <svg width="16" height="12" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-5 sm:h-3 md:w-6 md:h-4">
              <path d="M16 8L8 1L8 15L16 8Z" fill="#009DB3" />
            </svg>
          </div>
        </div>

        {/* Pay Step */}
        <div className="flex items-center">
          <div className="bg-primary-50 border-2 border-primary-500 rounded-full px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 min-w-20 sm:min-w-24 md:min-w-32 text-center">
            <span className="text-primary-600 font-semibold text-xs sm:text-sm md:text-base">Pay</span>
          </div>
          {/* Arrow */}
          <div className="ml-2 sm:ml-3 md:ml-4 lg:ml-6">
            <svg width="16" height="12" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-5 sm:h-3 md:w-6 md:h-4">
              <path d="M16 8L8 1L8 15L16 8Z" fill="#009DB3" />
            </svg>
          </div>
        </div>

        {/* Subscribe Step */}
        <div className="flex items-center">
          <div className="bg-primary-50 border-2 border-primary-500 rounded-full px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 min-w-20 sm:min-w-24 md:min-w-32 text-center">
            <span className="text-primary-600 font-semibold text-xs sm:text-sm md:text-base">Subscribe</span>
          </div>
        </div>
      </div>
    </div>
  );
}
