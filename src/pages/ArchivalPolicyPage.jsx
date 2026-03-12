import React, { useEffect } from "react";
import Translate from "../components/Translate";
import { useTranslation } from "react-i18next";
import { updateMetaTags } from "../utils/seo";
import PageBanner from "../components/PageBanner";

export default function ArchivalPolicyPage() {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        updateMetaTags(
            `${t('archival_policy')} | ${t('site-title')}`,
            t('archival-desc'),
            t('archival-keywords')
        );
    }, [t, i18n.language]);

    return (
        <section className="w-full min-h-screen bg-primary-50/30 pb-16 text-left">
            <PageBanner
                title={<Translate text={'archival_policy'} />}
                subtitle="Guidelines to Indian Govt. websites 3.0"
                badgeText="Standard"
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="bg-white rounded-xl shadow-md border border-primary-100 p-8">
                    <h2 className="text-2xl font-bold text-center text-primary-700 mb-6 border-b pb-2">Archival Policy</h2>
                    <div className="space-y-6 text-gray-700 leading-relaxed text-left">
                        <section>
                            <p className="text-gray-600">
                                Subscribers are provided access to an Archive section containing past issues of Employment News. Once the closing date of a job notification has passed, the related content is moved from the “Current Issue” section to the Archive database.
                            </p>
                        </section>

                        <section>
                            <p className="text-gray-600">
                                Archived issues of the weekly Employment News publication are retained on the website for reference purposes. The archival and retention of content are managed in accordance with the administrative guidelines of the Publications Division, Ministry of Information and Broadcasting, Government of India.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
}
