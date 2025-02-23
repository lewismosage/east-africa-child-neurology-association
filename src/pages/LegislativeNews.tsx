import React, { useState } from "react";
import { FileText } from "lucide-react";

export function LegislativeNews() {
  const [expandedUpdates, setExpandedUpdates] = useState<{ [key: number]: boolean }>({});

  const updates = [
    {
      title: "Recent Amendments to Healthcare Laws",
      points: [
        "New regulations on medical licensing and professional accreditation.",
        "Governments are tightening requirements for medical licenses, ensuring professionals meet updated training and experience standards before practicing.",
        "Changes in telemedicine laws and virtual healthcare services.",
        "Many countries are redefining telemedicine policies to ensure secure patient-doctor interactions, cross-border healthcare, and insurance coverage for remote consultations.",
        "Updated drug approval and prescription regulations.",
        "Stricter rules are being introduced to monitor the approval of new medications, combat counterfeit drugs, and regulate opioid prescriptions to prevent abuse.",
      ],
    },
    {
      title: "Patient Rights and Legal Protections",
      points: [
        "New policies enhancing patient data privacy and security.",
        "Laws like GDPR (Europe) and HIPAA (USA) are being reinforced to protect sensitive medical information and prevent unauthorized access.",
        "Laws regulating medical consent and ethical treatment.",
        "Governments are revising consent policies to ensure patients, especially minors and vulnerable groups, fully understand treatment risks and benefits.",
        "Expanded legal pathways for patients seeking malpractice claims.",
        "Reforms in healthcare laws now make it easier for patients to file claims against medical negligence, ensuring faster resolution of disputes.",
      ],
    },
    {
      title: "Healthcare Funding and Insurance Policy Updates",
      points: [
        "New government initiatives to improve healthcare access.",
        "Some countries are increasing public healthcare funding, expanding free medical services, and introducing universal health coverage programs.",
        "Revisions in medical insurance regulations.",
        "Updates include caps on out-of-pocket expenses, insurance coverage for previously excluded conditions, and simplified claims processes.",
        "Legislation to support lower-income and rural healthcare access.",
        "Governments are introducing incentives for medical professionals to work in underserved areas and funding mobile clinics to improve rural healthcare.",
      ],
    },
    {
      title: "Public Health and Epidemic Response Legislation",
      points: [
        "Stronger legal frameworks for pandemic preparedness.",
        "Governments are enacting laws to establish rapid response systems, stockpiling essential medical supplies, and improving disease surveillance.",
        "Updated vaccine mandates and immunization policies.",
        "New regulations are being introduced to enforce childhood vaccination programs and mandatory immunization for healthcare workers.",
        "International collaboration on disease control policies.",
        "Countries are signing agreements for shared research, cross-border medical assistance, and real-time data exchange to combat global health threats.",
      ],
    },
    {
      title: "Medical Research and Clinical Trials Regulation",
      points: [
        "New ethical guidelines for clinical trials.",
        "Laws are being revised to ensure research subjects provide informed consent and are protected from exploitation in experimental treatments.",
        "Increased government oversight on genetic research and biotechnology.",
        "Legislators are introducing restrictions on genetic modifications and AI-driven diagnostics to address ethical concerns.",
        "Stronger regulations on pharmaceutical companies and drug patents.",
        "Updates aim to prevent price inflation, ensure transparency in drug development, and promote access to affordable medications.",
      ],
    },
    {
      title: "Mental Health and Disability Rights Legislation",
      points: [
        "New laws improving access to mental health services.",
        "Countries are implementing policies to integrate mental healthcare into primary healthcare systems and expand insurance coverage for psychiatric treatments.",
        "Disability rights and legal protections in healthcare.",
        "Updates include stronger anti-discrimination laws, accessible healthcare facilities, and employment protections for individuals with disabilities.",
        "Legal recognition of mental health in workplace policies.",
        "Some nations now require companies to implement mental health programs, provide counseling services, and create policies for stress management.",
      ],
    },
  ];

  // Toggle full content for an update
  const toggleUpdate = (index: number) => {
    setExpandedUpdates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">
          Legislative News
        </h1>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <span className="text-sm font-medium text-blue-600">
                Legal Updates
              </span>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Updates on Healthcare Laws and Regulations
          </h3>
          <p className="text-gray-600 mb-4">
            Stay informed about changes, updates, and new developments in
            healthcare-related laws and regulations.
          </p>
          <div className="space-y-4">
            {updates.map((update, index) => (
              <div key={index} className="border-t border-gray-200 pt-4">
                <h4 className="text-lg font-semibold">{update.title}</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {update.points
                    .slice(0, expandedUpdates[index] ? update.points.length : 2)
                    .map((point, pointIndex) => (
                      <li key={pointIndex}>{point}</li>
                    ))}
                </ul>
                {update.points.length > 2 && (
                  <button
                    onClick={() => toggleUpdate(index)}
                    className="text-blue-600 hover:underline mt-2"
                  >
                    {expandedUpdates[index] ? "Show Less" : "Read More"}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}