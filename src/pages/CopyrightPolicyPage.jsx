
import React, { useEffect } from "react";
import Translate from "../components/Translate";
import { useTranslation } from "react-i18next";
import { updateMetaTags } from "../utils/seo";
import PageBanner from "../components/PageBanner";

export default function CopyrightPolicyPage() {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        updateMetaTags(
            `${t('copyright_policy')} | ${t('site-title')}`,
            t('copyright-desc'),
            t('copyright-keywords')
        );
    }, [t, i18n.language]);

    return (
        <section className="w-full min-h-screen bg-primary-50/30 pb-16 text-left">
            <PageBanner
                title={<Translate text={'copyright_policy'} />}
                subtitle="Guidelines to Indian Govt. websites 3.0"
                badgeText="Standard"
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="bg-white rounded-xl shadow-md border border-primary-100 p-8">
                    <h2 className="text-2xl font-bold text-center text-primary-700 mb-6 border-b pb-2">Copyright Policy</h2>
                    <div className="space-y-8 text-gray-700 leading-relaxed text-left">
                        <section>
                            <p className="text-gray-600">
                                The content published on the Employment News website, including text, images, design, layout, and the weekly publication in PDF or flipbook format, is the property of Publications Division, Ministry of Information and Broadcasting, Government of India, unless otherwise stated.
                            </p>
                        </section>

                        <section>
                            <p className="text-gray-600">
                                No part of the content available on this website may be reproduced, distributed, transmitted, or stored in any form without prior permission from the Publications Division.
                            </p>
                        </section>

                        <section>
                            <p className="text-gray-600">
                                Limited reproduction of material for personal and non-commercial use may be permitted provided that the source is clearly acknowledged and the content is not modified or used in a misleading context.
                            </p>
                        </section>

                        <section>
                            <p className="text-gray-600">
                                Any unauthorized use, reproduction, or commercial distribution of the content may lead to appropriate legal action under applicable copyright laws.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
}
