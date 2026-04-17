import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

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
export const db = getDatabase(app);
