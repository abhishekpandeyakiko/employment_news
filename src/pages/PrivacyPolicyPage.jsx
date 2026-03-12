
import React, { useEffect } from "react";
import Translate from "../components/Translate";
import { useTranslation } from "react-i18next";
import { updateMetaTags } from "../utils/seo";
import PageBanner from "../components/PageBanner";

export default function PrivacyPolicyPage() {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        updateMetaTags(
            `${t('privacy_policy')} | ${t('site-title')}`,
            t('privacy-desc'),
            t('privacy-keywords')
        );
    }, [t, i18n.language]);

    return (
        <section className="w-full min-h-screen bg-primary-50/30 pb-16 text-left">
            <PageBanner
                title={<Translate text={'privacy_policy'} />}
                subtitle="Guidelines to Indian Govt. websites 3.0"
                badgeText="Standard"
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="bg-white rounded-xl shadow-md border border-primary-100 p-8">
                    <h2 className="text-2xl font-bold  text-center text-primary-700 mb-6 border-b pb-2">Privacy Policy</h2>
                    <div className="space-y-6 text-gray-700 leading-relaxed text-left">
                        <section>
                            <h3 className="text-xl font-bold text-primary-700 mb-2">i. Voluntary Disclosure</h3>
                            <p className="text-gray-600">
                                This website does not automatically collect personal information. Personal data is only gathered when voluntarily provided through subscription registrations, account creation, or feedback forms.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-primary-700 mb-2">ii. Subscriber Account Management</h3>
                            <p className="text-gray-600">
                                Collected information is used solely to manage your subscription, verify identity for login, and provide access to the weekly e-version (PDF/Flipbook).
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-primary-700 mb-2">iii. Data Protection & Sharing</h3>
                            <p className="text-gray-600">
                                Any information provided will be used only for the purpose for which it was intended. We do not sell, share, or disclose subscriber data to third parties unless required by law.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-primary-700 mb-2">iv. Payment Security</h3>
                            <p className="text-gray-600">
                                All financial transactions are processed through the secure Bharatkosh (Govt. of India) gateway. Employment News does not store sensitive payment credentials like credit/debit card numbers or net banking passwords on its servers.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-primary-700 mb-2">v. Technical Logs</h3>
                            <p className="text-gray-600">
                                We gather non-identifiable technical information (such as IP addresses, browser types, and visit times) solely for statistical analysis to improve website performance and monitor security.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
}
