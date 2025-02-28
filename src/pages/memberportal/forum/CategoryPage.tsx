import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../../../../supabaseClient";

interface CaseStudy {
  id: number;
  title: string;
  description: string;
  created_by: string;
  created_by_name: string; // Ensure this field is included
  created_at: string;
}

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>(); // Ensure category is optional
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch case studies for the selected category
  useEffect(() => {
    if (!category) return; // Prevent fetching if category is undefined

    const fetchCaseStudies = async () => {
      try {
        const { data, error } = await supabase
          .from("case_studies")
          .select("*")
          .eq("category", category);

        if (error) throw error;
        setCaseStudies(data || []);
      } catch (error) {
        console.error("Error fetching case studies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, [category]);

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-primary">
        {category ? category.charAt(0).toUpperCase() + category.slice(1) : "Category"} Case Studies
      </h1>

      {/* Add the "Submit a New Case Study" button */}
      <div className="flex justify-end mb-6">
        <Link
          to={`/memberportal/forum/new-post/${category}`} // Pass the category in the URL
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Submit a New Case Study
        </Link>
      </div>

      {/* List of Case Studies */}
      <div className="space-y-4">
        {caseStudies.length > 0 ? (
          caseStudies.map((caseStudy) => (
            <Link
              key={caseStudy.id}
              to={`/memberportal/forum/case-study/${caseStudy.id}`}
              className="block bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-medium">{caseStudy.title}</h2>
              <p className="text-sm text-gray-600">{caseStudy.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Posted by: {caseStudy.created_by_name} | {new Date(caseStudy.created_at).toLocaleDateString()}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-600">No case studies found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;