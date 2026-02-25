
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
                <div className="bg-white rounded-xl shadow-lg border border-primary-100 p-8 md:p-12 space-y-12">

                    <div>
                        <h2 className="text-2xl font-bold text-primary-800 mb-2">Privacy policy (clause 5.3.3)</h2>
                    </div>

                    <div className="space-y-10 text-gray-700 leading-relaxed text-justify">
                        <p>
                            Employment News website does not automatically capture any specific personal information from you (like name, phone number or e-mail address), that allows us to identify you individually. If you choose to provide us with your personal information, like names or addresses, when you visit our website, we use it only to fulfil your request for information. To use certain sections of this website, user registration may be required or may not be required, depending on the section.
                        </p>

                        <p className="font-bold border-l-4 border-primary-400 pl-6 bg-primary-50/30 py-4">
                            We do not sell or share any personally identifiable information volunteered on this site to any third party (public/private). Any information provided to this website will be protected from loss, misuse, unauthorized access or disclosure, alteration, or destruction.
                        </p>

                        <p>
                            We gather certain information about the User, such as Internet protocol (IP) address, domain name, browser type, operating system, the date and time of the visit and the pages visited. We make no attempt to link these addresses with the identity of individuals visiting our site unless an attempt to damage the site has been detected.
                        </p>

                        <div className="pt-8 space-y-6">
                            <h3 className="text-xl font-bold text-gray-800 underline decoration-primary-300 underline-offset-8">
                                • Use of Cookies:
                            </h3>
                            <p>
                                A cookie is a piece of software code that an internet web site sends to your browser when you access information at that site. A cookie is stored as a simple text file on your computer or mobile device by a website’s server and only that server will be able to retrieve or read the contents of that cookie. Cookies let you navigate between pages efficiently as they store your preferences, and generally improve your experience of a website.
                            </p>

                            <div className="bg-gray-50/50 p-6 md:p-8 rounded-lg border border-gray-100">
                                <p className="font-bold mb-4 text-gray-900 italic">We are using the following types of cookies on our site:</p>
                                <ul className="space-y-4 list-disc pl-5 font-medium">
                                    <li><strong>Analytics cookies:</strong> for anonymously remembering your computer or mobile device when you visit our website to keep track of browsing patterns.</li>
                                    <li><strong>Service cookies:</strong> for helping us to make our website work efficiently, remembering your registration and login details, settings preferences, and keeping track of the pages you view.</li>
                                    <li><strong>Non-persistent cookies a.k.a per-session cookies:</strong> Per-session cookies serve technical purposes, like providing seamless navigation through this website. These cookies do not collect personal information on users and they are deleted as soon as you leave our website. The cookies do not permanently record data and they are not stored on your computer’s hard drive. The cookies are stored in memory and are only available during an active browser session. Again, once you close your browser, the cookie disappears.</li>
                                </ul>
                            </div>

                            <p className="italic text-gray-500 text-sm mt-4 border-t pt-4">
                                You may note additionally that when you visit sections of Employment News website where you are prompted to log in, or which are customizable, you may be required to accept cookies. If you choose to have your browser refuse cookies, it is possible that some sections of our website may not function properly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
