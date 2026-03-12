
import React, { useEffect } from "react";
import Translate from "../components/Translate";
import { useTranslation } from "react-i18next";
import { updateMetaTags } from "../utils/seo";
import PageBanner from "../components/PageBanner";

export default function FeedbackPage() {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        updateMetaTags(
            `${t('feedback')} | ${t('site-title')}`,
            t('feedback-desc'),
            t('feedback-keywords')
        );
    }, [t, i18n.language]);

    return (
        <section className="w-full min-h-screen bg-primary-50/30 pb-16">
            <PageBanner
                title={<Translate text={'feedback'} />}
                subtitle={t('feedback-desc')}
                badgeText="Your Input Matters"
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-[15px]">
                <div className="bg-white rounded-xl shadow-md border border-primary-100 p-8">
                    <h2 className="text-2xl font-bold text-primary-700 mb-6 border-b pb-2">Feedback</h2>
                    <div className="space-y-6 text-gray-700 leading-relaxed text-left">
                        <section className="mb-8">
                            <p className="text-gray-700 leading-relaxed italic border-l-4 border-primary-500 pl-4 bg-primary-50/30 py-2">
                                We value your input to enhance the user experience of the Employment News portal. We encourage users to submit suggestions, report technical bugs, or provide comments on our content through the online feedback form. All submissions are reviewed by our technical team, and necessary improvements are implemented periodically.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
}
