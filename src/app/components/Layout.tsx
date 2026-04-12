import React from 'react';
import { Outlet, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useApp } from '../context/AppContext';

export function Layout() {
  const { themeClasses, sidebarOpen, setSidebarOpen } = useApp();
  const location = useLocation();

  return (
    <div className={`min-h-screen ${themeClasses.bg} transition-colors duration-300 flex`}>
      <Sidebar />

      <motion.main
        className="flex-1 min-h-screen overflow-auto"
        animate={{ marginLeft: sidebarOpen ? 260 : 68 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Mobile header */}
        <div className={`lg:hidden flex items-center gap-3 p-4 border-b ${themeClasses.divider} ${themeClasses.sidebar}`}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 rounded-lg ${themeClasses.hover} ${themeClasses.textMuted}`}
          >
            <Menu size={20} />
          </button>
          <span className={`text-sm ${themeClasses.text}`} style={{ fontWeight: 600 }}>9. Sınıf Edebiyat</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </motion.main>
    </div>
  );
}