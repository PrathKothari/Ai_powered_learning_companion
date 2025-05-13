import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Home, ClipboardList, Clock, BarChart2 } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { to: '/', label: 'Home', icon: <Home size={20} /> },
    { to: '/dashboard', label: 'Dashboard', icon: <Clock size={20} /> },
    { to: '/tasks', label: 'Tasks', icon: <ClipboardList size={20} /> },
    { to: '/summary', label: 'Summary', icon: <BarChart2 size={20} /> },
  ];
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
            <Brain size={28} />
            <span className="font-bold text-xl">FocusFlow</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors relative ${
                  location.pathname === item.to
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {location.pathname === item.to && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 dark:bg-primary-400"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <DarkModeToggle />
            
            {/* Mobile menu button - would be expanded in a real app */}
            <button className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation - simplified version */}
      <div className="md:hidden flex justify-around border-t border-gray-200 dark:border-gray-700">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center p-3 ${
              location.pathname === item.to
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Navbar;