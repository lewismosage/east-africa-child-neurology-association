// src/memberportal/teleconsultation/RequestDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../../supabaseClient";

interface ConsultationRequest {
  id: string;
  symptoms: string;
  attached_reports: string[];
  notes: string;
  created_at: string;
  created_by: string;
}

const RequestDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [request, setRequest] = useState<ConsultationRequest | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch consultation request details
  useEffect(() => {
    if (!id) return;

    const fetchRequest = async () => {
      try {
        const { data, error } = await supabase
          .from("consultation_requests")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setRequest(data);
      } catch (error) {
        console.error("Error fetching consultation request:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [id]);

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (!request) {
    return <div className="text-center py-6">Consultation request not found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Consultation Request</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium">Symptoms</h2>
        <p className="text-sm text-gray-600">{request.symptoms}</p>

        <h2 className="text-lg font-medium mt-4">Attached Reports</h2>
        <ul className="list-disc list-inside text-sm text-gray-600">
          {request.attached_reports.map((report, index) => (
            <li key={index}>{report}</li>
          ))}
        </ul>

        <h2 className="text-lg font-medium mt-4">Notes</h2>
        <p className="text-sm text-gray-600">{request.notes}</p>

        <p className="text-sm text-gray-500 mt-4">
          Created on: {new Date(request.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default RequestDetails;