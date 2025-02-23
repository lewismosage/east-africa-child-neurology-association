import React, { useState } from "react";
import { FileText } from "lucide-react";

export function NationalPolicies() {
  const [expandedPolicies, setExpandedPolicies] = useState<{ [key: number]: boolean }>({});

  const policies = [
    {
      country: "Kenya",
      pediatricGuidelines: [
        "Standardized protocols for diagnosing and treating neurological disorders in children.",
        "The Ministry of Health has implemented structured clinical guidelines to ensure early diagnosis and appropriate treatment for conditions such as epilepsy, cerebral palsy, and neurodevelopmental disorders.",
        "Government efforts to increase access to specialized pediatric neurology care.",
        "Investments in training programs and specialized centers have been made to address the shortage of pediatric neurologists and improve accessibility to care.",
      ],
      crossBorderHealthcare: [
        "Agreements under the East African Health Protocol for patient referrals.",
        "Kenya has partnered with neighboring countries to establish a referral system that allows patients with complex neurological conditions to receive specialized treatment across borders.",
        "Regulations on medical licensing and recognition of specialists across borders.",
        "Efforts are being made to harmonize medical qualifications within East Africa to ensure that specialists can practice in multiple countries without legal barriers.",
      ],
    },
    {
      country: "Uganda",
      pediatricGuidelines: [
        "National policies on epilepsy management in children.",
        "Uganda has launched national awareness programs to improve the early detection and treatment of epilepsy in children, reducing stigma and ensuring better patient outcomes.",
        "Integration of neurological care into maternal and child health programs.",
        "Pediatric neurology services are now incorporated into national maternal and child health strategies to improve early intervention.",
      ],
      crossBorderHealthcare: [
        "Frameworks for regional collaboration in pediatric neurological research.",
        "Uganda is actively involved in multinational research projects focusing on child neurology, particularly in malaria-induced neurological disorders.",
        "Referral policies for patients seeking treatment in neighboring countries.",
        "There is an established system for referring complex cases to specialized hospitals in Kenya and Rwanda for advanced treatment.",
      ],
    },
    {
      country: "Tanzania",
      pediatricGuidelines: [
        "Expansion of neonatal screening for neurological conditions.",
        "The Tanzanian government is rolling out newborn screening programs for conditions like cerebral palsy and metabolic disorders to enable early interventions.",
        "Government support for neurology training programs for pediatricians.",
        "New training initiatives aim to equip general pediatricians with neurology expertise, addressing the shortage of specialized neurologists.",
      ],
      crossBorderHealthcare: [
        "Bilateral agreements with Kenya and Uganda for cross-border patient care.",
        "These agreements ensure that children requiring specialized neurological care can access treatment beyond national borders without bureaucratic challenges.",
        "Telemedicine initiatives for remote consultations and follow-ups.",
        "Telehealth platforms have been developed to connect patients in remote areas with neurologists in major cities and neighboring countries.",
      ],
    },
    {
      country: "Rwanda",
      pediatricGuidelines: [
        "National programs for early detection of neurodevelopmental disorders.",
        "Rwanda has introduced early screening and intervention programs in public hospitals to diagnose and manage conditions like autism and developmental delays.",
        "Guidelines for integrating mental health with pediatric neurology.",
        "Mental health services are now closely linked with neurological care, ensuring a holistic approach to treating children with neurological and psychiatric conditions.",
      ],
      crossBorderHealthcare: [
        "Recognition of medical qualifications within EAC member states.",
        "Rwandan healthcare professionals can now practice in multiple East African countries without re-certification, improving the availability of pediatric neurology specialists.",
        "Legal framework for data sharing in cross-border patient care.",
        "Laws are being developed to facilitate secure medical record sharing between East African hospitals for improved continuity of care.",
      ],
    },
    {
      country: "Burundi",
      pediatricGuidelines: [
        "National strategy for childhood epilepsy management.",
        "Burundi has launched initiatives to ensure that anti-epileptic drugs are widely available and affordable for children with epilepsy.",
        "Training programs for community health workers on neurological conditions.",
        "Programs are in place to educate frontline health workers on identifying and referring children with possible neurological disorders.",
      ],
      crossBorderHealthcare: [
        "Collaboration with neighboring hospitals for specialist treatments.",
        "Burundian hospitals are working with institutions in Rwanda and Tanzania to provide advanced care for children with complex neurological conditions.",
        "Standardized insurance policies for cross-border patient care.",
        "Discussions are ongoing to ensure that regional health insurance schemes cover treatment in multiple East African countries.",
      ],
    },
    {
      country: "South Sudan",
      pediatricGuidelines: [
        "Developing a national framework for neurological healthcare in children.",
        "The South Sudanese government is in the early stages of creating a structured approach to pediatric neurology, including guidelines for diagnosis and treatment.",
        "Expanding access to essential neurological medications.",
        "Efforts are being made to improve the supply chain for critical neurology medications, particularly anti-seizure drugs.",
      ],
      crossBorderHealthcare: [
        "Partnerships with Kenya and Uganda for advanced neurological treatments.",
        "Due to limited specialized care in South Sudan, agreements have been established to send patients to hospitals in Nairobi and Kampala for treatment.",
        "Mobile health initiatives to support rural and refugee populations.",
        "Mobile health clinics are being used to deliver neurological services to underserved communities and refugee camps.",
      ],
    },
  ];

  // Toggle full content for a policy
  const togglePolicy = (index: number) => {
    setExpandedPolicies((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">
          National Policies and Guidelines
        </h1>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <span className="text-sm font-medium text-blue-600">
                National Guidelines
              </span>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Policies Specific to Pediatric Neurology
          </h3>
          <p className="text-gray-600 mb-4">
            Explore policies related to pediatric neurology and cross-border
            healthcare within member states.
          </p>
          <div className="space-y-4">
            {policies.map((policy, index) => (
              <div key={index} className="border-t border-gray-200 pt-4">
                <h4 className="text-lg font-semibold">{policy.country}</h4>
                <h5 className="font-medium mt-2">Pediatric Neurology Guidelines:</h5>
                <ul className="list-disc list-inside text-gray-600">
                  {policy.pediatricGuidelines
                    .slice(0, expandedPolicies[index] ? policy.pediatricGuidelines.length : 2)
                    .map((point, pointIndex) => (
                      <li key={pointIndex}>{point}</li>
                    ))}
                </ul>
                {policy.pediatricGuidelines.length > 2 && (
                  <button
                    onClick={() => togglePolicy(index)}
                    className="text-blue-600 hover:underline mt-2"
                  >
                    {expandedPolicies[index] ? "Show Less" : "Read More"}
                  </button>
                )}
                <h5 className="font-medium mt-4">Cross-Border Healthcare:</h5>
                <ul className="list-disc list-inside text-gray-600">
                  {policy.crossBorderHealthcare
                    .slice(0, expandedPolicies[index] ? policy.crossBorderHealthcare.length : 2)
                    .map((point, pointIndex) => (
                      <li key={pointIndex}>{point}</li>
                    ))}
                </ul>
                {policy.crossBorderHealthcare.length > 2 && (
                  <button
                    onClick={() => togglePolicy(index)}
                    className="text-blue-600 hover:underline mt-2"
                  >
                    {expandedPolicies[index] ? "Show Less" : "Read More"}
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