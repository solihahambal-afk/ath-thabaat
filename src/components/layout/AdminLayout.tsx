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
  X,
  Activity
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

export default function AdminLayout() {
  const { user, profile, loading, signOut, initialize } = useAuthStore();
  const role = profile?.role;
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
        { name: 'Activity Logs', href: '/admin/activity-logs', icon: Activity },
        { name: 'Courses', href: '/admin/courses', icon: FileText },
        { name: 'Classes', href: '/admin/classes', icon: Users },
        { name: 'Quizzes & CBT', href: '/admin/exams', icon: FileText },
        { name: 'Website Config', href: '/admin/website', icon: ImageIcon },
        { name: 'News', href: '/admin/news', icon: FileText },
        { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
        { name: 'Events', href: '/admin/events', icon: Calendar },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
      ];
    }

    if (role === 'Administrator') {
      return [
        ...baseItems,
        { name: 'Students', href: '/admin/students', icon: Users },
        { name: 'Teachers', href: '/admin/teachers', icon: Users },
        { name: 'Classes', href: '/admin/classes', icon: Users },
        { name: 'Attendance', href: '/admin/attendance', icon: Activity },
        { name: 'Timetables', href: '/admin/timetables', icon: Calendar },
        { name: 'Announcements', href: '/admin/announcements', icon: FileText },
        { name: 'Reports', href: '/admin/reports', icon: FileText },
      ];
    }

    if (role === 'Editor') {
      return [
        ...baseItems,
        { name: 'Homepage', href: '/admin/homepage', icon: LayoutDashboard },
        { name: 'Website Pages', href: '/admin/pages', icon: FileText },
        { name: 'News', href: '/admin/news', icon: FileText },
        { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
        { name: 'Announcements', href: '/admin/announcements', icon: FileText },
        { name: 'Events', href: '/admin/events', icon: Calendar },
      ];
    }

    if (role === 'Teacher / Instructor') {
      return [
        ...baseItems,
        { name: 'My Classes', href: '/admin/my-classes', icon: Users },
        { name: 'My Courses', href: '/admin/my-courses', icon: FileText },
        { name: 'Quizzes', href: '/admin/quizzes', icon: FileText },
        { name: 'CBT Exams', href: '/admin/cbt', icon: FileText },
        { name: 'Assignments', href: '/admin/assignments', icon: FileText },
        { name: 'Results', href: '/admin/results', icon: Activity },
      ];
    }

    if (role === 'Student') {
      return [
        ...baseItems,
        { name: 'My Courses', href: '/admin/student-courses', icon: FileText },
        { name: 'My Classes', href: '/admin/student-classes', icon: Users },
        { name: 'Assignments', href: '/admin/student-assignments', icon: FileText },
        { name: 'Quizzes & CBT', href: '/admin/student-exams', icon: FileText },
        { name: 'Results', href: '/admin/student-results', icon: Activity },
        { name: 'My Profile', href: '/admin/profile', icon: UserCircle },
      ];
    }

    if (role === 'Parent') {
      return [
        ...baseItems,
        { name: 'Student Progress', href: '/admin/student-progress', icon: Activity },
        { name: 'Messages', href: '/admin/messages', icon: FileText },
        { name: 'My Profile', href: '/admin/profile', icon: UserCircle },
      ];
    }

    if (role === 'Pending User') {
      return [
        ...baseItems,
        { name: 'My Profile', href: '/admin/profile', icon: UserCircle },
      ];
    }

    return [
      ...baseItems,
      { name: 'My Profile', href: '/admin/profile', icon: UserCircle },
    ];
  };

  const navItems = getNavItems();
  const displayName = profile?.full_name || profile?.username || user.email?.split('@')[0];
  const initials = displayName?.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-primary-900 text-white p-4">
        <div className="font-serif font-bold text-lg flex items-center gap-2">
          <img src="/logo.jpg" alt="Logo" className="w-8 h-8 rounded-full" />
          Ath-Thabaat Portal
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
          <h1 className="text-xl font-serif font-bold tracking-wider">Portal</h1>
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

        <div className="p-4 border-t border-primary-800 mt-auto absolute bottom-0 w-full bg-primary-900">
          <Link to="/admin/profile" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 mb-4 px-4 hover:bg-primary-800 rounded-lg py-2 transition-colors -mx-2">
            <div className="w-8 h-8 rounded-full bg-primary-700 flex items-center justify-center text-sm font-bold overflow-hidden flex-shrink-0">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                initials
              )}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate text-white">{displayName}</p>
              <p className="text-xs text-primary-300 truncate">{role || 'User'}</p>
            </div>
          </Link>
          <button
            onClick={() => signOut()}
            className="flex w-full items-center gap-3 px-4 py-2 text-sm font-medium text-red-300 hover:text-red-200 hover:bg-primary-800 rounded-lg transition-colors -mx-2"
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
