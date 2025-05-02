import { useState, useRef } from 'react';
import { Upload, FileVideo, FileAudio, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { addUserUploadedVideo } from '@/lib/data';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const uploadSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  category: z.string().min(1, "Please select a category"),
  year: z.number().min(1900).max(new Date().getFullYear()),
  rating: z.string().min(1, "Please select a rating"),
  type: z.enum(["movie", "tvshow", "popular", "other"]).default("other")
});

type UploadFormValues = z.infer<typeof uploadSchema>;

const UploadModal = ({ open, onOpenChange }: UploadModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [uploadStep, setUploadStep] = useState<'select' | 'details'>('select');
  const [uploading, setUploading] = useState(false);
  const [uploadType, setUploadType] = useState<'video' | 'audio' | null>(null);
  const [duration, setDuration] = useState<string>('0:00');
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      title: '',
      description: '',
      category: 'Other',
      year: new Date().getFullYear(),
      rating: 'PG',
      type: 'other'
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      const fileType = file.type.split('/')[0];
      if (fileType === 'video') {
        setUploadType('video');
      } else if (fileType === 'audio') {
        setUploadType('audio');
      } else {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a video or audio file"
        });
        return;
      }
      
      const objectUrl = URL.createObjectURL(file);
      setUploadedVideoUrl(objectUrl);
      
      // Generate a thumbnail for video files
      if (fileType === 'video') {
        const video = document.createElement('video');
        video.src = objectUrl;
        video.addEventListener('loadedmetadata', () => {
          // Set duration
          const durationInSeconds = Math.floor(video.duration);
          const minutes = Math.floor(durationInSeconds / 60);
          const seconds = durationInSeconds % 60;
          setDuration(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
          
          // Generate thumbnail
          video.currentTime = 1; // Set to 1 second to avoid black screen
          video.addEventListener('seeked', () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
            setThumbnailUrl(canvas.toDataURL());
          });
        });
      } else if (fileType === 'audio') {
        // For audio, set a default music thumbnail
        setThumbnailUrl("https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3");
        
        const audio = document.createElement('audio');
        audio.src = objectUrl;
        audio.addEventListener('loadedmetadata', () => {
          // Set duration
          const durationInSeconds = Math.floor(audio.duration);
          const minutes = Math.floor(durationInSeconds / 60);
          const seconds = durationInSeconds % 60;
          setDuration(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
        });
      }
      
      setUploadStep('details');
    }
  };

  const onSubmit = (data: UploadFormValues) => {
    if (!selectedFile || !uploadedVideoUrl || !thumbnailUrl) {
      toast({
        variant: "destructive",
        title: "Missing file",
        description: "Please select a video or audio file first"
      });
      return;
    }
    
    setUploading(true);
    
    // In a real app, here we would upload the file to storage
    // For demo purposes, we'll just use the object URL
    
    setTimeout(() => {
      try {
        const newVideo = addUserUploadedVideo({
          title: data.title,
          description: data.description,
          thumbnailUrl: thumbnailUrl,
          videoUrl: uploadedVideoUrl,
          duration: duration,
          category: data.category,
          year: data.year,
          rating: data.rating,
          type: data.type
        });
        
        toast({
          title: "Success!",
          description: "Your content has been uploaded successfully",
        });
        
        onOpenChange(false);
        navigate(`/video/${newVideo.id}`);
      } catch (error) {
        console.error('Upload error:', error);
        toast({
          variant: "destructive",
          title: "Upload failed",
          description: "There was an issue uploading your content"
        });
      } finally {
        setUploading(false);
        setUploadStep('select');
        setSelectedFile(null);
        setUploadedVideoUrl(null);
        setThumbnailUrl(null);
        form.reset();
      }
    }, 1500); // Simulate upload delay
  };

  const resetUpload = () => {
    setUploadStep('select');
    setSelectedFile(null);
    setUploadedVideoUrl(null);
    setThumbnailUrl(null);
    setUploadType(null);
    form.reset();
  };
  
  const ratingOptions = ["G", "PG", "PG-13", "R", "NC-17"];
  const categoryOptions = ["Documentary", "Drama", "Science", "Adventure", "Food", "Nature", "Technology", "Design", "Music", "Other"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Upload Content
          </DialogTitle>
          <DialogClose onClick={resetUpload} />
        </DialogHeader>
        
        {uploadStep === 'select' ? (
          <div className="space-y-6">
            <div className="bg-pixelverse-dark/50 border border-dashed border-gray-500 rounded-lg p-10 text-center">
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-medium mb-2">Drag and drop files here</h3>
              <p className="text-gray-400 mb-4">Or click to browse files</p>
              
              <input
                type="file"
                id="file-upload"
                accept="video/*,audio/*"
                className="hidden"
                onChange={handleFileChange}
              />
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="flex items-center justify-center gap-2"
                >
                  <FileVideo className="w-5 h-5" />
                  Upload Video
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="flex items-center justify-center gap-2"
                >
                  <FileAudio className="w-5 h-5" />
                  Upload Audio
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                Supported formats: MP4, AVI, MOV, MP3, WAV (max 500MB)
              </p>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* File Preview */}
              <div className="mb-4">
                <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
                  {uploadType === 'video' && uploadedVideoUrl && (
                    <video
                      ref={videoRef}
                      src={uploadedVideoUrl}
                      className="w-full h-full object-contain"
                      controls
                    />
                  )}
                  
                  {uploadType === 'audio' && uploadedVideoUrl && (
                    <div className="flex flex-col h-full justify-center items-center bg-pixelverse-dark">
                      <img 
                        src={thumbnailUrl || ''}
                        alt="Audio visualization"
                        className="w-40 h-40 object-cover rounded-full mb-4"
                      />
                      <audio
                        ref={audioRef}
                        src={uploadedVideoUrl}
                        controls
                        className="w-3/4"
                      />
                    </div>
                  )}
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={resetUpload}
                    className="absolute top-2 right-2 rounded-full bg-black/50 border-0 hover:bg-black/75"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mt-2 text-sm text-gray-400">
                  {selectedFile?.name} • {(selectedFile?.size || 0) / (1024 * 1024) < 1 
                    ? `${((selectedFile?.size || 0) / 1024).toFixed(2)} KB` 
                    : `${((selectedFile?.size || 0) / (1024 * 1024)).toFixed(2)} MB`
                  }
                </div>
              </div>
              
              {/* Form Fields */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          {...field}
                        >
                          {categoryOptions.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1900"
                          max={new Date().getFullYear()}
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          {...field}
                        >
                          {ratingOptions.map(rating => (
                            <option key={rating} value={rating}>{rating}</option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          {...field}
                        >
                          {["movie", "tvshow", "popular", "other"].map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={resetUpload}>
                  Cancel
                </Button>
                <Button type="submit" disabled={uploading}>
                  {uploading ? "Uploading..." : "Upload"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;
