import { useAuthStore } from '../../store/authStore';
import { Shield, FileText, Image as ImageIcon, Calendar, Users, Activity, Settings, UserCircle, BookOpen, Clock, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardCard = ({ title, value, icon: Icon, to }: { title: string, value: string, icon: any, to: string }) => (
  <Link to={to} className="overflow-hidden rounded-lg bg-white shadow ring-1 ring-black/5 hover:shadow-md transition-shadow">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0 rounded-md bg-primary-50 p-3">
          <Icon className="h-6 w-6 text-primary-700" aria-hidden="true" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="truncate text-sm font-medium text-gray-500">{title}</dt>
            <dd className="text-lg font-bold text-gray-900">{value}</dd>
          </dl>
        </div>
      </div>
    </div>
  </Link>
);

const SuperAdminDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <DashboardCard title="Total Users" value="Manage" icon={Users} to="/admin/users" />
      <DashboardCard title="Courses" value="Manage" icon={BookOpen} to="/admin/courses" />
      <DashboardCard title="Classes" value="Manage" icon={Users} to="/admin/classes" />
      <DashboardCard title="CBT Exams" value="Manage" icon={FileText} to="/admin/exams" />
      <DashboardCard title="Quizzes" value="Manage" icon={FileText} to="/admin/quizzes" />
      <DashboardCard title="Activity Logs" value="View" icon={Activity} to="/admin/activity-logs" />
      <DashboardCard title="Website Settings" value="Configure" icon={Settings} to="/admin/settings" />
      <DashboardCard title="News" value="Manage" icon={FileText} to="/admin/news" />
    </div>
  </div>
);

const AdministratorDashboard = () => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
    <DashboardCard title="Students" value="Manage" icon={Users} to="/admin/students" />
    <DashboardCard title="Teachers" value="Manage" icon={Users} to="/admin/teachers" />
    <DashboardCard title="Classes" value="Manage" icon={Users} to="/admin/classes" />
    <DashboardCard title="Courses" value="Manage" icon={BookOpen} to="/admin/courses" />
    <DashboardCard title="Attendance" value="Manage" icon={Activity} to="/admin/attendance" />
    <DashboardCard title="Upcoming Exams" value="View" icon={FileText} to="/admin/exams" />
    <DashboardCard title="Announcements" value="Publish" icon={FileText} to="/admin/announcements" />
    <DashboardCard title="Reports" value="View" icon={Activity} to="/admin/reports" />
  </div>
);

const EditorDashboard = () => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <DashboardCard title="Published News" value="Manage" icon={FileText} to="/admin/news" />
    <DashboardCard title="Gallery Uploads" value="Upload" icon={ImageIcon} to="/admin/gallery" />
    <DashboardCard title="Events" value="Manage" icon={Calendar} to="/admin/events" />
    <DashboardCard title="Homepage" value="Edit" icon={LayoutDashboard} to="/admin/homepage" />
    <DashboardCard title="Announcements" value="Publish" icon={FileText} to="/admin/announcements" />
  </div>
);

const TeacherDashboard = () => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <DashboardCard title="Assigned Courses" value="View" icon={BookOpen} to="/admin/my-courses" />
    <DashboardCard title="Assigned Classes" value="View Rosters" icon={Users} to="/admin/my-classes" />
    <DashboardCard title="Students" value="View" icon={Users} to="/admin/students" />
    <DashboardCard title="Pending Assignments" value="Grade" icon={FileText} to="/admin/assignments" />
    <DashboardCard title="Upcoming Quizzes" value="Manage" icon={FileText} to="/admin/quizzes" />
    <DashboardCard title="Upcoming CBT Exams" value="Manage" icon={FileText} to="/admin/cbt" />
  </div>
);

const StudentDashboard = () => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <DashboardCard title="Enrolled Courses" value="View" icon={BookOpen} to="/admin/student-courses" />
    <DashboardCard title="Upcoming Classes" value="Join" icon={Users} to="/admin/student-classes" />
    <DashboardCard title="Assignments Due" value="Submit" icon={FileText} to="/admin/student-assignments" />
    <DashboardCard title="Pending Quizzes" value="Take" icon={FileText} to="/admin/student-exams" />
    <DashboardCard title="Upcoming CBT" value="Take" icon={FileText} to="/admin/student-exams" />
    <DashboardCard title="Results" value="View" icon={Activity} to="/admin/student-results" />
  </div>
);

const ParentDashboard = () => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <DashboardCard title="Student Progress" value="View Reports" icon={Activity} to="/admin/student-progress" />
    <DashboardCard title="Messages" value="Inbox" icon={FileText} to="/admin/messages" />
  </div>
);

const PendingUserDashboard = ({ profile }: { profile: any }) => (
  <div className="bg-white shadow sm:rounded-lg border border-gray-200">
    <div className="px-4 py-5 sm:p-6">
      <h3 className="text-lg font-semibold leading-6 text-gray-900">Welcome to the Portal</h3>
      <div className="mt-4 max-w-xl text-sm text-gray-600 space-y-4">
        <p className="flex items-center gap-2">
          <span className="font-medium text-gray-900">Account Status:</span>
          <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
            Pending Approval
          </span>
        </p>
        <p className="flex items-center gap-2">
          <span className="font-medium text-gray-900">Assigned Role:</span>
          <span className="text-gray-700">{profile?.role || 'Pending User'}</span>
        </p>
        {profile?.created_at && (
          <p className="flex items-center gap-2">
            <span className="font-medium text-gray-900">Registration Date:</span>
            <span className="text-gray-700">{new Date(profile.created_at).toLocaleDateString()}</span>
          </p>
        )}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4 rounded-r-md">
          <p className="text-blue-700">
            Your account has been created successfully. You will gain access to your assigned dashboard modules once your role has been approved by the Super Admin.
          </p>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-4">
        <Link
          to="/admin/profile"
          className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const { user, profile } = useAuthStore();
  const role = profile?.role;
  const displayName = profile?.full_name || profile?.username || user?.email?.split('@')[0];

  const renderDashboard = () => {
    switch (role) {
      case 'Super Admin': return <SuperAdminDashboard />;
      case 'Administrator': return <AdministratorDashboard />;
      case 'Editor': return <EditorDashboard />;
      case 'Teacher / Instructor': return <TeacherDashboard />;
      case 'Student': return <StudentDashboard />;
      case 'Parent': return <ParentDashboard />;
      case 'Pending User': return <PendingUserDashboard profile={profile} />;
      default: return <PendingUserDashboard profile={profile} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight font-serif flex items-center gap-3">
          {role === 'Super Admin' && <Shield className="h-8 w-8 text-primary-700" />}
          Dashboard
        </h2>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Welcome back, {displayName}. Your current role is <span className="font-semibold text-primary-700">{role || 'User'}</span>.
        </p>
      </div>

      {renderDashboard()}
    </div>
  );
}
