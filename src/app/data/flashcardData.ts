export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  difficulty: 'kolay' | 'orta' | 'zor';
}

export interface FlashcardDeck {
  id: string;
  title: string;
  icon: string;
  color: string;
  cards: Flashcard[];
}

export const FLASHCARD_DECKS: FlashcardDeck[] = [
  {
    id: 'terimler',
    title: 'Edebi Terimler',
    icon: '📖',
    color: 'from-purple-600 to-indigo-700',
    cards: [
      { id: 'f1', front: 'REDİF nedir?', back: 'Şiirde dize sonlarında kafiyeden sonra gelen ve aynen tekrar eden ek, sözcük veya sözcük gruplarına denir. Redif her zaman kafiyeden sonra gelir.', category: 'Şiir Bilgisi', difficulty: 'kolay' },
      { id: 'f2', front: 'KAFİYE nedir?', back: 'Şiirde dize sonlarındaki ses benzerliğidir. Tam kafiye (iki ses), yarım kafiye (bir ses), zengin kafiye (üç ve üzeri ses) olmak üzere çeşitleri vardır.', category: 'Şiir Bilgisi', difficulty: 'kolay' },
      { id: 'f3', front: 'ÖLÇÜ (VEZİN) nedir?', back: 'Şiirde dize uzunluklarının belirli bir kurala bağlanmasıdır. Türk edebiyatında hece ölçüsü ve aruz ölçüsü başlıca ölçü sistemleridir.', category: 'Şiir Bilgisi', difficulty: 'kolay' },
      { id: 'f4', front: 'TEŞBİH (BENZETME) nedir?', back: 'Aralarında benzerlik bulunan iki şeyden zayıf olanı güçlü olana benzetme sanatıdır. Tam teşbih 4 unsur içerir: benzeyen, kendisine benzetilen, benzetme yönü ve benzetme edatı.', category: 'Edebi Sanatlar', difficulty: 'orta' },
      { id: 'f5', front: 'İSTİARE nedir?', back: 'Benzetmenin sadece "kendisine benzetilen" ögesiyle yapılmasıdır. Benzetme edatı ve benzetme yönü yoktur. "Açık istiare" ve "kapalı istiare" olmak üzere ikiye ayrılır.', category: 'Edebi Sanatlar', difficulty: 'orta' },
      { id: 'f6', front: 'KİŞİLEŞTİRME (TEŞHİS) nedir?', back: 'İnsanlara özgü niteliklerin insan dışı varlıklara (cansız nesnelere, hayvanlara, kavramlara) verilmesidir. "Rüzgâr ağlıyor, dağlar düşünüyor" gibi örnekler teşhis içerir.', category: 'Edebi Sanatlar', difficulty: 'kolay' },
      { id: 'f7', front: 'MÜBALAĞA (ABARTMA) nedir?', back: 'Bir şeyin gerçekte olduğundan çok daha fazla ya da az olduğunu söyleme sanatıdır. "Yaşım yüz yıl olmuş" gibi abartmalı ifadeler mübalağa içerir.', category: 'Edebi Sanatlar', difficulty: 'kolay' },
      { id: 'f8', front: 'TEZAT nedir?', back: 'Birbiriyle çelişen, zıt anlam taşıyan kavramları bir arada kullanma sanatıdır. "Ne cennet ne cehennem" ifadesi tezat sanatının örneğidir.', category: 'Edebi Sanatlar', difficulty: 'kolay' },
      { id: 'f9', front: 'TEKRİR nedir?', back: 'Anlam ve duyguyu pekiştirmek amacıyla aynı sözcük veya sözcük grubunun şiirde birden fazla kez tekrar edilmesi sanatıdır. "Yavaş yavaş, uzak uzak" gibi örnekler tekrir içerir.', category: 'Edebi Sanatlar', difficulty: 'kolay' },
      { id: 'f10', front: 'ALİTERASYON nedir?', back: 'Şiirde ses musikisi yaratmak amacıyla aynı ünsüz harfin sık sık tekrar edilmesidir. "Serin serin Kapalıçarşı, Cıvıl cıvıl Mahmutpaşa" örneğinde "s" ve "c" aliterasyonu görülür.', category: 'Edebi Sanatlar', difficulty: 'orta' },
      { id: 'f11', front: 'NİDA nedir?', back: 'Şiirde coşku, üzüntü, özlem gibi duyguları seru ya da ünlem olarak dışa vurmaktır. "Nerdesin!", "Ah!" gibi seslenme ya da ünlem biçimindeki ifadeler nida sanatıdır.', category: 'Edebi Sanatlar', difficulty: 'kolay' },
      { id: 'f12', front: 'GAZEL nedir?', back: 'Divan edebiyatında aşk, şarap ve güzelliği anlatan 5-15 beyitten oluşan şiir biçimidir. İlk beytine matla, son beytine makta denir. Şairin mahlasını kullandığı beyte "mahlas beyti" denir.', category: 'Nazım Biçimleri', difficulty: 'orta' },
      { id: 'f13', front: 'KASİDE nedir?', back: 'Divan edebiyatında din büyüklerini, padişahları ya da devlet adamlarını övmek için ya da bir kavramı işlemek için yazılan uzun şiirlerdir. Matla, girizgâh, medhiye, tegazzül ve fahriye bölümlerinden oluşur.', category: 'Nazım Biçimleri', difficulty: 'zor' },
      { id: 'f14', front: 'KOŞMA nedir?', back: 'Halk edebiyatında 11\'li hece ölçüsüyle yazılan, dörtlüklerden oluşan nazım biçimidir. Aşk, doğa, ayrılık gibi lirik konuları işler. Koşma türleri: güzelleme, koçaklama, taşlama, ağıt.', category: 'Nazım Biçimleri', difficulty: 'orta' },
      { id: 'f15', front: 'SEMAİ nedir?', back: 'Halk edebiyatında 8\'li hece ölçüsüyle yazılan ve özel bir ezgiyle söylenen nazım biçimidir. Konuları koşmayla aynıdır. 8\'li hece yerine 7\'li hece kullananı da vardır.', category: 'Nazım Biçimleri', difficulty: 'orta' },
      { id: 'f16', front: 'SERBEST ŞİİR nedir?', back: 'Ölçü, kafiye ve belirli bir nazım biçimine bağlı kalmadan yazılan şiirdir. Garip Akımı\'nın (Orhan Veli, Oktay Rifat, Melih Cevdet) öncülük ettiği bu biçim Batı\'dan alınmıştır.', category: 'Nazım Biçimleri', difficulty: 'kolay' },
    ],
  },
  {
    id: 'donemler',
    title: 'Edebi Dönemler',
    icon: '🏛️',
    color: 'from-amber-600 to-orange-700',
    cards: [
      { id: 'd1', front: 'TANZİMAT EDEBİYATI 1. Dönem – Temel özellikleri nelerdir?', back: '• Divan şiiri biçimleri kullanılır ama içerik değişir\n• Vatan, hürriyet, hak kavramları işlenir\n• Şinasi, Namık Kemal, Ziya Paşa\n• "Sanat toplum için" anlayışı\n• 1839-1865 arası', category: 'Edebi Dönemler', difficulty: 'orta' },
      { id: 'd2', front: 'TANZİMAT EDEBİYATI 2. Dönem – Temel özellikleri nelerdir?', back: '• Bireysel konular ön plana çıkar\n• Biçim ve içerik Batılılaşır\n• Recaizade M. Ekrem, Abdülhak Hamit Tarhan\n• "Sanat sanat için" anlayışı\n• 1865-1895 arası', category: 'Edebi Dönemler', difficulty: 'orta' },
      { id: 'd3', front: 'SERVET-İ FÜNUN – Temel özellikleri nelerdir?', back: '• Fransa\'nın Parnasizm ve Sembolizm akımları etkili\n• Arapça-Farsça sözcükler yoğun\n• Serbest müstezat yaygınlaşır\n• Tevfik Fikret, Cenap Şahabettin, Halit Ziya\n• 1896-1901 arası', category: 'Edebi Dönemler', difficulty: 'orta' },
      { id: 'd4', front: 'MİLLİ EDEBİYAT – Temel özellikleri nelerdir?', back: '• Sade Türkçe ve hece ölçüsü\n• Milli duygular ön planda\n• Anadolu coğrafyası ve halk kültürü\n• Mehmet Akif, Yahya Kemal, Ziya Gökalp\n• 1911-1923 arası', category: 'Edebi Dönemler', difficulty: 'orta' },
      { id: 'd5', front: 'GARİP AKIMI – Temel özellikleri nelerdir?', back: '• 1941\'de "Garip" kitabıyla başlar\n• Ölçü ve kafiyeye karşı çıkış\n• Günlük dil, sıradan insan ve konular\n• Şiirde müzikal kaygı yok\n• Orhan Veli, Oktay Rifat, Melih Cevdet', category: 'Edebi Dönemler', difficulty: 'kolay' },
      { id: 'd6', front: 'İSLAMİYET ÖNCESİ SÖZLÜ EDEBİYAT – Türleri nelerdir?', back: '• Destan: Ulusal kahramanlık destanları\n• Koşuk: Aşk ve doğayı anlatan lirik şiir\n• Sagu: Ölü için yazılan yas şiiri\n• Sav: Öğüt veren kısa sözler (atasözü benzeri)\n• Sözlü aktarım, anonim', category: 'Edebi Dönemler', difficulty: 'kolay' },
      { id: 'd7', front: 'DİVAN EDEBİYATI – Temel özellikleri nelerdir?', back: '• Aruz ölçüsü\n• Arapça-Farsça sözcükler\n• Gazel, kaside, mesnevi gibi nazım biçimleri\n• Divan şairleri eğitimli zümreden\n• Beyt (beyit) nazım birimi\n• 13.-19. yüzyıl arası', category: 'Edebi Dönemler', difficulty: 'orta' },
      { id: 'd8', front: 'HALK EDEBİYATI – Temel özellikleri nelerdir?', back: '• Hece ölçüsü\n• Sade Türkçe\n• Koşma, semai, varsağı, destan\n• Aşık edebiyatı: saz eşliğinde doğaçlama\n• Tekke edebiyatı: tasavvuf konuları\n• Anonim halk edebiyatı: masal, ninni, türkü', category: 'Edebi Dönemler', difficulty: 'kolay' },
    ],
  },
  {
    id: 'sairler',
    title: 'Şair Kartları',
    icon: '✍️',
    color: 'from-sky-600 to-blue-700',
    cards: [
      { id: 's1', front: 'YUNUS EMRE kimdir? Dönemi ve önemli eserleri?', back: '• 1240-1321 yılları arasında yaşamıştır\n• Tekke/Tasavvuf Edebiyatı\n• "Divan" ve "Risaletü\'n-Nushiyye" eserleri\n• Taptuk Emre\'nin müridiydi\n• UNESCO 1991\'i "Yunus Emre Yılı" ilan etmiştir', category: 'Şairler', difficulty: 'kolay' },
      { id: 's2', front: 'FUZULİ kimdir? Dönemi ve önemli eserleri?', back: '• 1483-1556 yılları arasında yaşamıştır\n• Klasik Divan Edebiyatı\n• "Leyla vü Mecnun", "Su Kasidesi"\n• Türkçe, Arapça, Farsça üç dilde şiir yazdı\n• "Tasavvufi aşk" anlayışı egemendir', category: 'Şairler', difficulty: 'kolay' },
      { id: 's3', front: 'BAKİ kimdir? Önemli unvanı nedir?', back: '• 1526-1600 yılları arasında yaşamıştır\n• Divan Edebiyatı – Kanuni dönemi\n• "Sultanü\'ş-Şuara" (Şairlerin Sultanı) unvanı\n• "Kanuni Mersiyesi" en ünlü eseri\n• Rindane (dünyadan zevk alan) şiir anlayışı', category: 'Şairler', difficulty: 'kolay' },
      { id: 's4', front: 'MEHMET AKİF ERSOY kimdir? En önemli eseri nedir?', back: '• 1873-1936 yılları arasında yaşamıştır\n• Milli Edebiyat Dönemi\n• İstiklal Marşı şairi\n• "Safahat" (7 kitap) en büyük eseri\n• Aruz ölçüsüyle halk diliyle yazmıştır', category: 'Şairler', difficulty: 'kolay' },
      { id: 's5', front: 'ORHAN VELİ KANIK kimdir? Hangi akımı kurdu?', back: '• 1914-1950 yılları arasında yaşamıştır\n• Garip Akımı\'nın kurucusu (Oktay Rifat ve Melih Cevdet ile)\n• "İstanbul\'u Dinliyorum" en ünlü şiiri\n• Şiiri ölçü ve kafiyeden kurtarmaya çalıştı\n• 36 yaşında kaza sonucu hayatını kaybetti', category: 'Şairler', difficulty: 'kolay' },
      { id: 's6', front: 'CAHİT SITKI TARANCI kimdir? Hangi eseriyle tanınır?', back: '• 1910-1956 yılları arasında yaşamıştır\n• Cumhuriyet Dönemi – Bireyci Şiir\n• "Otuz Beş Yaş" en ünlü şiiri\n• Dijon\'da öğrenim görmüş, Fransız etkisinde\n• Ölüm ve geçicilik temaları ağır basar', category: 'Şairler', difficulty: 'kolay' },
      { id: 's7', front: 'AHMET KUTSİ TECER kimdir?', back: '• 1901-1967 yılları arasında yaşamıştır\n• Halk geleneğini cumhuriyet şiiriyle buluşturdu\n• "Nerdesin" ve "Orda Bir Köy Var Uzakta" ünlü şiirleri\n• Âşık Veysel\'i keşfetmiştir\n• "Köşebaşı" piyesiyle tiyatroya katkı sağlamıştır', category: 'Şairler', difficulty: 'orta' },
      { id: 's8', front: 'YAHYA KEMAL BEYATLI kimdir? Özelliği nedir?', back: '• 1884-1958 yılları arasında yaşamıştır\n• Neo-Klasikçilik anlayışı\n• "Sessiz Gemi" en ünlü şiiri\n• Şiirlerini ancak mükemmel hale gelince yayımladı\n• Bergson felsefesinden etkilendi\n• Diplomat olarak büyükelçilik yaptı', category: 'Şairler', difficulty: 'orta' },
      { id: 's9', front: 'TEVFİK FİKRET kimdir? Hangi dönemi temsil eder?', back: '• 1867-1915 yılları arasında yaşamıştır\n• Servet-i Fünun / Edebiyat-ı Cedide\n• "Sis", "Haluk\'un Defteri" önemli eserleri\n• Servet-i Fünun dergisinin başyazarı\n• Serbest müstezatı geliştirmiştir', category: 'Şairler', difficulty: 'orta' },
      { id: 's10', front: 'KARACAOĞLAN kimdir? Dönemi ve türü?', back: '• 1606-1679 yılları arasında yaşamıştır\n• Halk Edebiyatı – Aşık Şiiri\n• Doğa, aşk ve Anadolu coğrafyasını işledi\n• Divan etkisinden uzak, saf Türkçe\n• Koşma ve semai türlerinin ustasıdır', category: 'Şairler', difficulty: 'kolay' },
    ],
  },
  {
    id: 'misralar',
    title: 'Ünlü Dizeler',
    icon: '💬',
    color: 'from-emerald-600 to-teal-700',
    cards: [
      { id: 'm1', front: '"İstanbul\'u dinliyorum, gözlerim kapalı" — Bu dize kime ait? Şiirin teması nedir?', back: 'Orhan Veli Kanık\'a aittir. "İstanbul\'u Dinliyorum" şiirinin nakaratıdır. Şairin gözlerini kapatarak İstanbul\'un seslerini hayal etmesini anlatan bu şiirin teması şehir sevgisi ve nostaljidır.', category: 'Ünlü Dizeler', difficulty: 'kolay' },
      { id: 'm2', front: '"Dante gibi, ortasındayım ömrün" — Bu dize ne anlama gelir?', back: 'Cahit Sıtkı Tarancı\'nın "Otuz Beş Yaş" şiirinden. Dante, İlahi Komedya\'ya "ömrünün ortasında" (35 yaşında) girmiştir. Şair de kendisini bu imgesiyle özdeşleştirerek hayatının yarısında olduğunu dramatik biçimde ifade eder.', category: 'Ünlü Dizeler', difficulty: 'orta' },
      { id: 'm3', front: '"Nerdesin, nerdesin, nerdesin?" — Kime ait? Hangi sanat kullanılmış?', back: 'Ahmet Kutsi Tecer\'in "Nerdesin" şiirinden. Bu dize hem Nida (seslenme) sanatını hem de Tekrir (tekrar) sanatını içerir. Sözcüğün üç kez tekrarı özlemin yoğunluğunu vurgular.', category: 'Ünlü Dizeler', difficulty: 'kolay' },
      { id: 'm4', front: '"Korkma, sönmez bu şafaklarda yüzen al sancak" — Kime ait?', back: 'Mehmet Akif Ersoy\'un yazdığı İstiklal Marşı\'nın ilk dizesidir. 1921\'de TBMM tarafından kabul edilen bu marş, Kurtuluş Savaşı\'nın ruhunu yansıtır. Nida sanatıyla başlar ("Korkma!").', category: 'Ünlü Dizeler', difficulty: 'kolay' },
      { id: 'm5', front: '"Artık demir almak günü gelmişse zamandan" — Bu dize hangi şiirden?', back: 'Yahya Kemal Beyatlı\'nın "Sessiz Gemi" şiirinden. "Demir almak" deyimi ölümü, "liman" ise hayatı simgeler. Şiirin tamamı ölümü sakin ve kaçınılmaz bir yolculuk olarak sunar.', category: 'Ünlü Dizeler', difficulty: 'orta' },
      { id: 'm6', front: '"Beni candan usandırdı cefadan yar usanmaz" — Kime ait? Hangi biçimde yazılmış?', back: 'Fuzuli\'nin ünlü gazelinin matla beytidir. Divan şiirinin gazel biçiminde yazılmıştır. "Yar usanmaz" redifiyle kurulu olan bu beyitte şair sevgilinin cefasına karşın aşkını sürdürmesini anlatır.', category: 'Ünlü Dizeler', difficulty: 'orta' },
    ],
  },
];
