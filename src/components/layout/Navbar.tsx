import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Home, BookOpen, GraduationCap, 
  Newspaper, Calendar, Image as ImageIcon, User, 
  Users as UsersIcon, Phone, Settings, Search, LogOut, ChevronDown, ChevronRight, LogIn, LayoutDashboard
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useAuthStore } from '../../store/authStore';

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

const mobileNavigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About School', href: '/about', icon: BookOpen },
  { 
    name: 'Admissions', 
    href: '/admissions', 
    icon: GraduationCap,
    subItems: [
      { name: 'Campuses', href: '/campuses' }
    ]
  },
  { name: 'Academic Programmes', href: '/academics', icon: BookOpen },
  { name: 'News & Announcements', href: '/news', icon: Newspaper },
  { name: 'Events', href: '/events', icon: Calendar },
  { name: 'Gallery', href: '/gallery', icon: ImageIcon },
  { name: 'Student Portal', href: '/portal', icon: User },
  { name: 'Parent Portal', href: '/portal', icon: UsersIcon },
  { name: 'Contact Us', href: '/contact', icon: Phone },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const location = useLocation();
  const { user, profile, role, signOut, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  // Filter mobile menu based on search query
  const filteredNav = mobileNavigation.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subItems?.some(sub => sub.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleExpand = (name: string) => {
    setExpandedItems(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const displayName = profile?.full_name || profile?.username || user?.email?.split('@')[0];
  const initials = displayName?.charAt(0).toUpperCase();

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
          
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4 items-center">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setDesktopDropdownOpen(!desktopDropdownOpen)}
                  className="flex items-center gap-2 hover:bg-gray-50 rounded-full py-1.5 pl-1.5 pr-3 transition-colors border border-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm overflow-hidden">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      initials
                    )}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-semibold text-gray-900 leading-tight">
                      {displayName}
                    </span>
                    <span className="text-xs text-gray-500 leading-tight">{role || 'User'}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400 ml-1" />
                </button>

                <AnimatePresence>
                  {desktopDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setDesktopDropdownOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50"
                      >
                        <Link
                          to="/admin"
                          onClick={() => setDesktopDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          Dashboard
                        </Link>
                        <Link
                          to="/admin/profile"
                          onClick={() => setDesktopDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                        >
                          <User className="h-4 w-4" />
                          Profile
                        </Link>
                        <Link
                          to="/admin/settings"
                          onClick={() => setDesktopDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                        >
                          <Settings className="h-4 w-4" />
                          Settings
                        </Link>
                        <hr className="my-1 border-gray-100" />
                        <button
                          onClick={() => {
                            signOut();
                            setDesktopDropdownOpen(false);
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            )}
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
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              id="mobile-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-y-0 left-0 z-50 w-[85%] max-w-[320px] bg-white lg:hidden flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex flex-col items-center pt-6 pb-2 border-b border-gray-100 relative">
                <img src="/logo.jpg" alt="Ath-Thabaat" className="h-12 w-12 object-contain" />
                <h2 className="mt-2 font-serif font-bold text-xs tracking-wider text-primary-900 uppercase">
                  Ath-Thabaat Schools
                </h2>
                
                {/* Mobile Authentication Section */}
                <div className="w-full mt-2 px-4">
                  {user ? (
                    <div className="w-full">
                      <button 
                        onClick={() => toggleExpand('user-menu')}
                        className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold flex-shrink-0 text-xs overflow-hidden">
                            {profile?.avatar_url ? (
                              <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                              initials
                            )}
                          </div>
                          <div className="flex flex-col text-left overflow-hidden">
                            <span className="text-sm font-semibold text-gray-900 truncate">
                              {displayName}
                            </span>
                            <span className="text-[10px] leading-tight text-gray-500 truncate">{role || 'User'}</span>
                          </div>
                        </div>
                        <ChevronDown className={cn("h-4 w-4 text-gray-400 transition-transform", expandedItems['user-menu'] && "rotate-180")} />
                      </button>
                      
                      <AnimatePresence>
                        {expandedItems['user-menu'] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden mt-1"
                          >
                            <div className="space-y-0.5 p-1.5 bg-gray-50 rounded-lg border border-gray-100">
                              <Link
                                to="/admin"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-white transition-colors"
                              >
                                <LayoutDashboard className="h-4 w-4" />
                                Dashboard
                              </Link>
                              <Link
                                to="/admin/profile"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-white transition-colors"
                              >
                                <User className="h-4 w-4" />
                                Profile
                              </Link>
                              <Link
                                to="/admin/settings"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-white transition-colors"
                              >
                                <Settings className="h-4 w-4" />
                                Settings
                              </Link>
                              <button
                                onClick={() => { signOut(); setMobileMenuOpen(false); }}
                                className="w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-red-600 hover:bg-white transition-colors text-left"
                              >
                                <LogOut className="h-4 w-4" />
                                Logout
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to="/admin/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-primary-700 text-white rounded-lg text-sm font-semibold shadow hover:bg-primary-600 transition-colors"
                    >
                      <LogIn className="h-4 w-4" />
                      Login
                    </Link>
                  )}
                </div>
              </div>

              {/* Search */}
              <div className="p-2 border-b border-gray-50">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search navigation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-shadow"
                  />
                </div>
              </div>

              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto py-1">
                <nav className="px-2 space-y-0">
                  {filteredNav.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <div key={item.name}>
                        <div className="flex items-center justify-between">
                          <Link
                            to={item.href}
                            onClick={() => {
                              if (!item.subItems) setMobileMenuOpen(false);
                            }}
                            className={cn(
                              "flex flex-1 items-center gap-2 px-3 py-1 rounded-md text-sm font-medium transition-colors",
                              isActive
                                ? "bg-primary-50 text-primary-700"
                                : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                            )}
                          >
                            <item.icon className={cn("h-4 w-4", isActive ? "text-primary-700" : "text-gray-400")} />
                            {item.name}
                          </Link>
                          {item.subItems && (
                            <button
                              onClick={() => toggleExpand(item.name)}
                              className="p-1.5 text-gray-400 hover:text-primary-600 focus:outline-none"
                            >
                              {expandedItems[item.name] ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </button>
                          )}
                        </div>
                        
                        {/* SubItems */}
                        <AnimatePresence>
                          {item.subItems && expandedItems[item.name] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-10 pr-3 py-0.5 space-y-0.5">
                                {item.subItems.map(sub => (
                                  <Link
                                    key={sub.name}
                                    to={sub.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                      "block px-3 py-1 rounded-md text-sm font-medium transition-colors",
                                      location.pathname === sub.href
                                        ? "text-primary-700 bg-primary-50"
                                        : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                                    )}
                                  >
                                    {sub.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </nav>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
