const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get } = require('firebase/database');

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

async function checkDatabase() {
  console.log('=== CHECKING FIREBASE DATABASE ===\n');
  
  // Check users
  console.log('--- USERS ---');
  const usersSnapshot = await get(ref(db, 'users'));
  if (usersSnapshot.exists()) {
    const users = usersSnapshot.val();
    console.log(`Found ${Object.keys(users).length} users:`);
    Object.entries(users).forEach(([key, user]) => {
      console.log(`  - ${key}: ${user.name} (${user.role})`);
    });
  } else {
    console.log('No users found.');
  }
  
  console.log('\n--- PROGRESS ---');
  const progressSnapshot = await get(ref(db, 'progress'));
  if (progressSnapshot.exists()) {
    const progress = progressSnapshot.val();
    console.log(`Found progress for ${Object.keys(progress).length} users:`);
    Object.entries(progress).forEach(([key, prog]) => {
      console.log(`  - ${key}: XP=${prog.totalXP}, Quizzes=${prog.quizScores?.length || 0}`);
    });
  } else {
    console.log('No progress data found.');
  }
  
  console.log('\n--- MESSAGES ---');
  const messagesSnapshot = await get(ref(db, 'messages'));
  if (messagesSnapshot.exists()) {
    const messages = messagesSnapshot.val();
    console.log(`Found ${Object.keys(messages).length} messages:`);
    Object.entries(messages).forEach(([key, msg]) => {
      console.log(`  - ${msg.title} (${msg.type})`);
    });
  } else {
    console.log('No messages found.');
  }
  
  console.log('\n=== END ===');
  process.exit(0);
}

checkDatabase().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
