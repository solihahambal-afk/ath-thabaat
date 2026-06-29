import { motion } from 'motion/react';

interface LoadingScreenProps {
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingScreen({ message = 'Please wait...', fullScreen = true }: LoadingScreenProps) {
  const containerClasses = fullScreen
    ? "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
    : "w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-white/80";

  return (
    <div className={containerClasses}>
      <div className="relative flex items-center justify-center">
        {/* Rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "linear"
          }}
          className="absolute w-28 h-28 rounded-full border-[3px] border-gray-100 border-t-primary-700"
        />
        
        {/* School Logo */}
        <img 
          src="/logo.jpg" 
          alt="Ath-Thabaat Logo" 
          className="w-16 h-16 rounded-full object-cover z-10"
        />
      </div>
      
      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          repeatType: "reverse"
        }}
        className="mt-8 text-primary-900 text-sm font-medium font-sans tracking-widest uppercase"
      >
        {message}
      </motion.p>
    </div>
  );
}
