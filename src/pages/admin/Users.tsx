import { useAuthStore } from '../../store/authStore';
import { Navigate } from 'react-router-dom';

export default function Users() {
  const { role } = useAuthStore();

  if (role !== 'Super Admin') {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between border-b border-gray-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight font-serif">
            User Management
          </h2>
          <p className="mt-2 max-w-4xl text-sm text-gray-500">
            Manage system users, assign roles, and handle access control.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="rounded-md bg-primary-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700">
            Add User
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500">
            User management interface will be connected to Supabase profiles table.
          </p>
        </div>
      </div>
    </div>
  );
}
