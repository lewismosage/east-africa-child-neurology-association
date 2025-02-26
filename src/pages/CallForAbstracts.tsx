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
            We invite researchers, professionals, and students to submit abstracts
            for our upcoming conferences and workshops. Share your research and
            contribute to advancing child neurology in East Africa.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-primary mb-6">
            Submission Guidelines
          </h3>
          <ul className="list-disc list-inside space-y-4 text-gray-700">
            <li>Abstracts should be in Word or PDF format.</li>
            <li>Maximum 300 words.</li>
            <li>
              Include title, author(s), institution, and contact email.
            </li>
            <li>
              Email submissions before Deadline Date.
            </li>
          </ul>

          <div className="mt-8 text-center">
            <a
              href="mailto:info@eacna.org?subject=Abstract Submission - EACNA Conference&body=Dear EACNA Committee,%0D%0A%0D%0APlease find attached my abstract submission.%0D%0A%0D%0AName:%0D%0AInstitution:%0D%0AAbstract Title:%0D%0A%0D%0ARegards,%0D%0A[Your Name]"
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors"
            >
              Submit Abstract
            </a>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-primary mb-4">
            Need Help?
          </h3>
          <p className="text-gray-600">
            Contact us at{" "}
            <a
              href="mailto:info@eacna.org"
              className="text-blue-600 hover:underline"
            >
              info@eacna.org
            </a>{" "}
            or call us at{" "}
            <a
              href="tel:+254123456789"
              className="text-blue-600 hover:underline"
            >
              +254 123 456 789
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default CallForAbstracts;