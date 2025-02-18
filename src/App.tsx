import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
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
import { Register } from "./pages/memberportal/Register";
import Dashboard from "./pages/memberportal/PortalDashboard";
import MyPublication from "./pages/memberportal/MyPublication";
import { Approach } from "./pages/approach";
import { OurOrganization } from "./pages/OurOrganization";
import { JoinMission } from "./pages/JoinMission";
import { SupportOurCause } from "./pages/SupportOurCause";

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
        <Route path="/publication/resources" element={<Resources />} />
        <Route path="/publication/articles-&-research" element={<ArticlesAndResearch />} /> 
        <Route path="/find-specialist" element={<FindSpecialist />} />
        <Route path="/approach" element={<Approach />} />
        <Route path="/membership/login" element={<Login />} />
        <Route path="/membership/become-a-member" element={<Membership />} />
        <Route path="/membership/register" element={<Register />} />
        <Route path="/membership/member-portal" element={<Login />} />
        <Route path="/memberportal/portaldashboard" element={<Dashboard />} />
        <Route path="/memberportal/mypublication" element={<MyPublication />} />
        <Route path="/about-us/our-organization" element={<OurOrganization />} />
        <Route path="/about-us/join-our-mission" element={<JoinMission />} />
        <Route path="/about-us/support-our-cause" element={<SupportOurCause />} />
      </Routes> 
      <Footer />
    </Router>
  );
};

export default App;
