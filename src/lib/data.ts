
export interface VideoData {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  category: string;
  type: "movie" | "tvshow" | "popular" | "other";  // Added type categorization
  featured?: boolean;
  year: number;
  rating: string;
  isUserUploaded?: boolean;
}

// Demo data for our streaming app
export const videoData: VideoData[] = [
  {
    id: "v1",
    title: "Ocean Exploration",
    description: "Dive into the depths of the ocean and discover the hidden wonders beneath the waves in this breathtaking documentary.",
    thumbnailUrl: "https://images.unsplash.com/photo-1682686581362-796145f0e123?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    duration: "2:45",
    category: "Documentary",
    type: "movie",
    featured: true,
    year: 2023,
    rating: "PG"
  },
  {
    id: "v2",
    title: "Urban Adventure",
    description: "Follow the story of young artists as they navigate the concrete jungle and find inspiration in unexpected places.",
    thumbnailUrl: "https://images.unsplash.com/photo-1682685795463-0674c065f315?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    duration: "3:12",
    category: "Drama",
    type: "movie",
    year: 2022,
    rating: "PG-13"
  },
  {
    id: "v3",
    title: "Cosmic Journey",
    description: "Embark on an interstellar voyage through our solar system and beyond, exploring the mysteries of space.",
    thumbnailUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BhY2V8ZW58MHx8MHx8fDA%3D",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    duration: "4:30",
    category: "Science",
    type: "tvshow",
    featured: true,
    year: 2023,
    rating: "G"
  },
  {
    id: "v4",
    title: "Mountain Expedition",
    description: "Join a team of mountaineers as they attempt to conquer one of the world's most challenging peaks.",
    thumbnailUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    duration: "3:45",
    category: "Adventure",
    type: "movie",
    year: 2021,
    rating: "PG"
  },
  {
    id: "v5",
    title: "Culinary Delights",
    description: "Explore exotic cuisines from around the world and learn the secrets behind delicious traditional dishes.",
    thumbnailUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    duration: "2:55",
    category: "Food",
    type: "tvshow",
    year: 2022,
    rating: "G"
  },
  {
    id: "v6",
    title: "Wildlife Encounters",
    description: "Get up close with some of nature's most incredible creatures in their natural habitats.",
    thumbnailUrl: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2lsZGxpZmV8ZW58MHx8MHx8fDA%3D",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: "3:20",
    category: "Nature",
    type: "popular",
    featured: true,
    year: 2023,
    rating: "G"
  },
  {
    id: "v7",
    title: "Tech Revolution",
    description: "Discover how cutting-edge technology is transforming our world and shaping the future of humanity.",
    thumbnailUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRlY2h8ZW58MHx8MHx8fDA%3D",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    duration: "4:15",
    category: "Technology",
    type: "popular",
    year: 2021,
    rating: "PG"
  },
  {
    id: "v8",
    title: "Urban Architecture",
    description: "Explore the most innovative and inspiring architectural wonders in major cities around the globe.",
    thumbnailUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YXJjaGl0ZWN0dXJlfGVufDB8fDB8fHww",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    duration: "3:05",
    category: "Design",
    type: "movie",
    year: 2022,
    rating: "G"
  },
  // Adding more videos
  {
    id: "v9",
    title: "Desert Odyssey",
    description: "Journey through the vast expanse of the world's most beautiful deserts and discover their hidden secrets.",
    thumbnailUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    duration: "4:10",
    category: "Travel",
    type: "movie",
    year: 2023,
    rating: "PG"
  },
  {
    id: "v10",
    title: "City Lights",
    description: "Experience the vibrant nightlife of the world's most electric cities as they come alive after dark.",
    thumbnailUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    duration: "3:30",
    category: "Urban",
    type: "popular",
    year: 2022,
    rating: "PG-13"
  },
  {
    id: "v11",
    title: "Forest Mysteries",
    description: "Delve into the ancient woodlands and uncover the hidden stories and creatures of these mystical environments.",
    thumbnailUrl: "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    duration: "3:15",
    category: "Nature",
    type: "tvshow",
    year: 2021,
    rating: "G"
  },
  {
    id: "v12",
    title: "Space Frontiers",
    description: "Join the newest generation of astronauts as they push the boundaries of space exploration to new limits.",
    thumbnailUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
    duration: "4:25",
    category: "Science",
    type: "popular",
    featured: true,
    year: 2023,
    rating: "PG"
  }
];

export const categories = [...new Set(videoData.map(video => video.category))];

export const featuredVideos = videoData.filter(video => video.featured);

// Function to add a user uploaded video to the data
export const addUserUploadedVideo = (video: Omit<VideoData, 'id'>) => {
  const newVideo: VideoData = {
    ...video,
    id: `user-${Date.now()}`,
    isUserUploaded: true,
    type: "other"  // Default type for user uploads
  };
  
  videoData.push(newVideo);
  return newVideo;
};
