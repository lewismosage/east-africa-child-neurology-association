import React, { useState } from "react";

const FindSpecialist = () => {
  const [location, setLocation] = useState("All Countries");
  const [specialization, setSpecialization] = useState("All Specializations");

  const specialists = [
    {
      name: "Dr. Rachel Mwangi",
      title: "Pediatric Neurologist",
      location: "Nairobi, Kenya",
      specialties: ["Epilepsy", "Movement Disorders"],
    },
    {
      name: "Dr. John Kamau",
      title: "Pediatric Neurologist",
      location: "Kampala, Uganda",
      specialties: ["Neurogenetics", "Neuromuscular"],
    },
  ];

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
          </div>
          
        </div>
        <div className="mt-6">
          <button className="bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition duration-200">
            Search Specialists
          </button>
        </div>
      </section>

      {/* Search Results */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {specialists.map((specialist, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center">
                  <span className="text-purple-800 text-xl font-semibold">
                    {specialist.name.split(" ")[1][0]}
                  </span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold mb-2">{specialist.name}</h3>
                <p className="text-gray-600 mb-2">{specialist.title}</p>
                <p className="text-gray-600 mb-2">{specialist.location}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {specialist.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Information Box */}
      <section className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">Looking to Join the Directory?</h2>
        <p className="text-gray-700 mb-4">
          If you're a qualified child neurologist or specialist and would like to be listed in our directory, please
          complete our verification process.
        </p>
        <button className="bg-purple-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-purple-600 transition duration-200">
          Apply for Listing
        </button>
      </section>
    </div>
  );
};

export default FindSpecialist;
