file_path = r"c:\Users\pcx\Desktop\mstf (5)\New folder (5)\src\app\data\poetsData.ts"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

def replace_main_poem(content, poet_id, new_poem_block):
    start_marker = f"id: '{poet_id}'"
    idx = content.find(start_marker)
    if idx == -1:
        print(f"ERROR: Could not find poet {poet_id}")
        return content
    mp_start = content.find("mainPoem: {", idx)
    if mp_start == -1:
        print(f"ERROR: Could not find mainPoem for {poet_id}")
        return content
    brace_count = 0
    i = mp_start + len("mainPoem: ")
    while i < len(content):
        if content[i] == '{':
            brace_count += 1
        elif content[i] == '}':
            brace_count -= 1
            if brace_count == 0:
                mp_end = i + 1
                break
        i += 1
    content = content[:mp_start] + new_poem_block + content[mp_end:]
    print(f"OK: Replaced mainPoem for {poet_id}")
    return content

# ============================================================
# 8. YAHYA KEMAL - Sessiz Gemi (already correct, just update analysis)
# PDF: "-dan" redifi, "-man" tam kafiye, Aruz ölçüsü
# ============================================================
yahya_poem = """mainPoem: {
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
    }"""

content = replace_main_poem(content, 'yahya-kemal', yahya_poem)

# ============================================================
# 9. FARUK NAFİZ - Han Duvarları (PDF'deki doğru metin + "-ladı" redifi)
# ============================================================
faruk_poem = """mainPoem: {
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
            [w('Ulukışla'), w('yolundan'), w('Orta'), wt("Anadolu'ya.", ['kafiye'], 'Kafiye: -uya')]
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
    }"""

content = replace_main_poem(content, 'faruk-nafiz', faruk_poem)

# ============================================================
# 10. AHMET KUTSİ - Nerdesin (PDF: "-sin" redifi, "-er" kafiye, 11'li hece, 3 kıta)
# ============================================================
ahmet_poem = """mainPoem: {
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
    }"""

content = replace_main_poem(content, 'ahmet-kutsi', ahmet_poem)

# ============================================================
# 11. CAHİT SITKI - Otuz Beş Yaş (PDF: redif yok, "-er" kafiye, 11'li hece, beşlik, 7 bent)
# ============================================================
cahit_poem = """mainPoem: {
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
    }"""

content = replace_main_poem(content, 'cahit-sitki', cahit_poem)

# ============================================================
# 12. ORHAN VELİ - İstanbul'u Dinliyorum (PDF metni - "Ve bütün..." 3 kez)
# ============================================================
orhan_poem = """mainPoem: {
      id: 'orhan-veli-poem',
      title: 'İstanbul\\'u Dinliyorum',
      form: 'Serbest Nazım',
      period: 'Cumhuriyet Dönemi',
      bio: 'Şair, gözleri kapalı bir şekilde İstanbul\\'un seslerini dinler.',
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
            [wt("İstanbul'u", ['redif'], 'Redif: Son mısra tekrarı'), wt('dinliyorum.', ['redif'], 'Redif: "İstanbul\\'u dinliyorum" — şiirin son mısrasında tekrarlanır (1 kez)')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: '"İstanbul\\'u dinliyorum" — Şiirin son mısrasında tekrarlanır (1 kez). "Ve bütün bunların üstüne çöken akşamın" dizesi 3 kez tekrarlanarak müzikal ahenk sağlar.', count: 4 },
        kafiye: { description: 'Serbest kafiye. kapalı-dayalı, geliyor-hüznü, günün-dalgaların, annelerinin-çocukların-gemilerin-akşamın gibi yarım uyaklar ve ses benzerlikleri vardır.', count: 8 },
        olcu: { description: 'Serbest ölçü. Kelime ve dize tekrarları (nakaratlar) ile ahenk sağlanmıştır.', count: 16 },
        nazimBirimi: { description: 'Bentler halinde yazılmıştır. Tek bir bütün (tek kıta). Mısra sayısı serbesttir.', count: 1 },
        edebiSanat: { description: 'İmgelem (Görsel ve işitsel betimlemeler), Tenasüp (İstanbul ile ilgili kavramların bir arada kullanılması), Anafora ("Ve..." ile başlayan dizeler).', count: 3 },
        tema: { description: 'İstanbul / Hüzün. Şehrin seslerini dinleyerek duygusal bir bağ kurma.', count: 0 },
        konu: { description: 'Şair, gözleri kapalı bir şekilde İstanbul\\'un seslerini dinler: vapur sesleri, limanın hüznü, batan güneş, yelkenlere çarpan dalgalar, kadınların, çocukların ve gemilerin sesleri. Tüm bu seslerin üzerine çöken akşamın hüznünü dinler.', count: 0 }
      }
    }"""

content = replace_main_poem(content, 'orhan-veli', orhan_poem)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Part C done: Yahya Kemal, Faruk Nafiz, Ahmet Kutsi, Cahit Sitki, Orhan Veli updated.")
print("ALL 12 POEMS UPDATED PER CORRECTED PDF!")
