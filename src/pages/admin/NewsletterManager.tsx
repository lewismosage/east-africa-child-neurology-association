import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import emailjs from "@emailjs/browser";

const NewsletterManager = () => {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Fetch subscribers from Supabase
  useEffect(() => {
    const fetchSubscribers = async () => {
      const { data, error } = await supabase
        .from("subscribers")
        .select("*")
        .order("subscription_date", { ascending: false });

      if (error) {
        console.error("Error fetching subscribers:", error);
        setNotification({ type: "error", message: "Failed to fetch subscribers." });
      } else {
        setSubscribers(data || []);
      }
    };

    fetchSubscribers();
  }, []);

  // Filter subscribers by email
  const filteredSubscribers = subscribers.filter((subscriber) =>
    subscriber.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle sending newsletter
  const handleSendNewsletter = async () => {
    setLoading(true);
    try {
      // Send newsletter to all subscribers using EmailJS
      const serviceID = "YOUR_EMAILJS_SERVICE_ID";
      const templateID = "YOUR_EMAILJS_TEMPLATE_ID";
      const publicKey = "YOUR_EMAILJS_PUBLIC_KEY";

      const emails = subscribers.map((subscriber) => subscriber.email);

      const emailPromises = emails.map((email) =>
        emailjs.send(serviceID, templateID, { to_email: email, subject, message }, publicKey)
      );

      await Promise.all(emailPromises);

      setNotification({ type: "success", message: "Newsletter sent successfully!" });
      setShowSendModal(false);
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Error sending newsletter:", error);
      setNotification({ type: "error", message: "Failed to send newsletter." });
    } finally {
      setLoading(false);
    }
  };

  // Handle unsubscribe
  const handleUnsubscribe = async (id: string) => {
    if (window.confirm("Are you sure you want to unsubscribe this user?")) {
      const { error } = await supabase.from("subscribers").delete().eq("id", id);

      if (error) {
        console.error("Error unsubscribing:", error);
        setNotification({ type: "error", message: "Failed to unsubscribe." });
      } else {
        setSubscribers((prev) => prev.filter((subscriber) => subscriber.id !== id));
        setNotification({ type: "success", message: "Subscriber removed successfully!" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-primary mb-8">News & Newsletters Manager</h1>

      {/* Notification */}
      {notification && (
        <div
          className={`p-4 mb-8 rounded-lg ${
            notification.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Subscriber List */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Subscriber List</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Subscription Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSubscribers.map((subscriber) => (
                <tr key={subscriber.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{subscriber.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(subscriber.subscription_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <button
                      onClick={() => handleUnsubscribe(subscriber.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Unsubscribe
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Send Newsletter Form */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Send Newsletter</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShowSendModal(true);
          }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
          >
            Send Newsletter
          </button>
        </form>
      </section>

      {/* Send Newsletter Confirmation Modal */}
      {showSendModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Confirm Newsletter Send</h3>
            <p className="mb-6">Are you sure you want to send this newsletter to all subscribers?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowSendModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSendNewsletter}
                disabled={loading}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsletterManager;