import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

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
  status: string; // "pending", "approved", "rejected"
}

const ArticlesApproval = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null); // Track selected project for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch all projects, sorted by publishedAt in descending order
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("publishedAt", { ascending: false });

        if (error) {
          throw error;
        }

        console.log("Fetched projects:", data);
        setProjects(data as Project[]);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Error fetching projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

    // Set up real-time subscription for changes to the `projects` table
    const projectsSubscription = supabase
      .channel("public:projects")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "projects" },
        (payload) => {
          console.log("Real-time update:", payload);
          if (payload.eventType === "INSERT") {
            const newProject = payload.new as Project;
            // Add new project to the top of the list
            setProjects((prevProjects) => [newProject, ...prevProjects]);
          } else if (payload.eventType === "UPDATE") {
            const updatedProject = payload.new as Project;
            // Update the project in the list
            setProjects((prevProjects) =>
              prevProjects.map((project) =>
                project.id === updatedProject.id ? updatedProject : project
              )
            );
          } else if (payload.eventType === "DELETE") {
            const deletedProject = payload.old as Project;
            // Remove the deleted project from the list
            setProjects((prevProjects) =>
              prevProjects.filter((project) => project.id !== deletedProject.id)
            );
          }
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(projectsSubscription);
    };
  }, []);

  const handleApprove = async (projectId: number) => {
    try {
      // Update the project status to "approved"
      const { error } = await supabase
        .from("projects")
        .update({ status: "approved" })
        .eq("id", projectId);

      if (error) {
        throw error;
      }

      // Update the UI
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId ? { ...project, status: "approved" } : project
        )
      );

      setError(""); // Clear any previous errors
    } catch (error) {
      setError("Error approving project. Please try again.");
    }
  };

  const handleReject = async (projectId: number) => {
    try {
      // Update the project status to "rejected"
      const { error } = await supabase
        .from("projects")
        .update({ status: "rejected" })
        .eq("id", projectId);

      if (error) {
        throw error;
      }

      // Update the UI
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId ? { ...project, status: "rejected" } : project
        )
      );

      setError(""); // Clear any previous errors
    } catch (error) {
      setError("Error rejecting project. Please try again.");
    }
  };

  // Open modal with project details
  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-6 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-7xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Research Article Approval
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Approve or reject research articles submitted by members
        </p>

        {loading ? (
          <p className="text-center mt-4">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600 mt-4">{error}</p>
        ) : (
          <div className="mt-4">
            <div className="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Published At
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.map((project) => (
                    <tr key={project.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {project.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {project.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {project.author}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(project.publishedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {project.status === "pending" ? (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                            Pending Approval
                          </span>
                        ) : project.status === "approved" ? (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">
                            Approved
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full">
                            Rejected
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => openModal(project)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          View Details
                        </button>
                        {project.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleApprove(project.id)}
                              className="text-green-600 hover:text-green-900 mr-4"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(project.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal for viewing project details */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
            <h3 className="text-xl font-bold mb-4">{selectedProject.title}</h3>
            <p className="text-gray-700 mb-4">{selectedProject.content}</p>
            {selectedProject.file_url && (
              <a
                href={`${supabase.storage.from("files").getPublicUrl(selectedProject.file_url).data.publicUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Download File
              </a>
            )}
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
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

export default ArticlesApproval;