
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Maximize } from 'lucide-react';
import { VideoData } from '@/lib/data';
import { toast } from "@/components/ui/use-toast";

interface VideoPlayerProps {
  video: VideoData;
}

const VideoPlayer = ({ video }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // Auto-hide controls after 3 seconds of inactivity
    const handleMouseMove = () => {
      setShowControls(true);
      
      if (controlsTimerRef.current) {
        window.clearTimeout(controlsTimerRef.current);
      }
      
      controlsTimerRef.current = window.setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (controlsTimerRef.current) {
        window.clearTimeout(controlsTimerRef.current);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    // Update video element when mute/volume changes
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.volume = volume;
    }
  }, [isMuted, volume]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        const playPromise = videoRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Playback error:', error);
            toast({
              title: "Playback Error",
              description: "There was a problem playing this video. Please try again.",
              variant: "destructive"
            });
          });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoading(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleVideoError = () => {
    console.error("Video failed to load");
    setIsLoading(false);
    toast({
      title: "Video Error",
      description: "This video is currently unavailable. Please try again later.",
      variant: "destructive"
    });
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  return (
    <div 
      className="relative w-full h-full bg-black"
      onMouseEnter={() => setShowControls(true)}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="w-12 h-12 border-4 border-t-pixelverse-accent border-pixelverse-dark rounded-full animate-spin"></div>
        </div>
      )}
      
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="w-full h-full"
        onClick={handlePlayPause}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        onError={handleVideoError}
        onLoadStart={() => setIsLoading(true)}
        poster={video.thumbnailUrl}
        playsInline
        preload="metadata"
      />
      
      {/* Video Controls */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress Bar */}
        <div className="mb-3">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #7E22CE ${(currentTime / (duration || 1)) * 100}%, #333 0)`,
            }}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Play/Pause Button */}
            <button onClick={handlePlayPause} className="text-white hover:text-pixelverse-accent transition-colors">
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>
            
            {/* Skip Buttons */}
            <button onClick={skipBackward} className="text-white hover:text-pixelverse-accent transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            
            <button onClick={skipForward} className="text-white hover:text-pixelverse-accent transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
            
            {/* Volume Controls */}
            <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="text-white hover:text-pixelverse-accent transition-colors">
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #7E22CE ${(isMuted ? 0 : volume) * 100}%, #333 0)`,
                }}
              />
            </div>
            
            {/* Time Display */}
            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
          
          <div>
            {/* Fullscreen Button */}
            <button onClick={handleFullscreen} className="text-white hover:text-pixelverse-accent transition-colors">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
