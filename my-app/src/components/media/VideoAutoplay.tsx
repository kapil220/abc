import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { WorkItem } from "@/types"; // Import the shared interface

interface VideoAutoplayProps {
  work: WorkItem;
  index: number;
  openModal: (work: WorkItem) => void;
}

export default function VideoAutoplay({ work, index, openModal }: VideoAutoplayProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const getHeightClass = (index: number) => {
    const mod = index % 3;
    if (mod === 0) return "h-80";
    if (mod === 1) return "h-96";
    return "h-72";
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && work.video) {
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Safely handle case where work.video might be undefined
  if (!work.video) {
    console.error("VideoAutoplay component received a work item without a video property");
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: "easeOut"
      }}
      className="group cursor-pointer break-inside-avoid mb-6 will-change-transform"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => openModal(work)}
    >
      <div
        className={`relative overflow-hidden rounded-xl shadow-md ${getHeightClass(index)} transition-all duration-500 ease-in-out group-hover:shadow-lg transform group-hover:scale-[1.02]`}
      >
        {/* Video container */}
        <div className="h-full w-full relative">
          <video
            ref={videoRef}
            src={work.video}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            playsInline
            loop
            preload="metadata"
          />

          {/* Play button overlay shown when not hovering */}
          {!isHovered && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <Play className="h-10 w-10 text-white" />
              </div>
            </div>
          )}

          {/* Overlay shown on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>

        {/* Content that appears on hover */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div>
            <span className="inline-block px-2 py-1 text-xs font-medium bg-pineGreen text-white rounded-md mb-2">
              {work.category || "Video"}
            </span>
            

            <div className="mt-2">
              {(work.tags?.length ? work.tags : ["Video", "Creative", "Motion"]).map((tag, i) => (
                <span key={i} className="text-xs bg-white/20 text-white px-2 py-1 rounded backdrop-blur-sm mr-2">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}