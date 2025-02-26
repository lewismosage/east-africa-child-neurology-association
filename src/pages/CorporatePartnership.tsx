import React, { useState } from 'react';
import { Building2, Handshake, Download } from 'lucide-react';
import { supabase } from '../../supabaseClient';

export function CorporatePartnership() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // State to manage expanded tiers
  const [expandedTier, setExpandedTier] = useState<string | null>(null);

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
      // Insert data into the `corporate_partnerships` table
      const { data, error } = await supabase
        .from('corporate_partnerships')
        .insert([
          {
            company_name: formData.companyName,
            contact_name: formData.contactName,
            email: formData.email,
            message: formData.message,
          },
        ])
        .select(); // Optional: Return the inserted data

      if (error) throw error;

      // Clear the form and show success message
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        message: '',
      });
      setSuccess(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle expanding/collapsing tiers
  const toggleTier = (tier: string) => {
    if (expandedTier === tier) {
      setExpandedTier(null); // Collapse if already expanded
    } else {
      setExpandedTier(tier); // Expand the clicked tier
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative py-24 bg-gradient-to-r from-[#4A154B] via-[#2E1A47] to-[#1E3A8A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-6">Partner with Us to Make a Difference</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join hands with EACNA to create lasting impact in child neurology care across East Africa.
            </p>
          </div>
        </div>
      </div>

      {/* Partnership Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary">Why Partner with Us?</h2>
          <p className="mt-4 text-lg text-gray-600">
            Corporate partnerships bring mutual benefits and create a lasting impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Strengthen Brand Visibility & Community Engagement</h3>
            <p className="text-gray-600">
              Through our partnership, your brand will gain exposure to a wider audience, showcasing your commitment to social good. You'll be featured in our campaigns, newsletters, and events, helping build trust and deeper engagement with customers and stakeholders who value purpose-driven businesses.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <Handshake className="h-12 w-12 text-blue-600 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Access to a Network of Like-Minded Organizations</h3>
            <p className="text-gray-600">
              Partnering with us connects you to a network of businesses, nonprofits, and industry leaders who share a common goal of creating positive change. This collaboration fosters innovation, knowledge sharing, and new growth opportunities for your organization.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Expand Your Impact & Corporate Social Responsibility (CSR)</h3>
            <p className="text-gray-600">
              Partnering with us allows your company to contribute to meaningful social change, aligning with your Corporate Social Responsibility (CSR) goals. Your support helps drive initiatives that improve lives, foster education, and create sustainable development in communities.
            </p>
          </div>
        </div>
      </div>

      {/* Partnership Tiers Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary">Our Partnership Tiers</h2>
            <p className="mt-4 text-lg text-gray-600">
              Choose a partnership level that aligns with your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Gold Tier */}
            <div className="bg-gray-50 rounded-xl shadow-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-yellow-600 mb-4">Gold Partner</h3>
              <p className="text-gray-600 mb-6">
                Exclusive recognition and premium benefits for top-tier partners.
              </p>
              {expandedTier === 'gold' && (
                <div className="mt-4 text-left">
                  <p className="text-gray-600">
                    <strong>Benefits:</strong>
                  </p>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>Logo placement on all marketing materials</li>
                    <li>Exclusive access to VIP events</li>
                    <li>Priority recognition in newsletters and social media</li>
                  </ul>
                </div>
              )}
              <button
                onClick={() => toggleTier('gold')}
                className="mt-6 px-6 py-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
              >
                {expandedTier === 'gold' ? 'Show Less' : 'Learn More'}
              </button>
            </div>

            {/* Silver Tier */}
            <div className="bg-gray-50 rounded-xl shadow-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-600 mb-4">Silver Partner</h3>
              <p className="text-gray-600 mb-6">
                Significant recognition and impactful benefits for mid-tier partners.
              </p>
              {expandedTier === 'silver' && (
                <div className="mt-4 text-left">
                  <p className="text-gray-600">
                    <strong>Benefits:</strong>
                  </p>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>Logo placement on select marketing materials</li>
                    <li>Access to exclusive events</li>
                    <li>Recognition in newsletters and social media</li>
                  </ul>
                </div>
              )}
              <button
                onClick={() => toggleTier('silver')}
                className="mt-6 px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                {expandedTier === 'silver' ? 'Show Less' : 'Learn More'}
              </button>
            </div>

            {/* Community Tier */}
            <div className="bg-gray-50 rounded-xl shadow-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">Community Partner</h3>
              <p className="text-gray-600 mb-6">
                Recognition and benefits for community-focused partners.
              </p>
              {expandedTier === 'community' && (
                <div className="mt-4 text-left">
                  <p className="text-gray-600">
                    <strong>Benefits:</strong>
                  </p>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>Recognition on our website</li>
                    <li>Access to community events</li>
                    <li>Opportunities for collaboration</li>
                  </ul>
                </div>
              )}
              <button
                onClick={() => toggleTier('community')}
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {expandedTier === 'community' ? 'Show Less' : 'Learn More'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">Express Interest</h3>
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
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
                  Contact Name
                </label>
                <input
                  type="text"
                  id="contactName"
                  value={formData.contactName}
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
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
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

      {/* Download Brochure Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">Download Our Brochure</h3>
          <p className="text-gray-600 mb-6">
            Learn more about our partnership opportunities and impact.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <Download className="h-5 w-5 mr-2 inline" />
            Download Brochure
          </button>
        </div>
      </div>
    </div>
  );
}