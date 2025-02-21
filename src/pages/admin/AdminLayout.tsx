import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FileText, Calendar, CreditCard, Settings, LogOut, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { RequireAuth } from "../../components/admin/RequireAuth";

const sidebarItems = [
  { icon: FileText, label: "Manage Resources", path: "/admin/resources" },
  { icon: Calendar, label: "Manage Events", path: "/admin/events" },
  { icon: CreditCard, label: "Payment Processing", path: "/admin/payment-verification" },
];

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sectionCollapsed, setSectionCollapsed] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    navigate("/admin/login");
  };

  return (
    <RequireAuth>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 transform bg-white shadow-lg transition-transform lg:relative lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:block ${sectionCollapsed ? "w-16" : "w-64"} p-5 flex flex-col justify-between`}
        >
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <Settings className="h-6 w-6 text-blue-600" />
                {!sectionCollapsed && <span className="text-xl font-bold text-gray-900">Admin Panel</span>}
              </div>
              <button
                onClick={() => setSectionCollapsed(!sectionCollapsed)}
                className="text-gray-700 hover:text-gray-900"
              >
                {sectionCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
              </button>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-700 hover:text-gray-900 lg:hidden"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {!sectionCollapsed && (
              <nav>
                {sidebarItems.map(({ icon: Icon, label, path }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center px-4 py-3 text-gray-700 hover:bg-blue-100 rounded-lg transition-colors ${
                      location.pathname === path ? "bg-blue-100 text-blue-600" : ""
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    <span className="text-sm font-medium">{label}</span>
                  </Link>
                ))}
              </nav>
            )}
          </div>
          {!sectionCollapsed && (
            <button
              onClick={handleSignOut}
              className="flex items-center px-4 py-3 text-red-600 hover:bg-red-100 rounded-lg transition-colors w-full"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          )}
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-auto">
          {/* Mobile Sidebar Toggle */}
          <header className="p-4 bg-white shadow-md lg:hidden flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-700 hover:text-gray-900"
            >
              <Menu className="h-6 w-6" />
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
