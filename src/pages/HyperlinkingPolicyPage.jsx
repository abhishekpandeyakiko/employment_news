
import React, { useEffect } from "react";
import Translate from "../components/Translate";
import { useTranslation } from "react-i18next";
import { updateMetaTags } from "../utils/seo";
import PageBanner from "../components/PageBanner";

export default function HyperlinkingPolicyPage() {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        updateMetaTags(
            `${t('hyperlinking_policy')} | ${t('site-title')}`,
            t('hyperlink-desc'),
            t('hyperlink-keywords')
        );
    }, [t, i18n.language]);

    const externalLinks = [
        { id: 1, name: "Ministry of I & B", url: "https://mib.gov.in/" },
        { id: 2, name: "Employment News website", url: "https://www.publicationsdivision.nic.in/" },
        { id: 3, name: "DPD Journals", url: "https://www.publicationsdivision.nic.in/journals/" },
        { id: 4, name: "Press Information Bureau", url: "https://pib.gov.in/indexd.aspx?reg=3&lang=2" },
        { id: 5, name: "All India Radio News", url: "https://www.newsonair.gov.in/" },
        { id: 6, name: "DD News", url: "https://ddnews.gov.in/" },
        { id: 7, name: "Central Bureau of Communication", url: "https://www.davp.nic.in/" },
        { id: 8, name: "Films Division", url: "http://filmsdivision.org/" },
        { id: 9, name: "Photo Gallery", url: "https://www.publicationsdivision.nic.in/index.php?route=page/gallery_all" },
        { id: 10, name: "Events & Highlights", url: "https://www.publicationsdivision.nic.in/index.php?route=eventsandhighlights/eventsandhighlights" },
    ];

    return (
        <section className="w-full min-h-screen bg-primary-50/30 pb-16 text-left">
            <PageBanner
                title={<Translate text={'hyperlinking_policy'} />}
                subtitle="Guidelines to Indian Govt. websites 3.0"
                badgeText="Connectivity"
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 font-sans">
                <div className="bg-white rounded-xl shadow-md border border-primary-100 p-8">
                    <h2 className="text-2xl font-bold text-center text-primary-700 mb-6 border-b pb-2">Hyperlinking Policy</h2>
                    <div className="space-y-6 text-gray-700 leading-relaxed text-left">
                        <section>
                            <h3 className="text-xl font-bold text-primary-700 mb-2">Links to External Websites</h3>
                            <p className="text-gray-600">
                                This portal includes links to other Government and non-Government websites (e.g., recruitment boards). Employment News is not responsible for the content or reliability of these external sites.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-primary-700 mb-2">Links to This Website</h3>
                            <p className="text-gray-600">
                                Prior permission is not required to link to this site. However, we do not permit our pages to be loaded into frames on your site; the pages must load into a newly opened browser window of the user.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
}
