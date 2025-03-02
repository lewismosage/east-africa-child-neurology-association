import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../../../supabaseClient.ts";
import { Lock } from "lucide-react";

export function ResetPassword() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get("access_token"); // Extract token from URL

  useEffect(() => {
    // Set the session using the access token
    const setSession = async () => {
      if (accessToken) {
        const { error } = await supabase.auth.setSession({ access_token: accessToken, refresh_token: "" });
        if (error) {
          setStatus(`Error: ${error.message}`);
        }
      }
    };

    setSession();
  }, [accessToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Update the user's password
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setStatus(`Error: ${error.message}`);
      } else {
        setStatus("Password updated successfully!");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setStatus("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Reset Password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your new password
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {status && (
            <p className="text-center text-red-600 mb-4">{status}</p>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}