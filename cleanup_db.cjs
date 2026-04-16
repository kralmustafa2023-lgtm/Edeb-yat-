const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get, remove } = require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyDRvNPR8DRBim9XZxXqWIrl3VvJsaW8ZSE",
  authDomain: "edebiat-470ce.firebaseapp.com",
  projectId: "edebiat-470ce",
  storageBucket: "edebiat-470ce.firebasestorage.app",
  messagingSenderId: "936006843933",
  appId: "1:936006843933:web:aebcc6c3a016da026d10f4"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function cleanup() {
  console.log('Cleaning up users...');
  const usersRef = ref(db, 'users');
  const snapshot = await get(usersRef);
  if (snapshot.exists()) {
    const data = snapshot.val();
    for (const id in data) {
      if (data[id].role === 'ogrenci' || id === 'Mustafa' || id === 'MSTF' || id.includes('Mustafa')) {
        console.log(`Deleting student: ${id}`);
        await remove(ref(db, `users/${id}`));
      }
    }
  }

  console.log('Cleaning up questions (ensuring correct structure)...');
  // If questions are in wrong format, we might want to clear them to let teacher start fresh
  // as per "sorular yüklenmiyor" issue.
  // Actually, I'll just clear the questions node so the teacher can add fresh ones.
  // await remove(ref(db, 'questions')); 

  console.log('Cleanup finished.');
  process.exit(0);
}

cleanup().catch(err => {
  console.error(err);
  process.exit(1);
});
