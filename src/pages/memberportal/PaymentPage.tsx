import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient";

const PaymentPage = () => {
  const [transactionId, setTransactionId] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [userData, setUserData] = useState<{
    full_name: string;
    phone_number: string;
    membership_tier: string;
    email: string; // Add email to the userData type
  } | null>(null);

  const navigate = useNavigate();

  // Fetch user data from the members table
  useEffect(() => {
    const fetchUserData = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Error fetching user data:", userError);
        navigate("/membership/login");
        return;
      }

      // Fetch user's details from the members table
      const { data: memberData, error: memberError } = await supabase
        .from("members")
        .select("full_name, phone_number, membership_tier, email") // Include email in the query
        .eq("email", userData.user.email)
        .single();

      if (memberError) {
        console.error("Error fetching member data:", memberError);
        navigate("/membership/login");
        return;
      }

      setUserData(memberData);
    };

    fetchUserData();
  }, [navigate]);

  // Function to check if the Transaction ID already exists in the database
  const checkTransactionIdExists = async (transactionId: string): Promise<boolean> => {
    const { data, error } = await supabase
      .from("members")
      .select("transaction_id")
      .eq("transaction_id", transactionId);

    if (error) {
      console.error("Error checking transaction ID:", error);
      return false;
    }

    return data.length > 0; // Returns true if the transaction ID exists
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    // Prevent duplicate submissions
    if (status === "PAYMENT UNDER VERIFICATION") {
      setLoading(false);
      return;
    }

    // Check if Transaction ID already exists
    const transactionIdExists = await checkTransactionIdExists(transactionId);
    if (transactionIdExists) {
      setStatus(
        "Transaction ID Already Submitted. The Transaction ID you entered has already been submitted and is currently under review. If this was a mistake, please check your details and try again. If you need assistance, please contact support."
      );
      setLoading(false);
      return;
    }

    // Update the members table with the transaction ID
    const { error } = await supabase
      .from("members")
      .update({
        transaction_id: transactionId,
        payment_status: "pending", // Set payment status to pending
      })
      .eq("email", userData?.email); // Use email to identify the member

    if (error) {
      console.error("Error submitting payment details:", error);
      setStatus("Error submitting payment details. Please try again.");
      setLoading(false);
      return;
    }

    setStatus("PAYMENT UNDER VERIFICATION");
    setSubmitted(true);
    setLoading(false);
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg font-medium text-gray-900">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Complete Your Membership Payment
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please make your payment via M-Pesa and provide the transaction details below.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {status && (
            <p className={`text-center mb-4 ${status === "PAYMENT UNDER VERIFICATION" ? "text-green-600" : "text-red-600"}`}>
              {status}
            </p>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <p className="text-sm font-medium text-gray-700 text-center">
                ACCOUNT DETAILS
              </p>
              <label
                htmlFor="paybill"
                className="block text-sm font-medium text-gray-700"
              >
                M-Pesa Paybill
              </label>
              <textarea
                id="paybill"
                name="paybill"
                value={"PAYBILL-12345\nACCOUNT NUMBER 12345"}
                readOnly
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

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
                value={userData.full_name} // Pre-filled from members table
                readOnly // Make the field read-only
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
                value={userData.phone_number} // Pre-filled from members table
                readOnly // Make the field read-only
              />
            </div>

            {/* Display the selected membership tier as read-only text */}
            <div>
              <label
                htmlFor="membershipTier"
                className="block text-sm font-medium text-gray-700"
              >
                Membership Tier
              </label>
              <div className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100 p-2">
                {userData.membership_tier}
              </div>
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
              <button
                type="submit"
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  submitted ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                disabled={loading}
              >
                {loading ? "Submitting..." : submitted ? "Submitted" : "Submit Payment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;