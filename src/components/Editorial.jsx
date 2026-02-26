import React, { useState } from "react";
import { FaNewspaper } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import Translate from "./Translate";
import { useNavigate } from "react-router-dom";

const EditorialSection = ({
    leadArticles = [],
    careerArticles = [],
    specialArticles = [],
    successArticles = []
}) => {
    const [activeTabLeft, setActiveTabLeft] = useState("lead");
    const [activeTabRight, setActiveTabRight] = useState("special");
    const navigate = useNavigate();

    // Data for active tabs
    const leftArticles = activeTabLeft === "lead" ? leadArticles : careerArticles;
    const rightArticles = activeTabRight === "special" ? specialArticles : successArticles;

    return (
        <section className="bg-primary-100 p-2 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-6">
                {/* Left Editorial */}
                <div className="p-2 sm:p-4">
                    <h2 className="flex items-center gap-2 text-base sm:text-xl font-semibold text-primary-700 mb-4">
                        <span><FaNewspaper size={18} className="sm:w-6 sm:h-6" aria-hidden="true" /></span> <Translate text={'editorial'} />
                    </h2>
                    {/* Tabs */}
                    <div className="flex flex-row flex-wrap items-stretch sm:items-center border border-primary-700 mb-2">
                        <button
                            onClick={() => setActiveTabLeft("lead")}
                            className={`flex-[1_1_50%] p-1 sm:p-2 text-center text-sm sm:text-base font-medium break-words ${activeTabLeft === "lead" ? "bg-primary-700 text-white" : "bg-gray-50"
                                }`}
                        >
                            <Translate text={'lead-articles'} />

                        </button>
                        <button
                            onClick={() => setActiveTabLeft("career")}
                            className={`flex-[1_1_50%] p-1 sm:p-2 text-center text-sm sm:text-base font-medium break-words ${activeTabLeft === "career" ? "bg-primary-700 text-white" : "bg-gray-50"
                                }`}
                        >
                            <Translate text={'career-articles'} />
                        </button>
                    </div>

                    {/* Article List */}
                    <ul className="space-y-1 sm:space-y-2 text-xs sm:text-base">
                        {leftArticles && leftArticles.length > 0 ? (
                            leftArticles.slice(0, 5).map((item, idx) => (
                                <li
                                    key={idx}
                                    onClick={() => navigate(`/article/${item.id}`)}
                                    className="flex justify-between items-start sm:items-center p-2 sm:p-4 bg-gray-50 cursor-pointer hover:bg-gray-100"
                                >
                                    <span className="line-clamp-2 break-words pr-2">{item.title}</span>
                                    <span className="text-primary flex-shrink-0 mt-1 sm:mt-0"><FaChevronRight size={12} className="sm:w-4 sm:h-4 text-primary-700" /></span>
                                </li>
                            ))
                        ) : (
                            <li className="p-4 text-center text-gray-500 bg-gray-50">No articles available</li>
                        )}
                    </ul>


                    {/* See More */}
                    <div className="text-right mt-2 sm:mt-3">
                        <button className="text-primary-700 font-semibold border-2 border-primary-700 px-2 sm:px-4 py-1 rounded hover:bg-primary-700 hover:text-white text-xs sm:text-base" onClick={() => navigate(`/editorial-list?tab=${activeTabLeft}`)}>
                            <Translate text={'see-more'} />
                        </button>
                    </div>

                </div>

                {/* Right Editorial */}
                <div className="p-2 sm:p-4">
                    <h2 className="flex items-center gap-2 text-base sm:text-xl font-semibold text-primary-700 mb-4">
                        <span><FaNewspaper size={18} className="sm:w-6 sm:h-6" aria-hidden="true" /></span> <Translate text={'editorial'} />
                    </h2>
                    {/* Tabs */}
                    <div className="flex flex-row flex-wrap items-stretch sm:items-center border border-primary-700 mb-2">
                        <button
                            onClick={() => setActiveTabRight("special")}
                            className={`flex-[1_1_50%] p-1 sm:p-2 text-center text-sm sm:text-base font-medium break-words ${activeTabRight === "special" ? "bg-primary-700 text-white" : "bg-gray-50"
                                }`}
                        >
                            <Translate text={'special-articles'} />
                        </button>
                        <button
                            onClick={() => setActiveTabRight("success")}
                            className={`flex-[1_1_50%] p-1 sm:p-2 text-center text-sm sm:text-base font-medium break-words ${activeTabRight === "success" ? "bg-primary-700 text-white" : "bg-gray-50"
                                }`}
                        >
                            <Translate text={'success-stories'} />

                        </button>
                    </div>

                    {/* Article List */}
                    <ul className="space-y-1 sm:space-y-2 text-xs sm:text-base">
                        {rightArticles && rightArticles.length > 0 ? (
                            rightArticles.slice(0, 5).map((item, idx) => (
                                <li
                                    key={idx}
                                    onClick={() => navigate(`/article/${item.id}`)}
                                    className="flex justify-between items-start sm:items-center p-2 sm:p-4 bg-gray-50 cursor-pointer hover:bg-gray-100"
                                >
                                    <span className="line-clamp-2 break-words pr-2">{item.title}</span>
                                    <span className="text-primary flex-shrink-0 mt-1 sm:mt-0"><FaChevronRight size={12} className="sm:w-4 sm:h-4 text-primary-700" /></span>
                                </li>
                            ))
                        ) : (
                            <li className="p-4 text-center text-gray-500 bg-gray-50">No articles available</li>
                        )}
                    </ul>


                    {/* See More */}
                    <div className="text-right mt-2 sm:mt-3">
                        <button className="text-primary-700 font-semibold border-2 border-primary-700 px-2 sm:px-4 py-1 rounded hover:bg-primary-700 hover:text-white text-xs sm:text-base" onClick={() => navigate(`/editorial-list?tab=${activeTabRight}`)}>
                            <Translate text={'see-more'} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditorialSection;
