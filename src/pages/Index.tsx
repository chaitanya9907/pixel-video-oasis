import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ContentRow from '@/components/ContentRow';
import Footer from '@/components/Footer';
import UploadButton from '@/components/UploadButton';
import { videoData, featuredVideos, categories } from '@/lib/data';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userUploads, setUserUploads] = useState<typeof videoData>([]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Find user uploaded videos
      setUserUploads(videoData.filter(video => video.isUserUploaded));
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pixelverse-darker">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-pixelverse-accent border-pixelverse-dark rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-xl font-medium bg-gradient-to-r from-pixelverse-accent to-pixelverse-highlight bg-clip-text text-transparent">
            Loading PixelVerse...
          </p>
        </div>
      </div>
    );
  }

  // Get videos by category
  const getVideosByCategory = (category: string) => {
    return videoData.filter(video => video.category === category);
  };

  return (
    <div className="min-h-screen bg-pixelverse-darker">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <HeroSection featuredVideos={featuredVideos} />
        
        {/* Content Sections */}
        <div className="content-container py-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Trending Now</h2>
            <UploadButton />
          </div>
          
          {/* User Uploads Section - show only if user has uploads */}
          {userUploads.length > 0 && (
            <ContentRow title="My Uploads" videos={userUploads} />
          )}
          
          {/* Trending Now (all videos) */}
          <ContentRow title="" videos={videoData.filter(video => !video.isUserUploaded)} />
          
          {/* Categories */}
          {categories.map(category => (
            <ContentRow
              key={category}
              title={category}
              videos={getVideosByCategory(category)}
            />
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
