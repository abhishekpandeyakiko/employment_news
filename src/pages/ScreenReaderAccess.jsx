import React from 'react';
import { useTranslation } from 'react-i18next';

const ScreenReaderAccess = () => {
    const { t } = useTranslation();

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
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-primary-800 mb-6">
                {t('screen_reader')}
            </h1>

            <div className="prose prose-blue max-w-none">
                <p className="text-lg text-gray-700 mb-6">
                    The Employment News website complies with World Wide Web Consortium (W3C) Web Content Accessibility Guidelines (WCAG) 2.0 level AA. This will enable people with visual impairments access the website using assistive technologies, such as screen readers. The information of the website is accessible with different screen readers, such as JAWS, NVDA, SA, SuperNova and Window-Eyes.
                </p>

                <p className="text-lg text-gray-700 mb-6">
                    Following table lists the information about different screen readers:
                </p>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-primary-50">
                            <tr>
                                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-primary-700 uppercase tracking-wider">Screen Reader</th>
                                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-primary-700 uppercase tracking-wider">Website</th>
                                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-primary-700 uppercase tracking-wider">Free / Commercial</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {screenReaders.map((reader, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reader.name}</td>
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
    );
};

export default ScreenReaderAccess;
