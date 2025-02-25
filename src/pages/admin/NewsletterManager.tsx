import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import emailjs from "@emailjs/browser";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS

interface Subscriber {
  id: string;
  email: string;
  subscription_date: string;
}

interface NewsUpdate {
  id: string;
  title: string;
  content: string;
  date: string;
  type: string;
}

const NewsletterManager = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // State for news updates
  const [newsUpdates, setNewsUpdates] = useState<NewsUpdate[]>([]);
  const [editNews, setEditNews] = useState<NewsUpdate | null>(null);
  const [newNewsTitle, setNewNewsTitle] = useState("");
  const [newNewsContent, setNewNewsContent] = useState("");
  const [newNewsType, setNewNewsType] = useState("news");
  const [newNewsDate, setNewNewsDate] = useState<Date | null>(new Date()); // State for the date picker
  const [buttonText, setButtonText] = useState("Add News"); // State for button text

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

  // Fetch news updates from Supabase
  useEffect(() => {
    const fetchNewsUpdates = async () => {
      const { data, error } = await supabase
        .from("news_updates")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        console.error("Error fetching news updates:", error);
        setNotification({ type: "error", message: "Failed to fetch news updates." });
      } else {
        setNewsUpdates(data || []);
      }
    };

    fetchNewsUpdates();
  }, []);

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

  // Handle sending newsletter
  const handleSendNewsletter = async () => {
    setLoading(true);
    try {
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

  // Handle adding/editing news
  const handleSaveNews = async () => {
    if (!newNewsTitle || !newNewsContent || !newNewsType || !newNewsDate) {
      setNotification({ type: "error", message: "Please fill all fields." });
      return;
    }

    setLoading(true);
    try {
      if (editNews) {
        // Update existing news
        const { error } = await supabase
          .from("news_updates")
          .update({ title: newNewsTitle, content: newNewsContent, type: newNewsType, date: newNewsDate.toISOString() })
          .eq("id", editNews.id);

        if (error) throw error;
        setNotification({ type: "success", message: "News updated successfully!" });
      } else {
        // Add new news
        const { error } = await supabase
          .from("news_updates")
          .insert([{ title: newNewsTitle, content: newNewsContent, type: newNewsType, date: newNewsDate.toISOString() }]);

        if (error) throw error;
        setNotification({ type: "success", message: "News added successfully!" });
        setButtonText("Added"); // Change button text to "Added"
        setTimeout(() => setButtonText("Add News"), 2000); // Reset after 2 seconds
      }

      // Refresh news list
      const { data } = await supabase.from("news_updates").select("*").order("date", { ascending: false });
      setNewsUpdates(data || []);
      setEditNews(null);
      setNewNewsTitle("");
      setNewNewsContent("");
      setNewNewsType("news");
      setNewNewsDate(new Date());
    } catch (error) {
      console.error("Error saving news:", error);
      setNotification({ type: "error", message: "Failed to save news." });
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting news
  const handleDeleteNews = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this news?")) {
      setLoading(true);
      try {
        const { error } = await supabase.from("news_updates").delete().eq("id", id);
        if (error) throw error;

        // Refresh news list
        const { data } = await supabase.from("news_updates").select("*").order("date", { ascending: false });
        setNewsUpdates(data || []);
        setNotification({ type: "success", message: "News deleted successfully!" });
      } catch (error) {
        console.error("Error deleting news:", error);
        setNotification({ type: "error", message: "Failed to delete news." });
      } finally {
        setLoading(false);
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Subscriber List</h2>
          <span className="text-gray-600">Total Subscribers: {subscribers.length}</span>
        </div>
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
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <table className="min-w-full">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Subscription Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {subscribers
                  .filter((subscriber) =>
                    subscriber.email.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((subscriber) => (
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
        </div>
      </section>

      {/* Send Newsletter Form */}
      <section className="mb-12">
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

      {/* Latest News & Newsletter Updates */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Latest News, Press Release & Newsletter Updates</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              value={newNewsTitle}
              onChange={(e) => setNewNewsTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
            />
            <textarea
              placeholder="Content"
              value={newNewsContent}
              onChange={(e) => setNewNewsContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              rows={4}
            />
            <select
              value={newNewsType}
              onChange={(e) => setNewNewsType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
            >
              <option value="news">News</option>
              <option value="press-release">Press Release</option>
              <option value="newsletter">Newsletter</option>
            </select>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <DatePicker
                selected={newNewsDate}
                onChange={(date: Date | null) => setNewNewsDate(date)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                dateFormat="yyyy-MM-dd"
              />
            </div>
            <button
              onClick={handleSaveNews}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
            >
              {buttonText}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {newsUpdates.map((news) => (
              <div key={news.id} className="border p-4 rounded-lg">
                <h3 className="font-semibold">{news.title}</h3>
                <p className="text-sm text-gray-600">{news.content}</p>
                <p className="text-xs text-gray-500">{new Date(news.date).toLocaleDateString()}</p>
                <p className="text-xs text-gray-500 capitalize">{news.type}</p>
                <div className="mt-2">
                  <button
                    onClick={() => {
                      setEditNews(news);
                      setNewNewsTitle(news.title);
                      setNewNewsContent(news.content);
                      setNewNewsType(news.type);
                      setNewNewsDate(new Date(news.date));
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteNews(news.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
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