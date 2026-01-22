
import React, { useEffect, useState } from "react";
import { getPosts } from "../utils/networkApi";
import Translate from "../components/Translate";
import Loader from "../components/Loader";




export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [help, setHelp] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const savedLang = await localStorage.getItem("appLang") || "en";
        const response = await getPosts(`contacts?lang=${savedLang}`)
        setLoading(false);
        setContacts(response.data)
        setHelp(response.help)
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [])
  return (
    <section className="w-full min-h-[80vh] bg-primary-50 py-10 px-4 sm:px-6 md:px-8">
      {loading && <Loader />}
      <div className="w-full max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-600 mb-8 text-center"><Translate text={'contact-us'} /></h1>

        <div className="bg-white rounded-xl shadow-md border border-primary-100 p-6 mb-2 flex flex-col gap-3 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-primary-600 mb-2 text-left border-l-4 border-primary-400 pl-2">Help Desk</h2>

          <div className="mb-2 text-left">
            <div className="font-bold text-primary-700"></div>
            <div className="text-primary-700 text-sm mb-1"></div>
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