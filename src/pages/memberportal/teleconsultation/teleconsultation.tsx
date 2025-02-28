// src/memberportal/teleconsultation/TeleconsultationMain.js
import React from "react";
import { Link } from "react-router-dom";

const TeleconsultationMain = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Teleconsultation & Referral Network</h1>
      <div className="space-y-4">
        <Link to="/memberportal/teleconsultation/requests" className="block text-blue-600 hover:text-blue-800">
          View Consultation Requests
        </Link>
        <Link to="/memberportal/teleconsultation/new-request" className="block text-blue-600 hover:text-blue-800">
          Send a New Request
        </Link>
      </div>
    </div>
  );
};

export default TeleconsultationMain;