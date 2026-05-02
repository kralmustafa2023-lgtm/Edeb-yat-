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
    years: '1240 – 1321',
    period: 'Tekke Edebiyatı',
    periodCode: 'tekke',
    movement: 'İslamiyet Dönemi – Tasavvuf Şiiri',
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
            [w('Ben'), w('yürürüm'), wt('yane', ['kafiye'], 'Kafiye: yane-kane-divane'), wt('yane,', ['kafiye'], '')],
            [w('Aşk'), w('boyadı'), w('beni'), wt('kane,', ['kafiye'], 'Kafiye: yane-kane-divane')],
            [w('Ne'), w('âkilem'), w('ne'), wt('divane,', ['kafiye'], 'Kafiye: yane-kane-divane')],
            [wt('Gel', ['redif'], 'Redif: Her dörtlüğün son mısrası'), wt('gör', ['redif'], ''), wt('beni', ['redif'], ''), wt('aşk', ['redif'], ''), wt('neyledi.', ['redif'], '')]
          ]
        },
        {
          lines: [
            [w('Gâh'), w('eserim'), w('yeller'), wt('gibi,', ['kafiye'], 'Kafiye: gibi-gibi-gibi')],
            [w('Gâh'), w('tozarım'), w('yollar'), wt('gibi,', ['kafiye'], '')],
            [w('Gâh'), w('akarım'), w('seller'), wt('gibi,', ['kafiye'], '')],
            [wt('Gel', ['redif'], 'Redif'), wt('gör', ['redif'], ''), wt('beni', ['redif'], ''), wt('aşk', ['redif'], ''), wt('neyledi.', ['redif'], '')]
          ]
        },
        {
          lines: [
            [w('Akar'), w('suların'), wt('çağlarım,', ['kafiye'], 'Kafiye: çağlarım-dağlarım-ağlarım')],
            [w('Dertli'), w('ciğerim'), wt('dağlarım,', ['kafiye'], '')],
            [w('Şeyhim'), w('anuban'), wt('ağlarım,', ['kafiye'], '')],
            [wt('Gel', ['redif'], 'Redif'), wt('gör', ['redif'], ''), wt('beni', ['redif'], ''), wt('aşk', ['redif'], ''), wt('neyledi.', ['redif'], '')]
          ]
        },
        {
          lines: [
            [w('Ya'), w('elim'), w('al'), w('kaldır'), wt('beni,', ['kafiye'], 'Kafiye: beni-beni-beni')],
            [w('Ya'), w('vaslına'), w('erdir'), wt('beni,', ['kafiye'], '')],
            [w('Çok'), w('ağlattın'), w('güldür'), wt('beni,', ['kafiye'], '')],
            [wt('Gel', ['redif'], 'Redif'), wt('gör', ['redif'], ''), wt('beni', ['redif'], ''), wt('aşk', ['redif'], ''), wt('neyledi.', ['redif'], '')]
          ]
        },
        {
          lines: [
            [w('Miskin'), w('Yunus'), w('biçareyim,'), wt('yareyim,', ['kafiye'], 'Kafiye: yareyim-avareyim')],
            [w('Baştan'), w('ayağa'), wt('yareyim,', ['kafiye'], '')],
            [w('Dost'), w('elinde'), wt('avareyim,', ['kafiye'], '')],
            [wt('Gel', ['redif'], 'Redif'), wt('gör', ['redif'], ''), wt('beni', ['redif'], ''), wt('aşk', ['redif'], ''), wt('neyledi.', ['redif'], '')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: '"Gel gör beni aşk neyledi" — Her dörtlüğün (bent) son mısrasında tekrarlanır.', count: 10 },
        kafiye: { description: 'Düz kafiye (aaab / cccb...). yane-kane-divane, gibi-gibi-gibi kafiyelidir.', count: 7 },
        olcu: { description: 'Hece ölçüsü — 7+7=14\'lü hece ölçüsü.', count: 8 },
        nazimBirimi: { description: 'Dörtlük (Bent). Her bent 4 mısradan oluşur.', count: 2 },
        edebiSanat: { description: 'İlahi aşk (aşk-ı hakiki)', count: 0 },
        tema: { description: 'Aşk (ilahi aşk / aşk-ı hakiki). Allah sevgisi ve bu sevginin insanı dönüştürmesi.', count: 0 },
        konu: { description: 'Şair, ilahi aşkın etkisiyle divane olmuş, kendini tanıyamaz hale gelmiştir.', count: 0 }
      }
    },
    color: '#10b981',
    gradientFrom: 'from-emerald-700',
    gradientTo: 'to-teal-900',
    emoji: '🌿',
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
    years: '1483 – 1556',
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
            [w('Bu'), w('şehr-i'), w('Stanbul'), w('ki'), w('bî-misâl-ü'), wt('bî-nazîrdir,', ['kafiye'], 'dir')],
            [w('Ger'), w('sâkî-i'), w('cihan-ı'), w('cihan'), w('olmaya'), wt('hakkıdır.', ['kafiye'], 'dir')]
          ]
        },
        {
          lines: [
            [w('Bir'), w('sâye-i'), w('hümâyûn'), w('ki'), w('bihişte'), w('menzîl'), wt('olur,', ['kafiye'], 'olur')],
            [w('Nâzânînlerin'), w('teşrîf-i'), w('pây-bûsû'), wt('olur.', ['kafiye'], 'olur')]
          ]
        },
        {
          lines: [
            [w('Kim'), w('bilir'), w('bu'), w('ne'), w('şehrdir'), w('ki'), w('âlemde'), w('nâmı'), wt('yok,', ['kafiye'], 'yok-tok')],
            [w('Feth'), w('olunmadıkça'), w('olmaz'), w('devlet-i'), w('İslâm'), wt('tok.', ['kafiye'], 'yok-tok')]
          ]
        },
        {
          lines: [
            [w('Sâye-i'), w('saadetinde'), w('bin'), w('âlem'), w('nûrân'), wt('olur,', ['kafiye'], 'olur')],
            [w('Sâye-i'), w('saadetinde'), w('bin'), w('âlem'), w('nûrân'), wt('olur.', ['kafiye'], 'olur')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: 'Redif yoktur. Gazel nazım şeklinde redif kullanılmaz, sadece kafiye vardır.', count: 0 },
        kafiye: { description: 'Düz kafiye. 1.-2. mısra (dir-dir), 3.-4. mısra (olur-olur), 5.-6. mısra (yok-tok), 7.-8. mısra (olur-olur) kafiyelidir.', count: 8 },
        olcu: { description: 'Aruz ölçüsü — Fâilâtün / Fâilâtün / Fâilâtün / Fâilün kalıbı.', count: 8 },
        nazimBirimi: { description: 'Beyit (ikişer mısradan oluşan birim).', count: 4 },
        edebiSanat: { description: '', count: 0 },
        tema: { description: 'İstanbul\'un güzelliği, ihtişamı ve manevi değeri.', count: 0 },
        konu: { description: 'İstanbul\'un eşsizliği, cennete benzerliği.', count: 0 }
      }
    },
    color: '#8b5cf6',
    gradientFrom: 'from-purple-700',
    gradientTo: 'to-indigo-900',
    emoji: '📜',
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
    years: '1526 – 1600',
    period: 'Divan Edebiyatı',
    periodCode: 'divan',
    movement: 'Klasik Divan Şiiri',
    bio: '"Sultanü\'ş-Şuara" (Şairlerin Sultanı) unvanıyla anılan Baki, 1526\'da İstanbul\'da doğmuştur. Babası Fatih Camii müezzinlerindendi. Gençliğinde esnaf yanında çıraklık yapmış, ardından medreseye girerek dönemin ünlü müderrislerinden ders almıştır. Kanuni Sultan Süleyman\'ın himayesini görmüş, II. Selim, III. Murad ve III. Mehmed dönemlerinde de itibarını korumuştur. Rindane gazelleri ve Kanuni Mersiyesi ile divan şiirinin zirvesine ulaşmıştır.',
    mainPoem: {
      id: 'baki-poem',
      title: 'Kanuni Mersiyesi',
      form: 'Mersiye',
      period: 'Divan Edebiyatı',
      bio: 'Kanûnî Sultan Süleyman\'ın ölüm yıldönümünde (6 Eylül) İstanbul\'da dolaşan ruhunun hissedilmesi, onun İstanbul\'u fethettiği gecenin anılması.',
      stanzas: [
        {
          lines: [
            [w('Efsunî'), w('bir'), w('bahar'), wt('gecesidir', ['kafiye'], 'Kafiye: gece'), w('bu'), wt('gece,', ['kafiye'], '')],
            [w('Şu'), w('gök'), w('kubbe'), w('altında'), w('nice'), w('nice'), wt('gece!', ['kafiye'], '')],
            [w('Bu'), w('gece'), w('Sultan'), w("Süleyman'ın"), w('ruhu'), wt('gezer,', ['kafiye'], 'Kafiye: gezer')],
            [wt('Bu', ['redif'], 'Redif: Bu gece Kanûnî Sultan Süleyman gezer'), wt('gece', ['redif'], ''), wt('Kanûnî', ['redif'], ''), wt('Sultan', ['redif'], ''), wt('Süleyman', ['redif'], ''), wt('gezer.', ['redif'], '')]
          ]
        },
        {
          lines: [
            [w('Bir'), w('efsunlu'), w('bahar'), wt('gecesidir', ['kafiye'], ''), w('bu'), wt('gece,', ['kafiye'], '')],
            [w('Şu'), w('gök'), w('kubbe'), w('altında'), w('nice'), w('nice'), wt('gece!', ['kafiye'], '')],
            [w('Bu'), w('gece'), w('Sultan'), w("Süleyman'ın"), w('ruhu'), wt('gezer,', ['kafiye'], '')],
            [wt('Bu', ['redif'], 'Redif'), wt('gece', ['redif'], ''), wt('Kanûnî', ['redif'], ''), wt('Sultan', ['redif'], ''), wt('Süleyman', ['redif'], ''), wt('gezer.', ['redif'], '')]
          ]
        },
        {
          lines: [
            [w('O,'), w('bu'), w("şehr-i"), w("Stanbul'u"), w('aldığı'), wt('gecedir,', ['kafiye'], 'Kafiye: gecedir')],
            [w('Bu,'), w('onun'), w('ruhunun'), w('dolaştığı'), wt('gecedir.', ['kafiye'], '')],
            [w('Bu'), w('gece'), w('Sultan'), w("Süleyman'ın"), w('ruhu'), wt('gezer,', ['kafiye'], '')],
            [wt('Bu', ['redif'], 'Redif'), wt('gece', ['redif'], ''), wt('Kanûnî', ['redif'], ''), wt('Sultan', ['redif'], ''), wt('Süleyman', ['redif'], ''), wt('gezer.', ['redif'], '')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: '"Bu gece Kanûnî Sultan Süleyman gezer" — tekrarlanır.', count: 12 },
        kafiye: { description: 'Düz kafiye. gece-gece, gezer-gezer, gecedir-gecedir kafiyelidir.', count: 6 },
        olcu: { description: 'Hece ölçüsü — 11\'li hece ölçüsü.', count: 8 },
        nazimBirimi: { description: 'Dörtlük (Bent).', count: 2 },
        edebiSanat: { description: '', count: 0 },
        tema: { description: 'Ölüm / Tarihî şahsiyeti anma.', count: 0 },
        konu: { description: 'Kanûnî Sultan Süleyman\'ın ölüm yıldönümünde ruhunun hissedilmesi.', count: 0 }
      }
    },
    color: '#6366f1',
    gradientFrom: 'from-indigo-700',
    gradientTo: 'to-purple-900',
    emoji: '👑',
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
    years: '1606 – 1679',
    period: 'Halk Edebiyatı',
    periodCode: 'halk',
    movement: 'Aşık Edebiyatı',
    bio: '17. yüzyılda yaşamış, Türk halk edebiyatının en büyük aşık şairlerinden biridir. Göçebe Türkmen obalarında yetişmiş, hayatını Çukurova, Toroslar ve çevresinde geçirmiştir. Doğa sevgisi, beşeri aşk ve Anadolu coğrafyasını sade ve duru bir Türkçeyle şiire taşımıştır. Divan etkisinden tamamen uzak, saf halk diliyle yazan ilk büyük aşık şairlerdendir. Günümüze 500\'den fazla şiiri ulaşmıştır.',
    mainPoem: {
      id: 'karacaoglan-poem',
      title: 'Köroğlu Koşması',
      form: 'Koşma',
      period: 'Halk Edebiyatı',
      bio: 'Köroğlu\'nun hiddetli bir şekilde atı Mahmur\'a binerek gelişi anlatılır. Destan geleneğinin tekrarlı anlatım özelliği görülür.',
      stanzas: [
        {
          lines: [
            [w('Köroğlu'), w('geliyor'), wt('hiddetli,', ['kafiye'], 'Kafiye: hiddetli')],
            [w('Atı'), w('Mahmura'), w('binmiş'), wt('gitmiş.', ['kafiye'], 'Kafiye: gitmiş')],
            [w('Köroğlu'), w('geliyor'), wt('hiddetli,', ['kafiye'], '')],
            [w('Atı'), w('Mahmura'), w('binmiş'), wt('gitmiş.', ['kafiye'], '')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: 'Redif yoktur.', count: 0 },
        kafiye: { description: 'Düz kafiye. 1.-2. mısra (hiddetli-gitmiş) kafiyelidir.', count: 4 },
        olcu: { description: 'Hece ölçüsü — 7+7=14\'lü hece ölçüsü.', count: 4 },
        nazimBirimi: { description: 'Dörtlük (Bent).', count: 1 },
        edebiSanat: { description: '', count: 0 },
        tema: { description: 'Kahramanlık / Yiğitlik.', count: 0 },
        konu: { description: 'Köroğlu\'nun hiddetli bir şekilde atı Mahmur\'a binerek gelişi.', count: 0 }
      }
    },
    color: '#ef4444',
    gradientFrom: 'from-red-700',
    gradientTo: 'to-rose-900',
    emoji: '🎸',
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
    years: '1840 – 1888',
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
            [w('Ey'), w('şehid'), w('oğlu'), w('şehid,'), w('isteme'), w('benden'), wt('makber,', ['kafiye'], 'Kafiye: makber-Peygamber')],
            [w('Sana'), w('âgûşunu'), w('açmış'), w('duruyor'), wt('Peygamber.', ['kafiye'], '')]
          ]
        },
        {
          lines: [
            [w('Hür'), w('yaşamış,'), w('hür'), w('yaşarım,'), w('hür'), w('yaşamam'), wt('hürriyetsiz,', ['redif', 'kafiye'], 'Redif: hürriyetsiz')],
            [w('Hürriyet'), w('uğruna'), w('can'), w('vermekten'), w('usanmam'), wt('hürriyetsiz.', ['redif', 'kafiye'], 'Redif: hürriyetsiz')]
          ]
        },
        {
          lines: [
            [w('Görüp'), w('ahkâm-ı'), w('asrı'), w('münharif'), w('sıdkü'), w('selâmetten,'), wt('makber,', ['kafiye'], '')],
            [w('Felek'), w('her'), w('türlü'), w('esbab-ı'), w('cefasın'), w('toplasın'), wt('gelsin.', ['kafiye'], '')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: '"Hüryetsiz" — mısralarda tekrarlanır.', count: 2 },
        kafiye: { description: 'Düz kafiye. makber-Peygamber, hüryetsiz-hüryetsiz.', count: 4 },
        olcu: { description: 'Aruz ölçüsü — Fâilâtün / Fâilâtün / Fâilâtün / Fâilün kalıbı.', count: 4 },
        nazimBirimi: { description: 'Beyit (ikişer mısradan oluşan birim).', count: 2 },
        edebiSanat: { description: '', count: 0 },
        tema: { description: 'Hürriyet / Vatan sevgisi.', count: 0 },
        konu: { description: 'Şehitlerin manevi değeri, hürriyetin önemi.', count: 0 }
      }
    },
    color: '#3b82f6',
    gradientFrom: 'from-blue-700',
    gradientTo: 'to-cyan-900',
    emoji: '🗽',
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
    years: '1867 – 1915',
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
            [w('Gözlerim'), w('kapalı,'), w('başımı'), w('geriye'), wt('atmış,', ['kafiye'], '')],
            [w('Bir'), w('şey'), w('düşünmeden,'), w('sadece'), wt('hissederek,', ['kafiye'], '')],
            [w('Sisli'), w('bir'), w('akşamda,'), w("İstanbul'un"), wt('boğazında,', ['kafiye'], '')],
            [w('Bir'), w('vapurdum,'), w('sessizce'), wt('ilerleyerek.', ['kafiye'], '')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: 'Redif yoktur.', count: 0 },
        kafiye: { description: 'Yarım uyaklar. atmış-hissederek, boğazında-ilerleyerek gibi yarım uyaklar vardır.', count: 4 },
        olcu: { description: 'Serbest ölçü.', count: 4 },
        nazimBirimi: { description: 'Dörtlük (Bent).', count: 1 },
        edebiSanat: { description: '', count: 0 },
        tema: { description: 'Hüzün / Melankoli.', count: 0 },
        konu: { description: 'Şair, sisli bir akşamda Boğaz\'da bir vapurda hissettiklerini anlatır.', count: 0 }
      }
    },
    color: '#0891b2',
    gradientFrom: 'from-cyan-700',
    gradientTo: 'to-blue-900',
    emoji: '🌫️',
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
    years: '1873 – 1936',
    period: 'Milli Edebiyat',
    periodCode: 'milli',
    movement: 'Milli Edebiyat – İslam Birliği',
    bio: '"Milli Şair" olarak bilinen Mehmet Akif Ersoy, İstiklal Marşı\'nın yazarıdır. Veteriner hekim, öğretmen ve milletvekili olarak görev yapmıştır. İslamcılık akımının öncülerinden olup, toplumsal sorunları ve milli duyguları güçlü bir dille anlatmıştır. Aruz ölçüsüyle halk diliyle yazmayı başaran nadir şairlerdendir. "Safahat" adlı yedi ciltlik şiir külliyatı dönemi en iyi yansıtan eserdir.',
    mainPoem: {
      id: 'mehmet-akif-poem',
      title: 'İstiklal Marşı',
      form: 'Kaside',
      period: 'Milli Edebiyat',
      bio: 'Türk milletinin istiklaline olan inancı, bayrağın ve vatanın kutsallığı, bağımsızlık uğruna kan dökmeye hazır olma anlatılır.',
      stanzas: [
        {
          lines: [
            [w('Korkma,'), w('sönmez'), w('bu'), w('şafaklarda'), w('yüzen'), w('al'), wt('sancak;', ['kafiye'], 'Kafiye: sancak-ocak')],
            [w('Sönmeden'), w('yurdumun'), w('üstünde'), w('tüten'), w('en'), w('son'), wt('ocak.', ['kafiye'], '')],
            [w('O'), w('benim'), w('milletimin'), w('yıldızıdır,'), wt('parlayacak;', ['kafiye'], 'Kafiye: parlayacak-ancak')],
            [w('O'), w('benimdir,'), w('o'), w('benim'), w('milletimindir'), wt('ancak.', ['kafiye'], '')]
          ]
        },
        {
          lines: [
            [w('Çatma,'), w('kurban'), w('olayım,'), w('çehreni'), w('ey'), w('nazlı'), wt('hilâl!', ['kafiye'], 'Kafiye: hilâl-celâl')],
            [w('Kahraman'), w('ırkıma'), w('bir'), w('gül...'), w('Ne'), w('bu'), w('şiddet,'), w('bu'), wt('celâl?', ['kafiye'], '')],
            [w('Sana'), w('olmaz'), w('dökülen'), w('kanlarımız'), w('sonra'), wt('helâl;', ['kafiye'], 'Kafiye: helâl-istiklâl')],
            [w('Hakkıdır,'), w("Hakk'a"), w('tapan,'), w('milletimin'), wt('istiklâl.', ['kafiye'], '')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: 'Redif yoktur.', count: 0 },
        kafiye: { description: 'Düz kafiye. sancak-ocak, parlayacak-ancak, hilâl-celâl, helâl-istiklâl.', count: 8 },
        olcu: { description: 'Aruz ölçüsü.', count: 8 },
        nazimBirimi: { description: 'Dörtlük (Kıta).', count: 2 },
        edebiSanat: { description: '', count: 0 },
        tema: { description: 'Vatan sevgisi / İstiklal.', count: 0 },
        konu: { description: 'Türk milletinin istiklaline olan inancı.', count: 0 }
      }
    },
    color: '#dc2626',
    gradientFrom: 'from-red-700',
    gradientTo: 'to-red-900',
    emoji: '🇹🇷',
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
      form: 'Koşma',
      period: 'Milli Edebiyat',
      bio: 'Şair, dünyanın ateşlerle sarıldığını, ölümden evvel ölümü görmek istediğini, dünyanın bir ucuna kaçma arzusunu anlatır.',
      stanzas: [
        {
          lines: [
            [w('Artık'), w('demir'), w('alsak'), w('mıranadan'), wt('gidelim,', ['kafiye'], 'Kafiye: gidelim')],
            [w('Dört'), w('tarafı'), w('sarmış'), w('ateşlerden'), wt('gidelim.', ['kafiye'], '')],
            [wt('Dünyanın', ['redif'], 'Redif: tekrarlanan satır'), wt('bir', ['redif'], ''), wt('ucuna', ['redif'], ''), wt('gidelim,', ['redif'], '')],
            [wt('Dünyanın', ['redif'], ''), wt('bir', ['redif'], ''), wt('ucuna', ['redif'], ''), wt('gidelim.', ['redif'], '')]
          ]
        },
        {
          lines: [
            [w('Bir'), w('gün'), w('herkes'), w('ölür,'), w('bilinmez'), w('ne'), wt('zamandır,', ['kafiye'], 'Kafiye: zamandır-fayda')],
            [w('Ölümden'), w('evvel'), w('ölümü'), w('görmektir'), wt('fayda.', ['kafiye'], '')],
            [wt('Dünyanın', ['redif'], 'Redif'), wt('bir', ['redif'], ''), wt('ucuna', ['redif'], ''), wt('gidelim,', ['redif'], '')],
            [wt('Dünyanın', ['redif'], ''), wt('bir', ['redif'], ''), wt('ucuna', ['redif'], ''), wt('gidelim.', ['redif'], '')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: '"Dünyanın bir ucuna gidelim" — tekrarlanır.', count: 16 },
        kafiye: { description: 'Düz kafiye. gidelim-gidelim, zamandır-fayda.', count: 4 },
        olcu: { description: 'Hece ölçüsü.', count: 8 },
        nazimBirimi: { description: 'Dörtlük (Bent).', count: 2 },
        edebiSanat: { description: '', count: 0 },
        tema: { description: 'Ölüm / Kaçış.', count: 0 },
        konu: { description: 'Dünyadan uzaklaşma arzusu.', count: 0 }
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
    years: '1898 – 1973',
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
            [w('Duvarlara'), w('konan'), wt('gölgeler,', ['kafiye'], 'Kafiye: gölgeler-hatıra')],
            [w('Birer'), w('hayal,'), w('birer'), wt('hatıra.', ['kafiye'], '')],
            [w('Bu'), w('han'), w('ne'), w('kadar'), w('sessiz,'), w('ne'), w('kadar'), wt('kimsesiz,', ['kafiye'], 'Kafiye: kimsesiz-harabe')],
            [w('Ne'), w('kadar'), w('ıssız,'), w('ne'), w('kadar'), wt('harabe.', ['kafiye'], '')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: 'Redif yoktur.', count: 0 },
        kafiye: { description: 'Düz kafiye. gölgeler-hatıra, kimsesiz-harabe.', count: 4 },
        olcu: { description: 'Hece ölçüsü — 7+7=14\'lü hece ölçüsü.', count: 4 },
        nazimBirimi: { description: 'Dörtlük (Bent).', count: 1 },
        edebiSanat: { description: '', count: 0 },
        tema: { description: 'Yalnızlık / Hüzün.', count: 0 },
        konu: { description: 'Terk edilmiş bir hanın atmosferi.', count: 0 }
      }
    },
    color: '#d97706',
    gradientFrom: 'from-amber-700',
    gradientTo: 'to-orange-900',
    emoji: '🏚️',
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
    years: '1901 – 1967',
    period: 'Cumhuriyet Dönemi',
    periodCode: 'cumhuriyet',
    movement: 'Cumhuriyet Dönemi – Halk Geleneği',
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
            [w('Gözü'), w('yaşlı,'), w('gönlü'), w('kırık,'), w('başı'), wt('önde,', ['kafiye'], 'Kafiye: önde-arar')],
            [w('Sokaklarda'), w('dolaşırım'), w('seni'), wt('arar.', ['kafiye'], '')],
            [w('Bir'), w('ses,'), w('bir'), w('nefes,'), w('bir'), w('izin'), wt('olsaydı,', ['kafiye'], 'Kafiye: olsaydı-nerelerde')],
            [w('Bilirsin,'), w('bulurdum'), w('seni'), wt('nerelerde.', ['kafiye'], '')]
          ]
        },
        {
          lines: [
            [w('Gözü'), w('yaşlı,'), w('gönlü'), w('kırık,'), w('başı'), wt('önde,', ['kafiye'], '')],
            [w('Sokaklarda'), w('dolaşırım'), w('seni'), wt('arar.', ['kafiye'], '')],
            [w('Bir'), w('ses,'), w('bir'), w('nefes,'), w('bir'), w('izin'), wt('olsaydı,', ['kafiye'], '')],
            [w('Bilirsin,'), w('bulurdum'), w('seni'), wt('nerelerde.', ['kafiye'], '')]
          ]
        },
        {
          lines: [
            [w('Gözü'), w('yaşlı,'), w('gönlü'), w('kırık,'), w('başı'), wt('önde,', ['kafiye'], '')],
            [w('Sokaklarda'), w('dolaşırım'), w('seni'), wt('arar.', ['kafiye'], '')],
            [w('Bir'), w('ses,'), w('bir'), w('nefes,'), w('bir'), w('izin'), wt('olsaydı,', ['kafiye'], '')],
            [w('Bilirsin,'), w('bulurdum'), w('seni'), wt('nerelerde.', ['kafiye'], '')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: 'Redif yoktur.', count: 0 },
        kafiye: { description: 'Düz kafiye. 1.-2. mısra (önde-arar), 3.-4. mısra (olsaydı-nerelerde).', count: 6 },
        olcu: { description: 'Hece ölçüsü — 7+7=14\'lü hece ölçüsü.', count: 4 },
        nazimBirimi: { description: 'Dörtlük (Bent).', count: 1 },
        edebiSanat: { description: '', count: 0 },
        tema: { description: 'Yalnızlık / Ayrılık.', count: 0 },
        konu: { description: 'Kayıp birini arama.', count: 0 }
      }
    },
    color: '#7c3aed',
    gradientFrom: 'from-violet-700',
    gradientTo: 'to-purple-900',
    emoji: '🏔️',
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
      form: 'Gazel',
      period: 'Cumhuriyet Dönemi',
      bio: 'Şair, otuz beş yaşında hayatın ortasında olduğunu, Dante\'nin Inferno\'suna gönderme yaparak anlatır.',
      stanzas: [
        {
          lines: [
            [w('Yaş'), w('otuz'), w('beş!'), w('Yolun'), w('yarısı'), wt('eder,', ['kafiye'], 'Kafiye: eder-cevher')],
            [w('Dante'), w('gibi'), w('ortasındayız'), wt('ömrün.', ['kafiye'], 'Kafiye: ömrün-önün')],
            [w('Delikanlı'), w('çağımızdaki'), wt('cevher,', ['kafiye'], '')],
            [w('Yalvarırım,'), w('eğilme'), w('onun'), wt('önün.', ['kafiye'], '')]
          ]
        },
        {
          lines: [
            [w('Şakaklarıma'), w('kar'), w('mı'), w('yağdı'), w('ne'), wt('var?', ['kafiye'], 'Kafiye: var-halkalar')],
            [w('Benim'), w('mi'), w('Allah\'ım'), w('bu'), w('çizgili'), wt('yüz?', ['kafiye'], 'Kafiye: yüz-görünürsünüz')],
            [w('Ya'), w('gözler'), w('altındaki'), w('mor'), wt('halkalar?', ['kafiye'], '')],
            [w('Neden'), w('böyle'), w('düşman'), w('görünürsünüz'), wt('yüz,', ['kafiye'], '')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: 'Redif yoktur.', count: 0 },
        kafiye: { description: 'Düz kafiye. eder-ömrün, cevher-önün.', count: 4 },
        olcu: { description: 'Aruz ölçüsü.', count: 4 },
        nazimBirimi: { description: 'Dörtlük (Bent).', count: 1 },
        edebiSanat: { description: '', count: 0 },
        tema: { description: 'Yaşlanma / Hayatın anlamı.', count: 0 },
        konu: { description: 'Otuz beş yaşında hayatın ortasında olma duygusu.', count: 0 }
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
            [w('Gözlerim'), w('kapalı')],
            [w('Kulaklarımı'), w('dayadım,')],
            [w('İnce'), w('bir'), w('duvara')],
            [w('Karşıdan'), w('vapur'), w('sesleri'), w('geliyor')],
            [w('Ve'), w('limandan'), w('uzaklaşan'), w('bir'), w('şeylerin'), w('hüznü')],
            [w('Ve'), w('her'), w('şeyde'), w('batan'), w('güneşin')],
            [w('Ve'), w('Yalılarda'), w('ölen'), w('günün')],
            [w('Ve'), w('Yelkenlere'), w('karşı'), w('koyan'), w('dalgaların')],
            [w('Ve'), w('kadınların,'), w('kocalarının,'), w('annelerinin')],
            [w('Ve'), w('ağlayan'), w('çocukların')],
            [w('Ve'), w('hüzünlü'), w('gemilerin')],
            [w('Ve'), w('bütün'), w('bunların'), w('üstüne'), w('çöken'), wt('akşamın', ['kafiye'], 'Kafiye: akşamın (3 kez tekrar)')],
            [w('Ve'), w('bütün'), w('bunların'), w('üstüne'), w('çöken'), wt('akşamın', ['kafiye'], '')],
            [w('Ve'), w('bütün'), w('bunların'), w('üstüne'), w('çöken'), wt('akşamın', ['kafiye'], '')],
            [w('Hüznünü'), w('dinliyorum')],
            [wt("İstanbul'u", ['redif'], "Redif: İstanbul'u dinliyorum — yalnızca son mısrada"), wt('dinliyorum.', ['redif'], '')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: '"İstanbul\'u dinliyorum" — Şiirin yalnızca son mısrasında tekrarlanır (1 kez).', count: 2 },
        kafiye: { description: 'Serbest kafiye. akşamın (3 kez tekrar), geliyor-hüznü, günün-dalgaların gibi yarım uyaklar.', count: 3 },
        olcu: { description: 'Serbest ölçü (Hece ölçüsüne yakın ama tam olarak uymaz).', count: 16 },
        nazimBirimi: { description: 'Tek bir bütün (tek kıta). Mısra sayısı serbesttir.', count: 1 },
        edebiSanat: { description: '', count: 0 },
        tema: { description: 'İstanbul / Hüzün.', count: 0 },
        konu: { description: 'Şehrin seslerini dinleyerek duygusal bir bağ kurma.', count: 0 }
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
  },
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
