import React from 'react';

const OverviewPage: React.FC = () => {
  const stats = [
    { label: 'Total Blogs', value: '24', change: '+12%' },
    { label: 'Published Courses', value: '8', change: '+5%' },
    { label: 'Draft Posts', value: '3', change: '-2%' },
    { label: 'Monthly Views', value: '1.2K', change: '+18%' },
  ];

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600 text-sm lg:text-base">Welcome back! Here's what's happening with your content.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
            <h3 className="text-gray-600 text-xs lg:text-sm font-medium">{stat.label}</h3>
            <div className="flex items-baseline mt-1 lg:mt-2">
              <span className="text-lg lg:text-2xl font-bold text-gray-800">{stat.value}</span>
              <span className="ml-1 lg:ml-2 text-xs lg:text-sm text-green-500">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
        <h2 className="text-lg lg:text-xl font-semibold text-gray-800 mb-3 lg:mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
          <button className="flex items-center p-3 lg:p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors">
            <span className="text-xl lg:text-2xl mr-2 lg:mr-3">📝</span>
            <div className="text-left">
              <h3 className="font-medium text-gray-800 text-sm lg:text-base">Write New Blog</h3>
              <p className="text-xs lg:text-sm text-gray-600">Create a new blog post</p>
            </div>
          </button>
          <button className="flex items-center p-3 lg:p-4 border border-gray-200 rounded-lg hover:border-orange-400 transition-colors">
            <span className="text-xl lg:text-2xl mr-2 lg:mr-3">🎓</span>
            <div className="text-left">
              <h3 className="font-medium text-gray-800 text-sm lg:text-base">Create Course</h3>
              <p className="text-xs lg:text-sm text-gray-600">Start a new course</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;