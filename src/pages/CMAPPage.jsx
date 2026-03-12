
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
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-[15px]">
                <div className="bg-white rounded-xl shadow-md border border-primary-100 p-8">
                    <h2 className="text-2xl text-center font-bold text-primary-700 mb-6 border-b pb-2">CMAP (Content Management & Archival Policy)</h2>
                    <div className="space-y-6 text-gray-700 leading-relaxed text-left">
                        <section>
                            <p className="text-gray-600 font-medium">
                                All content published on the Employment News website, including job headlines and the weekly digital edition, is verified and approved by authorized officials before being uploaded to the subscription portal. The website uses a robust Content Management System (CMS) to manage and publish content efficiently.
                            </p>
                        </section>

                        <section>
                            <p className="text-gray-600">
                                The website is updated regularly, and the weekly Employment News edition is uploaded every Friday for subscribed users. Outdated or time-sensitive content is reviewed periodically and archived in accordance with the website’s archival policy.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
}
