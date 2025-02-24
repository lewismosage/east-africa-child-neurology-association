import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

interface Specialist {
  id: number;
  prefix: string;
  full_name: string;
  email: string;
  phone: string;
  specialization: string;
  location: string;
  qualification_documents: string;
  terms_accepted: boolean;
  status: string; // "pending", "approved", "rejected"
  created_at: string;
}

const SpecialistApproval = () => {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null); // Track selected specialist for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility

  // Fetch specialists on component mount
  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        // Fetch all specialists
        const { data, error } = await supabase
          .from("specialists")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        console.log("Fetched specialists:", data);
        setSpecialists(data as Specialist[]);
      } catch (error) {
        console.error("Error fetching specialists:", error);
        setError("Error fetching specialists. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialists();

    // Set up real-time subscription for changes to the `specialists` table
    const specialistsSubscription = supabase
      .channel("public:specialists")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "specialists" },
        (payload) => {
          console.log("Real-time update:", payload);
          if (payload.eventType === "INSERT") {
            const newSpecialist = payload.new as Specialist;
            // Add new specialist to the top of the list
            setSpecialists((prevSpecialists) => [newSpecialist, ...prevSpecialists]);
          } else if (payload.eventType === "UPDATE") {
            const updatedSpecialist = payload.new as Specialist;
            // Update the specialist in the list
            setSpecialists((prevSpecialists) =>
              prevSpecialists.map((specialist) =>
                specialist.id === updatedSpecialist.id ? updatedSpecialist : specialist
              )
            );
          } else if (payload.eventType === "DELETE") {
            const deletedSpecialist = payload.old as Specialist;
            // Remove the deleted specialist from the list
            setSpecialists((prevSpecialists) =>
              prevSpecialists.filter((specialist) => specialist.id !== deletedSpecialist.id)
            );
          }
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(specialistsSubscription);
    };
  }, []);

  const handleApprove = async (specialistId: number) => {
    try {
      // Update the specialist status to "approved"
      const { error } = await supabase
        .from("specialists")
        .update({ status: "approved" })
        .eq("id", specialistId);

      if (error) {
        throw error;
      }

      // Update the UI
      setSpecialists((prevSpecialists) =>
        prevSpecialists.map((specialist) =>
          specialist.id === specialistId ? { ...specialist, status: "approved" } : specialist
        )
      );

      setError(""); // Clear any previous errors
    } catch (error) {
      setError("Error approving specialist. Please try again.");
    }
  };

  const handleReject = async (specialistId: number) => {
    try {
      // Update the specialist status to "rejected"
      const { error } = await supabase
        .from("specialists")
        .update({ status: "rejected" })
        .eq("id", specialistId);

      if (error) {
        throw error;
      }

      // Update the UI
      setSpecialists((prevSpecialists) =>
        prevSpecialists.map((specialist) =>
          specialist.id === specialistId ? { ...specialist, status: "rejected" } : specialist
        )
      );

      setError(""); // Clear any previous errors
    } catch (error) {
      setError("Error rejecting specialist. Please try again.");
    }
  };

  // Open modal with specialist details
  const openModal = (specialist: Specialist) => {
    setSelectedSpecialist(specialist);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedSpecialist(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-6 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-7xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
        Specialists Directory
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Approve or reject specialists applications submitted by applicants
        </p>

        {loading ? (
          <p className="text-center mt-4">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600 mt-4">{error}</p>
        ) : (
          <div className="mt-4">
            <div className="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Full Name
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Specialization
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {specialists.map((specialist) => (
                    <tr key={specialist.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {specialist.prefix} {specialist.full_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {specialist.specialization}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {specialist.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <a
                          href={`tel:${specialist.phone}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          📞 {specialist.phone}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {specialist.status === "pending" ? (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                            Pending Approval
                          </span>
                        ) : specialist.status === "approved" ? (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">
                            Approved
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full">
                            Rejected
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => openModal(specialist)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          View Details
                        </button>
                        {specialist.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleApprove(specialist.id)}
                              className="text-green-600 hover:text-green-900 mr-4"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(specialist.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal for viewing specialist details */}
      {isModalOpen && selectedSpecialist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
            <h3 className="text-xl font-bold mb-4">
              {selectedSpecialist.prefix} {selectedSpecialist.full_name}
            </h3>
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> {selectedSpecialist.email}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Phone:</strong> {selectedSpecialist.phone}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Specialization:</strong> {selectedSpecialist.specialization}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Location:</strong> {selectedSpecialist.location}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Qualification Documents:</strong>{" "}
              <a
                href={`${supabase.storage
                  .from("specialist-verification")
                  .getPublicUrl(selectedSpecialist.qualification_documents).data.publicUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Download File
              </a>
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
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

export default SpecialistApproval;