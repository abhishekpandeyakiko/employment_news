
import React, { useEffect } from "react";
import Translate from "../components/Translate";
import { useTranslation } from "react-i18next";
import { updateMetaTags } from "../utils/seo";
import { HiPhone, HiEnvelope, HiMapPin, HiUser } from "react-icons/hi2";
import PageBanner from "../components/PageBanner";

export default function WebInformationManagerPage() {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        updateMetaTags(
            `${t('web_information_manager')} | ${t('site-title')}`,
            t('wim-desc'),
            t('wim-keywords')
        );
    }, [t, i18n.language]);

    return (
        <section className="w-full min-h-screen bg-primary-50/30 pb-16 text-left">
            <PageBanner
                title={<Translate text={'web_information_manager'} />}
                subtitle="Guidelines to Indian Govt. websites 3.0"
                badgeText="Administration"
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="bg-white rounded-xl shadow-lg border border-primary-100 p-8 md:p-12 space-y-10">

                    {/* Clause Title */}
                    <div>
                        <h2 className="text-2xl font-bold text-primary-800">1. Web Information Manager (clause 5.4.1)</h2>
                    </div>

                    <div className="space-y-6 text-gray-700 leading-relaxed text-justify">
                        <p>
                            The Web Information Manager shall ensure that there is a proper flow of content to the site and that content quality and user satisfaction issues are taken care of. To achieve this, the web information Manager coordinates with the various sections of the Office of Publications Division, Ministry of Information & Broadcasting (MIB). The Web Information Manager also undertakes the following activities with regards to the Employment News website being maintained by them:
                        </p>

                        <ul className="space-y-4 list-disc pl-5 font-medium text-gray-800">
                            <li>Web Information Manager is overall responsible for quality and quantity of information and services on the website.</li>
                            <li>Formulation of policies concerning management of content on the web through its entire life cycle viz. Provision, Moderation Approval and Archival.</li>
                            <li>Ensuring that all contents on the website remain always authentic, accurate and up-to-date and obsolete information or services removed.</li>
                            <li>Changing and periodically validating links to related information.</li>
                            <li>Ensuring the entry of the website at a prominent rank in all the major search engines so that the site’s visibility is enhanced and users are made aware of its address.</li>
                            <li>Replying to the feedback mails received from visitors either by himself or through someone designated by him for the purpose.</li>
                            <li>The complete contact details of the web Information manager are displayed on the Employment News website. The visitor could contact him/her in case of some queries or requirements.</li>
                        </ul>
                    </div>

                    {/* Redesigned Contact Detail Section - Original Screenshot Colors (Compact) */}
                    <div className="pt-12 border-t-2 border-primary-50">

                        {/* Small Left-Aligned Section Heading */}
                        <div className="text-left mb-6 border-l-4 border-primary-600 pl-4">
                            <h2 className="text-xl md:text-2xl font-bold text-primary-900">
                                Web Information Manager (WIM) Contact Detail
                            </h2>
                            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Official Channel</p>
                        </div>

                        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">

                            {/* Left Side: Gradient Sidebar - Updated to Portal Theme */}
                            <div className="md:w-1/3 bg-gradient-to-br from-primary-800 to-primary-600 p-6 flex flex-col items-center justify-center text-center text-white">
                                <div className="w-24 h-24 rounded-full border-4 border-white/20 bg-white/10 flex items-center justify-center mb-4 backdrop-blur-sm overflow-hidden">
                                    <HiUser className="text-6xl text-white/90" />
                                </div>
                                <h3 className="text-xl font-bold leading-tight mb-1 uppercase tracking-wide">
                                    Web Information Manager
                                </h3>
                                <p className="text-white/70 text-[10px] font-medium">Official Contact Details</p>
                            </div>

                            {/* Right Side: Information Blocks - Portal Theme Aligned */}
                            <div className="md:w-2/3 p-6 bg-primary-50/10 flex flex-col gap-2 justify-center">

                                {/* Name Block */}
                                <div className="bg-primary-50/40 rounded-xl p-3 border border-primary-100/50 shadow-sm transition-transform hover:translate-x-1">
                                    <p className="text-[9px] text-primary-600 font-black uppercase tracking-[0.2em]">NAME</p>
                                    <p className="text-primary-900 font-bold text-sm leading-tight">Vikas Gulia</p>
                                </div>

                                {/* Designation Block */}
                                <div className="bg-primary-50/40 rounded-xl p-3 border border-primary-100/50 shadow-sm transition-transform hover:translate-x-1">
                                    <p className="text-[9px] text-primary-600 font-black uppercase tracking-[0.2em]">DESIGNATION</p>
                                    <p className="text-primary-900 font-bold text-sm leading-tight">SO</p>
                                </div>

                                {/* Email Block */}
                                <div className="bg-primary-50/40 rounded-xl p-3 border border-primary-100/50 shadow-sm transition-transform hover:translate-x-1">
                                    <p className="text-[9px] text-primary-600 font-black uppercase tracking-[0.2em]">EMAIL</p>
                                    <p className="text-primary-900 font-bold text-sm leading-tight">gulia[dot]vikas006[at]gov[dot]in</p>
                                </div>

                                {/* Address Block */}
                                <div className="bg-primary-50/40 rounded-xl p-3 border border-primary-100/50 shadow-sm transition-transform hover:translate-x-1">
                                    <p className="text-[9px] text-primary-600 font-black uppercase tracking-[0.2em]">CONTACT ADDRESS</p>
                                    <p className="text-primary-900 font-bold text-sm leading-tight">
                                        Soochna Bhawan, CGO Complex, New Delhi (110003)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
