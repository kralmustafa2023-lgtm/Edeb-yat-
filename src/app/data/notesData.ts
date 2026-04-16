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
    id: 'unite-1',
    title: 'Ünite 1: Giriş',
    icon: '📚',
    color: 'from-violet-600 to-purple-700',
    subtopics: [
      {
        id: 'edebiyat-tanim',
        title: 'Edebiyat Nedir?',
        content: [
          { type: 'paragraph', text: 'Edebiyat; duygu, düşünce, hayal ve gözlemlerin dil aracılığıyla estetik, etkili ve sanatsal biçimde aktarıldığı sanat dalıdır. İnsanı konu alır, dil sanatıdır ve evrenseldir.' },
          { type: 'example', title: 'İşlevine Örnek', text: 'Orhan Pamuk edebiyatı "ikinci bir hayat" olarak tanımlar. Okuyucu, okuduğu romanda yaşamadığı deneyimleri yaşar.' },
          { type: 'heading', text: 'Edebiyatın Güzel Sanatlarla İlişkisi' },
          { type: 'table', headers: ['Sanat Dalı', 'Ham Madde', 'Kolu'], rows: [
            ['Edebiyat', 'Dil (Sözcükler)', 'Dil Sanatları'],
            ['Müzik', 'Ses, melodi', 'Fonetik'],
            ['Resim', 'Renk, fırça', 'Plastik'],
            ['Tiyatro', 'Söz, beden', 'Dil + Fonetik']
          ]}
        ]
      },
      {
        id: 'metin-iletisim',
        title: 'Metinler ve İletişim',
        content: [
          { type: 'heading', text: 'Metinlerin Sınıflandırılması' },
          { type: 'paragraph', text: 'Metinler, "Sanatsal (Edebi)" ve "Öğretici" metinler olarak ikiye ayrılır. Sanatsal metinler duygu ve estetiği, öğretici metinler ise bilgi aktarımını hedefler.' },
          { type: 'heading', text: 'İletişim Öğeleri' },
          { type: 'list', items: [
            'Gönderici (Kaynak): Mesajı üreten',
            'Alıcı (Hedef): Mesajı alan',
            'Mesaj (İleti): Aktarılmak istenen bilgi',
            'Kanal (Araç): Mesajın iletildiği ortam (kitap, ses vb.)',
            'Kod: Ortak dil',
            'Bağlam: İletişim ortamı',
            'Dönüt: Geri bildirim'
          ]}
        ]
      },
      {
        id: 'dil-islevleri',
        title: 'Dilin İşlevleri ve Kültür',
        content: [
          { type: 'heading', text: 'Dilin 6 İşlevi (Jakobson)' },
          { type: 'table', headers: ['İşlev', 'Amacı', 'Örnek'], rows: [
            ['Göndergesel', 'Bilgi vermek', 'Ankara, Türkiye\'nin başkentidir.'],
            ['Duygusal', 'Duygu yansıtmak', 'Ne harika bir gün!'],
            ['Alıcıyı Harekete Geçirme', 'Yönlendirmek', 'Hemen ara!'],
            ['Şiirsel (Poetik)', 'Estetik, sanat', 'Şiirler'],
            ['Üst Dil', 'Dili açıklamak', 'Mastar "-mak" ekidir.'],
            ['Kanaı Açık Tutma', 'İletişimi denetlemek', 'Alo, duyuyor musun?']
          ]},
          { type: 'important', text: 'Dil ve kültür ayrılmazdır. Dil kültürü taşır, kültür dili şekillendirir. Dil ölürse kültür de ölür.' }
        ]
      }
    ]
  },
  {
    id: 'unite-2',
    title: 'Ünite 2: Hikâye (Öykü)',
    icon: '📖',
    color: 'from-amber-600 to-yellow-700',
    subtopics: [
      {
        id: 'hikaye-ozellik',
        title: 'Hikâye Özellikleri ve Türleri',
        content: [
          { type: 'paragraph', text: 'Hikâye; gerçek veya gerçeğe yakın olayların, karakter ve mekân sınırlamasıyla kısa ve yoğun aktarıldığı edebi türdür. Romandan kısadır.' },
          { type: 'heading', text: 'Hikâye Türleri' },
          { type: 'table', headers: ['Tür', 'Temsilcisi', 'Odak'], rows: [
            ['Olay (Maupassant)', 'Ömer Seyfettin', 'Güçlü olay örgüsü, sürpriz son'],
            ['Durum (Çehov)', 'Sait Faik Abasıyanık', 'Duygu, an, kesit, psikoloji'],
            ['Modern Hikâye', 'Bilge Karasu', 'Bilinç akışı, anlam arayışı']
          ]},
          { type: 'important', text: 'Türk Edebiyatında ilk yerli öykü: Ahmet Mithat Efendi - Letâif-i Rivâyât' }
        ]
      },
      {
        id: 'yazim-noktalama',
        title: 'Yazım Kuralları ve Noktalama',
        content: [
          { type: 'heading', text: 'Büyük Harf ve Bitişik/Ayrı Yazım' },
          { type: 'list', items: [
            'Kurum adları büyük yazılır: Türk Dil Kurumu',
            'Ay/Gün isimleri belli bir tarihse büyük: 10 Mayıs Cuma',
            'Mi soru eki daima ayrı: Geldi mi?',
            'ile bağlacı bitişik de yazılabilir: kalemiyle'
          ]},
          { type: 'heading', text: 'Önemli Ses Olayları' },
          { type: 'table', headers: ['Olay', 'Tanım', 'Örnek'], rows: [
            ['Ünlü Düşmesi', 'İkinci hecedeki dar ününün düşmesi', 'ağız -> ağzı'],
            ['Yumuşama', 'Sert ünsüzün yumuşaması (p,ç,t,k -> b,c,d,ğ)', 'kitap -> kitabı'],
            ['Sertleşme (Benzeşme)', 'Sert ünsüzden sonra sert harf gelmesi', 'gitti, yaptı'],
            ['Ünlü Daralması', 'Geniş ünlünün -yor ekiyle daralması', 'de+yor -> diyor']
          ]}
        ]
      },
      {
        id: 'isimler',
        title: 'Dil Bilgisi: İsimler (Adlar)',
        content: [
          { type: 'paragraph', text: 'Varlıkları ve kavramları karşılayan sözcüklerdir.' },
          { type: 'table', headers: ['Hâl (Durum)', 'Eki', 'Örnek'], rows: [
            ['Yalın', 'Ek yok', 'ev'],
            ['Belirtme', '-i, -ı', 'evi'],
            ['Yönelme', '-e, -a', 'eve'],
            ['Bulunma', '-de, -da', 'evde'],
            ['Çıkma', '-den, -dan', 'evden']
          ]}
        ]
      }
    ]
  },
  {
    id: 'unite-3',
    title: 'Ünite 3: Şiir',
    icon: '🎭',
    color: 'from-pink-600 to-rose-700',
    subtopics: [
      {
        id: 'siir-bilgisi',
        title: 'Şiir ve Ölçü',
        content: [
          { type: 'paragraph', text: 'Şiir; estetik, ritm ve ses sanatlarıyla harmanlanmış edebi türdür.' },
          { type: 'heading', text: 'Ölçü Türleri' },
          { type: 'table', headers: ['Ölçü', 'Gelenek', 'Özellik'], rows: [
            ['Hece Ölçüsü', 'Halk Şiiri', 'Hece sayısına dayanır (7, 8, 11\'li)'],
            ['Aruz Ölçüsü', 'Divan Şiiri', 'Hecelerin açık/kapalı (kısa/uzun) olmasına dayanır'],
            ['Serbest Ölçü', 'Modern Şiir', 'Kural yoktur, ritim içseldir.']
          ]}
        ]
      },
      {
        id: 'uyak-redif',
        title: 'Uyak, Redif ve Ses Sanatları',
        content: [
          { type: 'important', text: 'Redif: Dize sonlarındaki aynı anlam ve görevdeki ek ya da sözcük tekrarıdır. Uyak (Kafiye): Kalan ses benzerlikleridir.' },
          { type: 'table', headers: ['Kafiye Türü', 'Açıklama', 'Örnek'], rows: [
            ['Yarım', 'Tek ses benzerliği', 'dağlar - bağlar (g)'],
            ['Tam', 'İki ses benzerliği (son ünlüden itibaren)', 'el - sel'],
            ['Zengin', 'İkiden fazla ses', 'hüzün - süzün'],
            ['Tunç', 'Kısa kelime uzunun içinde kalır', 'gün - bugün'],
            ['Cinaslı', 'Eşsesli (aynı yazılış farklı anlam)', 'al (renk) - al (eylem)']
          ]},
          { type: 'heading', text: 'Ses Sanatları' },
          { type: 'list', items: [
            'Aliterasyon: Ünsüz harf tekrarı (Sarı saman sarı sonbahar - s harfi)',
            'Asonans: Ünlü harf tekrarı',
            'Tekrir (Anafora): Dize başı kelime tekrarı'
          ]}
        ]
      },
      {
        id: 'sifatlar',
        title: 'Dil Bilgisi: Sıfatlar',
        content: [
          { type: 'paragraph', text: 'İsimleri niteleyen veya belirten ön adlardır. Tek başına değil isimle anlam kazanırlar.' },
          { type: 'list', items: [
            'Niteleme Sıfatı: Nasıl? sorusuna cevap (Kırmızı araba)',
            'İşaret Sıfatı: Bu, şu, o ev',
            'Sayı Sıfatı: Üç çocuk, yarım ekmek',
            'Belgisiz Sıfat: Bazı insanlar',
            'Soru Sıfatı: Hangi kitap?'
          ]},
          { type: 'highlight', text: 'Pekiştirme (bembeyaz) ve derecelendirme (en güzel, daha büyük) sıfatların anlamını kuvvetlendirir.' }
        ]
      }
    ]
  },
  {
    id: 'unite-4',
    title: 'Ünite 4: Masal ve Fabl',
    icon: '🦄',
    color: 'from-emerald-600 to-teal-700',
    subtopics: [
      {
        id: 'masal-fabl',
        title: 'Masal ve Fabl Özellikleri',
        content: [
          { type: 'heading', text: 'Masal' },
          { type: 'paragraph', text: 'Olağanüstü kişi ve yerlerin, belirsiz bir zaman içinde anlatıldığı (bir varmış bir yokmuş) eğitici anlatılardır. Anonimdirler.' },
          { type: 'heading', text: 'Fabl' },
          { type: 'paragraph', text: 'Hayvan veya bitkilerin konuşturulup (intak) kişileştirilerek (teşhis) insanlara açık bir ders/nasihat verdiği kısa anlatılardır.' },
          { type: 'table', headers: ['Masal', 'Fabl'], rows: [
            ['İnsan ve evrenüstü (dev, cin)', 'Hayvan ve bitkiler'],
            ['Örtülü ders', 'Açık öğüt (sonda verilir)'],
            ['Anonimdir', 'Yazarı bellidir (La Fontaine, Ezop)']
          ]}
        ]
      },
      {
        id: 'edatlar-baglaclar',
        title: 'Dil Bilgisi: Edat, Bağlaç, Ünlem',
        content: [
          { type: 'highlight', text: 'Edat tek başına anlamsızken, cümleye anlam katar (gibi, için, kadar). Bağlaç ise kelime veya cümleleri bağlar (ve, ama, de).' },
          { type: 'list', items: [
            'Edat Örnekleri: gibi (benzetme), için (amaç/neden), kadar (ölçü/sınır), rağmen',
            'Bağlaç Örnekleri: ve, veya, ama, çünkü, hem...hem, ne...ne, de/da, ki',
            'Ünlem: Eyvah!, Ah!, Hayır!, İmdat! (duygu ve tepki bildirirler)'
          ]}
        ]
      }
    ]
  },
  {
    id: 'unite-5',
    title: 'Ünite 5: Roman',
    icon: '📘',
    color: 'from-blue-600 to-indigo-700',
    subtopics: [
      {
        id: 'roman-yapi',
        title: 'Romanın Yapı Unsurları ve Bakış Açıları',
        content: [
          { type: 'paragraph', text: 'Hikayeye göre çok daha uzun, geniş karakter kadrolu, derinlemesine olay örgüsü taşıyan edebi nesirdir.' },
          { type: 'heading', text: 'Bakış Açıları' },
          { type: 'table', headers: ['Bakış Açısı', 'Özellik', 'Kişi'], rows: [
            ['İlahi (Tanrısal)', 'Karakterin zihninden geçenleri, geleceği bilir.', '3. Şahıs'],
            ['Kahraman', 'Olayları bizzat yaşayan kişi anlatır.', '1. Şahıs (Ben)'],
            ['Gözlemci', 'Kamera gibi sadece gördüklerini anlatır.', '3. Şahıs']
          ]}
        ]
      },
      {
        id: 'roman-turleri',
        title: 'Roman Türleri',
        content: [
          { type: 'list', items: [
            'Tarihsel: Tarık Buğra - Osmancık',
            'Psikolojik: Peyami Safa - Dokuzuncu Hariciye Koğuşu',
            'Sosyal/Köy: Yaşar Kemal - İnce Memed',
            'Biyografik, Fantastik, Macera, Postmodern'
          ]},
          { type: 'heading', text: 'Dil Bilgisi: Zamirler (Adıllar)' },
          { type: 'paragraph', text: 'İsmin yerini tutan sözcüklerdir.' },
          { type: 'table', headers: ['Zamir Türü', 'Örnekler'], rows: [
            ['Kişi Zamiri', 'Ben, sen, o, biz, siz, onlar'],
            ['Dönüşlülük', 'Kendi, kendim'],
            ['İşaret Zamiri', 'Bu, şu, o, bunlar'],
            ['Belgisiz Zamir', 'Biri, kimse, hepsi'],
            ['Soru Zamiri', 'Kim, ne, hangisi']
          ]}
        ]
      }
    ]
  },
  {
    id: 'unite-6',
    title: 'Ünite 6: Tiyatro',
    icon: '🎭',
    color: 'from-red-600 to-rose-700',
    subtopics: [
      {
        id: 'tiyatro-bilesenleri',
        title: 'Tiyatro Kavramları ve Türleri',
        content: [
          { type: 'list', items: [
            'Diyalog: Karşılıklı konuşma',
            'Monolog: Sahnede tek başına konuşma',
            'Tirat: Uzun kesintisiz konuşma',
            'Replik: Kısa cevap/konuşma cümlesi'
          ]},
          { type: 'table', headers: ['Tiyatro Türü', 'Konu / Özellik'], rows: [
            ['Trajedi', 'Soylu kişiler, trajik hatalar, ölümle biter'],
            ['Komedi', 'Sıradan tipler, güldürü ve eleştiri, mutlu son'],
            ['Dram', 'Trajedi ve komedinin birleşimi, gerçekçi'],
            ['Vodvil / Opera', 'Hafif / tamamen müzikli oyunlar']
          ]}
        ]
      },
      {
        id: 'geleneksel-tiyatro',
        title: 'Geleneksel Türk Tiyatrosu',
        content: [
          { type: 'paragraph', text: 'Yazılı metni olmayan, doğaçlamaya dayanan oyunlardır.' },
          { type: 'list', items: [
            'Karagöz: Yansıma ve gölge oyunu. (Karagöz = halk, Hacivat = aydın)',
            'Orta Oyunu: Seyirci ortasında oynanır. Pişekâr ve Kavuklu.',
            'Meddah: Tek kişilik anlatı sanatı.',
            'Kukla'
          ]},
          { type: 'heading', text: 'Dil Bilgisi: Zarflar' },
          { type: 'paragraph', text: 'Fiilleri, sıfatları ve zarfları niteleyen sözcüklerdir. Durum (nasıl?), Zaman (ne zaman?), Yer-Yön (nereye?), Miktar (ne kadar?) zarfları mevcuttur.' }
        ]
      }
    ]
  },
  {
    id: 'unite-7-8-9',
    title: 'Ünite 7, 8 ve 9: Diğer Anlatı Türleri',
    icon: '✉️',
    color: 'from-slate-600 to-gray-700',
    subtopics: [
      {
        id: 'biyografi-mektup',
        title: 'Biyografi, Mektup ve Günlük',
        content: [
          { type: 'table', headers: ['Tür', 'Kimlik', 'Açıklama'], rows: [
            ['Biyografi', '3. Şahıs', 'Başkasının hayatının anlatılması'],
            ['Otobiyografi', '1. Şahıs', 'Kişinin kendi hayatını anlatması'],
            ['Mektup', 'Özel/Resmi', 'Belirli kurallara dayanan yazılı iletişim'],
            ['Dilekçe', 'Resmi', 'Kurumlara istek yazısı (üstbaşlık, imza, tarih şart)'],
            ['Günlük', 'Kişisel', 'Tarih atılarak sıcağı sıcağına yazılan içsel notlar'],
            ['Blog', 'Dijital', 'İnternet üzerinde kronolojik web günlüğü']
          ]}
        ]
      },
      {
        id: 'fiiller',
        title: 'Dil Bilgisi: Fiiller ve Fiilimsiler',
        content: [
          { type: 'paragraph', text: 'Fiiller zaman/kip ve kişi eki alan sözcüklerdir. İki kip grubu vardır: Haber Kipleri (zaman bildirir) ve Dilek Kipleri (şart, emir, istek).' },
          { type: 'heading', text: 'Fiilimsiler' },
          { type: 'list', items: [
            'İsim-Fiil: -mak, -me, -ış (Koşmak güzeldir.)',
            'Sıfat-Fiil: -an, -en, -dığ, -ecek (Gelen misafir, Okuyacak adam.)',
            'Zarf-Fiil: -arak, -ıp, -ken (Koşarak geldi, Uyurken düştü.)'
          ]}
        ]
      }
    ]
  }
];

