import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../../supabaseClient";

interface CaseStudy {
  id: string; // Updated to string (UUID)
  title: string;
  description: string;
  symptoms?: string;
  diagnostic_tests?: string;
  treatment_plan?: string;
  created_at: string;
}

interface Comment {
  id: string; // Updated to string (UUID)
  case_study_id: string; // Updated to string (UUID)
  comment: string;
  created_by: string;
  created_by_name: string; // Added this field
  created_at: string;
}

const CaseStudyDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); // Ensure id is optional
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch case study details
  useEffect(() => {
    if (!id) return;

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
      }
    };

    fetchCaseStudy();
  }, [id]);

  // Fetch comments for the case study
  const fetchComments = async () => {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("case_study_id", id) // Use the UUID directly (no parsing)
        .order("created_at", { ascending: true });

      if (error) throw error;

      console.log("Fetched comments:", data); // Debugging: Log fetched comments
      setComments(data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch comments when the component mounts or the id changes
  useEffect(() => {
    fetchComments();
  }, [id]);

  // Handle new comment submission
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !newComment.trim()) return; // Validation: Ensure comment is not empty

    try {
      // Get the current authenticated user
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      // Fetch the user's details from the `members` table
      const { data: memberData, error: memberError } = await supabase
        .from("members")
        .select("full_name, email")
        .eq("id", userData.user.id)
        .single();

      if (memberError) throw memberError;

      // Extract the full name or email
      const displayName = memberData.full_name || memberData.email || "Anonymous";

      // Insert the new comment into the `comments` table
      const { data, error } = await supabase
        .from("comments")
        .insert([
          {
            case_study_id: id, // Use the UUID directly (no parsing)
            comment: newComment,
            created_by: userData.user.id,
            created_by_name: displayName, // Use full name or email
          },
        ])
        .select();

      if (error) throw error;

      // Add the new comment to the comments state
      if (data && data.length > 0) {
        setComments((prevComments) => [...prevComments, data[0]]);
      }

      // Clear the input field
      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("An error occurred while submitting the comment. Please try again.");
    }
  };

  // Real-time updates for comments
  useEffect(() => {
    if (!id) return;

    const subscription = supabase
      .channel("comments")
      .on(
        "postgres_changes",
        { 
          event: "INSERT", 
          schema: "public", 
          table: "comments", 
          filter: `case_study_id=eq.${id}` // Use the UUID directly
        },
        (payload) => {
          console.log("New comment received:", payload.new); // Debugging: Log new comment
          setComments((prevComments) => [...prevComments, payload.new as Comment]);
        }
      )
      .subscribe();

    // Cleanup subscription
    return () => {
      supabase.removeChannel(subscription);
    };
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
        {caseStudy.symptoms && <p className="text-sm text-gray-600 mt-2">Symptoms: {caseStudy.symptoms}</p>}
        {caseStudy.diagnostic_tests && (
          <p className="text-sm text-gray-600">Diagnostic Tests: {caseStudy.diagnostic_tests}</p>
        )}
        {caseStudy.treatment_plan && <p className="text-sm text-gray-600">Treatment Plan: {caseStudy.treatment_plan}</p>}
      </div>

      {/* Comments Section */}
      <div className="mt-6">
        <h2 className="text-lg font-medium">Discussion</h2>
        <div className="space-y-4 mt-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
                <p className="text-sm text-gray-600">{comment.comment}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Posted by: {comment.created_by_name} | {new Date(comment.created_at).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
          )}
        </div>

        {/* Add a New Comment */}
        <form onSubmit={handleCommentSubmit} className="mt-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={3}
            required
          />
          <button
            type="submit"
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CaseStudyDetails;