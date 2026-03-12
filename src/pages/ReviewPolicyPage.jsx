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
                <div className="bg-white rounded-xl shadow-md border border-primary-100 p-8">
                    <h2 className="text-2xl text-center font-bold text-primary-700 mb-6 border-b pb-2">Review Policy</h2>
                    <div className="space-y-6 text-gray-700 leading-relaxed text-left">
                        <section>
                            <p className="text-gray-600">
                                The content and functionality of the Employment News website are reviewed periodically to ensure that the information provided remains accurate, relevant, and up to date. The website’s key features, including the subscription system, payment links, and access to the digital edition, are monitored regularly to ensure smooth functioning.
                            </p>
                        </section>

                        <section>
                            <p className="text-gray-600">
                                Any necessary updates, corrections, or improvements are made as part of the routine maintenance and management of the website by the Publications Division, Ministry of Information and Broadcasting, Government of India.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
}
