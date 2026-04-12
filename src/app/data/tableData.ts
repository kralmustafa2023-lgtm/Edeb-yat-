export interface TableCell {
  id: string;
  value: string;
  isBlank: boolean;
  hint?: string; // first letter hint
}

export interface TableRow {
  cells: TableCell[];
}

export interface TableExercise {
  id: string;
  title: string;
  icon: string;
  color: string;
  headers: string[];
  rows: TableRow[];
}

const blank = (value: string, hint?: string): TableCell => ({
  id: Math.random().toString(36).slice(2),
  value,
  isBlank: true,
  hint: hint || value[0],
});
const filled = (value: string): TableCell => ({
  id: Math.random().toString(36).slice(2),
  value,
  isBlank: false,
});

export const TABLE_EXERCISES: TableExercise[] = [
  {
    id: 'edebi-donemler',
    title: 'Edebi Dönemler Karşılaştırma',
    icon: '🏛️',
    color: 'from-purple-600 to-indigo-700',
    headers: ['Dönem', 'Başlangıç', 'Ölçü', 'Önemli Şair', 'Akım/Özellik'],
    rows: [
      { cells: [filled('Divan Edebiyatı'), blank('13. yüzyıl', '1'), filled('Aruz'), blank('Fuzuli', 'F'), blank('Arapça-Farsça etki', 'A')] },
      { cells: [filled('Halk Edebiyatı'), blank('13. yüzyıl', '1'), blank('Hece', 'H'), filled('Karacaoğlan'), blank('Sade Türkçe', 'S')] },
      { cells: [filled('Tanzimat'), filled('1839'), blank('Aruz / Hece', 'A'), blank('Namık Kemal', 'N'), blank('Vatan, Hürriyet', 'V')] },
      { cells: [blank('Servet-i Fünun', 'S'), filled('1896'), filled('Aruz'), blank('Tevfik Fikret', 'T'), blank('Parnasizm etkisi', 'P')] },
      { cells: [filled('Milli Edebiyat'), blank('1911', '1'), blank('Hece', 'H'), blank('Mehmet Akif', 'M'), filled('Türkçecilik')] },
      { cells: [blank('Garip Akımı', 'G'), filled('1941'), blank('Serbest', 'S'), filled('Orhan Veli'), blank('Ölçü ve kafiyeye karşı', 'Ö')] },
    ],
  },
  {
    id: 'nazim-bicim',
    title: 'Nazım Biçimleri',
    icon: '📖',
    color: 'from-amber-600 to-orange-700',
    headers: ['Nazım Biçimi', 'Nazım Birimi', 'Ölçü', 'Edebiyat', 'Konu'],
    rows: [
      { cells: [filled('Gazel'), blank('Beyit', 'B'), filled('Aruz'), blank('Divan', 'D'), blank('Aşk, şarap', 'A')] },
      { cells: [filled('Kaside'), filled('Beyit'), blank('Aruz', 'A'), blank('Divan', 'D'), blank('Övgü', 'Ö')] },
      { cells: [blank('Koşma', 'K'), filled('Dörtlük'), blank('11\'li hece', '1'), filled('Halk'), blank('Aşk, doğa', 'A')] },
      { cells: [blank('Semai', 'S'), filled('Dörtlük'), filled('8\'li hece'), blank('Halk', 'H'), blank('Lirik konular', 'L')] },
      { cells: [filled('İlahi'), blank('Dörtlük', 'D'), blank('7 veya 8\'li', '7'), blank('Tekke', 'T'), filled('Allah sevgisi')] },
      { cells: [blank('Mesnevi', 'M'), filled('Beyit'), filled('Aruz'), blank('Divan', 'D'), blank('Aşk, macera', 'A')] },
    ],
  },
  {
    id: 'kafiye-turleri',
    title: 'Kafiye Türleri',
    icon: '🔤',
    color: 'from-emerald-600 to-teal-700',
    headers: ['Kafiye Türü', 'Ses Sayısı', 'Örnek', 'Açıklama'],
    rows: [
      { cells: [filled('Yarım Kafiye'), filled('1 ses'), blank('al / dal', 'a'), blank('Yalnızca 1 ses benzer', 'Y')] },
      { cells: [filled('Tam Kafiye'), blank('2 ses', '2'), filled('gel / el'), blank('2 ses benzer', '2')] },
      { cells: [blank('Zengin Kafiye', 'Z'), blank('3+ ses', '3'), filled('keder / gider'), blank('3 ve üzeri ses', '3')] },
      { cells: [blank('Tunç Kafiye', 'T'), filled('İçinde tam kafiye'), blank('gül / bülbül', 'g'), blank('Kısa sözcük uzun içinde', 'K')] },
      { cells: [blank('Cinaslı Kafiye', 'C'), filled('Eşsesli sözcükler'), filled('yüz (surat) / yüz (sayı)'), blank('Anlam farkı ses benzerlik', 'A')] },
    ],
  },
  {
    id: 'sair-bilgi',
    title: 'Şairler Bilgi Tablosu',
    icon: '✍️',
    color: 'from-sky-600 to-blue-700',
    headers: ['Şair', 'Yıllar', 'Dönemi', 'Ünlü Eseri', 'Kullandığı Ölçü'],
    rows: [
      { cells: [filled('Yunus Emre'), blank('1240-1321', '1'), filled('Tekke Edebiyatı'), blank('Divan / İlahiler', 'D'), blank('Hece ve Aruz', 'H')] },
      { cells: [filled('Fuzuli'), filled('1483-1556'), blank('Divan Edebiyatı', 'D'), filled('Leyla vü Mecnun'), blank('Aruz', 'A')] },
      { cells: [blank('Baki', 'B'), filled('1526-1600'), filled('Divan Edebiyatı'), blank('Kanuni Mersiyesi', 'K'), blank('Aruz', 'A')] },
      { cells: [filled('Namık Kemal'), blank('1840-1888', '1'), blank('Tanzimat', 'T'), filled('Hürriyet Kasidesi'), blank('Aruz', 'A')] },
      { cells: [filled('Tevfik Fikret'), filled('1867-1915'), blank('Servet-i Fünun', 'S'), blank('Sis', 'S'), filled('Serbest Müstezat')] },
      { cells: [blank('Mehmet Akif', 'M'), filled('1873-1936'), blank('Milli Edebiyat', 'M'), filled('İstiklal Marşı'), blank('Aruz', 'A')] },
      { cells: [filled('Orhan Veli'), blank('1914-1950', '1'), filled('Garip Akımı'), blank('İstanbul\'u Dinliyorum', 'İ'), filled('Serbest')] },
    ],
  },
  {
    id: 'edebi-sanatlar',
    title: 'Edebi Sanatlar',
    icon: '🎨',
    color: 'from-rose-600 to-pink-700',
    headers: ['Edebi Sanat', 'Tanım (kısa)', 'Örnek'],
    rows: [
      { cells: [filled('Teşbih'), blank('Zayıfı güçlüye benzetme', 'Z'), blank('"Aslan gibi güçlü adam"', '"')] },
      { cells: [filled('İstiare'), blank('Benzetmenin sadece yönüyle yapılması', 'B'), blank('"Hayat bir yolculuktur"', '"')] },
      { cells: [blank('Kişileştirme', 'K'), filled('İnsana özgü özellik verme'), blank('"Rüzgâr ağlıyor"', '"')] },
      { cells: [blank('Tezat', 'T'), filled('Zıt kavramları bir arada kullanma'), blank('"Ne ölü ne diri"', '"')] },
      { cells: [blank('Mübalağa', 'M'), filled('Gerçek dışı abartma'), filled('"Yaşım yüz oldu"')] },
      { cells: [filled('Tekrir'), blank('Pekiştirmek için tekrar etme', 'P'), blank('"Yavaş yavaş gidiyordu"', '"')] },
      { cells: [filled('Aliterasyon'), blank('Aynı ünsüzü sık tekrar', 'A'), blank('"Serin serin Kapalıçarşı"', '"')] },
      { cells: [blank('Nida', 'N'), filled('Seslenme / ünlem'), blank('"Nerdesin, nerdesin!"', '"')] },
    ],
  },
];
