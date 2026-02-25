
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

    // Helper for highlighted data
    const Highlight = ({ children, isPlaceholder }) => (
        <span className={`${isPlaceholder ? 'bg-yellow-100 text-yellow-800' : 'bg-primary-50 text-primary-800'} px-1.5 py-0.5 rounded font-bold border ${isPlaceholder ? 'border-yellow-200' : 'border-primary-100 italic'}`}>
            {children}
        </span>
    );

    const securityPoints = [
        <>The office of Publications Division has been placed in protected zones with implementation of firewalls and IDS (Intrusion Detection System) and high availability solutions.</>,
        <>Before launch of the Employment News website, simulated penetration tests have been conducted. Penetration testing has also been conducted <Highlight isPlaceholder>{'<x times>'}</Highlight> after the launch of the Employment News website.</>,
        <>Employment News website has been audited for known application level vulnerabilities before the launch and all the known vulnerability has been addressed.</>,
        <>Hardening of servers has been done as per the guideline of Cyber Security division before the launch of the Employment News website.</>,
        <>Access to web servers hosting the Employment News website is restricted both physically and through the network as far as possible.</>,
        <>Logs at <Highlight isPlaceholder>{'<x number>'}</Highlight> different locations are maintained for authorized physical access of Employment News website servers.</>,
        <>Web-servers hosting the Employment News website are configured behind IDS, IPS (Intrusion Prevention System) and with system firewalls on them.</>,
        <>All the development work is done in a separate development environment and is well tested on the staging server before updating it on the production server.</>,
        <>After testing properly on the staging server, the applications are uploaded to the production server using SSH and VPN through a single point.</>,
        <>The content contributed by/from remote locations is duly authenticated & is not published on the production server directly. Any content contributed has to go through the moderation process before final publishing to the production server.</>,
        <>All contents of the web pages are checked for intentional or unintentional malicious content before final upload to web server pages.</>,
        <>Audit and Log of all activities involving the operating system, access to the system, and access to applications are maintained and archived. All rejected accesses and services are logged and listed in exception reports for further scrutiny.</>,
        <>Help Desk staff at the <Highlight>{'IT Team'}</Highlight> monitor the Employment News website at intervals of <Highlight>{'3 months'}</Highlight> to check the web pages to confirm that the web pages are up and running, that no unauthorized changes have been made, and that no unauthorized links have been established.</>,
        <>All newly released system software patches; bug fixes and upgrades are expediently and regularly reviewed and installed on the web server.</>,
        <>On Production web servers, Internet browsing, mail and any other desktop applications are disabled. Only server administration related tasks are performed.</>,
        <>Server passwords are changed at the interval of <Highlight isPlaceholder>{'<x number>'}</Highlight> months and are shared by <Highlight isPlaceholder>{'<y number>'}</Highlight> persons <Highlight isPlaceholder>{'<a name>'}</Highlight> and <Highlight isPlaceholder>{'<b name>'}</Highlight>.</>,
        <>
            <Highlight>{'Sheekha Baraily'}</Highlight> and <Highlight>{'Abhishek Chaturvedi'}</Highlight> have been designated as Administrator for the Employment News website and shall be responsible for implementing this policy for each of the web servers. The administrator shall also coordinate with the Audit Team for required auditing of the server(s).
        </>,
        <>Employment News website has been re-audited for the application level vulnerability after major modification in application development [Not applicable at first launch].</>,
        <>The Employment News website has been audited before launch and has complied with all the points mentioned in the policies document of the Cyber Security Group mentioned above.</>,
        <>Employment News website has also been subjected to an automated risk assessment performed through vulnerability identification software before and after the launch and all the known vulnerabilities have been addressed.</>
    ];

    return (
        <section className="w-full min-h-screen bg-primary-50/30 pb-16 text-left">
            <PageBanner
                title={<Translate text={'security_policy'} />}
                subtitle="Guidelines for Indian Government Websites 3.0"
                badgeText="Standard"
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 bg-white rounded-xl shadow-lg border border-primary-100 p-8 md:p-12 space-y-10">
                <div>
                    <h2 className="text-2xl font-bold text-primary-800">7. Security policy (clause 7.7.2)</h2>
                </div>

                <div className="space-y-6 text-gray-700 leading-relaxed text-justify">
                    <ul className="space-y-4">
                        {securityPoints.map((point, index) => (
                            <li key={index} className="flex gap-3">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-600 shrink-0"></span>
                                <div>{point}</div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100 text-xs text-gray-400 italic">
                    Note: Values in yellow highlight indicate data points to be finalized by the technical team.
                </div>
            </div>
        </section>
    );
}
