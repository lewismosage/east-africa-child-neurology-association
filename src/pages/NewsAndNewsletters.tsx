import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient"; 

const NewsAndNewsletters = () => {
  // State for expanded news items
  const [expandedNews, setExpandedNews] = useState<{ [key: number]: boolean }>({});

  // State for expanded newsletters
  const [expandedNewsletter, setExpandedNewsletter] = useState<{ [key: number]: boolean }>({});

  // State for fetched news and newsletters
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch news and newsletters from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch news and press releases
        const { data: newsData, error: newsError } = await supabase
          .from("news_updates")
          .select("*")
          .in("type", ["news", "press-release"]); // Filter by type

        if (newsError) throw newsError;

        // Fetch newsletters
        const { data: newsletterData, error: newsletterError } = await supabase
          .from("news_updates")
          .select("*")
          .eq("type", "newsletter"); // Filter by type

        if (newsletterError) throw newsletterError;

        // Set the fetched data
        setNewsItems(newsData || []);
        setNewsletters(newsletterData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Toggle full content for news
  const toggleNews = (id: number) => {
    setExpandedNews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Toggle full content for newsletters
  const toggleNewsletter = (id: number) => {
    setExpandedNewsletter((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-7xl">
        {/* News Section */}
        <h2 className="text-center text-3xl font-bold tracking-tight text-primary">News</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Latest news and updates.</p>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {newsItems.map((news) => (
                <div key={news.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-primary bg-lavender bg-opacity-20 rounded-full mb-4">
                      {news.type === "press-release" ? "Press Release" : "News"}
                    </span>
                    <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
                    <p className="text-gray-600 mb-2">
                      {new Date(news.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700">
                      {expandedNews[news.id] ? news.content : `${news.content.substring(0, 150)}...`}
                    </p>
                    <button
                      onClick={() => toggleNews(news.id)}
                      className="mt-4 inline-block text-secondary hover:text-primary"
                    >
                      {expandedNews[news.id] ? "Read Less" : "Read More →"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Newsletters Section */}
        <h2 className="text-center text-3xl font-bold tracking-tight text-primary">Newsletters</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Our latest newsletters.</p>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Recent Issues</h3>
                    <ul className="space-y-4">
                      {newsletters.map((newsletter) => (
                        <li key={newsletter.id} className="flex items-center space-x-3">
                          <svg
                            className="h-6 w-6 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <div>
                            <p className="font-semibold">{newsletter.title}</p>
                            <p className="text-sm text-gray-600">
                              Published on {new Date(newsletter.date).toLocaleDateString()}
                            </p>
                            {expandedNewsletter[newsletter.id] && (
                              <p className="text-gray-700 mt-2">{newsletter.content}</p>
                            )}
                            <button
                              onClick={() => toggleNewsletter(newsletter.id)}
                              className="mt-2 inline-block text-secondary hover:text-primary"
                            >
                              {expandedNewsletter[newsletter.id] ? "Read Less" : "Read More →"}
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default NewsAndNewsletters;