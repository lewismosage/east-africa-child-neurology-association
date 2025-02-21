import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

interface Member {
  id: string; // UUID
  full_name: string;
  phone_number: string;
  transaction_id: string;
  payment_status: string; // Updated from `status` to `payment_status`
  membership_tier: string;
  membership_status: string; // Added membership_status
  action_type: string; // Added action_type
  created_at: string; // Ensure this field is included
}

const PaymentVerification = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        // Fetch all members, including action_type
        const { data, error } = await supabase
          .from("members")
          .select("*")
          .order("created_at", { ascending: false }); // Sort by created_at in descending order

        if (error) {
          throw error;
        }

        // Sort members: pending members first, then approved/active members
        const sortedMembers = data.sort((a, b) => {
          if (a.payment_status === "pending" && b.payment_status !== "pending") {
            return -1; // a comes before b
          } else if (a.payment_status !== "pending" && b.payment_status === "pending") {
            return 1; // b comes before a
          } else {
            return 0; // no change in order
          }
        });

        console.log("Fetched members:", sortedMembers);
        setMembers(sortedMembers as Member[]);
      } catch (error) {
        console.error("Error fetching members:", error);
        setError("Error fetching members. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();

    // Set up real-time subscription for changes to the `members` table
    const membersSubscription = supabase
      .channel("public:members")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "members" },
        (payload) => {
          console.log("Real-time update:", payload);
          if (payload.eventType === "INSERT") {
            const newMember = payload.new as Member;
            setMembers((prevMembers) => {
              // Add new member at the top if payment_status is pending
              if (newMember.payment_status === "pending") {
                return [newMember, ...prevMembers];
              } else {
                return [...prevMembers, newMember];
              }
            });
          } else if (payload.eventType === "UPDATE") {
            const updatedMember = payload.new as Member;
            setMembers((prevMembers) =>
              prevMembers.map((member) =>
                member.id === updatedMember.id ? updatedMember : member
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(membersSubscription);
    };
  }, []);

  const handleVerifyPayment = async (memberId: string) => {
    try {
      // Update payment_status to "approved" and membership_status to "active"
      const { error } = await supabase
        .from("members")
        .update({
          payment_status: "approved",
          membership_status: "active",
        })
        .eq("id", memberId);

      if (error) {
        throw error;
      }

      // Update the UI
      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id === memberId
            ? { ...member, payment_status: "approved", membership_status: "active" }
            : member
        )
      );

      setError(""); // Clear any previous errors
    } catch (error) {
      setError("Error verifying payment. Please try again.");
    }
  };

  // Determine the action type for display
  const getActionTypeDisplay = (member: Member) => {
    if (!member.action_type) {
      return "New User"; // If action_type is not set, assume it's a new user
    }
    return member.action_type === "renew" ? "Renew" : "Upgrade";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-6 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-7xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Membership & Payment Verification
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Verify payments sent by members
        </p>

        {loading ? (
          <p className="text-center mt-4">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600 mt-4">{error}</p>
        ) : (
          <div className="mt-4">
            <div className="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Full Name
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Membership Tier
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action Type
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Status
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Membership Status
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {members.map((member) => (
                    <tr key={member.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {member.full_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {member.phone_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {member.transaction_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {member.membership_tier}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getActionTypeDisplay(member)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {member.payment_status === "approved" ? "Approved" : "Pending Approval"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {member.membership_status === "active" ? "Active" : "Pending"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {member.payment_status === "pending" && (
                          <button
                            onClick={() => handleVerifyPayment(member.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Verify
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentVerification;