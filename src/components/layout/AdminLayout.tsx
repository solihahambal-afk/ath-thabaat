import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import LoadingScreen from '../LoadingScreen';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Image as ImageIcon, 
  Calendar, 
  UserCircle, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

export default function AdminLayout() {
  const { user, role, loading, signOut, initialize } = useAuthStore();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (loading) {
    return <LoadingScreen message="Authenticating..." />;
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const getNavItems = () => {
    const baseItems = [
      { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    ];

    if (role === 'Super Admin') {
      return [
        ...baseItems,
        { name: 'Users', href: '/admin/users', icon: Users },
        { name: 'News', href: '/admin/news', icon: FileText },
        { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
        { name: 'Events', href: '/admin/events', icon: Calendar },
        { name: 'Staff', href: '/admin/staff', icon: UserCircle },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
      ];
    }

    if (role === 'Administrator') {
      return [
        ...baseItems,
        { name: 'News', href: '/admin/news', icon: FileText },
        { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
        { name: 'Events', href: '/admin/events', icon: Calendar },
        { name: 'Staff', href: '/admin/staff', icon: UserCircle },
      ];
    }

    // Editor
    return [
      ...baseItems,
      { name: 'My News', href: '/admin/news', icon: FileText },
      { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
      { name: 'Events', href: '/admin/events', icon: Calendar },
    ];
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-primary-900 text-white p-4">
        <div className="font-serif font-bold text-lg flex items-center gap-2">
          <img src="/logo.jpg" alt="Logo" className="w-8 h-8 rounded-full" />
          Ath-Thabaat Admin
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-primary-900 text-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 hidden md:flex items-center gap-3">
          <img src="/logo.jpg" alt="Logo" className="w-10 h-10 rounded-full" />
          <h1 className="text-xl font-serif font-bold tracking-wider">Admin</h1>
        </div>
        
        <nav className="mt-6 flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium",
                  isActive 
                    ? "bg-primary-700 text-white" 
                    : "text-primary-100 hover:bg-primary-800"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-primary-800 mt-auto absolute bottom-0 w-full">
          <div className="flex items-center gap-3 mb-4 px-4">
            <div className="w-8 h-8 rounded-full bg-primary-700 flex items-center justify-center text-sm font-bold">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{user.email}</p>
              <p className="text-xs text-primary-300 truncate">{role}</p>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="flex w-full items-center gap-3 px-4 py-2 text-sm font-medium text-red-300 hover:text-red-200 hover:bg-primary-800 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto md:ml-0 h-screen">
        <main className="p-6 md:p-8">
          <Outlet />
        </main>
      </div>
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
