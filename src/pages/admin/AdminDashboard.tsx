import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient"; // Adjust the import path
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

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
  payment_status: string; // Add payment_status to the Member interface
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
  const [newApplicationsToday, setNewApplicationsToday] = useState<number>(0); // New applications today
  const [totalDonations, setTotalDonations] = useState<number>(0); // Total donations
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null); // Track the selected message
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility
  const navigate = useNavigate(); // Initialize useNavigate

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
        .lte("created_at", `${today}T23:59:59`)
        .neq("payment_status", "approved"); // Filter members with payment_status not approved

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

  // Fetch New Applications for Today (Corporate Partnerships + Volunteers)
  const fetchNewApplicationsToday = async () => {
    try {
      const today = new Date().toISOString().split("T")[0]; // Get today's date

      // Fetch new corporate partnerships today
      const { count: partnershipCount, error: partnershipError } = await supabase
        .from("corporate_partnerships")
        .select("*", { count: "exact", head: true })
        .gte("created_at", `${today}T00:00:00`) // Filter applications created today
        .lte("created_at", `${today}T23:59:59`);

      if (partnershipError) throw partnershipError;

      // Fetch new volunteers today
      const { count: volunteerCount, error: volunteerError } = await supabase
        .from("volunteers")
        .select("*", { count: "exact", head: true })
        .gte("created_at", `${today}T00:00:00`) // Filter applications created today
        .lte("created_at", `${today}T23:59:59`);

      if (volunteerError) throw volunteerError;

      // Combine the counts
      setNewApplicationsToday((partnershipCount || 0) + (volunteerCount || 0));
    } catch (err) {
      console.error("Error fetching new applications today:", err);
      setError("Failed to fetch new applications today.");
    }
  };

  // Fetch Total Donations
  const fetchTotalDonations = async () => {
    try {
      const { count, error } = await supabase
        .from("donations")
        .select("*", { count: "exact", head: true });

      if (error) throw error;
      setTotalDonations(count || 0);
    } catch (err) {
      console.error("Error fetching total donations:", err);
      setError("Failed to fetch total donations.");
    }
  };

  // Open modal with the selected message
  const handleViewMessage = (message: string) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchQueries();
      await fetchNewMembersToday();
      await fetchPendingSpecialists();
      await fetchActiveProjects();
      await fetchNewApplicationsToday();
      await fetchTotalDonations();
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
          <h3 className="text-xl font-semibold text-gray-800">Pending Contact Us Messages</h3>
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
          <h3 className="text-xl font-semibold text-gray-800">Pending Specialists Applications</h3>
          <p className="text-3xl font-bold text-primary mt-2">{pendingSpecialists.length}</p>
          <p className="text-sm text-gray-600 mt-2">Review and approve applications.</p>
        </div>

        {/* Active Projects Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800">Active Research Articles</h3>
          <p className="text-3xl font-bold text-primary mt-2">{activeProjects.length}</p>
          <p className="text-sm text-gray-600 mt-2">Review and approve Research Articles.</p>
        </div>

        {/* New Applications Today Card */}
        <div
          className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate("/admin/admin-dashboard/corporate-volunteer-applications")}
        >
          <h3 className="text-xl font-semibold text-gray-800">New Applications Today</h3>
          <p className="text-3xl font-bold text-primary mt-2">{newApplicationsToday}</p>
          <p className="text-sm text-gray-600 mt-2">Review corporate and volunteer applications.</p>
        </div>

        {/* Donation History Card */}
        <div
          className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate("/admin/admin-dashboard/donation-history")}
        >
          <h3 className="text-xl font-semibold text-gray-800">Donation History</h3>
          <p className="text-3xl font-bold text-primary mt-2">{totalDonations}</p>
          <p className="text-sm text-gray-600 mt-2">View all donations made to the organization.</p>
        </div>
      </div>

      {/* Modal for Viewing Messages */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Message</h3>
            <p className="text-gray-600">{selectedMessage}</p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;