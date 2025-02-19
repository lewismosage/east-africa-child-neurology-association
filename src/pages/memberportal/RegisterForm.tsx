import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "../../../supabaseClient";

const RegisterForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Ensures the page opens at the top
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    profession: "",
    password: "",
    confirmPassword: "",
    membershipType: "Associate",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [proofOfPayment, setProofOfPayment] = useState<File | null>(null);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofOfPayment(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setStatus("Passwords do not match");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("users")
      .select("email")
      .eq("email", formData.email);

    if (data && data.length > 0) {
      setStatus("Email already exists");
      setLoading(false);
      return;
    }

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      }
    );

    const { user, session } = signUpData || {};

    if (signUpError) {
      setStatus(signUpError.message);
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from("profiles").insert([
      {
        id: user?.id || "",
        full_name: formData.fullName,
        phone: formData.phone,
        profession: formData.profession,
        membership_type: formData.membershipType,
        status: "pending",
      },
    ]);

    if (insertError) {
      setStatus(insertError.message);
      setLoading(false);
      return;
    }

    setStatus(
      "Registration successful! Please check your email to verify your account."
    );
    setIsRegistered(true);
    setLoading(false);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Prevent duplicate submissions
    if (paymentStatus === "Membership Under Review / Verification") {
      return;
    }

    // Upload proof of payment to Supabase storage
    let proofOfPaymentUrl = null;
    if (proofOfPayment) {
      const { data: storageData, error: storageError } = await supabase.storage
        .from("proof_of_payments")
        .upload(`proofs/${proofOfPayment.name}`, proofOfPayment);

      if (storageError) {
        setPaymentStatus("Error uploading proof of payment. Please try again.");
        setLoading(false);
        return;
      }

      proofOfPaymentUrl = storageData?.path;
    }

    // Store payment details in the Supabase database
    const { data, error } = await supabase.from("payments").insert([
      {
        transaction_id: transactionId,
        proof_of_payment: proofOfPaymentUrl,
        status: "pending",
      },
    ]);

    if (error) {
      setPaymentStatus("Error submitting payment details. Please try again.");
      setLoading(false);
      return;
    }

    setPaymentStatus("Membership Under Review / Verification");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-7xl lg:flex lg:justify-between">
        <div className="sm:w-full sm:max-w-md lg:w-1/2">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Apply for Membership
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join our community of dedicated professionals
          </p>

          <div className="mt-8">
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
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Sign Up"}
                  </button>
                  <p className="mt-2 text-center text-sm text-gray-600">
                    Please check your email to verify your account
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:w-full sm:max-w-md lg:w-1/2 lg:mt-0">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Payment Processing & Verification
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Please make your payment via M-Pesa and provide the transaction details below.
            </p>
            {paymentStatus && <p className="text-center text-red-600 mb-4">{paymentStatus}</p>}
            <form className="space-y-6" onSubmit={handlePaymentSubmit}>
              <div>
                <label
                  htmlFor="paybill"
                  className="block text-sm font-medium text-gray-700"
                >
                  M-Pesa Paybill or Till Number
                </label>
                <input
                  id="paybill"
                  name="paybill"
                  type="text"
                  value="12345" // Example Paybill or Till Number
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="transactionId"
                  className="block text-sm font-medium text-gray-700"
                >
                  M-Pesa Transaction ID
                </label>
                <input
                  id="transactionId"
                  name="transactionId"
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="proofOfPayment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Proof of Payment (Optional)
                </label>
                <input
                  id="proofOfPayment"
                  name="proofOfPayment"
                  type="file"
                  className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                  onChange={handleFileChange}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={loading || !isRegistered}
                >
                  {loading ? "Submitting..." : "Submit Payment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;