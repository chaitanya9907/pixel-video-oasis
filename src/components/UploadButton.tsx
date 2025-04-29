
import { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UploadModal from './UploadModal';

const UploadButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        variant="outline"
        className="text-white border-pixelverse-accent/70 hover:border-pixelverse-accent hover:bg-pixelverse-accent/20"
      >
        <Upload className="mr-2 h-4 w-4" />
        Upload
      </Button>
      
      <UploadModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
};

export default UploadButton;
