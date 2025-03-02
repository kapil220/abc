// Define the shared WorkItem interface
export interface WorkItem {
    title: string;
    type: string;
    video?: string; // Make optional to accommodate image-only items
    image?: string; // Optional for video-only items
    thumbnail?: string; // For video items that have thumbnails
    category?: string;
    description?: string;
    tags?: string[];
  }
  
  // Add any other shared types here