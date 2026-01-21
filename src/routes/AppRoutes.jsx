import ArchivePage from "../pages/ArchivePage";
import SalesPointsPage from "../pages/SalesPointsPage";

import { Routes, Route } from "react-router-dom";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import HomePage from "../pages/HomePage";
import Layout from "../components/Layout";
import EEmploymentNewsSubscription from "../pages/EEmploymentNewsSubscription";
import PrintEmploymentNewsSubscription from "../pages/PrintEmploymentNewsSubscription";
import AdvertisementPage from "../pages/AdvertisementPage";
import RTIPage from "../pages/RTIPage";
import GrievanceForm from "../pages/GrievanceForm";
import EditorialList from "../pages/EditorialList";
import ArticleDetail from "../pages/ArticleDetail";
import AllarchivePage from "../pages/AllarchivePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="e-employment-news-subscription" element={<EEmploymentNewsSubscription />} />
        <Route path="print-employment-news-subscription" element={<PrintEmploymentNewsSubscription />} />
        <Route path="advertisements" element={<AdvertisementPage />} />
        <Route path="rti" element={<RTIPage />} />
        <Route path="grievance" element={<GrievanceForm />} />
        <Route path="article/:id" element={<ArticleDetail />} />
        <Route path="archive" element={<ArchivePage />} />
        <Route path="sales-points" element={<SalesPointsPage />} />
        <Route path="editorial-list" element={<EditorialList />} />
        <Route path="archives" element={<AllarchivePage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
