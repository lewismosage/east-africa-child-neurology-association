import React from "react";
import { Video } from "lucide-react";

export function InternationalGuidelines() {
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
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-lg font-semibold">Guideline 1: Example Title</h4>
              <p className="text-gray-600">
                Description of the guideline and its global implications.
              </p>
              <a
                href="#"
                className="text-blue-600 hover:underline"
              >
                Read More
              </a>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-lg font-semibold">Guideline 2: Example Title</h4>
              <p className="text-gray-600">
                Description of the guideline and its global implications.
              </p>
              <a
                href="#"
                className="text-blue-600 hover:underline"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}