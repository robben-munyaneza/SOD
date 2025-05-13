import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-amber-900 to-amber-800 text-white shadow-lg">
      <div className="flex flex-col h-full">
        <div className="px-6 py-4 text-2xl font-bold border-b border-amber-700">
          Inventory System
        </div>
        <ul className="flex flex-col py-4">
          <li>
            <Link
              to="/dashboard"
              className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-amber-700 ${location.pathname === '/dashboard' ? 'bg-amber-700' : ''}`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/categories"
              className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-amber-700 ${location.pathname === '/categories' ? 'bg-amber-700' : ''}`}
            >
              Categories
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-amber-700 ${location.pathname === '/products' ? 'bg-amber-700' : ''}`}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/inventory"
              className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-amber-700 ${location.pathname === '/inventory' ? 'bg-amber-700' : ''}`}
            >
              Inventory
            </Link>
          </li>
          <li>
            <Link
              to="/stockmovement"
              className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-amber-700 ${location.pathname === '/stockmovement' ? 'bg-amber-700' : ''}`}
            >
              Stock Movement
            </Link>
          </li>
        </ul>
        <div className="mt-auto mb-6 px-4">
          <button 
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 mt-4 bg-amber-700 hover:bg-amber-600 text-white rounded transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
