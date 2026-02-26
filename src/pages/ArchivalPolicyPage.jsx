import React, { useEffect } from "react";
import Translate from "../components/Translate";
import { useTranslation } from "react-i18next";
import { updateMetaTags } from "../utils/seo";
import PageBanner from "../components/PageBanner";

export default function ArchivalPolicyPage() {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        updateMetaTags(
            `${t('archival_policy')} | ${t('site-title')}`,
            t('archival-desc'),
            t('archival-keywords')
        );
    }, [t, i18n.language]);

    return (
        <section className="w-full min-h-screen bg-primary-50/30 pb-16 text-left">
            <PageBanner
                title={<Translate text={'archival_policy'} />}
                subtitle="Guidelines to Indian Govt. websites 3.0"
                badgeText="Standard"
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="bg-white rounded-xl shadow-lg border border-primary-100 p-8 md:p-12 space-y-12">

                    <div>
                        <h2 className="text-2xl font-bold text-primary-800 mb-4 pb-2 border-b border-gray-200">6. Content Archival Policy (CAP) (clause 5.4.3)</h2>
                    </div>

                    <div className="space-y-6 text-gray-700 leading-relaxed text-justify">
                        <p>
                            The Office of Publications Division, Ministry of Information & Broadcasting (MIB) will be online archived automatically after entering 3 Months from the date of their publishing.
                        </p>

                        <p>
                            The office of Publications Division maintains online archives for a period of <span className="font-semibold text-gray-900">&lt;3 Months&gt;</span> to allow for the retrieval of content which has expired.
                        </p>

                        <p>
                            <span className="font-semibold text-gray-900">&lt;Schemes, Tenders, Forms, Recruitment Notices&gt;</span> which have been withdrawn, or discontinued, or have exceeded 6 months after archiving, may be expunged.
                        </p>

                        <div className="overflow-x-auto mt-8 pt-4">
                            <table className="w-full text-left text-sm text-gray-700 border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                                <thead className="bg-primary-50 text-primary-900 border-b border-primary-100">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 font-bold border-r border-primary-100 w-24">Sr. No</th>
                                        <th scope="col" className="px-6 py-4 font-bold border-r border-primary-100">Content Element</th>
                                        <th scope="col" className="px-6 py-4 font-bold border-r border-primary-100">Entry Policy</th>
                                        <th scope="col" className="px-6 py-4 font-bold">Exit Policy</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 border-r border-gray-200 font-medium">1.</td>
                                        <td className="px-6 py-4 border-r border-gray-200"></td>
                                        <td className="px-6 py-4 border-r border-gray-200"></td>
                                        <td className="px-6 py-4"></td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors bg-gray-50/50">
                                        <td className="px-6 py-4 border-r border-gray-200 font-medium">2.</td>
                                        <td className="px-6 py-4 border-r border-gray-200"></td>
                                        <td className="px-6 py-4 border-r border-gray-200"></td>
                                        <td className="px-6 py-4"></td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 border-r border-gray-200 font-medium">3.</td>
                                        <td className="px-6 py-4 border-r border-gray-200"></td>
                                        <td className="px-6 py-4 border-r border-gray-200"></td>
                                        <td className="px-6 py-4"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
