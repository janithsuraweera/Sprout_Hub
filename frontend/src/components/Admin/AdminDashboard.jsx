import React, { useEffect, useState } from 'react';
import { 
  UserGroupIcon, 
  DocumentTextIcon, 
  ChatBubbleLeftRightIcon, 
  ShoppingCartIcon,
  ChartBarIcon,
  CogIcon
} from '@heroicons/react/24/outline';
import userService from '../../services/userService';

function AdminDashboard({ darkMode }) {
  const [userCount, setUserCount] = useState(null);

  useEffect(() => {
    // Fetch user count
    const fetchUserCount = async () => {
      try {
        const res = await userService.getAllUsers();
        setUserCount(res.data.length);
      } catch (err) {
        setUserCount('N/A');
      }
    };
    fetchUserCount();
    // Real-time update every 10 seconds
    const interval = setInterval(fetchUserCount, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Check localStorage for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Update dark mode class on document
    if (darkMode || savedDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark:bg-gray-900');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark:bg-gray-900');
    }
    
    // Save current preference to localStorage
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const stats = [
    { name: 'Total Users', value: userCount !== null ? userCount : '...', icon: UserGroupIcon, color: 'bg-blue-500', card: 'hover:shadow-lg hover:scale-105 transition-transform duration-200' },
    { name: 'Total Posts', value: '567', icon: DocumentTextIcon, color: 'bg-green-500', card: 'hover:shadow-lg hover:scale-105 transition-transform duration-200' },
    { name: 'Forum Posts', value: '890', icon: ChatBubbleLeftRightIcon, color: 'bg-purple-500', card: 'hover:shadow-lg hover:scale-105 transition-transform duration-200' },
    { name: 'Marketplace Items', value: '123', icon: ShoppingCartIcon, color: 'bg-yellow-500', card: 'hover:shadow-lg hover:scale-105 transition-transform duration-200' },
  ];

  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'created a new post', time: '2 minutes ago' },
    { id: 2, user: 'Jane Smith', action: 'commented on a forum post', time: '5 minutes ago' },
    { id: 3, user: 'Mike Johnson', action: 'added a new tutorial', time: '10 minutes ago' },
    { id: 4, user: 'Sarah Wilson', action: 'listed a new item in marketplace', time: '15 minutes ago' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-200">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">Welcome to your admin control panel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className={`bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-colors duration-200 ${stat.card}`}
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 rounded-md p-3 ${stat.color} shadow-md`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate transition-colors duration-200">
                        {stat.name}
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-200">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-8 transition-colors duration-200">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 transition-colors duration-200">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                <UserGroupIcon className="h-5 w-5 mr-2" />
                Manage Users
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200">
                <DocumentTextIcon className="h-5 w-5 mr-2" />
                Manage Posts
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200">
                <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                Manage Forum
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200">
                <ShoppingCartIcon className="h-5 w-5 mr-2" />
                Manage Marketplace
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg transition-colors duration-200">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white transition-colors duration-200">Recent Activity</h3>
              <button className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 transition-colors duration-200">
                View all
              </button>
            </div>
            <div className="flow-root">
              <ul className="-mb-8">
                {recentActivities.map((activity, index) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {index !== recentActivities.length - 1 && (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700 transition-colors duration-200"
                          aria-hidden="true"
                        />
                      )}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-gray-400 dark:bg-gray-600 flex items-center justify-center ring-8 ring-white dark:ring-gray-800 transition-colors duration-200">
                            <UserGroupIcon className="h-5 w-5 text-white" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-300 transition-colors duration-200">
                              <span className="font-medium text-gray-900 dark:text-white transition-colors duration-200">
                                {activity.user}
                              </span>{' '}
                              {activity.action}
                            </p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500 dark:text-gray-300 transition-colors duration-200">
                            <time dateTime={activity.time}>{activity.time}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard; 