import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

interface Donation {
  id: string; // UUID
  full_name: string;
  phone_number: string;
  email: string;
  donation_amount: number; // Add donation_amount field
  transaction_id: string;
  message?: string; // Optional message field
  created_at: string;
}

const DonationHistory = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null); // Track the selected message for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility

  // Fetch donations from the `donations` table
  const fetchDonations = async () => {
    try {
      const { data, error } = await supabase
        .from("donations")
        .select("*")
        .order("created_at", { ascending: false }); // Sort by created_at in descending order

      if (error) throw error;

      setDonations(data || []);
    } catch (err) {
      console.error("Error fetching donations:", err);
      setError("Failed to fetch donations. Please try again.");
    } finally {
      setLoading(false);
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
    fetchDonations();

    // Set up real-time subscription for changes to the `donations` table
    const donationsSubscription = supabase
      .channel("public:donations")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "donations" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newDonation = payload.new as Donation;
            setDonations((prev) => [newDonation, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            const updatedDonation = payload.new as Donation;
            setDonations((prev) =>
              prev.map((donation) =>
                donation.id === updatedDonation.id ? updatedDonation : donation
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(donationsSubscription);
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
          Donation History
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          View all donations made to the organization
        </p>

        <div className="mt-4">
          <div className="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Donation Amount
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {donations.map((donation) => (
                  <tr key={donation.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {donation.full_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {donation.phone_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {donation.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Ksh {donation.donation_amount.toLocaleString()} {/* Format donation amount */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {donation.transaction_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {donation.message ? (
                        <button
                          onClick={() => handleViewMessage(donation.message!)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View Message
                        </button>
                      ) : (
                        "No message"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <a
                        href={`mailto:${donation.email}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Contact
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

export default DonationHistory;