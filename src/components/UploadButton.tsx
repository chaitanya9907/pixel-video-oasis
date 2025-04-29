
import { useState } from 'react';
import { Upload, FileVideo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UploadModal from './UploadModal';
import { useNavigate } from 'react-router-dom';
import { videoData } from '@/lib/data';

const UploadButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleViewUploads = () => {
    // Find the first user uploaded video, if any
    const userUploads = videoData.filter(video => video.isUserUploaded);
    if (userUploads.length > 0) {
      navigate(`/video/${userUploads[0].id}`);
    } else {
      // If no uploads yet, open the upload modal
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="flex gap-2 items-center">
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="outline"
          className="text-white border-pixelverse-accent/70 hover:border-pixelverse-accent hover:bg-pixelverse-accent/20"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
        
        <Button
          onClick={handleViewUploads}
          className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#7E69AB] hover:to-[#9b87f5] text-white"
        >
          <FileVideo className="mr-2 h-4 w-4" />
          My Uploads
        </Button>
      </div>
      
      <UploadModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
};

export default UploadButton;
