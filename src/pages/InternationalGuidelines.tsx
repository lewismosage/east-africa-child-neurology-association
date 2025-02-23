import React, { useState } from "react";
import { Video } from "lucide-react";

export function InternationalGuidelines() {
  const [expandedGuidelines, setExpandedGuidelines] = useState<{ [key: number]: boolean }>({});

  const guidelines = [
    {
      title: "General Principles of Neurological Care",
      points: [
        "Adherence to evidence-based clinical practices for diagnosis and treatment.",
        "International neurological associations emphasize the importance of using scientifically validated methods to diagnose and treat neurological conditions, ensuring uniformity in patient care.",
        "Ethical standards in patient care, research, and clinical trials.",
        "Guidelines from organizations such as the World Health Organization (WHO) and the International Child Neurology Association (ICNA) stress ethical considerations, including patient consent, data protection, and the humane treatment of children with neurological disorders.",
        "Continuous medical education and professional development.",
        "Neurologists are encouraged to participate in ongoing training, research, and knowledge exchange programs to stay updated with advancements in pediatric neurology.",
      ],
    },
    {
      title: "Diagnosis and Early Intervention",
      points: [
        "Standardized diagnostic criteria for pediatric neurological disorders.",
        "International frameworks, such as those from the American Academy of Neurology (AAN), provide clear guidelines for diagnosing conditions like epilepsy, autism spectrum disorder, and cerebral palsy.",
        "Importance of newborn screening and early intervention.",
        "The WHO recommends early screening for metabolic and genetic disorders that could lead to neurological impairments, enabling timely treatment and better outcomes.",
        "Advancements in neuroimaging and genetic testing.",
        "Global research highlights the role of technologies like MRI, CT scans, and genetic screening in the accurate diagnosis of pediatric neurological conditions.",
      ],
    },
    {
      title: "Treatment and Management Protocols",
      points: [
        "Global recommendations for epilepsy treatment in children.",
        "The International League Against Epilepsy (ILAE) has outlined treatment protocols that consider medication access, affordability, and effectiveness based on patient-specific needs.",
        "Guidelines on the management of neurodevelopmental disorders.",
        "Treatment recommendations for conditions such as ADHD and autism focus on behavioral therapies, educational support, and, when necessary, pharmacological interventions.",
        "Rehabilitation strategies for children with neurological impairments.",
        "The WHO promotes multidisciplinary rehabilitation programs, including physiotherapy, occupational therapy, and speech therapy, to improve the quality of life for children with neurological disabilities.",
      ],
    },
    {
      title: "Access to Neurological Care and Medications",
      points: [
        "Ensuring equitable access to essential neurology medications.",
        "International organizations advocate for the inclusion of essential neurological drugs, such as anti-epileptics and neuroprotective agents, in national healthcare programs to improve availability.",
        "Addressing disparities in pediatric neurological care across regions.",
        "Guidelines highlight the need for policies that reduce healthcare inequalities, ensuring that children in low-resource settings receive timely and appropriate treatment.",
        "Telemedicine and digital health solutions for remote consultations.",
        "With advancements in digital health, telemedicine is being promoted as a solution to provide pediatric neurological care to underserved communities globally.",
      ],
    },
    {
      title: "Research, Innovation, and Emerging Therapies",
      points: [
        "International collaboration in pediatric neurology research.",
        "Leading research institutions worldwide work together to develop better diagnostic tools, treatment protocols, and disease-modifying therapies.",
        "Breakthroughs in gene therapy and personalized medicine.",
        "Recent innovations in genetics and molecular biology have paved the way for targeted treatments for rare neurological disorders, such as spinal muscular atrophy and Duchenne muscular dystrophy.",
        "The role of artificial intelligence in pediatric neurology.",
        "AI-powered diagnostic tools are being integrated into clinical practice to enhance the accuracy and speed of neurological disorder detection in children.",
      ],
    },
    {
      title: "Global Public Health Initiatives",
      points: [
        "WHO’s efforts to reduce the burden of pediatric neurological disorders.",
        "The WHO has launched initiatives aimed at raising awareness, improving access to care, and strengthening healthcare infrastructure for childhood neurological diseases.",
        "Advocacy for improved funding and policy development in neurology.",
        "International organizations are urging governments to invest in pediatric neurology services, research, and patient support programs.",
        "The role of NGOs and professional bodies in supporting pediatric neurology.",
        "Various nonprofit organizations work on providing funding, training, and medical supplies to improve child neurology care worldwide.",
      ],
    },
  ];

  // Toggle full content for a guideline
  const toggleGuideline = (index: number) => {
    setExpandedGuidelines((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">
          International Guidelines
        </h1>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Video className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <span className="text-sm font-medium text-blue-600">
                Global Health Practices
              </span>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Global Standards for Pediatric Neurology
          </h3>
          <p className="text-gray-600 mb-4">
            Explore international standards and recommendations for pediatric
            neurology and treatment practices.
          </p>
          <div className="space-y-4">
            {guidelines.map((guideline, index) => (
              <div key={index} className="border-t border-gray-200 pt-4">
                <h4 className="text-lg font-semibold">{guideline.title}</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {guideline.points
                    .slice(0, expandedGuidelines[index] ? guideline.points.length : 2)
                    .map((point, pointIndex) => (
                      <li key={pointIndex}>{point}</li>
                    ))}
                </ul>
                {guideline.points.length > 2 && (
                  <button
                    onClick={() => toggleGuideline(index)}
                    className="text-blue-600 hover:underline mt-2"
                  >
                    {expandedGuidelines[index] ? "Show Less" : "Read More"}
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