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

const TABLE_DATA = {
  't1': {
    title: 'Edebi Dönemler Tablosu',
    icon: '⏳',
    color: 'from-amber-400 to-orange-600',
    headers: ['Dönem', 'Özellik', 'Önemli Sanatçı'],
    rows: [
      {
        cells: [
          { value: 'Divan Edebiyatı', isBlank: false },
          { value: 'Ağır ve süslü dil', isBlank: true, hint: 'Dil özelliği' },
          { value: 'Fuzuli', isBlank: true, hint: 'Sanatçı ismi' }
        ]
      },
      {
        cells: [
          { value: 'Halk Edebiyatı', isBlank: false },
          { value: 'Sade Türkçeyle halka hitap', isBlank: false },
          { value: 'Yunus Emre', isBlank: true, hint: '13. yy ozanı' }
        ]
      },
       {
        cells: [
          { value: 'Tanzimat', isBlank: true, hint: 'Batılılaşma dönemi' },
          { value: 'Toplum için sanat', isBlank: true, hint: 'Sanat anlayışı' },
          { value: 'Namık Kemal', isBlank: false }
        ]
      }
    ]
  }
};

async function inject() {
  console.log('Injecting table exercise data...');
  await set(ref(db, 'tables'), TABLE_DATA);
  console.log('Injection complete.');
  process.exit(0);
}

inject().catch(console.error);
