
import React, { useEffect } from "react";
import Translate from "../components/Translate";
import { useTranslation } from "react-i18next";
import { updateMetaTags } from "../utils/seo";
import PageBanner from "../components/PageBanner";

export default function HelpPage() {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        updateMetaTags(
            `${t('help')} | ${t('site-title')}`,
            t('help-desc'),
            t('help-keywords')
        );
    }, [t, i18n.language]);

    return (
        <section className="w-full min-h-screen bg-primary-50/30 pb-16">
            <PageBanner
                title={<Translate text={'help'} />}
                subtitle={t('help-desc')}
                badgeText="Support Center"
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-[15px]">
                <div className="bg-white rounded-xl shadow-md border border-primary-100 p-8">
                    <h2 className="text-2xl font-bold text-primary-700 mb-6 border-b pb-2">Help</h2>
                    <div className="space-y-6 text-gray-700 leading-relaxed text-left">
                        <section className="mb-8">
                            <p className="text-gray-700 leading-relaxed italic border-l-4 border-primary-500 pl-4 bg-primary-50/30 py-2">
                                This website serves as a primary resource for government job listings and career-related content. Users can navigate through various categories, view job headlines, and read detailed articles.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h3 className="text-xl font-bold text-primary-700 mb-2">Subscription Access</h3>
                            <p className="text-gray-600">
                                Subscribed users can access the full weekly edition in digital formats.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-primary-700 mb-2">Support</h3>
                            <p className="text-gray-600">
                                For assistance regarding account registration, subscription renewals, or technical navigation, please refer to our FAQ or contact the administrator via the Feedback section.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
}
