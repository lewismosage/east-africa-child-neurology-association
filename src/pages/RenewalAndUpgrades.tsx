import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const PaymentProcessing = () => {
  const [fullName, setFullName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [actionType, setActionType] = useState<"renew" | "upgrade">("renew"); // "renew" or "upgrade"
  const [membershipTier, setMembershipTier] = useState<string>(""); // "Student", "Associate", "Full Member"
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    // Prevent duplicate submissions
    if (status === "PAYMENT UNDER VERIFICATION") {
      setLoading(false);
      return;
    }

    // Check if Transaction ID already exists
    const { data: existingTransactions, error: fetchError } = await supabase
      .from("members")
      .select("transaction_id")
      .eq("transaction_id", transactionId);

    if (fetchError) {
      console.error("Error checking transaction ID:", fetchError);
      setStatus("Error checking transaction ID. Please try again.");
      setLoading(false);
      return;
    }

    if (existingTransactions && existingTransactions.length > 0) {
      setStatus(
        "Transaction ID Already Submitted. The Transaction ID you entered has already been submitted and is currently under review. If this was a mistake, please check your details and try again. If you need assistance, please contact support."
      );
      setLoading(false);
      return;
    }

    // Store payment details in the `members` table
    const { data, error } = await supabase
      .from("members")
      .update({
        transaction_id: transactionId,
        payment_status: "pending", // Set payment status to pending
        membership_tier: membershipTier, // Include membership tier
        action_type: actionType, // Include action type (renew/upgrade)
      })
      .eq("full_name", fullName) // Use full_name to identify the member
      .eq("phone_number", phoneNumber); // Use phone_number to identify the member

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Renewal & Upgrades
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Renew and upgrade your membership tiers.
        </p>
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
            {/* Action Type (Renew or Upgrade) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Action
              </label>
              <div className="mt-1 space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="actionType"
                    value="renew"
                    checked={actionType === "renew"}
                    onChange={() => setActionType("renew")}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Renew</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="actionType"
                    value="upgrade"
                    checked={actionType === "upgrade"}
                    onChange={() => setActionType("upgrade")}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Upgrade</span>
                </label>
              </div>
            </div>

            {/* Membership Tier Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Membership Tier
              </label>
              <select
                value={membershipTier}
                onChange={(e) => setMembershipTier(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Select a tier</option>
                <option value="Student">Student</option>
                <option value="Associate">Associate</option>
                <option value="Full Member">Full Member</option>
              </select>
            </div>

            {/* M-Pesa Paybill Details */}
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

            {/* Full Name */}
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
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            {/* Transaction ID */}
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

            {/* Submit Button */}
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

export default PaymentProcessing;