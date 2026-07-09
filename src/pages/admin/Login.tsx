import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, UserCircle, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { supabase } from '../../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // User will be redirected by the useEffect listening to auth changes
    } catch (err: any) {
      console.error('Login error:', err);
      let errorMessage = 'Failed to sign in. Please check your credentials and try again.';
      if (err?.message && err.message !== '{}') {
        if (err.message === 'Failed to fetch') {
          errorMessage = 'Unable to connect to the server. Please check your connection.';
        } else {
          errorMessage = err.message;
        }
      } else if (err?.msg) {
        errorMessage = err.msg;
      } else if (err?.error_description) {
        errorMessage = err.error_description;
      } else if (typeof err === 'string' && err !== '{}') {
        errorMessage = err;
      } else if (err && typeof err === 'object') {
        const strErr = JSON.stringify(err);
        if (strErr !== '{}') {
          errorMessage = `Error details: ${strErr}`;
        }
      }
      
      if (errorMessage === '{}') {
        errorMessage = 'An unexpected database error occurred during login. Please try again or contact support.';
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
          Admin Portal
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600">
          Sign in to access the dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-neutral-200/50 sm:rounded-2xl sm:px-10 border border-neutral-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm flex items-start">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-neutral-700">
                Email
              </label>
              <div className="mt-2 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-neutral-200 rounded-xl focus:ring-neutral-900 focus:border-neutral-900 sm:text-sm transition-colors bg-neutral-50 focus:bg-white"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700">
                Password
              </label>
              <div className="mt-2 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-neutral-200 rounded-xl focus:ring-neutral-900 focus:border-neutral-900 sm:text-sm transition-colors bg-neutral-50 focus:bg-white"
                  placeholder="••••••••"
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-neutral-900 focus:ring-neutral-900 border-neutral-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/admin/forgot-password" className="font-medium text-neutral-600 hover:text-neutral-900">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-neutral-500">Don't have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/admin/register"
                className="w-full flex justify-center py-3 px-4 border border-neutral-200 rounded-xl shadow-sm text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 transition-colors"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
