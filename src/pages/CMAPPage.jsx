
import React, { useEffect } from "react";
import Translate from "../components/Translate";
import { useTranslation } from "react-i18next";
import { updateMetaTags } from "../utils/seo";
import PageBanner from "../components/PageBanner";

export default function CMAPPage() {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        updateMetaTags(
            `${t('cmap')} | ${t('site-title')}`,
            t('cmap-desc'),
            t('cmap-keywords')
        );
    }, [t, i18n.language]);

    const smallWebsiteRoles = [
        { section: "Home Page", contributor: "Vikas Gulia, gulia.vikas006@gov.in, 79887380884", moderator: "Vikas Gulia, gulia.vikas006@gov.in, 79887380884" },
        { section: "News Page", contributor: "Vikas Gulia, gulia.vikas006@gov.in, 79887380884", moderator: "Vikas Gulia, gulia.vikas006@gov.in, 79887380884" },
        { section: "Who’s who list", contributor: "Vikas Gulia, gulia.vikas006@gov.in, 79887380884", moderator: "Vikas Gulia, gulia.vikas006@gov.in, 79887380884" },
        { section: "Newsletter, Circulars, Notifications etc", contributor: "Shikha Baraily, employmentnews.editor@gmail.com, 8130414484", moderator: "Shikha Baraily, employmentnews.editor@gmail.com, 8130414484" },
        { section: "Acts, Rules", contributor: "Shikha Baraily, employmentnews.editor@gmail.com, 8130414484", moderator: "Shikha Baraily, employmentnews.editor@gmail.com, 8130414484" },
        { section: "Upload Employment PDF", contributor: "Shikha Baraily, employmentnews.editor@gmail.com, 8130414484", moderator: "Shikha Baraily, employmentnews.editor@gmail.com, 8130414484" },
        { section: "Jobs", contributor: "Shikha Baraily, employmentnews.editor@gmail.com, 8130414484", moderator: "Shikha Baraily, employmentnews.editor@gmail.com, 8130414484" },
        { section: "Tenders", contributor: "A & G Section", moderator: "A & G Section" },
    ];

    const largeWebsiteRoles = [
        { section: "Home Page", contributor: "Vikas Gulia, gulia.vikas006@gov.in, 79887380884", moderator: "Vikas Gulia, gulia.vikas006@gov.in, 79887380884", approver: "Vikas Gulia, gulia.vikas006@gov.in, 79887380884" },
        { section: "News Page", contributor: "Vikas Gulia, gulia.vikas006@gov.in, 79887380884", moderator: "Vikas Gulia, gulia.vikas006@gov.in, 79887380884", approver: "Vikas Gulia, gulia.vikas006@gov.in, 79887380884" },
        { section: "Who’s who list", contributor: "Vikas Gulia, gulia.vikas006@gov.in, 79887380884", moderator: "Vikas Gulia, gulia.vikas006@gov.in, 79887380884", approver: "Vikas Gulia, gulia.vikas006@gov.in, 79887380884" },
        { section: "Newsletter, Circulars, Notifications etc", contributor: "Shikha Baraily, employmentnews.editor@gmail.com, 8130414484", moderator: "Shikha Baraily, employmentnews.editor@gmail.com, 8130414484", approver: "Shikha Baraily, employmentnews.editor@gmail.com, 8130414484" },
        { section: "Acts, Rules", contributor: "Shikha Baraily, employmentnews.editor@gmail.com, 8130414484", moderator: "Shikha Baraily, employmentnews.editor@gmail.com, 8130414484", approver: "Shikha Baraily, employmentnews.editor@gmail.com, 8130414484" },
        { section: "Upload Employment PDF", contributor: "Shikha Baraily, employmentnews.editor@gmail.com, 8130414484", moderator: "Shikha Baraily, employmentnews.editor@gmail.com, 8130414484", approver: "Shikha Baraily, employmentnews.editor@gmail.com, 8130414484" },
        { section: "Upload Employment Flipbook", contributor: "Shikha Baraily, employmentnews.editor@gmail.com, 8130414484", moderator: "Shikha Baraily, employmentnews.editor@gmail.com, 8130414484", approver: "Shikha Baraily, employmentnews.editor@gmail.com, 8130414484" },
        { section: "Editorials, Articles", contributor: "&lt;Shikha Baraily, employmentnews.editor@gmail.com, 8130414484&gt;", moderator: "Shikha Baraily, employmentnews.editor@gmail.com, 8130414484", approver: "Shikha Baraily, employmentnews.editor@gmail.com, 8130414484" },
        { section: "New Subscriptions", contributor: "Abishek Chaturvedi, en-support@gov.in, 9210510126", moderator: "Abishek Chaturvedi, en-support@gov.in, 9210510126", approver: "Abishek Chaturvedi, en-support@gov.in, 9210510126" },
        { section: "Offline Subscriptions Payments", contributor: "Abishek Chaturvedi, en-support@gov.in, 9210510126", moderator: "Abishek Chaturvedi, en-support@gov.in, 9210510126", approver: "Abishek Chaturvedi, en-support@gov.in, 9210510126" },
        { section: "Web Advertisments", contributor: "Shikha Baraily, employmentnews.editor@gmail.com, 8130414484", moderator: "Shikha Baraily, employmentnews.editor@gmail.com, 8130414484", approver: "Shikha Baraily, employmentnews.editor@gmail.com, 8130414484" },
        { section: "Grievance", contributor: "Abishek Chaturvedi, en-support@gov.in, 9210510126", moderator: "Abishek Chaturvedi, en-support@gov.in, 9210510126", approver: "Abishek Chaturvedi, en-support@gov.in, 9210510126" },
        { section: "Jobs", contributor: "Shikha Baraily, employmentnews.editor@gmail.com, 8130414484", moderator: "Shikha Baraily, employmentnews.editor@gmail.com, 8130414484", approver: "Shikha Baraily, employmentnews.editor@gmail.com, 8130414484" },
    ];

    return (
        <section className="w-full min-h-screen bg-primary-50/30 pb-16 text-left">
            <PageBanner
                title={<Translate text={'cmap'} />}
                subtitle="Content Contribution, Moderation & Approval policy"
                badgeText="Standard"
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-left">
                <div className="bg-white rounded-xl shadow-lg border border-primary-100 p-8 md:p-12 space-y-12">

                    <div>
                        <h2 className="text-2xl font-bold text-primary-800">Content Contribution, Moderation & Approval policy (CMAP) (clause 5.4.3)</h2>
                    </div>

                    <div className="space-y-10">
                        {/* 2-Tiered Section */}
                        <div className="space-y-6 text-gray-700 leading-relaxed text-justify">
                            <h3 className="text-xl font-bold text-gray-800 underline decoration-primary-300 underline-offset-8 decoration-2">
                                • Policy Statement for 2-tiered CMAP structure (for small websites)
                            </h3>
                            <p>
                                The Office of Publications Division, Ministry of Information & Broadcasting (MIB) represents a single department where most content is contributed by a single set of sources. We hereby adopt a 2-tiered structure to implement CMAP requiring minimum 2 officials to execute the CMAP roles, viz.,
                            </p>
                            <ul className="space-y-4 list-disc pl-5 font-medium text-gray-800">
                                <li><strong>Contributor (User Admin 1):</strong> The Contributor is responsible for creating, sourcing, or uploading content for the website. Contributors typically belong to specific departments (e.g., Corporate Communications, HR, and Project Management) and are responsible for providing accurate, timely information related to their respective domains.</li>
                                <li><strong>Moderator (User Admin 2):</strong> The Moderator is responsible for reviewing and verifying the content submitted by the Contributor. The Moderator ensures that the content is accurate, relevant, and complies with the internal content policies and the Guidelines for Indian Government Websites (GIGW) before it is forwarded for approval.</li>
                                <li><strong>Approver (Master Admin):</strong> The Approver provides the final review and approval of the content. Approvers ensure that the content aligns with Publications Division overall business objectives, legal compliance, and regulatory standards. Once approved by the Master Admin, the content is published on the website.</li>
                            </ul>

                            <h4 className="font-bold text-primary-700 mt-8 mb-4 italic">Template to implement 2-tiered CMAP structure for small websites:</h4>
                            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                                <table className="w-full text-sm text-left">
                                    <thead>
                                        <tr className="bg-primary-700 text-white">
                                            <th rowSpan="2" className="px-6 py-4 font-bold uppercase tracking-wider border-r border-primary-600 w-1/4 text-center align-middle">SECTIONS</th>
                                            <th className="px-6 py-4 font-bold uppercase tracking-wider text-center" colSpan="2">ROLES</th>
                                        </tr>
                                        <tr className="bg-primary-50 text-primary-900 border-b border-primary-100">
                                            <th className="px-6 py-3 font-bold uppercase text-[11px] tracking-widest text-center border-r border-primary-100">CONTRIBUTOR</th>
                                            <th className="px-6 py-3 font-bold uppercase text-[11px] tracking-widest text-center">MODERATOR & APPROVER</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {smallWebsiteRoles.map((role, idx) => (
                                            <tr key={idx} className="hover:bg-primary-50/20 transition-colors">
                                                <td className="px-6 py-4 font-bold text-gray-800 border-r border-gray-50">{role.section}</td>
                                                <td className="px-6 py-4 text-[12px] text-gray-600 border-r border-gray-50 text-center">{role.contributor}</td>
                                                <td className="px-6 py-4 text-[12px] text-gray-600 text-center">{role.moderator}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 3-Tiered Section */}
                        <div className="space-y-6 text-gray-700 leading-relaxed text-justify pt-12 border-t-2 border-primary-50">
                            <h3 className="text-xl font-bold text-gray-800 underline decoration-primary-300 underline-offset-8 decoration-2">
                                • Policy Statement for 3-tiered CMAP structure (for large websites)
                            </h3>
                            <p>
                                The Employment News website represents a single department where most content is contributed by a single set of sources. We hereby adopt a 3-tiered structure to implement CMAP requiring minimum 3 officials to execute the CMAP roles, viz.,
                            </p>
                            <ul className="space-y-3 list-disc pl-8 font-bold text-primary-800">
                                <li>Contributor</li>
                                <li>Moderator</li>
                                <li>Approver</li>
                            </ul>

                            <h4 className="font-bold text-primary-700 mt-8 mb-4 italic">Template to implement 3-tiered CMAP structure for large websites:</h4>
                            <div className="overflow-x-auto rounded-lg border border-gray-100 shadow-sm">
                                <table className="w-full text-sm text-left">
                                    <thead>
                                        <tr className="bg-primary-800 text-white">
                                            <th rowSpan="2" className="px-6 py-4 font-bold uppercase tracking-wider border-r border-primary-700 w-1/4 text-center align-middle">SECTIONS</th>
                                            <th className="px-6 py-4 font-bold uppercase tracking-wider text-center" colSpan="3">ROLES</th>
                                        </tr>
                                        <tr className="bg-primary-50 text-primary-900 border-b border-primary-100 font-sans">
                                            <th className="px-6 py-3 font-bold uppercase text-[10px] tracking-widest text-center border-r border-primary-100">CONTRIBUTOR</th>
                                            <th className="px-6 py-3 font-bold uppercase text-[10px] tracking-widest text-center border-r border-primary-100">MODERATOR</th>
                                            <th className="px-6 py-3 font-bold uppercase text-[10px] tracking-widest text-center">APPROVER</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {largeWebsiteRoles.map((role, idx) => (
                                            <tr key={idx} className="hover:bg-primary-50/20 transition-colors">
                                                <td className="px-6 py-4 font-bold text-gray-800 border-r border-gray-50">{role.section}</td>
                                                <td className="px-6 py-4 text-[11px] text-gray-600 border-r border-gray-50 text-center">{role.contributor}</td>
                                                <td className="px-6 py-4 text-[11px] text-gray-600 border-r border-gray-50 text-center">{role.moderator}</td>
                                                <td className="px-6 py-4 text-[11px] text-gray-600 text-center">{role.approver}</td>
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
