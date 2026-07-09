import React, { useState, useEffect } from 'react';
import { Activity, Clock, Shield } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { supabase } from '../../lib/supabase';

interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  details: string;
  ip_address: string;
  created_at: string;
}

export default function ActivityLogs() {
  const { profile } = useAuthStore();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching activity logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const isSuperAdmin = profile?.role === 'Super Admin';

  if (!isSuperAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Shield className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-neutral-900">Access Denied</h2>
        <p className="text-neutral-500 mt-2">Only Super Admins can view activity logs.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm border border-neutral-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50/50 flex justify-between items-center">
          <h3 className="text-lg font-medium text-neutral-900 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-neutral-500" />
            System Activity Logs
          </h3>
        </div>

        <div className="p-0">
          {loading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900"></div>
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center p-8 text-neutral-500">
              No activity logs found.
            </div>
          ) : (
            <ul className="divide-y divide-neutral-200">
              {logs.map((log) => (
                <li key={log.id} className="p-6 hover:bg-neutral-50 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-neutral-100 flex items-center justify-center border border-neutral-200">
                        <Clock className="h-4 w-4 text-neutral-500" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-neutral-900">
                        {log.action}
                      </p>
                      <p className="text-sm text-neutral-500 mt-1">
                        {log.details}
                      </p>
                      <div className="mt-2 flex items-center text-xs text-neutral-400 space-x-4">
                        <span>{new Date(log.created_at).toLocaleString()}</span>
                        {log.ip_address && <span>IP: {log.ip_address}</span>}
                        <span className="font-mono bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-500 border border-neutral-200">
                          {log.user_id}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
