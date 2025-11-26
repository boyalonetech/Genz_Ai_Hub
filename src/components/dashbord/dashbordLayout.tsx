import React, { useState } from "react";
import { DashboardPage } from "../../types";
import { LogOut } from "lucide-react";

interface DashboardLayoutProps {
  activePage: DashboardPage;
  onPageChange: (page: DashboardPage) => void;
  children: React.ReactNode;
  Logout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  activePage,
  onPageChange,
  children,
  Logout
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "blogs", label: "Blog Posts", icon: "📝" },
    { id: "courses", label: "Courses", icon: "🎓" },
    { id: "analytics", label: "Analytics", icon: "📈" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Genz AI Hub</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <nav className="mt-6">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onPageChange(item.id as DashboardPage);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                activePage === item.id
                  ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
          <button
            className="w-full  flex items-center text-white border-r-3 border-gray-500 bg-blue-500 gap-x-4 px-6 py-3 text-sm text-center transition-colors"
            onClick={Logout}
          >
            <span>
              <LogOut className="" />
            </span>
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white shadow-sm border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              ☰
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Genz AI Hub</h1>
            <div className="w-8"></div> {/* Spacer for balance */}
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
