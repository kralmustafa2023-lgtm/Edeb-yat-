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

const MATCHING_DATA = {
  'm1': {
    title: 'Edebi Akımlar ve Temsilcileri',
    category: 'Edebi Akımlar',
    icon: '🎭',
    pairs: [
        { left: 'Klasisizm', right: 'Moliere' },
        { left: 'Romantizm', right: 'Victor Hugo' },
        { left: 'Realizm', right: 'Gustave Flaubert' },
        { left: 'Sembolizm', right: 'Baudelaire' },
        { left: 'Natüralizm', right: 'Emile Zola' }
    ]
  },
  'm2': {
    title: 'Sanatçılar ve Eserleri',
    category: 'Eser-Yazar',
    icon: '📚',
    pairs: [
        { left: 'Mai ve Siyah', right: 'Halit Ziya' },
        { left: 'Eylül', right: 'Mehmet Rauf' },
        { left: 'Araba Sevdası', right: 'Recaizade Mahmut' },
        { left: 'İntibah', right: 'Namık Kemal' },
        { left: 'Çalıkuşu', right: 'Reşat Nuri' }
    ]
  }
};

const FLASHCARD_DATA = {
    'f1': {
        title: 'Edebiyat Terimleri',
        icon: '📝',
        cards: [
            { front: 'Mecaz-ı Mürsel', back: 'Bir sözün benzetme amacı gütmeden başka bir söz yerine kullanılmasıdır.' },
            { front: 'Teşbih', back: 'Aralarında ilgi bulunan iki şeyden zayıf olanı güçlü olana benzetme sanatıdır.' },
            { front: 'İstiare', back: 'Benzetmenin temel öğelerinden sadece biriyle yapılan sanattır.' },
            { front: 'Kaside', back: 'Din ve devlet büyüklerini övmek amacıyla yazılan şiirlerdir.' }
        ]
    }
};

async function inject() {
  console.log('Injecting matching and flashcard data...');
  await set(ref(db, 'matching'), MATCHING_DATA);
  await set(ref(db, 'flashcards'), FLASHCARD_DATA);
  console.log('Injection complete.');
  process.exit(0);
}

inject().catch(console.error);
