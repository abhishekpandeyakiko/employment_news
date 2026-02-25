
import React, { useEffect } from "react";
import Translate from "../components/Translate";
import { useTranslation } from "react-i18next";
import { updateMetaTags } from "../utils/seo";
import PageBanner from "../components/PageBanner";

export default function TermsConditionsPage() {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        updateMetaTags(
            `${t('terms_conditions')} | ${t('site-title')}`,
            t('terms-desc'),
            t('terms-keywords')
        );
    }, [t, i18n.language]);

    return (
        <section className="w-full min-h-screen bg-primary-50/30 pb-16">
            <PageBanner
                title={<Translate text={'terms_conditions'} />}
                subtitle={t('terms-desc')}
                badgeText="User Agreement"
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-[15px]">
                <div className="bg-white rounded-xl shadow-md border border-primary-100 p-8">
                    <h2 className="text-2xl font-bold text-primary-700 mb-6 border-b pb-2">Terms & Conditions</h2>
                    <div className="space-y-6 text-gray-700 leading-relaxed text-left">
                        <p>
                            This website is designed, developed and maintained by Employment News, Publications Division, Ministry of Information and Broadcasting, Government of India.
                        </p>
                        <p>
                            Though all efforts have been made to ensure the accuracy and currency of the content on this website, the same should not be construed as a statement of law or used for any legal purposes.
                        </p>
                        <p>
                            In no event will Employment News be liable for any expense, loss or damage including, without limitation, indirect or consequential loss or damage, or any expense, loss or damage whatsoever arising from use, or loss of use, of data, arising out of or in connection with the use of this website.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
