import React, { useState, useEffect } from 'react';

export function FirebaseTest() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Firebase baantlan test ediliyor...');

  useEffect(() => {
    const testFirebase = async () => {
      try {
        // Firebase config'i test et
        const { db } = await import('../firebase/config');
        
        // Database eriimini test et
        const { get, ref } = await import('firebase/database');
        
        // Basit bir okuma yapalm
        const testRef = ref(db, '.info/connected');
        const snapshot = await get(testRef);
        
        if (snapshot.exists()) {
          setStatus('success');
          setMessage('Firebase baantlan baarl!');
          console.log('Firebase connection test: SUCCESS');
        } else {
          setStatus('error');
          setMessage('Firebase baantlanamad - veri okunamad');
          console.error('Firebase connection test: FAILED - No data');
        }
      } catch (error) {
        setStatus('error');
        setMessage(`Firebase hatas: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
        console.error('Firebase connection test: ERROR:', error);
      }
    };

    testFirebase();
  }, []);

  return (
    <div className="fixed top-4 right-4 p-3 rounded-lg text-sm z-50 max-w-xs">
      <div className={`p-2 rounded ${
        status === 'loading' ? 'bg-blue-100 text-blue-800' :
        status === 'success' ? 'bg-green-100 text-green-800' :
        'bg-red-100 text-red-800'
      }`}>
        <div className="font-semibold">
          {status === 'loading' ? 'Yükleniyor...' :
           status === 'success' ? 'Baantland' :
           'Hata'}
        </div>
        <div className="text-xs mt-1">{message}</div>
      </div>
    </div>
  );
}
