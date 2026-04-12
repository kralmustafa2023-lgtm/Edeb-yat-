export interface MatchPair {
  id: string;
  left: string;
  right: string;
}

export interface MatchingGame {
  id: string;
  title: string;
  icon: string;
  color: string;
  instructions: string;
  pairs: MatchPair[];
}

export const MATCHING_GAMES: MatchingGame[] = [
  {
    id: 'sair-siir',
    title: 'Şair → Şiir Eşleştir',
    icon: '✍️',
    color: 'from-purple-600 to-indigo-700',
    instructions: 'Her şairi en ünlü şiiriyle eşleştir.',
    pairs: [
      { id: '1', left: 'Orhan Veli Kanık', right: 'İstanbul\'u Dinliyorum' },
      { id: '2', left: 'Cahit Sıtkı Tarancı', right: 'Otuz Beş Yaş' },
      { id: '3', left: 'Ahmet Kutsi Tecer', right: 'Nerdesin' },
      { id: '4', left: 'Mehmet Akif Ersoy', right: 'İstiklal Marşı' },
      { id: '5', left: 'Yahya Kemal Beyatlı', right: 'Sessiz Gemi' },
      { id: '6', left: 'Tevfik Fikret', right: 'Sis' },
    ],
  },
  {
    id: 'donem-ozellik',
    title: 'Dönem → Özellik Eşleştir',
    icon: '🏛️',
    color: 'from-amber-600 to-orange-700',
    instructions: 'Her edebi dönemi temel özelliğiyle eşleştir.',
    pairs: [
      { id: '1', left: 'Divan Edebiyatı', right: 'Aruz ölçüsü ve beyit nazım birimi' },
      { id: '2', left: 'Garip Akımı', right: 'Ölçü ve kafiyeye karşı çıkış' },
      { id: '3', left: 'Servet-i Fünun', right: 'Parnasizm ve Sembolizm etkisi' },
      { id: '4', left: 'Halk Edebiyatı', right: 'Hece ölçüsü ve sade Türkçe' },
      { id: '5', left: 'Milli Edebiyat', right: 'Türkçecilik ve Anadolu teması' },
      { id: '6', left: 'Tanzimat', right: 'Vatan, hürriyet ve hak kavramları' },
    ],
  },
  {
    id: 'terim-tanim',
    title: 'Terim → Tanım Eşleştir',
    icon: '📖',
    color: 'from-emerald-600 to-teal-700',
    instructions: 'Her edebi terimi doğru tanımıyla eşleştir.',
    pairs: [
      { id: '1', left: 'Redif', right: 'Dize sonlarında aynen tekrar eden ek/sözcük' },
      { id: '2', left: 'Teşbih', right: 'Zayıfı güçlüye benzetme sanatı' },
      { id: '3', left: 'Tezat', right: 'Zıt kavramları bir arada kullanma' },
      { id: '4', left: 'Tekrir', right: 'Sözcük/grubu pekiştirme için tekrar etme' },
      { id: '5', left: 'Mübalağa', right: 'Gerçek dışı abartma sanatı' },
      { id: '6', left: 'Aliterasyon', right: 'Aynı ünsüzü sık tekrar etme' },
    ],
  },
  {
    id: 'sair-donem',
    title: 'Şair → Dönem Eşleştir',
    icon: '📅',
    color: 'from-sky-600 to-blue-700',
    instructions: 'Her şairi ait olduğu edebi dönemle eşleştir.',
    pairs: [
      { id: '1', left: 'Fuzuli', right: 'Divan Edebiyatı' },
      { id: '2', left: 'Karacaoğlan', right: 'Halk Edebiyatı' },
      { id: '3', left: 'Namık Kemal', right: 'Tanzimat Edebiyatı' },
      { id: '4', left: 'Tevfik Fikret', right: 'Servet-i Fünun' },
      { id: '5', left: 'Faruk Nafiz Çamlıbel', right: 'Beş Hececiler' },
      { id: '6', left: 'Yunus Emre', right: 'Tekke Edebiyatı' },
    ],
  },
  {
    id: 'nazim-aciklama',
    title: 'Nazım Biçimi → Açıklama',
    icon: '📜',
    color: 'from-rose-600 to-pink-700',
    instructions: 'Her nazım biçimini doğru açıklamasıyla eşleştir.',
    pairs: [
      { id: '1', left: 'Gazel', right: 'Aşk ve şarabı konu alan 5-15 beyitlik divan şiiri' },
      { id: '2', left: 'Kaside', right: 'Din büyüklerini ve padişahları öven uzun şiir' },
      { id: '3', left: 'Koşma', right: '11\'li hece ve dörtlüklerle kurulan halk şiiri' },
      { id: '4', left: 'Semai', right: '8\'li hece ölçüsüyle söylenen halk türkü biçimi' },
      { id: '5', left: 'İlahi', right: 'Allah sevgisini anlatan tekke edebiyatı türü' },
      { id: '6', left: 'Mesnevi', right: 'Her beytinin kendi içinde kafiyeli olduğu uzun divan şiiri' },
    ],
  },
];
