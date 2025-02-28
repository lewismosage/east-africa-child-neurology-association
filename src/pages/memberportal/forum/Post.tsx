// src/memberportal/forum/Post.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../../supabaseClient"; 

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const [caseStudy, setCaseStudy] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch case study details
  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        const { data, error } = await supabase
          .from("case_studies")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setCaseStudy(data);
      } catch (error) {
        console.error("Error fetching case study:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [id]);

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (!caseStudy) {
    return <div className="text-center py-6">Case study not found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{caseStudy.title}</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium">Case Details</h2>
        <p className="text-sm text-gray-600">{caseStudy.description}</p>
        <p className="text-sm text-gray-600 mt-2">Symptoms: {caseStudy.symptoms}</p>
        <p className="text-sm text-gray-600">Diagnostic Tests: {caseStudy.diagnostic_tests}</p>
        <p className="text-sm text-gray-600">Treatment Plan: {caseStudy.treatment_plan}</p>
      </div>
    </div>
  );
};

export default Post;