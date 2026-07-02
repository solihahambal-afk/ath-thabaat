import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Navigate } from 'react-router-dom';
import { Activity, Clock, User, Filter, Search } from 'lucide-react';
import LoadingScreen from '../../components/LoadingScreen';
import { supabase } from '../../lib/supabase';

interface ActivityLog {
  id: string;
  user_id: string;
  user_name: string;
  action: string;
  details: string;
  created_at: string;
}

export default function ActivityLogs() {
  const { role } = useAuthStore();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('');

  // Fallback to mock data if the table doesn't exist yet
  const [useMock, setUseMock] = useState(false);

  const mockLogs: ActivityLog[] = [
    { id: '1', user_id: '123', user_name: 'Admin User', action: 'Login', details: 'User logged in successfully.', created_at: new Date().toISOString() },
    { id: '2', user_id: '123', user_name: 'Admin User', action: 'Role Update', details: 'Updated role for user ID: 456 to Editor.', created_at: new Date(Date.now() - 3600000).toISOString() },
    { id: '3', user_id: '789', user_name: 'Jane Doe', action: 'Content Published', details: 'Published a new news article.', created_at: new Date(Date.now() - 7200000).toISOString() },
  ];

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        if (error.code === '42P01') { // table does not exist
          setUseMock(true);
          setLogs(mockLogs);
        } else {
          throw error;
        }
      } else {
        setLogs(data || []);
      }
    } catch (error) {
      console.error('Error fetching activity logs:', error);
      // Fallback to mock for preview purposes
      setUseMock(true);
      setLogs(mockLogs);
    } finally {
      setLoading(false);
    }
  };

  const actionTypes = ['Login', 'Logout', 'User Creation', 'Role Update', 'Ownership Transfer', 'Content Published', 'Settings Update'];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.user_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          log.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = actionFilter ? log.action === actionFilter : true;
    return matchesSearch && matchesAction;
  });

  if (role !== 'Super Admin') {
    return <Navigate to="/admin" replace />;
  }

  if (loading) return <LoadingScreen />;

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between border-b border-gray-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight font-serif flex items-center gap-2">
            <Activity className="h-8 w-8 text-primary-700" />
            Activity Logs
          </h2>
          <p className="mt-2 max-w-4xl text-sm text-gray-500">
            Monitor system events, user actions, and security-related activities.
          </p>
        </div>
      </div>

      {useMock && (
        <div className="bg-blue-50 text-blue-800 p-4 rounded-md text-sm">
          <strong>Note:</strong> The database table for activity logs is not yet created. Showing simulated data for preview purposes.
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-end">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users or details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="relative w-full sm:w-48">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6"
            >
              <option value="">All Actions</option>
              {actionTypes.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Timestamp</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">User</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Action</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 text-gray-500">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      {new Date(log.created_at).toLocaleString()}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      {log.user_name}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {log.details}
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-sm text-gray-500">
                    No activity logs found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
