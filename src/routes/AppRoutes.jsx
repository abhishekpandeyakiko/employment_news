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
import ScreenReaderAccess from "../pages/ScreenReaderAccess";
import AnnouncementsPage from "../pages/AnnouncementsPage";
import Sitemap from "../pages/Sitemap";
import HelpPage from "../pages/HelpPage";
import FeedbackPage from "../pages/FeedbackPage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import HyperlinkingPolicyPage from "../pages/HyperlinkingPolicyPage";
import CopyrightPolicyPage from "../pages/CopyrightPolicyPage";
import TermsConditionsPage from "../pages/TermsConditionsPage";
import CMAPPage from "../pages/CMAPPage";
import SecurityPolicyPage from "../pages/SecurityPolicyPage";
import WebInformationManagerPage from "../pages/WebInformationManagerPage";

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
        <Route path="screen-reader-access" element={<ScreenReaderAccess />} />
        <Route path="all-announcements" element={<AnnouncementsPage />} />
        <Route path="sitemap" element={<Sitemap />} />
        <Route path="help" element={<HelpPage />} />
        <Route path="feedback" element={<FeedbackPage />} />
        <Route path="policies/privacy" element={<PrivacyPolicyPage />} />
        <Route path="policies/hyperlinking" element={<HyperlinkingPolicyPage />} />
        <Route path="policies/copyright" element={<CopyrightPolicyPage />} />
        <Route path="policies/terms" element={<TermsConditionsPage />} />
        <Route path="policies/cmap" element={<CMAPPage />} />
        <Route path="policies/security" element={<SecurityPolicyPage />} />
        <Route path="web-information-manager" element={<WebInformationManagerPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
