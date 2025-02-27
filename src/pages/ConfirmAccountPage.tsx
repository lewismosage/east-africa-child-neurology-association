import React from "react";
import { useNavigate } from "react-router-dom";

export function ConfirmAccountPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-green-600">
          Account Confirmed!
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Your account has been successfully confirmed.
        </p>
      </div>
    </div>
  );
}

export default ConfirmAccountPage;