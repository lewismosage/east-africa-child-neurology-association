// src/memberportal/teleconsultation/RequestsList.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../../supabaseClient";

interface ConsultationRequest {
  id: string;
  symptoms: string;
  attached_reports: string[];
  notes: string;
  created_at: string;
  created_by: string;
}

const RequestsList: React.FC = () => {
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch consultation requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data, error } = await supabase
          .from("consultation_requests")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setRequests(data || []);
      } catch (error) {
        console.error("Error fetching consultation requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-primary">Consultation Requests</h1>
      <div className="space-y-4">
        {requests.length > 0 ? (
          requests.map((request) => (
            <Link
              key={request.id}
              to={`/memberportal/teleconsultation/request/${request.id}`}
              className="block bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-medium">Symptoms: {request.symptoms}</h2>
              <p className="text-sm text-gray-600">Attached Reports: {request.attached_reports.join(", ")}</p>
              <p className="text-sm text-gray-500 mt-2">
                Created on: {new Date(request.created_at).toLocaleDateString()}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-600">No consultation requests found.</p>
        )}
      </div>
    </div>
  );
};

export default RequestsList;