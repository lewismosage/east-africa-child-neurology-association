import React from "react";

const FAQs = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-7xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-primary">
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
                  {/* New FAQs */}
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-semibold mb-2">What is EACNA?</h3>
                    <p className="text-gray-700">
                      EACNA (East African Child Neurology Association) is an
                      organization dedicated to improving neurological care for
                      children in East Africa through education, research, and
                      advocacy.
                    </p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-semibold mb-2">Who can join EACNA?</h3>
                    <p className="text-gray-700">
                      Membership is open to neurologists, pediatricians,
                      researchers, healthcare professionals, medical students,
                      and anyone with an interest in child neurology.
                    </p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-semibold mb-2">
                      How can I become a member?
                    </h3>
                    <p className="text-gray-700">
                      You can become a member by filling out the membership
                      application form on our website and paying the required
                      membership fee.
                    </p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-semibold mb-2">
                      What are the benefits of EACNA membership?
                    </h3>
                    <p className="text-gray-700">
                      Members get access to:
                      <ul className="list-disc list-inside pl-5 mt-2">
                        <li>Conferences and workshops</li>
                        <li>Research collaborations</li>
                        <li>Training and educational resources</li>
                        <li>
                          Networking opportunities with experts in child neurology
                        </li>
                      </ul>
                    </p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-semibold mb-2">
                      What events does EACNA organize?
                    </h3>
                    <p className="text-gray-700">
                      We host annual conferences, workshops, and training
                      sessions focused on child neurology, research, and clinical
                      advancements.
                    </p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-semibold mb-2">
                      How can I submit an abstract for a conference?
                    </h3>
                    <p className="text-gray-700">
                      You can submit your abstract by emailing it to{" "}
                      <a
                        href="mailto:info@eacna.org"
                        className="text-blue-600 hover:underline"
                      >
                        info@eacna.org
                      </a>{" "}
                      with the subject line "Abstract Submission – [Your Topic]".
                    </p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-semibold mb-2">
                      What is the deadline for abstract submissions?
                    </h3>
                    <p className="text-gray-700">
                      Abstract submission deadlines vary per event. Please check
                      the specific event page or announcements for details.
                    </p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-semibold mb-2">
                      How can I stay updated on EACNA activities?
                    </h3>
                    <p className="text-gray-700">
                      Subscribe to our newsletter and follow us on social media
                      for the latest updates on conferences, workshops, and
                      research.
                    </p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-semibold mb-2">
                      How can I contribute to EACNA’s publications?
                    </h3>
                    <p className="text-gray-700">
                      Registered members have the opportunity to write and publish
                      their own research articles. Once submitted, articles go
                      through an approval process by the admin team. Upon
                      approval, the article will be published on the Research &
                      Publications page of our website.
                    </p>
                  </div>

                  {/* Moved FAQs to the bottom */}
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-semibold mb-2">
                      How can I access past newsletters?
                    </h3>
                    <p className="text-gray-700">
                      Members can access all past newsletters through their account
                      dashboard.
                    </p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-semibold mb-2">
                      How often are news updates published?
                    </h3>
                    <p className="text-gray-700">
                      We publish news updates weekly, with major announcements as
                      they occur.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">
                      Can I submit news for publication?
                    </h3>
                    <p className="text-gray-700">
                      Members can submit news items for consideration through
                      their account portal.
                    </p>
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