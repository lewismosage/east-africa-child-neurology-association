import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import { LogOut } from "lucide-react";

interface User {
  user_metadata: {
    full_name: string;
    email: string;
    membership_tier: string;
  };
}

const AccountManagement = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: userData, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user data:", error);
        navigate("/membership/login");
      } else {
        setUser({
          user_metadata: {
            full_name: userData.user.user_metadata.full_name,
            email: userData.user.email || "",
            membership_tier: userData.user.user_metadata.membership_tier || "Basic",
          },
        });
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Management</h2>
          {user && (
            <div>
              <p className="text-lg text-gray-700 mb-2">Name: {user.user_metadata.full_name}</p>
              <p className="text-lg text-gray-700 mb-4">Email: {user.user_metadata.email}</p>
              <p className="text-lg text-gray-700 mb-4">Membership Tier: {user.user_metadata.membership_tier}</p>
              <button
                onClick={() => navigate("/membership/renewal-upgrade")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-4"
              >
                Renewal & Upgrade
              </button>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300"
          >
            <LogOut className="mr-2 h-5 w-5 text-red-600" /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;