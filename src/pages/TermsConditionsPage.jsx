
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
                        <section>
                            <p className="text-gray-600">
                                Access to the full weekly publication is available only to users with a valid paid subscription. While every effort is made to ensure the accuracy of the job notifications published on the website, users are advised to verify the details from the official notifications issued by the concerned recruiting organizations. The subscription fee, once paid and the e-paper access is activated, is generally non-refundable.
                            </p>
                        </section>

                        <section>
                            <p className="text-gray-600">
                                Digital access (e-version) is typically activated within 48 hours of successful payment confirmation.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-primary-700 mb-2">Refunds/Cancellations</h3>
                            <p className="text-gray-600">
                                Subscription fees are generally non-refundable once the e-version access is activated.
                            </p>
                        </section>

                        <section>
                            <p className="text-gray-600">
                                One subscription is intended for a single user; sharing credentials or mass-distributing the PDF/Flipbook is a violation of the copyright policy.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
}
