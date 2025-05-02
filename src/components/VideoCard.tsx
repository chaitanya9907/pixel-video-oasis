
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { VideoData } from '@/lib/data';

interface VideoCardProps {
  video: VideoData;
}

const VideoCard = ({ video }: VideoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      to={`/video/${video.id}`}
      className="video-hover-card relative group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="aspect-video rounded-lg overflow-hidden">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Type Badge */}
      {video.type && (
        <div className="absolute top-2 right-2 bg-pixelverse-accent/80 text-white text-xs px-2 py-1 rounded">
          {video.type === 'movie' ? 'Movie' : 
           video.type === 'tvshow' ? 'TV Show' : 
           video.type === 'popular' ? 'Popular' : ''}
        </div>
      )}
      
      {/* User Upload Indicator */}
      {video.isUserUploaded && (
        <div className="absolute top-2 left-2 bg-green-500/80 text-white text-xs px-2 py-1 rounded">
          My Upload
        </div>
      )}
      
      {/* Hover Overlay */}
      <div className={`absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <button className="w-12 h-12 bg-pixelverse-accent/90 rounded-full flex items-center justify-center">
          <Play className="w-6 h-6 fill-white text-white" />
        </button>
      </div>
      
      {/* Info */}
      <div className="mt-2">
        <h3 className="font-medium text-sm truncate">{video.title}</h3>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>{video.duration}</span>
          <span>•</span>
          <span>{video.category}</span>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
