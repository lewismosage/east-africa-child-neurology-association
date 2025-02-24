import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient"; // Adjust the import path as needed

// Define the type for a specialist
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

const FindSpecialist = () => {
  const [location, setLocation] = useState("All Countries");
  const [specialization, setSpecialization] = useState("All Specializations");
  const [filteredSpecialists, setFilteredSpecialists] = useState<Specialist[]>([]);
  const [allSpecialists, setAllSpecialists] = useState<Specialist[]>([]); // Store all specialists fetched from Supabase
  const [loading, setLoading] = useState(true); // Loading state
  const [showTable, setShowTable] = useState(false); // Control whether to show the table
  const navigate = useNavigate();

  // Fetch specialists from Supabase on component mount
  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        // Fetch only approved specialists
        const { data, error } = await supabase
          .from("specialists")
          .select("*")
          .eq("status", "approved") // Only fetch specialists with status "approved"
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        console.log("Fetched specialists:", data);
        setAllSpecialists(data as Specialist[]); // Store all approved specialists
      } catch (error) {
        console.error("Error fetching specialists:", error);
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
            // Add new specialist to the list only if status is "approved"
            if (newSpecialist.status === "approved") {
              setAllSpecialists((prevSpecialists) => [newSpecialist, ...prevSpecialists]);
            }
          } else if (payload.eventType === "UPDATE") {
            const updatedSpecialist = payload.new as Specialist;
            // Update the specialist in the list only if status is "approved"
            if (updatedSpecialist.status === "approved") {
              setAllSpecialists((prevSpecialists) =>
                prevSpecialists.map((specialist) =>
                  specialist.id === updatedSpecialist.id ? updatedSpecialist : specialist
                )
              );
            } else {
              // Remove the specialist if status is no longer "approved"
              setAllSpecialists((prevSpecialists) =>
                prevSpecialists.filter((specialist) => specialist.id !== updatedSpecialist.id)
              );
            }
          } else if (payload.eventType === "DELETE") {
            const deletedSpecialist = payload.old as Specialist;
            // Remove the deleted specialist from the list
            setAllSpecialists((prevSpecialists) =>
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

  // Function to handle the "Apply for Listing" button click
  const handleApplyForListing = () => {
    navigate("/specialist-form"); // Navigate to the form page
  };

  // Function to handle the "Search Specialists" button click
  const handleSearchSpecialists = () => {
    const filtered = allSpecialists.filter((specialist) => {
      const matchesLocation =
        location === "All Countries" || specialist.location.includes(location);
      const matchesSpecialization =
        specialization === "All Specializations" ||
        specialist.specialization.includes(specialization);
      return matchesLocation && matchesSpecialization;
    });
    setFilteredSpecialists(filtered);
    setShowTable(true); // Show the table after filtering
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-primary mb-8">Find a Specialist</h1>

      {/* Search Filters */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-300 focus:ring-opacity-50"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option>All Countries</option>
              <option>Kenya</option>
              <option>Uganda</option>
              <option>Tanzania</option>
              <option>Rwanda</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-300 focus:ring-opacity-50"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            >
              <option>All Specializations</option>
              <option>Pediatric Epilepsy</option>
              <option>Movement Disorders</option>
              <option>Neurogenetics</option>
              <option>Neuromuscular Disorders</option>
            </select>
          </div>
          <div>
            {/* Empty div for spacing */}
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={handleSearchSpecialists}
            className="bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition duration-200"
          >
            Search Specialists
          </button>
        </div>
      </section>

      {/* Search Results in Table Format */}
      {showTable && (
        <section className="bg-white p-6 rounded-lg shadow-md">
          {loading ? (
            <p className="text-center">Loading specialists...</p>
          ) : filteredSpecialists.length === 0 ? (
            <p className="text-center">No specialists found.</p>
          ) : (
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSpecialists.map((specialist) => (
                  <tr key={specialist.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {specialist.prefix} {specialist.full_name} {/* Combine prefix and name */}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {specialist.specialization}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {specialist.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a href={`tel:${specialist.phone}`} className="text-purple-600 hover:text-purple-900">📞 Call Now</a>
                      <span className="mx-2">|</span>
                      <a href={`mailto:${specialist.email}`} className="text-purple-600 hover:text-purple-900">✉️ Email Now</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      )}

      {/* Information Box */}
      <section className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">Looking to Join the Directory?</h2>
        <p className="text-gray-700 mb-4">
          If you're a qualified child neurologist or specialist and would like to be listed in our directory, please
          complete our verification process.
        </p>
        <button
          onClick={handleApplyForListing}
          className="bg-purple-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-purple-600 transition duration-200"
        >
          Apply for Listing
        </button>
      </section>
    </div>
  );
};

export default FindSpecialist;