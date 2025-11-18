import React, { useState } from "react";

const BlogsPage: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [blogForm, setBlogForm] = useState({
    title: "",
    content: "",
    status: "draft" as "draft" | "published",
  });

  const blogs = [
    {
      id: "1",
      title: "Getting Started with Next.js",
      status: "published",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      title: "TypeScript Best Practices",
      status: "published",
      createdAt: "2024-01-10",
    },
    {
      id: "3",
      title: "Advanced React Patterns",
      status: "draft",
      createdAt: "2024-01-18",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Blog submitted:", blogForm);
    setShowCreateForm(false);
    setBlogForm({ title: "", content: "", status: "draft" });
  };

  return (
    <div className="p-3 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 lg:mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
            Blog Posts
          </h1>
          <p className="text-gray-600 text-sm lg:text-base">
            Manage your blog content
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm lg:text-base w-full sm:w-auto"
        >
          + New Blog Post
        </button>
      </div>

      {/* Create Blog Form */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-2xl flex items-center justify-center p-0 lg:p-4 z-50">
          <div
            className="
    bg-white 
    rounded-none          /* Fullscreen on mobile */
    w-full h-full         /* Fullscreen on mobile */
    p-4 
    lg:rounded-lg 
    lg:w-full 
    lg:max-w-2xl 
    lg:max-h-[90vh] 
    lg:overflow-y-auto
  "
          >
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-3 lg:mb-4">
              Create New Blog Post
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-3 lg:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={blogForm.title}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, title: e.target.value })
                    }
                    className="w-full p-2 text-sm lg:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter blog title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    value={blogForm.content}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, content: e.target.value })
                    }
                    rows={6}
                    className="w-full p-2 text-sm resize-none lg:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write your blog content..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={blogForm.status}
                    onChange={(e) =>
                      setBlogForm({
                        ...blogForm,
                        status: e.target.value as "draft" | "published",
                      })
                    }
                    className="w-full p-2 text-sm lg:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-y-4 space-y-2 sm:space-y-0 sm:space-x-3 mt-4 lg:mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-3 lg:py-2   text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm lg:text-base order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-3 lg:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm lg:text-base order-1 sm:order-2"
                >
                  Create Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Blogs List */}
      <div className="bg-white rounded-lg shadow-sm border">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="p-3 lg:p-4 border-b border-gray-200 last:border-b-0"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-sm lg:text-base">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-xs lg:text-sm">
                  Created: {blog.createdAt}
                </p>
              </div>
              <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    blog.status === "published"
                      ? "bg-green-100 text-green-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {blog.status}
                </span>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-xs lg:text-sm">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-800 text-xs lg:text-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
