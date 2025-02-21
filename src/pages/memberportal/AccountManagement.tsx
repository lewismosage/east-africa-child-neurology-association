import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import { LogOut, User, Shield, RefreshCw } from "lucide-react";

interface UserData {
  id: string;
  full_name: string;
  email: string;
  membership_tier: string; // Ensure this field is included
  membership_status: string;
}

const AccountManagement = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the current user session
        const { data: userData, error: authError } = await supabase.auth.getUser();
        if (authError) throw authError;

        // Fetch user details from the `members` table
        const { data: memberData, error: memberError } = await supabase
          .from("members")
          .select("*")
          .eq("id", userData.user.id)
          .single();

        if (memberError) throw memberError;

        // Set user data, including membership_tier
        setUser({
          id: userData.user.id,
          full_name: userData.user.user_metadata.full_name || memberData.full_name,
          email: userData.user.email || memberData.email,
          membership_tier: memberData.membership_tier || "Basic", // Fetch membership_tier
          membership_status: memberData.membership_status || "Unknown",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/membership/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
    } else {
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Management</h2>

          {user && (
            <div className="space-y-6">
              {/* User Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-4">
                  <User className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-800">User Information</h3>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-lg text-gray-700">Name: {user.full_name}</p>
                  <p className="text-lg text-gray-700">Email: {user.email}</p>
                </div>
              </div>

              {/* Membership Details */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Shield className="h-6 w-6 text-green-600" />
                  <h3 className="text-xl font-semibold text-gray-800">Membership Details</h3>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-lg text-gray-700">
                    Membership Tier:{" "}
                    {user.membership_tier === "Student"
                      ? "Student Member"
                      : user.membership_tier === "Associate"
                      ? "Associate Member"
                      : user.membership_tier === "Full Member"
                      ? "Full Member"
                      : "Unknown"}
                  </p>
                  <p className="text-lg text-gray-700">Membership Status: {user.membership_status}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => navigate("/membership/renewal-&-upgrade")}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <RefreshCw className="mr-2 h-5 w-5" /> Renewal & Upgrade
                </button>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300"
                >
                  <LogOut className="mr-2 h-5 w-5 text-red-600" /> Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;