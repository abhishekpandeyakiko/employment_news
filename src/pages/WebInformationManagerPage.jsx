
import React, { useEffect } from "react";
import Translate from "../components/Translate";
import { useTranslation } from "react-i18next";
import { updateMetaTags } from "../utils/seo";
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
                        <p className="text-gray-400 text-sm font-medium mt-1 italic">(Sample Content)</p>
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

                    {/* Contact Detail Section */}
                    <div className="pt-8 border-t border-gray-100">
                        <h3 className="text-xl font-bold text-primary-700 mb-6 flex items-center gap-2">
                            <span className="w-2 h-6 bg-primary-600 rounded-full"></span>
                            Contact Detail of WIM is as follows:
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 bg-primary-50/30 p-8 rounded-xl border border-primary-100">
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Name</p>
                                <p className="text-lg font-bold text-gray-800">Vikas Gulia</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Designation</p>
                                <p className="text-lg font-bold text-gray-800">SO</p>
                            </div>
                            <div className="space-y-1 md:col-span-1">
                                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email ID</p>
                                <a href="mailto:gulia.vikas006@gov.in" className="text-lg font-bold text-primary-700 hover:text-primary-800 transition-colors">
                                    gulia.vikas006@gov.in
                                </a>
                            </div>
                            <div className="space-y-1 md:col-span-2">
                                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Contact Address</p>
                                <p className="text-lg text-gray-700 font-medium">
                                    Soochna Bhawan, CGO Complex, Lodhi Road, New Delhi (110003)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
