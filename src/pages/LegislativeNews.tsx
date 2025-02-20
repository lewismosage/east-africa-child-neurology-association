import React from "react";
import { FileText } from "lucide-react";

export function LegislativeNews() {
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
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-lg font-semibold">Update 1: Example Title</h4>
              <p className="text-gray-600">
                Description of the legislative update and its impact.
              </p>
              <a
                href="#"
                className="text-blue-600 hover:underline"
              >
                Read More
              </a>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-lg font-semibold">Update 2: Example Title</h4>
              <p className="text-gray-600">
                Description of the legislative update and its impact.
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