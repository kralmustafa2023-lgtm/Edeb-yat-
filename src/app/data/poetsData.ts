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

    id: 'yunus-emre',

    name: 'Yunus Emre',

    years: '1240 ÔÇô 1321',

    period: 'Tekke Edebiyatı',

    periodCode: 'tekke',

    movement: 'İslamiyet Dönemi ÔÇô Tasavvuf Şiiri',

    bio: '13. yüzyılın ikinci yarısı ile 14. yüzyılın başlarında yaşamış büyük Türk mutasavvıf ve halk şairidir. Mürşidi Taptuk Emre\'nin dergâhında yetişmiş, ilahi aşkı, insan sevgisini ve hoşgörüyü sade bir Türkçeyle dile getirmiştir. Kendisini "ümmi" olarak tanımlasa da şiirlerindeki derin bilgi birikimi medrese eğitimi aldığını düşündürmektedir. İki ana eseri vardır: şiirlerinin toplandığı "Divan" ve didaktik bir mesnevi olan "Risaletü\'n-Nushiyye".',

    mainPoem: {
      id: 'yunus-emre-poem',
      title: 'Ben Yürürüm Yane Yane',
      form: 'İlahi',
      period: 'Tekke Edebiyatı',
      bio: 'Şair, ilahi aşkın etkisiyle divane olmuş, kendini tanıyamaz hale gelmiştir. Şeyhe yalvarır, Mecnun gibi yârini arar. Aşkın insanı nasıl değiştirdiğini anlatır.',
      stanzas: [
        {
          lines: [
            [w('Ben'), w('yürürüm'), wt('yane', ['kafiye'], 'Kafiye: -ane'), wt('yane', ['kafiye'], 'Kafiye: -ane')],
            [w('Aşk'), w('boyadı'), w('beni'), wt('kane', ['kafiye'], 'Kafiye: -ane')],
            [w('Ne'), w('akîlem'), w('ne'), wt('divane', ['kafiye'], 'Kafiye: -ane')],
            [wt('Gel', ['redif'], 'Redif: Her bendin son mısrası'), wt('gör', ['redif'], 'Redif'), wt('beni', ['redif'], 'Redif'), wt('aşk', ['redif'], 'Redif'), wt('neyledi', ['redif'], 'Redif: 7 kez tekrarlanır')]
          ]
        },
        {
          lines: [
            [w('Gah'), w('eserim'), w('yeller'), wt('gibi', ['kafiye'], 'Kafiye: -gibi')],
            [w('Gah'), w('coşarım'), w('seller'), wt('gibi', ['kafiye'], 'Kafiye: -gibi')],
            [w('Gah'), w('tozarım'), w('yollar'), wt('gibi', ['kafiye'], 'Kafiye: -gibi')],
            [wt('Gel', ['redif'], 'Redif'), wt('gör', ['redif'], 'Redif'), wt('beni', ['redif'], 'Redif'), wt('aşk', ['redif'], 'Redif'), wt('neyledi', ['redif'], 'Redif')]
          ]
        },
        {
          lines: [
            [w('Ben'), w('Yunus-u'), wt('biçareyim', ['kafiye'], 'Kafiye: -eyim')],
            [w('Aşk'), w('elinden'), wt('avareyim', ['kafiye'], 'Kafiye: -eyim')],
            [w('Baştan'), w('ayağa'), wt('yâreyim', ['kafiye'], 'Kafiye: -eyim')],
            [wt('Gel', ['redif'], 'Redif'), wt('gör', ['redif'], 'Redif'), wt('beni', ['redif'], 'Redif'), wt('aşk', ['redif'], 'Redif'), wt('neyledi', ['redif'], 'Redif')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: '"Gel gör beni aşk neyledi" dizesi 7 kez tekrarlanır. Her bendin son mısrasını oluşturur.', count: 28 },
        kafiye: { description: 'aaab/cccb/dddb şeklinde düz kafiye. Yarım, tam ve zengin kafiyeler mevcuttur. yane-kane-divane, gibi-gibi-gibi, biçareyim-avareyim-yâreyim.', count: 9 },
        olcu: { description: '8\'li hece ölçüsü (4+4). Hece ölçüsünün en yaygın kalıplarından biridir.', count: 12 },
        nazimBirimi: { description: 'Dörtlük (Bent). Her bent 4 mısradan oluşur. Toplam 7 bent (28 mısra).', count: 7 },
        edebiSanat: { description: 'Tasavvuf dili, ilahi aşk imgesi.', count: 0 },
        tema: { description: 'Aşk (İlahi aşk / aşk-ı hakiki). Allah sevgisi ve bu sevginin insanı dönüştürmesi.', count: 0 },
        konu: { description: 'Şair, ilahi aşkın etkisiyle divane olmuş, kendini tanıyamaz hale gelmiştir. Şeyhe yalvarır, Mecnun gibi yârini arar.', count: 0 }
      }
    },

    color: '#10b981',

    gradientFrom: 'from-emerald-700',

    gradientTo: 'to-teal-900',

    emoji: '­şî┐',

    image: '/poets/Yunus Emre.jpg',

    tags: ['İlahi', 'Tasavvuf', 'Hece Ölçüsü', 'Dörtlük'],

    facts: [

      'Anadolu\'da Türkçe şiirin öncüsü kabul edilir; Türk dilinin gelişmesine büyük katkı sağlamıştır.',

      'Şiirlerinde hem hece hem aruz ölçüsü kullanmıştır.',

      'UNESCO, 1991 yılını "Uluslararası Yunus Emre Yılı", 2021\'i ise vefatının 700. yılı olarak ilan etmiştir.',

      'Anadolu\'nun birçok farklı yerinde Yunus Emre\'ye atfedilen makam ve mezarlar bulunmaktadır.',

      '"Risaletü\'n-Nushiyye" (Öğütler Kitabı) adlı yaklaşık 600 beyitlik didaktik mesnevisi vardır.',

      'Mevlana ile aynı dönemde yaşamış, ancak Mevlana Farsça yazarken Yunus Emre Türkçeyi tercih etmiştir.',

    ],

  },
  {

    id: 'fuzuli',

    name: 'Fuzuli',

    years: '1483 ÔÇô 1556',

    period: 'Divan Edebiyatı',

    periodCode: 'divan',

    movement: 'Klasik Divan Şiiri',

    bio: '16. yüzyıl Divan edebiyatının en büyük lirik şairidir. Asıl adı Mehmed bin Süleyman olup, Türkçe, Arapça ve Farsça olmak üzere üç dilde divan sahibi nadir şairlerdendir. Ömrünün büyük kısmını Kerbela, Necef ve Bağdat civarında geçirmiştir. "İlimsiz şiir temelsiz duvar gibidir" anlayışını benimseyerek şiiri derin bilgiyle harmanlamıştır. Beşeri aşkı ilahi aşka dönüştüren "Leyla vü Mecnun" mesnevisi Türk edebiyatının şaheserleri arasındadır.',

    mainPoem: {
      id: 'fuzuli-poem',
      title: 'Gazel (Aziz İstanbul)',
      form: 'Gazel',
      period: 'Divan Edebiyatı',
      bio: 'İstanbul\'un eşsizliği, cennete benzerliği, İslam dünyası için önemi ve padişahın saadet gölgesi altındaki ihtişamı anlatılır.',
      stanzas: [
        {
          lines: [
            [w('Sana'), w('dün'), w('bir'), w('tepeden'), w('baktım'), w('aziz'), wt('İstanbul!', ['kafiye'], 'Kafiye: -ul')],
            [w('Görmedim'), w('gezmediğim,'), w('sevmediğim'), w('hiçbir'), wt('yer.', ['kafiye'], 'Kafiye: -er')]
          ]
        },
        {
          lines: [
            [w('Ömrüm'), w('oldukça,'), w('gönül'), w('tahtıma'), w('keyfince'), wt('kurul!', ['kafiye'], 'Kafiye: -ul')],
            [w('Sade'), w('bir'), w('semtini'), w('sevmek'), w('bile'), w('bir'), w('ömre'), wt('değer.', ['kafiye'], 'Kafiye: -er')]
          ]
        },
        {
          lines: [
            [w('Nice'), w('revnaklı'), w('şehirler'), w('görülür'), wt('dünyada,', ['kafiye'], 'Kafiye: -da')],
            [w('Lakin'), w('efsunlu'), w('güzellikleri'), w('sensin'), wt('yaratan.', ['kafiye'], 'Kafiye: -an')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: 'Redif yoktur. Gazel nazım şeklinde redif kullanılmaz, sadece kafiye vardır.', count: 0 },
        kafiye: { description: 'Düz kafiye (aa / bb / cc / dd). 1-2. mısra (dir-dir), 3-4. mısra (olur-olur). 5-6. mısra (yok-tok), 7-8. mısra (olur-olur) kafiyelidir.', count: 6 },
        olcu: { description: 'Aruz ölçüsü - Fâilâtün / Fâilâtün / Fâilâtün / Fâilün kalıbı. Her mısra 4 vezinli aruz.', count: 6 },
        nazimBirimi: { description: 'Beyit (ikişer mısradan oluşan birim). Toplam 4 beyit (8 mısra).', count: 3 },
        edebiSanat: { description: 'Nida (Aziz İstanbul!), Teşbih (İstanbul\'u sevgiliye benzetme).', count: 0 },
        tema: { description: 'İstanbul\'un güzelliği, ihtişamı ve manevi değeri.', count: 0 },
        konu: { description: 'İstanbul\'un eşsizliği, cennete benzerliği, İslam dünyası için önemi ve padişahın saadet gölgesi altındaki ihtişamı anlatılır.', count: 0 }
      }
    },

    color: '#8b5cf6',

    gradientFrom: 'from-purple-700',

    gradientTo: 'to-indigo-900',

    emoji: '­şô£',

    image: '/poets/Fuzuli.webp',

    tags: ['Gazel', 'Divan', 'Aruz Ölçüsü', 'Beyit'],

    facts: [

      '"Leyla vü Mecnun" mesnevisi, beşeri aşkı ilahi aşka dönüştüren bir başyapıttır.',

      'Türkçe, Arapça ve Farsça olmak üzere üç ayrı dilde divan yazmıştır.',

      '"Su Kasidesi" Hz. Muhammed\'e yazılmış en güzel naat örneği kabul edilir.',

      'Kanuni\'nin 1534\'te Bağdat\'ı fethinden sonra padişaha kasideler sunmuştur.',

      '"Şikâyetnâme" adlı ünlü mektubu, kendisine bağlanan maaşı alamaması üzerine yazılmış hiciv eseridir.',

      'Alevi-Bektaşi geleneğinde "Yedi Ulu Ozan"dan biri olarak kabul edilir.',

      '"Hadikatü\'s-Süeda" adlı eseri Kerbela Vakası\'nı anlatan en önemli eserlerden biridir.',

    ],

  },
  {

    id: 'baki',

    name: 'Baki',

    years: '1526 ÔÇô 1600',

    period: 'Divan Edebiyatı',

    periodCode: 'divan',

    movement: 'Klasik Divan Şiiri',

    bio: '"Sultanü\'ş-Şuara" (Şairlerin Sultanı) unvanıyla anılan Baki, 1526\'da İstanbul\'da doğmuştur. Babası Fatih Camii müezzinlerindendi. Gençliğinde esnaf yanında çıraklık yapmış, ardından medreseye girerek dönemin ünlü müderrislerinden ders almıştır. Kanuni Sultan Süleyman\'ın himayesini görmüş, II. Selim, III. Murad ve III. Mehmed dönemlerinde de itibarını korumuştur. Rindane gazelleri ve Kanuni Mersiyesi ile divan şiirinin zirvesine ulaşmıştır.',

    mainPoem: {
      id: 'baki-poem',
      title: 'Kanuni Mersiyesi',
      form: 'Mersiye (Terkib-i Bent)',
      period: 'Divan Edebiyatı',
      bio: 'Kanuni Sultan Süleyman\'ın ölümü üzerine Baki tarafından yazılmıştır. Şair, Kanuni\'nin büyüklüğünü, adaletini ve ölümün kaçınılmazlığını vurgular.',
      stanzas: [
        {
          lines: [
            [w('Ey'), w('pây-bend-i'), w('dâm-geh-i'), w('kayd-ı'), w('nâm'), wt('ü', ['kafiye'], 'Kafiye: -eng'), wt('neng', ['kafiye'], 'Kafiye: -eng')],
            [w('Tâ'), w('key'), w('hevâ-yı'), w('meşgale-i'), w('dehr-i'), w('bî-'), wt('direng', ['kafiye'], 'Kafiye: -eng')]
          ]
        },
        {
          lines: [
            [w('An'), w('ol'), w('günü'), w('ki'), w('âhir'), w('olub'), w('nev-bahâr-ı'), wt('ömr', ['kafiye'], 'Kafiye: -eng')],
            [w('Berg-i'), w('hazana'), w('dönse'), w('gerek'), w('ruy-ı'), w('lale-'), wt('reng', ['kafiye'], 'Kafiye: -eng')]
          ]
        },
        {
          lines: [
            [w('Âhir'), w('mekânın'), w('olsa'), w('gerek'), w('cür\'a'), w('gibi'), wt('hâk', ['kafiye'], 'Kafiye: -eng')],
            [w('Devrân'), w('elinde'), w('irse'), w('gerek'), w('câm-ı'), w('ayşa'), wt('seng', ['kafiye'], 'Kafiye: -eng')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: 'Kanuni Mersiyesi\'nde redifler beyitlere göre değişir.', count: 0 },
        kafiye: { description: 'Kanuni Mersiyesi\'nde kafiyeler beyitlere göre değişir. "-eng" sesiyle tam kafiye kullanılmıştır.', count: 6 },
        olcu: { description: 'Aruz ölçüsü - "mefûlü fâilâtü mefâîlü fâilün" kalıbı.', count: 6 },
        nazimBirimi: { description: 'Bent (Terkib-i Bent). Kanuni Mersiyesi Terkib-i Bent nazım şekliyle yazılmıştır ve her bent 5-10 beyitten oluşur.', count: 3 },
        edebiSanat: { description: 'İstiare, telmih, teşbih gibi divan edebiyatı sanatları.', count: 0 },
        tema: { description: 'Ölüm / Tarihi şahsiyeti anma. Kanuni Sultan Süleyman\'ın ölümü ve ardından duyulan üzüntü.', count: 0 },
        konu: { description: 'Kanuni Sultan Süleyman\'ın ölümü üzerine Baki tarafından yazılmıştır. Şair, Kanuni\'nin büyüklüğünü, adaletini ve ölümün kaçınılmazlığını vurgular.', count: 0 }
      }
    },

    color: '#6366f1',

    gradientFrom: 'from-indigo-700',

    gradientTo: 'to-purple-900',

    emoji: '­şææ',

    image: '/poets/Baki.jpg',

    tags: ['Mersiye', 'Kaside', 'Aruz', 'Terkib-i Bent'],

    facts: [

      '"Sultanü\'ş-Şuara" (Şairlerin Sultanı) unvanını henüz hayattayken kazanmıştır.',

      'Babası Fatih Camii müezzinlerinden Mehmed Efendi\'dir; İstanbul\'da doğmuştur.',

      'Kanuni Sultan Süleyman tarafından himaye edilmiş, dört padişah dönemini görmüştür.',

      'Şiirlerinde dünya zevklerini anlatan "rindane" bir üslup kullanmıştır.',

      'Aruz kusurlarını (imale ve zihaf) en aza indiren usta bir şairdir.',

      'Şeyhülislam olma arzusu gerçekleşmeden 1600\'de İstanbul\'da vefat etmiştir.',

      'Mesnevi türünde eser vermemiş, daha çok gazel ve kaside ustası olarak öne çıkmıştır.',

    ],

  },
  {

    id: 'karacaoglan',

    name: 'Karacaoğlan',

    years: '1606 ÔÇô 1679',

    period: 'Halk Edebiyatı',

    periodCode: 'halk',

    movement: 'Aşık Edebiyatı',

    bio: '17. yüzyılda yaşamış, Türk halk edebiyatının en büyük aşık şairlerinden biridir. Göçebe Türkmen obalarında yetişmiş, hayatını Çukurova, Toroslar ve çevresinde geçirmiştir. Doğa sevgisi, beşeri aşk ve Anadolu coğrafyasını sade ve duru bir Türkçeyle şiire taşımıştır. Divan etkisinden tamamen uzak, saf halk diliyle yazan ilk büyük aşık şairlerdendir. Günümüze 500\'den fazla şiiri ulaşmıştır.',

    mainPoem: {
      id: 'karacaoglan-poem',
      title: 'Köroğlu Koşması',
      form: 'Koşma',
      period: 'Halk Edebiyatı',
      bio: 'Köroğlu\'nun Bolu Beyi\'ne meydan okuması, savaşçı ruhu ve mertliği anlatılır.',
      stanzas: [
        {
          lines: [
            [w('Benden'), w('selâm'), w('eylen'), w('Bolu'), wt('beyine', ['kafiye'], 'Kafiye: -ına/-ıdır')],
            [w('Çıkıp'), w('şu'), w('dağları'), wt('yaslanmalıdır', ['kafiye'], 'Kafiye: -malıdır')],
            [w('Ok'), w('gıcırtısından'), w('gürzün'), wt('sesinden', ['kafiye'], 'Kafiye: -den')],
            [w('Dağlar'), w('seda'), w('verip'), wt('seslenmelidir', ['kafiye'], 'Kafiye: -melidir')]
          ]
        },
        {
          lines: [
            [w('Düşman'), w('geldi'), w('tabur'), w('tabur'), wt('dizildi', ['kafiye'], 'Kafiye: -ildi')],
            [w('Alnımıza'), w('kara'), w('yazı'), wt('yazıldı', ['kafiye'], 'Kafiye: -ildi')],
            [w('Tüfek'), w('icat'), w('oldu'), w('mertlik'), wt('bozuldu', ['kafiye'], 'Kafiye: -uldu')],
            [w('Eğri'), w('kılıç'), w('kında'), wt('paslanmalıdır', ['kafiye'], 'Kafiye: -malıdır')]
          ]
        },
        {
          lines: [
            [w('Köroğlu'), w('düşer'), w('mi'), w('yine'), wt('şanından', ['kafiye'], 'Kafiye: -ından')],
            [w('Ayırır'), w('çoğunu'), w('er'), wt('meydanından', ['kafiye'], 'Kafiye: -ından')],
            [w('Kır'), w('at'), w('köpüğünden'), w('düşman'), wt('kanından', ['kafiye'], 'Kafiye: -ından')],
            [w('Çevre'), w('dolup'), w('şalvar'), wt('ıslanmalıdır', ['kafiye'], 'Kafiye: -malıdır')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: 'Redif yoktur. Koşma nazım şeklinde redif kullanılmaz.', count: 0 },
        kafiye: { description: 'Düz kafiye (aa / bb / cc…). yaslanmalıdır-seslenmelidir, dizildi-yazıldı şeklinde düz kafiye.', count: 8 },
        olcu: { description: 'Hece ölçüsü - 7+7=14\'lü hece ölçüsü. Her mısra 7 hecedir.', count: 12 },
        nazimBirimi: { description: 'Dörtlük (Bent). Her bent 4 mısradan oluşur.', count: 3 },
        edebiSanat: { description: 'Nida, mübalağa (coşkulu anlatım).', count: 0 },
        tema: { description: 'Kahramanlık / Yiğitlik. Köroğlu destanından bir bölüm.', count: 0 },
        konu: { description: 'Köroğlu\'nun Bolu Beyi\'ne meydan okuması, savaşçı ruhu ve mertliği anlatılır.', count: 0 }
      }
    },

    color: '#ef4444',

    gradientFrom: 'from-red-700',

    gradientTo: 'to-rose-900',

    emoji: '­şÄ©',

    image: '/poets/Karacaoğlan.jpg',

    tags: ['Koşma', 'Semai', 'Hece', 'Aşık Edebiyatı'],

    facts: [

      'Şiirlerinde hiçbir divan etkisi görülmez; tamamen saf ve duru Türkçe kullanmıştır.',

      'Doğa tasvirlerinde son derece canlı ve özgün imgeler kullanmıştır.',

      '17. yüzyılın en önemli aşık şairi olarak kabul edilir.',

      'Kesin doğum-ölüm tarihleri ve yeri bilinmez; hayatı efsanelerle karışmıştır.',

      'Şiirlerinde sıkça geçen Elif, Zeynep ve İsmikan isimleri sevdiği kadınlar olarak edebiyat tarihinde yer almıştır.',

      'Koşma ve semai nazım biçimlerinin en büyük ustası sayılır.',

      'Cumhuriyet dönemi şairlerinden Cahit Külebi ve Faruk Nafiz Çamlıbel üzerinde derin etkileri olmuştur.',

    ],

  },
  {

    id: 'namik-kemal',

    name: 'Namık Kemal',

    years: '1840 ÔÇô 1888',

    period: 'Tanzimat Edebiyatı',

    periodCode: 'tanzimat',

    movement: 'Tanzimat Birinci Dönem',

    bio: 'Tanzimat dönemi Türk edebiyatının en önemli isimlerinden biri; şair, yazar, gazeteci ve siyasi fikir adamıdır. 1840\'ta Tekirdağ\'da doğmuş, 1888\'de Sakız Adası\'nda vefat etmiştir. "Vatan Şairi" ve "Hürriyet Şairi" olarak anılır. Genç Osmanlılar cemiyetinin önde gelen isimlerinden olup, siyasi fikirleri nedeniyle sık sık sürgün edilmiş ve hapis yatmıştır. Magosa sürgünü, edebî hayatının en verimli dönemlerindendir.',

    mainPoem: {
      id: 'namik-kemal-poem',
      title: 'Hürriyet Kasidesi',
      form: 'Kaside',
      period: 'Tanzimat Edebiyatı',
      bio: 'Şehitlerin manevi değeri, hürriyetin önemi ve hürriyet uğruna can verme arzusu anlatılır.',
      stanzas: [
        {
          lines: [
            [w('Görüp'), w('ahkâm-ı'), w('asrı'), w('münharif'), w('sıdk'), w('u'), wt('selametten', ['redif'], 'Redif: -etten')],
            [w('Çekildik'), w('izzet'), w('ü'), w('ikbal'), w('ile'), w('bab-ı'), wt('hükûmetten', ['redif'], 'Redif: -etten')]
          ]
        },
        {
          lines: [
            [w('Usanmaz'), w('kendini'), w('insan'), w('bilenler'), w('halka'), wt('hizmetten', ['redif'], 'Redif: -etten')],
            [w('Mürüvvet-mend'), w('olan'), w('mazluma'), w('el'), w('çekmez'), wt('ianetten', ['redif'], 'Redif: -etten')]
          ]
        },
        {
          lines: [
            [w('Hakir'), w('olduysa'), w('millet'), w('şanına'), w('noksan'), w('gelir'), wt('sanma', ['kafiye'], 'Kafiye: -etten')],
            [w('Yere'), w('düşmekle'), w('cevher'), w('sakıt'), w('olmaz'), w('kadr'), w('ü'), wt('kıymetten', ['redif'], 'Redif: -etten')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: '"-etten" redifi. Her beytin sonunda "-etten" eki tekrarlanır.', count: 6 },
        kafiye: { description: '"-amet" tam kafiye. Beyitlerde "-etten" sesiyle zengin kafiye kullanılmıştır.', count: 6 },
        olcu: { description: 'Aruz ölçüsü - Fâilâtün / Fâilâtün / Fâilâtün / Fâilün kalıbı.', count: 6 },
        nazimBirimi: { description: 'Beyit (ikişer mısradan oluşan birim).', count: 3 },
        edebiSanat: { description: 'Teşbih, istiare, iham.', count: 0 },
        tema: { description: 'Hürriyet / Vatan sevgisi. Özgürlük uğruna ölümü göze alma.', count: 0 },
        konu: { description: 'Şehitlerin manevi değeri, hürriyetin önemi ve hürriyet uğruna can verme arzusu anlatılır.', count: 0 }
      }
    },

    color: '#3b82f6',

    gradientFrom: 'from-blue-700',

    gradientTo: 'to-cyan-900',

    emoji: '­şù¢',

    image: '/poets/Namık Kemal.jpg',

    tags: ['Kaside', 'Tiyatro', 'Roman', 'Hürriyet'],

    facts: [

      '"Vatan", "hürriyet" ve "millet" kavramlarını Türk edebiyatına kazandırmıştır.',

      '"Vatan Yahut Silistre" Türk edebiyatında Batılı anlamda sahnelenen ilk tiyatro eseridir.',

      '"İntibah" Türk edebiyatının ilk edebî romanı, "Cezmi" ise ilk tarihî romanı kabul edilir.',

      'Siyasi fikirleri nedeniyle Magosa\'ya (Kıbrıs) sürgün edilmiştir.',

      'Tiyatroyu "eğlencelerin en faydalısı" olarak nitelendirmiş, bir okul gibi görmüştür.',

      'Eserleri ve düşünceleriyle Mustafa Kemal Atatürk dahil birçok fikir insanını etkilemiştir.',

    ],

  },
  {

    id: 'tevfik-fikret',

    name: 'Tevfik Fikret',

    years: '1867 ÔÇô 1915',

    period: 'Servet-i Fünun',

    periodCode: 'servet-i-funun',

    movement: 'Edebiyat-ı Cedide',

    bio: 'Servet-i Fünun (Edebiyat-ı Cedide) döneminin en önemli şairi ve modern Türk şiirinin kurucularından biridir. 1867\'de İstanbul\'da doğmuş, Galatasaray Sultanisi\'ni birincilikle bitirmiştir. 1896-1901 yılları arasında Servet-i Fünun dergisinin edebiyat bölümünü yönetmiştir. Şiirde biçim kusursuzluğuna (Parnasizm etkisi) büyük önem vermiş, aruz ölçüsünü Türkçeye başarıyla uygulamıştır. Hayatının son yıllarını Bebek\'teki "Aşiyan" adlı evinde geçirmiştir.',

    mainPoem: {
      id: 'tevfik-fikret-poem',
      title: 'Siste Söyleniş (Sis)',
      form: 'Serbest Nazım',
      period: 'Servet-i Fünun',
      bio: 'Şair, sisli bir akşamda Boğaz\'da bir vapurda hissettiklerini, gözleri kapalı, düşünmeden sadece hissederek yaşadığı mistik anı anlatır.',
      stanzas: [
        {
          lines: [
            [w('Birden'), w('kapandı'), w('birbiri'), w('ardınca'), wt('perdeler...', ['kafiye'], 'Kafiye: -deler/-deler')],
            [w('Kandilli,'), w('Göksu,'), w('Kanlıca,'), w('İstinye'), wt('nerdeler?', ['kafiye'], 'Kafiye: -deler/-deler')]
          ]
        },
        {
          lines: [
            [w('Som'), w('zümrüt'), w('ortasında,'), w('muzaffer,'), w('akıp'), wt('giden', ['kafiye'], 'Kafiye: -den')],
            [w('Firuze'), w('nehri'), w('nerde?'), w('Bugün'), w('saklıdır,'), wt('neden?', ['kafiye'], 'Kafiye: -den')]
          ]
        },
        {
          lines: [
            [w('Benzetmek'), w('olmasın'), w('sana'), w('dünyâda'), w('bir'), wt('yeri;', ['kafiye'], 'Kafiye: -leri')],
            [w('Eylül'), w('sonunda'), w('böyledir'), w('İsviçre'), wt('gölleri.', ['kafiye'], 'Kafiye: -leri')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: 'Redif yoktur. Serbest nazım özelliği gösterir.', count: 0 },
        kafiye: { description: 'Yarım uyaklar (zengin kafiye) ve serbest kafiye. perdeler-nerdeler, giden-neden, yeri-gölleri gibi yarım uyaklar vardır.', count: 6 },
        olcu: { description: 'Serbest ölçü (Hece ölçüsüne yakın ama tam olarak uymaz).', count: 6 },
        nazimBirimi: { description: 'Dörtlük (Bent). Her bent 4 mısradan oluşur.', count: 3 },
        edebiSanat: { description: 'Coşkulu nida, kişileştirme (İstanbul\'a hitap).', count: 0 },
        tema: { description: 'Hüzün / Melankoli. Sisli bir İstanbul akşamında duygusal derinlik.', count: 0 },
        konu: { description: 'Şair, sisli bir akşamda Boğaz\'da bir vapurda hissettiklerini, gözleri kapalı, düşünmeden sadece hissederek yaşadığı mistik anı anlatır.', count: 0 }
      }
    },

    color: '#0891b2',

    gradientFrom: 'from-cyan-700',

    gradientTo: 'to-blue-900',

    emoji: '­şî½´©Å',

    image: '/poets/Tevfik Fikret.webp',

    tags: ['Serbest Müstezat', 'Aruz', 'Sosyal Eleştiri'],

    facts: [

      'Servet-i Fünun dergisinin edebiyat bölümünü yöneterek Edebiyat-ı Cedide hareketine liderlik etmiştir.',

      'Klasik müstezat biçimini dönüştürerek "serbest müstezat" formunu oluşturmuştur.',

      '"Haluk\'un Defteri" ile gençlere yol göstermeyi hedeflemiştir.',

      'Galatasaray Sultanisi\'ni birincilikle bitirmiştir.',

      '"Sis" şiirinde İstanbul\'u toplumsal çöküşün sembolü olarak ele almıştır.',

      '"Şermin" adlı eseri, hece ölçüsüyle çocuklar için yazdığı şiir kitabıdır.',

      'Hayatının son yıllarını Bebek\'te kendi çizdiği "Aşiyan" (Kuş Yuvası) evinde geçirmiştir.',

    ],

  },
  {

    id: 'mehmet-akif',

    name: 'Mehmet Akif Ersoy',

    years: '1873 ÔÇô 1936',

    period: 'Milli Edebiyat',

    periodCode: 'milli',

    movement: 'Milli Edebiyat ÔÇô İslam Birliği',

    bio: '"Milli Şair" olarak bilinen Mehmet Akif Ersoy, İstiklal Marşı\'nın yazarıdır. Veteriner hekim, öğretmen ve milletvekili olarak görev yapmıştır. İslamcılık akımının öncülerinden olup, toplumsal sorunları ve milli duyguları güçlü bir dille anlatmıştır. Aruz ölçüsüyle halk diliyle yazmayı başaran nadir şairlerdendir. "Safahat" adlı yedi ciltlik şiir külliyatı dönemi en iyi yansıtan eserdir.',

    mainPoem: {
      id: 'mehmet-akif-poem',
      title: 'İstiklal Marşı (İlk Üç Kıta)',
      form: 'Kaside',
      period: 'Milli Edebiyat',
      bio: 'Türk milletinin istiklaline olan inancı, bayrağın ve vatanın kutsallığı, bağımsızlık uğruna kan dökmeye hazır olma anlatılır.',
      stanzas: [
        {
          lines: [
            [w('Korkma!'), w('Sönmez'), w('bu'), w('şafaklarda'), w('yüzen'), w('al'), wt('sancak,', ['kafiye'], 'Kafiye: -cak')],
            [w('Sönmeden'), w('yurdumun'), w('üstünde'), w('tüten'), w('en'), w('son'), wt('ocak.', ['kafiye'], 'Kafiye: -cak')],
            [w('O'), w('benim'), w('milletimin'), w('yıldızıdır,'), wt('parlayacak;', ['kafiye'], 'Kafiye: -cak')],
            [w('O'), w('benimdir,'), w('o'), w('benim'), w('milletimindir'), wt('ancak.', ['kafiye'], 'Kafiye: -cak')]
          ]
        },
        {
          lines: [
            [w('Çatma,'), w('kurban'), w('olayım,'), w('çehreni'), w('ey'), w('nazlı'), wt('hilal!', ['kafiye'], 'Kafiye: -lal')],
            [w('Kahraman'), w('ırkıma'), w('bir'), w('gül;'), w('ne'), w('bu'), w('şiddet,'), w('bu'), wt('celal?', ['kafiye'], 'Kafiye: -lal')],
            [w('Sana'), w('olmaz'), w('dökülen'), w('kanlarımız'), w('sonra'), wt('helal…', ['kafiye'], 'Kafiye: -lal')],
            [w('Hakkıdır,'), w("Hakk\'a"), w('tapan'), w('milletimin'), wt('istiklal.', ['kafiye'], 'Kafiye: -lal')]
          ]
        },
        {
          lines: [
            [w('Ben'), w('ezelden'), w('beridir'), w('hür'), w('yaşadım,'), w('hür'), wt('yaşarım,', ['kafiye'], 'Kafiye: -arım')],
            [w('Hangi'), w('çılgın'), w('bana'), w('zincir'), w('vuracakmış?'), wt('Şaşarım.', ['kafiye'], 'Kafiye: -arım')],
            [w('Kükremiş'), w('sel'), w('gibiyim,'), w('bendimi'), w('çiğner,'), wt('aşarım,', ['kafiye'], 'Kafiye: -arım')],
            [w('Yırtarım'), w('dağları,'), w('enginlere'), w('sığmam,'), wt('taşarım.', ['kafiye'], 'Kafiye: -arım')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: 'Redif yoktur.', count: 0 },
        kafiye: { description: 'Düz kafiye (aabb / ccdd…). sancak-ocak, parlayacak-ancak, hilâl-celâl, helal-istiklâl, yaşarım-şaşarım-aşarım-taşarım.', count: 12 },
        olcu: { description: 'Aruz ölçüsü - Fâilâtün / Fâilâtün / Fâilâtün / Fâilün kalıbı. Her mısra 4 vezinli aruz.', count: 12 },
        nazimBirimi: { description: 'Dörtlük (Kıta). Her kıta 4 mısradan oluşur. İlk 3 kıta (12 mısra).', count: 3 },
        edebiSanat: { description: 'Teşbih, istiare, nida, mübalağa.', count: 0 },
        tema: { description: 'Vatan sevgisi / İstiklal. Bağımsızlık uğruna mücadele azmi.', count: 0 },
        konu: { description: 'Türk milletinin istiklaline olan inancı, bayrağın ve vatanın kutsallığı, bağımsızlık uğruna kan dökmeye hazır olma anlatılır.', count: 0 }
      }
    },

    color: '#dc2626',

    gradientFrom: 'from-red-700',

    gradientTo: 'to-red-900',

    emoji: '­şç╣­şçÀ',

    image: '/poets/Mehmet Akif Ersoy.webp',

    tags: ['İstiklal Marşı', 'Safahat', 'Aruz', 'Milli Şiir'],

    facts: [

      'İstiklal Marşı\'nı yazmıştır; ödül parasını reddederek Hilal-i Ahmer\'e bağışlamıştır.',

      '"Safahat" 7 kitaptan oluşur: Safahat, Süleymaniye Kürsüsünde, Hakkın Sesleri, Fatih Kürsüsünde, Hatıralar, Asım, Gölgeler.',

      'Mısır\'da yaşadığı dönemde Kur\'an mealini Türkçeye çevirmiş ancak yayımlanmasını istememiştir.',

      'Aruz ölçüsüyle halk diliyle şiir yazan ilk ve en başarılı şairlerdendir.',

      'Veteriner hekim olarak eğitim almış, Halkalı Baytar Mektebi\'nden mezun olmuştur.',

      'Birinci Dünya Savaşı sırasında Teşkilat-ı Mahsusa ile Berlin ve Arabistan\'a gitmiştir.',

    ],

  },
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
            [w('Artık'), w('demir'), w('almak'), w('günü'), w('gelmişse'), wt('zamandan,', ['kafiye', 'redif'], 'Kafiye: -man (Zengin Kafiye) / Redif: -dan')],
            [w('Meçhule'), w('giden'), w('bir'), w('gemi'), w('kalkar'), w('bu'), wt('limandan.', ['kafiye', 'redif'], 'Kafiye: -man (Zengin Kafiye) / Redif: -dan')]
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
        redif: { description: '"-dan" redifi. 1. beyitin 1. ve 2. mısrasında "zamandan" ve "limandan" kelimelerindeki "-dan" ekleri (ayrılma hal eki) rediftir.', count: 2 },
        kafiye: { description: '"-man" tam kafiye. "zaman" ve "liman" kelimelerindeki "-man" sesleri zengin kafiyedir. 2. beyit: "yol" ve "kol" tam kafiye. 3. beyit: elemli-nemli.', count: 6 },
        olcu: { description: 'Aruz ölçüsü (Mef\'ûlü Mefâîlü Mefâîlü Feûlün). Aruz ölçüsü, kafiye ve rediflerle ahenk sağlanmıştır.', count: 6 },
        nazimBirimi: { description: 'Beyit (ikişer mısradan oluşan birim).', count: 3 },
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

    id: 'faruk-nafiz',

    name: 'Faruk Nafiz Çamlıbel',

    years: '1898 ÔÇô 1973',

    period: 'Cumhuriyet Dönemi',

    periodCode: 'cumhuriyet',

    movement: 'Beş Hececiler',

    bio: '"Beş Hececiler" grubunun en güçlü temsilcisi olan Faruk Nafiz, sade Türkçe ve hece ölçüsüyle milli duyguları ve Anadolu coğrafyasını şiire taşımıştır. "Han Duvarları" adlı şiiri memleketçi edebiyatın en meşhur eserlerinden biri olup, Anadolu\'yu gezerken han duvarlarındaki isimleri okuyan şairin geçiciliği sorgulamasını anlatır. Behçet Kemal Çağlar ile birlikte 10. Yıl Marşı\'nı yazmıştır.',

    mainPoem: {
      id: 'faruk-nafiz-poem',
      title: 'Han Duvarları',
      form: 'Koşma',
      period: 'Cumhuriyet Dönemi',
      bio: 'Terke edilmiş bir handa duvarlara yansıyan gölgelerin hatıraları çağrıştırması, hanın sessizliği ve ıssızlığı anlatılır.',
      stanzas: [
        {
          lines: [
            [w('Yağız'), w('atlar'), w('kişnedi,'), w('meşin'), w('kırbaç'), wt('şakladı,', ['redif'], 'Redif: -ladı')],
            [w('Bir'), w('dakika'), w('araba'), w('yerinde'), wt('durakladı.', ['redif'], 'Redif: -ladı')]
          ]
        },
        {
          lines: [
            [w('Neden'), w('sonra'), w('sarsıldı'), w('altımda'), w('demir'), wt('yaylar,', ['kafiye'], 'Kafiye: -aylar')],
            [w('Gözlerimin'), w('önünden'), w('geçti'), wt('kervansaraylar...', ['kafiye'], 'Kafiye: -aylar')]
          ]
        },
        {
          lines: [
            [w('Gidiyordum,'), w('gurbeti'), w('gönlümle'), w('duya'), wt('duya,', ['kafiye'], 'Kafiye: -uya')],
            [w('Ulukışla'), w('yolundan'), w('Orta'), wt("Anadolu\'ya.", ['kafiye'], 'Kafiye: -uya')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: '"-ladı" redifi. "şakladı" ve "durakladı" kelimelerindeki "-ladı" ekleri rediftir.', count: 2 },
        kafiye: { description: '"-ak" tam kafiye. şakladı-durakladı (redif), yaylar-kervansaraylar, duya-Anadolu\'ya gibi kafiyeler kullanılmıştır.', count: 6 },
        olcu: { description: '7+7=14\'lü hece ölçüsü.', count: 6 },
        nazimBirimi: { description: 'Dörtlük (Bent). Her bent 4 mısradan oluşur.', count: 3 },
        edebiSanat: { description: 'Tasvir, coşkulu anlatım, yolculuk motifi.', count: 0 },
        tema: { description: 'Yalnızlık / Hüzün. Terk edilmiş bir hanın atmosferi.', count: 0 },
        konu: { description: 'Terke edilmiş bir handa duvarlara yansıyan gölgelerin hatıraları çağrıştırması, hanın sessizliği ve ıssızlığı anlatılır.', count: 0 }
      }
    },

    color: '#d97706',

    gradientFrom: 'from-amber-700',

    gradientTo: 'to-orange-900',

    emoji: '­şÅÜ´©Å',

    image: '/poets/Faruk Nafiz Çamlıbel.jpg',

    tags: ['Hece Ölçüsü', 'Beş Hececiler', 'Han Duvarları', 'Anadolu'],

    facts: [

      '"Han Duvarları" Türk edebiyatının en uzun ve en ünlü hece şiirlerinden biridir.',

      'Behçet Kemal Çağlar ile birlikte Cumhuriyet\'in 10. Yıl Marşı\'nı yazmıştır.',

      'Şiirlerinde Anadolu coğrafyasını ve halk kültürünü başarıyla işlemiştir.',

      'Uzun yıllar milletvekilliği yapmıştır.',

      '"Çoban Çeşmesi" şiiri halk dili ve doğa tasvirleriyle tanınır.',

      'Tiyatro alanında da "Akın", "Özyurt" ve "Kahraman" gibi eserler yazmıştır.',

    ],

  },
  {

    id: 'ahmet-kutsi',

    name: 'Ahmet Kutsi Tecer',

    years: '1901 ÔÇô 1967',

    period: 'Cumhuriyet Dönemi',

    periodCode: 'cumhuriyet',

    movement: 'Cumhuriyet Dönemi ÔÇô Halk Geleneği',

    bio: 'Halk edebiyatı geleneğini Cumhuriyet dönemi şiiriyle buluşturan şair, oyun yazarı ve siyasetçidir. Anadolu\'nun yerli ve milli unsurlarını eserlerine yansıtmış, halk kültürü ve folklor üzerine önemli çalışmalar yapmıştır. Sivas\'ta görev yaptığı yıllarda halk şairlerini keşfetmesiyle tanınır. Tiyatro alanında da "Köşebaşı" piyesiyle önemli bir iz bırakmıştır.',

    mainPoem: {
      id: 'ahmet-kutsi-poem',
      title: 'Nerdesin',
      form: 'Koşma',
      period: 'Cumhuriyet Dönemi',
      bio: 'Şair, gözü yaşlı, gönlü kırık bir halde sokaklarda kayıp birini aramaktadır.',
      stanzas: [
        {
          lines: [
            [w('Geceleyin'), w('bir'), w('ses'), w('böler'), wt('uykumu,', ['kafiye'], 'Kafiye: -umu')],
            [w('İçim'), w('ürpermeyle'), w('dolar:'), wt('- Nerdesin?', ['redif', 'kafiye'], 'Redif: -sin / Kafiye: -esin')],
            [w('Arıyorum'), w('yıllar'), w('var'), w('ki,'), w('ben'), wt('onu,', ['kafiye'], 'Kafiye: -unu')],
            [w('Aşıkıyım'), w('beni'), w('çağıran'), w('bu'), wt('sesin.', ['redif', 'kafiye'], 'Redif: -sin / Kafiye: -esin')]
          ]
        },
        {
          lines: [
            [w('Gün'), w('olur'), w('sürüyüp'), w('beni'), wt('derbeder,', ['kafiye'], 'Kafiye: -er')],
            [w('Bu'), w('ses'), w('rüzgârlara'), w('karışır'), wt('gider.', ['kafiye'], 'Kafiye: -er')],
            [w('Gün'), w('olur'), w('peşimden'), w('yürür'), wt('beraber,', ['kafiye'], 'Kafiye: -er')],
            [w('Ansızın'), w('haykırır'), w('bana:'), wt('-Nerdesin?', ['redif', 'kafiye'], 'Redif: -sin')]
          ]
        },
        {
          lines: [
            [w('Bütün'), w('sevgileri'), w('atıp'), wt('içimden,', ['kafiye'], 'Kafiye: -inden')],
            [w('Varlığımı'), w('yalnız'), w('ona'), w('verdim'), wt('ben.', ['kafiye'], 'Kafiye: -en')],
            [w('Elverir'), w('ki'), w('bir'), w('gün'), w('bana,'), wt('derinden,', ['kafiye'], 'Kafiye: -inden')],
            [w('Ta'), w('derinden,'), w('bir'), w('gün'), w('bana'), w('"Gel"'), wt('desin.', ['redif', 'kafiye'], 'Redif: -sin')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: '"-sin" redifi. "Nerdesin" ve "desin" kelimelerindeki "-sin" eki tekrarlanır.', count: 3 },
        kafiye: { description: '"-er" tam kafiye. derbeder-gider-beraber gibi "-er" sesiyle tam kafiye kullanılmıştır.', count: 8 },
        olcu: { description: '11\'li hece ölçüsü (6+5). Her mısra 11 hecedir.', count: 12 },
        nazimBirimi: { description: 'Dörtlük (Bent). Her bent 4 mısradan oluşur.', count: 3 },
        edebiSanat: { description: 'Nida, soru sanatı (istifham), kişileştirme.', count: 0 },
        tema: { description: 'Yalnızlık / Ayrılık. Kayıp birini arama.', count: 0 },
        konu: { description: 'Şair, gözü yaşlı, gönlü kırık bir halde sokaklarda kayıp birini aramaktadır. Bir iz bulsa onu bulacağını, ama her yerde arayıp bulamadığını anlatır.', count: 0 }
      }
    },

    color: '#7c3aed',

    gradientFrom: 'from-violet-700',

    gradientTo: 'to-purple-900',

    emoji: '­şÅö´©Å',

    image: '/poets/Ahmet Kutsi Tecer.jpg',

    tags: ['Koşma', 'Halk Geleneği', 'Anadolu', 'Tiyatro'],

    facts: [

      'Hem şair, hem tiyatro yazarı, hem de halk bilimci ve siyasetçidir.',

      'Sivas\'ta görev yaparken kör saz şairi Âşık Veysel\'i keşfederek İstanbul\'a tanıtmıştır.',

      '"Köşebaşı" piyesi Türk tiyatrosunun klasikleri arasında yer alır.',

      '"Orda Bir Köy Var Uzakta" ve "Nerdesin" en bilinen şiirleridir.',

      'Halk edebiyatı araştırmacısı olarak folklor çalışmalarına büyük katkı sağlamıştır.',

      'Milletvekilliği de yapmış olan çok yönlü bir aydındır.',

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
      form: 'Serbest Nazım (Modern Şiir)',
      period: 'Cumhuriyet Dönemi',
      bio: 'Şair, otuz beş yaşında hayatın ortasında olduğunu, Dante\'nin Inferno\'suna gönderme yaparak anlatır.',
      stanzas: [
        {
          lines: [
            [w('Yaş'), w('otuz'), w('beş!'), w('yolun'), w('yarısı'), wt('eder.', ['kafiye'], 'Kafiye: -er (Tam Kafiye)')],
            [w('Dante'), w('gibi'), w('ortasındayız'), wt('ömrün.', ['kafiye'], 'Kafiye: -ün')],
            [w('Delikanlı'), w('çağımızdaki'), wt('cevher,', ['kafiye'], 'Kafiye: -er (Tam Kafiye)')],
            [w('Yalvarmak,'), w('yakarmak'), w('nafile'), wt('bugün,', ['kafiye'], 'Kafiye: -ün')],
            [w('Gözünün'), w('yaşına'), w('bakmadan'), wt('gider.', ['kafiye'], 'Kafiye: -er (Tam Kafiye)')]
          ]
        },
        {
          lines: [
            [w('Hangi'), w('resmime'), w('baksam'), w('ben'), wt('değilim.', ['kafiye'], 'Kafiye: -ilim')],
            [w('Nerde'), w('o'), w('günler,'), w('o'), w('şevk,'), w('o'), wt('heyecan?', ['kafiye'], 'Kafiye: -an')],
            [w('Bu'), w('güler'), w('yüzlü'), w('adam'), w('ben'), wt('değilim;', ['kafiye'], 'Kafiye: -ilim')],
            [w('Yalandır'), w('kaygısız'), w('olduğum'), wt('yalan.', ['kafiye'], 'Kafiye: -an')],
            [w('Hayal'), w('meyal'), w('şeylerden'), w('ilk'), wt('aşkımız;', ['kafiye'], 'Kafiye: -ız')]
          ]
        },
        {
          lines: [
            [w('Hatırası'), w('bile'), w('yabancı'), wt('gelir.', ['kafiye'], 'Kafiye: -er')],
            [w('Hayata'), w('beraber'), w('başladığımız,'), wt('?', [], '')],
            [w('Dostlarla'), w('da'), w('yollar'), w('ayrıldı'), w('bir'), wt('bir;', ['kafiye'], 'Kafiye: -er')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: 'Redif yoktur.', count: 0 },
        kafiye: { description: '"-er" tam kafiye. eder-cevher-gider gibi "-er" sesiyle tam kafiye kullanılmıştır. Bent içi kafiye düzeni: ababa.', count: 10 },
        olcu: { description: '11\'li hece ölçüsü (6+5). Hece ölçüsünün düzenli kullanımı şiire ahenkli bir yapı kazandırır.', count: 8 },
        nazimBirimi: { description: 'Bent (Beşlik). Her bent 5 mısradan oluşur. Toplam 7 bent.', count: 7 },
        edebiSanat: { description: 'Telmih (Dante\'ye atıf), İstifham (Soru sorma sanatı: \'Nerde o günler?\'), Teşbih (Şakaktaki beyaz saçların kara benzetilmesi).', count: 3 },
        tema: { description: 'Yaşlanma / Hayatın anlamı. Otuz beş yaşında hayatın ortasında olma duygusu.', count: 0 },
        konu: { description: 'Şair, otuz beş yaşında hayatın ortasında olduğunu, Dante\'nin Inferno\'suna gönderme yaparak, gençlik çağındaki değerlerin kaybolmaması gerektiğini, yaşlanmanın getirdiği sorumlulukları anlatır.', count: 0 }
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
            [w('Gözlerim'), wt('kapalı', ['kafiye'], 'Kafiye: -alı')],
            [w('Kulaklarım'), wt('dayalı,', ['kafiye'], 'Kafiye: -alı')],
            [w('İnce'), w('bir'), wt('duvara', ['kafiye'], 'Kafiye: -ara')],
            [w('Karşıdan'), w('vapur'), w('sesleri'), wt('geliyor', ['kafiye'], 'Kafiye: -iyor')],
            [w('Ve'), w('limandan'), w('uzaklaşan'), w('bir'), w('şeylerin'), wt('hüznü', ['kafiye'], 'Kafiye: -ü')],
            [w('Ve'), w('her'), w('şeyde'), w('batan'), wt('güneşin', ['kafiye'], 'Kafiye: -in')],
            [w('Ve'), w('yallarda'), w('ölen'), wt('günün', ['kafiye'], 'Kafiye: -ün')],
            [w('Ve'), w('yelkenlere'), w('karşı'), w('koyan'), wt('dalgaların', ['kafiye'], 'Kafiye: -ların')],
            [w('Ve'), w('kadınların,'), w('kocalarının,'), wt('annelerinin', ['kafiye'], 'Kafiye: -nin')],
            [w('Ve'), w('ağlayan'), wt('çocukların', ['kafiye'], 'Kafiye: -ların')],
            [w('Ve'), w('hüznülü'), wt('gemilerin', ['kafiye'], 'Kafiye: -in')],
            [wt('Ve', ['redif'], 'Redif: "Ve bütün..." 3 kez tekrar'), w('bütün'), w('bunların'), w('üstüne'), w('çöken'), wt('akşamın', ['kafiye'], 'Kafiye: -ın')],
            [wt('Ve', ['redif'], 'Redif: "Ve bütün..." tekrar'), w('bütün'), w('bunların'), w('üstüne'), w('çöken'), wt('akşamın', ['kafiye'], 'Kafiye: -ın')],
            [wt('Ve', ['redif'], 'Redif: "Ve bütün..." tekrar'), w('bütün'), w('bunların'), w('üstüne'), w('çöken'), wt('akşamın', ['kafiye'], 'Kafiye: -ın')],
            [w('Hüznünü'), w('dinliyorum')],
            [wt("İstanbul\'u", ['redif'], 'Redif: Son mısra tekrarı'), wt('dinliyorum.', ['redif'], 'Redif: "İstanbul\'u dinliyorum" — şiirin son mısrasında tekrarlanır (1 kez)')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: '"İstanbul\'u dinliyorum" — Şiirin son mısrasında tekrarlanır (1 kez). "Ve bütün bunların üstüne çöken akşamın" dizesi 3 kez tekrarlanarak müzikal ahenk sağlar.', count: 4 },
        kafiye: { description: 'Serbest kafiye. kapalı-dayalı, geliyor-hüznü, günün-dalgaların, annelerinin-çocukların-gemilerin-akşamın gibi yarım uyaklar ve ses benzerlikleri vardır.', count: 8 },
        olcu: { description: 'Serbest ölçü. Kelime ve dize tekrarları (nakaratlar) ile ahenk sağlanmıştır.', count: 16 },
        nazimBirimi: { description: 'Bentler halinde yazılmıştır. Tek bir bütün (tek kıta). Mısra sayısı serbesttir.', count: 1 },
        edebiSanat: { description: 'İmgelem (Görsel ve işitsel betimlemeler), Tenasüp (İstanbul ile ilgili kavramların bir arada kullanılması), Anafora ("Ve..." ile başlayan dizeler).', count: 3 },
        tema: { description: 'İstanbul / Hüzün. Şehrin seslerini dinleyerek duygusal bir bağ kurma.', count: 0 },
        konu: { description: 'Şair, gözleri kapalı bir şekilde İstanbul\'un seslerini dinler: vapur sesleri, limanın hüznü, batan güneş, yelkenlere çarpan dalgalar, kadınların, çocukların ve gemilerin sesleri. Tüm bu seslerin üzerine çöken akşamın hüznünü dinler.', count: 0 }
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
