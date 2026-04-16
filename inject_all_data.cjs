/**
 * inject_all_data.cjs
 * 9. Sınıf Türk Dili ve Edebiyatı - Kapsamlı soru veritabanı
 * Quiz, Eşleştirme, Flashcard ve Tablo oyunları için tüm veriler
 */
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyDRvNPR8DRBim9XZxXqWIrl3VvJsaW8ZSE",
  authDomain: "edebiat-470ce.firebaseapp.com",
  databaseURL: "https://edebiat-470ce-default-rtdb.firebaseio.com",
  projectId: "edebiat-470ce",
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ============================================================
// QUIZ SORULARI (her ünite ~8-10 soru)
// ============================================================
const QUIZ_DATA = {
  'unit-1': {
    q1: { question: 'Edebiyat nedir?', options: ['Duygu ve düşüncelerin dil aracılığıyla estetik biçimde anlatılmasıdır.', 'Matematiksel bir işlemdir.', 'Sadece şiir yazmaktır.', 'Haber yazısıdır.'], correct: 0, explanation: 'Edebiyat, dille gerçekleştirilen bir güzel sanat etkinliğidir.', difficulty: 'kolay' },
    q2: { question: 'Hangisi güzel sanatların dallarından biri değildir?', options: ['Müzik', 'Resim', 'Edebiyat', 'Coğrafya'], correct: 3, explanation: 'Coğrafya bir bilim dalıdır, sanat dalı değildir.', difficulty: 'kolay' },
    q3: { question: 'Bilimsel metinlerin en belirgin özelliği nedir?', options: ['Mecazlı anlatım', 'Nesnellik ve kanıtlanabilirlik', 'Duygusallık', 'Hayal gücü'], correct: 1, explanation: 'Bilimsel metinler nesnel ve kanıtlanabilir bilgiler içerir.', difficulty: 'orta' },
    q4: { question: 'Dilin hangi işlevi duygu ve heyecanları aktarmak için kullanılır?', options: ['Göndergesel işlev', 'Heyecana bağlı işlev', 'Alıcıyı harekete geçirme', 'Kanalı kontrol'], correct: 1, explanation: 'Heyecana bağlı (duygusal) işlev, konuşmacının duygularını yansıtır.', difficulty: 'orta' },
    q5: { question: 'Edebiyatın hangi bilim dalıyla ilişkisi en azdır?', options: ['Tarih', 'Psikoloji', 'Fizik', 'Sosyoloji'], correct: 2, explanation: 'Edebiyat, insan ve toplumla ilgili bilimlerle yakından ilişkilidir.', difficulty: 'orta' },
    q6: { question: '"Dil bir milletin kimliğidir." cümlesindeki dil işlevi hangisidir?', options: ['Şiirsel işlev', 'Göndergesel işlev', 'Heyecana bağlı işlev', 'Dil ötesi işlev'], correct: 1, explanation: 'Gerçek bir durum ya da olguyu bildiren cümlelerde göndergesel işlev kullanılır.', difficulty: 'zor' },
    q7: { question: 'Hangisi edebi metnin özelliklerinden değildir?', options: ['Öznel bir bakış açısı taşır.', 'Estetik kaygı gözetilir.', 'Yalnızca nesnel bilgi verir.', 'Kalıcılık özelliği vardır.'], correct: 2, explanation: 'Edebi metinler öznel, sanatsal ve estetik niteliklere sahiptir.', difficulty: 'kolay' },
    q8: { question: 'Edebiyatın malzemesi nedir?', options: ['Taş', 'Ses', 'Dil', 'Renk'], correct: 2, explanation: 'Edebiyat sanatının malzemesi/hammaddesi dildir.', difficulty: 'kolay' },
    q9: { question: 'Dilin "alıcıyı harekete geçirme" işlevine hangi metin türü örnek gösterilebilir?', options: ['Roman', 'Şiir', 'Reklam/ilan', 'Deneme'], correct: 2, explanation: 'Reklamlar ve ilanlar okuyucuyu eyleme teşvik eder.', difficulty: 'orta' },
    q10: { question: 'Sanat eserlerinde dil hangi işleviyle öne çıkar?', options: ['Göndergesel', 'Şiirsel (estetik)', 'Kanalı kontrol', 'Alıcıyı harekete geçirme'], correct: 1, explanation: 'Sanatta dilin şiirsel (estetik) işlevi ön plana çıkar.', difficulty: 'orta' },
  },
  'unit-2': {
    q1: { question: 'Türk edebiyatında Batılı anlamda ilk hikaye örneği kabul edilen eser hangisidir?', options: ['Letaif-i Rivayat', 'Küçük Şeyler', 'Araba Sevdası', 'İntibah'], correct: 1, explanation: 'Sami Paşazade Sezai\'nin "Küçük Şeyler" (1890) eseri Türk edebiyatında Batılı anlamda ilk hikaye sayılır.', difficulty: 'orta' },
    q2: { question: 'Olay hikayesi (Maupassant tarzı) hangi yazarımızla özdeşleşmiştir?', options: ['Sait Faik Abasıyanık', 'Memduh Şevket Esendal', 'Ömer Seyfettin', 'Hüseyin Cahit Yalçın'], correct: 2, explanation: 'Ömer Seyfettin, Türk edebiyatında olay hikayeciliğinin kurucusudur.', difficulty: 'orta' },
    q3: { question: 'Durum (kesit) hikayesinin (Çehov tarzı) Türk edebiyatındaki öncüsü kimdir?', options: ['Sait Faik Abasıyanık', 'Refik Halit Karay', 'Halide Edip Adıvar', 'Ziya Gökalp'], correct: 0, explanation: 'Sait Faik Abasıyanık durum hikayeciliğinin en önemli temsilcisidir.', difficulty: 'orta' },
    q4: { question: 'Hikayenin bölümleri doğru sıralanmış hangisinde verilmiştir?', options: ['Giriş-Gelişme-Sonuç', 'Serim-Düğüm-Çözüm', 'Olay-Zaman-Mekan', 'Kişi-Yer-Zaman'], correct: 1, explanation: 'Hikaye serim (tanıtım), düğüm (çatışma) ve çözüm bölümlerinden oluşur.', difficulty: 'kolay' },
    q5: { question: '"Yüksek Ökçeler" adlı eserin yazarı kimdir?', options: ['Ömer Seyfettin', 'Refik Halit Karay', 'Memduh Şevket Esendal', 'Sait Faik Abasıyanık'], correct: 1, explanation: 'Refik Halit Karay bu eserin yazarıdır.', difficulty: 'zor' },
    q6: { question: 'Hikayede olayların yaşandığı çevre ve mekan unsurunun adı nedir?', options: ['Tema', 'Motif', 'Mekân', 'Konu'], correct: 2, explanation: 'Olayların geçtiği fiziksel ortam mekandır.', difficulty: 'kolay' },
    q7: { question: 'Hikayede okuyucunun merak duygusunu canlı tutan temel unsur nedir?', options: ['Mekân', 'Zaman', 'Şahıs kadrosu', 'Çatışma (düğüm)'], correct: 3, explanation: 'Düğüm bölümünde merak ve gerilim en üst seviyeye çıkar.', difficulty: 'orta' },
    q8: { question: '"Memleket Hikayeleri" kimin eseridir?', options: ['Ömer Seyfettin', 'Sait Faik Abasıyanık', 'Refik Halit Karay', 'Yakup Kadri Karaosmanoğlu'], correct: 2, explanation: 'Refik Halit Karay\'ın bu eseri Milli Edebiyat döneminin önemli örneklerindendir.', difficulty: 'orta' },
    q9: { question: 'Anlatıcının tüm olayları, kişilerin iç dünyasını bilen ve her yerde olabilen bakış açısına ne denir?', options: ['Birinci şahıs bakış açısı', 'İkinci şahıs bakış açısı', 'İlahi (tanrısal) bakış açısı', 'Gözlemci bakış açısı'], correct: 2, explanation: 'Sınırsız bilgiye sahip anlatıcı "ilahi bakış açısı" ile anlatır.', difficulty: 'orta' },
    q10: { question: 'Bir hikayede olayların kısa ve yoğun biçimde ele alınması gerektiğini öne süren anlayış nedir?', options: ['Roman tekniği', 'Hikaye tekniği', 'Lirizm', 'Didaktizm'], correct: 1, explanation: 'Hikaye, sınırlı bir zaman ve mekanda yoğun bir anlatımı gerektirir.', difficulty: 'kolay' },
  },
  'unit-3': {
    q1: { question: 'Şiirde her dize sonundaki ses benzerliğine ne denir?', options: ['Redif', 'Kafiye (uyak)', 'Aliterasyon', 'Asonans'], correct: 1, explanation: 'Dize sonlarındaki ses benzerliği kafiye (uyak) olarak adlandırılır.', difficulty: 'kolay' },
    q2: { question: 'Yalnızca aynı görevdeki eklerin tekrarına ne denir?', options: ['Kafiye', 'Redif', 'Vurgu', 'Durak'], correct: 1, explanation: 'Aynı görevdeki ekler kafiye sayılmaz, redif sayılır.', difficulty: 'kolay' },
    q3: { question: 'Epik şiir hangi konuları işler?', options: ['Aşk ve doğa', 'Yiğitlik ve kahramanlık', 'Ölüm ve hüzün', 'Öğretici konular'], correct: 1, explanation: 'Epik şiir, savaş ve kahramanlık konularını işleyen bir türdür.', difficulty: 'kolay' },
    q4: { question: 'Lirik şiir ne anlatır?', options: ['Savaş destanları', 'Coşkulu duygu ve heyecanlar', 'Eleştiri ve mizah', 'Öğütler'], correct: 1, explanation: 'Lirik şiir, kişisel duyguların coşkulu bir biçimde anlatımıdır.', difficulty: 'kolay' },
    q5: { question: 'Halk şiirinin temel nazım birimi nedir?', options: ['Beyit', 'Dörtlük', 'Bent', 'Kıta'], correct: 1, explanation: 'Halk edebiyatının temel nazım birimi dörtlüktür.', difficulty: 'kolay' },
    q6: { question: 'Aruzla ölçülü, kafiyeli, belirli konularda yazılan divan şiirine ne ad verilir?', options: ['Koşma', 'Gazel', 'Mani', 'Destan'], correct: 1, explanation: 'Gazel, aruzla yazılan, genellikle aşk temalı divan şiiri biçimidir.', difficulty: 'orta' },
    q7: { question: 'Hecenin 11\'li kalıbıyla yazılan, aşk temalı halk şiiri türü hangisidir?', options: ['Mani', 'Türkü', 'Koşma', 'Varsağı'], correct: 2, explanation: 'Koşma, 11\'li hece ölçüsüyle yazılan en yaygın halk şiiri türüdür.', difficulty: 'orta' },
    q8: { question: 'Dize içindeki ses akışını sağlayan ve dizenin bölündüğü yere ne denir?', options: ['Redif', 'Durak (Duraklar)', 'Ravi', 'Kafiye şeması'], correct: 1, explanation: 'Hece şiirinde dizenin bölündüğü yere "durak" denir.', difficulty: 'orta' },
    q9: { question: 'Sadece ünsüzlerin tekrarıyla oluşturulan ses sanatına ne denir?', options: ['Asonans', 'Aliterasyon', 'Redif', 'Vezin'], correct: 1, explanation: 'Aynı ünsüzlerin tekrarına aliterasyon (ünsüz uyumu) denir.', difficulty: 'zor' },
    q10: { question: 'Satirik (yergi) şiirde amaç nedir?', options: ['Okuyucuyu ağlatmak', 'Toplumsal aksaklıkları eleştirmek', 'Doğayı övmek', 'Dini konuları anlatmak'], correct: 1, explanation: 'Satirik şiir eleştiri ve hiciv amacı güder.', difficulty: 'orta' },
  },
  'unit-4': {
    q1: { question: 'Masalın en belirgin özelliği hangisidir?', options: ['Gerçek olayları anlatır.', 'Hayali olayları ve kahramanları anlatır.', 'Tarihsel olgulara dayanır.', 'Sadece çocuklara yöneliktir.'], correct: 1, explanation: 'Masallar olağanüstü kişi ve olayları içeren hayal ürünü anlatımlardır.', difficulty: 'kolay' },
    q2: { question: 'Fabl türünün en temel özelliği nedir?', options: ['Gerçek hayvanları anlatmak', 'Hayvanlar aracılığıyla insanlara ders vermek', 'Mitolojik varlıkları konu almak', 'Kahramanlık destanı oluşturmak'], correct: 1, explanation: 'Fabl, hayvanlar aracılığıyla insanlara ahlaki ders veren kısa hikayelerdir.', difficulty: 'kolay' },
    q3: { question: 'Türk masallarının başlangıç formeli nasıl başlar?', options: ['"Once upon a time"', '"Bir varmış bir yokmuş"', '"Rivayet edilince"', '"Destursuz bağa girilmez"'], correct: 1, explanation: 'Türk masalları genellikle "bir varmış bir yokmuş" kalıbıyla başlar.', difficulty: 'kolay' },
    q4: { question: '"Kurnaz tilki" fabl örneğinde tilki neyi sembolize eder?', options: ['Güç', 'Zeka ve kurnazlık', 'Cesaret', 'Dürüstlük'], correct: 1, explanation: 'Fablda tilki geleneksel olarak zeka ve kurnazlığın simgesidir.', difficulty: 'kolay' },
    q5: { question: 'La Fontaine hangi türün ustası olarak bilinir?', options: ['Roman', 'Destan', 'Fabl', 'Masal'], correct: 2, explanation: 'La Fontaine, dünya edebiyatının en ünlü fabl yazarıdır.', difficulty: 'orta' },
    q6: { question: 'Masallarda sürekli tekrar eden 3, 7, 40 gibi sayıların kullanılması neyi gösterir?', options: ['Gerçekliği', 'Geleneksel kalıpları ve büyüsel önemi', 'Tarihsel olayları', 'Coğrafi özellikleri'], correct: 1, explanation: 'Bu sayılar masallarda geleneksel ve sembolik anlam taşır.', difficulty: 'orta' },
    q7: { question: 'Türk halk edebiyatında anlatıcıya ne ad verilir?', options: ['Destan kahramanı', 'Meddah', 'Halk ozanı', 'Şair'], correct: 1, explanation: 'Meddahlar, hikayeleri taklitli ve mimikli anlatan halk anlatıcılarıdır.', difficulty: 'orta' },
    q8: { question: 'Masallarda sıkça geçen "iyi" ve "kötü" karakterlerin keskin biçimde ayrılması ne anlama gelir?', options: ['Sosyal sınıf farklılığı', 'İyi-kötü karşıtlığı ve ahlaki öğüt', 'Tarihi gerçeklik', 'Coğrafi farklılık'], correct: 1, explanation: 'Masallarda iyiler ödüllendirilir, kötüler cezalandırılır; bu ahlaki öğüt içerir.', difficulty: 'orta' },
  },
  'unit-5': {
    q1: { question: 'Türk edebiyatındaki ilk roman hangisidir?', options: ['İntibah', 'Felatun Bey ile Rakım Efendi', 'Araba Sevdası', 'Taaşşuk-ı Talat ve Fitnat'], correct: 3, explanation: 'Şemsettin Sami\'nin "Taaşşuk-ı Talat ve Fitnat" (1872) ilk Türkçe romandır.', difficulty: 'orta' },
    q2: { question: 'Türk edebiyatında ilk köy romanı kabul edilen eser hangisidir?', options: ['Çalıkuşu', 'Yaban', 'Vurun Kahpeye', 'Karabibik'], correct: 3, explanation: 'Nabizade Nazım\'ın "Karabibik" (1890) ilk köy romanıdır.', difficulty: 'zor' },
    q3: { question: 'Realizm akımının Türk edebiyatındaki en güçlü romancısı kimdir?', options: ['Ahmet Mithat Efendi', 'Namık Kemal', 'Halit Ziya Uşaklıgil', 'Mehmet Rauf'], correct: 2, explanation: 'Halit Ziya Uşaklıgil, Türk edebiyatında realizmin en güçlü temsilcisidir.', difficulty: 'orta' },
    q4: { question: '"Mai ve Siyah" romanı hangi akıma örnektir?', options: ['Romantizm', 'Realizm', 'Sembolizm', 'Natüralizm'], correct: 1, explanation: 'Halit Ziya\'nın "Mai ve Siyah" eseri Türk edebiyatında realizmin öncülerindendir.', difficulty: 'orta' },
    q5: { question: 'Romanda yan anlatı, iç içe hikaye ya da hikaye içinde hikaye tekniğine ne denir?', options: ['Flashback', 'Çerçeve hikaye', 'Bilinç akışı', 'Geriye dönüş'], correct: 1, explanation: 'Dış hikayenin içinde yer alan bir başka hikaye tekniğine çerçeve hikaye denir.', difficulty: 'orta' },
    q6: { question: '"Çalıkuşu" romanının kahramanı kimdir?', options: ['Bihter', 'Feride', 'Zehra', 'Münevver'], correct: 1, explanation: 'Reşat Nuri Güntekin\'in "Çalıkuşu" romanının başkahramanı Feride\'dir.', difficulty: 'kolay' },
    q7: { question: 'Romanda olayların geriye gidilerek anlatıldığı tekniğe ne denir?', options: ['Bilinç akışı', 'İç monolog', 'Geriye dönüş (flashback)', 'Montaj'], correct: 2, explanation: 'Anlatının geçmişe dönerek devam etmesi flashback tekniğidir.', difficulty: 'orta' },
    q8: { question: 'Natüralizm akımının özellikleri arasında hangisi yoktur?', options: ['Kalıtımın etkisi önemlidir.', 'Çevre koşulları belirleyicidir.', 'Bireysel özgürlük ön plandadır.', 'Bilimsel yöntem kullanılır.'], correct: 2, explanation: 'Natüralizm, insanı çevre ve kalıtımın ürünü olarak görür; özgür iradesini reddeder.', difficulty: 'zor' },
    q9: { question: '"Kiralık Konak" romanı kimin eseridir?', options: ['Halit Ziya', 'Yakup Kadri Karaosmanoğlu', 'Halide Edip Adıvar', 'Refik Halit Karay'], correct: 1, explanation: '"Kiralık Konak" Yakup Kadri Karaosmanoğlu\'nun eseridir.', difficulty: 'orta' },
    q10: { question: 'Romanda başkişinin tüm olayları anlattığı bakış açısına ne denir?', options: ['İlahi bakış açısı', 'Birinci şahıs (kahraman) bakış açısı', 'Gözlemci bakış açısı', 'Nesnel bakış açısı'], correct: 1, explanation: 'Başkahramanın kendi ağzından anlattığı eserlerde birinci şahıs bakış açısı kullanılır.', difficulty: 'orta' },
  },
  'unit-6': {
    q1: { question: 'Tiyatronun iki ana türü nedir?', options: ['Roman ve Hikaye', 'Trajedi ve Komedi', 'Şiir ve Deneme', 'Masal ve Fabl'], correct: 1, explanation: 'Tiyatronun iki temel türü trajedi ve komedidir.', difficulty: 'kolay' },
    q2: { question: 'Klasisizm akımında trajedi kahramanları kimlerden seçilirdi?', options: ['Sıradan insanlar', 'Hayvanlar', 'Tanrılar ve soylular', 'Çiftçiler'], correct: 2, explanation: 'Klasik trajedide kahramanlar soylu ya da mitolojik kişiliklerdir.', difficulty: 'orta' },
    q3: { question: '"Hamlet" hangi yazara aittir?', options: ['Molière', 'Sophokles', 'William Shakespeare', 'Bertolt Brecht'], correct: 2, explanation: 'Hamlet, William Shakespeare\'in en ünlü trajedilerinden biridir.', difficulty: 'kolay' },
    q4: { question: 'Tiyatroda sahne üzerindeki konuşmalar ve anlatımları belirten bölümlere ne denir?', options: ['Perde', 'Diyalog', 'Mim', 'Koro'], correct: 1, explanation: 'Karakterlerin birbirleriyle olan konuşma bölümleri diyalogdur.', difficulty: 'kolay' },
    q5: { question: 'Bir tiyatro eserinde çatışmanın en yüksek noktasına ne denir?', options: ['Serim', 'Doruk (Kriz) noktası', 'Çözüm', 'Prolog'], correct: 1, explanation: 'Gerginliğin en yüksek noktasına doruk/kriz noktası denir.', difficulty: 'orta' },
    q6: { question: 'Türk tiyatrosunda modern tiyatronun kurucusu kimdir?', options: ['Namık Kemal', 'Ahmet Vefik Paşa', 'Şinasi', 'Recaizade'], correct: 0, explanation: 'Namık Kemal "Vatan yahut Silistre" eseriyle modern Türk tiyatrosunun öncüsüdür.', difficulty: 'orta' },
    q7: { question: 'Brecht\'in epik tiyatrosu ile geleneksel tiyatro arasındaki fark nedir?', options: ['Epik tiyatro izleyiciyi duygusal olarak bağlar.', 'Epik tiyatro izleyiciyi düşünmeye ve yargılamaya iter.', 'Epik tiyatro yalnızca komedi sahneler.', 'Epik tiyatro müzikle desteklenmez.'], correct: 1, explanation: 'Brecht\'in epik tiyatrosu izleyiciyi sorgulatan ve eleştirel bir yaklaşım benimser.', difficulty: 'zor' },
    q8: { question: 'Tiyatroda başkişinin yalnızken konuştuğu uzun konuşma bölümüne ne denir?', options: ['Diyalog', 'Monolog', 'Tirat', 'Aria'], correct: 1, explanation: 'Karakterin tek başına konuşması monologdur.', difficulty: 'kolay' },
  },
  'unit-7': {
    q1: { question: 'Biyografi nedir?', options: ['Bir kişinin kendi yaşamını anlatması', 'Başka birinin yaşamını anlatan eser', 'Hayali bir kişinin hikayesi', 'Tarihsel bir olayın anlatımı'], correct: 1, explanation: 'Biyografi, bir kişinin hayatını başkasının kaleme almasıdır.', difficulty: 'kolay' },
    q2: { question: 'Otobiyografi nedir?', options: ['Bir kişinin kendi yaşamını yazması', 'Başka birinin yaşamını anlatmak', 'Anonim halk hikayesi', 'Deneme türü'], correct: 0, explanation: 'Otobiyografi, kişinin kendi hayatını kaleme aldığı türdür.', difficulty: 'kolay' },
    q3: { question: 'Biyografi ile otobiyografi arasındaki temel fark nedir?', options: ['Konusu', 'Yazarı kimdir (3. kişi mi 1. kişi mi)', 'Sayfa sayısı', 'Kullanılan dil'], correct: 1, explanation: 'Biyografide başkası, otobiyografide kişinin kendisi yazar.', difficulty: 'kolay' },
    q4: { question: 'Türk edebiyatında "Tezkire" nedir?', options: ['Eski döneme ait şairlerin hayat ve eserlerini anlatan eser', 'Dini metin', 'Mektup türü', 'Tiyatro türü'], correct: 0, explanation: 'Tezkire, divan edebiyatında şairlerin hayatını anlatan biyografi türüdür.', difficulty: 'orta' },
    q5: { question: 'Atatürk\'ün yaşamını anlatan bir eser hangi türe örnektir?', options: ['Otobiyografi', 'Biyografi', 'Anı', 'Roman'], correct: 1, explanation: 'Başkası tarafından yazılan yaşam hikayeleri biyografidir.', difficulty: 'kolay' },
    q6: { question: 'Anı (Hatırat) türünü biyografiden ayıran en temel özellik nedir?', options: ['Daha uzun olması', 'Birinci şahıs anlatımıyla yazılması ve yaşanmış anların aktarılması', 'Başkasının hayatını anlatması', 'Bilimsel alıntılar içermesi'], correct: 1, explanation: 'Anılar birinci şahısla yazılır ve yaşanmış kişisel deneyimleri aktarır.', difficulty: 'orta' },
    q7: { question: 'Halide Edip Adıvar\'ın otobiyografik eseri hangisidir?', options: ['Çalıkuşu', 'Mor Salkımlı Ev', 'Sinekli Bakkal', 'Vurun Kahpeye'], correct: 1, explanation: '"Mor Salkımlı Ev" Halide Edip Adıvar\'ın anı-otobiyografi niteliğindeki eseridir.', difficulty: 'zor' },
    q8: { question: 'Yaşanmış olayları belgeleyen ve tarihi kaynak olarak kullanılabilecek biyografik türler nelerdir?', options: ['Roman ve hikaye', 'Biyografi, otobiyografi ve anı', 'Masal ve fabl', 'Deneme ve eleştiri'], correct: 1, explanation: 'Biyografi, otobiyografi ve anılar tarihsel belge niteliği taşır.', difficulty: 'orta' },
  },
  'unit-8': {
    q1: { question: 'Mektup türünün en belirgin özelliği nedir?', options: ['Şiirsel anlatım', 'Belirli bir kişiye hitap etmesi', 'Anonim olması', 'Sahneye konulması'], correct: 1, explanation: 'Mektup, belirli bir kişiye ya da kuruma hitap eden yazılı iletişim aracıdır.', difficulty: 'kolay' },
    q2: { question: 'Resmi mektuplarda dikkat edilmesi gereken en önemli unsur hangisidir?', options: ['Duygusal anlatım', 'Süslü cümleler', 'Resmi dil ve saygılı hitap', 'Kişisel anılar'], correct: 2, explanation: 'Resmi mektuplar nesnel, saygılı ve kurallı bir dille yazılır.', difficulty: 'kolay' },
    q3: { question: 'E-posta ile geleneksel mektup arasındaki temel fark nedir?', options: ['İçerik', 'İletişim hızı ve dijital ortam kullanımı', 'Dil kuralları', 'Resmiyet derecesi'], correct: 1, explanation: 'E-posta dijital ortamda anlık iletişimi sağlar; mektup fiziksel postala gönderilir.', difficulty: 'kolay' },
    q4: { question: '"Edebi mektup" türünün özellikleri arasında hangisi yoktur?', options: ['Edebi değer taşır.', 'Sanatsal dil kullanılır.', 'Yalnızca resmi kurumlar arasında yazılır.', 'Tanınmış kişiler arasında olabilir.'], correct: 2, explanation: 'Edebi mektuplar kişiler arası yazışma olup resmi kurumlarla sınırlı değildir.', difficulty: 'orta' },
    q5: { question: 'Türk edebiyatında mektup türünün ilk örnekleri hangi dönemde görülür?', options: ['Cumhuriyet dönemi', 'Tanzimat dönemi', 'Divan edebiyatı dönemi', 'Milli Edebiyat dönemi'], correct: 2, explanation: 'Osmanlı dönemi divanlarında "name" adıyla edebi mektup örnekleri görülür.', difficulty: 'zor' },
    q6: { question: 'Bir mektubun bölümleri doğru sırayla hangisinde verilmiştir?', options: ['Gövde-Selamlama-Kapanış', 'Selamlama-Gövde-Kapanış', 'Kapanış-Gövde-Selamlama', 'Tarih-Kapanış-Gövde'], correct: 1, explanation: 'Mektup; selamlama, içerik (gövde) ve kapanış bölümlerinden oluşur.', difficulty: 'kolay' },
    q7: { question: 'Blog nedir?', options: ['Bir dizi yayınlanan basılı gazete makalesi', 'Kişisel görüş ve deneyimlerin paylaşıldığı dijital platform', 'Resmi devlet belgesi', 'Akademik araştırma makalesi'], correct: 1, explanation: 'Blog, bireylerin deneyimlerini ve düşüncelerini paylaştığı internet günlüğüdür.', difficulty: 'kolay' },
    q8: { question: 'Sosyal medya paylaşımları hangi yazı türüne en çok benzer?', options: ['Roman', 'Ansiklopedi maddesi', 'Günlük/kısa not', 'Deneme'], correct: 2, explanation: 'Sosyal medya paylaşımları anlık düşünce ve not niteliği taşır.', difficulty: 'kolay' },
  },
  'unit-9': {
    q1: { question: 'Günlük (Jurnal) türünün en belirgin özelliği nedir?', options: ['Belirli bir kişiye hitap etmesi', 'Günü gününe yazılması ve kişisel olması', 'Sahneye konulması', 'Bilimsel analiz içermesi'], correct: 1, explanation: 'Günlük, yaşananların her gün düzenli biçimde kaleme alındığı edebi türdür.', difficulty: 'kolay' },
    q2: { question: 'Anne Frank\'ın günlüğü hangi tarihi olayı anlatır?', options: ['Birinci Dünya Savaşı', 'İkinci Dünya Savaşı ve Holokost', 'Fransız Devrimi', 'Soğuk Savaş'], correct: 1, explanation: 'Anne Frank, İkinci Dünya Savaşı\'nda Nazi zulmünü kişisel günlüğüyle aktarmıştır.', difficulty: 'kolay' },
    q3: { question: 'Türk edebiyatında "günlük" türünün önemli temsilcilerinden biri kimdir?', options: ['Namık Kemal', 'Nurullah Ataç', 'Ziya Gökalp', 'Ömer Seyfettin'], correct: 1, explanation: 'Nurullah Ataç, günlüklerle Türk edebiyatına önemli katkı sağlamıştır.', difficulty: 'orta' },
    q4: { question: 'Günlük ile anı arasındaki en temel fark nedir?', options: ['Kullanılan dil', 'Günlük günü gününe, anı ise geçmişe bakarak yazılır.', 'Konu seçimi', 'Uzunluk'], correct: 1, explanation: 'Günlük anlık yaşanmışlığı, anı ise geçmişe dönük hatırayı yansıtır.', difficulty: 'orta' },
    q5: { question: 'Blog yazarlığı Türkiye\'de ne zaman yaygınlaşmaya başlamıştır?', options: ['1980\'ler', '1990\'ların sonu ve 2000\'ler', '1960\'lar', '2020\'ler'], correct: 1, explanation: 'İnternet yaygınlaşmasıyla blog kültürü 2000\'li yıllarda önem kazandı.', difficulty: 'orta' },
    q6: { question: 'Günlük türünde dil ve anlatım nasıl olmalıdır?', options: ['Çok resmi ve bürokratik', 'Kişisel, samimi ve akıcı', 'Yalnızca bilimsel terimler içeren', 'Şiirsel ve ölçülü'], correct: 1, explanation: 'Günlükler samimi, birinci şahısla ve kişisel üslup kullanılarak yazılır.', difficulty: 'kolay' },
    q7: { question: 'Hangisi bir "dijital günlük" örneği sayılabilir?', options: ['Ansiklopedi', 'Kişisel blog', 'Akademik makale', 'Haber bülteni'], correct: 1, explanation: 'Kişisel bloglar, dijital ortamda tutulan günlüklerdir.', difficulty: 'kolay' },
    q8: { question: '"Gizli Günlük" (Anne Frank\'ın Günlüğü) eserinin önemi nedir?', options: ['İlk roman olmasından kaynaklanır.', 'Tarihe tanıklık eden bir insan belgeseli olmasından kaynaklanır.', 'Bir tiyatro eseri olmasından kaynaklanır.', 'Efsanevi bir destanı anlatmasından kaynaklanır.'], correct: 1, explanation: 'Anne Frank\'ın günlüğü Holokost\'a tanıklık eden en önemli edebi belgedir.', difficulty: 'orta' },
  }
};

// ============================================================
// EŞLEŞTİRME OYUNU VERİLERİ
// ============================================================
const MATCHING_DATA = {
  m1: {
    title: 'Sanatçı ve Eserleri - Hikaye',
    icon: '📚',
    color: 'from-amber-400 to-orange-500',
    pairs: [
      { left: 'Küçük Şeyler', right: 'Sami Paşazade Sezai' },
      { left: 'Yüksek Ökçeler', right: 'Refik Halit Karay' },
      { left: 'Memleket Hikayeleri', right: 'Refik Halit Karay' },
      { left: 'Semaver', right: 'Sait Faik Abasıyanık' },
      { left: 'Efruz Bey', right: 'Ömer Seyfettin' }
    ]
  },
  m2: {
    title: 'Edebi Akımlar ve Temsilcileri',
    icon: '🎭',
    color: 'from-indigo-500 to-purple-600',
    pairs: [
      { left: 'Klasisizm', right: 'Moliere' },
      { left: 'Romantizm', right: 'Victor Hugo' },
      { left: 'Realizm', right: 'Gustave Flaubert' },
      { left: 'Natüralizm', right: 'Emile Zola' },
      { left: 'Sembolizm', right: 'Baudelaire' }
    ]
  },
  m3: {
    title: 'Roman Kahramanları',
    icon: '👤',
    color: 'from-rose-400 to-pink-600',
    pairs: [
      { left: 'Feride', right: 'Çalıkuşu' },
      { left: 'Bihter', right: 'Aşk-ı Memnu' },
      { left: 'Neriman', right: 'Çalıkuşu (yok) / Sinekli Bakkal' },
      { left: 'Zehra', right: 'Zehra (Nabizade Nazım)' },
      { left: 'Rakım Efendi', right: 'Felatun Bey ile Rakım Efendi' }
    ]
  },
  m4: {
    title: 'Şiir Türleri ve Özellikleri',
    icon: '✍️',
    color: 'from-teal-400 to-emerald-600',
    pairs: [
      { left: 'Epik şiir', right: 'Kahramanlık teması' },
      { left: 'Lirik şiir', right: 'Coşkulu duygu anlatımı' },
      { left: 'Dramatik şiir', right: 'Tiyatro diyaloğu' },
      { left: 'Didaktik şiir', right: 'Öğretici amaç' },
      { left: 'Satirik şiir', right: 'Yergi ve hiciv' }
    ]
  },
  m5: {
    title: 'Dil ve İşlevleri',
    icon: '💬',
    color: 'from-cyan-400 to-blue-600',
    pairs: [
      { left: 'Göndergesel işlev', right: 'Bilgi aktarımı' },
      { left: 'Şiirsel işlev', right: 'Estetik güzellik' },
      { left: 'Heyecana bağlı işlev', right: 'Duygu ifadesi' },
      { left: 'Kanalı kontrol işlevi', right: 'İletişim kontrolü' },
      { left: 'Alıcıyı harekete geçirme', right: 'Yönlendirme/ikna' }
    ]
  },
  m6: {
    title: 'Türk Edebiyatı Dönemleri',
    icon: '⏳',
    color: 'from-yellow-400 to-amber-600',
    pairs: [
      { left: 'Tanzimat 1. Dönem', right: 'Şinasi - Namık Kemal' },
      { left: 'Tanzimat 2. Dönem', right: 'Recaizade - Halit Ziya' },
      { left: 'Servet-i Fünun', right: 'Tevfik Fikret - Cenap Şahabettin' },
      { left: 'Milli Edebiyat', right: 'Ömer Seyfettin - Ziya Gökalp' },
      { left: 'Cumhuriyet Dönemi', right: 'Nazım Hikmet - Orhan Veli' }
    ]
  }
};

// ============================================================
// FLASHCARD VERİLERİ
// ============================================================
const FLASHCARD_DATA = {
  f1: {
    title: 'Edebi Sanatlar',
    icon: '🎨',
    color: 'from-violet-400 to-purple-600',
    cards: [
      { front: 'Teşbih (Benzetme)', back: 'İki şey arasında benzerlik kurarak anlatımı güçlendirme sanatıdır. 4 unsur: benzeyen, kendisine benzetilen, benzetme yönü, benzetme edatı.' },
      { front: 'İstiare', back: 'Benzetmenin sadece bir öğesiyle yapılan dolaylı anlatım sanatıdır. Açık ve kapalı istiare olmak üzere ikiye ayrılır.' },
      { front: 'Mecaz-ı Mürsel', back: 'Bir sözün benzetme amacı gütmeksizin ilgisi olan başka bir söz yerine kullanılmasıdır. (Parça-bütün, neden-sonuç vb.)' },
      { front: 'Kişileştirme (Teşhis)', back: 'İnsan dışı varlıklara insan özelliği, duygu ve düşünce atfetmektir.' },
      { front: 'Abartma (Mübalağa)', back: 'Bir şeyin olduğundan çok daha büyük ya da çok daha küçük gösterilmesidir.' },
      { front: 'Antitez (Tezat)', back: 'Zıt anlama gelen sözcükleri bir arada kullanarak anlam güçlendirmedir.' },
      { front: 'Aliterasyon', back: 'Aynı ünsüz harfin dize ya da cümlede birden çok kez tekrar etmesidir.' },
      { front: 'Asonans', back: 'Aynı ünlü seslerin yan yana ya da yakına gelmesiyle oluşan ses uyumudur.' }
    ]
  },
  f2: {
    title: 'Nazım Biçimleri',
    icon: '📜',
    color: 'from-emerald-400 to-teal-600',
    cards: [
      { front: 'Gazel', back: 'Aruzla yazılan ve genellikle aşk, şarap, tasavvuf temalarını işleyen divan şiiri türüdür. En az 5, en fazla 15 beyitten oluşur.' },
      { front: 'Kaside', back: 'İlk ikinci beytinden sonra tek kafiyeyle devam eden, genellikle övgü amaçlı divan şiiri türüdür.' },
      { front: 'Koşma', back: '11\'li hece ölçüsüyle yazılan, kafiye şeması abab/cccb olan en yaygın halk şiiri türüdür.' },
      { front: 'Mani', back: 'Genellikle 7\'li hece ölçüsüyle yazılan, 4 dizeden oluşan en kısa halk şiiri türüdür.' },
      { front: 'Sone', back: 'Batı edebiyatından alınan, 2 dörtlük ve 2 üçlükten oluşan 14 dizelik şiir biçimidir.' },
      { front: 'Terzarima', back: 'Aba–bcb–cdc şeklinde birbirini kovalayan kafiye düzenidir; Dante\'nin Divina Commedia\'sında kullanmıştır.' },
      { front: 'Serbest Şiir', back: 'Herhangi bir ölçü ya da uyak zorunluluğu bulunmayan şiir biçimidir.' },
      { front: 'Naat', back: 'Hz. Peygamber\'i övmek amacıyla yazılan divan şiiri türüdür.' }
    ]
  },
  f3: {
    title: 'Önemli Tanımlar',
    icon: '📘',
    color: 'from-blue-400 to-indigo-600',
    cards: [
      { front: 'Tema', back: 'Bir edebi eserin işlediği soyut ve genel düşünce ya da duygu, eserin özgün mesajıdır.' },
      { front: 'Motif', back: 'Edebi eserde tekrar eden ve temayı destekleyen küçük birimdir. (Aşk, ölüm, özlem vb.)' },
      { front: 'Konu', back: 'Eserde ele alınan somut olay ya da durumun genel adıdır; temadan daha dar kapsamlıdır.' },
      { front: 'Anlatıcı', back: 'Edebi metni okuyucuya aktaran, gerçek olmayan ve kurgu içindeki bir sestir.' },
      { front: 'Bakış Açısı', back: 'Anlatıcının olayları hangi gözle ve yerden aktardığını belirler. İlahi, kahraman, gözlemci.' },
      { front: 'Olay Örgüsü', back: 'Hikaye ya da romandaki olayların neden-sonuç ilişkisiyle birbirine bağlandığı yapıdır.' },
      { front: 'Diyalog', back: 'Eserde iki ya da daha fazla karakterin karşılıklı konuşmasıdır.' },
      { front: 'Monolog', back: 'Bir karakterin yalnız ya da kendi kendine konuşmasıdır.' }
    ]
  }
};

// ============================================================
// TABLO ALIŞTIRMALARI
// ============================================================
const TABLE_DATA = {
  t1: {
    title: 'Edebi Dönemler Karşılaştırması',
    icon: '⏳',
    color: 'from-amber-400 to-orange-600',
    headers: ['Dönem', 'Yıllar', 'Önemli Özellik', 'Temsilci Yazar'],
    rows: [
      { cells: [
        { value: 'Tanzimat 1.Dönem', isBlank: false },
        { value: '1860-1876', isBlank: false },
        { value: 'Toplum için sanat', isBlank: true, hint: 'Sanat anlayışı' },
        { value: 'Namık Kemal', isBlank: true, hint: 'Vatan şairi' }
      ]},
      { cells: [
        { value: 'Servet-i Fünun', isBlank: false },
        { value: '1896-1901', isBlank: false },
        { value: 'Sanat için sanat', isBlank: true, hint: 'Sanat anlayışı' },
        { value: 'Tevfik Fikret', isBlank: true, hint: 'Sis şairi' }
      ]},
      { cells: [
        { value: 'Milli Edebiyat', isBlank: true, hint: 'Milliyetçi dönem' },
        { value: '1911-1923', isBlank: false },
        { value: 'Sade Türkçe ve milliyetçilik', isBlank: false },
        { value: 'Ömer Seyfettin', isBlank: true, hint: 'Hikaye ustası' }
      ]},
      { cells: [
        { value: 'Cumhuriyet Dönemi', isBlank: false },
        { value: '1923-...', isBlank: false },
        { value: 'Toplumcu gerçekçilik', isBlank: true, hint: 'Sanat akımı' },
        { value: 'Nazım Hikmet', isBlank: true, hint: 'Hepsi güzel olacak' }
      ]}
    ]
  },
  t2: {
    title: 'Şiir Türleri Tablosu',
    icon: '✍️',
    color: 'from-violet-400 to-indigo-600',
    headers: ['Tür', 'Ölçü', 'Konu', 'Örnek'],
    rows: [
      { cells: [
        { value: 'Gazel', isBlank: false },
        { value: 'Aruz', isBlank: true, hint: 'Ölçü türü' },
        { value: 'Aşk ve şarap', isBlank: false },
        { value: 'Fuzuli', isBlank: true, hint: 'Divan şairi' }
      ]},
      { cells: [
        { value: 'Koşma', isBlank: false },
        { value: 'Hece (11\'li)', isBlank: true, hint: 'Halk şiiri ölçüsü' },
        { value: 'Aşk, doğa, ayrılık', isBlank: false },
        { value: 'Karacaoğlan', isBlank: true, hint: 'Halk şairi' }
      ]},
      { cells: [
        { value: 'Sone', isBlank: false },
        { value: 'Serbest ya da hece', isBlank: false },
        { value: 'Çeşitli', isBlank: false },
        { value: 'Shakespeare', isBlank: true, hint: 'İngiliz yazar' }
      ]},
      { cells: [
        { value: 'Mani', isBlank: false },
        { value: 'Hece (7\'li)', isBlank: true, hint: 'Ölçü' },
        { value: 'Kısa söz-bilmece', isBlank: false },
        { value: 'Anonim halk', isBlank: true, hint: 'Kim yazmıştır?' }
      ]}
    ]
  },
  t3: {
    title: 'Roman-Hikaye Karşılaştırması',
    icon: '📖',
    color: 'from-rose-400 to-pink-600',
    headers: ['Özellik', 'Roman', 'Hikaye'],
    rows: [
      { cells: [
        { value: 'Uzunluk', isBlank: false },
        { value: 'Uzun', isBlank: true, hint: 'Boyut' },
        { value: 'Kısa', isBlank: true, hint: 'Boyut' }
      ]},
      { cells: [
        { value: 'Kişi sayısı', isBlank: false },
        { value: 'Çok (geniş kadro)', isBlank: true, hint: 'Az mı çok mu?' },
        { value: 'Az (sınırlı)', isBlank: true, hint: 'Az mı çok mu?' }
      ]},
      { cells: [
        { value: 'Zaman', isBlank: false },
        { value: 'Uzun süreç', isBlank: true, hint: 'Kısa mı uzun mu?' },
        { value: 'Kısa kesit', isBlank: true, hint: 'Kısa mı uzun mu?' }
      ]},
      { cells: [
        { value: 'Mekan', isBlank: false },
        { value: 'Birden fazla mekan', isBlank: true, hint: 'Mekan çeşitliliği' },
        { value: 'Tek ya da sınırlı mekan', isBlank: true, hint: 'Mekan çeşitliliği' }
      ]}
    ]
  }
};

// ============================================================
// VERİTABANINA YAZMA
// ============================================================
async function injectAll() {
  console.log('\n===== Kapsamlı Veri Yükleme Başladı =====\n');

  console.log('Quiz soruları yükleniyor...');
  await set(ref(db, 'questions'), QUIZ_DATA);
  const totalQ = Object.values(QUIZ_DATA).reduce((acc, unit) => acc + Object.keys(unit).length, 0);
  console.log(`  ✓ ${totalQ} soru ${Object.keys(QUIZ_DATA).length} üniteye yüklendi.`);

  console.log('Eşleştirme oyunları yükleniyor...');
  await set(ref(db, 'matching'), MATCHING_DATA);
  console.log(`  ✓ ${Object.keys(MATCHING_DATA).length} eşleştirme oyunu yüklendi.`);

  console.log('Flashcard demetleri yükleniyor...');
  await set(ref(db, 'flashcards'), FLASHCARD_DATA);
  const totalF = Object.values(FLASHCARD_DATA).reduce((acc, deck) => acc + deck.cards.length, 0);
  console.log(`  ✓ ${totalF} kart ${Object.keys(FLASHCARD_DATA).length} demete yüklendi.`);

  console.log('Tablo alıştırmaları yükleniyor...');
  await set(ref(db, 'tables'), TABLE_DATA);
  console.log(`  ✓ ${Object.keys(TABLE_DATA).length} tablo alıştırması yüklendi.`);

  console.log('\n===== TAMAMLANDI =====\n');
  console.log(`ÖZET:`);
  console.log(`  Quiz soruları: ${totalQ} (9 ünite)`);
  console.log(`  Eşleştirme oyunları: ${Object.keys(MATCHING_DATA).length}`);
  console.log(`  Flashcard kartları: ${totalF}`);
  console.log(`  Tablo alıştırmaları: ${Object.keys(TABLE_DATA).length}`);
  process.exit(0);
}

injectAll().catch(err => {
  console.error('HATA:', err);
  process.exit(1);
});
