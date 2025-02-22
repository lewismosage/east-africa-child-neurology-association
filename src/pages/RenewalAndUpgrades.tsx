import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import Modal from "react-modal"; 

Modal.setAppElement("#root"); 

const PaymentProcessing = () => {
  const [fullName, setFullName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [actionType, setActionType] = useState<"renew" | "upgrade">("renew");
  const [membershipTier, setMembershipTier] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string>("");
  const [recordFound, setRecordFound] = useState<boolean>(false);

  // Fetch user details if logged in
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { data: user, error } = await supabase.auth.getUser();

        if (error) {
          throw error;
        }

        if (user) {
          const { data: memberData, error: memberError } = await supabase
            .from("members")
            .select("full_name, phone_number, membership_tier")
            .eq("id", user.user.id);

          if (memberError) {
            throw memberError;
          }

          if (memberData && memberData.length > 0) {
            setFullName(memberData[0].full_name);
            setPhoneNumber(memberData[0].phone_number);
            setMembershipTier(memberData[0].membership_tier);
            setIsLoggedIn(true);
            setRecordFound(true); // Auto-fill for logged-in users
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setIsLoggedIn(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleSearch = async () => {
    setSearchLoading(true);
    setSearchError("");

    try {
      const { data: memberData, error } = await supabase
        .from("members")
        .select("*")
        .eq("full_name", fullName)
        .eq("phone_number", phoneNumber)
        .eq("email", email);

      if (error) {
        throw error;
      }

      if (memberData && memberData.length > 0) {
        setFullName(memberData[0].full_name);
        setPhoneNumber(memberData[0].phone_number);
        setMembershipTier(memberData[0].membership_tier);
        setRecordFound(true); // Record found, make fields uneditable
        setIsModalOpen(false); // Close the modal after finding the record
      } else {
        setSearchError("No matching record found. Please check your details.");
      }
    } catch (error) {
      console.error("Error searching for member:", error);
      setSearchError("Error searching for member. Please try again.");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

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
      setStatus("Transaction ID Already Submitted.");
      setLoading(false);
      return;
    }

    try {
      // Update the member's record with the new transaction ID and payment status
      const { error: updateError } = await supabase
        .from("members")
        .update({
          transaction_id: transactionId,
          payment_status: "pending",
          membership_tier: actionType === "renew" ? membershipTier : membershipTier, // Use existing tier for renew, selected tier for upgrade
          action_type: actionType,
        })
        .eq("full_name", fullName)
        .eq("phone_number", phoneNumber);

      if (updateError) {
        throw updateError;
      }

      setStatus("PAYMENT UNDER VERIFICATION");
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting payment details:", error);
      setStatus("Error submitting payment details. Please try again.");
    } finally {
      setLoading(false);
    }
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
          {!isLoggedIn && !recordFound && (
            <div className="mb-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Find my record
              </button>
            </div>
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

            {/* Membership Tier Selection (Conditional Rendering) */}
            {actionType === "upgrade" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Membership Tier
                </label>
                <select
                  value={membershipTier}
                  onChange={(e) => setMembershipTier(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required={actionType === "upgrade"}
                >
                  <option value="">Select a tier</option>
                  <option value="Student">Student</option>
                  <option value="Associate">Associate</option>
                  <option value="Full Member">Full Member</option>
                </select>
              </div>
            )}

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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100"
                value={fullName}
                readOnly={isLoggedIn || recordFound} // Read-only for logged-in users or after record is found
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100"
                value={phoneNumber}
                readOnly={isLoggedIn || recordFound} // Read-only for logged-in users or after record is found
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
                disabled={loading || !recordFound} // Disable if no record is found
              >
                {loading ? "Submitting..." : submitted ? "Submitted" : "Submit Payment"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Pop-up Modal for Finding Records */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Find My Record"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-xl font-bold mb-4">Find My Record</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          {searchError && (
            <p className="text-red-600 text-sm text-center">{searchError}</p>
          )}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={searchLoading}
          >
            {searchLoading ? "Searching..." : "Find My Record"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default PaymentProcessing;