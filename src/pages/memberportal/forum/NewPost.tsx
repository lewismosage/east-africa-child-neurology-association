import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../../../supabaseClient";

const NewPost = () => {
  const { category } = useParams<{ category: string }>(); // Extract category from the URL
  const navigate = useNavigate();

  // State for form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [diagnosticTests, setDiagnosticTests] = useState("");
  const [treatmentPlan, setTreatmentPlan] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get the current authenticated user
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      // Fetch the member's details from the `members` table
      const { data: memberData, error: memberError } = await supabase
        .from("members")
        .select("full_name, email")
        .eq("id", userData.user.id)
        .single();

      if (memberError) throw memberError;

      // Extract the full name or email
      const displayName = memberData.full_name || memberData.email || "Anonymous";

      // Insert the new case study into the `case_studies` table
      const { data, error } = await supabase
        .from("case_studies")
        .insert([
          {
            category, // Ensure category is included
            title,
            description,
            symptoms,
            diagnostic_tests: diagnosticTests,
            treatment_plan: treatmentPlan,
            created_by: userData.user.id, // Set the user ID of the creator
            created_by_name: displayName, // Include the member's name or email
          },
        ])
        .select(); // Use `.select()` to return the inserted row

      if (error) throw error;

      // Redirect to the newly created case study details page
      if (data && data.length > 0) {
        navigate(`/memberportal/forum/case-study/${data[0].id}`);
      }
    } catch (error) {
      console.error("Error submitting case study:", error);
      alert("An error occurred while submitting the case study. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Submit a New Case Study</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          {/* Symptoms */}
          <div>
            <label className="block text-sm font-medium">Symptoms</label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          {/* Diagnostic Tests */}
          <div>
            <label className="block text-sm font-medium">Diagnostic Tests</label>
            <textarea
              value={diagnosticTests}
              onChange={(e) => setDiagnosticTests(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          {/* Treatment Plan */}
          <div>
            <label className="block text-sm font-medium">Treatment Plan</label>
            <textarea
              value={treatmentPlan}
              onChange={(e) => setTreatmentPlan(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;