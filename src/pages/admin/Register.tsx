import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, User, Lock, Mail, Eye, EyeOff, Phone } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (email && !username) {
      setUsername(email.split('@')[0]);
    }
  }, [email]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            middle_name: middleName,
            last_name: lastName,
            full_name: `${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`.trim(),
            username: username || email.split('@')[0],
            phone: phone
          }
        }
      });

      if (error) throw error;

      setSuccess('Registration successful! Please check your email inbox to verify your account. Once verified, it will await approval by the Super Admin.');
      
      // Clear form
      setFirstName('');
      setMiddleName('');
      setLastName('');
      setUsername('');
      setPhone('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      let errorMessage = 'Failed to sign up.';
      if (err.message) {
        if (err.message === 'Failed to fetch') {
          errorMessage = 'Unable to connect to the server. Please check if Supabase is properly configured in the Settings menu.';
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
          Create Account
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600">
          Register for the admin portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow-xl shadow-neutral-200/50 sm:rounded-2xl sm:px-10 border border-neutral-100">
          <form className="space-y-6" onSubmit={handleRegister}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 text-sm">
                {success}
                <div className="mt-4">
                  <Link to="/admin/login" className="text-green-800 font-medium hover:text-green-900 underline">
                    Return to Login
                  </Link>
                </div>
              </div>
            )}

            {!success && (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">First Name</label>
                    <div className="mt-2 relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-neutral-400" />
                      </div>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-neutral-200 rounded-xl focus:ring-neutral-900 focus:border-neutral-900 sm:text-sm bg-neutral-50 focus:bg-white"
                        placeholder="John"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Middle Name (Optional)</label>
                    <div className="mt-2 relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-neutral-400" />
                      </div>
                      <input
                        type="text"
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-neutral-200 rounded-xl focus:ring-neutral-900 focus:border-neutral-900 sm:text-sm bg-neutral-50 focus:bg-white"
                        placeholder="Quincy"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Last Name</label>
                    <div className="mt-2 relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-neutral-400" />
                      </div>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-neutral-200 rounded-xl focus:ring-neutral-900 focus:border-neutral-900 sm:text-sm bg-neutral-50 focus:bg-white"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Username</label>
                    <div className="mt-2 relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-neutral-400" />
                      </div>
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-neutral-200 rounded-xl focus:ring-neutral-900 focus:border-neutral-900 sm:text-sm bg-neutral-50 focus:bg-white"
                        placeholder="johndoe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Phone Number (Optional)</label>
                    <div className="mt-2 relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-neutral-400" />
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-neutral-200 rounded-xl focus:ring-neutral-900 focus:border-neutral-900 sm:text-sm bg-neutral-50 focus:bg-white"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700">Email</label>
                  <div className="mt-2 relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-neutral-200 rounded-xl focus:ring-neutral-900 focus:border-neutral-900 sm:text-sm bg-neutral-50 focus:bg-white"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Password</label>
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
                    <label className="block text-sm font-medium text-neutral-700">Confirm Password</label>
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
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? 'Creating account...' : 'Create account'}
                  </button>
                </div>
              </>
            )}
          </form>

          {!success && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-neutral-500">Already have an account?</span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/admin/login"
                  className="w-full flex justify-center py-3 px-4 border border-neutral-200 rounded-xl shadow-sm text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 transition-colors"
                >
                  Sign in instead
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
