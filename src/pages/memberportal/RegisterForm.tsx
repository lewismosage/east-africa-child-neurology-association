import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "../../../supabaseClient";

export function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    profession: "",
    password: "",
    confirmPassword: "",
    membershipType: "Associate",
  });
  const [status, setStatus] = useState<React.ReactNode>("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(""); // Clear previous messages

    if (formData.password !== formData.confirmPassword) {
      setStatus("Passwords do not match");
      setLoading(false);
      return;
    }

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: { data: { full_name: formData.fullName } },
    });

    if (signUpError) {
      if (signUpError.status === 409) {
        setStatus(
          <>
            You already have an account.
          </>
        );
      } else {
        setStatus(signUpError.message);
      }
      setLoading(false);
      return;
    }

    const user = signUpData?.user;
    if (!user) {
      setStatus("Sign-up failed. Please try again.");
      setLoading(false);
      return;
    }

    // Wait for the user to be authenticated
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (signInError) {
      console.error("SignIn Error:", signInError);
      setStatus(signInError.message);
      setLoading(false);
      return;
    }

    // Ensure the user is authenticated and the ID is set correctly
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData) {
      console.error("User Error:", userError);
      setStatus("Error retrieving user information.");
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from("profiles").insert([
      {
        id: userData.user.id,
        full_name: formData.fullName,
        phone: formData.phone,
        profession: formData.profession,
        membership_type: formData.membershipType,
        status: "pending",
      },
    ]);

    if (insertError) {
      console.error("Insert Error:", insertError);
      setStatus(
        <>
          You already have an account.
        </>
      );
      setLoading(false);
      return;
    }

    setStatus("Registration successful! Redirecting to payment...");
    setLoading(false);
    setApplied(true);

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      profession: "",
      password: "",
      confirmPassword: "",
      membershipType: "Associate",
    });

    setTimeout(() => {
      navigate("/memberportal/payment-processing");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Apply for Membership
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join our community of dedicated professionals
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {status && <p className="text-center text-red-600 mb-4">{status}</p>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="profession"
                className="block text-sm font-medium text-gray-700"
              >
                Profession
              </label>
              <input
                id="profession"
                name="profession"
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.profession}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.password}
                onChange={handleChange}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="membershipType"
                className="block text-sm font-medium text-gray-700"
              >
                Membership Type
              </label>
              <select
                id="membershipType"
                name="membershipType"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.membershipType}
                onChange={handleChange}
              >
                <option value="Associate">Associate Member</option>
                <option value="Full">Full Member</option>
                <option value="Fellow">Fellow Member</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  applied ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                disabled={loading}
              >
                {loading ? "Processing..." : applied ? "Applied" : "Apply Now"}
              </button>
              <p className="mt-2 text-center text-sm text-gray-600">
                Check Your Email to Confirm Your Sign Up
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;