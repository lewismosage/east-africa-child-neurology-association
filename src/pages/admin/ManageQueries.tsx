import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import emailjs from "@emailjs/browser";

interface Query {
  id: string;
  topic: string;
  name?: string; // Optional for healthcare_queries
  email: string;
  message?: string; // Optional for contact_us_queries
  question?: string; // Optional for contact_us_queries
  created_at: string;
  status: string;
  type: "contact_us_queries" | "healthcare_queries";
}

const ManageQueries = () => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null); // Track the selected message for modal
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false); // Track modal visibility

  // Fetch Queries
  const fetchQueries = async () => {
    try {
      const { data, error } = await supabase
        .from("queries")
        .select("*")
        .eq("status", "pending") // Fetch only pending queries
        .order("created_at", { ascending: false });

      if (error) throw error;
      setQueries(data || []);
    } catch (err) {
      console.error("Error fetching queries:", err);
      setError("Failed to fetch queries.");
    }
  };

  // Handle Respond Button Click
  const handleRespond = (query: Query) => {
    setSelectedQuery(query);
    setResponseMessage("");
    setStatusMessage(null); // Clear any previous status message
  };

  // Handle Sending Response
  const handleSendResponse = async (e: React.FormEvent, query: Query) => {
    e.preventDefault();

    const serviceID = "service_74d8nvl";
    const templateID = "template_4p30evx";
    const publicKey = "rIk2qL2z7PbpZRi0S";

    const templateParams = {
      to_email: query.email,
      from_name: "EACNA",
      message: responseMessage,
    };

    try {
      // Send the response via EmailJS
      await emailjs.send(serviceID, templateID, templateParams, publicKey);

      // Update the query status to "responded" in Supabase
      const { error } = await supabase
        .from("queries")
        .update({ status: "responded" })
        .eq("id", query.id);

      if (error) throw error;

      // Show success message
      setStatusMessage("Response sent successfully!");

      // Refresh the list of queries
      await fetchQueries();

      // Clear the selected query and response message
      setSelectedQuery(null);
      setResponseMessage("");
    } catch (err) {
      console.error("Error sending response:", err);
      setStatusMessage("Failed to send response. Please try again.");
    }
  };

  // Open modal with the selected message
  const handleViewMessage = (message: string) => {
    setSelectedMessage(message);
    setIsMessageModalOpen(true);
  };

  // Close modal
  const closeMessageModal = () => {
    setIsMessageModalOpen(false);
    setSelectedMessage(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchQueries();
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Manage Queries</h1>

      {/* Status Message */}
      {statusMessage && (
        <div className={`mb-4 p-4 rounded-lg ${statusMessage.includes("successfully") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {statusMessage}
        </div>
      )}

      {/* Response Section */}
      {selectedQuery && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Respond to Query</h2>
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900">Query Details</h3>
            {selectedQuery.type === "contact_us_queries" && (
              <>
                <p className="text-sm text-gray-600">
                  <strong>Name:</strong> {selectedQuery.name}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Email:</strong> {selectedQuery.email}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Message:</strong> {selectedQuery.message}
                </p>
              </>
            )}
            {selectedQuery.type === "healthcare_queries" && (
              <>
                <p className="text-sm text-gray-600">
                  <strong>Email:</strong> {selectedQuery.email}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Question:</strong> {selectedQuery.question}
                </p>
              </>
            )}
          </div>
          <form onSubmit={(e) => handleSendResponse(e, selectedQuery)}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Response
              </label>
              <textarea
                rows={4}
                value={responseMessage}
                onChange={(e) => setResponseMessage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Type your response here"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
            >
              Send Response
            </button>
          </form>
        </div>
      )}

      {/* Queries Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Queries</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <table className="min-w-full">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Topic</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Message/Question</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {queries.map((query) => {
                  const messageOrQuestion =
                    query.type === "contact_us_queries" ? query.message : query.question;
                  const isLongMessage = messageOrQuestion && messageOrQuestion.length > 50;

                  return (
                    <tr key={query.id}>
                      <td className="px-6 py-4 text-sm text-gray-900">{query.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{query.topic}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{query.name || "-"}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{query.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {isLongMessage ? (
                          <>
                            {messageOrQuestion.slice(0, 50)}...
                            <button
                              onClick={() => handleViewMessage(messageOrQuestion)}
                              className="text-blue-600 hover:text-blue-900 ml-2"
                            >
                              View More
                            </button>
                          </>
                        ) : (
                          messageOrQuestion
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {new Date(query.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <button
                          onClick={() => handleRespond(query)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Respond
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Modal for Viewing Full Message */}
      {isMessageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Full Message</h3>
            <p className="text-gray-600">{selectedMessage}</p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeMessageModal}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageQueries;