import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Upcomingevents from "./pages/UpcomingEvents";
import Trainingevents from "./pages/TrainingEvents";
import { Resources } from "./pages/Resources";
import ArticlesAndResearch from "./pages/Articles&Research";
import CallForAbstracts from "./pages/CallForAbstracts";
import { Contact } from "./pages/Contact";
import FindSpecialist from "./pages/FindSpecialist";
import { Login } from "./pages/memberportal/Login";
import { Membership } from "./pages/memberportal/Membership";
import { RegisterForm } from "./pages/memberportal/RegisterForm";
import Dashboard from "./pages/memberportal/PortalDashboard";
import MyPublication from "./pages/memberportal/MyPublication";
import { Approach } from "./pages/approach";
import { OurOrganization } from "./pages/OurOrganization";
import { JoinMission } from "./pages/JoinMission";
import { SupportOurCause } from "./pages/SupportOurCause";
import { Leadership } from "./pages/Leadership";
import AccountManagement from "./pages/memberportal/AccountManagement";
import PaymentProcessing from "./pages/memberportal/PaymentProcessing";
import { AdminLayout } from './pages/admin/AdminLayout';
import { ManageResources } from './pages/admin/ManageResources';
import { ManageEvents } from './pages/admin/ManageEvents';
import { RequireAuth } from './components/admin/RequireAuth';
import { AdminLogin } from './pages/admin/AdminLogin';
import PaymentVerification from "./pages/admin/PaymentVerification";
import EACNAPolicies from './pages/EACNAPolicies';
import  RenewalAndUpgrades from './pages/RenewalAndUpgrades';
import FAQs from './pages/FAQs';
import NewsAndNewsletters from './pages/NewsAndNewsletters';
import { NationalPolicies } from './pages/NationalPolicies';
import  { InternationalGuidelines } from './pages/InternationalGuidelines';
import { MedicalPracticeRegulations } from './pages/MedicalPracticeRegulations';
import { LegislativeNews } from './pages/LegislativeNews';
import PaymentPage from './pages/memberportal/PaymentPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/events/upcoming-events" element={<Upcomingevents />} />
        <Route path="/events/training-events" element={<Trainingevents />} />
        <Route path="/events/call-for-abstracts" element={<CallForAbstracts />} />
        <Route path="/publication/healthcare-policies-&-guidelines" element={<Resources />} />
        <Route path="publication/research-&-publications" element={<ArticlesAndResearch />} /> 
        <Route path="/find-specialist" element={<FindSpecialist />} />
        <Route path="/approach" element={<Approach />} />
        <Route path="/login" element={<Login />} />
        <Route path="/membership/login" element={<Login />} />
        <Route path="/membership/become-a-member" element={<Membership />} />
        <Route path="/memberportal/register-form" element={<RegisterForm />} />
        <Route path="/membership/member-portal" element={<Login />} />
        <Route path="/memberportal/portaldashboard" element={<Dashboard />} />
        <Route path="/memberportal/mypublication" element={<MyPublication />} />
        <Route path="/about-us/our-leadership-team" element={<Leadership />} />
        <Route path="/about-us/our-organization" element={<OurOrganization />} />
        <Route path="/about-us/join-our-mission" element={<JoinMission />} />
        <Route path="/about-us/support-our-cause" element={<SupportOurCause />} />
        <Route path="/memberportal/account-management" element={<AccountManagement />} />
        <Route path="/memberportal/payment-processing" element={<PaymentProcessing />} />
        <Route path="/membership/eacna-membership-&-policies" element={<EACNAPolicies />} />
        <Route path="/membership/renewal-&-upgrade" element={<RenewalAndUpgrades />} />
        <Route path="/media-center/faqs" element={<FAQs />} />
        <Route path="media-center/news-and-newsletters" element={<NewsAndNewsletters />} />
        <Route path="/national-policies" element={<NationalPolicies />} />
        <Route path="/international-guidelines" element={<InternationalGuidelines />} />
        <Route path="/medical-practice-regulations" element={<MedicalPracticeRegulations />} />
        <Route path="/legislative-news" element={<LegislativeNews />} />
        <Route path="/memberportal/payment-page" element={<PaymentPage />} />

         {/* Admin Login Page */}
         <Route path="/admin/login" element={<AdminLogin />} />

        {/* Redirect "/admin" to "/admin/login" if not authenticated */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route path="resources" element={<ManageResources />} />
          <Route path="events" element={<ManageEvents />} />
          <Route path="payment-verification" element={<PaymentVerification />} />
          </Route>
      </Routes> 
      <Footer />
    </Router>
  );
};

export default App;
