import { useState } from 'react';
import { saveProgress, getProgress } from '../firebase/database';
import { useApp } from '../context/AppContext';

export function FirebaseDebug() {
  const { user, progress, themeClasses } = useApp();
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const testWrite = async () => {
    if (!user.username) {
      setStatus('❌ No user logged in');
      return;
    }
    
    setLoading(true);
    setStatus('⏳ Testing write...');
    
    try {
      await saveProgress(user.username, progress);
      setStatus('✅ Write successful!');
    } catch (error: any) {
      setStatus('❌ Write failed: ' + error.message);
      console.error('Write error:', error);
    } finally {
      setLoading(false);
    }
  };

  const testRead = async () => {
    if (!user.username) {
      setStatus('❌ No user logged in');
      return;
    }
    
    setLoading(true);
    setStatus('⏳ Testing read...');
    
    try {
      const data = await getProgress(user.username);
      if (data) {
        setStatus(`✅ Read successful! XP: ${data.totalXP}`);
      } else {
        setStatus('⚠️ No data found');
      }
    } catch (error: any) {
      setStatus('❌ Read failed: ' + error.message);
      console.error('Read error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (user.role !== 'ogrenci') return null;

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg border ${themeClasses.card} ${themeClasses.cardBorder} shadow-lg max-w-xs z-50`}>
      <h3 className={`text-sm font-bold ${themeClasses.text} mb-2`}>🔧 Firebase Debug</h3>
      <div className="space-y-2">
        <button
          onClick={testWrite}
          disabled={loading}
          className="w-full px-3 py-2 text-xs rounded bg-purple-600 text-white hover:bg-purple-500 disabled:opacity-50"
        >
          Test Write
        </button>
        <button
          onClick={testRead}
          disabled={loading}
          className="w-full px-3 py-2 text-xs rounded bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50"
        >
          Test Read
        </button>
        {status && (
          <div className={`text-xs p-2 rounded ${themeClasses.inputBg} ${themeClasses.text}`}>
            {status}
          </div>
        )}
        <div className={`text-xs ${themeClasses.textMuted}`}>
          User: {user.username}<br />
          XP: {progress.totalXP}
        </div>
      </div>
    </div>
  );
}
