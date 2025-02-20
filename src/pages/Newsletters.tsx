import React from 'react';

const Newsletters = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-7xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Newsletters
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Our latest newsletters.
        </p>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Recent Issues</h3>
                    <ul className="space-y-4">
                      <li className="flex items-center space-x-3">
                        <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div>
                          <p className="font-semibold">March 2024 Newsletter</p>
                          <p className="text-sm text-gray-600">Latest updates and achievements</p>
                        </div>
                      </li>
                      <li className="flex items-center space-x-3">
                        <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div>
                          <p className="font-semibold">February 2024 Newsletter</p>
                          <p className="text-sm text-gray-600">Conference special edition</p>
                        </div>
                      </li>
                    </ul>
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

export default Newsletters;