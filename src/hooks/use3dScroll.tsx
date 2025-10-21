import { useState, useEffect } from 'react';

export default function ScrollTracker() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Calculate scroll percentage
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = (currentScrollY / docHeight) * 100;
      setScrollPercent(Math.round(percent));
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ 
      top: document.documentElement.scrollHeight, 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Fixed header showing scroll info */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Scroll Position: {scrollY}px</p>
            <p className="text-sm text-gray-600">Progress: {scrollPercent}%</p>
          </div>
          <div className="space-x-2">
            <button 
              onClick={scrollToTop}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              ↑ Top
            </button>
            <button 
              onClick={scrollToBottom}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
            >
              ↓ Bottom
            </button>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${scrollPercent}%` }}
          />
        </div>
      </div>

      {/* Content to scroll through */}
      <div className="max-w-4xl mx-auto pt-32 pb-16 px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Scroll Tracker Demo</h1>
        
        {[...Array(20)].map((_, i) => (
          <div key={i} className="mb-8 p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-3 text-gray-700">
              Section {i + 1}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              This is a demo section to showcase the scroll tracking functionality. 
              As you scroll down the page, the header will update with your current 
              scroll position and percentage. The progress bar at the top visually 
              represents how far you&apos;ve scrolled through the content.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}