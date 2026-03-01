import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  if (!user) return null;

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Menu</h2>
      </div>

      <nav className="space-y-2">
        <Link
          to="/"
          className={`block px-4 py-2 rounded ${
            isActive('/') ? 'bg-blue-600' : 'hover:bg-gray-700'
          }`}
        >
          📊 Dashboard
        </Link>

        {user.role === 'admin' && (
          <>
            <Link
              to="/students"
              className={`block px-4 py-2 rounded ${
                isActive('/students') ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              👨‍🎓 Students List
            </Link>
            <Link
              to="/students/add"
              className={`block px-4 py-2 rounded ${
                isActive('/students/add') ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              ➕ Add Student
            </Link>
          </>
        )}

        {user.role === 'user' && (
          <Link
            to="/students"
            className={`block px-4 py-2 rounded ${
              isActive('/students') ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
          >
            👁️ View Students
          </Link>
        )}
      </nav>
    </aside>
  );
}
