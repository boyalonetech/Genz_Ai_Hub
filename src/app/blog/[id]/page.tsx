// app/blog/[id]/page.tsx
"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Calendar } from "lucide-react";
import { articles } from "@/app/data/blog";
import { Article } from "../../types/blog";

export default function BlogPost(): React.JSX.Element {
  const params = useParams();
  const router = useRouter();

  // Get the id from params and convert to number
  const articleId: number = parseInt(params.id as string);

  // Find the current article with proper typing
  const article: Article | undefined = articles.find(
    (article: Article) => article.id === articleId
  );

  // Get related articles (excluding current one)
  const relatedArticles: Article[] = articles
    .filter((a: Article) => a.id !== articleId)
    .slice(0, 3);

  // If article not found, show error or redirect
  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Article not found
          </h1>
          <button
            onClick={() => router.push("/blog")}
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute  w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 -right-16 md:-right-24 lg:-right-30 top-25 md:top-32 lg:top-36 opacity-75 bg-orange-400 rounded-full shadow-[inset_0px_4px_53px_18px_rgba(0,0,0,0.1)] pointer-events-none" />
        <div className="absolute w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 -left-24 md:-left-32 lg:-left-72 top-20 md:top-32 lg:top-32 opacity-75 bg-orange-400 rounded-full shadow-[inset_0px_4px_53px_18px_rgba(0,0,0,0.1)] pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto relative overflow-x-hidden z-10">
        {/* Hero Title */}
        <h1 className="text-center mb-6 md:mb-8">
          <span className="text-indigo-800 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal font-['Unbounded'] leading-tight">
            {article.title.split(" ").slice(0, 3).join(" ")}
          </span>
          <span className="text-orange-400 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal font-['Unbounded'] leading-tight">
            {" "}
            {article.title.split(" ").slice(3, 5).join(" ")}
          </span>
          <span className="text-indigo-800 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal font-['Unbounded'] leading-tight">
            {" "}
            {article.title.split(" ").slice(5).join(" ")}
          </span>
        </h1>

        {/* Meta info */}
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-5 mb-8 md:mb-12">
          <div className="text-center text-black text-base sm:text-lg md:text-xl font-normal font-['Unbounded'] leading-tight">
            {article.date}
          </div>
          <div className="w-2 h-2 bg-black rounded-full" />
          <div className="text-center text-black text-base sm:text-lg md:text-xl font-normal font-['Unbounded'] leading-tight">
            {article.author}
          </div>
        </div>

        {/* Hero Image */}
        <Image
          height={600}
          width={600}
          className="w-full h-auto rounded-[20px] mb-12 md:mb-16 lg:mb-20"
          src={article.image}
          alt={article.title}
          priority
        />

        {/* Prerequisites Section */}
        {article.content.prerequisites.length > 0 && (
          <div className="mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-orange-400 text-2xl sm:text-3xl md:text-3xl font-normal font-['Unbounded'] leading-tight mb-4 md:mb-6">
              Prerequisites
            </h2>
            <ul className="space-y-3 md:space-y-4">
              {article.content.prerequisites.map(
                (prerequisite: string, index: number) => (
                  <li
                    key={index}
                    className="text-black text-base sm:text-meduim md:text-lg font-normal font-['Unbounded'] leading-relaxed"
                  >
                    {prerequisite}
                  </li>
                )
              )}
            </ul>
          </div>
        )}

        {/* Steps Section */}
        {article.content.steps.length > 0 && (
          <div className="mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-orange-400 text-2xl sm:text-3xl md:text-3xl font-normal font-['Unbounded'] leading-tight mb-4 md:mb-6">
              Steps
            </h2>
            <ul className="space-y-3 md:space-y-4">
              {article.content.steps.map((step: string, index: number) => (
                <li
                  key={index}
                  className="text-black text-base sm:text-medium md:text-lg font-normal font-['Unbounded'] leading-relaxed"
                >
                  {step}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Bonus Ideas Section */}
        {article.content.bonusIdeas.length > 0 && (
          <div className="mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-orange-400 text-2xl sm:text-3xl md:text-4xl font-normal font-['Unbounded'] leading-tight mb-4 md:mb-6">
              Bonus Ideas
            </h2>
            <ul className="space-y-3 md:space-y-4">
              {article.content.bonusIdeas.map((idea: string, index: number) => (
                <li
                  key={index}
                  className="text-black text-base sm:text-medium md:text-lg font-normal font-['Unbounded'] leading-relaxed"
                >
                  {idea}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Articles Section */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-center mb-8 md:mb-12">
            <span className="text-indigo-800 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-normal font-['Unbounded'] leading-tight">
              Explore more guides to your{" "}
            </span>
            <span className="text-orange-400 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-normal font-['Unbounded'] leading-tight">
              AI
            </span>
            <span className="text-indigo-800 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-normal font-['Unbounded'] leading-tight">
              {" "}
              Journey
            </span>
          </h2>
        </div>

        {/* Related Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {relatedArticles.map((relatedArticle: Article) => (
            <div
              key={relatedArticle.id}
              className="bg-gray-200 rounded-[20px] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => router.push(`/blog/${relatedArticle.id}`)}
            >
              <Image
                height={600}
                width={600}
                className="w-full h-64 object-cover rounded-t-[20px] p-4 pb-0"
                src={relatedArticle.image}
                alt={relatedArticle.title}
              />
              <div className="p-6">
                <h3 className="text-black text-lg sm:text-xl md:text-xl font-normal font-['Unbounded'] leading-tight mb-4">
                  {relatedArticle.title}
                </h3>
                <div className="border-t-[3px] border-black/40 pt-4 mt-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 relative overflow-hidden">
                      <Calendar size={20} />
                    </div>
                    <div className="text-black/50 text-sm md:text-medium font-medium font-['Unbounded'] leading-tight tracking-tight">
                      {relatedArticle.date}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back to Blog Button */}
        <div className="flex justify-center mt-12 md:mt-16 lg:mt-20">
          <button
            onClick={() => router.push("/blog")}
            className="px-8 py-3 bg-indigo-800 text-white rounded-[10px] text-lg font-medium font-['Lato'] leading-tight hover:bg-indigo-900 transition-colors"
          >
            Back to All Articles
          </button>
        </div>
      </div>
    </div>
  );
}
