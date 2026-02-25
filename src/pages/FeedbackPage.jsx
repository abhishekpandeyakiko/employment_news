
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
                        <p>
                            We value your feedback and suggestions to help us improve our services and provide a better experience for our users.
                        </p>
                        <p>
                            Please feel free to share your thoughts, comments, or report any issues you encounter while using the Employment News portal.
                        </p>
                        <div className="p-6 bg-primary-50 rounded-lg border border-primary-100 italic">
                            <p>For formal grievances, please use our <a href="/empnews/grievance" className="text-primary-700 font-bold hover:underline">Grievance Form</a>.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
