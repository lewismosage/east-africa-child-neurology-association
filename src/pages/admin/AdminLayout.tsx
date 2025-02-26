import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FileText, Calendar, CreditCard, Settings, LogOut, Menu, X, ChevronLeft, ChevronRight, Newspaper,ListChecks,Home } from "lucide-react";
import { RequireAuth } from "../../components/admin/RequireAuth";

const sidebarItems = [
  { icon: Home, label: "Dashboard", path: "/admin/admin-dashboard" },
  { icon: FileText, label: "Specialist Directory", path: "/admin/specialist-approval" },
  { icon: CreditCard, label: "Payment Processing", path: "/admin/payment-verification" },
  { icon: FileText, label: "Articles & Publications Moderation", path: "/admin/artcles-approval" },
  { icon: Calendar, label: "Manage Events", path: "/admin/events" },
  { icon: ListChecks, label: "Manage Queries", path: "/admin/manage-queries" },
  { icon: Newspaper, label: "Newsletter Manager", path: "/admin/newsletter-manager" },
];

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const isLinkActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <RequireAuth>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 transform bg-white shadow-lg transition-transform lg:relative lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:block ${isExpanded ? "w-64" : "w-24"} p-5 flex flex-col justify-between`} // Fixed
        >
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <Settings className="h-7 w-7 text-blue-600" /> {/* Larger icon */}
                {isExpanded && <span className="text-xl font-bold text-gray-900">Admin Panel</span>}
              </div>
              <button
                onClick={toggleSidebar}
                className="text-gray-700 hover:text-gray-900"
              >
                {isExpanded ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />} {/* Larger icon */}
              </button>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-700 hover:text-gray-900 lg:hidden"
              >
                <X className="h-6 w-6" /> {/* Larger icon */}
              </button>
            </div>
            <nav>
              {sidebarItems.map(({ icon: Icon, label, path }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center px-4 py-3 text-gray-700 hover:bg-blue-100 rounded-lg transition-colors ${
                    isLinkActive(path) ? "bg-blue-100 text-blue-600" : ""
                  } ${!isExpanded ? "justify-center" : ""}`}
                >
                  <Icon className="h-6 w-6" /> {/* Larger icon */}
                  {isExpanded && <span className="text-sm font-medium ml-3">{label}</span>}
                </Link>
              ))}
            </nav>
          </div>
          <button
            onClick={handleSignOut}
            className={`flex items-center px-4 py-3 text-red-600 hover:bg-red-100 rounded-lg transition-colors w-full ${
              !isExpanded ? "justify-center" : ""
            }`}
          >
            <LogOut className="h-6 w-6" /> {/* Larger icon */}
            {isExpanded && <span className="text-sm font-medium ml-3">Sign Out</span>}
          </button>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-auto">
          {/* Mobile Sidebar Toggle */}
          <header className="p-4 bg-white shadow-md lg:hidden flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-700 hover:text-gray-900"
            >
              <Menu className="h-6 w-6" /> {/* Larger icon */}
            </button>
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          </header>
          <main className="flex-1 p-6 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}