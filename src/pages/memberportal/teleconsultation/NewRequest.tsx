// src/memberportal/teleconsultation/NewRequest.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../../supabaseClient";

const NewRequest: React.FC = () => {
  const [symptoms, setSymptoms] = useState<string>("");
  const [attachedReports, setAttachedReports] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get the current authenticated user
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      // Insert the new consultation request into the `consultation_requests` table
      const { data, error } = await supabase
        .from("consultation_requests")
        .insert([
          {
            symptoms,
            attached_reports: attachedReports.split(",").map((report) => report.trim()),
            notes,
            created_by: userData.user.id,
          },
        ])
        .select();

      if (error) throw error;

      // Redirect to the consultation requests list
      if (data && data.length > 0) {
        navigate("/memberportal/teleconsultation/requests");
      }
    } catch (error) {
      console.error("Error submitting consultation request:", error);
      alert("An error occurred while submitting the request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-primary">Send a New Consultation Request</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          {/* Symptoms */}
          <div>
            <label className="block text-sm font-medium">Symptoms</label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              rows={3}
              required
            />
          </div>

          {/* Attached Reports */}
          <div>
            <label className="block text-sm font-medium">Attached Reports (comma-separated)</label>
            <textarea
              value={attachedReports}
              onChange={(e) => setAttachedReports(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              rows={3}
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewRequest;