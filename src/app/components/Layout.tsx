import React from 'react';
import { motion } from 'motion/react';
import { Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useApp } from '../context/AppContext';

export function Layout({ children }: { children: React.ReactNode }) {
  const { themeClasses, sidebarOpen, setSidebarOpen, user } = useApp();

  if (!user.isAuthenticated) {
    return null;
  }

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
          <span className={`text-sm ${themeClasses.text}`} style={{ fontWeight: 600 }}>9. Sinif Edebiyat</span>
        </div>

        <div className="p-6">
          {children}
        </div>
      </motion.main>
    </div>
  );
}
