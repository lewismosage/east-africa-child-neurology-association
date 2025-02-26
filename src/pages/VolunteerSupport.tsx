import React, { useState } from 'react';
import { Users, Heart, Calendar, Mail, GraduationCap } from 'lucide-react';
import { supabase } from '../../supabaseClient'; 

export function VolunteerSupport() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    skills: '',
    availability: '',
    preferredRole: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Insert data into the `volunteers` table
      const { data, error } = await supabase
        .from('volunteers')
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            skills: formData.skills,
            availability: formData.availability,
            preferred_role: formData.preferredRole,
            message: formData.message, // Include the message field
          },
        ])
        .select(); // Optional: Return the inserted data

      if (error) {
        console.error('Supabase Error:', error);
        throw error;
      }

      // Clear the form and show success message
      setFormData({
        fullName: '',
        email: '',
        skills: '',
        availability: '',
        preferredRole: '',
        message: '', // Clear the message field
      });
      setSuccess(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative py-24 bg-gradient-to-r from-[#4A154B] via-[#2E1A47] to-[#1E3A8A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-6">Get Involved and Make an Impact</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join our volunteer programs and contribute to improving child neurology care in East Africa.
            </p>
          </div>
        </div>
      </div>

      {/* Volunteer Opportunities Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary">Volunteer Opportunities</h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore ways to contribute your time and skills to our cause.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Outreach and Patient Support</h3>
            <p className="text-gray-600">
              Engage directly with children and families affected by neurological conditions by providing emotional support, educational resources, and guidance. Volunteers can assist in home visits, hospital support programs, and community-based awareness initiatives to improve patient well-being and access to care.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <GraduationCap className="h-12 w-12 text-blue-600 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Educational & Training Programs</h3>
            <p className="text-gray-600">
              Support knowledge-sharing initiatives by assisting in workshops, mentorship programs, and training sessions. Volunteers can help facilitate learning experiences for caregivers, medical students, and communities, enhancing their understanding of child neurology.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Awareness & Advocacy Campaigns</h3>
            <p className="text-gray-600">
              Help raise awareness about neurological health by participating in advocacy efforts, social media campaigns, and community events. Volunteers can assist in organizing workshops, distributing informational materials, and engaging with the public to spread knowledge and support.
            </p>
          </div>
        </div>
      </div>

      {/* Volunteer Sign-Up Form */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-primary mb-8 text-center">Sign Up to Volunteer</h3>
              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  Thank you for your interest! We will get back to you soon.
                </div>
              )}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                  {error}
                </div>
              )}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                    Skills and Expertise
                  </label>
                  <textarea
                    id="skills"
                    rows={3}
                    value={formData.skills}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                    Availability
                  </label>
                  <input
                    type="text"
                    id="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="preferredRole" className="block text-sm font-medium text-gray-700">
                    Preferred Role
                  </label>
                  <input
                    type="text"
                    id="preferredRole"
                    value={formData.preferredRole}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}