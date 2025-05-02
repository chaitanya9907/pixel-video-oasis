
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import Navbar from '@/components/Navbar';
import VideoPlayer from '@/components/VideoPlayer';
import ContentRow from '@/components/ContentRow';
import Footer from '@/components/Footer';
import UploadButton from '@/components/UploadButton';
import { videoData } from '@/lib/data';

const VideoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState(videoData.find(v => v.id === id));
  const [relatedVideos, setRelatedVideos] = useState(
    videoData.filter(v => v.category === video?.category && v.id !== id)
  );
  const [userUploads, setUserUploads] = useState<typeof videoData>([]);

  useEffect(() => {
    // Update video and related videos when ID changes
    const currentVideo = videoData.find(v => v.id === id);
    setVideo(currentVideo);
    
    if (currentVideo) {
      setRelatedVideos(
        videoData.filter(v => v.category === currentVideo.category && v.id !== id)
      );
    }
    
    // Get user uploads
    setUserUploads(videoData.filter(v => v.isUserUploaded && v.id !== id));
    
    // Scroll to top when video changes
    window.scrollTo(0, 0);
  }, [id]);

  if (!video) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-hotstar-darker">
        <div className="text-center">
          <p className="text-xl font-medium">Video not found</p>
          <Link to="/" className="mt-4 button-primary inline-flex">Go back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hotstar-darker">
      <Navbar />
      
      <main className="pt-20">
        {/* Video Player Section */}
        <div className="aspect-video w-full bg-black">
          <VideoPlayer video={video} />
        </div>
        
        <div className="content-container">
          {/* Back Button */}
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to browse
            </Link>
            
            <UploadButton />
          </div>
          
          {/* Video Info */}
          <div className="py-6">
            <h1 className="text-3xl font-bold mb-2">{video.title}</h1>
            
            <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
              <span className="text-hotstar-accent font-semibold">{video.rating}</span>
              <span>•</span>
              <span>{video.year}</span>
              <span>•</span>
              <span>{video.category}</span>
              <span>•</span>
              <span>{video.duration}</span>
              {video.isUserUploaded && (
                <>
                  <span>•</span>
                  <span className="bg-hotstar-accent/20 text-hotstar-accent px-2 py-0.5 rounded-full text-xs">
                    My Upload
                  </span>
                </>
              )}
            </div>
            
            <p className="text-gray-300 max-w-3xl">
              {video.description}
            </p>
          </div>
          
          {/* User Uploads - show only if there are other uploads */}
          {userUploads.length > 0 && (
            <ContentRow
              title="My Other Uploads"
              videos={userUploads}
            />
          )}
          
          {/* Related Videos */}
          {relatedVideos.length > 0 && (
            <ContentRow
              title={`More ${video.category}`}
              videos={relatedVideos}
            />
          )}
          
          {/* More to Explore */}
          <ContentRow 
            title="More to Explore" 
            videos={videoData.filter(v => v.id !== id && !v.isUserUploaded)}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VideoPage;
