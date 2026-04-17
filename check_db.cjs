const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get, child } = require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyDRvNPR8DRBim9XZxXqWIrl3VvJsaW8ZSE",
  authDomain: "edebiat-470ce.firebaseapp.com",
  databaseURL: "https://edebiat-470ce-default-rtdb.firebaseio.com",
  projectId: "edebiat-470ce",
  storageBucket: "edebiat-470ce.firebasestorage.app",
  messagingSenderId: "936006843933",
  appId: "1:936006843933:web:aebcc6c3a016da026d10f4",
  measurementId: "G-9BBJVCTDPT"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function checkUsers() {
  const snapshot = await get(ref(db, 'users'));
  if (snapshot.exists()) {
    console.log(JSON.stringify(snapshot.val(), null, 2).substring(0, 2000));
  } else {
    console.log("No users found.");
  }
  process.exit(0);
}

checkUsers();
