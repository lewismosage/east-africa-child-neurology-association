import React from 'react';
import { BookOpen, FileText, Video, Download } from 'lucide-react';

const resources = [
  {
    id: 1,
    title: 'Clinical Guidelines',
    description: 'Standard protocols for common pediatric neurological conditions',
    icon: FileText,
    items: [
      'Epilepsy Management Guidelines',
      'Neurodevelopmental Disorders Protocol',
      'Neuroimaging Guidelines',
    ],
  },
  {
    id: 2,
    title: 'Educational Materials',
    description: 'Learning resources for healthcare professionals',
    icon: BookOpen,
    items: [
      'Case Studies Collection',
      'Diagnostic Approaches',
      'Treatment Strategies',
    ],
  },
  {
    id: 3,
    title: 'Video Library',
    description: 'Recorded lectures and procedural demonstrations',
    icon: Video,
    items: [
      'Expert Lectures Series',
      'Clinical Examination Techniques',
      'Patient Case Presentations',
    ],
  },
];

const ResourcesPage = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary">Resources</h2>
          <p className="mt-4 text-xl text-gray-500">
            Access our comprehensive collection of educational materials and clinical resources
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <div
                key={resource.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Icon className="h-6 w-6 text-primary mr-2" />
                    <h3 className="text-xl font-semibold text-gray-900">{resource.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <ul className="space-y-2">
                    {resource.items.map((item, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <Download className="h-4 w-4 text-primary mr-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;