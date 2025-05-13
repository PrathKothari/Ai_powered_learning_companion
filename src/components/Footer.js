import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <div className="mb-2 md:mb-0">
            <p>© 2025 FocusFlow - ADHD Learning Companion</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">About</a>
            <a href="#" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors flex items-center gap-1">
              <Github size={16} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;