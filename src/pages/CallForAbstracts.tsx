import React from "react";

const CallForAbstracts = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary">
            Call for Abstracts
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            We welcome abstract submissions for our upcoming conferences and
            workshops. Share your research and contribute to the advancement of
            child neurology in East Africa.
          </p>
        </div>

        <div className="flex justify-center">
          <a
            href="/submit-abstract" // Link to the abstract submission form or page
            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors"
          >
            Submit Abstract
          </a>
        </div>
      </div>
    </div>
  );
};

export default CallForAbstracts;
