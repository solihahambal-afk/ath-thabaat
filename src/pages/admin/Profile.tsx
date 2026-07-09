import React, { useState, useEffect } from 'react';
import { UserCircle, Mail, Phone, MapPin, Calendar, Camera, Save, Lock } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { supabase } from '../../lib/supabase';

export default function Profile() {
  const { user, profile, fetchProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    username: '',
    phone: '',
    address: '',
    date_of_birth: '',
    gender: '',
    bio: ''
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        middle_name: profile.middle_name || '',
        last_name: profile.last_name || '',
        username: profile.username || '',
        phone: profile.phone || '',
        address: profile.address || '',
        date_of_birth: profile.date_of_birth ? profile.date_of_birth.split('T')[0] : '',
        gender: profile.gender || '',
        bio: profile.bio || ''
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...formData,
          full_name: `${formData.first_name} ${formData.last_name}`.trim(),
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      await fetchProfile(user);
      setIsEditing(false);
      setMessage({ type: 'success', text: 'Profile updated successfully' });
      
      // Log activity
      await supabase.from('activity_logs').insert({
        user_id: user.id,
        action: 'Updated Profile',
        details: 'User updated their personal profile details'
      });

      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) throw error;

      setMessage({ type: 'success', text: 'Password updated successfully' });
      setPasswordData({ newPassword: '', confirmPassword: '' });

      if (user) {
        await supabase.from('activity_logs').insert({
          user_id: user.id,
          action: 'Changed Password',
          details: 'User updated their account password'
        });
      }
    } catch (error: any) {
      console.error('Error updating password:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to update password' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">My Profile</h2>
          <p className="mt-1 text-sm text-neutral-500">Manage your personal information and preferences.</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="inline-flex items-center px-4 py-2 border border-neutral-300 rounded-lg shadow-sm text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 transition-colors"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {message.text && (
        <div className={`p-4 rounded-xl text-sm ${
          message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'
        }`}>
          {message.text}
        </div>
      )}

      <div className="bg-white shadow-sm border border-neutral-200 rounded-xl overflow-hidden">
        <div className="px-6 py-8 border-b border-neutral-200 bg-neutral-50/50">
          <div className="flex items-center">
            <div className="h-24 w-24 rounded-full bg-neutral-200 flex items-center justify-center border-4 border-white shadow-sm relative overflow-hidden group">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <UserCircle className="h-16 w-16 text-neutral-400" />
              )}
              {isEditing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              )}
            </div>
            <div className="ml-6">
              <h3 className="text-2xl font-bold text-neutral-900">{profile?.full_name || 'Loading...'}</h3>
              <p className="text-sm font-medium text-neutral-500 mt-1">{profile?.role}</p>
              <div className="flex items-center mt-2 text-sm text-neutral-500">
                <Mail className="h-4 w-4 mr-1.5" />
                {profile?.email}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-neutral-700">First Name</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="block w-full rounded-lg border-neutral-200 shadow-sm focus:ring-neutral-900 focus:border-neutral-900 sm:text-sm disabled:bg-neutral-50 disabled:text-neutral-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Middle Name</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="middle_name"
                    value={formData.middle_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="block w-full rounded-lg border-neutral-200 shadow-sm focus:ring-neutral-900 focus:border-neutral-900 sm:text-sm disabled:bg-neutral-50 disabled:text-neutral-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Last Name</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="block w-full rounded-lg border-neutral-200 shadow-sm focus:ring-neutral-900 focus:border-neutral-900 sm:text-sm disabled:bg-neutral-50 disabled:text-neutral-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Username</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="block w-full rounded-lg border-neutral-200 shadow-sm focus:ring-neutral-900 focus:border-neutral-900 sm:text-sm disabled:bg-neutral-50 disabled:text-neutral-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Phone Number</label>
                <div className="mt-2 relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-neutral-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="block w-full pl-10 rounded-lg border-neutral-200 focus:ring-neutral-900 focus:border-neutral-900 sm:text-sm disabled:bg-neutral-50 disabled:text-neutral-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Date of Birth</label>
                <div className="mt-2 relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-neutral-400" />
                  </div>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="block w-full pl-10 rounded-lg border-neutral-200 focus:ring-neutral-900 focus:border-neutral-900 sm:text-sm disabled:bg-neutral-50 disabled:text-neutral-500 transition-colors"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-neutral-700">Address</label>
                <div className="mt-2 relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                    <MapPin className="h-4 w-4 text-neutral-400" />
                  </div>
                  <textarea
                    name="address"
                    rows={2}
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="block w-full pl-10 rounded-lg border-neutral-200 focus:ring-neutral-900 focus:border-neutral-900 sm:text-sm disabled:bg-neutral-50 disabled:text-neutral-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Gender</label>
                <div className="mt-2">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="block w-full rounded-lg border-neutral-200 shadow-sm focus:ring-neutral-900 focus:border-neutral-900 sm:text-sm disabled:bg-neutral-50 disabled:text-neutral-500 transition-colors"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-neutral-700">Bio / About Me</label>
                <div className="mt-2">
                  <textarea
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="block w-full rounded-lg border-neutral-200 shadow-sm focus:ring-neutral-900 focus:border-neutral-900 sm:text-sm disabled:bg-neutral-50 disabled:text-neutral-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end pt-4 border-t border-neutral-200">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 disabled:opacity-50 transition-colors"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-neutral-200 rounded-xl overflow-hidden mt-8">
        <div className="px-6 py-6 border-b border-neutral-200 bg-neutral-50/50">
          <h3 className="text-lg font-medium text-neutral-900 flex items-center">
            <Lock className="h-5 w-5 mr-2 text-neutral-500" />
            Security Settings
          </h3>
        </div>
        <div className="px-6 py-6">
          <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-md">
            <div>
              <label className="block text-sm font-medium text-neutral-700">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="mt-2 block w-full rounded-lg border-neutral-200 shadow-sm focus:ring-neutral-900 focus:border-neutral-900 sm:text-sm transition-colors"
                required
                minLength={6}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="mt-2 block w-full rounded-lg border-neutral-200 shadow-sm focus:ring-neutral-900 focus:border-neutral-900 sm:text-sm transition-colors"
                required
                minLength={6}
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 disabled:opacity-50 transition-colors"
              >
                {isSaving ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
