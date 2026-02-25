import React, { useEffect } from "react";
import Translate from "../components/Translate";
import { Link } from "react-router-dom";
import { FaSitemap, FaHome, FaChevronRight } from "react-icons/fa";

import { useTranslation } from "react-i18next";
import { updateMetaTags } from "../utils/seo";
import PageBanner from "../components/PageBanner";

export default function Sitemap() {
    const { t, i18n } = useTranslation();
    useEffect(() => {
        updateMetaTags(
            `${t('sitemap')} | ${t('site-title')}`,
            t('sitemap-desc'),
            t('sitemap-keywords')
        );
    }, [t, i18n.language]);

    const sitemapLinks = [
        { title: "Home", path: "/" },
        { title: "About Us", path: "/about" },
        { title: "Announcements", path: "/all-announcements" },
        { title: "Archives", path: "/archive" },
        { title: "Sales Points", path: "/sales-points" },
        { title: "RTIs", path: "/rti" },
        { title: "Advertisements", path: "/advertisements" },
        { title: "Contact Us", path: "/contact" },
        { title: "Grievance", path: "/grievance" },
        { title: "e-Employment News Subscription", path: "/e-employment-news-subscription" },
        { title: "Print Subscription", path: "/print-employment-news-subscription" },
    ];

    const policyLinks = [
        { title: "Privacy Policy", path: "/policies/privacy" },
        { title: "Hyperlinking Policy", path: "/policies/hyperlinking" },
        { title: "Copyright Policy", path: "/policies/copyright" },
        { title: "Terms & Conditions", path: "/policies/terms" },
        { title: "Accessibility Statement", path: "/policies/accessibility" },
        { title: "Help", path: "/help" },
    ];

    return (
        <section className="w-full min-h-screen bg-gray-50 pb-16">
            <PageBanner
                title={t('sitemap')}
                subtitle={'"A comprehensive directory of all pages and sections available on this portal."'}
                badgeText="Portal Directory"
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Main Navigation links */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-primary-800 mb-6 flex items-center gap-2">
                            <div className="w-2 h-8 bg-primary-600 rounded-full"></div>
                            Main Sections
                        </h2>
                        <ul className="space-y-4">
                            {sitemapLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-700 hover:text-primary-600 font-medium flex items-center gap-3 group transition-colors"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary-200 group-hover:bg-primary-500 transition-all"></span>
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Policy links */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-primary-800 mb-6 flex items-center gap-2">
                            <div className="w-2 h-8 bg-primary-600 rounded-full"></div>
                            Policies & Help
                        </h2>
                        <ul className="space-y-4">
                            {policyLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-700 hover:text-primary-600 font-medium flex items-center gap-3 group transition-colors"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary-200 group-hover:bg-primary-500 transition-all"></span>
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
