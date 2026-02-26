import React from "react";
import Breadcrumbs from "./Breadcrumbs";

const PageBanner = ({ title, subtitle, badgeText = "Official Portal" }) => {
    return (
        <div className="w-full pt-8 md:pt-12 pb-6 relative overflow-hidden bg-gradient-to-br from-primary-900 to-primary-800 text-white border-b border-primary-950">
            {/* Subtle Abstract Polish Shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl invisible md:visible"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-400/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-2xl"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 mb-4 shadow-sm">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary-300"></span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">{badgeText}</span>
                </div>

                <h1 className="text-2xl md:text-5xl font-extrabold tracking-tight text-center mb-1 md:mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 pt-[7px] pb-[10px]">
                    {title}
                </h1>

                {subtitle && (
                    <p className="text-primary-100/70 text-xs md:text-base font-medium max-w-2xl text-center leading-relaxed italic transition-all duration-500 pt-[7px] pb-[7px]">
                        {subtitle}
                    </p>
                )}

                <div className="mt-8 md:mt-10 w-full flex justify-start">
                    <Breadcrumbs />
                </div>
            </div>
        </div>
    );
};

export default PageBanner;
