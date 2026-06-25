import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Academics', href: '/academics' },
  { name: 'Admissions', href: '/admissions' },
  { name: 'Campuses', href: '/campuses' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'News & Events', href: '/news' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-3">
              <img src="/logo.jpg" alt="Ath-Thabaat Logo" className="h-12 w-auto object-contain" />
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold leading-tight text-primary-700">
                  Ath-Thabaat
                </span>
                <span className="text-xs font-medium text-gold-500 uppercase tracking-wider">
                  International Schools
                </span>
              </div>
            </Link>
          </div>
          
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-600 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <nav className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "text-sm font-semibold leading-6 transition-colors hover:text-primary-600 relative py-2",
                    isActive ? "text-primary-700" : "text-primary-800"
                  )}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
            <Link
              to="/portal"
              className="text-sm font-semibold leading-6 text-primary-900 hover:text-primary-600 flex items-center gap-2"
            >
              <GraduationCap className="h-4 w-4" />
              Portal
            </Link>
            <Link
              to="/admissions"
              className="rounded-md bg-primary-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-primary-900/80 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              id="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 lg:hidden shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                  <img src="/logo.jpg" alt="Ath-Thabaat Logo" className="h-10 w-auto object-contain" />
                  <div className="flex flex-col">
                    <span className="font-serif text-lg font-bold leading-tight text-primary-700">
                      Ath-Thabaat
                    </span>
                  </div>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-primary-800 hover:bg-primary-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-4 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-0.5 py-4">
                    {navigation.map((item) => {
                      const isActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={cn(
                            "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-primary-50",
                            isActive ? "text-primary-700 bg-primary-50" : "text-primary-900"
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                  <div className="py-4 flex flex-col gap-3">
                    <Link
                      to="/portal"
                      className="-mx-3 flex items-center gap-2 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-primary-900 hover:bg-primary-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <GraduationCap className="h-5 w-5 text-primary-700" />
                      Parent/Student Portal
                    </Link>
                    <Link
                      to="/admissions"
                      className="block w-full rounded-md bg-primary-700 px-3 py-2.5 text-center text-base font-semibold text-white shadow-sm hover:bg-primary-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
