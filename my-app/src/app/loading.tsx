"use client";

import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-isabelline text-taupe">
      <motion.img
        src="https://res.cloudinary.com/dmqkf89ib/image/upload/v1744106859/landing/images/owafv6v5yvra8dsnoqmy.webp"
        alt="Company Logo"
        className="w-32 h-auto mb-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <h1 className="text-2xl font-semibold">The Ink Pot Group</h1>
      <motion.div
        className="mt-4 w-16 h-1 bg-pineGreen"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default Loading;
