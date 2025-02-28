import React from "react";
import { Link } from "react-router-dom";
import { FaNotesMedical, FaPaperPlane, FaUserMd, FaVideo, FaFileMedical, FaHistory } from "react-icons/fa"; // Icons for styling

const TeleconsultationMain = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl text-center font-bold mb-2 text-primary">
        Teleconsultation & Referral Network
      </h1>

      <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto">
        Seamlessly connect with specialists, manage consultation requests, and collaborate on patient cases through secure video calls and shared medical records.
      </p>

      {/* First Row */}
      <div className="flex justify-center gap-4 flex-wrap max-w-4xl mx-auto">
        {/* View Consultation Requests */}
        <Link
          to="/memberportal/teleconsultation/requests"
          className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow transition hover:shadow-md w-64"
        >
          <FaNotesMedical className="text-blue-600 text-2xl" />
          <span className="text-gray-900 font-medium">
            View Consultation Requests
          </span>
        </Link>

        {/* Send a New Request */}
        <Link
          to="/memberportal/teleconsultation/new-request"
          className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow transition hover:shadow-md w-64"
        >
          <FaPaperPlane className="text-blue-600 text-2xl" />
          <span className="text-gray-900 font-medium">Send a New Request</span>
        </Link>

        {/* Find a Specialist */}
        <Link
          to="/find-specialist"
          className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow transition hover:shadow-md w-64"
        >
          <FaUserMd className="text-blue-600 text-2xl" />
          <span className="text-gray-900 font-medium">Find a Specialist</span>
        </Link>
      </div>

      {/* Second Row */}
      <div className="flex justify-center gap-4 mt-4 flex-wrap max-w-4xl mx-auto">
        {/* Real-time Video Consultations */}
        <Link
          to="/memberportal/teleconsultation/video-consultations"
          className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow transition hover:shadow-md w-64"
        >
          <FaVideo className="text-blue-600 text-2xl" />
          <span className="text-gray-900 font-medium">
            Real-time Video Consultations
          </span>
        </Link>

        {/* Medical Records & Case Sharing */}
        <Link
          to="/memberportal/teleconsultation/medical-records"
          className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow transition hover:shadow-md w-64"
        >
          <FaFileMedical className="text-blue-600 text-2xl" />
          <span className="text-gray-900 font-medium">
            Medical Records & Case Sharing
          </span>
        </Link>

        {/* Follow-up & Case Tracking */}
        <Link
          to="/memberportal/teleconsultation/follow-ups"
          className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow transition hover:shadow-md w-64"
        >
          <FaHistory className="text-blue-600 text-2xl" />
          <span className="text-gray-900 font-medium">
            Follow-up & Case Tracking
          </span>
        </Link>
      </div>
    </div>
  );
};

export default TeleconsultationMain;
