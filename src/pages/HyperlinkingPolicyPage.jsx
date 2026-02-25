
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
                <div className="bg-white rounded-xl shadow-lg border border-primary-100 p-8 md:p-12 space-y-12">

                    {/* Clause Title */}
                    <div>
                        <h2 className="text-2xl font-bold text-primary-800">Hyper Linking policy (clause 5.4.4)</h2>
                    </div>

                    <div className="space-y-10">
                        {/* External Links Policy */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-800 underline decoration-primary-300 underline-offset-8">
                                • Links to external websites/portals
                            </h3>
                            <p className="text-gray-700 leading-relaxed text-justify">
                                At many places in this website Employment News website, you shall find links to other websites, portals, web applications, or mobile apps. This links have been placed for your convenience. Publications Division is not responsible for the contents and reliability of the linked websites and does not necessarily endorse the views expressed in them. Mere presence of the link or its listing on this Employment News website should not be assumed as endorsement of any kind. We cannot guarantee that these links will work all the time and we have no control over availability of linked pages. The website hyperlinks policy will be reviewed on yearly basis.
                            </p>
                        </div>

                        {/* Internal Links Policy */}
                        <div className="space-y-4 pt-4 border-t border-gray-50">
                            <h3 className="text-xl font-bold text-gray-800 underline decoration-primary-300 underline-offset-8">
                                • Links to Employment News website by other websites
                            </h3>
                            <p className="text-gray-700 leading-relaxed text-justify">
                                We do not object to you linking directly to the information that is hosted on this Employment News website and no prior permission is required for the same. However, we would like you to inform us about any links provided to this Employment News website so that you can be informed of any changes or updates in that. Also, we do not permit our pages to be loaded into frames on your site. The pages belonging to this Employment News website must load into a newly opened browser window of the User.
                            </p>
                        </div>

                        {/* External Links Table */}
                        <div className="pt-8">
                            <h3 className="text-lg font-bold text-primary-700 mb-6 flex items-center gap-2 italic">
                                These are following external links available on Employment News website:
                            </h3>
                            <div className="overflow-hidden rounded-lg border border-gray-200">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-4 font-bold text-gray-700">S. No.</th>
                                            <th className="px-6 py-4 font-bold text-gray-700">External Links</th>
                                            <th className="px-6 py-4 font-bold text-gray-700">Website URL</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {externalLinks.map((link) => (
                                            <tr key={link.id} className="hover:bg-primary-50/30 transition-colors">
                                                <td className="px-6 py-4 text-gray-500">{link.id}</td>
                                                <td className="px-6 py-4 font-medium text-gray-800">{link.name}</td>
                                                <td className="px-6 py-4">
                                                    <a
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary-600 hover:text-primary-800 hover:underline break-all"
                                                    >
                                                        {link.url}
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
