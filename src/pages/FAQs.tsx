import React from 'react';

const FAQs = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-7xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          FAQs
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Frequently Asked Questions
        </p>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <section>
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6">
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-semibold mb-2">How can I access past newsletters?</h3>
                    <p className="text-gray-700">Members can access all past newsletters through their account dashboard.</p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-semibold mb-2">How often are news updates published?</h3>
                    <p className="text-gray-700">We publish news updates weekly, with major announcements as they occur.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Can I submit news for publication?</h3>
                    <p className="text-gray-700">Members can submit news items for consideration through their account portal.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FAQs;