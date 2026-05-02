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
        [w('Geç'), w('farkettim'), w('taşın'), a('s'), at('ert', ['kafiye'], 'Zengin Kafiye: -ert'), a('olduğun'), at('u.', ['redif'], 'Redif: olduğunu sözcüğü')],
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
        [wt('Kuşlar', ['tema', 'olcu'], 'Ses imgesi: kuş sesi'), w('geçiyor,'), wt('derken;', ['konu'], '')],
        [wt('Yükseklerden,', ['olcu'], ''), w('sürü'), w('sürü,'), w('çığlık'), w('çığlık.')],
        [wt('Ağlar', ['konu'], 'İstanbul\'a özgü faaliyet'), w('çekiliyor'), wt('dalyanlarda;', ['tema', 'olcu'], '')],
        [w('Bir'), w('kadının'), w('suya'), w('değiyor'), w('ayakları;')],
        [wt('İstanbul\'u', ['konu', 'redif'], ''), wt('dinliyorum,', ['redif', 'edebiSanat'], ''), wt('gözlerim', ['redif'], ''), wt('kapalı.', ['redif'], '')],
      ],
    },
    {
      lines: [
        [wt('İstanbul\'u', ['konu', 'redif'], ''), wt('dinliyorum,', ['redif', 'edebiSanat'], ''), wt('gözlerim', ['redif'], ''), wt('kapalı;', ['redif'], '')],
        [wt('Serin', ['edebiSanat', 'olcu'], 'Aliterasyon: "s" sesi'), wt('serin', ['edebiSanat', 'olcu'], ''), wt('Kapalıçarşı', ['konu'], 'İstanbul\'a özgü mekân')],
        [wt('Cıvıl', ['edebiSanat', 'olcu'], 'Ses yansıması'), wt('cıvıl', ['edebiSanat', 'olcu'], ''), wt('Mahmutpaşa', ['konu'], '')],
        [wt('Güvercin', ['tema'], 'Tema: İstanbul\'un imgesi'), w('dolu'), w('avlular')],
        [wt('Çekiç', ['olcu'], 'Ses yansıması: çekiç sesi'), w('sesleri'), w('geliyor'), wt('dokaplardan', ['konu'], '')],
        [wt('Güzelim', ['tema', 'konu', 'olcu'], ''), w('bahar'), w('rüzgarında'), w('ter'), w('kokuları;')],
        [wt('İstanbul\'u', ['konu', 'redif'], ''), wt('dinliyorum,', ['redif', 'edebiSanat'], ''), wt('gözlerim', ['redif'], ''), wt('kapalı.', ['redif'], '')],
      ],
    },
    {
      lines: [
        [wt('İstanbul\'u', ['konu', 'redif'], ''), wt('dinliyorum,', ['redif', 'edebiSanat'], ''), wt('gözlerim', ['redif'], ''), wt('kapalı;', ['redif'], '')],
        [w('Başımda'), wt('eski', ['tema', 'konu'], ''), w('alemlerin'), w('sarhoşluğu')],
        [w('Loş'), w('kayıkhaneleriyle'), wt('bir', ['olcu', 'tema'], ''), w('yalı;')],
        [wt('Dinmiş', ['konu'], ''), w('lodosların'), wt('uğultusu', ['tema'], ''), w('içinde')],
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
        [wt('Geceleyin', ['konu'], 'Gece uyanma'), w('bir'), w('ses'), w('böler'), w('uykumu,')],
        [w('İçim'), w('ürpermeyle'), wt('dolar:', ['tema'], 'Korku/heyecan'), wt('-Nerdesin?', ['edebiSanat'], 'Soru')],
        [w('Arıyorum'), w('yıllar'), w('var'), wt('ki', ['konu'], ''), w('ben'), w('onu,')],
        [w('Aşıkıyım'), w('beni'), w('çağıran'), wt('bu', ['kafiye'], ''), w('sesin.')],
      ],
    },
    {
      lines: [
        [wt('Gün', ['redif', 'edebiSanat'], ''), wt('olur', ['redif', 'edebiSanat'], ''), w('sürüyüp'), w('beni'), w('derbeder,')],
        [w('Bu'), wt('ses', ['tema'], ''), w('rüzgarlara'), w('karışır'), w('gider.')],
        [w('Gün'), wt('olur,', ['olcu'], ''), w('peşimden'), w('yürür'), w('beraber,')],
        [wt('Ansızın', ['edebiSanat'], ''), w('haykırır'), wt('bana:', ['redif'], ''), w('-Nerdesin?')],
      ],
    },
    {
      lines: [
        [wt('Bütün', ['konu', 'tema'], ''), w('sevgileri'), w('atıp'), w('içimden,')],
        [w('Varlığımı'), w('yalnız'), w('ona'), w('verdim'), w('ben,')],
        [w('Elverir'), w('ki'), wt('bir', ['edebiSanat'], ''), w('gün'), wt('bana', ['tema'], ''), w('derinden,')],
        [wt('Ta', ['edebiSanat'], ''), w('derinden'), w('bir'), wt('gün', ['tema'], ''), w('bana'), w('"Gel"'), w('desin.')],
      ],
    },
  ],
  analysisDetails: {
    redif: { description: '"Nerdesin" sözcüğü şiirin her kıtasında nakarat olarak tekrar eder. Bu yapı koşma geleneğinden gelmektedir ve ozanın özlemini vurgular.', count: 8 },
    kafiye: { description: 'Şiirde çapraz kafiye kullanılmıştır (uykumu/onu, nerdesin/sesin).', count: 5 },
    olcu: { description: 'Şiir 11\'li hece ölçüsüyle yazılmıştır.', count: 6 },
    nazimBirimi: { description: 'Nazım birimi dörtlüktür.', count: 3 },
    edebiSanat: { description: 'Nida (Nerdesin!), Kişileştirme (sesin yürümesi, haykırması)', count: 5 },
    tema: { description: 'Ana tema hasret ve yalnızlıktır.', count: 4 },
    konu: { description: 'İçsel bir sese, bir dosta veya sevgiliye duyulan özlem.', count: 3 },
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
        [w('Ben'), wt('yürürüm', ['olcu'], '8\'li hece'), wt('yane', ['edebiSanat'], 'Aliterasyon: "y" sesi'), wt('yane,', ['edebiSanat', 'redif'], 'Redif: yane')],
        [w('Aşk'), wt('boyadı', ['edebiSanat'], 'Teşbih'), wt('beni', ['kafiye'], ''), w('kane,')],
        [w('Ne'), w('akilem'), w('ne'), w('divane,')],
        [w('Gel'), w('gör'), w('beni'), w('aşk'), w('neyledi.')]
      ],
    },
    {
      lines: [
        [w('Gâh'), w('eserim'), w('yeller'), w('gibi,')],
        [w('Gâh'), w('tozarım'), wt('yollar', ['kafiye', 'redif'], 'Kafiye + Redif'), w('gibi,')],
        [wt('Gâh', ['tema', 'konu'], 'Konu: İlahi aşk'), w('akarım'), w('seller'), wt('gibi,', ['kafiye', 'redif'], '')],
        [w('Gel'), w('gör'), w('beni'), w('aşk'), wt('neyledi.', ['nazimBirimi'], 'Dörtlüğün kapanışı')],
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
        [wt('Beni', ['konu'], 'Konu: Şairin sevgiliden şikâyeti'), w('candan'), w('usandırdı'), wt('cefâdan', ['kafiye'], 'Kafiye: cefadan/şifadan'), w('yâr'), w('usanmaz'), w('mı')],
        [w('Felekler'), w('yandı'), w('âhumdan'), wt('murâdum', ['olcu'], 'Aruz ölçüsü'), w('şem\'i'), wt('yanmaz', ['redif'], 'Redif: yanmaz mı'), w('mı')],
      ],
    },
    {
      lines: [
        [w('Kamu'), w('bîmârına'), w('cânân'), w('devâ-yı'), w('derd'), w('eder'), w('ihsân')],
        [w('Niçin'), w('kılmaz'), w('bana'), w('dermân'), w('beni'), w('bîmâr'), w('sanmaz'), w('mı')]
      ],
    },
    {
      lines: [
        [w('Şeb-i'), w('hicrân'), w('yanar'), w('cânım'), w('dökük'), w('kan'), w('ağlar'), w('çeşmim')],
        [w('Uyarır'), w('halkı'), w('efgânım'), w('kara'), w('bahtım'), w('uyanmaz'), w('mı')]
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
    mainPoem: {
      id: 'yunus-emre-poem',
      title: 'Ben Yürürüm Yane Yane',
      form: 'İlahi',
      period: 'Tekke Edebiyatı',
      bio: 'Şair, ilahi aşkın etkisiyle divane olmuş, kendini tanıyamaz hale gelmiştir. Şeyhe yalvarır, Mecnun gibi yârini arar. Aşkın insanı nasıl değiştirdiğini anlatır.',
      stanzas: [
        {
          lines: [
            [w('Ben'), w('yürürüm'), wt('yane', ['kafiye'], ''), wt('yane', ['kafiye'], '')],
            [w('Aşk'), w('boyadı'), w('beni'), wt('kane', ['kafiye'], '')],
            [w('Ne'), w('âkilem'), w('ne'), wt('divane', ['kafiye'], '')],
            [wt('Gel', ['redif'], ''), wt('gör', ['redif'], ''), wt('beni', ['redif'], ''), wt('aşk', ['redif'], ''), wt('neyledi', ['redif'], 'Her dörtlüğün son mısrası')]
          ]
        },
        {
          lines: [
            [w('Gâh'), w('eserim'), w('yeller'), wt('gibi', ['kafiye'], '')],
            [w('Gâh'), w('tozarım'), w('yollar'), wt('gibi', ['kafiye'], '')],
            [w('Gâh'), w('akarım'), w('seller'), wt('gibi', ['kafiye'], '')],
            [wt('Gel', ['redif'], ''), wt('gör', ['redif'], ''), wt('beni', ['redif'], ''), wt('aşk', ['redif'], ''), wt('neyledi', ['redif'], '')]
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
            [w('Efsunî'), w('bir'), w('bahar'), wt('gecesidir', ['kafiye'], 'gece-gece'), w('bu'), wt('gece,', ['kafiye'], '')],
            [w('Şu'), w('gök'), w('kubbe'), w('altında'), w('nice'), w('nice'), wt('gece!', ['kafiye'], '')],
            [wt('Bu', ['redif'], ''), wt('gece', ['redif'], ''), w('Sultan'), w("Süleyman'ın"), w('ruhu'), wt('gezer,', ['kafiye'], 'gezer-gezer')],
            [wt('Bu', ['redif'], ''), wt('gece', ['redif'], ''), wt('Kanûnî', ['redif'], ''), wt('Sultan', ['redif'], ''), wt('Süleyman', ['redif'], ''), wt('gezer.', ['redif'], 'Redif')]
          ]
        },
        {
          lines: [
            [w('O,'), w('bu'), w('şehr-i'), w("Stanbul'u"), w('aldığı'), wt('gecedir,', ['kafiye'], 'gecedir-gecedir')],
            [w('Bu,'), w('onun'), w('ruhunun'), w('dolaştığı'), wt('gecedir.', ['kafiye'], 'gecedir-gecedir')],
            [wt('Bu', ['redif'], ''), wt('gece', ['redif'], ''), w('Sultan'), w("Süleyman'ın"), w('ruhu'), wt('gezer,', ['kafiye'], 'gezer-gezer')],
            [wt('Bu', ['redif'], ''), wt('gece', ['redif'], ''), wt('Kanûnî', ['redif'], ''), wt('Sultan', ['redif'], ''), wt('Süleyman', ['redif'], ''), wt('gezer.', ['redif'], 'Redif')]
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
            [w('Köroğlu'), w('geliyor'), wt('hiddetli,', ['kafiye'], 'hiddetli-gitmiş')],
            [w('Atı'), w('Mahmura'), w('binmiş'), wt('gitmiş.', ['kafiye'], 'hiddetli-gitmiş')],
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
            [w('Ey'), w('şehid'), w('oğlu'), w('şehid,'), w('isteme'), w('benden'), wt('makber,', ['kafiye'], 'makber')],
            [w('Sana'), w('âgûşunu'), w('açmış'), w('duruyor'), wt('Peygamber.', ['kafiye'], 'Peygamber')]
          ]
        },
        {
          lines: [
            [w('Hür'), w('yaşamış,'), w('hür'), w('yaşarım,'), w('hür'), w('yaşamam'), wt('hüryetsiz,', ['redif', 'kafiye'], '')],
            [w('Hürriyet'), w('uğruna'), w('can'), w('vermekten'), w('usanmam'), wt('hüryetsiz.', ['redif', 'kafiye'], '')]
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
            [w('Korkma,'), w('sönmez'), w('bu'), w('şafaklarda'), w('yüzen'), w('al'), wt('sancak;', ['kafiye'], '')],
            [w('Sönmeden'), w('yurdumun'), w('üstünde'), w('tüten'), w('en'), w('son'), wt('ocak.', ['kafiye'], '')],
            [w('O'), w('benim'), w('milletimin'), w('yıldızıdır,'), wt('parlayacak;', ['kafiye'], '')],
            [w('O'), w('benimdir,'), w('o'), w('benim'), w('milletimindir'), wt('ancak.', ['kafiye'], '')]
          ]
        },
        {
          lines: [
            [w('Çatma,'), w('kurban'), w('olayım,'), w('çehreni'), w('ey'), w('nazlı'), wt('hilâl!', ['kafiye'], '')],
            [w('Kahraman'), w('ırkıma'), w('bir'), w('gül...'), w('Ne'), w('bu'), w('şiddet,'), w('bu'), wt('celâl?', ['kafiye'], '')],
            [w('Sana'), w('olmaz'), w('dökülen'), w('kanlarımız'), w('sonra'), wt('helâl;', ['kafiye'], '')],
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
            [w('Artık'), w('demir'), w('alsak'), w('mıranadan'), wt('gidelim,', ['kafiye'], '')],
            [w('Dört'), w('tarafı'), w('sarmış'), w('ateşlerden'), wt('gidelim.', ['kafiye'], '')],
            [wt('Dünyanın', ['redif'], ''), wt('bir', ['redif'], ''), wt('ucuna', ['redif'], ''), wt('gidelim,', ['redif'], '')],
            [wt('Dünyanın', ['redif'], ''), wt('bir', ['redif'], ''), wt('ucuna', ['redif'], ''), wt('gidelim.', ['redif'], '')]
          ]
        },
        {
          lines: [
            [w('Bir'), w('gün'), w('herkes'), w('ölür,'), w('bilinmez'), w('ne'), wt('zamandır,', ['kafiye'], '')],
            [w('Ölümden'), w('evvel'), w('ölümü'), w('görmektir'), wt('fayda.', ['kafiye'], '')],
            [wt('Dünyanın', ['redif'], ''), wt('bir', ['redif'], ''), wt('ucuna', ['redif'], ''), wt('gidelim,', ['redif'], '')],
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
            [w('Duvarlara'), w('konan'), wt('gölgeler,', ['kafiye'], '')],
            [w('Birer'), w('hayal,'), w('birer'), wt('hatıra.', ['kafiye'], '')],
            [w('Bu'), w('han'), w('ne'), w('kadar'), w('sessiz,'), w('ne'), w('kadar'), wt('kimsesiz,', ['kafiye'], '')],
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
            [w('Gözü'), w('yaşlı,'), w('gönlü'), w('kırık,'), w('başı'), wt('önde,', ['kafiye'], '')],
            [w('Sokaklarda'), w('dolaşırım'), w('seni'), wt('arar.', ['kafiye'], '')],
            [w('Bir'), w('ses,'), w('bir'), w('nefes,'), w('bir'), w('izin'), wt('olsaydı,', ['kafiye'], '')],
            [w('Bilirsin,'), w('bulurdum'), w('seni'), wt('nerelerde.', ['kafiye'], '')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: 'Redif yoktur.', count: 0 },
        kafiye: { description: 'Düz kafiye. önde-arar, olsaydı-nerelerde.', count: 4 },
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
            [w('Yaş'), w('otuz'), w('beş!'), w('Yolun'), w('yarısı'), wt('eder,', ['kafiye'], '')],
            [w('Dante'), w('gibi'), w('ortasındayız'), wt('ömrün.', ['kafiye'], '')],
            [w('Delikanlı'), w('çağımızdaki'), wt('cevher,', ['kafiye'], '')],
            [w('Yalvarırım,'), w('eğilme'), w('onun'), wt('önün.', ['kafiye'], '')]
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
            [w('Gözlerim'), wt('kapalı', ['kafiye'], '')],
            [w('Kulaklarımı'), wt('dayadım,', ['kafiye'], '')],
            [w('İnce'), w('bir'), wt('duvara', ['kafiye'], '')],
            [w('Karşıdan'), w('vapur'), w('sesleri'), wt('geliyor', ['kafiye'], '')],
            [w('Ve'), w('limandan'), w('uzaklaşan'), w('bir'), w('şeylerin'), wt('hüznü', ['kafiye'], '')],
            [w('Ve'), w('her'), w('şeyde'), w('batan'), wt('güneşin', ['kafiye'], '')],
            [w('Ve'), w('Yalılarda'), w('ölen'), wt('günün', ['kafiye'], '')],
            [w('Ve'), w('Yelkenlere'), w('karşı'), w('koyan'), wt('dalgaların', ['kafiye'], '')],
            [w('Ve'), w('kadınların,'), w('kocalarının,'), wt('annelerinin', ['kafiye'], '')],
            [w('Ve'), w('ağlayan'), wt('çocukların', ['kafiye'], '')],
            [w('Ve'), w('hüzünlü'), wt('gemilerin', ['kafiye'], '')],
            [w('Ve'), w('bütün'), w('bunların'), w('üstüne'), w('çöken'), wt('akşamın', ['kafiye'], '')],
            [w('Hüznünü'), w('dinliyorum')],
            [wt("İstanbul'u", ['redif'], ''), wt('dinliyorum.', ['redif'], '')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: '"İstanbul\'u dinliyorum" — Şiirin son mısrasında tekrarlanır.', count: 2 },
        kafiye: { description: 'Serbest kafiye. kapalı-kapalı, geliyor-hüznü gibi yarım uyaklar vardır.', count: 12 },
        olcu: { description: 'Serbest ölçü.', count: 14 },
        nazimBirimi: { description: 'Tek bir bütün (tek kıta).', count: 1 },
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
