const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, get, remove } = require('firebase/database');

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

async function setup() {
  console.log('\n=== Veritabanı Düzenleniyor ===\n');

  // Test öğrenci sil
  await remove(ref(db, 'users/test_ogrenci'));
  console.log('Test öğrenci silindi.');

  // Mevcut kullanıcıları kontrol et
  const snapshot = await get(ref(db, 'users'));
  const existing = snapshot.val() || {};
  console.log('Mevcut kullanıcılar:', Object.keys(existing));
  
  // Her kullanıcının rolünü göster
  for (const [id, data] of Object.entries(existing)) {
    console.log(` - ${id}: role=${data.role}, name=${data.name}`);
  }

  // yeliz öğretmen hesabı var mı kontrol et
  if (!existing['yeliz']) {
    console.log('\nyeliz hesabı YOK - Oluşturuluyor...');
    await set(ref(db, 'users/yeliz'), {
      name: 'Yeliz Hoca',
      username: 'yeliz',
      password: '123456',
      role: 'ogretmen',
      createdAt: new Date().toISOString()
    });
    console.log('yeliz öğretmen hesabı oluşturuldu! (şifre: 123456)');
  } else {
    console.log('\nyeliz hesabı mevcut. Şifre güncelleniyor...');
    await set(ref(db, 'users/yeliz'), {
      ...existing['yeliz'],
      password: '123456',
      role: 'ogretmen'
    });
    console.log('yeliz şifresi 123456 yapıldı.');
  }

  // hoca ve mstfuygur hesaplarını kontrol et
  if (existing['hoca']) {
    console.log(`\nhoca rolü: ${existing['hoca'].role}`);
  }
  if (existing['mstfuygur']) {
    console.log(`mstfuygur rolü: ${existing['mstfuygur'].role}`);
    // Eğer öğrenci değilse öğretmene çevir ya da sil
  }

  console.log('\n=== TAMAMLANDI ===');
  console.log('Giriş bilgileri:');
  console.log('  Öğretmen -> kullanıcı: yeliz | şifre: 123456');
  process.exit(0);
}

setup().catch(err => {
  console.error('Hata:', err);
  process.exit(1);
});
