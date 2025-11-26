"use client";
import React, { useState } from "react";
import { DashboardPage } from "@/types";
import DashboardLayout from "../dashbord/dashbordLayout";
import OverviewPage from "./OverviewPage";
import CoursesPage from "./CoursesPage";
import BlogsPage from "./BlogsPage";
import AnalyticsPage from "./AnalyticsPage";

const Dashboard = ({logout} : {logout: () => void}) => {
  const [activePage, setActivePage] = useState<DashboardPage>("overview");

  const renderPage = () => {
    switch (activePage) {
      case "overview":
        return <OverviewPage />;
      case "blogs":
        return <BlogsPage />;
      case "courses":
        return <CoursesPage />; // This is your courses management page
      case "analytics":
        return <AnalyticsPage />;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <DashboardLayout
    Logout={logout}
      activePage={activePage}
      onPageChange={setActivePage}
    >
      {renderPage()}
    </DashboardLayout>
  );
};

export default Dashboard;
