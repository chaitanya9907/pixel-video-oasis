
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Info } from 'lucide-react';
import { VideoData } from '@/lib/data';

interface HeroSectionProps {
  featuredVideos: VideoData[];
}

const HeroSection = ({ featuredVideos }: HeroSectionProps) => {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const currentFeature = featuredVideos[currentFeatureIndex];

  useEffect(() => {
    // Auto rotate featured videos every 8 seconds
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => 
        prev === featuredVideos.length - 1 ? 0 : prev + 1
      );
    }, 8000);
    
    return () => clearInterval(interval);
  }, [featuredVideos.length]);

  if (!currentFeature) return null;

  return (
    <div className="relative w-full h-[75vh] min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${currentFeature.thumbnailUrl})` }}
      >
        <div className="gradient-overlay"></div>
      </div>
      
      {/* Hero Content */}
      <div className="content-container relative h-full flex flex-col justify-end pb-20">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
            {currentFeature.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
            <span className="text-pixelverse-accent font-semibold">{currentFeature.rating}</span>
            <span>•</span>
            <span>{currentFeature.year}</span>
            <span>•</span>
            <span>{currentFeature.category}</span>
          </div>
          <p className="text-gray-300 mb-6 text-lg max-w-lg">
            {currentFeature.description}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link to={`/video/${currentFeature.id}`} className="button-primary">
              <Play className="h-5 w-5" />
              Play Now
            </Link>
            <button className="button-secondary">
              <Info className="h-5 w-5" />
              More Info
            </button>
          </div>
        </div>
      </div>
      
      {/* Feature Selection Indicators */}
      {featuredVideos.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {featuredVideos.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentFeatureIndex 
                  ? 'bg-pixelverse-accent w-6' 
                  : 'bg-gray-500 hover:bg-gray-400'
              }`}
              onClick={() => setCurrentFeatureIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSection;
