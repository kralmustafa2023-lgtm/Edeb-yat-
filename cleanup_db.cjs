const { initializeApp } = require('firebase/app');
const { getDatabase, ref, remove, set } = require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyDRvNPR8DRBim9XZxXqWIrl3VvJsaW8ZSE",
  authDomain: "edebiat-470ce.firebaseapp.com",
  databaseURL: "https://edebiat-470ce-default-rtdb.firebaseio.com",
  projectId: "edebiat-470ce",
  storageBucket: "edebiat-470ce.firebasestorage.app",
  messagingSenderId: "936006843933",
  appId: "1:936006843933:web:aebcc6c3a016da026d10f4"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function cleanup() {
  console.log('Cleaning up database...\n');
  
  // Remove extra teacher accounts (keep only test/test)
  console.log('Removing hoca account...');
  await remove(ref(db, 'users/hoca'));
  
  console.log('Removing yeliz account...');
  await remove(ref(db, 'users/yeliz'));
  
  // Remove test progress data
  console.log('Removing test progress data...');
  await remove(ref(db, 'progress/aga'));
  
  // Keep the test teacher account
  console.log('Ensuring test teacher account exists...');
  await set(ref(db, 'users/test'), {
    id: 'test',
    username: 'test',
    password: 'test',
    name: 'Öğretmen',
    role: 'ogretmen',
    status: 'Aktif',
    createdAt: new Date().toISOString()
  });
  
  console.log('\n✓ Cleanup complete!');
  console.log('Only "test" teacher account remains.');
  
  process.exit(0);
}

cleanup().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
