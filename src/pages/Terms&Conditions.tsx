import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-7xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-primary">
          Terms & Conditions
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please read our terms and conditions carefully before using our services.
        </p>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white rounded-lg shadow-md overflow-hidden p-6">
          <h3 className="text-xl font-semibold mb-4">1. Introduction</h3>
          <p className="text-gray-700 mb-4">
            Welcome to our platform. By accessing our services, you agree to comply with these
            terms and conditions. If you do not agree, please do not use our services.
          </p>
          
          <h3 className="text-xl font-semibold mb-4">2. User Responsibilities</h3>
          <p className="text-gray-700 mb-4">
            Users are expected to provide accurate information and use our services ethically.
            Any misuse or violation of these terms may result in account suspension.
          </p>
          
          <h3 className="text-xl font-semibold mb-4">3. Privacy Policy</h3>
          <p className="text-gray-700 mb-4">
            We are committed to protecting your privacy. Please review our Privacy Policy
            to understand how we collect and use your information.
          </p>
          
          <h3 className="text-xl font-semibold mb-4">4. Limitation of Liability</h3>
          <p className="text-gray-700 mb-4">
            We are not liable for any direct or indirect damages resulting from the use
            of our services. Users assume all risks associated with using our platform.
          </p>
          
          <h3 className="text-xl font-semibold mb-4">5. Changes to Terms</h3>
          <p className="text-gray-700">
            We reserve the right to update these terms at any time. Continued use
            of our services after changes are made constitutes acceptance of the new terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
