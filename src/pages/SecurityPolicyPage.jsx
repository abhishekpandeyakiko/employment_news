
import React, { useEffect } from "react";
import Translate from "../components/Translate";
import { useTranslation } from "react-i18next";
import { updateMetaTags } from "../utils/seo";
import PageBanner from "../components/PageBanner";

export default function SecurityPolicyPage() {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        updateMetaTags(
            `${t('security_policy')} | ${t('site-title')}`,
            t('security-desc'),
            t('security-keywords')
        );
    }, [t, i18n.language]);
    return (
        <section className="w-full min-h-screen bg-primary-50/30 pb-16 text-left">
            <PageBanner
                title={<Translate text={'security_policy'} />}
                subtitle="Guidelines for Indian Government Websites 3.0"
                badgeText="Standard"
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="bg-white rounded-xl shadow-md border border-primary-100 p-8">
                    <h2 className="text-2xl font-bold text-center text-primary-700 mb-6 border-b pb-2">Security Policy</h2>
                    <div className="space-y-6 text-gray-700 leading-relaxed text-left">
                        <section>
                            <p className="text-gray-600">
                                The website is Security Audited by a CERT-In empaneled agency and holds a 'Safe to Host' certificate. We employ SSL encryption for all data transfers. To protect your subscription, we implement session management and secure login protocols. Users are responsible for maintaining the confidentiality of their login IDs and passwords.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
}
