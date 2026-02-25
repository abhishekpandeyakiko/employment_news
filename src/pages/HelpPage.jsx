
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
                        <section>
                            <h3 className="text-xl font-semibold text-primary-600 mb-3">Navigating the Portal</h3>
                            <p>
                                The Employment News portal is categorized into various sections to provide easy access to job highlights, announcements, career articles, and subscription services.
                            </p>
                        </section>
                        <section>
                            <h3 className="text-xl font-semibold text-primary-600 mb-3">Subscription Queries</h3>
                            <p>
                                For any issues related to e-Employment News or Print subscription, please visit our <a href="/empnews/contact" className="text-primary-700 font-bold hover:underline">Contact page</a> or refer to the subscription section for detailed instructions.
                            </p>
                        </section>
                        <section>
                            <h3 className="text-xl font-semibold text-primary-600 mb-3">Viewing Documents</h3>
                            <p>
                                Most of the documents on this portal are available in HTML and PDF formats. To view PDF files, you will need a PDF reader installed on your system.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
}
