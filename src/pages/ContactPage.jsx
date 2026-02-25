
import React, { useEffect, useState } from "react";
import { getPosts } from "../utils/networkApi";
import Translate from "../components/Translate";
import Loader from "../components/Loader";
import { useTranslation } from "react-i18next";
import { updateMetaTags } from "../utils/seo";
import { HiPhone, HiEnvelope, HiMapPin, HiUser } from "react-icons/hi2";
import { Link } from "react-router-dom";
import PageBanner from "../components/PageBanner";

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    updateMetaTags(
      `${t('contact-us')} | ${t('site-title')}`,
      t('contact-desc'),
      t('contact-keywords')
    );
  }, [t, i18n.language]);
  const [contacts, setContacts] = useState([]);
  const [help, setHelp] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const savedLang = (await localStorage.getItem("appLang")) || "en";
        const response = await getPosts(`contacts?lang=${savedLang}`);
        setLoading(false);
        setContacts(response.data);
        setHelp(response.help);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <section className="w-full min-h-screen bg-primary-50/30 pb-16">
      {loading && <Loader />}

      <PageBanner
        title={<Translate text={'contact-us'} />}
        subtitle={'"We are here to help. Reach out to us for any queries or assistance."'}
        badgeText="Support Center"
      />

      {/* Content Wrapper with 15px spacing */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-[15px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Help Desk Specialized Card */}
          <div className="bg-white rounded-xl shadow-md border border-primary-100 p-6 flex flex-col gap-3 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-primary-600 mb-2 text-left border-l-4 border-primary-400 pl-2">Help Desk</h2>
            <div className="text-left space-y-2">
              <div className="text-gray-600 text-sm flex items-center gap-2"><HiPhone className="text-primary-500" /> <span className="font-semibold">Phone:</span> {help.phone} </div>
              <div className="text-gray-600 text-sm flex items-center gap-2"><HiEnvelope className="text-primary-500" /> <span className="font-semibold">Email:</span> {help.email}</div>
              <div className="text-gray-600 text-sm flex items-start gap-2"><HiMapPin className="text-primary-500 mt-1" /> <span><span className="font-semibold">Address:</span> {help.address}</span></div>
            </div>
          </div>

          {/* Web Information Manager Card */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl shadow-md p-6 flex flex-col gap-3 hover:shadow-xl transition text-white">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold mb-2 text-left border-l-4 border-white/50 pl-2">Web Information Manager</h2>
              <span className="bg-white/20 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-white/30">GIGW 3.0</span>
            </div>
            <div className="text-left space-y-2 mt-1">
              <div className="text-white/90 text-sm flex items-center gap-2"><HiUser className="text-primary-200" /> <span className="font-bold">Vikas Gulia</span> (SO)</div>
              <div className="text-white/90 text-sm flex items-center gap-2"><HiPhone className="text-primary-200" /> <span className="font-semibold">Phone:</span> 79887380884</div>
              <div className="text-white/90 text-sm flex items-center gap-2"><HiEnvelope className="text-primary-200" /> <span className="font-semibold">Email:</span> gulia.vikas006@gov.in</div>
            </div>
            <Link to="/web-information-manager" className="mt-2 text-xs font-bold uppercase tracking-widest bg-white/10 hover:bg-white/20 py-2 rounded text-center border border-white/10 transition">
              Full Responsibilities Details
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {contacts.map((section, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md border border-primary-100 p-6 mb-2 flex flex-col gap-3 hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-primary-600 mb-2 text-left border-l-4 border-primary-400 pl-2">{section.section}</h2>
              {section.people.map((person, pidx) => (
                <div key={pidx} className="mb-2 text-left">
                  <div className="font-bold text-primary-700">{person.name}</div>
                  <div className="text-primary-700 text-sm mb-1">{person.role}</div>
                  <div className="text-gray-600 text-sm"><span className="font-semibold">Phone:</span> {person.phone}</div>
                  <div className="text-gray-600 text-sm"><span className="font-semibold">Email:</span> {person.email}</div>
                  <div className="text-gray-600 text-sm"><span className="font-semibold">Room No:</span> {person.room_no}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div >

    </section >
  );
}
