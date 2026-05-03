export type AnalysisTag = 'redif' | 'kafiye' | 'olcu' | 'nazimBirimi' | 'edebiSanat' | 'tema' | 'konu';

export interface AnnotatedWord {
  text: string;
  tags: AnalysisTag[];
  tooltip?: string;
  attach?: boolean;
}

export interface PoemStanza {
  lines: AnnotatedWord[][];
}

export interface AnalysisDetail {
  type: AnalysisTag;
  title: string;
  description: string;
  count: number;
  color: string;
  bgColor: string;
  highlight: string;
}

export interface Poem {
  id: string;
  title: string;
  stanzas: PoemStanza[];
  analysisDetails: Record<AnalysisTag, { description: string; count: number }>;
  form: string;
  period: string;
  bio: string;
}

export interface Poet {
  id: string;
  name: string;
  years: string;
  period: string;
  periodCode: string;
  movement: string;
  bio: string;
  mainPoem: Poem;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  emoji: string;
  image: string;
  tags: string[];
  facts: string[];
}

export const ANALYSIS_META: Record<AnalysisTag, { title: string; color: string; bgColor: string; highlight: string; border: string; darkText: string }> = {
  redif: {
    title: 'Redif',
    color: 'text-amber-800',
    bgColor: 'bg-amber-400',
    highlight: 'bg-amber-300/60 text-amber-900 rounded px-0.5',
    border: 'border-amber-400',
    darkText: 'text-amber-300',
  },
  kafiye: {
    title: 'Kafiye',
    color: 'text-sky-800',
    bgColor: 'bg-sky-400',
    highlight: 'bg-sky-300/60 text-sky-900 rounded px-0.5',
    border: 'border-sky-400',
    darkText: 'text-sky-300',
  },
  olcu: {
    title: 'Ölçü / Ahenk',
    color: 'text-rose-800',
    bgColor: 'bg-rose-400',
    highlight: 'bg-rose-300/60 text-rose-900 rounded px-0.5',
    border: 'border-rose-400',
    darkText: 'text-rose-300',
  },
  nazimBirimi: {
    title: 'Nazım Birimi',
    color: 'text-violet-800',
    bgColor: 'bg-violet-400',
    highlight: 'bg-violet-300/60 text-violet-900 rounded px-0.5',
    border: 'border-violet-400',
    darkText: 'text-violet-300',
  },
  edebiSanat: {
    title: 'Edebi Sanatlar',
    color: 'text-emerald-800',
    bgColor: 'bg-emerald-400',
    highlight: 'bg-emerald-300/60 text-emerald-900 rounded px-0.5',
    border: 'border-emerald-400',
    darkText: 'text-emerald-300',
  },
  tema: {
    title: 'Tema',
    color: 'text-orange-800',
    bgColor: 'bg-orange-400',
    highlight: 'bg-orange-300/60 text-orange-900 rounded px-0.5',
    border: 'border-orange-400',
    darkText: 'text-orange-300',
  },
  konu: {
    title: 'Konu',
    color: 'text-pink-800',
    bgColor: 'bg-pink-400',
    highlight: 'bg-pink-300/60 text-pink-900 rounded px-0.5',
    border: 'border-pink-400',
    darkText: 'text-pink-300',
  },
};

// Helper: create word with no tags
const w = (text: string): AnnotatedWord => ({ text, tags: [] });
// Helper: create word with tags
const wt = (text: string, tags: AnalysisTag[], tooltip?: string): AnnotatedWord => ({ text, tags, tooltip });
// Helper: create word that attaches to the next word (no margin)
const a = (text: string): AnnotatedWord => ({ text, tags: [], attach: true });
const at = (text: string, tags: AnalysisTag[], tooltip?: string): AnnotatedWord => ({ text, tags, tooltip, attach: true });

// ─────────────────────────────────────────────────────────────────────────────
export const POETS: Poet[] = [
  {
    id: 'yahya-kemal',
    name: 'Yahya Kemal Beyatlı',
    years: '1884 – 1958',
    period: 'Milli Edebiyat',
    periodCode: 'milli',
    movement: 'Neo-Klasikçilik',
    bio: 'Cumhuriyet dönemi Türk edebiyatının en önemli şairlerinden biri olup, Üsküp doğumludur. Divan şiiri geleneğini Fransız şiiriyle harmanlayarak Neo-Klasikçilik akımını temsil etmiştir. Paris\'te öğrenim gördüğü yıllarda Bergson felsefesinden etkilenmiştir. Şiirlerinde Osmanlı tarihi, İstanbul sevgisi ve musiki ön plandadır. Aruzu Türkçeye en başarılı uygulayan şairlerden biri kabul edilir.',
    mainPoem: {
      id: 'yahya-kemal-poem',
      title: 'Sessiz Gemi',
      form: 'Mesnevi',
      period: 'Milli Edebiyat',
      bio: 'Ölümün bir gemi yolculuğuna benzetilerek anlatılması ve geride kalanların üzüntüsü.',
       stanzas: [
        {
          lines: [
            [w('Artık'), w('demir'), w('almak'), w('günü'), w('gelmişse'), wt('zamandan,', ['kafiye', 'redif'], 'Kafiye: -man (Zengin Kafiye) / Redif: -dan (ayrılma hal eki)')],
            [w('Meçhule'), w('giden'), w('bir'), w('gemi'), w('kalkar'), w('bu'), wt('limandan.', ['kafiye', 'redif'], 'Kafiye: -man (Zengin Kafiye) / Redif: -dan (ayrılma hal eki)')]
          ]
        },
        {
          lines: [
            [w('Hiç'), w('yolcusu'), w('yokmuş'), w('gibi'), w('sessizce'), w('alır'), wt('yol;', ['kafiye'], 'Kafiye: -ol (Tam Kafiye)')],
            [w('Sallanmaz'), w('o'), w('kalkışta'), w('ne'), w('mendil'), w('ne'), w('de'), w('bir'), wt('kol.', ['kafiye'], 'Kafiye: -ol (Tam Kafiye)')]
          ]
        },
        {
          lines: [
            [w('Rıhtımda'), w('kalanlar'), w('bu'), w('seyahatten'), wt('elemli,', ['kafiye'], 'Kafiye: -emli')],
            [w('Günlerce'), w('siyah'), w('ufka'), w('bakar'), w('gözleri'), wt('nemli.', ['kafiye'], 'Kafiye: -emli')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: '1. beyit, 1. ve 2. satır, \'-dan\' ekleri (ayrılma hal eki) rediftir.', count: 2 },
        kafiye: { description: '1. beyit: \'zaman\' ve \'liman\' kelimelerindeki \'-man\' sesleri zengin kafiyedir. 2. beyit: \'yol\' ve \'kol\' kelimelerindeki \'-ol\' sesleri tam kafiyedir.', count: 6 },
        olcu: { description: 'Aruz ölçüsü (Mef\'ûlü Mefâîlü Mefâîlü Feûlün). Aruz ölçüsü, kafiye ve rediflerle ahenk sağlanmıştır.', count: 6 },
        nazimBirimi: { description: 'Beyit', count: 3 },
        edebiSanat: { description: 'İstiare (Gemi tabuta, liman dünyadan ayrılış noktasına benzetilmiştir), Teşhis (Gemiye yolcusu yokmuş gibi davranma özelliği verilmiştir).', count: 2 },
        tema: { description: 'Ölüm ve ebediyete intikal.', count: 0 },
        konu: { description: 'Ölümün bir gemi yolculuğuna benzetilerek anlatılması ve geride kalanların üzüntüsü.', count: 0 }
      }
    },
    color: '#059669',
    gradientFrom: 'from-emerald-700',
    gradientTo: 'to-green-900',
    emoji: '⛵',
    image: '/poets/Yahya Kemal Beyatlı.webp',
    tags: ['Sone', 'Neo-Klasikçilik', 'İstanbul Şiirleri'],
    facts: [
      'Şiirlerini ancak mükemmel hale gelince yayımlamıştır; kusursuzluk anlayışıyla bilinir.',
      'Paris\'te Henri Bergson\'un felsefesinden derinden etkilenmiştir.',
      'Diplomat olarak çeşitli ülkelerde büyükelçilik yapmıştır.',
      '"Aziz İstanbul" adlı nesir eseri İstanbul sevgisinin simgesidir.',
      '"Kendi Gök Kubbemiz" ve "Eski Şiirin Rüzgârıyle" en bilinen şiir kitaplarıdır.',
      'Üsküp doğumlu olup, İstanbul\'u "ruhunun şehri" olarak görmüştür.',
      '"Eğil Dağlar" adlı eseri Milli Mücadele\'yi anlatan önemli bir düzyazıdır.',
    ],
  },
  {
    id: 'cahit-sitki',
    name: 'Cahit Sıtkı Tarancı',
    years: '1910 – 1956',
    period: 'Cumhuriyet Dönemi',
    periodCode: 'cumhuriyet',
    movement: 'Cumhuriyet Dönemi – Bireyci Şiir',
    bio: 'Cumhuriyet dönemi Türk şiirinin en lirik seslerinden biridir. Şiirlerinde ölüm korkusu, yaşama sevinci, çocukluk özlemi ve aşk temalarını işlemiştir. "Otuz Beş Yaş" şiiriyle özdeşleşmiş olup, bu şiirde Dante\'nin İlahi Komedya\'sındaki "ömrün ortası" imgesiyle kendini bütünleştirmiştir. Fransa\'nın Dijon şehrinde eğitim görmüş, Fransız edebiyatından derinden etkilenmiştir.',
    mainPoem: {
      id: 'cahit-sitki-poem',
      title: 'Otuz Beş Yaş',
      form: 'Gazel',
      period: 'Cumhuriyet Dönemi',
      bio: 'Şair, otuz beş yaşında hayatın ortasında olduğunu, Dante\'nin Inferno\'suna gönderme yaparak anlatır.',
      stanzas: [
        {
          lines: [
            [w('Yaş'), w('otuz'), w('beş!'), w('yolun'), w('yarısı'), wt('eder.', ['kafiye', 'redif'], 'Kafiye: \'ed\' sesleri tam kafiyedir / Redif: -er (geniş zaman eki)')],
            [w('Dante'), w('gibi'), w('ortasındayız'), wt('ömrün.', ['kafiye'], 'Kafiye: -ün (b kafiyesi)')],
            [w('Delikanlı'), w('çağımızdaki'), wt('cevher,', ['kafiye'], 'Kafiye: -er (a kafiyesi)')],
            [w('Yalvarmak,'), w('yakarmak'), w('nafile'), wt('bugün,', ['kafiye'], 'Kafiye: -ün (b kafiyesi)')],
            [w('Gözünün'), w('yaşına'), w('bakmadan'), wt('gider.', ['kafiye', 'redif'], 'Kafiye: \'ed\' sesleri tam kafiyedir / Redif: -er (geniş zaman eki)')]
          ]
        },
        {
          lines: [
            [w('Şakaklarıma'), w('kar'), w('mı'), w('yağdı'), w('ne'), wt('var?', ['kafiye'], 'Kafiye: -ar (a kafiyesi)')],
            [w('Benim'), w('mi'), w('Allahım'), w('bu'), w('çizgili'), wt('yüz?', ['kafiye'], 'Kafiye: -üz (b kafiyesi)')],
            [w('Ya'), w('gözler'), w('altındaki'), w('mor'), wt('halkalar?', ['kafiye'], 'Kafiye: -ar (a kafiyesi)')],
            [w('Neden'), w('böyle'), w('düşman'), wt('görünürsünüz,', ['kafiye'], 'Kafiye: -üz (b kafiyesi)')],
            [w('Yıllar'), w('yılı'), w('dost'), w('bildiğim'), wt('aynalar?', ['kafiye'], 'Kafiye: -ar (a kafiyesi)')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: '1. bent, 1. ve 5. satır, \'-er\' ekleri (geniş zaman eki) rediftir.', count: 2 },
        kafiye: { description: '1. bent: \'yarısı\' ve \'cevher\' (kafiye düzeni a-b-a-b-a şeklindedir). \'yarısı-eder\' ve \'gider\' kısmında \'ed\' sesleri tam kafiyedir.', count: 10 },
        olcu: { description: '11\'li Hece ölçüsü. Hece ölçüsü, duraklar ve ses tekrarlarıyla ahenk sağlanmıştır.', count: 10 },
        nazimBirimi: { description: 'Beşlik (Bent)', count: 2 },
        edebiSanat: { description: 'Telmih (Dante\'ye atıf), İstifham (Soru sorma sanatı: \'Şakaklarıma kar mı yağdı?\'), Teşbih (Şakaktaki beyaz saçların kara benzetilmesi).', count: 3 },
        tema: { description: 'Zamanın geçişi ve ölüm korkusu.', count: 0 },
        konu: { description: 'İnsanın yaşlandığını fark etmesi ve geçmişe duyulan özlem.', count: 0 }
      }
    },
    color: '#db2777',
    gradientFrom: 'from-pink-700',
    gradientTo: 'to-rose-900',
    emoji: '⏳',
    image: '/poets/Cahit Sıtkı Tarancı.jpg',
    tags: ['Hece Ölçüsü', 'Lirik Şiir', 'Ölüm Teması', 'Varoluşçuluk'],
    facts: [
      '"Otuz Beş Yaş" Türk edebiyatının en çok sevilen ve en çok ezberlenen şiirlerinden biridir.',
      'Dante\'nin İlahi Komedya\'sındaki "ömrün ortası" imgesiyle kendini özdeşleştirmiştir.',
      'Fransa\'nın Dijon şehrinde öğrenim görmüş, Fransız edebiyatından derinden etkilenmiştir.',
      'Şiir kitapları: "Ömrümde Sükût", "Otuz Beş Yaş", "Düşten Güzel" ve "Sonrası".',
      'Yakın dostu Ziya Osman Saba\'ya yazdığı mektuplar "Ziya\'ya Mektuplar" adıyla yayımlanmıştır.',
      'CHP Şiir Armağanı\'nı "Otuz Beş Yaş" kitabıyla kazanmıştır.',
    ],
  },
  {
    id: 'orhan-veli',
    name: 'Orhan Veli Kanık',
    years: '1914 – 1950',
    period: 'Cumhuriyet Dönemi',
    periodCode: 'cumhuriyet',
    movement: 'Garip Akımı (I. Yeni)',
    bio: 'Garip Akımı\'nın (I. Yeni) kurucusudur. Oktay Rifat Horozcu ve Melih Cevdet Anday ile birlikte 1941\'de çıkardığı "Garip" manifestosuyla Türk şiirini köklü biçimde değiştirmiştir. Şiirde ölçü, uyak ve sanatlı dili reddederek sokaktaki insanın dilini ve günlük yaşamı şiire taşımıştır. Kısa ömrüne rağmen Türk şiirinin seyrini değiştiren devrimci bir şairdir.',
    mainPoem: {
      id: 'orhan-veli-poem',
      title: 'İstanbul\'u Dinliyorum',
      form: 'Serbest Nazım',
      period: 'Cumhuriyet Dönemi',
      bio: 'Şair, gözleri kapalı bir şekilde İstanbul\'un seslerini dinler.',
      stanzas: [
        {
          lines: [
            [wt("İstanbul'u dinliyorum, gözlerim kapalı;", ['redif'], "Redif: Nakarat (Dize Tekrarı)")],
            [w('Önce'), w('hafiften'), w('bir'), w('rüzgar'), w('esiyor;')],
            [w('Yavaş'), w('yavaş'), w('sallanıyor')],
            [w('Yapraklar,'), w('ağaçlarda;')],
            [w('Sucuların'), w('hiç'), w('dinmeyen'), w('çıngırakları;')],
            [wt("İstanbul'u dinliyorum, gözlerim kapalı.", ['redif'], "Redif: Nakarat (Dize Tekrarı)")]
          ]
        },
        {
          lines: [
            [wt("İstanbul'u dinliyorum, gözlerim kapalı;", ['redif'], "Redif: Nakarat (Dize Tekrarı)")],
            [w('Kuşlar'), w('geçiyor,'), w('derken;')],
            [w('Yükseklerden,'), w('sürü'), w('sürü,'), w('çığlık'), w('çığlık.')],
            [w('Ağlar'), w('çekiliyor'), w('dalyanlarda;')],
            [w('Bir'), w('kadının'), w('suya'), w('değiyor'), w('ayakları;')],
            [wt("İstanbul'u dinliyorum, gözlerim kapalı.", ['redif'], "Redif: Nakarat (Dize Tekrarı)")]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: 'Şiir serbest olduğu için geleneksel rediften ziyade dize tekrarları ön plandadır. "İstanbul\'u dinliyorum, gözlerim kapalı" dizesi nakarat olarak ahengi sağlar.', count: 4 },
        kafiye: { description: 'Belirli bir kafiye şeması yoktur, serbest kafiye kullanılmıştır.', count: 0 },
        olcu: { description: 'Serbest ölçü. Kelime ve dize tekrarları (nakaratlar) ile ahenk sağlanmıştır.', count: 12 },
        nazimBirimi: { description: 'Bent (Serbest bölükler)', count: 2 },
        edebiSanat: { description: 'İmgelem (Görsel ve işitsel betimlemeler), Tenasüp (İstanbul ile ilgili kavramların bir arada kullanılması).', count: 2 },
        tema: { description: 'İstanbul sevgisi ve şehir atmosferi.', count: 0 },
        konu: { description: 'Şairin gözlerini kapatarak İstanbul\'un sesleri üzerinden şehri zihninde canlandırması.', count: 0 }
      }
    },
    color: '#0284c7',
    gradientFrom: 'from-sky-700',
    gradientTo: 'to-blue-900',
    emoji: '🌊',
    image: '/poets/Orhan Veli Kanık.jpg',
    tags: ['Garip Akımı', 'Serbest Şiir', 'İstanbul', 'Modernizm'],
    facts: [
      '1941\'de yayımlanan "Garip" manifestosuyla şiirde ölçü ve kafiyeye karşı çıkmıştır.',
      'Kısa yaşamına rağmen Türk şiirinin seyrini köklü biçimde değiştirmiştir.',
      '"Kitabe-i Seng-i Mezar" şiiri mizahlı şiirin en güzel örneğidir.',
      '36 yaşında bir kaza sonucu (açık bir çukura düşerek) hayatını kaybetmiştir.',
      'Şiir kitapları: "Garip", "Vazgeçemediğim", "Destan Gibi", "Yenisi" ve "Karşı".',
      'La Fontaine\'den çeviriler de yapmış, Batı edebiyatını yakından takip etmiştir.',
      'Günlük dildeki sadeliği şiire taşıyarak "sokak şiiri" anlayışını başlatmıştır.',
    ],
  }
];

export const getPeriodLabel = (code: string): string => {
  const map: Record<string, string> = {
    'tekke': 'Tekke Edebiyatı',
    'divan': 'Divan Edebiyatı',
    'halk': 'Halk Edebiyatı',
    'tanzimat': 'Tanzimat',
    'servet-i-funun': 'Servet-i Fünun',
    'milli': 'Milli Edebiyat',
    'cumhuriyet': 'Cumhuriyet Dönemi',
  };
  return map[code] || code;
};

export const PERIOD_ORDER = ['tekke', 'divan', 'halk', 'tanzimat', 'servet-i-funun', 'milli', 'cumhuriyet'];
