import React, { useMemo, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useApp } from '../context/AppContext';

// Memoize the page content so context updates don't cause AnimatePresence to remount pages
const MemoizedOutlet = React.memo(function MemoizedOutlet() {
  return <Outlet />;
});

export function Layout() {
  const { themeClasses, sidebarOpen, setSidebarOpen, user } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate('/login');
    }
  }, [user.isAuthenticated, navigate]);

  // Only use the base path segment for the animation key to avoid spurious remounts
  const pageKey = useMemo(() => {
    // e.g. "/flashcard" stays stable, "/sair/fuzuli" → "/sair/fuzuli"
    return location.pathname;
  }, [location.pathname]);

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

        <div key={pageKey} className="p-6">
          <MemoizedOutlet />
        </div>
      </motion.main>
    </div>
  );
}