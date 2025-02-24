import React, { useState } from "react";
import { FileText, Video, BookOpen, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser"; // For sending emails

const resources = [
  {
    title: "National Policies And Guidelines",
    category: "National Guidelines",
    description:
      "Policies specific to pediatric neurology and cross-border healthcare within member states",
    link: "/national-policies",
  },
  {
    title: "International Guidelines",
    category: "Global Health Practices",
    description:
      "Global standards and recommendations for pediatric neurology and treatment practices",
    link: "/international-guidelines",
  },
  {
    title: "Medical Practice Regulations",
    category: "Legal & Ethical Rules",
    description:
      "Rules governing licensing, ethical standards, and malpractice laws for healthcare professionals",
    link: "/medical-practice-regulations",
  },
  {
    title: "Legislative News",
    category: "Legal Updates",
    description:
      "Updates on legal changes, new developments, or modifications in healthcare-related laws and regulations",
    link: "/legislative-news",
  },
];

export function QueryForm() {
  const [topic, setTopic] = useState("");
  const [email, setEmail] = useState(""); // New state for email
  const [question, setQuestion] = useState<string>("");
  const [status, setStatus] = useState(""); // To show success/error messages

  const handleTopicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTopic(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleQuestionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (event && event.target) {
      setQuestion(event.target.value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Replace with your EmailJS service details
    const serviceID = "service_74d8nvl";
    const templateID = "template_4p30evx";
    const publicKey = "rIk2qL2z7PbpZRi0S";

    const formData = {
      topic,
      email,
      question,
    };

    emailjs
      .send(serviceID, templateID, formData, publicKey)
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setStatus("Query submitted successfully!");
        setTopic("");
        setEmail("");
        setQuestion("");
      })
      .catch((err) => {
        console.error("FAILED...", err);
        setStatus("Failed to submit query. Please try again.");
      });
  };

  return (
    <section className="mt-12 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-primary mb-6">
        Submit a Query
      </h2>
      {status && (
        <p className="text-center text-green-600 mb-4">{status}</p>
      )}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Topic
            </label>
            <select
              value={topic}
              onChange={handleTopicChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              required
            >
              <option value="">Select a topic</option>
              <option value="National Policies">National Policies</option>
              <option value="International Guidelines">
                International Guidelines
              </option>
              <option value="Medical Practice">Medical Practice</option>
              <option value="Legislative Updates">Legislative Updates</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Question
          </label>
          <textarea
            rows={4}
            value={question}
            onChange={handleQuestionChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            placeholder="Type your question here"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Send className="h-5 w-5 mr-2" />
          Submit Query
        </button>
      </form>
    </section>
  );
}

export function Resources() {
  const navigate = useNavigate();

  const getIcon = (category: string) => {
    switch (category) {
      case "National Guidelines":
        return FileText;
      case "Global Health Practices":
        return Video;
      case "Legal & Ethical Rules":
        return BookOpen;
      default:
        return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">
          Healthcare Resources and Guidelines
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource) => {
            const Icon = getIcon(resource.category);
            return (
              <div
                key={resource.title}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => navigate(resource.link)}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <span className="text-sm font-medium text-blue-600">
                        {resource.category}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <QueryForm />
      </div>
    </div>
  );
}