import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

interface CorporatePartnership {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  created_at: string;
}

interface Volunteer {
  id: string;
  full_name: string;
  email: string;
  availability: string;
  created_at: string;
}

const CorporateAndVolunteer = () => {
  const [corporatePartnerships, setCorporatePartnerships] = useState<CorporatePartnership[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Corporate Partnerships
  const fetchCorporatePartnerships = async () => {
    try {
      const { data, error } = await supabase
        .from("corporate_partnerships")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCorporatePartnerships(data || []);
    } catch (error) {
      console.error("Error fetching corporate partnerships:", error);
      setError("Error fetching corporate partnerships.");
    }
  };

  // Fetch Volunteers
  const fetchVolunteers = async () => {
    try {
      const { data, error } = await supabase
        .from("volunteers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setVolunteers(data || []);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
      setError("Error fetching volunteers.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchCorporatePartnerships();
      await fetchVolunteers();
      setLoading(false);
    };

    fetchData();

    // Set up real-time subscriptions
    const corporatePartnershipsSubscription = supabase
      .channel("public:corporate_partnerships")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "corporate_partnerships" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newPartnership = payload.new as CorporatePartnership;
            setCorporatePartnerships((prev) => [newPartnership, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            const updatedPartnership = payload.new as CorporatePartnership;
            setCorporatePartnerships((prev) =>
              prev.map((p) => (p.id === updatedPartnership.id ? updatedPartnership : p))
            );
          }
        }
      )
      .subscribe();

    const volunteersSubscription = supabase
      .channel("public:volunteers")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "volunteers" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newVolunteer = payload.new as Volunteer;
            setVolunteers((prev) => [newVolunteer, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            const updatedVolunteer = payload.new as Volunteer;
            setVolunteers((prev) =>
              prev.map((v) => (v.id === updatedVolunteer.id ? updatedVolunteer : v))
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(corporatePartnershipsSubscription);
      supabase.removeChannel(volunteersSubscription);
    };
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-6 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-7xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
        Corporate Partnerships & Volunteer Management
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Manage applied corporate partnerships and volunteers
        </p>

        {/* Corporate Partnerships Table */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Corporate Partnerships</h3>
          <div className="bg-white shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company Name
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Name
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email Address
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied On
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {corporatePartnerships.map((partnership) => (
                  <tr key={partnership.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {partnership.company_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {partnership.contact_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {partnership.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(partnership.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Volunteers Table */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Volunteers</h3>
          <div className="bg-white shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email Address
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Availability
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied On
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {volunteers.map((volunteer) => (
                  <tr key={volunteer.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {volunteer.full_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {volunteer.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {volunteer.availability}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(volunteer.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateAndVolunteer;