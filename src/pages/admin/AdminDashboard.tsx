import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient"; // Adjust the import path

interface Query {
  id: string;
  topic: string;
  name?: string; // Optional for healthcare_queries
  email: string;
  message?: string; // Optional for healthcare_queries
  question?: string; // Optional for contact_us_queries
  created_at: string;
  status: string;
  type: "contact_us_queries" | "healthcare_queries";
}

interface Member {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

interface Specialist {
  id: string;
  name: string;
  email: string;
  status: string;
  created_at: string;
}

interface Project {
  id: string;
  title: string;
  status: string;
  publishedAt: string;
}

const AdminDashboard = () => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [newMembersToday, setNewMembersToday] = useState<Member[]>([]);
  const [pendingSpecialists, setPendingSpecialists] = useState<Specialist[]>([]);
  const [activeProjects, setActiveProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Queries (both contact_us_queries and healthcare_queries)
  const fetchQueries = async () => {
    try {
      const { data, error } = await supabase
        .from("queries")
        .select("*")
        .eq("status", "pending") // Fetch only pending queries
        .order("created_at", { ascending: false });

      if (error) throw error;
      setQueries(data || []);
    } catch (err) {
      console.error("Error fetching queries:", err);
      setError("Failed to fetch queries.");
    }
  };

  // Fetch New Members Today
  const fetchNewMembersToday = async () => {
    try {
      const today = new Date().toISOString().split("T")[0]; // Get today's date
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .gte("created_at", `${today}T00:00:00`) // Filter members created today
        .lte("created_at", `${today}T23:59:59`);

      if (error) throw error;
      setNewMembersToday(data || []);
    } catch (err) {
      console.error("Error fetching new members today:", err);
      setError("Failed to fetch new members today.");
    }
  };

  // Fetch Pending Specialists
  const fetchPendingSpecialists = async () => {
    try {
      const { data, error } = await supabase
        .from("specialists")
        .select("*")
        .eq("status", "pending") // Filter pending specialists
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPendingSpecialists(data || []);
    } catch (err) {
      console.error("Error fetching pending specialists:", err);
      setError("Failed to fetch pending specialists.");
    }
  };

  // Fetch Active Projects
  const fetchActiveProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("status", "active") // Filter active projects
        .order("publishedAt", { ascending: false });

      if (error) throw error;
      setActiveProjects(data || []);
    } catch (err) {
      console.error("Error fetching active projects:", err);
      setError("Failed to fetch active projects.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchQueries();
      await fetchNewMembersToday();
      await fetchPendingSpecialists();
      await fetchActiveProjects();
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>;
  }

  // Filter queries by type
  const contactUsQueries = queries.filter((query) => query.type === "contact_us_queries");
  const healthcareQueries = queries.filter((query) => query.type === "healthcare_queries");

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Welcome Message */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Welcome, Admin!</h2>
        <p className="text-gray-600 mt-2">Here's an overview of your tasks and updates.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Pending Contact Us Queries Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800">Pending Contact Us Queries</h3>
          <p className="text-3xl font-bold text-primary mt-2">{contactUsQueries.length}</p>
          <p className="text-sm text-gray-600 mt-2">Respond to pending queries.</p>
        </div>

        {/* Healthcare Queries Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800">Healthcare Queries</h3>
          <p className="text-3xl font-bold text-primary mt-2">{healthcareQueries.length}</p>
          <p className="text-sm text-gray-600 mt-2">Respond to new healthcare queries.</p>
        </div>

        {/* New Members Today Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800">New Members Today</h3>
          <p className="text-3xl font-bold text-primary mt-2">{newMembersToday.length}</p>
          <p className="text-sm text-gray-600 mt-2">Approve payments for new members.</p>
        </div>

        {/* Pending Specialists Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800">Pending Specialists</h3>
          <p className="text-3xl font-bold text-primary mt-2">{pendingSpecialists.length}</p>
          <p className="text-sm text-gray-600 mt-2">Review and approve applications.</p>
        </div>

        {/* Active Projects Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800">Active Research Articles</h3>
          <p className="text-3xl font-bold text-primary mt-2">{activeProjects.length}</p>
          <p className="text-sm text-gray-600 mt-2">Review and approve Research Articles.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;