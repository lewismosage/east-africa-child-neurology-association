import React, { useState } from "react";
import { FileText } from "lucide-react";

export function MedicalPracticeRegulations() {
  const [expandedRegulations, setExpandedRegulations] = useState<{ [key: number]: boolean }>({});

  const regulations = [
    {
      title: "Licensing and Accreditation of Healthcare Professionals",
      points: [
        "Requirements for obtaining a medical license.",
        "Healthcare professionals must complete accredited medical training, pass licensing exams, and meet specific experience criteria to practice legally.",
        "Renewal and continuing education mandates.",
        "Many countries require periodic license renewals, which include continued medical education (CME) to ensure professionals stay updated with advancements in their fields.",
        "International recognition of medical qualifications.",
        "Regulations vary by region, with some countries having reciprocal agreements to recognize foreign medical licenses, while others require additional exams or training.",
      ],
    },
    {
      title: "Ethical Standards and Professional Conduct",
      points: [
        "Confidentiality and patient data protection.",
        "Healthcare professionals must adhere to strict regulations regarding patient confidentiality, following laws such as HIPAA (U.S.) or GDPR (Europe) to protect sensitive information.",
        "Informed consent and patient autonomy.",
        "Patients have the right to make informed decisions about their treatment, and physicians must provide clear, accurate information about risks and benefits.",
        "Conflicts of interest and professional integrity.",
        "Medical professionals must avoid financial or personal conflicts of interest that could compromise patient care or research integrity.",
      ],
    },
    {
      title: "Malpractice Laws and Legal Accountability",
      points: [
        "Legal consequences of medical negligence.",
        "Malpractice laws hold healthcare providers accountable for errors, misdiagnoses, or improper treatments that result in patient harm.",
        "The role of medical boards in investigating complaints.",
        "Regulatory bodies oversee professional conduct, investigate malpractice claims, and impose disciplinary actions when necessary.",
        "Protection for healthcare professionals under good faith laws.",
        "Some regulations shield doctors from liability when they provide emergency care or act in good faith under challenging medical situations.",
      ],
    },
    {
      title: "Regulation of Medical Treatments and Procedures",
      points: [
        "Approval processes for new medical treatments.",
        "New drugs, devices, and procedures must go through rigorous clinical trials and receive regulatory approval before being widely used.",
        "Standards for surgical procedures and medical interventions.",
        "International medical boards set guidelines to ensure best practices for patient safety and optimal surgical outcomes.",
        "Ethical considerations in experimental treatments.",
        "Patients participating in clinical trials must be fully informed of risks, and ethical boards oversee studies to prevent exploitation.",
      ],
    },
    {
      title: "Patient Rights and Legal Protections",
      points: [
        "Right to access quality healthcare.",
        "Many countries have laws ensuring that patients receive timely and appropriate medical care, regardless of financial or social status.",
        "Regulations on medical billing and transparency.",
        "Policies aim to prevent overcharging and ensure that patients understand the costs of medical procedures and treatments.",
        "Legal recourse for patients affected by medical errors.",
        "Patients can seek compensation or legal action if they experience harm due to negligence, with many systems offering arbitration or court proceedings.",
      ],
    },
    {
      title: "International and Cross-Border Medical Practice",
      points: [
        "Telemedicine regulations and cross-border healthcare.",
        "With the rise of digital consultations, countries have established rules governing virtual healthcare, including licensing and patient data protection.",
        "Recognition of foreign-trained medical professionals.",
        "Some regions allow foreign doctors to practice under specific conditions, while others require additional certification.",
        "Legal frameworks for medical tourism.",
        "Countries hosting international patients must ensure legal protections, ethical practices, and quality control in medical procedures.",
      ],
    },
  ];

  // Toggle full content for a regulation
  const toggleRegulation = (index: number) => {
    setExpandedRegulations((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">
          Medical Practice Regulations
        </h1>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <span className="text-sm font-medium text-blue-600">
                Legal & Ethical Rules
              </span>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Licensing, Ethics, and Malpractice Laws
          </h3>
          <p className="text-gray-600 mb-4">
            Rules governing licensing, ethical standards, and malpractice laws
            for healthcare professionals.
          </p>
          <div className="space-y-4">
            {regulations.map((regulation, index) => (
              <div key={index} className="border-t border-gray-200 pt-4">
                <h4 className="text-lg font-semibold">{regulation.title}</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {regulation.points
                    .slice(0, expandedRegulations[index] ? regulation.points.length : 2)
                    .map((point, pointIndex) => (
                      <li key={pointIndex}>{point}</li>
                    ))}
                </ul>
                {regulation.points.length > 2 && (
                  <button
                    onClick={() => toggleRegulation(index)}
                    className="text-blue-600 hover:underline mt-2"
                  >
                    {expandedRegulations[index] ? "Show Less" : "Read More"}
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