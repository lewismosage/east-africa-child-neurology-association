import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

export function SpecialistForm() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "", // Added full name field
    email: "",
    phone: "",
    qualificationDocuments: null as File | null, // Combined file upload for qualification documents
    acceptTerms: false,
  });

  const [status, setStatus] = useState<React.ReactNode>("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    setStatus("");

    // Validate required fields
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.qualificationDocuments ||
      !formData.acceptTerms
    ) {
      setStatus("Please fill out all required fields.");
      setLoading(false);
      return;
    }

    // Upload files to Supabase Storage
    const uploadFile = async (file: File, folder: string) => {
      const filePath = `${folder}/${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from("specialist-verification") // Ensure this matches the bucket name
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
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          qualification_documents: qualificationDocumentsPath,
          terms_accepted: formData.acceptTerms,
        },
      ]);

      if (error) {
        throw new Error(`Failed to submit form: ${error.message}`);
      }

      setStatus("Form submitted successfully!");
      setLoading(false);
      navigate("/success"); // Redirect to a success page
    } catch (error) {
      // Handle the error properly
      if (error instanceof Error) {
        setStatus(`Error: ${error.message}`);
      } else {
        setStatus("An unknown error occurred.");
      }
      setLoading(false);
    }
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
          {status && <p className="text-center text-red-600 mb-4">{status}</p>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                required
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
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
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
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
    </div>
  );
}

export default SpecialistForm;