import React, { useState } from "react";

const NewsAndNewsletters = () => {
  // State for expanded news items
  const [expandedNews, setExpandedNews] = useState<{ [key: number]: boolean }>({});

  // State for expanded newsletters
  const [expandedNewsletter, setExpandedNewsletter] = useState<{ [key: number]: boolean }>({});

  // Sample news data
  const newsItems = [
    {
      id: 1,
      type: "News",
      title: "EACNA Annual Conference Success",
      date: "March 15, 2024",
      summary: "Over 200 specialists gathered to discuss advances in child neurology care...",
      fullContent:
        "The EACNA Annual Conference 2024 was a resounding success, with over 200 specialists from across East Africa and beyond gathering to discuss the latest advances in child neurology care. Key topics included innovative treatments for epilepsy, advancements in neuroimaging, and strategies for improving access to neurological care in underserved regions. The event also featured workshops and networking sessions, fostering collaboration among healthcare professionals.",
    },
    {
      id: 2,
      type: "Press Release",
      title: "New Research Initiative Launched",
      date: "March 10, 2024",
      summary: "EACNA announces new research collaboration with international partners...",
      fullContent:
        "EACNA has launched a groundbreaking research initiative in collaboration with international partners. This initiative aims to address critical gaps in child neurology research, focusing on conditions such as cerebral palsy, autism spectrum disorders, and neonatal brain injuries. The project will involve multi-center clinical trials and the development of new diagnostic tools, with the goal of improving outcomes for children with neurological disorders.",
    },
  ];

  // Sample newsletter data
  const newsletters = [
    {
      id: 1,
      title: "March 2024 Newsletter",
      description: "Latest updates and achievements",
      fullContent:
        "In this issue, we highlight the success of the EACNA Annual Conference 2024, share updates on our new research initiative, and provide a preview of upcoming events. We also feature interviews with leading experts in child neurology and showcase the latest publications from our members.",
    },
    {
      id: 2,
      title: "February 2024 Newsletter",
      description: "Conference special edition",
      fullContent:
        "This special edition of the newsletter is dedicated to the EACNA Annual Conference 2024. It includes detailed summaries of keynote presentations, highlights from workshops, and testimonials from attendees. We also provide a sneak peek at the research findings presented at the conference.",
    },
  ];

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
                      {news.type}
                    </span>
                    <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
                    <p className="text-gray-600 mb-2">{news.date}</p>
                    <p className="text-gray-700">
                      {expandedNews[news.id] ? news.fullContent : news.summary}
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
                            <p className="text-sm text-gray-600">{newsletter.description}</p>
                            {expandedNewsletter[newsletter.id] && (
                              <p className="text-gray-700 mt-2">{newsletter.fullContent}</p>
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