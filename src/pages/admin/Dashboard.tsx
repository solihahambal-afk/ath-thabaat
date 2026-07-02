import { useAuthStore } from '../../store/authStore';

export default function Dashboard() {
  const { user, profile, role } = useAuthStore();
  const displayName = profile?.full_name || profile?.username || user?.email?.split('@')[0];

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight font-serif">
          Dashboard
        </h2>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Welcome back, {displayName}. Your current role is <span className="font-semibold text-primary-700">{role || 'User'}</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder cards */}
        <div className="overflow-hidden rounded-lg bg-white shadow ring-1 ring-black/5">
          <div className="p-5">
            <div className="flex items-center">
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Total Users</dt>
                  <dd className="text-lg font-medium text-gray-900">12</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="overflow-hidden rounded-lg bg-white shadow ring-1 ring-black/5">
          <div className="p-5">
            <div className="flex items-center">
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Published News</dt>
                  <dd className="text-lg font-medium text-gray-900">4</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow ring-1 ring-black/5">
          <div className="p-5">
            <div className="flex items-center">
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Gallery Items</dt>
                  <dd className="text-lg font-medium text-gray-900">24</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
