import React from 'react';

const EACNAPolicies = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-7xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
         EACNA Membership & Policies
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Detailed information about EACNA Membership & Policies.
        </p>

        {/* Membership & Policies Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
           EACNA General Membership Information
          </h3>
          <p className="text-gray-700 mb-4">
            As a member of the East African Clinical Neuroscience Association (EACNA), you play a crucial role in advancing neuroscience research, clinical practice, and professional development across the region. EACNA represents your interests, fosters professional growth, and advocates for neuroscience excellence.
          </p>
          <p className="text-gray-700 mb-4">
            By joining EACNA, you gain access to exclusive research, networking opportunities, career resources, conferences, and policy updates that shape the future of neuroscience in East Africa.
          </p>
        </div>

        {/* Membership Categories & Eligibility Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Membership Categories & Eligibility
          </h3>
          <p className="text-gray-700 mb-4">
            EACNA offers different membership tiers to cater to professionals at various stages of their careers.
          </p>

          {/* Full Membership */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              1. Full Membership - KSH 30,000/year
            </h4>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Eligibility:</span>
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-2">
              <li>Must hold a recognized qualification in neuroscience, neurology, neurosurgery, or a related field.</li>
              <li>Must be actively practicing or contributing to neuroscience research or clinical practice.</li>
              <li>Full members have voting rights and can participate in governance matters.</li>
            </ul>
          </div>

          {/* Associate Membership */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              2. Associate Membership - KSH 20,000/year
            </h4>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Eligibility:</span>
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-2">
              <li>Open to neuroscience students, residents, researchers, and professionals not yet meeting the full membership criteria.</li>
              <li>Includes those currently pursuing postgraduate studies in neuroscience or related fields.</li>
              <li>Associate members have a voice but no voting rights.</li>
            </ul>
          </div>

          {/* Student Membership */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              3. Student Membership - KSH 10,000/year
            </h4>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Eligibility:</span>
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-2">
              <li>Available to undergraduate and graduate students enrolled in neuroscience or related programs.</li>
              <li>Requires proof of active enrollment.</li>
              <li>Student members have a voice but no voting rights.</li>
            </ul>
          </div>
        </div>

        {/* Membership Benefits Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Membership Benefits
          </h3>
          <p className="text-gray-700 mb-4">
            By becoming an EACNA member, you gain access to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Exclusive Neuroscience Research & Publications</li>
            <li>Discounts on Conferences & Workshops</li>
            <li>Professional Development & Continuing Education</li>
            <li>Networking Opportunities with Neuroscience Experts</li>
            <li>Policy & Advocacy Updates on Neuroscience Advancements</li>
          </ul>
        </div>

        {/* How to Apply Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            How to Apply
          </h3>
          <p className="text-gray-700 mb-4">
            <span className="font-bold">Online Application:</span> You can apply by selecting your preferred membership category and completing the application form:
          </p>
          <a 
            href="/membership/become-a-member" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Apply for Membership 🔗
          </a>
          <p className="text-gray-700 mt-4 mb-4">
            <span className="font-bold">Mailing Your Application:</span> Print and complete the membership application form, then send it along with your payment to:
          </p>
          <p className="text-gray-700 mb-4">
            📍 EACNA Membership Services
          </p>
          <p className="text-gray-700 mb-4">
            📍 [Insert EACNA Office Address]
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Applications are processed within 5 business days.</li>
            <li>Membership cards are sent within 10 business days.</li>
          </ul>
        </div>

        {/* Final Note Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Final Note
          </h3>
          <p className="text-gray-700 mb-4">
            EACNA is committed to advancing neuroscience across East Africa by fostering a professional community that supports research, education, and policy development. We look forward to having you as part of our growing network!
          </p>
          <p className="text-gray-700 mb-4">
            🔹 Questions? Contact EACNA Membership Services at 📧 <a href="mailto:membership@eacna.org" className="text-blue-600 hover:text-blue-800 underline">membership@eacna.org</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EACNAPolicies;