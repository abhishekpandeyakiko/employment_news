import React, { useEffect, useState } from "react";
import Translate from "../components/Translate";
import { getPosts } from "../utils/networkApi";
import Loader from "../components/Loader";
import { FaExclamationTriangle, FaExternalLinkAlt } from "react-icons/fa";
import ExternalLinkOpener from "../components/ExternalLinkOpener";
import { useTranslation } from "react-i18next";
import { updateMetaTags } from "../utils/seo";
import PageBanner from "../components/PageBanner";

export default function AnnouncementsPage() {
    const { t, i18n } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        updateMetaTags(
            `${t('announcements')} | ${t('site-title')}`,
            t('announcements-desc'),
            t('announcements-keywords')
        );
    }, [t, i18n.language]);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const savedLang = (await localStorage.getItem("appLang")) || "en";
                const response = await getPosts(`home-api?lang=${savedLang}`);
                setLoading(false);
                if (response.announcement && response.announcement.data) {
                    setAnnouncements(response.announcement.data);
                }
            } catch (error) {
                setLoading(false);
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <section className="w-full min-h-screen bg-primary-50/30 pb-16">
            {loading && <Loader />}

            <PageBanner
                title={<Translate text={"announcements"} />}
                subtitle={'"Stay updated with the latest official notifications and important announcements."'}
                badgeText="Latest Updates"
            />

            {/* Main Content Area */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-[15px]">
                {announcements.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {announcements.map((item, index) => (
                            <article
                                key={index}
                                className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary-100 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between group relative overflow-hidden"
                            >
                                {/* Polish design accent */}
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary-600 transition-all duration-300 group-hover:w-2"></div>

                                <div className="flex-1">
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 group-hover:text-primary-700 transition-colors leading-tight">
                                        {item.title}
                                    </h2>
                                    <div className="flex items-center gap-4">
                                        {item.date && (
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Date Published</span>
                                                <span className="text-sm font-medium text-primary-600">{item.date}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {item.url && (
                                    <div className="mt-6 md:mt-0 flex shrink-0">
                                        <ExternalLinkOpener
                                            url={item.url}
                                            text={
                                                <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-600 text-white font-bold text-sm shadow-lg shadow-primary-600/20 group-hover:bg-primary-700 transition-all">
                                                    View Details
                                                    <FaExternalLinkAlt size={12} />
                                                </span>
                                            }
                                            className="block"
                                            ariaLabel={`${item.title} - View Details - opens in a new window`}
                                        />
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                ) : (
                    !loading && (
                        <div className="bg-white p-12 md:p-20 rounded-3xl shadow-sm border border-gray-100 text-center">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-50 rounded-full mb-6">
                                <FaExclamationTriangle className="text-gray-300 text-4xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Announcements Found</h3>
                            <p className="text-gray-500 max-w-sm mx-auto">There are currently no announcements to display. Please check back later for updates.</p>
                        </div>
                    )
                )}
            </div>
        </section>
    );
}
