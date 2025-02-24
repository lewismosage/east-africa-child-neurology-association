import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Define the type for a specialist
interface Specialist {
  prefix: string; // Add prefix field
  name: string;
  title: string;
  location: string;
  specialties: string[];
  contact: string;
  email: string;
}

const FindSpecialist = () => {
  const [location, setLocation] = useState("All Countries");
  const [specialization, setSpecialization] = useState("All Specializations");
  const [filteredSpecialists, setFilteredSpecialists] = useState<Specialist[]>([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // Sample data for specialists
  const specialists: Specialist[] = [
    {
      prefix: "Dr.",
      name: "Rachel Mwangi",
      title: "Pediatric Neurologist",
      location: "Nairobi, Kenya",
      specialties: ["Epilepsy", "Movement Disorders"],
      contact: "+254712345678",
      email: "rachel.mwangi@example.com",
    },
    {
      prefix: "Dr.",
      name: "John Kamau",
      title: "Pediatric Neurologist",
      location: "Kampala, Uganda",
      specialties: ["Neurogenetics", "Neuromuscular"],
      contact: "+256712345678",
      email: "john.kamau@example.com",
    },
    {
      prefix: "Dr.",
      name: "Jane Doe",
      title: "Pediatric Epilepsy Specialist",
      location: "Nairobi, Kenya",
      specialties: ["Pediatric Epilepsy"],
      contact: "+254712345679",
      email: "jane.doe@example.com",
    },
  ];

  // Function to handle the "Apply for Listing" button click
  const handleApplyForListing = () => {
    navigate("/specialist-form"); // Navigate to the form page
  };

  // Function to handle the "Search Specialists" button click
  const handleSearchSpecialists = () => {
    const filtered = specialists.filter((specialist) => {
      const matchesLocation =
        location === "All Countries" || specialist.location.includes(location);
      const matchesSpecialization =
        specialization === "All Specializations" ||
        specialist.specialties.includes(specialization);
      return matchesLocation && matchesSpecialization;
    });
    setFilteredSpecialists(filtered);
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
      <section className="bg-white p-6 rounded-lg shadow-md">
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
            {filteredSpecialists.map((specialist, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {specialist.prefix} {specialist.name} {/* Combine prefix and name */}
                  </div>
                  <div className="text-sm text-gray-500">{specialist.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {specialist.specialties.join(", ")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{specialist.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a href={`tel:${specialist.contact}`} className="text-purple-600 hover:text-purple-900">📞 Call Now</a>
                  <span className="mx-2">|</span>
                  <a href={`mailto:${specialist.email}`} className="text-purple-600 hover:text-purple-900">✉️ Email Now</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

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