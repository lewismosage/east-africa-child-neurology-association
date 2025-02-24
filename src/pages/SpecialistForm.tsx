import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

export function SpecialistForm() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    prefix: "Dr.",
    fullName: "",
    email: "",
    phone: "",
    specialization: "",
    location: "",
    qualificationDocuments: null as File | null,
    acceptTerms: false,
  });

  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    } else if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Validate required fields
    if (
      !formData.prefix ||
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.specialization ||
      !formData.location ||
      !formData.qualificationDocuments ||
      !formData.acceptTerms
    ) {
      alert("Please fill out all required fields."); // Simple alert for validation
      setLoading(false);
      return;
    }

    // Upload files to Supabase Storage
    const uploadFile = async (file: File, folder: string) => {
      const filePath = `${folder}/${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from("specialist-verification")
        .upload(filePath, file);

      if (error) {
        throw new Error(`Failed to upload ${folder}: ${error.message}`);
      }
      return data.path;
    };

    try {
      const qualificationDocumentsPath = await uploadFile(
        formData.qualificationDocuments,
        "qualification-documents"
      );

      // Insert data into the `specialists` table
      const { error } = await supabase.from("specialists").insert([
        {
          prefix: formData.prefix,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          specialization: formData.specialization,
          location: formData.location,
          qualification_documents: qualificationDocumentsPath,
          terms_accepted: formData.acceptTerms,
        },
      ]);

      if (error) {
        throw new Error(`Failed to submit form: ${error.message}`);
      }

      // Show the popup on successful submission
      setShowPopup(true);
    } catch (error) {
      // Handle the error properly
      if (error instanceof Error) {
        alert(`Error: ${error.message}`); // Simple alert for errors
      } else {
        alert("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Close the popup
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-primary">
          Specialist Verification Form
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Verify your credentials to join the EACNA directory
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Prefix and Full Name */}
            <div className="grid grid-cols-[auto_1fr] gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Prefix
                </label>
                <select
                  name="prefix"
                  value={formData.prefix}
                  onChange={handleChange}
                  className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="Dr.">Dr.</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Miss">Miss</option>
                  <option value="Mrs.">Mrs.</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Specialization Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Specialization
              </label>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select Specialization</option>
                <option value="Pediatric Epilepsy">Pediatric Epilepsy</option>
                <option value="Movement Disorders">Movement Disorders</option>
                <option value="Neurogenetics">Neurogenetics</option>
                <option value="Neuromuscular Disorders">Neuromuscular Disorders</option>
              </select>
            </div>

            {/* Location Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select Location</option>
                <option value="Nairobi, Kenya">Nairobi, Kenya</option>
                <option value="Kampala, Uganda">Kampala, Uganda</option>
                <option value="Dar es Salaam, Tanzania">Dar es Salaam, Tanzania</option>
                <option value="Kigali, Rwanda">Kigali, Rwanda</option>
              </select>
            </div>

            {/* Upload Relevant Documents */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Relevant Documents (PDF, JPG, PNG)
              </label>
              <input
                type="file"
                name="qualificationDocuments"
                required
                onChange={handleChange}
                accept=".pdf,.jpg,.png"
                className="mt-1 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="acceptTerms"
                required
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                I accept
                <a href="/terms-and-conditions" className="text-primary hover:underline ml-1">
                  EACNA’s Terms & Conditions
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Popup for successful submission */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">Thank You!</h2>
            <p className="text-gray-700 mb-4">
              Thank you for your submission. Our team will review your application, and if approved, we will reach out to you with further details regarding your inclusion in the EACNA directory.
            </p>
            <button
              onClick={closePopup}
              className="bg-purple-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-purple-600 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SpecialistForm;