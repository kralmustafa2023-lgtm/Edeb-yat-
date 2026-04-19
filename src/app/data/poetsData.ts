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
// POEM 1: "Otuz Beş Yaş" – Cahit Sıtkı Tarancı
// ─────────────────────────────────────────────────────────────────────────────
const otuzBesYas: Poem = {
  id: 'otuz-bes-yas',
  title: 'Otuz Beş Yaş',
  form: '11\'li Hece Ölçüsü · Bent',
  period: 'Cumhuriyet Dönemi',
  bio: 'Cahit Sıtkı Tarancı\'nın 1946\'da yazdığı başyapıtıdır. İnsanın ömür yolculuğunu, gençliğin yitişini, yaşlanma ve ölüm korkusunu eşsiz bir ahenkle anlatır.',
  stanzas: [
    {
      lines: [
        [wt('Yaş', ['olcu'], '11\'li hece: İlk hece'), w('otuz'), w('beş!'), w('yolun'), w('yarısı'), a('ed'), at('er.', ['kafiye'], 'Tam Kafiye: -er')],
        [wt('Dante', ['edebiSanat'], 'Telmih (Dante\'nin İlahi Komedya\'sına gönderme)'), w('gibi'), w('ortasındayız'), a('ömr'), at('ün.', ['kafiye'], 'Tam Kafiye: -ün')],
        [w('Delikanlı'), w('çağımızdaki'), a('cevh'), at('er,', ['kafiye'], 'Tam Kafiye: -er')],
        [w('Yalvarmak,'), w('yakarmak'), w('nafile'), a('bug'), at('ün,', ['kafiye'], 'Tam Kafiye: -ün')],
        [w('Gözünün'), w('yaşına'), w('bakmadan'), a('gid'), at('er.', ['kafiye'], '')],
      ],
    },
    {
      lines: [
        [w('Şakaklarıma'), w('kar'), w('mı'), w('yağdı'), w('ne'), a('v'), at('ar?', ['kafiye'], 'Tam Kafiye: -ar (Redif yok çünkü \"var\" kök)')],
        [w('Benim'), w('mi'), w('Allah\'ım'), w('bu'), w('çizgili'), a('y'), at('üz?', ['kafiye'], 'Tam Kafiye: -üz')],
        [w('Ya'), w('gözler'), w('altındaki'), w('mor'), a('halkal'), at('ar?', ['kafiye'], 'Tam Kafiye: -ar')],
        [w('Neden'), w('böyle'), wt('düşman', ['tema'], 'Tema: kendine yabancılaşma'), a('görünürsün'), at('üz,', ['kafiye'], 'Tam Kafiye: -üz')],
        [wt('Yıllar', ['edebiSanat', 'olcu'], 'Tekrir ve Hece 1-2'), wt('yılı', ['edebiSanat', 'olcu'], ''), w('dost'), w('bildiğim'), a('aynal'), at('ar?', ['kafiye'], 'Tam Kafiye: -ar')],
      ],
    },
    {
      lines: [
        [w('Zamanla'), w('nasıl'), w('değişiyor'), a('ins'), at('an!', ['kafiye'], 'Tam Kafiye: -an')],
        [w('Hangi'), w('resmime'), w('baksam'), w('ben'), a('değil'), at('im.', ['redif'], 'Redif: değilim kelimesi (redif olarak tekrar eeder)')],
        [w('Nerde'), w('o'), w('günler,'), w('o'), w('şevk,'), w('o'), a('heyec'), at('an?', ['kafiye'], 'Tam Kafiye: -an')],
        [w('Bu'), w('güler'), w('yüzlü'), w('adam'), w('ben'), a('değil'), at('im;', ['redif'], '')],
        [w('Yalandır'), w('kaygısız'), w('olduğum'), a('yal'), at('an.', ['kafiye'], 'Tam Kafiye: -an')],
      ],
    },
    {
      lines: [
        [w('Hayal'), w('meyal'), w('şeylerden'), w('ilk'), a('aşk'), at('ımız;', ['redif'], 'Redif: -ımız eki')],
        [w('Hatırası'), w('bile'), w('yabancı'), a('gel'), at('ir.', ['kafiye'], 'Tam Kafiye: -ir')],
        [w('Hayata'), w('beraber'), a('başladığ'), at('ımız,', ['redif'], 'Redif: -ımız eki')],
        [w('Dostlarla'), w('da'), w('yollar'), w('ayrıldı'), w('bir'), a('b'), at('ir;', ['kafiye'], '')],
        [w('Gittikçe'), w('artıyor'), a('yalnızlığ'), at('ımız.', ['redif'], 'Redif: -ımız eki')],
      ],
    },
    {
      lines: [
        [w('Gökyüzünün'), w('başka'), w('rengi'), w('de'), a('v'), at('ar', ['kafiye'], 'Tam Kafiye: -ar'), at('mış!', ['redif'], 'Redif: -miş/mış ek eylem')],
        [w('Geç'), w('farkettim'), a('s'), at('ert', ['kafiye'], 'Zengin Kafiye: -ert'), a('olduğun'), at('u.', ['redif'], 'Redif: olduğunu sözcüğü')],
        [w('Su'), wt('insanı', ['edebiSanat'], 'İntak / Teşhis: Suyun boğması'), w('boğar,'), w('ateş'), a('yak'), at('ar', ['kafiye'], ''), at('mış!', ['redif'], '')],
        [w('Her'), w('doğan'), w('günün'), w('bir'), a('d'), at('ert', ['kafiye'], ''), a('olduğun'), at('u,', ['redif'], '')],
        [w('İnsan'), w('bu'), w('yaşa'), w('gelince'), a('anl'), at('ar', ['kafiye'], ''), at('mış.', ['redif'], '')],
      ],
    },
    {
      lines: [
        [w('Ayva'), wt('sarı', ['konu'], ''), w('nar'), wt('kırmızı', ['konu'], 'Konu: Sonbahar imgeleri'), a('sonbah'), at('ar!', ['kafiye'], 'Tam Kafiye: -ar')],
        [w('Her'), w('yıl'), w('biraz'), w('daha'), a('benimsediğ'), at('im.', ['kafiye'], 'Yarım kafiye: -im')],
        [w('Ne'), w('dönüp'), w('duruyor'), w('havada'), a('kuşl'), at('ar?', ['kafiye'], 'Tam Kafiye: -ar')],
        [w('Nerden'), w('çıktı'), w('bu'), w('cenaze?'), w('Ölen'), a('k'), at('im?', ['kafiye'], '')],
        [w('Bu'), w('kaçıncı'), w('bahçe'), w('gördüm'), a('tarum'), at('ar?', ['kafiye'], 'Tam Kafiye: -ar')],
      ],
    },
    {
      lines: [
        [w('N\'eylersin'), wt('ölüm', ['tema'], 'Tema: Ölüm'), w('herkesin'), a('baş'), at('ında.', ['redif'], 'Redif: -ında eki')],
        [w('Uyudun'), w('uyanamadın'), at('olacak.', ['redif'], 'Redif: olacak sözcüğü')],
        [w('Kimbilir'), w('nerde,'), w('nasıl,'), w('kaç'), a('yaş'), at('ında?', ['redif'], 'Redif: -ında eki')],
        [w('Bir'), w('namazlık'), w('saltanatın'), at('olacak,', ['redif'], '')],
        [w('Taht'), wt('misali', ['edebiSanat'], 'Teşbih: Musalla taşı tahta benzetilmiş'), w('o'), w('musalla'), a('taş'), at('ında.', ['redif'], '')],
      ],
    },
  ],
  analysisDetails: {
    redif: { description: 'Şiirde "-ında, -ımız" gibi ek rediflerin yanında "değilim, olmak" gibi sözcük halinde redifler kullanılmıştır.', count: 12 },
    kafiye: { description: 'Her bentte (a b a b a) kafiye düzeni hâkimdir. Tam kafiyeler ve zengin kafiyeler şiirin ahengini güçlendirir.', count: 21 },
    olcu: { description: 'Şiir bütünüyle 11\'li hece ölçüsüyle yazılmıştır.', count: 4 },
    nazimBirimi: { description: 'Beş dizeden oluşan bentler kullanılmıştır. Toplam 7 bentten oluşur.', count: 0 },
    edebiSanat: { description: 'Telmih (Dante\'ye), Teşbih (musalla taşı - taht) ve İstifham (Soru sorma: Benim mi Allah\'ım bu çizgili yüz) sanatları yoğundur.', count: 5 },
    tema: { description: 'Gençliğin yitişi, yaşlanma hüznü, ölüm gerçeği ve değişen dünya.', count: 3 },
    konu: { description: 'Şairin 35. yaş dönemine girerek hayatı, ölümü ve geçmiş günleri sorgulaması.', count: 3 },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// POEM 2: "İstanbul'u Dinliyorum" – Orhan Veli Kanık
// ─────────────────────────────────────────────────────────────────────────────
const istanbulPoem: Poem = {
  id: 'istanbul-dinliyorum',
  title: 'İstanbul\'u Dinliyorum',
  form: 'Serbest Şiir · Bent',
  period: 'Cumhuriyet Dönemi (Garip Akımı)',
  bio: 'Orhan Veli\'nin en ünlü şiirlerinden biri olan bu eser, şairin gözlerini kapatarak İstanbul\'un seslerini hayal etmesi üzerine kuruludur.',
  stanzas: [
    {
      lines: [
        [wt('İstanbul\'u', ['konu', 'redif'], 'Konu: İstanbul şiirin merkezinde'), wt('dinliyorum,', ['konu', 'edebiSanat', 'redif'], 'Kişileştirme: Şehri "duymak" insani bir eylem; Nakarat başlangıcı'), wt('gözlerim', ['redif'], 'Redif: Her bendin başı ve sonu bu dizeyle açılır/kapanır'), wt('kapalı;', ['redif'], 'Nakarat – şiirin "redif" özelliği')],
        [w('Önce'), wt('hafiften', ['olcu'], 'Ses imgesi: yumuşak, hafif'), w('bir'), wt('rüzgar', ['tema'], 'Tema: Doğa ve şehir iç içe'), w('esiyor;')],
        [wt('Yavaş', ['edebiSanat', 'olcu'], 'Tekrir: "Yavaş yavaş" pekiştirme; Aliterasyon: "y" sesi'), wt('yavaş', ['edebiSanat', 'olcu'], ''), w('sallanıyor')],
        [wt('Yapraklar,', ['tema'], 'Tema: Doğa unsurları'), w('ağaçlarda;')],
        [wt('Uzaklarda,', ['edebiSanat'], 'Tekrir: "uzaklarda, çok uzaklarda" - mesafeyi pekiştirme'), w('çok'), wt('uzaklarda,', ['edebiSanat'], '')],
        [wt('Sucuların', ['konu', 'olcu'], 'Konu: İstanbul\'a özgü ses; Ses imgesi'), w('hiç'), w('durmayan'), wt('çıngırakları', ['konu', 'olcu'], 'Ses imgesi – işitsel imge')],
        [wt('İstanbul\'u', ['konu', 'redif'], ''), wt('dinliyorum,', ['redif', 'edebiSanat'], 'Kişileştirme + Nakarat sonu'), wt('gözlerim', ['redif'], ''), wt('kapalı.', ['redif'], 'Nakaratın kapanışı')],
      ],
    },
    {
      lines: [
        [wt('İstanbul\'u', ['konu', 'redif'], ''), wt('dinliyorum,', ['redif', 'edebiSanat'], ''), wt('gözlerim', ['redif'], ''), wt('kapalı;', ['redif'], '')],
        [wt('Kuşların', ['tema', 'olcu'], 'Ses imgesi: kuş sesi'), w('cıvıltısı,'), wt('ıslak', ['konu'], 'İstanbul\'un yağmurlu havası'), w('bahçelerde,')],
        [wt('Kanatların', ['olcu'], 'Ses imgesi: kanat sesi – aliterasyon "k"'), w('uğultusu,'), w('alçaktan'), w('geçişlerin,')],
        [wt('Tahta', ['konu'], 'İstanbul\'a özgü mekân'), w('köprüdeki'), wt('poyraz', ['tema', 'olcu'], 'Ses + doğa imgesi: rüzgâr sesi')],
        [wt('İstanbul\'u', ['konu', 'redif'], ''), wt('dinliyorum,', ['redif', 'edebiSanat'], ''), wt('gözlerim', ['redif'], ''), wt('kapalı.', ['redif'], '')],
      ],
    },
    {
      lines: [
        [wt('İstanbul\'u', ['konu', 'redif'], ''), wt('dinliyorum,', ['redif', 'edebiSanat'], ''), wt('gözlerim', ['redif'], ''), wt('kapalı;', ['redif'], '')],
        [wt('Serin', ['edebiSanat', 'olcu'], 'Aliterasyon: "s" sesi – serin serin Kapalıçarşı'), wt('serin', ['edebiSanat', 'olcu'], ''), wt('Kapalıçarşı,', ['konu'], 'İstanbul\'a özgü mekân')],
        [wt('Cıvıl', ['edebiSanat', 'olcu'], 'Aliterasyon: "c" sesi; Ses yansıması (onomatope)'), wt('cıvıl', ['edebiSanat', 'olcu'], ''), wt('Mahmutpaşa,', ['konu'], '')],
        [wt('Güvercin', ['tema'], 'Tema: İstanbul\'un imgesi – güvercinler'), w('dolu'), w('avlular,')],
        [wt('Çekiç', ['olcu'], 'Ses yansıması: çekiç sesi'), w('sesleri,'), wt('tellerden', ['konu'], ''), w('geçen'), wt('tramvaylar,', ['konu', 'olcu'], 'İstanbul\'a özgü ses')],
        [wt('Martıların', ['tema', 'konu', 'olcu'], 'İstanbul\'un simgesi + ses imgesi'), w('açık'), w('denizde')],
        [wt('İstanbul\'u', ['konu', 'redif'], ''), wt('dinliyorum,', ['redif', 'edebiSanat'], ''), wt('gözlerim', ['redif'], ''), wt('kapalı.', ['redif'], '')],
      ],
    },
    {
      lines: [
        [wt('İstanbul\'u', ['konu', 'redif'], ''), wt('dinliyorum,', ['redif', 'edebiSanat'], ''), wt('gözlerim', ['redif'], ''), wt('kapalı;', ['redif'], '')],
        [w('Büyük'), wt('yangın,', ['tema', 'konu'], 'İstanbul\'un tarihsel trajedisi'), w('ateşin'), w('düşüşü,')],
        [w('Uzak,'), w('yakın'), wt('çan', ['olcu', 'tema'], 'Ses imgesi: çan sesi'), w('sesleri,')],
        [wt('Minare', ['konu'], 'İstanbul\'un simgesi'), w('aralarından'), wt('ay', ['tema'], 'Tema: gece, huzur'), w('doğuyor,')],
        [w('Kağıtlar,'), w('camlar,'), w('duvarlar'), w('üstünden'), w('düşüyor,')],
        [wt('Yükseliyor', ['edebiSanat'], 'Kişileştirme: şehrin sesi yükseliyor'), w('geliyor'), wt('büyük', ['konu'], ''), w('şehrin'), wt('sesi', ['tema', 'olcu'], 'Ses teması')],
        [wt('İstanbul\'u', ['konu', 'redif'], ''), wt('dinliyorum,', ['redif', 'edebiSanat'], ''), wt('gözlerim', ['redif'], ''), wt('kapalı.', ['redif'], '')],
      ],
    },
  ],
  analysisDetails: {
    redif: { description: '"İstanbul\'u dinliyorum, gözlerim kapalı" dizesi her bendin başında ve sonunda tekrar eder. Bu dize şiirin nakaratıdır ve redif özelliği taşır.', count: 8 },
    kafiye: { description: 'Serbest şiir olduğundan geleneksel kafiye şeması yoktur. Ancak ses uyumu (aliterasyon ve asonans) belirgindir: "serin serin / cıvıl cıvıl" gibi.', count: 0 },
    olcu: { description: 'Şiir serbest vezinle yazılmıştır; hece ya da aruz kalıbı kullanılmamıştır. Ahenk, ses imgeleri (işitsel imgelem) ve aliterasyonla sağlanmıştır.', count: 10 },
    nazimBirimi: { description: 'Nazım birimi benttir. Şiir 4 bent\'ten oluşmakta, her bent farklı uzunluklarda dizeler içermekte ve "nakarat" dizesiyle açılıp kapanmaktadır.', count: 4 },
    edebiSanat: { description: 'Kişileştirme (İstanbul\'u "dinlemek"), Tekrir (yavaş yavaş, uzaklarda çok uzaklarda), Aliterasyon (serin serin Kapalıçarşı, cıvıl cıvıl Mahmutpaşa), Ses yansıması (çıngırak, çekiç)', count: 7 },
    tema: { description: 'Ana tema İstanbul sevgisi, şehre duyulan özlem ve nostaljidir. Gözlerini kapatan şair, şehri hayal ederek ona hasret çeker.', count: 8 },
    konu: { description: 'Konu: Şairin gözlerini kapatarak İstanbul\'un seslerini hayal etmesi. Sucuların çıngırakları, martıların sesi, tramvaylar gibi İstanbul\'a özgü sesler sıralanır.', count: 9 },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// POEM 3: "Nerdesin" – Ahmet Kutsi Tecer
// ─────────────────────────────────────────────────────────────────────────────
const nerdesinPoem: Poem = {
  id: 'nerdesin',
  title: 'Nerdesin',
  form: '8\'li Hece Ölçüsü · Dörtlük · Koşma',
  period: 'Cumhuriyet Dönemi',
  bio: 'Ahmet Kutsi Tecer\'in Anadolu sevgisini ve özlemini anlattığı bu şiir, halk edebiyatı geleneğiyle cumhuriyet dönemi şiirini birleştirir.',
  stanzas: [
    {
      lines: [
        [wt('Orda', ['konu'], 'Konu: Uzaktaki bir Anadolu köyü'), w('bir'), w('köy'), w('var'), w('uzakta,')],
        [w('O'), w('köy'), wt('bizim', ['tema'], 'Tema: Aidiyet, yurt sevgisi'), w('köyümüzdür.')],
        [w('Geçtim'), w('orda'), w('bir'), wt('kız', ['konu'], 'Konu: Özlem duyulan sevgili'), w('gördüm,')],
        [w('O'), w('kız'), w('bizim'), wt('kızımızdır.', ['kafiye'], 'Kafiye: köyümüzdür/kızımızdır – "-ızdır" tam kafiye')],
      ],
    },
    {
      lines: [
        [wt('Nerdesin,', ['redif', 'edebiSanat'], 'Redif: Nakarat – şiirin her yerine yayılmış; Nida sanatı'), wt('nerdesin,', ['redif', 'edebiSanat'], 'Tekrir: Aynı sorunun tekrarı özlemi pekiştirir'), wt('nerdesin?', ['redif', 'edebiSanat'], '')],
        [w('Seni'), wt('arıyorum', ['tema'], 'Tema: Arayış, özlem'), w('ben'), w('her'), w('yerde.')],
        [w('Dağlarda'), wt('mısın,', ['olcu'], '8\'li hece'), w('ovalarda'), w('mı?')],
        [wt('Söyle', ['edebiSanat'], 'Nida: Seslenme sanatı'), w('bana,'), wt('nerdesin?', ['redif'], 'Nakarat')],
      ],
    },
    {
      lines: [
        [wt('Anadolu\'nun', ['konu', 'tema'], 'Konu+Tema: Anadolu yurt sevgisi'), w('bağrında,')],
        [w('Binlerce'), w('köy'), w('var'), w('sarp'), w('kayalarda.')],
        [w('Her'), w('birinde'), wt('bir', ['edebiSanat'], 'Tekrir: "her birinde bir..." pekiştirme'), w('sevda'), wt('yanar,', ['tema'], 'Tema: Aşk, özlem')],
        [wt('Her', ['edebiSanat'], ''), w('birinde'), w('bir'), wt('özlem', ['tema'], 'Tema: Hasret'), wt('çağlar.', ['kafiye'], 'Kafiye: kayalarda/çağlar – yarım kafiye')],
      ],
    },
    {
      lines: [
        [wt('Nerdesin,', ['redif', 'edebiSanat'], ''), wt('nerdesin,', ['redif', 'edebiSanat'], ''), wt('nerdesin?', ['redif', 'edebiSanat'], '')],
        [w('Ben'), w('seni'), w('ararım'), w('her'), w('yerde.')],
        [wt('Serin', ['olcu'], 'Ses imgesi'), w('pınarlar,'), wt('güzel', ['tema'], ''), w('yollar,')],
        [wt('Nerdesin,', ['redif'], ''), wt('nerdesin?', ['redif'], 'Son nakarat – özlemin zirvesi')],
      ],
    },
    {
      lines: [
        [w('Dağlar'), wt('aşarım', ['edebiSanat'], 'Tekrir: aşarım aşarım – aşk için her şeyi göze alma'), wt('aşarım,', ['edebiSanat'], '')],
        [w('Dereler'), wt('geçerim', ['edebiSanat'], 'Tekrir: geçerim geçerim'), wt('geçerim.', ['edebiSanat', 'kafiye'], 'Kafiye: aşarım/geçerim – yarım kafiye')],
        [w('Seni'), w('aramaktan'), w('usanmam,')],
        [w('Seni'), wt('ararım', ['tema', 'olcu'], 'Tema: Sonsuz arayış, vazgeçmeme'), wt('ararım.', ['tema', 'kafiye'], 'Kafiye: usanmam/ararım')],
      ],
    },
  ],
  analysisDetails: {
    redif: { description: '"Nerdesin" sözcüğü şiirin her kıtasında nakarat olarak tekrar eder. Bu yapı koşma geleneğinden gelmektedir ve ozanın özlemini vurgular.', count: 8 },
    kafiye: { description: 'Şiirde yarım kafiye (köyümüzdür/kızımızdır, kayalarda/çağlar, aşarım/geçerim) kullanılmıştır. Kafiye şeması koşma geleneğine uygun olarak düzenlenmiştir.', count: 5 },
    olcu: { description: 'Şiir 8\'li hece ölçüsüyle yazılmıştır. Her dize 8 heceden oluşur. Bu ölçü, halk şiiri geleneğine bağlılığı gösterir.', count: 6 },
    nazimBirimi: { description: 'Nazım birimi dörtlüktür. Şiir 5 dörtlükten oluşmakta; nakarat dörtlüğü iki kez tekrar etmektedir. Bu yapı koşma biçimine yakındır.', count: 5 },
    edebiSanat: { description: 'Nida (Nerdesin!), Tekrir (nerdesin nerdesin, aşarım aşarım, geçerim geçerim, her birinde bir), Kişileştirme (sevda yanar, özlem çağlar)', count: 8 },
    tema: { description: 'Ana tema hasret ve arayıştır. Şair, Anadolu\'da bıraktığı sevgilisine olan özlemini dağları aşarak, dereleri geçerek arama kararlılığıyla anlatır.', count: 7 },
    konu: { description: 'Konu: Uzak bir Anadolu köyünde geride kalan bir kıza duyulan özlem ve onu arama yolculuğu. Şiir Anadolu coğrafyasına ve kültürüne duyulan sevgiyi yansıtır.', count: 5 },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// OTHER POETS (with shorter poem data)
// ─────────────────────────────────────────────────────────────────────────────
const yunusEmrePoem: Poem = {
  id: 'yunus-ilahi',
  title: 'Ben Yürürüm Yane Yane',
  form: 'İlahi · 8\'li Hece · Dörtlük',
  period: 'Tekke Edebiyatı',
  bio: 'Yunus Emre\'nin tasavvuf anlayışını ve Allah\'a olan sevgisini dile getirdiği bu ilahi, sade diliyle asırlardır okunmaktadır.',
  stanzas: [
    {
      lines: [
        [w('Ben'), wt('yürürüm', ['olcu'], '8\'li hece'), wt('yane', ['edebiSanat'], 'Aliterasyon: "y" sesi'), wt('yane,', ['edebiSanat', 'redif'], 'Redif: yane'), wt('aşk', ['tema'], 'Tema: ilahi aşk'), w('boynuma')],
        [w('dolanmış'), wt('zincir', ['edebiSanat'], 'Teşbih: Aşk zincire benzetilmiş'), wt('taktı', ['kafiye'], 'Kafiye: -ktı sesi'), w('kâhir')],
      ],
    },
    {
      lines: [
        [wt('Ne', ['tema'], ''), w('varlığa'), w('sevineyim,')],
        [w('Ne'), w('yokluğa'), wt('yereyim,', ['kafiye', 'redif'], 'Kafiye + Redif: -eyim')],
        [wt('Aşk', ['tema', 'konu'], 'Konu: İlahi aşk'), w('ile'), w('coşup'), wt('geleyim,', ['kafiye', 'redif'], '')],
        [w('Dost'), wt('yüzüne', ['tema'], 'Tema: Tanrı\'ya kavuşma'), w('bakmadan'), wt('gitsem.', ['nazimBirimi'], 'Dörtlüğün kapanışı')],
      ],
    },
  ],
  analysisDetails: {
    redif: { description: 'Dörtlüklerin sonunda "-eyim/-ayım" redifi kullanılmıştır. Bu, ilahi geleneğinin tipik özelliğidir.', count: 3 },
    kafiye: { description: '"-eyim" sesi tam kafiye oluşturur. Yunus\'un şiirlerinde genellikle tam ya da zengin kafiye tercih edilmiştir.', count: 3 },
    olcu: { description: '8\'li hece ölçüsüyle yazılmıştır. Tekke edebiyatında yaygın kullanılan bu ölçü halk tarafından kolayca benimsenir.', count: 2 },
    nazimBirimi: { description: 'Nazım birimi dörtlüktür. İlahi biçiminde yazılan şiir, her dörtlükle bir düşünceyi tamamlar.', count: 2 },
    edebiSanat: { description: 'Teşbih (aşkı zincire benzetme), Aliterasyon (yane yane), Tezat (varlık/yokluk)', count: 3 },
    tema: { description: 'İlahi aşk (Allah sevgisi), geçicilik ve dünyadan vazgeçiş temaları işlenmektedir.', count: 4 },
    konu: { description: 'Allah\'a kavuşma özlemi ve ilahi aşkın coşkusu içinde dünyanın geçiciliğini kabulleniş.', count: 3 },
  },
};

const fuzuliPoem: Poem = {
  id: 'fuzuli-gazel',
  title: 'Gazel (Beni candan usandırdı)',
  form: 'Gazel · Aruz Ölçüsü · Beyit',
  period: 'Divan Edebiyatı',
  bio: 'Fuzuli\'nin en ünlü gazellerinden biri olan bu eser, sevgilinin eziyetine ve şairin çaresiz aşkına dair derin bir anlatı sunar.',
  stanzas: [
    {
      lines: [
        [wt('Beni', ['konu'], 'Konu: Şairin sevgiliden şikâyeti'), w('candan'), w('usandırdı'), wt('cefadan', ['kafiye'], 'Kafiye: cefadan/şifadan/fedadan'), w('yar'), w('usanmaz')],
      ],
    },
    {
      lines: [
        [w('Felekten'), w('yüz'), w('bulur'), wt('devr-i', ['olcu'], 'Aruz ölçüsü'), w('devrandan'), wt('yar', ['redif'], 'Redif: yar'), w('usanmaz')],
      ],
    },
    {
      lines: [
        [w('Şikâyet'), w('vakti'), w('değil,'), w('kanın'), w('akıtma,')],
        [wt('Fuzuli,', ['edebiSanat'], 'Tecridi: Şair kendi adını kullanıyor – mahlas'), w('sabr'), wt('et.', ['tema'], 'Tema: sabır, çaresizlik')],
      ],
    },
  ],
  analysisDetails: {
    redif: { description: '"Yar usanmaz" ifadesi gazelin her beytinde tekrar eder. Bu gazel geleneklerine uygun redif kullanımıdır.', count: 3 },
    kafiye: { description: 'Cefadan/devran/şifadan sesleri kafiye oluşturur. Divan şiirinde aruzla uyumlu zengin kafiye kullanılır.', count: 4 },
    olcu: { description: 'Aruz ölçüsüyle yazılmıştır. "Mefâîlün feîlün mefâîlün feîlün" kalıbı kullanılmaktadır.', count: 3 },
    nazimBirimi: { description: 'Nazım birimi beyittir (2 dize). Gazel biçiminde 5-15 beyitten oluşur. Her beyit kendi içinde anlam bütünlüğü taşır.', count: 3 },
    edebiSanat: { description: 'Tecridi (şairin kendi adını kullanması – mahlas), Tezat (cefa/şifa), Mübalağa, İstiare', count: 4 },
    tema: { description: 'Aşkın acısı, sevgilinin eziyeti ve sabır. Fuzuli\'nin tasavvufi aşk anlayışı şiire yansımıştır.', count: 3 },
    konu: { description: 'Sevgilinin vefasızlığına karşın şairin ona olan aşkını sürdürmesi ve cefayı şifa olarak kabullenmesi.', count: 3 },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// POETS ARRAY
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
    mainPoem: yunusEmrePoem,
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
    mainPoem: fuzuliPoem,
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
      id: 'kanuni-mersiye',
      title: 'Kanuni Mersiyesi (İlk Bent)',
      form: 'Terkib-i Bent · Aruz Ölçüsü',
      period: 'Divan Edebiyatı',
      bio: 'Kanuni Sultan Süleyman\'ın ölümü üzerine yazılan bu mersiye, Türk edebiyatının en güçlü ağıt örneklerinden biridir.',
      stanzas: [
        {
          lines: [
            [w('Ey'), wt('şehinşah-ı', ['edebiSanat'], 'İstiare: Sultana "şahların şahı" hitabı'), wt('kerem', ['tema'], 'Tema: cömertlik, büyüklük'), w('kim'), w('feyz-i'), w('ihsanın'), wt('senin,', ['redif'], 'Redif: senin')],
            [wt('Dürr-i', ['edebiSanat'], 'Teşbih: söz inciye benzetilmiş'), w('şehvârı'), w('misâl'), w('oldur'), w('felek-sa'), wt('bahşiş', ['kafiye'], 'Kafiye: -iş sesi'), wt('senin.', ['redif'], '')],
          ],
        },
        {
          lines: [
            [w('Tutdu'), wt('âfâk-ı', ['konu'], 'Konu: Sultanın büyüklüğü ve ölümü'), w('cihânı'), wt('şöhretin', ['tema'], 'Tema: ün, büyüklük'), w('şimşek'), w('gibi,')],
            [wt('Gitdi', ['konu'], ''), w('ammâ'), w('gözde'), wt('bıraktın', ['tema'], 'Tema: ardında bırakılan iz'), w('bir'), w('hayal'), w('gibi.')],
          ],
        },
      ],
      analysisDetails: {
        redif: { description: '"Senin" redifi her beytin sonunda tekrar ederek padişahı yüceltir.', count: 2 },
        kafiye: { description: 'Zengin kafiye kullanılmıştır. "İhsanın/bahşiş" gibi anlam katkısı olan kafiyeler divan şiirinin özelliğidir.', count: 3 },
        olcu: { description: 'Aruz ölçüsüyle yazılmıştır. Terkib-i bent biçiminde her bent aynı vezinle düzenlenmiştir.', count: 2 },
        nazimBirimi: { description: 'Nazım birimi beyittir. Terkib-i bent biçiminde bentler halinde düzenlenmiştir.', count: 2 },
        edebiSanat: { description: 'İstiare (şehinşah), Teşbih (dürr-i şehvâr gibi), Mübalağa, Nida', count: 4 },
        tema: { description: 'Ölüm karşısında büyüklük, ayrılık acısı ve kalıcı iz bırakma teması işlenmiştir.', count: 3 },
        konu: { description: 'Kanuni Sultan Süleyman\'ın ölümü üzerine yazılan ağıt; padişahın büyüklüğünü ve kaybın yasını dile getirir.', count: 3 },
      },
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
      id: 'karacaoglan-kosma',
      title: 'Koşma (Boz bulanık akan sular)',
      form: '11\'li Hece · Koşma · Dörtlük',
      period: 'Halk Edebiyatı',
      bio: 'Karacaoğlan\'ın doğa ve aşk temalarını işlediği bu koşma, halk edebiyatının en güzel örneklerinden biridir.',
      stanzas: [
        {
          lines: [
            [wt('Boz', ['olcu'], '11\'li hece'), wt('bulanık', ['konu', 'edebiSanat'], 'Konu: Doğa betimleme; Sıfat tamlaması'), w('akan'), wt('sular', ['tema'], 'Tema: doğa')],
            [w('Nerelerden'), w('gelir,'), wt('nereye', ['konu'], ''), w('gider?')],
            [wt('Güzel', ['tema'], 'Tema: Güzelliğe hayranlık'), w('başın'), wt('üstünde', ['olcu'], 'Kafiyeli dize'), w('tüten')],
            [wt('Dumanlı', ['edebiSanat'], 'Teşbih: dağ-duman imgesi'), w('dağlar'), wt('neye', ['kafiye'], 'Kafiye: gider/neye – yarım kafiye'), w('ağlar?')],
          ],
        },
        {
          lines: [
            [wt('Aşık', ['konu', 'tema'], 'Konu: Aşığın dünyası; Tema: Aşk acısı'), w('olalı'), w('ben'), w('sana,')],
            [w('Gezer'), wt('oldum', ['olcu'], ''), w('yana'), w('yana.')],
            [w('Derdim'), w('anlatsam'), w('insana,')],
            [w('Söylesem'), w('dili'), wt('dolanır.', ['kafiye', 'redif'], 'Kafiye + Redif: -anır/-ana')],
          ],
        },
      ],
      analysisDetails: {
        redif: { description: 'Dörtlük sonlarında "-an/-en" sesi redif oluşturur. Koşma geleneğine özgü bu yapı ozanın söyleyiş kolaylığını gösterir.', count: 3 },
        kafiye: { description: 'Yarım kafiye kullanılmıştır. Halk şiirinde kafiye ses benzerliğine dayanır, anlam benzerliği önceliklidir.', count: 4 },
        olcu: { description: '11\'li hece ölçüsüyle yazılmıştır. Halk şiirinin en yaygın ölçüsü olan 11\'li hece sazla söylemeye uygundur.', count: 3 },
        nazimBirimi: { description: 'Dörtlük kullanılmıştır. Koşma biçiminde genellikle 3-5 dörtlük bulunur; son dörtlükte şairin adı geçer.', count: 2 },
        edebiSanat: { description: 'Teşbih (boz bulanık sular), Kişileştirme (dağlar ağlar), İntak (konuşturmak)', count: 3 },
        tema: { description: 'Doğa güzelliği, aşk acısı ve gurbet temaları iç içe işlenmiştir.', count: 3 },
        konu: { description: 'Doğanın güzelliğine hayranlık ve aşk acısının dile getirilmesi.', count: 3 },
      },
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
      id: 'hurriyet-kasidesi',
      title: 'Hürriyet Kasidesi (Seçme Dizeler)',
      form: 'Kaside · Aruz Ölçüsü · Beyit',
      period: 'Tanzimat Edebiyatı',
      bio: 'Namık Kemal\'in hürriyet ve vatan sevgisini coşkuyla anlattığı bu kaside, Türk edebiyatında siyasi şiirin en güçlü örneğidir.',
      stanzas: [
        {
          lines: [
            [wt('Görüp', ['konu'], 'Konu: Hürriyetin özlemi'), w('ahkâm-ı'), wt('asr\'ı', ['tema'], 'Tema: Çağın gerektirdiği özgürlük'), w('münharif'), w('sedd-i')],
            [wt('hürriyetten,', ['redif', 'konu'], 'Konu + Redif: hürriyet kelimesi'), w('çekilmez'), w('bu'), w('cihândan')],
          ],
        },
        {
          lines: [
            [wt('Ne', ['edebiSanat'], 'Tezat: mağlup/muzaffer'), w('mümkün'), w('ölmeden'), wt('mağlûp', ['tezat']), w('olmak')],
            [wt('istemez', ['tema'], 'Tema: Onur, yiğitlik'), w('şan'), w('ü'), w('şeref')],
          ],
        },
        {
          lines: [
            [wt('Vatanın', ['konu', 'tema'], 'Tema + Konu: Vatan sevgisi'), w('bağrına'), w('düşman'), w('girdiği')],
            [w('demde'), wt('hürriyet', ['redif'], ''), w('için'), w('ölmek'), wt('şereftir.', ['kafiye'], 'Kafiye: -tır')],
          ],
        },
      ],
      analysisDetails: {
        redif: { description: '"Hürriyet" sözcüğü kasidede birçok kez nakarat gibi tekrar eder. Bu sözcük şiirin ana temasını oluşturur.', count: 3 },
        kafiye: { description: 'Aruz kalıbına uygun tam ve zengin kafiye kullanılmıştır.', count: 3 },
        olcu: { description: 'Aruz ölçüsüyle yazılmıştır. Divan geleneğinden gelen kaside biçimi kullanılmış, ancak içerik modernleştirilmiştir.', count: 2 },
        nazimBirimi: { description: 'Nazım birimi beyittir. Kaside biçiminde her beyit matla, mahlas gibi bölümlerle düzenlenir.', count: 3 },
        edebiSanat: { description: 'Tezat (mağlup/muzaffer), Teşbih, Nida, İstifham (soru sanatı)', count: 4 },
        tema: { description: 'Hürriyet, vatan sevgisi, onur ve ölümü göze alma temaları coşkuyla işlenmektedir.', count: 4 },
        konu: { description: 'Hürriyet olmadan yaşamanın anlamsızlığı ve vatan için ölmenin şeref olduğu.', count: 3 },
      },
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
      id: 'sis',
      title: 'Sis (Seçme Dizeler)',
      form: 'Serbest Müstezat · Aruz',
      period: 'Servet-i Fünun',
      bio: 'İstanbul\'u sis arkasında gizleyen şair, şehrin ahlaki çöküşünü eleştirir. Bu şiir Türk edebiyatında sosyal eleştirinin zirvesidir.',
      stanzas: [
        {
          lines: [
            [wt('Sarmış', ['edebiSanat'], 'Kişileştirme: sis sarıyor'), w('yine'), wt('âfâkını', ['konu'], 'Konu: İstanbul\'un ufkunu sis sarıyor'), w('bir'), wt('dûd-ı', ['tema'], 'Tema: kaos, karmaşa'), w('muattar,')],
            [wt('Bir', ['edebiSanat'], 'Tekrir: anafora – dize başlarında "bir"'), w('sis'), w('ki'), w('belirsiz,'), wt('donuk,', ['olcu'], 'Aruz ölçüsü'), w('ağır;')],
          ],
        },
        {
          lines: [
            [wt('Beyninde', ['tema'], 'Tema: suç ve kaos içindeki şehir'), w('yüzen'), wt('mevcini', ['edebiSanat'], 'Teşbih: sis dalgasına benzetilmiş'), w('bir'), w('bahr-i'), w('helâkin')],
            [w('Tâ'), w('karşıki'), w('iskelelere'), wt('zincirlemiş', ['edebiSanat'], 'Kişileştirme: sis zincirlemiş'), wt('İstanbul\'u.', ['konu'], 'Konu: İstanbul şiirin konusu')],
          ],
        },
      ],
      analysisDetails: {
        redif: { description: 'Şiirde belirgin bir redif yoktur. Serbest müstezat biçiminde yazılan şiirde ahenk farklı araçlarla sağlanmıştır.', count: 0 },
        kafiye: { description: 'Aruz ölçüsüne uygun kafiyeler kullanılmıştır ancak serbest müstezat biçimi kafiye şemasını karmaşıklaştırır.', count: 2 },
        olcu: { description: 'Serbest müstezat biçiminde aruz ölçüsü kullanılmıştır. Uzun ve kısa dizeler art arda gelerek dinamik bir ritim yaratır.', count: 3 },
        nazimBirimi: { description: 'Serbest müstezat biçimi; uzun ve kısa dizeler değişimli gelir. Tanzimat\'tan Servet-i Fünun\'a geçişin simgesi bu biçimdir.', count: 2 },
        edebiSanat: { description: 'Kişileştirme (sis sarıyor, zincirlemiş), Teşbih (sis-dalga), Tekrir (anafora), İstiare, Sembol (sis = kaos/ahlaki çöküş)', count: 5 },
        tema: { description: 'Sosyal eleştiri, ahlaki çöküş, kaos ve umutsuzluk. Sis İstanbul\'u hem görsel hem ahlaki anlamda saran baskının sembolüdür.', count: 4 },
        konu: { description: 'Sisin İstanbul\'u sarmasının betimlenmesi üzerinden şehrin ahlaki ve toplumsal sorunlarının eleştirilmesi.', count: 3 },
      },
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
      id: 'istiklal-marsi',
      title: 'İstiklal Marşı (İlk İki Kıta)',
      form: 'Aruz Ölçüsü · Dörtlük',
      period: 'Milli Edebiyat',
      bio: 'Kurtuluş Savaşı\'nın ruhunu yansıtan İstiklal Marşı, 1921\'de TBMM tarafından kabul edilerek Türkiye Cumhuriyeti\'nin milli marşı olmuştur.',
      stanzas: [
        {
          lines: [
            [wt('Korkma,', ['edebiSanat'], 'Nida: Millete sesleniş'), w('sönmez'), w('bu'), wt('şafaklarda', ['tema'], 'Tema: Uğurlu şafak, kurtuluş'), w('yüzen'), w('al'), wt('sancak;', ['kafiye'], 'Kafiye: -cak sesi')],
            [w('Sönmeden'), w('yurdumun'), w('üstünde'), w('tüten'), w('en'), wt('son', ['olcu'], 'Aruz ritmi'), w('ocak.')],
          ],
        },
        {
          lines: [
            [wt('O', ['edebiSanat'], 'Teşbih: Bayrak/yıldız imgesi'), w('benim'), wt('milletimin', ['konu', 'tema'], 'Konu+Tema: Millet ve bağımsızlık'), w('yıldızıdır,'), w('parlayacak;')],
            [w('O'), w('benimdir,'), w('o'), w('benim'), wt('milletimindir,', ['redif'], 'Redif: milletimin tekrarı'), w('ancak.')],
          ],
        },
        {
          lines: [
            [wt('Bastığın', ['tema'], 'Tema: Toprak kutsallığı'), w('yerleri'), wt('toprak', ['konu'], ''), w('diyerek'), w('geçme,'), wt('tanı!', ['edebiSanat'], 'Nida + Emir')],
            [w('Düşün'), w('altındaki'), w('binlerce'), wt('kefensiz', ['tema'], 'Tema: Şehitlik'), w('yatanı.')],
          ],
        },
      ],
      analysisDetails: {
        redif: { description: '"Milletimin" ifadesi tekrar edilerek millete aidiyeti pekiştirir. Bu, şiirin güçlü bir redif özelliği taşıdığını gösterir.', count: 2 },
        kafiye: { description: 'Aruz ölçüsüne uygun tam kafiye kullanılmıştır. -cak/-cak kafiyesi her kıtanın sonunda mükemmel bir ahenk yaratır.', count: 4 },
        olcu: { description: 'Aruz ölçüsü kullanılmıştır. "Fâilâtün / Mefâilün / Feilün" kalıbıyla yazılmış; her dize aynı ölçüdedir.', count: 3 },
        nazimBirimi: { description: 'Nazım birimi dörtlüktür. 10 dörtlükten oluşan şiirde her dörtlük bağımsız bir anlam birimi oluşturur.', count: 3 },
        edebiSanat: { description: 'Nida (Korkma!, Tanı!), Teşbih (bayrak-yıldız), Hüsn-i Talil, Kişileştirme, İstifham', count: 5 },
        tema: { description: 'Bağımsızlık, vatan sevgisi, şehitlik ve milletin birliği. Şiir Kurtuluş Savaşı\'nın ruhunu yansıtır.', count: 5 },
        konu: { description: 'Türk milletinin bağımsızlık mücadelesi, bayrağın önemi ve şehitlere saygı.', count: 4 },
      },
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
      id: 'sessiz-gemi',
      title: 'Sessiz Gemi',
      form: 'Sone · Hece / Aruz Geçişi',
      period: 'Milli Edebiyat',
      bio: '"Sessiz Gemi" ölümü bir yolculuğa benzeten bu şiir, Yahya Kemal\'in en çok okunan şiiridir.',
      stanzas: [
        {
          lines: [
            [wt('Artık', ['tema'], 'Tema: Ölümün kaçınılmazlığı'), w('demir'), w('almak'), w('günü'), wt('gelmişse', ['kafiye'], 'Kafiye: -mişse'), w('zamandan,')],
            [w('Meçhûle'), w('giden'), w('bir'), wt('gemi', ['edebiSanat', 'konu'], 'Teşbih/İstiare: Ölüm gemiye benzetilmiş'), w('kalkar'), w('bu'), w('limandan.')],
          ],
        },
        {
          lines: [
            [wt('Hiç', ['tema'], 'Tema: Sessiz, sakin ölüm kabullenmesi'), w('yanaşmaz'), w('o'), w('gemi'), w('geri'), w('döndüğü'), w('yere,')],
            [w('Gurbet'), w('bitip'), wt('son', ['tema'], ''), w('dönüşe'), w('kalkar'), w('bu'), wt('sefer.', ['kafiye', 'redif'], 'Kafiye + Redif: -er')],
          ],
        },
        {
          lines: [
            [wt('Seyreyle', ['edebiSanat'], 'Nida: Okuyucuya seslenme'), w('uzaktan'), wt('giden', ['konu', 'tema'], 'Konu: Ölüm yolculuğu'), w('bu'), wt('sessiz', ['edebiSanat'], 'Kişileştirme: gemi sessiz'), w('gemiyi;')],
            [w('Ufukta'), w('kaybolur,'), wt('geri', ['tema'], ''), w('dönmez'), w('bir'), w('daha.')],
          ],
        },
      ],
      analysisDetails: {
        redif: { description: '"-er/-ar" redifi dizeler arasında tutarlı ahenk sağlar. "Kalkar" sözcüğünün tekrarı özellikle dikkat çekicidir.', count: 3 },
        kafiye: { description: 'Tam ve zengin kafiye kullanılmıştır. "Zamandan/limandan", "yere/sefer" çiftleri şiirin müzikal yapısını güçlendirir.', count: 4 },
        olcu: { description: 'Şiirde hece ve aruz ölçüsü iç içe geçmektedir. Yahya Kemal bu sentezi bilinçli bir tercihle gerçekleştirmiştir.', count: 3 },
        nazimBirimi: { description: 'Şiir sone yapısına yakın bir biçimde 3 kıtadan oluşmaktadır. Kıtalar giderek kısalarak sonuca doğru yürür.', count: 3 },
        edebiSanat: { description: 'İstiare (ölüm = sessiz gemi), Teşbih (yolculuk = ölüm), Kişileştirme (gemi kalkar), Nida (Seyreyle)', count: 4 },
        tema: { description: 'Ölüm, vedalaşma ve geçicilik. Şair ölümü korkutucu değil huzurlu ve kaçınılmaz bir yolculuk olarak sunar.', count: 4 },
        konu: { description: 'Ölümün sessiz, sakin bir yolculukla sembollere dönüştürülerek anlatılması; vedanın kaçınılmaz olduğu düşüncesi.', count: 3 },
      },
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
      id: 'han-duvarlari',
      title: 'Han Duvarları (Seçme)',
      form: '14\'lü Hece · Dörtlük',
      period: 'Cumhuriyet Dönemi (Beş Hececiler)',
      bio: 'Faruk Nafiz\'in başyapıtı olan "Han Duvarları", Anadolu yolculuğunu ve yurt özlemini dile getiren epik bir şiirdir.',
      stanzas: [
        {
          lines: [
            [wt('Yurdumun', ['tema', 'konu'], 'Tema+Konu: Yurt sevgisi ve Anadolu'), w('en'), w('uzak'), w('köşesinden'), w('geçerken,')],
            [w('Han'), w('duvarlarında'), wt('isimler', ['edebiSanat'], 'Sembol: isimlerin kalıcılığı vs. insanın geçiciliği'), w('okudum,')],
            [wt('Bir', ['olcu'], '14\'lü hece'), w('ömrün'), w('hep'), wt('bu', ['tema'], ''), w('duvarlarda'), w('yazılı')],
            [wt('Kaldığını', ['tema'], 'Tema: kalıcılık, iz bırakma'), w('anlayıp'), w('yüreğim'), w('burkuldu.')],
          ],
        },
        {
          lines: [
            [wt('İşte', ['edebiSanat'], 'Gösterme sanatı'), w('böyle'), w('ömürleri'), w('mühürlüyor')],
            [wt('Kader,', ['tema'], 'Tema: kader, alın yazısı'), w('biz'), w('farkında'), w('bile'), wt('olmadan.', ['kafiye'], 'Kafiye: -dan')],
            [w('Bir'), w('han'), w('duvarında'), wt('isim', ['konu'], ''), w('bırakıp')],
            [w('Geçip'), wt('gidiyoruz', ['tema'], 'Tema: geçicilik, fanilik'), w('bu'), wt('dünyadan.', ['kafiye'], '')],
          ],
        },
      ],
      analysisDetails: {
        redif: { description: 'Dörtlük sonlarındaki "-dan/-den" eki redif işlevi görmektedir.', count: 3 },
        kafiye: { description: '"Olmadan/dünyadan" çifti tam kafiye oluşturur. 14\'lü hecenin ritmine uygun kafiye şeması kullanılmıştır.', count: 3 },
        olcu: { description: '14\'lü hece ölçüsüyle yazılmıştır. Duraksama 7+7 şeklindedir. Beş Hececilerin sıkça kullandığı bu ölçü epik anlatıma uygundur.', count: 3 },
        nazimBirimi: { description: 'Dörtlük kullanılmıştır. Şiir uzun soluklu bir dörtlük dizisinden oluşur.', count: 2 },
        edebiSanat: { description: 'Sembol (han duvarındaki isimler = kalıcılık), Kişileştirme (kader mühürler), İstiare, Hüsn-i Talil', count: 4 },
        tema: { description: 'Geçicilik, kalıcılık, yurt sevgisi ve kaderin kaçınılmazlığı. Han duvarındaki isimler geçip giden insanların simgesidir.', count: 4 },
        konu: { description: 'Anadolu\'yu gezerken han duvarlarındaki isimleri okuyan şairin geçiciliği ve kalıcılığı sorgulaması.', count: 3 },
      },
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
    mainPoem: nerdesinPoem,
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
    mainPoem: otuzBesYas,
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
    mainPoem: istanbulPoem,
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
