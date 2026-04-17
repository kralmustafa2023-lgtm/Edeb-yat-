const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');

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

async function testWrite() {
  console.log('Testing write to Firebase...');
  
  try {
    // Test writing to progress/aga
    const testProgress = {
      studiedPoets: [],
      quizScores: [],
      flashcardsDone: 0,
      matchingDone: 0,
      tableDone: 0,
      totalXP: 100,
      streak: 0,
      lastStudyDate: '',
      weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
      achievements: [],
      favoritePoets: [],
      notes: {}
    };
    
    console.log('Writing test progress for user "aga"...');
    await set(ref(db, 'progress/aga'), testProgress);
    console.log('✓ Write successful!');
    
    // Verify
    const { get } = require('firebase/database');
    const snapshot = await get(ref(db, 'progress/aga'));
    if (snapshot.exists()) {
      console.log('✓ Verified: Data exists in Firebase');
      console.log('  XP:', snapshot.val().totalXP);
    } else {
      console.log('✗ Verification failed: Data not found');
    }
    
  } catch (error) {
    console.error('✗ Write failed:', error.message);
    console.error('Full error:', error);
  }
  
  process.exit(0);
}

testWrite();
