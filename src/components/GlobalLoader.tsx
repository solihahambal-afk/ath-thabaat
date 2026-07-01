import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import LoadingScreen from './LoadingScreen';

export default function GlobalLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isInitialMount = useRef(true);

  // Route change and initial load
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1200); // Initial load duration
      return () => clearTimeout(timer);
    } else {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="global-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[100]"
          >
            <LoadingScreen message="Loading..." fullScreen={true} />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
