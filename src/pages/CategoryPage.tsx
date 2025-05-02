
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ContentRow from '@/components/ContentRow';
import Footer from '@/components/Footer';
import UploadButton from '@/components/UploadButton';
import { videoData } from '@/lib/data';

type CategoryType = 'movie' | 'tvshow' | 'popular';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredVideos, setFilteredVideos] = useState<typeof videoData>([]);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Filter videos based on category
      let videos: typeof videoData = [];
      
      if (category === 'movies') {
        videos = videoData.filter(video => video.type === 'movie');
      } else if (category === 'tvshows') {
        videos = videoData.filter(video => video.type === 'tvshow');
      } else if (category === 'popular') {
        videos = videoData.filter(video => video.type === 'popular');
      } else if (category === 'telugusongs') {
        videos = videoData.filter(video => video.category === 'Telugu Songs');
      }
      
      setFilteredVideos(videos);
    }, 1000);

    return () => clearTimeout(timer);
  }, [category]);

  const getCategoryTitle = () => {
    switch (category) {
      case 'movies':
        return 'Movies';
      case 'tvshows':
        return 'TV Shows';
      case 'popular':
        return 'New & Popular';
      case 'telugusongs':
        return 'Telugu Songs';
      default:
        return 'Videos';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-hotstar-darker">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-hotstar-accent border-hotstar-dark rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-xl font-medium bg-gradient-to-r from-hotstar-accent to-hotstar-highlight bg-clip-text text-transparent">
            Loading {getCategoryTitle()}...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hotstar-darker">
      <Navbar />
      
      <main className="pt-20">
        <div className="content-container py-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">{getCategoryTitle()}</h1>
            <UploadButton />
          </div>
          
          {/* Show filtered videos by category */}
          {filteredVideos.length > 0 ? (
            <div>
              {/* Group by actual categories */}
              {[...new Set(filteredVideos.map(video => video.category))].map((categoryName) => (
                <ContentRow
                  key={categoryName}
                  title={categoryName}
                  videos={filteredVideos.filter(video => video.category === categoryName)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-xl text-gray-400">No videos found in this category</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
