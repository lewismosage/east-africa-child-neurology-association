import React, { useState } from "react";
import { Heart, Gift, Users, Coins, Calendar, HandHeart, Handshake } from "lucide-react";
import { supabase } from "../../supabaseClient"; // Adjust the import path

export function SupportOurCause() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    donationAmount: "",
    transactionId: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Insert data into the `donations` table
      const { data, error } = await supabase
        .from("donations")
        .insert([
          {
            full_name: formData.fullName,
            phone_number: formData.phoneNumber,
            email: formData.email,
            donation_amount: formData.donationAmount,
            transaction_id: formData.transactionId,
            message: formData.message,
          },
        ])
        .select(); // Optional: Return the inserted data

      if (error) throw error;

      // Clear the form and show success message
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        donationAmount: "",
        transactionId: "",
        message: "",
      });
      setSuccess(true);
    } catch (err) {
      console.error("Error submitting donation:", err);
      setError("Failed to submit the donation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const ways = [
    {
      icon: Gift,
      title: "Make a Donation",
      description: "Support our programs through financial contributions",
      action: "Donate Now",
      href: "#donate", // Anchor link to the donation form section
    },
    {
      icon: Users,
      title: "Corporate Partnership",
      description: "Partner with us to create lasting impact",
      action: "Become a Partner",
      href: "/about-us/support-our-cause/corporate-partnership",
    },
    {
      icon: Handshake,
      title: "Volunteer Support",
      description: "Join or contribute to volunteer support initiatives",
      action: "Get Involved",
      href: "/about-us/support-our-cause/volunteer-support",
    },
  ];

  const impactAreas = [
    {
      title: "Medical Equipment",
      description: "Help us provide essential medical equipment to hospitals and clinics",
      amount: "Ksh 10,000,000",
      progress: 65,
    },
    {
      title: "Training Programs",
      description: "Support professional development programs for healthcare workers",
      amount: "Ksh 25,000,000",
      progress: 40,
    },
    {
      title: "Research Initiatives",
      description: "Fund critical research in child neurology",
      amount: "Ksh 5,000,000",
      progress: 25,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative py-24 bg-gradient-to-r from-[#4A154B] via-[#2E1A47] to-[#1E3A8A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-6">Support Our Cause</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Help us make quality neurological care accessible to every child in East Africa
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Ways to Support */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary">Ways to Support</h2>
          <p className="mt-4 text-lg text-gray-600">
            Every contribution makes a difference in a child's life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {ways.map((way) => {
            const Icon = way.icon;
            return (
              <div key={way.title} className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{way.title}</h3>
                <p className="text-gray-600 mb-6">{way.description}</p>
                <a
                  href={way.href}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  {way.action}
                </a>
              </div>
            );
          })}
        </div>

        {/* Current Initiatives */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-primary mb-8 text-center">Current Initiatives</h3>
          <div className="space-y-8">
            {impactAreas.map((area) => (
              <div key={area.title} className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{area.title}</h4>
                    <p className="text-gray-600">{area.description}</p>
                  </div>
                  <span className="text-xl font-bold text-blue-600">{area.amount}</span>
                </div>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                        Progress
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        {area.progress}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <div
                      style={{ width: `${area.progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Donation Form */}
        <div id="donate" className="bg-white rounded-xl shadow-lg p-8">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">Make a Donation</h3>
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                Thank you for your donation! We will get back to you soon.
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
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={formData.phoneNumber}
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
                <label htmlFor="donationAmount" className="block text-sm font-medium text-gray-700">
                  Donation Amount
                </label>
                <input
                  type="number"
                  id="donationAmount"
                  value={formData.donationAmount}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Ksh 0.00"
                  required
                />
              </div>
              <div>
                <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700">
                  Transaction ID
                </label>
                <input
                  type="text"
                  id="transactionId"
                  value={formData.transactionId}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                ></textarea>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>MPESA PAYBILL:</strong> 12345
                </p>
                <p className="text-sm text-gray-600">
                  <strong>ACCOUNT NUMBER:</strong> 12345
                </p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:bg-blue-300"
              >
                {loading ? "Submitting..." : "Complete Donation"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}