import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { Brain, FileText, BookOpen, Users, Tag, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // For GitHub Flavored Markdown support

const Article = () => {
  const { id } = useParams<{ id: string }>(); // Get the article ID from the URL
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Fetch the article by ID
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("id", id)
          .single(); // Fetch a single row

        if (error) {
          throw error;
        }

        if (data) {
          // Format the article data
          const formattedArticle = {
            id: data.id.toString(),
            title: data.title,
            content: data.content,
            author: data.author,
            publishedAt: data.publishedAt
              ? new Date(data.publishedAt).toLocaleDateString()
              : "N/A",
            type: data.type || "research",
            tags:
              typeof data.tags === "string" ? JSON.parse(data.tags) : data.tags || [],
            category: data.category || "Uncategorized",
          };
          setArticle(formattedArticle);
        } else {
          setError("Article not found.");
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        setError("Failed to load article. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  // Get the appropriate icon based on the article type
  const getIcon = (type: string) => {
    switch (type) {
      case "research":
        return Brain;
      case "case-study":
        return FileText;
      case "innovation":
        return BookOpen;
      default:
        return FileText;
    }
  };

  if (loading) {
    return <p className="text-center mt-8">Loading article...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 mt-8">{error}</p>;
  }

  if (!article) {
    return <p className="text-center mt-8">Article not found.</p>;
  }

  const Icon = getIcon(article.type);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <span className="text-sm font-medium text-blue-600">
                  {article.category}
                </span>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <Users className="h-4 w-4 mr-1" />
              <span>{article.author}</span>
              <span className="mx-2">•</span>
              <span>{article.publishedAt}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  <Tag className="h-4 w-4 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
            <div className="prose max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;