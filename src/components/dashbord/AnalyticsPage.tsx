import React from "react";

const AnalyticsPage: React.FC = () => {
  const analyticsData = {
    blogViews: 1250,
    courseEnrollments: 342,
    completionRate: "78%",
    popularContent: [
      { title: "React Fundamentals", views: 450 },
      { title: "TypeScript Guide", views: 380 },
      { title: "Next.js Tutorial", views: 295 },
    ],
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
          Analytics
        </h1>
        <p className="text-gray-600 text-sm lg:text-base">
          Track your content performance
        </p>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-gray-600 text-xs lg:text-sm font-medium">
            Blog Views
          </h3>
          <div className="flex items-baseline mt-1 lg:mt-2">
            <span className="text-lg lg:text-2xl font-bold text-blue-600">
              {analyticsData.blogViews}
            </span>
            <span className="ml-1 lg:ml-2 text-xs lg:text-sm text-green-500">
              +12%
            </span>
          </div>
        </div>
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-gray-600 text-xs lg:text-sm font-medium">
            Course Enrollments
          </h3>
          <div className="flex items-baseline mt-1 lg:mt-2">
            <span className="text-lg lg:text-2xl font-bold text-orange-400">
              {analyticsData.courseEnrollments}
            </span>
            <span className="ml-1 lg:ml-2 text-xs lg:text-sm text-green-500">
              +8%
            </span>
          </div>
        </div>
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border col-span-2 lg:col-span-1">
          <h3 className="text-gray-600 text-xs lg:text-sm font-medium">
            Completion Rate
          </h3>
          <div className="flex items-baseline mt-1 lg:mt-2">
            <span className="text-lg lg:text-2xl font-bold text-green-600">
              {analyticsData.completionRate}
            </span>
            <span className="ml-1 lg:ml-2 text-xs lg:text-sm text-green-500">
              +5%
            </span>
          </div>
        </div>
      </div>

      {/* Popular Content */}
      <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
        <h2 className="text-lg lg:text-xl font-semibold text-gray-800 mb-3 lg:mb-4">
          Popular Content
        </h2>
        <div className="space-y-3 lg:space-y-4">
          {analyticsData.popularContent.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-gray-50 rounded-lg gap-2"
            >
              <span className="font-medium text-gray-800 text-sm lg:text-base truncate">
                {item.title}
              </span>
              <span className="text-blue-600 font-semibold text-sm lg:text-base">
                {item.views} views
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
