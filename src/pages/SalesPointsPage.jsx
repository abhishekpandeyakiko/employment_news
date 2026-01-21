import React, { useEffect, useState } from "react";
import Translate from "../components/Translate";
import { getPosts } from "../utils/networkApi";
import Loader from "../components/Loader";

export default function SalesPointsPage() {

    const [loading, setLoading] = useState(false);
    const [data,setData]=useState([]);
    const [otherPdf,setOtherPdf]=useState([]);
    useEffect(()=>{
        async function fetchData() {
        try {
          setLoading(true);
          const savedLang =await localStorage.getItem("appLang") || "en";
          const response = await getPosts(`sales-point-get?lang=${savedLang}`)
          setLoading(false);
          setData(response.data)
          setOtherPdf(response.otherPdf);
        } catch (error) {
           setLoading(false);
          console.error('Error fetching data:', error);
        }
      }
  
      fetchData();
  },[])

  return (
      <section className="w-full min-h-[80vh] bg-primary-50 py-8 px-4 sm:px-6 md:px-8">
        {loading&&<Loader/>}
      <div className="w-full max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-600 mb-4 text-center"><Translate text={'sales-points'} /></h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* data box */}
          {data.map((item,index)=>(
          <div key={index} className="bg-white rounded-xl shadow-md border border-primary-100 p-6 mb-2 flex flex-col gap-3 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-primary-600 mb-2 text-left border-l-4 border-primary-400 pl-2">{item.state_name}</h2>
            <div className="mb-2 text-left">
              <div className="text-gray-600 text-sm">
                <span className="font-semibold">Pin No:</span> {item.pincode_no}
              </div>
              <div className="text-gray-600 text-sm">
                <span className="font-semibold">Phone:</span>{item.phone}
              </div>
              <div className="text-gray-600 text-sm">
                <span className="font-semibold">Address: {item.address} </span>
              </div>
            </div>
          </div>
          ))}

         

        </div>
        <div class="bg-white rounded-xl shadow-md border border-primary-100 p-6 mb-2 mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:shadow-lg transition">

  <h2 class="text-xl font-semibold text-primary-600 border-l-4 border-primary-400 pl-2 text-left">
    <Translate text="otherSellers" />
  </h2>


  <div class="w-full sm:w-auto flex sm:items-center sm:justify-end">
    <a href={otherPdf}  target="_blank" class="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary-600 text-white font-medium shadow hover:bg-primary-700 transition" aria-label="Download PDF for New Delhi"
    >
      <Translate text="viewPDF" />
    </a>
  </div>
</div>
      </div>

    </section>
  );
}
