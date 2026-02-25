import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { updateMetaTags } from '../utils/seo';
import PageBanner from '../components/PageBanner';

const ScreenReaderAccess = () => {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        updateMetaTags(
            `${t('screen_reader')} | ${t('site-title')}`,
            t('screen-reader-desc'),
            t('screen-reader-keywords')
        );
    }, [t, i18n.language]);

    const screenReaders = [
        {
            name: "Non Visual Desktop Access (NVDA)",
            website: "http://www.nvda-project.org/",
            type: "Free",
        },
        {
            name: "JAWS",
            website: "http://www.freedomscientific.com/jaws-hq.asp",
            type: "Commercial",
        },
        {
            name: "SuperNova",
            website: "http://www.yourdolphin.co.uk/productdetail.asp?id=1",
            type: "Commercial",
        },
        {
            name: "Window-Eyes",
            website: "http://www.gwmicro.com/Window-Eyes/",
            type: "Commercial",
        },
        {
            name: "Hal",
            website: "http://www.yourdolphin.co.uk/productdetail.asp?id=5",
            type: "Commercial",
        },
        {
            name: "System Access To Go",
            website: "http://www.satogo.com/",
            type: "Free",
        }
    ];

    return (
        <section className="w-full min-h-screen bg-gray-50 pb-16">
            <PageBanner
                title={t('screen_reader')}
                subtitle={'"Information on assistive technologies for enhanced website accessibility."'}
                badgeText="Accessibility Support"
            />
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">

                <div className="prose prose-blue max-w-none">
                    <p className="text-lg text-gray-700 mb-6">
                        The Employment News website complies with World Wide Web Consortium (W3C) Web Content Accessibility Guidelines (WCAG) 2.0 level AA. This will enable people with visual impairments access the website using assistive technologies, such as screen readers. The information of the website is accessible with different screen readers, such as JAWS, NVDA, SA, SuperNova and Window-Eyes.
                    </p>

                    <p className="text-lg text-gray-700 mb-6">
                        Following table lists the information about different screen readers:
                    </p>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <caption className="sr-only">List of available Screen Readers and their details</caption>
                            <thead className="bg-primary-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-primary-700 uppercase tracking-wider">Screen Reader</th>
                                    <th scope="col" className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-primary-700 uppercase tracking-wider">Website</th>
                                    <th scope="col" className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-primary-700 uppercase tracking-wider">Free / Commercial</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {screenReaders.map((reader, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <th scope="row" className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-left">{reader.name}</th>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                            <a href={reader.website} target="_blank" rel="noopener noreferrer" className="hover:underline italic">
                                                {reader.website}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reader.type}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};



export default ScreenReaderAccess;
