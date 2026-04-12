export interface NoteTopic {
  id: string;
  title: string;
  icon: string;
  color: string;
  subtopics: NoteSubtopic[];
}

export interface NoteSubtopic {
  id: string;
  title: string;
  content: NoteContent[];
}

export type NoteContent =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'highlight'; text: string; label?: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'important'; text: string }
  | { type: 'example'; title: string; text: string };

export const NOTE_TOPICS: NoteTopic[] = [
  {
    id: 'edebiyat-dil',
    title: 'Edebiyat ve Dil',
    icon: '📚',
    color: 'from-violet-600 to-purple-700',
    subtopics: [
      {
        id: 'edebiyat-tanim',
        title: 'Edebiyatın Tanımı',
        content: [
          { type: 'paragraph', text: 'Edebiyat, dili kullanarak estetik değer taşıyan ürünler ortaya koyma sanatıdır. İnsan duygularını, düşüncelerini ve deneyimlerini yazılı ya da sözlü biçimde aktarır.' },
          { type: 'important', text: 'Edebiyat = Dil Sanatı. Her sanat dalı farklı bir malzeme kullanır; edebiyatın malzemesi dildir.' },
          { type: 'heading', text: 'Edebiyatın İşlevleri' },
          { type: 'list', items: ['Estetik zevk vermek', 'Düşünce dünyasını geliştirmek', 'Toplumu yansıtmak ve eleştirmek', 'Kültürü gelecek nesillere aktarmak', 'Empati kurmayı sağlamak', 'Tarihi belgelemek'] },
          { type: 'heading', text: 'Güzel Sanatlar İçinde Edebiyat' },
          { type: 'table', headers: ['Sanat Dalı', 'Kullandığı Malzeme'], rows: [['Edebiyat', 'Dil (sözcükler)'], ['Müzik', 'Ses ve ritim'], ['Resim', 'Renk ve çizgi'], ['Mimarlık', 'Taş, beton, demir'], ['Heykel', 'Taş, kil, metal']] },
        ],
      },
      {
        id: 'dil-islevleri',
        title: 'Dilin İşlevleri',
        content: [
          { type: 'paragraph', text: 'Dilin birden fazla işlevi vardır. Bu işlevler, iletişimde hangi amacın ön planda olduğunu gösterir.' },
          { type: 'table', headers: ['İşlev', 'Amaç', 'Örnek'], rows: [
            ['Haber verme (Referans)', 'Bilgi aktarma', '"Yarın yağmur yağacak."'],
            ['Anlatım (Dışavurum)', 'Duygu ifade etme', '"Ah, ne güzel!"'],
            ['Çağrı (Alıcıyı etkileme)', 'Davranışı yönlendirme', '"Şimdi ders çalışalım."'],
            ['Dil Ötesi (Üst Dil)', 'Dili açıklama', '"Yüz kelimesi tek heceli."'],
            ['Şiirsel (Estetik)', 'Estetik etki yaratma', 'Şiirler, edebi metinler'],
            ['Phatic (İletişimi Kurma)', 'İletişim kanalını açık tutma', '"Nasılsın? İyi misin?"'],
          ]},
        ],
      },
    ],
  },
  {
    id: 'siir-bilgisi',
    title: 'Şiir Bilgisi',
    icon: '🎭',
    color: 'from-pink-600 to-rose-700',
    subtopics: [
      {
        id: 'kafiye-redif',
        title: 'Kafiye ve Redif',
        content: [
          { type: 'important', text: 'SIRASI: Kafiye önce gelir, Redif sonra gelir! Kafiyeyi bulduktan sonra ondan sonra gelen aynı ek/sözcük rediftir.' },
          { type: 'heading', text: 'Kafiye Türleri' },
          { type: 'table', headers: ['Tür', 'Ses Sayısı', 'Örnek'], rows: [
            ['Yarım Kafiye', '1 ses benzerliği', 'al / dal / kal'],
            ['Tam Kafiye', '2 ses benzerliği', 'gel / el / sel'],
            ['Zengin Kafiye', '3+ ses', 'keder / gider'],
            ['Tunç Kafiye', 'Kısa sözcük uzunun içinde', 'gül / bülbül'],
            ['Cinaslı Kafiye', 'Eşsesli sözcükler', 'yüz (surat) / yüz (sayı)'],
          ]},
          { type: 'heading', text: 'Kafiye Şeması' },
          { type: 'table', headers: ['Şema', 'Adı', 'Örnek Dize Düzeni'], rows: [
            ['AABB', 'Düz kafiye (mesnevi kafiyesi)', 'A A B B'],
            ['ABAB', 'Çapraz kafiye', 'A B A B'],
            ['ABBA', 'Sarma kafiye', 'A B B A'],
            ['AAAA', 'Tam kafiye', 'A A A A'],
          ]},
          { type: 'highlight', text: 'Redif nedir? Kafiyeden sonra gelen ve dize sonlarında aynen tekrar eden ek, sözcük ya da sözcük gruplarıdır.', label: '⚠️ Önemli' },
          { type: 'example', title: 'Örnek Analiz', text: '"Ağlarım ağlatamam / Hâlim anlatamam"\n→ "ağlat-" ve "anlat-" kafiye kökleri\n→ "-amam" eki redif' },
        ],
      },
      {
        id: 'olcu',
        title: 'Ölçü (Vezin)',
        content: [
          { type: 'heading', text: 'Hece Ölçüsü' },
          { type: 'paragraph', text: 'Türk halk şiirinde kullanılan ölçüdür. Her dizede belirli sayıda hece bulunur. En yaygın kalıplar: 7\'li, 8\'li, 11\'li, 14\'lü hece.' },
          { type: 'table', headers: ['Hece', 'Duraksama', 'Kullanıldığı Tür'], rows: [
            ['7\'li', '4+3', 'Mani'],
            ['8\'li', '4+4', 'Semai, Türkü'],
            ['11\'li', '4+4+3 veya 6+5', 'Koşma, Destan'],
            ['14\'lü', '7+7', 'Han Duvarları (Faruk Nafiz)'],
          ]},
          { type: 'heading', text: 'Aruz Ölçüsü' },
          { type: 'paragraph', text: 'Arap ve Fars edebiyatından alınan bu ölçü, hecelerin kısa (açık) veya uzun (kapalı) olmasına dayanır. Divan ve Servet-i Fünun edebiyatında kullanılmıştır.' },
          { type: 'important', text: 'Hece = SAYI esaslı | Aruz = UZUNLUK esaslı' },
        ],
      },
      {
        id: 'edebi-sanatlar',
        title: 'Edebi Sanatlar',
        content: [
          { type: 'heading', text: 'Söz Sanatları' },
          { type: 'table', headers: ['Sanat', 'Tanım', 'Örnek'], rows: [
            ['Teşbih', 'Zayıfı güçlüye benzetme (4 unsur)', '"Aslan gibi savaştı"'],
            ['İstiare', 'Benzetmenin sadece "gibi" unsuru olmadan', '"Hayat bir yolculuktur"'],
            ['Mecaz', 'Sözcüğü gerçek anlamı dışında kullanma', '"Ocağı söndü" (evi yıkıldı)'],
            ['Kişileştirme', 'Cansız varlıklara insan özelliği verme', '"Dağlar ağlar"'],
            ['Mübalağa', 'Abartma', '"Gözlerimden seller aktı"'],
            ['Tezat', 'Zıt kavramları bir arada kullanma', '"Ne ölü ne diri"'],
            ['Tekrir', 'Pekiştirmek için tekrar', '"Yavaş yavaş geldi"'],
            ['Aliterasyon', 'Aynı ünsüz sık tekrar', '"Serin serin Kapalıçarşı"'],
            ['Asonans', 'Aynı ünlü sık tekrar', '"Yıllar yıkıldı içimde"'],
            ['Nida', 'Seslenme / ünlem', '"Ey vatan!"'],
            ['İstifham', 'Cevap beklenmeyen soru', '"Bu zalim dünya ne zamana böyle?"'],
          ]},
          { type: 'highlight', text: 'Teşbih 4 unsur içerir: Benzeyen + Benzetme Edatı (gibi/kadar) + Benzetme Yönü + Kendisine Benzetilen', label: '📌 Formül' },
        ],
      },
      {
        id: 'nazim-bicimleri',
        title: 'Nazım Biçimleri',
        content: [
          { type: 'heading', text: 'Divan Edebiyatı Nazım Biçimleri' },
          { type: 'table', headers: ['Biçim', 'Nazım Birimi', 'Beyit Sayısı', 'Konu'], rows: [
            ['Gazel', 'Beyit', '5-15', 'Aşk, şarap, güzellik'],
            ['Kaside', 'Beyit', '33-99', 'Övgü (din büyükleri, padişah)'],
            ['Mesnevi', 'Beyit', 'Sınırsız', 'Aşk, ahlak, macera'],
            ['Terkib-i Bent', 'Bent + vasıta', 'Değişken', 'Felsefe, yas, şikâyet'],
            ['Rubai', 'Dörtlük', '1', 'Felsefe, hayat'],
            ['Şarkı', 'Dörtlük', 'Değişken', 'Sevgi, eğlence'],
          ]},
          { type: 'heading', text: 'Halk Edebiyatı Nazım Biçimleri' },
          { type: 'table', headers: ['Biçim', 'Hece', 'Konu'], rows: [
            ['Koşma', '11\'li', 'Aşk, doğa, ayrılık (güzelleme, koçaklama, taşlama, ağıt)'],
            ['Semai', '8\'li', 'Lirik konular'],
            ['Varsağı', '8\'li', 'Yiğitçe, meydan okuyucu'],
            ['Destan (Halk)', '11\'li', 'Tarih, savaş, doğal afet'],
            ['Mani', '7\'li', 'Kısa, öğüt, aşk'],
          ]},
        ],
      },
    ],
  },
  {
    id: 'islamiyet-oncesi',
    title: 'İslamiyet Öncesi Türk Edebiyatı',
    icon: '🏺',
    color: 'from-amber-600 to-yellow-700',
    subtopics: [
      {
        id: 'sozlu-donem',
        title: 'Sözlü Dönem',
        content: [
          { type: 'paragraph', text: 'Türklerin İslamiyet\'i kabul etmeden önceki dönemde sözlü olarak aktarılan edebî ürünler bu döneme aittir. Yazı henüz yaygın değildir; şiirler "ozan" ya da "kam" denilen şairler tarafından sözlü olarak aktarılmıştır.' },
          { type: 'important', text: 'Sözlü dönemin ürünleri: DESTAN – KOŞUK – SAGU – SAV' },
          { type: 'heading', text: 'Sözlü Dönem Ürünleri' },
          { type: 'table', headers: ['Tür', 'Tanım', 'Konusu', 'Divan Karşılığı'], rows: [
            ['Destan', 'Ulusal kahramanlık anlatısı', 'Savaş, göç, doğal afet', 'Epik şiir'],
            ['Koşuk', 'Lirik şiir', 'Aşk, doğa, av, savaş', 'Gazel'],
            ['Sagu', 'Yas şiiri', 'Ölen kişi için ağıt', 'Mersiye'],
            ['Sav', 'Kısa öğütler', 'Hayat dersleri', 'Atasözü'],
          ]},
          { type: 'heading', text: 'Önemli Destanlar' },
          { type: 'list', items: ['Yaratılış Destanı (Altay-Yakut)', 'Oğuz Kağan Destanı (Uygurlara ait)', 'Ergenekon Destanı (Göktürklere ait)', 'Bozkurt Destanı (Göktürklere ait)', 'Göç Destanı (Uygurlara ait)', 'Türeyiş Destanı (Uygurlara ait)'] },
        ],
      },
      {
        id: 'yazili-donem',
        title: 'Yazılı Dönem',
        content: [
          { type: 'paragraph', text: 'Göktürk alfabesiyle yazılan ve Türk diline ait en eski yazılı belgeler bu döneme aittir.' },
          { type: 'important', text: 'En önemli eserler: ORHUN ABİDELERİ – KUTADGU BİLİG – DİVAN-I LÜGAT-İT TÜRK – ATABETÜ\'L HAKAYIK' },
          { type: 'table', headers: ['Eser', 'Yazar', 'Dönem', 'Önemi'], rows: [
            ['Orhun Abideleri', 'Yollug Tigin (yazan)', '8. yüzyıl (720-735)', 'En eski Türkçe yazılı belgeler'],
            ['Kutadgu Bilig', 'Yusuf Has Hacib', '11. yüzyıl (1069-70)', 'İlk Türkçe siyasetname'],
            ['Divan-ı Lügat-it Türk', 'Kaşgarlı Mahmut', '11. yüzyıl (1072-74)', 'İlk Türkçe sözlük'],
            ['Atabetü\'l Hakayık', 'Edip Ahmet Yükneki', '12. yüzyıl', 'Ahlak ve öğüt kitabı'],
          ]},
          { type: 'highlight', text: 'Orhun Abideleri\'nin dikildiği yer: Moğolistan\'daki Orhun nehri kıyısı. Türk diline ve tarihine kaynaklık eden bu taşlar 1893\'te Danimarkalı bilim insanı Vilhelm Thomsen tarafından çözülmüştür.', label: '📍 Konum' },
        ],
      },
    ],
  },
  {
    id: 'islamiyet-donemi',
    title: 'İslamiyet Dönemi Türk Edebiyatı',
    icon: '🕌',
    color: 'from-emerald-600 to-teal-700',
    subtopics: [
      {
        id: 'divan-edebiyati',
        title: 'Divan Edebiyatı',
        content: [
          { type: 'paragraph', text: 'Türklerin İslamiyet\'i kabul etmesiyle birlikte Arap ve Fars edebiyatının etkisiyle gelişen bu edebiyat; 13. yüzyıldan 19. yüzyıla kadar sürmüştür.' },
          { type: 'heading', text: 'Temel Özellikleri' },
          { type: 'list', items: [
            'Aruz ölçüsü kullanılır',
            'Arapça ve Farsça sözcükler yoğundur',
            'Nazım birimi beyittir',
            'Mazmun (şiirsel kalıp ve sembol) sistemi vardır',
            'Şairler eğitimli zümreden gelir',
            'Gazel, kaside, mesnevi gibi biçimler kullanılır',
            'Aşk tasavvufi bir anlamda (ilahi aşk) sıkça işlenir',
          ]},
          { type: 'heading', text: 'Önemli Şairler' },
          { type: 'table', headers: ['Şair', 'Yıllar', 'Önemli Eseri'], rows: [
            ['Yunus Emre', '1240-1321', 'Divan, Risaletü\'n-Nushiyye'],
            ['Fuzuli', '1483-1556', 'Leyla vü Mecnun, Su Kasidesi'],
            ['Baki', '1526-1600', 'Kanuni Mersiyesi, Divan'],
            ['Nedim', '1681-1730', 'Divan'],
            ['Şeyh Galip', '1757-1799', 'Hüsn ü Aşk'],
          ]},
        ],
      },
      {
        id: 'halk-edebiyati',
        title: 'Halk Edebiyatı',
        content: [
          { type: 'paragraph', text: 'Halk edebiyatı, anonim ya da belirli ozanlar tarafından üretilen; hece ölçüsünü ve sade Türkçeyi kullanan sözlü geleneğe dayalı bir edebiyattır.' },
          { type: 'heading', text: 'Halk Edebiyatı Kolları' },
          { type: 'table', headers: ['Kol', 'Özellikleri', 'Önemli İsimler'], rows: [
            ['Anonim Halk Edebiyatı', 'Yazarı bilinmez; masal, mani, türkü, ninni', '–'],
            ['Aşık Edebiyatı', 'Sazla söylenir; ozan ve aşık kavramı', 'Karacaoğlan, Köroğlu, Âşık Veysel'],
            ['Tekke/Tasavvuf Edebiyatı', 'Din ve tasavvuf konuları; ilahi, nefes', 'Yunus Emre, Hacı Bektaş Veli'],
          ]},
          { type: 'highlight', text: 'Halk Edebiyatı = HECE ölçüsü + SADE Türkçe + DÖRTLÜK nazım birimi', label: '📌 Formül' },
        ],
      },
    ],
  },
  {
    id: 'tanzimat',
    title: 'Tanzimat Edebiyatı',
    icon: '📜',
    color: 'from-blue-600 to-indigo-700',
    subtopics: [
      {
        id: 'tanzimat-genel',
        title: 'Genel Özellikleri',
        content: [
          { type: 'paragraph', text: '1839\'da ilan edilen Tanzimat Fermanı ile başlayan bu dönemde Türk edebiyatı Batı\'yı model almaya başlamıştır. Edebiyat artık bireysel değil toplumsal meseleleri ele alır.' },
          { type: 'important', text: 'Tanzimat = Batıya açılma + Toplumsal mesajlar + Divan biçimi + Yeni içerik' },
          { type: 'heading', text: '1. Dönem vs 2. Dönem Karşılaştırması' },
          { type: 'table', headers: ['Özellik', '1. Dönem (1839-1865)', '2. Dönem (1865-1896)'], rows: [
            ['Sanat anlayışı', '"Sanat toplum için"', '"Sanat sanat için"'],
            ['Konu', 'Vatan, hürriyet, hak', 'Bireysel duygular'],
            ['Dil', 'Hâlâ ağır, ama yalınlaşıyor', 'Daha da yalın'],
            ['Temsilciler', 'Şinasi, Namık Kemal, Ziya Paşa', 'Recaizade M. Ekrem, A. H. Tarhan'],
          ]},
        ],
      },
    ],
  },
  {
    id: 'servet-funun',
    title: 'Servet-i Fünun',
    icon: '🌫️',
    color: 'from-slate-600 to-gray-700',
    subtopics: [
      {
        id: 'sf-genel',
        title: 'Genel Özellikleri',
        content: [
          { type: 'paragraph', text: '1896-1901 yılları arasında Servet-i Fünun dergisi çevresinde gelişen bu edebiyat, Fransa\'nın Parnasizm ve Sembolizm akımlarından etkilenmiştir.' },
          { type: 'heading', text: 'Temel Özellikleri' },
          { type: 'list', items: [
            'Parnasizm (şiirde biçim güzelliği) ve Sembolizm (sembollerle anlatım) etkisi',
            'Arapça-Farsça sözcükler yoğun kullanılır',
            'Aruz ölçüsü ve serbest müstezat biçimi yaygınlaşır',
            'Bireysel duygular: keder, yalnızlık, hayal kırıklığı',
            'Toplumsal meselelere uzak, "sanat için sanat"',
            'Karamsar bir dünya görüşü hâkimdir',
          ]},
          { type: 'table', headers: ['Şair/Yazar', 'Türü', 'Ünlü Eseri'], rows: [
            ['Tevfik Fikret', 'Şiir', 'Sis, Haluk\'un Defteri'],
            ['Cenap Şahabettin', 'Şiir', 'Elhan-ı Şita'],
            ['Halit Ziya Uşaklıgil', 'Roman', 'Aşk-ı Memnu, Mai ve Siyah'],
            ['Mehmet Rauf', 'Roman', 'Eylül'],
          ]},
        ],
      },
    ],
  },
  {
    id: 'milli-edebiyat',
    title: 'Milli Edebiyat',
    icon: '🇹🇷',
    color: 'from-red-600 to-rose-700',
    subtopics: [
      {
        id: 'milli-genel',
        title: 'Genel Özellikleri',
        content: [
          { type: 'paragraph', text: '1911\'de "Genç Kalemler" dergisinin yayımlanmasıyla başlayan bu dönemde Türk edebiyatı Servet-i Fünun\'un ağır diline tepki olarak ulusal bir kimlik kazanmaya çalışmıştır.' },
          { type: 'important', text: 'Milli Edebiyat\'ın sloganı: "Dilde, fikirde, işte birlik" – Ziya Gökalp' },
          { type: 'heading', text: 'Temel Özellikleri' },
          { type: 'list', items: [
            'Sade Türkçe ve hece ölçüsü benimsenir',
            'Anadolu\'nun coğrafyası ve insanı konu alınır',
            'Milli duygular ve vatan sevgisi işlenir',
            'Türkçecilik ideolojisi etkili',
            'Halk edebiyatından yararlanılır',
          ]},
          { type: 'table', headers: ['İsim', 'Alan', 'Katkısı'], rows: [
            ['Mehmet Akif Ersoy', 'Şiir', 'İstiklal Marşı, Safahat'],
            ['Yahya Kemal Beyatlı', 'Şiir', 'Neo-Klasisizm, Sessiz Gemi'],
            ['Ziya Gökalp', 'Fikir', 'Türkçülüğün Esasları'],
          ]},
        ],
      },
    ],
  },
  {
    id: 'cumhuriyet',
    title: 'Cumhuriyet Dönemi',
    icon: '🌟',
    color: 'from-sky-600 to-cyan-700',
    subtopics: [
      {
        id: 'bes-hececiler',
        title: 'Beş Hececiler',
        content: [
          { type: 'paragraph', text: '1920\'li yıllarda ön plana çıkan beş şairden oluşan bu grup; hece ölçüsü ve sade Türkçeyi benimseyerek Anadolu\'yu, yurt özlemini ve milli duyguları işlemiştir.' },
          { type: 'list', items: ['Faruk Nafiz Çamlıbel (Han Duvarları)', 'Enis Behiç Koryürek (Miras)', 'Yusuf Ziya Ortaç (Akından Akına)', 'Halit Fahri Ozansoy (Romantik)', 'Orhan Seyfi Orhon (Peri Kızı)'] },
        ],
      },
      {
        id: 'garip-akimi',
        title: 'Garip Akımı',
        content: [
          { type: 'paragraph', text: '1941\'de Orhan Veli Kanık, Oktay Rifat Horozcu ve Melih Cevdet Anday\'ın "Garip" adlı şiir kitabını yayımlamasıyla başlayan akımdır.' },
          { type: 'important', text: 'Garip = Ölçü YOK + Kafiye YOK + Süslü Üslup YOK = Sıradan insan, günlük dil, serbest şiir' },
          { type: 'heading', text: 'Garip Akımı\'nın Özellikleri' },
          { type: 'list', items: [
            'Hece ve aruz ölçüsüne karşı çıkış',
            'Kafiye ve şiirsel süse karşı çıkış',
            'Sıradan insanın günlük yaşamı konu alınır',
            'Mizah ve ironi önemli araçlardır',
            'Serbest şiir benimsenir',
            'Şiirde müzikal kaygı reddedilir',
          ]},
        ],
      },
      {
        id: 'ikinci-yeni',
        title: 'İkinci Yeni',
        content: [
          { type: 'paragraph', text: '1950\'li yıllarda Garip\'e tepki olarak ortaya çıkan İkinci Yeni akımı; anlam kapalılığı, imgeci bir dil ve dışavurumcu bir şiir anlayışını savunmuştur.' },
          { type: 'list', items: ['Turgut Uyar', 'Edip Cansever', 'Cemal Süreya', 'Ece Ayhan', 'İlhan Berk', 'Sezai Karakoç'] },
        ],
      },
    ],
  },
  {
    id: 'nesir-turleri',
    title: 'Nesir (Düzyazı) Türleri',
    icon: '📝',
    color: 'from-orange-600 to-amber-700',
    subtopics: [
      {
        id: 'hikaye',
        title: 'Hikâye (Öykü)',
        content: [
          { type: 'paragraph', text: 'Gerçek ya da gerçeğe yakın olayların kısa biçimde, sınırlı kişi kadrosuyla anlatıldığı nesir türüdür.' },
          { type: 'table', headers: ['Türe Göre', 'Maupassant Tarzı', 'Çehov Tarzı'], rows: [
            ['Olay', 'Güçlü olay örgüsü', 'Olay yüzeysel / yok'],
            ['Odak', 'Dramatik gerilim', 'Ruh hali, atmosfer'],
            ['Yapı', 'Serim-düğüm-çözüm', 'Belirsiz başlangıç-son'],
            ['Türk Temsilcisi', 'Halit Ziya', 'Sait Faik'],
          ]},
          { type: 'heading', text: 'Hikâye Unsurları' },
          { type: 'list', items: ['Olay örgüsü', 'Mekân (yer)', 'Zaman', 'Kişi kadrosu', 'Anlatıcı (bakış açısı)'] },
        ],
      },
      {
        id: 'diger-nesir',
        title: 'Diğer Nesir Türleri',
        content: [
          { type: 'table', headers: ['Tür', 'Tanım', 'Özellik'], rows: [
            ['Roman', 'Uzun kurgusal nesir', 'Geniş zaman, karakter, mekân'],
            ['Tiyatro (Drama)', 'Sahnelenmek için yazılmış eserler', 'Diyalog egemen, perde-sahne'],
            ['Anı (Hatıra)', 'Yaşananların aktarımı', 'Birinci kişi, gerçek olaylar'],
            ['Gezi Yazısı', 'Yolculuk notları', 'Yer betimleme, kültürel gözlem'],
            ['Deneme', 'Kişisel fikir anlatısı', 'Öznel, kanıtlama yok'],
            ['Makale', 'Bilimsel fikir yazısı', 'Nesnel, kanıtlama zorunlu'],
            ['Biyografi', 'Başka birinin hayatı', 'Üçüncü kişi anlatıcı'],
            ['Otobiyografi', 'Kendi hayatı', 'Birinci kişi anlatıcı'],
          ]},
        ],
      },
    ],
  },
];
