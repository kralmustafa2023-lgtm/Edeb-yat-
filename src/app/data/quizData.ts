export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'kolay' | 'orta' | 'zor';
}

export interface QuizTopic {
  id: string;
  title: string;
  icon: string;
  color: string;
  questions: QuizQuestion[];
}

export const QUIZ_TOPICS: QuizTopic[] = [
  {
    id: 'Giriş (Ünite 1)',
    title: 'Ünite 1: Giriş',
    icon: '📚',
    color: 'from-violet-600 to-purple-700',
    questions: [
      {
        id: 'u1-1',
        question: 'Edebiyatın en temel tanımı ve malzemesi aşağıdakilerden hangisinde doğru verilmiştir?',
        options: ['Olayları anlatma sanatı - Kurgu', 'Dil aracılığıyla oluşturulan sanat - Dil', 'Doğayı resmetme sanatı - Renkler', 'Tarihi gerçekleri yansıtma - Belgeler'],
        correct: 1,
        explanation: 'Edebiyat, duygu ve düşüncelerin estetik bir biçimde aktarıldığı, ana malzemesi "dil" olan bir güzel sanat dalıdır.',
        difficulty: 'kolay',
      },
      {
        id: 'u1-2',
        question: 'Aşağıdaki güzel sanatlar eşleştirmelerinden hangisi yanlıştır?',
        options: ['Resim -> Plastik (Görsel)', 'Edebiyat -> Fonetik (İşitsel)', 'Mimari -> Ritmetik (Karma)', 'Müzik -> Fonetik (İşitsel)'],
        correct: 2,
        explanation: 'Mimari plastik (görsel) sanatlar içindedir. Ritmetik/karma sanatlara tiyatro ve sinema örnek verilebilir.',
        difficulty: 'orta',
      },
      {
        id: 'u1-3',
        question: '"Dün akşamki maç çok heyecanlıydı." cümlesinde dil ağırlıklı olarak hangi işlevde kullanılmıştır?',
        options: ['Heyecana bağlı (Duygusal)', 'Göndergesel', 'Alıcıyı harekete geçirme', 'Kanalı kontrol'],
        correct: 0,
        explanation: 'Cümle öznel bir heyecan ve duygu ifade ettiği için heyecana bağlı (duygusal) işlevdedir. Sadece nesnel bilgi verseydi göndergesel olurdu.',
        difficulty: 'zor',
      }
    ],
  },
  {
    id: 'Hikâye (Ünite 2)',
    title: 'Ünite 2: Hikâye',
    icon: '📖',
    color: 'from-amber-600 to-yellow-700',
    questions: [
      {
        id: 'u2-1',
        question: 'Klasik serim, düğüm, çözüm bölümü taşıyan ve temelinde dramatik bir "olay" bulunan hikaye tarzının dünyadaki ve bizdeki en önemli temsilcileri kimlerdir?',
        options: ['Çehov - Sait Faik', 'Maupassant - Ömer Seyfettin', 'Poe - Refik Halit', 'Maupassant - Memduh Şevket'],
        correct: 1,
        explanation: 'Olay hikayesi (vak\'a hikayesi) olarak bilinen bu tarzın dünya edebiyatındaki kurucusu Guy de Maupassant, Türk edebiyatındaki en büyük temsilcisi ise Ömer Seyfettin\'dir.',
        difficulty: 'kolay',
      },
      {
        id: 'u2-2',
        question: 'Aşağıdaki altı çizili sözcüklerin hangisinde ünlü düşmesi (hece düşmesi) yoktur?',
        options: ['Bu işin aslı (asıl-ı) nedir?', 'Gönlüm (gönül-üm) buna razı değil.', 'Şehre (şehir-e) yeni taşındılar.', 'Kazıyı (kazı-yı) hemen durdurdular.'],
        correct: 3,
        explanation: '"Kazıyı" kelimesinin kökü "kazı"dır, ünlü düşmesi yoktur. A, B ve C şıklarında dar ünlülerin düştüğü görülmektedir.',
        difficulty: 'orta',
      },
      {
        id: 'u2-3',
        question: '"Ağaçlar / sonbaharın hüznünü / giyiniyor" cümlesinde geçen isimlerin hâl (durum) ekleri sırasıyla aşağıdakilerin hangisinde doğru verilmiştir?',
        options: ['Yalın, İlgi, Belirtme', 'Belli değil, Belirtme, Yalın', 'Yalın, Yalın, Yönelme', 'Belirtme, İlgi, Bulunma'],
        correct: 0,
        explanation: 'Ağaçlar (yalın hâl, çoğul eki almış), hüznü-n-ü (belirtme hâl eki). Yalın, İlgi, Belirtme düzeni vardır.',
        difficulty: 'zor',
      }
    ],
  },
  {
    id: 'Şiir (Ünite 3)',
    title: 'Ünite 3: Şiir',
    icon: '🎭',
    color: 'from-pink-600 to-rose-700',
    questions: [
      {
        id: 'u3-1',
        question: '"Ağlarım ağlatamam / Hissederim söyleyemem \nDili bağlanmış benim gibi / Ağlayan bir kalbin" \ndizelerindeki kafiye şeması nedir?',
        options: ['düz (aabb)', 'çapraz (abab)', 'sarma (abba)', 'koşma (aaab)'],
        correct: 1,
        explanation: '1. dize (ağlatamam) A, 2. dize (söyleyemem) B, 3. dize (gibi) C, 4. dize (kalbin) D gibi görünse de çapraz ve serbest dizilişler modern şiirde sık görülür.',
        difficulty: 'orta',
      },
      {
        id: 'u3-2',
        question: '"Gül" ve "Bülbül" kelimeleri arasında kurulan kafiyenin türü aşağıdakilerden hangisidir?',
        options: ['Yarım kafiye', 'Tam kafiye', 'Cinaslı kafiye', 'Tunç kafiye'],
        correct: 3,
        explanation: 'Kısa olan kelimenin (gül) uzun olan kelimenin (bülbül) içinde tamamen yer almasına tunç kafiye denir.',
        difficulty: 'kolay',
      },
      {
        id: 'u3-3',
        question: '"Büyük şairler, sessiz gemilere binip gittiler." cümlesinde "sessiz gemi" ifadesi ölümü temsil ettiği halde doğrudan ölüm denilmemiş, ölüme benzetilen gemi kullanılmıştır. Bu söz sanatı nedir?',
        options: ['Tezat', 'İstiare (Eğretileme)', 'Mübalağa', 'Teşhis (Kişileştirme)'],
        correct: 1,
        explanation: 'Benzetmenin ana unsurlarından (benzeyen veya kendisine benzetilen) sadece biri söylenerek yapılan benzetme sanatına istiare denir.',
        difficulty: 'zor',
      }
    ],
  },
  {
    id: 'Masal & Fabl (Ünite 4)',
    title: 'Ünite 4: Masal ve Fabl',
    icon: '🦄',
    color: 'from-emerald-600 to-teal-700',
    questions: [
      {
        id: 'u4-1',
        question: 'Fabl türünün masaldan ayrılan en belirgin özelliği aşağıdakilerden hangisidir?',
        options: ['Sonunda belirgin bir öğüt (ders) vermesi', 'Olağanüstü unsurlar taşıması', 'Anonim olması', 'Tekerlemeyle başlaması'],
        correct: 0,
        explanation: 'Fabl türünün en belirgin özelliği sonunda belirgin, açık bir öğüt ve ahlak dersi taşımasıdır. Fabllar genellikle yazarı bilinen edebi türlerdir.',
        difficulty: 'kolay',
      },
      {
        id: 'u4-2',
        question: 'Masalların yapısında (bölümlerinde) dinleyicinin ilgisini çekmek için uydurulan söz dizilerine (Bir varmış bir yokmuş vb.) ne ad verilir?',
        options: ['Serim', 'Tekerleme (Döşeme)', 'Düğüm', 'Dilek'],
        correct: 1,
        explanation: 'Döşeme bölümündeki kalıplaşmış sözlere tekerleme adı verilir ve masalı dinlemeye hazırlama amacı taşır.',
        difficulty: 'orta',
      },
      {
        id: 'u4-3',
        question: 'Aşağıdaki altı çizili kelimelerden hangisi cümlede edat görevindedir?',
        options: ['Kitabı okudum VE özet çıkardım.', 'Akşam İÇİN hazırlık yaptık.', 'Çalıştı AMA kazanamadı.', 'HEM çalıştı HEM eğlendi.'],
        correct: 1,
        explanation: '"için" sözcüğü cümleye amaç/neden anlamı katan bir edattır. "ve", "ama", "hem...hem" bağlaçtır.',
        difficulty: 'zor',
      }
    ],
  },
  {
    id: 'Roman (Ünite 5)',
    title: 'Ünite 5: Roman',
    icon: '📘',
    color: 'from-blue-600 to-indigo-700',
    questions: [
      {
        id: 'u5-1',
        question: 'Romanda olayı anlatan kişi (anlatıcı), kahramanın zihninden geçenleri, gelecekte olacakları dahi biliyorsa bu bakış açısına ne ad verilir?',
        options: ['Kahraman bakış açısı', 'Gözlemci bakış açısı', 'İlahi (Tanrısal / Hakim) bakış açısı', 'Modern bakış açısı'],
        correct: 2,
        explanation: 'İlahi (Tanrısal/Hakim) bakış açısında anlatıcı, karakterlerin psikolojisinden, geçmişinden ve geleceğinden tamamen haberdardır.',
        difficulty: 'kolay',
      },
      {
        id: 'u5-2',
        question: '"Bu kitap benim hayatımı değiştirdi." cümlesinde ismin yerini tutan ZAMİR aşağıdakilerden hangisidir?',
        options: ['Bu', 'kitap', 'benim', 'hayatımı'],
        correct: 2,
        explanation: '"benim" kişi zamiridir. "Bu" kelimesi kitaptan önce geldiği için işaret sıfatıdır.',
        difficulty: 'orta',
      },
      {
        id: 'u5-3',
        question: 'Türk edebiyatında ilk edebi roman olarak kabul edilen "İntibah" eserinin yazarı kimdir?',
        options: ['Şemsettin Sami', 'Namık Kemal', 'Ahmet Mithat Efendi', 'Halit Ziya Uşaklıgil'],
        correct: 1,
        explanation: '"İntibah", Namık Kemal tarafından yazılan ve Türk edebiyatının ilk edebi romanı kabul edilen eserdir. Şemsettin Sami ilk yerli romanı yazmıştır.',
        difficulty: 'zor',
      }
    ],
  },
  {
    id: 'Tiyatro (Ünite 6)',
    title: 'Ünite 6: Tiyatro',
    icon: '🎭',
    color: 'from-orange-500 to-red-600',
    questions: [
      {
        id: 'u6-1',
        question: 'Geleneksel Türk Tiyatrosu\'nun iki temel karakteri Karagöz ve Hacivat\'ta, "Hacivat" tipi kimi temsil eder?',
        options: ['Halkı / cahil kesimi', 'Saray dalkavuklarını', 'Medrese eğitimi görmüş aydın kesimi', 'Köy ağasını'],
        correct: 2,
        explanation: 'Hacivat yarı aydın, medrese eğitimi görmüş tipleri temsil ederken; Karagöz içinden geldiği gibi konuşan saf halkı temsil eder.',
        difficulty: 'kolay',
      },
      {
        id: 'u6-2',
        question: 'Sahnede karakterin kendi kendine yaptığı uzun ve içsel konuşmalara tiyatro terimi olarak ne ad verilir?',
        options: ['Replik', 'Diyalog', 'Tirat', 'Monolog'],
        correct: 3,
        explanation: 'Monolog, bir tiyatro eserinde kişinin kendi kendine yaptığı, dışa vurduğu tek taraflı konuşmadır.',
        difficulty: 'orta',
      },
      {
        id: 'u6-3',
        question: 'Aşağıdaki cümlelerin hangisinde durum zarfı yoktur?',
        options: ['Soruları hızlıca çözdü.', 'Çocuk sessizce ağlıyordu.', 'Yarın sabah erken yola çıkacağız.', 'Bana sert sert baktı.'],
        correct: 2,
        explanation: '"Yarın sabah" zaman zarfı, "erken" zaman zarfıdır. Durum (nasıl yapıldı?) zarfı kullanılmamıştır.',
        difficulty: 'zor',
      }
    ],
  },
  {
    id: 'Biyografi/Otobiyografi (Ünite 7)',
    title: 'Ünite 7: Biyo / Otobiyo',
    icon: '📝',
    color: 'from-teal-600 to-cyan-700',
    questions: [
      {
        id: 'u7-1',
        question: 'Bir kişinin kendi hayat hikayesini yansıttığı esere ne ad verilir?',
        options: ['Biyografi', 'Otobiyografi', 'Monografi', 'Tutanak'],
        correct: 1,
        explanation: 'Kişinin kendi hayatını anlattığı türe otobiyografi (özyaşamöyküsü) denir.',
        difficulty: 'kolay',
      },
      {
        id: 'u7-2',
        question: '"Okuyanlar bu kitabı sevdi." cümlesindeki "Okuyanlar" sözcüğü için aşağıdakilerden hangisi doğrudur?',
        options: ['İsim-Fiil', 'Sıfat-Fiil (Adlaşmış)', 'Zarf-Fiil', 'Çekimli Fiil'],
        correct: 1,
        explanation: '"Okuyan (insanlar)" şeklindeki sıfat-fiil, önündeki isim düşüp çoğul eki aldığı için adlaşmış sıfat-fiil olmuştur.',
        difficulty: 'orta',
      },
      {
        id: 'u7-3',
        question: 'Cevat Şakir Kabaağaçlı, deniz ve Bodrum hikayeleri ile tanınır. Edebiyatımızdaki lakabı nedir?',
        options: ['Halikarnas Balıkçısı', 'Kaptan', 'Dalgıç Ağa', 'Ege Şairi'],
        correct: 0,
        explanation: 'Cevat Şakir, sürgün gittiği Bodrum\'un (Halikarnassos) aşığı olmuş ve "Halikarnas Balıkçısı" lakabını kullanmıştır.',
        difficulty: 'zor',
      }
    ],
  },
  {
    id: 'Mektup/E-Posta (Ünite 8)',
    title: 'Ünite 8: Mektup ve E-Posta',
    icon: '📨',
    color: 'from-sky-500 to-blue-600',
    questions: [
      {
        id: 'u8-1',
        question: 'Dilekçelerde sol alt köşeye genellikle hangi bilgi yazılır?',
        options: ['Yetkili makamın adı', 'İmza', 'İletişim/Adres bilgileri', 'Tarih'],
        correct: 2,
        explanation: 'Dilekçede tarih ve imza kural olarak sağ alta yazılır. Sol alta ise ad-soyad tam adresi ve iletişim bilgileri yazılır.',
        difficulty: 'kolay',
      },
      {
        id: 'u8-2',
        question: 'Edebi şahsiyetlerin kendi aralarındaki yazışmalarını içeren ve sanat, edebiyat konularını tartışan mektuplara ne denir?',
        options: ['Özel mektup', 'Edebi mektup', 'Resmi mektup', 'Açık mektup'],
        correct: 1,
        explanation: 'Sanatçıların ve aydınların fikir alışverişinde bulundukları belgeler "Edebi Mektup" olarak adlandırılır.',
        difficulty: 'orta',
      },
      {
        id: 'u8-3',
        question: 'Divan edebiyatında önemli şairlerin mektuplarının (süslü nesirlerinin) toplandığı defter/kitap türüne ne ad verilir?',
        options: ['Münşeat', 'Tezkire', 'Divançe', 'Siyasetname'],
        correct: 0,
        explanation: 'Münşeat, divan edebiyatında mektupların ve resmi yazışmaların (inşa) toplandığı eserlerin genel adıdır.',
        difficulty: 'zor',
      }
    ],
  },
  {
    id: 'Günlük/Blog (Ünite 9)',
    title: 'Ünite 9: Günlük ve Blog',
    icon: '📅',
    color: 'from-slate-600 to-gray-800',
    questions: [
      {
        id: 'u9-1',
        question: 'Günlük (günce) türünün anı (hatıra) türünden en temel farkı nedir?',
        options: ['Günlüklerin ünlü kişilere ait olması', 'Günlüğün yaşanırken tarih atılarak günü gününe yazılması', 'Günlüğün sadece birinci şahıs ağzından yazılması', 'Anıların edebi değer taşımaması'],
        correct: 1,
        explanation: 'Anılar yıllar sonra hatırlanarak geçmişe yönelik yazılırken, günlükler yaşandığı anda, günü gününe ve tarih tutularak yazılır.',
        difficulty: 'kolay',
      },
      {
        id: 'u9-2',
        question: 'Türk edebiyatında "Günce" terimini isim olarak yaygınlaştıran ve "Günlük" türünün modern anlamdaki önemli ustası kimdir?',
        options: ['Nurullah Ataç', 'Sait Faik', 'Ahmet Hamdi Tanpınar', 'Halit Ziya Uşaklıgil'],
        correct: 0,
        explanation: 'Türk edebiyatında günlük kelimesi yerine "Günce" adını kullanan ve bu türü denemeleriyle bağdaştıran en önemli yazarımız Nurullah Ataç\'tır.',
        difficulty: 'orta',
      },
      {
        id: 'u9-3',
        question: '"Blog" kelimesinin etimolojik kökeni (geldiği yer) hangi kelimelerin birleşimidir?',
        options: ['Basic Log', 'Web Log', 'Binary Log', 'Broadcast Log'],
        correct: 1,
        explanation: '"Blog" kelimesi İngilizce "Web Log" (Ağ günlüğü) kavramının zamanla kısalarak tek kelime haline gelmiş halidir.',
        difficulty: 'zor',
      }
    ],
  }
];

