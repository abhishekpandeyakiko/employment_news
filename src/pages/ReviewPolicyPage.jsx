import React, { useEffect } from "react";
import Translate from "../components/Translate";
import { useTranslation } from "react-i18next";
import { updateMetaTags } from "../utils/seo";
import PageBanner from "../components/PageBanner";

export default function ReviewPolicyPage() {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        updateMetaTags(
            `${t('review_policy')} | ${t('site-title')}`,
            t('review-desc'),
            t('review-keywords')
        );
    }, [t, i18n.language]);

    return (
        <section className="w-full min-h-screen bg-primary-50/30 pb-16 text-left">
            <PageBanner
                title={<Translate text={'review_policy'} />}
                subtitle="Guidelines to Indian Govt. websites 3.0"
                badgeText="Standard"
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="bg-white rounded-xl shadow-lg border border-primary-100 p-8 md:p-12 space-y-12">

                    <div>
                        <h2 className="text-2xl font-bold text-primary-800 mb-4 pb-2 border-b border-gray-200">5. Web Content Review Policy (CRP) (clause 5.4.3)</h2>
                    </div>

                    <div className="space-y-6 text-gray-700 leading-relaxed text-justify">
                        <p>
                            The Employment News website is the face of the Government disseminating government information and services. This content Review Policy has been formulated to keep the content on the Employment News website current and up-to-date. Since the type of the content on the Employment News website varies, different Review timelines are defined for the diverse content elements.
                        </p>

                        <p>
                            This Review Policy is based on different types of content elements, their validity and relevance as well as the archival policy.
                        </p>

                        <p className="font-semibold text-gray-900">
                            As a general rule:
                        </p>

                        <p>
                            The entire website content shall be reviewed in a phased manner over a period of 12 months to ensure the currency of the content. The exception to the above is listed below:
                        </p>

                        <div className="overflow-x-auto mt-8 pt-4">
                            <h3 className="text-lg font-bold text-primary-800 mb-3">Content Review Timeline:</h3>
                            <table className="w-full text-left text-sm text-gray-700 border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                                <thead className="bg-primary-50 text-primary-900 border-b border-primary-100 uppercase text-xs tracking-wider">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 font-bold border-r border-primary-100">SECTION</th>
                                        <th scope="col" className="px-6 py-4 font-bold">REVIEW PERIODICITY</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 border-r border-gray-200 font-medium">Home Page</td>
                                        <td className="px-6 py-4">Daily</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors bg-gray-50/50">
                                        <td className="px-6 py-4 border-r border-gray-200 font-medium">News Page</td>
                                        <td className="px-6 py-4">As and when required</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 border-r border-gray-200 font-medium">Who’s who list</td>
                                        <td className="px-6 py-4">As and when required</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors bg-gray-50/50">
                                        <td className="px-6 py-4 border-r border-gray-200 font-medium">Newsletter, Circulars, Notifications etc</td>
                                        <td className="px-6 py-4">As and when required</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 border-r border-gray-200 font-medium">Acts, Rules</td>
                                        <td className="px-6 py-4">Annually</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors bg-gray-50/50">
                                        <td className="px-6 py-4 border-r border-gray-200 font-medium">Upload Employment PDF</td>
                                        <td className="px-6 py-4">Once in a week</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 border-r border-gray-200 font-medium">Upload Employment Flipbook</td>
                                        <td className="px-6 py-4">Once in a week</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors bg-gray-50/50">
                                        <td className="px-6 py-4 border-r border-gray-200 font-medium">Editorials, Articles</td>
                                        <td className="px-6 py-4">As and when required</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 border-r border-gray-200 font-medium">Web Advertisements</td>
                                        <td className="px-6 py-4">As and when required</td>
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
