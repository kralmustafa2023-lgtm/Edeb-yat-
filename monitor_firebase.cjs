const { initializeApp } = require('firebase/app');
const { getDatabase, ref, onValue } = require('firebase/database');

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

console.log('🔍 Monitoring Firebase Realtime Database...');
console.log('Press Ctrl+C to stop\n');

// Monitor progress changes
const progressRef = ref(db, 'progress');
onValue(progressRef, (snapshot) => {
  const timestamp = new Date().toLocaleTimeString('tr-TR');
  console.log(`[${timestamp}] PROGRESS UPDATE:`);
  
  if (snapshot.exists()) {
    const data = snapshot.val();
    Object.entries(data).forEach(([username, progress]) => {
      console.log(`  📊 ${username}: XP=${progress.totalXP}, Quizzes=${progress.quizScores?.length || 0}, Flashcards=${progress.flashcardsDone || 0}`);
    });
  } else {
    console.log('  ⚠️  No progress data');
  }
  console.log('');
});

// Monitor user changes
const usersRef = ref(db, 'users');
onValue(usersRef, (snapshot) => {
  const timestamp = new Date().toLocaleTimeString('tr-TR');
  console.log(`[${timestamp}] USERS UPDATE:`);
  
  if (snapshot.exists()) {
    const data = snapshot.val();
    Object.entries(data).forEach(([username, user]) => {
      console.log(`  👤 ${username}: ${user.name} (${user.role})`);
    });
  } else {
    console.log('  ⚠️  No users');
  }
  console.log('');
});

// Keep the script running
process.stdin.resume();
