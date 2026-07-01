import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/') {
    return null;
  }

  const handleBack = () => {
    // React Router v6 adds an 'idx' to the history state. 
    // If idx > 0, there is a previous page within the app.
    const state = window.history.state as { idx?: number } | null;
    if (state && typeof state.idx === 'number' && state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const isAdminPanel = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      onClick={handleBack}
      className={cn(
        "fixed top-24 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition-all hover:bg-gray-50 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 group",
        isAdminPanel ? "left-4 md:left-[17.5rem]" : "left-4 sm:left-6 md:left-8 xl:left-12"
      )}
      aria-label="Go Back"
      title="Go Back"
    >
      <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
    </motion.button>
  );
}

