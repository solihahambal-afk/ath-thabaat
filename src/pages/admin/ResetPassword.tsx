import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, Lock, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have an active session which is required for password update
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setError('No active password reset session found. Please request a new password reset link.');
      }
    });
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) throw error;

      setSuccess('Your password has been reset successfully.');
      setTimeout(() => {
        navigate('/admin/login');
      }, 3000);
      
    } catch (err: any) {
      let errorMessage = 'Failed to reset password.';
      if (err.message) {
        if (err.message === 'Failed to fetch') {
          errorMessage = 'Unable to connect to the server.';
        } else {
          errorMessage = err.message;
        }
      }
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-16 w-16 bg-neutral-900 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
            <BookOpen className="h-8 w-8 text-white transform rotate-6" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-neutral-900">
          Set New Password
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600">
          Enter your new password below
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-neutral-200/50 sm:rounded-2xl sm:px-10 border border-neutral-100">
          <form className="space-y-6" onSubmit={handleResetPassword}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm">
                {error}
                {!error.includes('Passwords do not match') && (
                  <div className="mt-4">
                    <Link to="/admin/forgot-password" className="text-red-800 font-medium hover:text-red-900 underline">
                      Request new reset link
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 text-sm">
                {success}
                <div className="mt-4">
                  <span className="text-green-800 font-medium">Redirecting to login...</span>
                </div>
              </div>
            )}

            {!success && (
              <>
                <div>
                  <label className="block text-sm font-medium text-neutral-700">New Password</label>
                  <div className="mt-2 relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-10 py-3 border border-neutral-200 rounded-xl focus:ring-neutral-900 focus:border-neutral-900 sm:text-sm bg-neutral-50 focus:bg-white"
                      placeholder="••••••••"
                      minLength={6}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700">Confirm New Password</label>
                  <div className="mt-2 relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="block w-full pl-10 pr-10 py-3 border border-neutral-200 rounded-xl focus:ring-neutral-900 focus:border-neutral-900 sm:text-sm bg-neutral-50 focus:bg-white"
                      placeholder="••••••••"
                      minLength={6}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-neutral-400 hover:text-neutral-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-neutral-400 hover:text-neutral-600" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? 'Saving password...' : 'Save new password'}
                  </button>
                </div>
              </>
            )}
          </form>

          {!success && (
            <div className="mt-6">
              <Link
                to="/admin/login"
                className="w-full flex justify-center py-3 px-4 border border-neutral-200 rounded-xl shadow-sm text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 transition-colors"
              >
                Back to sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
