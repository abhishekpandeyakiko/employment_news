
import React, { useEffect, useState } from "react";
import { getPosts } from "../utils/networkApi";
import Translate from "../components/Translate";
import Loader from "../components/Loader";
import { HiPhone, HiEnvelope, HiMapPin, HiUser } from "react-icons/hi2";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
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

      {/* Dark & Compact Header */}
      <div className="w-full py-8 px-4 relative overflow-hidden bg-gradient-to-br from-primary-900 to-primary-800 text-white border-b border-primary-950">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
        <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 mb-4 shadow-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary-300"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Support Center</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-center mb-2">
            <Translate text={'contact-us'} />
          </h1>
          <p className="text-primary-100/70 text-xs md:text-sm font-medium max-w-lg text-center leading-relaxed italic">
            "Get in touch with us for queries, support, or feedback."
          </p>
        </div>
      </div>

      {/* Content Wrapper with 15px spacing */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-[15px]">
        {/* Help Desk Specialized Card */}
        <div className="bg-white rounded-xl shadow-md border border-primary-100 p-6 mb-2 flex flex-col gap-3 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-primary-600 mb-2 text-left border-l-4 border-primary-400 pl-2">Help Desk</h2>
          <div className="mb-2 text-left">
            <div className="text-gray-600 text-sm"><span className="font-semibold">Phone:</span> {help.phone} </div>
            <div className="text-gray-600 text-sm"><span className="font-semibold">Email:</span> {help.email}</div>
            <div className="text-gray-600 text-sm"><span className="font-semibold">Address:</span>{help.address}</div>
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
      </div>

    </section>
  );
}
