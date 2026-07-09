import React, { useState, useEffect } from 'react';
import { Users as UsersIcon, Search, Filter, MoreVertical, Edit2, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuthStore, Profile } from '../../store/authStore';
import { supabase } from '../../lib/supabase';
import { logActivity } from '../../lib/activity';

const roles = ['Super Admin', 'Administrator', 'Editor', 'Teacher / Instructor', 'Student', 'Parent', 'Pending User'];
const statuses = ['Active', 'Pending', 'Suspended'];

export default function Users() {
  const { profile: currentUser } = useAuthStore();
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editingUser, setEditingUser] = useState<Profile | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (userId: string, newRole: string, newStatus: string) => {
    setIsUpdating(true);
    setMessage({ type: '', text: '' });
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole, status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', userId);

      if (error) throw error;

      setUsers(users.map(u => 
        u.id === userId ? { ...u, role: newRole, status: newStatus } : u
      ));
      
      setEditingUser(null);
      setMessage({ type: 'success', text: 'User updated successfully' });
      
      await logActivity('Updated User', `Updated role/status for user ID: ${userId}`);
      
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error: any) {
      console.error('Error updating user:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to update user' });
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = (user.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const isSuperAdmin = currentUser?.role === 'Super Admin';
  const isAdmin = currentUser?.role === 'Administrator' || isSuperAdmin;

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Shield className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-neutral-900">Access Denied</h2>
        <p className="text-neutral-500 mt-2">You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm border border-neutral-200 rounded-xl overflow-hidden">
         <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50/50 flex justify-between items-center">
            <h3 className="text-lg font-medium text-neutral-900 flex items-center">
                <UsersIcon className="h-5 w-5 mr-2 text-neutral-500" />
                Manage Users
            </h3>
         </div>
         <div className="p-6 overflow-x-auto">
             <table className="min-w-full divide-y divide-neutral-200">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                     {filteredUsers.map(user => (
                         <tr key={user.id}>
                             <td className="px-6 py-4 whitespace-nowrap">
                                 <div className="text-sm font-medium text-neutral-900">{user.full_name || 'No Name'}</div>
                                 <div className="text-sm text-neutral-500">{user.email}</div>
                             </td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                                 {user.role}
                             </td>
                             <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    user.status === 'Active' ? 'bg-green-100 text-green-800' :
                                    user.status === 'Suspended' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {user.status}
                                </span>
                             </td>
                             <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  {isSuperAdmin && currentUser?.id !== user.id && (
                                     <button 
                                        onClick={() => setEditingUser(user)}
                                        className="text-indigo-600 hover:text-indigo-900"
                                     >
                                        Edit
                                     </button>
                                  )}
                             </td>
                         </tr>
                     ))}
                </tbody>
             </table>
         </div>
      </div>

      {editingUser && (
        <div className="fixed inset-0 bg-neutral-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">Edit User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700">Role</label>
                <select
                  className="mt-1 block w-full rounded-lg border-neutral-200 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 sm:text-sm"
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                >
                  {roles.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700">Status</label>
                <select
                  className="mt-1 block w-full rounded-lg border-neutral-200 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 sm:text-sm"
                  value={editingUser.status}
                  onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                >
                  {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdateRole(editingUser.id, editingUser.role, editingUser.status)}
                  disabled={isUpdating}
                  className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50"
                >
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
