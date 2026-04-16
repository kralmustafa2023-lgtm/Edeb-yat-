const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, get, child } = require('firebase/database');

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

async function runDiagnostic() {
  console.log('\n===== Firebase Diagnostik Başlatılıyor =====\n');

  // 1. Tüm kullanıcıları oku
  console.log('1. users/ node okunuyor...');
  try {
    const snapshot = await get(ref(db, 'users'));
    const data = snapshot.val();
    if (data) {
      console.log('   BAŞARILI - Mevcut kullanıcılar:', Object.keys(data));
    } else {
      console.log('   users/ node BOŞ (hiç kullanıcı yok)');
    }
  } catch (err) {
    console.error('   HATA - Okuma engellenmiş:', err.message);
  }

  // 2. Test öğrenci yazma
  console.log('\n2. Test öğrenci ekleniyor: users/test_ogrenci');
  try {
    await set(ref(db, 'users/test_ogrenci'), {
      name: 'Test Öğrenci',
      username: 'test_ogrenci',
      password: '123456',
      role: 'ogrenci',
      score: 0,
      gold: 100,
      status: 'Aktif',
      createdAt: new Date().toISOString()
    });
    console.log('   BAŞARILI - Öğrenci yazıldı!');
  } catch (err) {
    console.error('   HATA - Yazma engellenmiş! Firebase kuralları izin vermiyor.');
    console.error('   Hata detayı:', err.message);
  }

  // 3. Yazılanı oku
  console.log('\n3. Test öğrenci okunuyor...');
  try {
    const snapshot = await get(child(ref(db), 'users/test_ogrenci'));
    if (snapshot.exists()) {
      console.log('   BAŞARILI - Öğrenci bulundu:', snapshot.val());
    } else {
      console.log('   HATA - Öğrenci bulunamadı (yazma gerçekleşmedi)');
    }
  } catch (err) {
    console.error('   HATA:', err.message);
  }

  console.log('\n===== Diagnostik Tamamlandı =====\n');
  process.exit(0);
}

runDiagnostic().catch(console.error);
