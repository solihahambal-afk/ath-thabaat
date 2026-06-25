import { motion } from 'motion/react';
import { Lock, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Portal() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-6 py-24 sm:py-32 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md w-full bg-white p-12 rounded-3xl shadow-sm ring-1 ring-gray-200"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 mb-8">
          <GraduationCap className="h-10 w-10 text-primary-700" aria-hidden="true" />
        </div>
        
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl font-serif">Parent/Student Portal</h1>
        <p className="mt-6 text-base leading-7 text-gray-600 mb-8">
          The online portal is currently under development. Soon you will be able to access academic records, pay fees, and view announcements here.
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-gold-600 bg-gold-50 p-4 rounded-lg mb-8">
          <Lock className="w-4 h-4" />
          <span>Secure access coming soon</span>
        </div>

        <div className="flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-primary-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors"
          >
            Go back home
          </Link>
          <Link to="/contact" className="text-sm font-semibold text-primary-900 hover:text-primary-700 transition-colors">
            Contact support <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
