import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import {
  PlusCircle,
  FileText,
  Users,
  Tag,
  ExternalLink,
  Edit,
  Share,
  Search,
} from "lucide-react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const MyPublications = () => {
  const navigate = useNavigate();
  const [showEditor, setShowEditor] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Clinical Research");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [shareStatus, setShareStatus] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  interface Project {
    id: number;
    title: string;
    category: string;
    content: string;
    author: string;
    publishedAt: string;
    tags?: string[];
    file_url?: string;
    type: string;
    status: string;
    user_id: string; // Add user_id field
  }

  interface User {
    id: string;
    email?: string;
    user_metadata: {
      full_name: string;
    };
  }

  const [projects, setProjects] = useState<Project[]>([]);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor }) => {
      setContent(editor.getText());
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchUser = async () => {
      const { data: userData, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        setUser({
          id: userData.user.id,
          email: userData.user.email,
          user_metadata: {
            full_name: userData.user.user_metadata.full_name || "Unknown",
          },
        });
        fetchProjects(userData.user.id); // Fetch projects for the logged-in user
      }
    };

    const fetchProjects = async (userId: string) => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", userId); // Filter projects by user_id

      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        setProjects(data);
      }
    };

    fetchUser();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    const { data, error } = await supabase.from("projects").insert([
      {
        title,
        category,
        content,
        file_url: file ? file.name : null,
        author: user.user_metadata.full_name || "Unknown",
        publishedAt: new Date().toISOString(),
        type: "research",
        tags: [],
        status: "draft",
        user_id: user.id, // Include user_id
      },
    ]);

    if (error) {
      setStatus("Error submitting project");
      console.error(error);
    } else {
      setStatus("Project submitted successfully");
      setTitle("");
      setCategory("Clinical Research");
      setContent("");
      setFile(null);
      editor?.commands.clearContent();
      setShowEditor(false);
      if (data) {
        setProjects([...projects, data[0]]);
      }
    }
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setTitle(project.title);
    setCategory(project.category);
    setContent(project.content);
    editor?.commands.setContent(project.content);
    setShowEditor(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProject) return;

    const { data, error } = await supabase
      .from("projects")
      .update({
        title,
        category,
        content,
        file_url: file ? file.name : selectedProject.file_url,
      })
      .eq("id", selectedProject.id);

    if (error) {
      setStatus("Error updating project");
      console.error(error);
    } else {
      setStatus("Project updated successfully");
      setProjects(
        projects.map((project) =>
          project.id === selectedProject.id
            ? {
                ...project,
                title,
                category,
                content,
                file_url: file ? file.name : selectedProject.file_url,
              }
            : project
        )
      );
      setShowEditor(false);
      setSelectedProject(null);
    }
  };

  const handleShare = async (project: Project) => {
    const { data, error } = await supabase
      .from("projects")
      .update({ status: "pending" })
      .eq("id", project.id);

    if (error) {
      console.error("Error sharing project:", error);
      setShareStatus(`Failed to share the project: ${error.message}`);
    } else {
      setShareStatus("Your article is under review");
      setProjects(
        projects.map((p) =>
          p.id === project.id ? { ...p, status: "pending" } : p
        )
      );
    }
  };

  const truncateContent = (content: string) => {
    const lines = content.split("\n");
    return lines.slice(0, 2).join("\n");
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <h2 className="text-2xl font-bold leading-7 text-primary sm:text-3xl sm:truncate">
            My Articles & Publications
          </h2>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
        </div>
        <button
          onClick={() => setShowEditor(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full sm:w-auto"
        >
          <PlusCircle className="mr-2 h-5 w-5" /> Add Article
        </button>
      </div>
  
      {/* Editor Section */}
      {showEditor && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <form onSubmit={selectedProject ? handleUpdate : handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
  
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Clinical Research">Clinical Research</option>
                <option value="Development">Development</option>
                <option value="Intervention">Intervention</option>
                <option value="Technology">Technology</option>
                <option value="Case Studies">Case Studies</option>
              </select>
            </div>
  
            <div className="mb-4">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
                Content
              </label>
              <div className="mt-1">
                <EditorContent editor={editor} />
              </div>
            </div>
  
            <div className="mb-4">
              <label
                htmlFor="file"
                className="block text-sm font-medium text-gray-700"
              >
                Upload File (Word/PDF)
              </label>
              <input
                id="file"
                name="file"
                type="file"
                accept=".doc,.docx,.pdf"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={handleFileChange}
              />
            </div>
  
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {selectedProject ? "Update" : "Submit"}
              </button>
            </div>
          </form>
          {status && (
            <p className="mt-4 text-center text-green-600">{status}</p>
          )}
        </div>
      )}
  
      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="p-6">
              <span className="text-sm font-medium text-blue-600">
                {project.category}
              </span>
  
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
  
              <p className="text-gray-600 mb-4">
                {truncateContent(project.content)}
              </p>
  
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Users className="h-4 w-4 mr-1" />
                <span>{project.author}</span>
                <span className="mx-2">•</span>
                <span>
                  {new Date(project.publishedAt).toLocaleDateString()}
                </span>
              </div>
  
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700"
                >
                  <Edit className="h-5 w-5 mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleShare(project)}
                  className={`inline-flex items-center ${
                    project.status === "pending"
                      ? "text-yellow-600 hover:text-yellow-700"
                      : project.status === "approved"
                      ? "text-green-600 hover:text-green-700"
                      : "text-green-600 hover:text-green-700"
                  }`}
                  disabled={project.status === "pending" || project.status === "approved"}
                >
                  {project.status === "pending" ? (
                    <>
                      <Share className="h-5 w-5 mr-2" />
                      Pending Approval
                    </>
                  ) : project.status === "approved" ? (
                    <>
                      <Share className="h-5 w-5 mr-2" />
                      Approved
                    </>
                  ) : (
                    <>
                      <Share className="h-5 w-5 mr-2" />
                      Share
                    </>
                  )}
                </button>
              </div>
  
              {project.status === "pending" && (
                <p className="mt-4 text-center text-yellow-600">
                  Your article is under review
                </p>
              )}
              {project.status === "approved" && (
                <p className="mt-4 text-center text-green-600">
                  Your article has been approved
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default MyPublications;