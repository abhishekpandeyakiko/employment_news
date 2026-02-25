
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
                <div className="bg-white rounded-xl shadow-lg border border-primary-100 p-8 md:p-12 space-y-12">


                    <div className="space-y-10">
                        {/* 1. Copyright policy Section */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-primary-700 flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-primary-600 rounded-full"></span>
                                Copyright policy (clause 5.1.4)
                            </h3>

                            {/* Moderate */}
                            <div className="pl-5 border-l-2 border-gray-100">
                                <h4 className="font-bold text-gray-800 mb-2 underline decoration-primary-300 underline-offset-4 decoration-2">
                                    • Copyright policy - Moderate
                                </h4>
                                <p className="text-gray-700 leading-relaxed text-justify">
                                    Material featured on this Employment News website may be reproduced free of charge after taking proper permission by sending a mail to us. However, the material has to be reproduced accurately and not to be used in a derogatory manner or in a misleading context. Wherever the material is being published or issued to others, the source must be prominently acknowledged. However, the permission to reproduce this material shall not extend to any material which is identified as being copyright of a third party. Authorization to reproduce such material must be obtained from the departments/copyright holders concerned.
                                </p>
                            </div>

                            {/* Conservative */}
                            <div className="pl-5 border-l-2 border-gray-100">
                                <h4 className="font-bold text-gray-800 mb-2 underline decoration-primary-300 underline-offset-4 decoration-2">
                                    • Copyright policy - Conservative
                                </h4>
                                <p className="text-gray-700 leading-relaxed text-justify mb-4">
                                    Material featured on this Employment News website portal may NOT be reproduced under any circumstances.
                                </p>
                                <p className="text-sm font-medium text-primary-700 bg-primary-50/50 p-4 rounded mt-2 border border-primary-100">
                                    These terms and conditions shall be governed by and construed according to the Indian Laws. Any dispute arising under these terms and conditions shall be subject to the exclusive jurisdiction of the courts of India.
                                </p>
                            </div>

                            {/* Liberal */}
                            <div className="pl-5 border-l-2 border-gray-100">
                                <h4 className="font-bold text-gray-800 mb-2 underline decoration-primary-300 underline-offset-4 decoration-2">
                                    • Copyright policy - Liberal
                                </h4>
                                <p className="text-gray-700 leading-relaxed text-justify">
                                    Material featured on this Employment News website may be reproduced free of charge. However, the material has to be reproduced accurately and not to be used in a derogatory manner or in a misleading context. Wherever the material is being published or issued to others, the source must be prominently acknowledged. However, the permission to reproduce this material shall not extend to any material which is identified as being copyright of a third party. Authorization to reproduce such material must be obtained from the departments/copyright holders concerned.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
