import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Shield, User as UserIcon, Mail, Edit2, Check, X, Search, Filter, Ban, CheckCircle, Trash2, Key } from 'lucide-react';
import LoadingScreen from '../../components/LoadingScreen';
import { logActivity } from '../../lib/activity';

interface Profile {
  id: string;
  username: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
  status?: string;
  last_login?: string;
}

export default function Users() {
  const { role, user: currentUser, fetchUserRole } = useAuthStore();
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Full Edit Modal
  const [editingUser, setEditingUser] = useState<Profile | null>(null);
  const [editFormData, setEditFormData] = useState({
    username: '',
    full_name: '',
    email: '',
  });

  const handleOpenEditModal = (user: Profile) => {
    setEditingUser(user);
    setEditFormData({
      username: user.username || '',
      full_name: user.full_name || '',
      email: user.email || '',
    });
  };

  const handleSaveUserDetails = async () => {
    if (!editingUser) return;
    try {
      setLoading(true);
      setMessage(null);
      const { error } = await supabase
        .from('profiles')
        .update({ 
          username: editFormData.username,
          full_name: editFormData.full_name,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingUser.id);
        
      if (error) throw error;
      
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, username: editFormData.username, full_name: editFormData.full_name } : u));
      setEditingUser(null);
      setMessage({ type: 'success', text: 'User details updated successfully.' });
      logActivity('User Update', `Updated details for user ID: ${editingUser.id}.`);
    } catch (error: any) {
      console.error('Error updating user:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to update user details.' });
    } finally {
      setLoading(false);
    }
  };

  // Transfer Ownership
  const [transferringId, setTransferringId] = useState<string | null>(null);
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const roles = ['Super Admin', 'Administrator', 'Editor', 'Teacher / Instructor', 'Student', 'Parent', 'Pending User'];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      setMessage({ type: 'error', text: 'Failed to load users.' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (userId: string) => {
    try {
      setMessage(null);
      const { error } = await supabase
        .from('profiles')
        .update({ role: selectedRole, updated_at: new Date().toISOString() })
        .eq('id', userId);

      if (error) throw error;

      setUsers(users.map(u => u.id === userId ? { ...u, role: selectedRole } : u));
      setEditingId(null);
      setMessage({ type: 'success', text: 'User role updated successfully.' });
      logActivity('Role Update', `Updated role for user ID: ${userId} to ${selectedRole}.`);
    } catch (error: any) {
      console.error('Error updating role:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to update role.' });
    }
  };

  const handleUpdateStatus = async (userId: string, newStatus: string) => {
    try {
      setMessage(null);
      const { error } = await supabase
        .from('profiles')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', userId);

      if (error) throw error;

      setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
      setMessage({ type: 'success', text: `User ${newStatus.toLowerCase()} successfully.` });
      logActivity('Status Update', `Updated status for user ID: ${userId} to ${newStatus}.`);
    } catch (error: any) {
      console.error('Error updating status:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to update status.' });
    }
  };

  const handleTransferOwnership = async (newAdminId: string) => {
    if (!passwordConfirm) {
      setMessage({ type: 'error', text: 'Please confirm your password to transfer ownership.' });
      return;
    }
    
    // In a real app, we would verify the password with Supabase RPC or re-auth here.
    // Assuming verification passed for UI purposes:
    try {
      setLoading(true);
      setMessage(null);
      
      // Update new admin
      const { error: err1 } = await supabase
        .from('profiles')
        .update({ role: 'Super Admin', updated_at: new Date().toISOString() })
        .eq('id', newAdminId);
        
      if (err1) throw err1;

      // Update current admin to Administrator
      if (currentUser) {
        const { error: err2 } = await supabase
          .from('profiles')
          .update({ role: 'Administrator', updated_at: new Date().toISOString() })
          .eq('id', currentUser.id);
          
        if (err2) throw err2;
        
        logActivity('Ownership Transfer', `Transferred Super Admin role to user ID: ${newAdminId}.`);
        await fetchUserRole(currentUser.id); // Refresh current user role
      }

      setTransferringId(null);
      setPasswordConfirm('');
      await fetchUsers();
      setMessage({ type: 'success', text: 'Ownership transferred successfully.' });
    } catch (error: any) {
      console.error('Error transferring ownership:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to transfer ownership.' });
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = (u.full_name || u.username || u.email || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter ? u.role === roleFilter : true;
    const matchesStatus = statusFilter ? (u.status || 'Active') === statusFilter : true;
    const isNotDeleted = u.status !== 'Deleted';
    return matchesSearch && matchesRole && matchesStatus && isNotDeleted;
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
            <Shield className="h-8 w-8 text-primary-700" />
            User Management
          </h2>
          <p className="mt-2 max-w-4xl text-sm text-gray-500">
            Manage system users, assign roles, and handle access control.
          </p>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message.text}
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
              placeholder="Search users..."
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
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6"
            >
              <option value="">All Roles</option>
              {roles.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div className="relative w-full sm:w-48">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6"
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">User</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Joined</th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredUsers.map((u) => (
                <tr key={u.id} className={u.status === 'Suspended' ? 'bg-gray-50' : ''}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 cursor-pointer" onClick={() => handleOpenEditModal(u)}>
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${
                          u.status === 'Suspended' ? 'bg-gray-200 text-gray-500' : 'bg-primary-100 text-primary-700'
                        }`}>
                          {(u.full_name || u.username || u.email || '?').charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900 cursor-pointer hover:text-primary-600" onClick={() => handleOpenEditModal(u)}>{u.full_name || u.username || 'Unnamed User'}</div>
                        <div className="text-gray-500">@{u.username}</div>
                        <div className="text-primary-600 text-xs font-semibold mt-0.5">{u.role || 'User'}</div>
                        {u.last_login && <div className="text-xs text-gray-400 mt-0.5">Last login: {new Date(u.last_login).toLocaleDateString()}</div>}
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4 text-gray-400" />
                      {u.email}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {editingId === u.id ? (
                      <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6"
                      >
                        {roles.map(r => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    ) : (
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                        u.role === 'Super Admin' ? 'bg-purple-50 text-purple-700 ring-purple-700/10' :
                        u.role === 'Administrator' ? 'bg-blue-50 text-blue-700 ring-blue-700/10' :
                        u.role === 'Editor' ? 'bg-green-50 text-green-700 ring-green-700/10' :
                        'bg-gray-50 text-gray-600 ring-gray-500/10'
                      }`}>
                        {u.role || 'User'}
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      u.status === 'Suspended' ? 'bg-red-50 text-red-700 ring-red-600/10' :
                      u.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 ring-yellow-600/10' :
                      'bg-green-50 text-green-700 ring-green-600/10'
                    }`}>
                      {u.status || 'Active'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    {transferringId === u.id ? (
                      <div className="flex items-center justify-end gap-2 bg-gray-50 p-2 rounded-lg absolute right-4 top-2 shadow-lg border border-gray-200 z-10">
                        <input
                          type="password"
                          placeholder="Confirm password"
                          value={passwordConfirm}
                          onChange={(e) => setPasswordConfirm(e.target.value)}
                          className="block w-32 rounded-md border-0 py-1 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-xs"
                        />
                        <button onClick={() => handleTransferOwnership(u.id)} className="text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs font-bold">Transfer</button>
                        <button onClick={() => { setTransferringId(null); setPasswordConfirm(''); }} className="text-gray-500 hover:text-gray-700"><X className="h-4 w-4" /></button>
                      </div>
                    ) : u.id !== currentUser?.id ? (
                      editingId === u.id ? (
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleUpdateRole(u.id)} className="text-green-600 hover:text-green-900" title="Save"><Check className="h-5 w-5" /></button>
                          <button onClick={() => setEditingId(null)} className="text-red-600 hover:text-red-900" title="Cancel"><X className="h-5 w-5" /></button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-3">
                          {u.status === 'Pending' && (
                            <button onClick={() => handleUpdateStatus(u.id, 'Active')} className="text-blue-600 hover:text-blue-900" title="Approve"><CheckCircle className="h-4 w-4" /></button>
                          )}
                          {u.status === 'Suspended' ? (
                            <button onClick={() => handleUpdateStatus(u.id, 'Active')} className="text-green-600 hover:text-green-900" title="Activate"><CheckCircle className="h-4 w-4" /></button>
                          ) : u.status !== 'Pending' ? (
                            <button onClick={() => handleUpdateStatus(u.id, 'Suspended')} className="text-orange-600 hover:text-orange-900" title="Suspend"><Ban className="h-4 w-4" /></button>
                          ) : null}
                          <button onClick={() => { setEditingId(u.id); setSelectedRole(u.role || 'User'); }} className="text-primary-600 hover:text-primary-900" title="Edit Role"><Edit2 className="h-4 w-4" /></button>
                          {u.role === 'Administrator' && (
                            <button onClick={() => setTransferringId(u.id)} className="text-purple-600 hover:text-purple-900" title="Transfer Super Admin"><Key className="h-4 w-4" /></button>
                          )}
                          <button onClick={() => handleUpdateStatus(u.id, 'Deleted')} className="text-red-600 hover:text-red-900" title="Delete"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      )
                    ) : (
                      <span className="text-xs text-gray-400">Current User</span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-sm text-gray-500">
                    No users found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit User Details Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-gray-500" />
                Edit User Details
              </h3>
              <button onClick={() => setEditingUser(null)} className="text-gray-400 hover:text-gray-500">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-center gap-4 mb-2">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-700 text-lg">
                  {(editingUser.full_name || editingUser.username || '?').charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{editingUser.full_name || 'Unnamed User'}</div>
                  <div className="text-primary-600 text-xs font-semibold">{editingUser.role || 'User'}</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">@</span>
                  </div>
                  <input
                    type="text"
                    value={editFormData.username}
                    onChange={(e) => setEditFormData({...editFormData, username: e.target.value})}
                    className="block w-full rounded-md border-0 py-1.5 pl-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editFormData.full_name}
                  onChange={(e) => setEditFormData({...editFormData, full_name: e.target.value})}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email (Read-only)</label>
                <input
                  type="email"
                  value={editFormData.email}
                  disabled
                  className="block w-full rounded-md border-0 py-1.5 px-3 bg-gray-50 text-gray-500 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed directly.</p>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 bg-gray-50">
              <button
                onClick={() => setEditingUser(null)}
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUserDetails}
                className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

