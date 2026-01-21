import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCalendar, FaUser, FaTag } from "react-icons/fa";
import { getPosts } from "../utils/networkApi";
import Loader from "../components/Loader";

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const [articles,setData]=useState([]);
    useEffect(()=>{
         async function fetchData() {
         try {
           setLoading(true);
           const savedLang =await localStorage.getItem("appLang") || "en";
           const response = await getPosts(`article-detail-api?lang=${savedLang}&id=${id}`)
           console.log(response.data)
           setLoading(false);
           setData(response.data)
         } catch (error) {
            setLoading(false);
           console.error('Error fetching data:', error);
         }
       }
   
       fetchData();
   },[])
 


  return (
    <section className="w-full min-h-[80vh] bg-primary-50 py-8 px-4 sm:px-6 md:px-8">
      {loading&&<Loader />}
      <div className="w-full max-w-5xl mx-auto">

        
          <h4 className="text-[22px] mt-6 font-bold text-left text-gray-900 mb-4 leading-tight">
            {articles.title}
          </h4>  
          <div className="flex flex-wrap gap-4 md:gap-6 text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <FaCalendar className="text-primary-500" />
              <span>{articles.issue_no}</span>
            </div>
         
          </div>  
               
          <img src={articles.image} alt={articles.title}
            className="mx-auto rounded-2xl shadow-md w-full h-auto" />


       <div className="flex flex-wrap gap-4 md:gap-6 text-gray-600 mb-8 pb-6 border-b border-gray-200"></div>
        
        <div className="prose text-justify prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: articles.detail }} style={{ fontSize: "0.9rem", lineHeight: "1.8", color: "#374151", }} />
       
      </div>
    </section>
  );
};

export default ArticleDetail;

