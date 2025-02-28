// src/memberportal/teleconsultation/Request.js
import React from "react";
import { useParams } from "react-router-dom";

const Request = () => {
  const { id } = useParams();
  // Fetch request details using the `id` from the backend
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Consultation Request</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p>Symptoms: Headache, dizziness</p>
        <p>Attached Reports: MRI, EEG</p>
        <div className="mt-4">
          <h3 className="font-medium">Notes</h3>
          <p>Dr. Smith: Consider MRI for further evaluation.</p>
        </div>
      </div>
    </div>
  );
};

export default Request;