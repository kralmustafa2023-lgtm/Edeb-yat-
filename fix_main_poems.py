import re

file_path = r"c:\Users\pcx\Desktop\mstf (5)\New folder (5)\src\app\data\poetsData.ts"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# ── YUNUS EMRE ────────────────────────────────────────────────────────────────
# PDF: Redif = "Gel gör beni aşk neyledi" (her dörtlüğün son mısrası)
# Kafiye: yane-kane-divane / gibi-gibi-gibi / çağlarım-dağlarım-ağlarım ...
yunus_stanzas = """      stanzas: [
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
      ]"""

# ── BAKİ ─────────────────────────────────────────────────────────────────────
# PDF: Redif = "Bu gece Kanûnî Sultan Süleyman gezer" (her bendin son mısrası)
baki_stanzas = """      stanzas: [
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
      ]"""

# ── KARACAOĞLAN (Köroğlu Koşması) ──────────────────────────────────────────
# PDF: Redif yoktur. Kafiye: hiddetli/gitmiş
karacaoglan_stanzas = """      stanzas: [
        {
          lines: [
            [w('Köroğlu'), w('geliyor'), wt('hiddetli,', ['kafiye'], 'Kafiye: hiddetli')],
            [w('Atı'), w('Mahmura'), w('binmiş'), wt('gitmiş.', ['kafiye'], 'Kafiye: gitmiş')],
            [w('Köroğlu'), w('geliyor'), wt('hiddetli,', ['kafiye'], '')],
            [w('Atı'), w('Mahmura'), w('binmiş'), wt('gitmiş.', ['kafiye'], '')]
          ]
        }
      ]"""

# ── NAMIK KEMAL ──────────────────────────────────────────────────────────────
# PDF: Redif = "hürriyetsiz" (3. ve 4. mısralarda)
# Kafiye: makber-Peygamber / hürriyetsiz-hürriyetsiz
namik_stanzas = """      stanzas: [
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
      ]"""

# ── MEHMET AKİF ──────────────────────────────────────────────────────────────
# PDF: Redif yoktur. Kafiye: sancak-ocak / parlayacak-ancak / hilâl-celâl / helâl-istiklâl
akif_stanzas = """      stanzas: [
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
      ]"""

# ── YAHYA KEMAL (Sessiz Gemi) ─────────────────────────────────────────────
# PDF: Redif = "Dünyanın bir ucuna gidelim" (tekrar eden satır)
yahya_stanzas = """      stanzas: [
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
      ]"""

# ── FARUK NAFİZ ──────────────────────────────────────────────────────────────
# PDF: Redif yoktur. Kafiye: gölgeler-hatıra / kimsesiz-harabe
faruk_stanzas = """      stanzas: [
        {
          lines: [
            [w('Duvarlara'), w('konan'), wt('gölgeler,', ['kafiye'], 'Kafiye: gölgeler-hatıra')],
            [w('Birer'), w('hayal,'), w('birer'), wt('hatıra.', ['kafiye'], '')],
            [w('Bu'), w('han'), w('ne'), w('kadar'), w('sessiz,'), w('ne'), w('kadar'), wt('kimsesiz,', ['kafiye'], 'Kafiye: kimsesiz-harabe')],
            [w('Ne'), w('kadar'), w('ıssız,'), w('ne'), w('kadar'), wt('harabe.', ['kafiye'], '')]
          ]
        }
      ]"""

# ── AHMET KUTSİ ──────────────────────────────────────────────────────────────
# PDF: Nerdesin - doğru mısralar
ahmet_stanzas = """      stanzas: [
        {
          lines: [
            [w('Geceleyin'), w('bir'), w('ses'), w('böler'), wt('uykumu,', ['kafiye'], 'Kafiye: uykumu-onu')],
            [w('İçim'), w('ürpermeyle'), w('dolar:'), wt('-Nerdesin?', ['redif'], 'Redif: Nerdesin')],
            [w('Arıyorum'), w('yıllar'), w('var'), w('ki'), w('ben'), wt('onu,', ['kafiye'], '')],
            [w('Aşıkıyım'), w('beni'), w('çağıran'), w('bu'), wt('sesin.', ['kafiye'], 'Kafiye: sesin')]
          ]
        },
        {
          lines: [
            [w('Gün'), w('olur'), w('sürüyüp'), w('beni'), wt('derbeder,', ['kafiye'], 'Kafiye: derbeder-gider-beraber')],
            [w('Bu'), w('ses'), w('rüzgarlara'), w('karışır'), wt('gider.', ['kafiye'], '')],
            [w('Gün'), w('olur,'), w('peşimden'), w('yürür'), wt('beraber,', ['kafiye'], '')],
            [w('Ansızın'), w('haykırır'), w('bana:'), wt('-Nerdesin?', ['redif'], 'Redif: Nerdesin')]
          ]
        },
        {
          lines: [
            [w('Bütün'), w('sevgileri'), w('atıp'), wt('içimden,', ['kafiye'], 'Kafiye: içimden-ben-derinden')],
            [w('Varlığımı'), w('yalnız'), w('ona'), w('verdim'), wt('ben,', ['kafiye'], '')],
            [w('Elverir'), w('ki'), w('bir'), w('gün'), w('bana'), wt('derinden,', ['kafiye'], '')],
            [w('Ta'), w('derinden'), w('bir'), w('gün'), w('bana'), w('"Gel"'), wt('desin.', ['kafiye'], 'Kafiye: sesin-desin')]
          ]
        }
      ]"""

# ── CAHİT SITKI ──────────────────────────────────────────────────────────────
# PDF: Redif yoktur. Kafiye: eder-ömrün / cevher-önün
cahit_stanzas = """      stanzas: [
        {
          lines: [
            [w('Yaş'), w('otuz'), w('beş!'), w('Yolun'), w('yarısı'), wt('eder.', ['kafiye'], 'Kafiye: eder-cevher')],
            [w('Dante'), w('gibi'), w('ortasındayız'), wt('ömrün.', ['kafiye'], 'Kafiye: ömrün-önün')],
            [w('Delikanlı'), w('çağımızdaki'), wt('cevher,', ['kafiye'], '')],
            [w('Yalvarmak,'), w('yakarmak'), w('nafile'), wt('bugün.', ['kafiye'], '')]
          ]
        },
        {
          lines: [
            [w('Şakaklarıma'), w('kar'), w('mı'), w('yağdı'), w('ne'), wt('var?', ['kafiye'], 'Kafiye: var-halkalar')],
            [w('Benim'), w('mi'), w('Allah\\'ım'), w('bu'), w('çizgili'), wt('yüz?', ['kafiye'], 'Kafiye: yüz-görünürsünüz')],
            [w('Ya'), w('gözler'), w('altındaki'), w('mor'), wt('halkalar?', ['kafiye'], '')],
            [w('Neden'), w('böyle'), w('düşman'), w('görünürsünüz'), wt('yüz,', ['kafiye'], '')]
          ]
        }
      ]"""

# ── ORHAN VELİ ───────────────────────────────────────────────────────────────
# PDF: Redif = "İstanbul'u dinliyorum" (son mısra). Serbest kafiye.
orhan_stanzas = """      stanzas: [
        {
          lines: [
            [wt("İstanbul'u", ['redif'], "Redif: İstanbul'u dinliyorum"), wt('dinliyorum,', ['redif'], ''), w('gözlerim'), w('kapalı;')],
            [w('Önce'), w('hafiften'), w('bir'), w('rüzgar'), w('esiyor;')],
            [w('Yavaş'), w('yavaş'), w('sallanıyor')],
            [w('Yapraklar,'), w('ağaçlarda;')],
            [w('Uzaklarda,'), w('çok'), w('uzaklarda,')],
            [w('Sucuların'), w('hiç'), w('durmayan'), w('çıngırakları')],
            [wt("İstanbul'u", ['redif'], ''), wt('dinliyorum,', ['redif'], ''), w('gözlerim'), w('kapalı.')]
          ]
        },
        {
          lines: [
            [wt("İstanbul'u", ['redif'], ''), wt('dinliyorum,', ['redif'], ''), w('gözlerim'), w('kapalı;')],
            [w('Kuşlar'), w('geçiyor,'), w('derken;')],
            [w('Yükseklerden,'), w('sürü'), w('sürü,'), w('çığlık'), w('çığlık.')],
            [w('Ağlar'), w('çekiliyor'), w('dalyanlarda;')],
            [w('Bir'), w('kadının'), w('suya'), w('değiyor'), w('ayakları;')],
            [wt("İstanbul'u", ['redif'], ''), wt('dinliyorum,', ['redif'], ''), w('gözlerim'), w('kapalı.')]
          ]
        },
        {
          lines: [
            [wt("İstanbul'u", ['redif'], ''), wt('dinliyorum,', ['redif'], ''), w('gözlerim'), w('kapalı;')],
            [w('Serin'), w('serin'), w('Kapalıçarşı')],
            [w('Cıvıl'), w('cıvıl'), w('Mahmutpaşa,')],
            [w('Güvercin'), w('dolu'), w('avlular,')],
            [w('Çekiç'), w('sesleri,'), w('tellerden'), w('geçen'), w('tramvaylar,')],
            [w('Martıların'), w('açık'), w('denizde')],
            [wt("İstanbul'u", ['redif'], ''), wt('dinliyorum,', ['redif'], ''), w('gözlerim'), w('kapalı.')]
          ]
        },
        {
          lines: [
            [wt("İstanbul'u", ['redif'], ''), wt('dinliyorum,', ['redif'], ''), w('gözlerim'), w('kapalı;')],
            [w('Başımda'), w('eski'), w('alemlerin'), w('sarhoşluğu,')],
            [w('Loş'), w('kayıkhaneleriyle'), w('bir'), w('yalı;')],
            [w('Dinmiş'), w('lodosların'), w('uğultusu'), w('içinde')],
            [wt("İstanbul'u", ['redif'], ''), wt('dinliyorum,', ['redif'], ''), w('gözlerim'), w('kapalı.')]
          ]
        }
      ]"""

def replace_stanzas(content, poet_id, new_stanzas):
    # Find the poet block, then find mainPoem stanzas within it
    search = f"id: '{poet_id}'"
    idx = content.find(search)
    if idx == -1:
        # try double quotes
        search = f'id: "{poet_id}"'
        idx = content.find(search)
    if idx == -1:
        print(f"  WARN: poet {poet_id} not found")
        return content

    # Find next 'stanzas: [' after the poet id
    stanzas_start = content.find('stanzas: [', idx)
    if stanzas_start == -1:
        print(f"  WARN: stanzas not found for {poet_id}")
        return content

    # Find the matching close bracket for the stanzas array
    # We start counting from the '[' after 'stanzas: '
    bracket_pos = stanzas_start + len('stanzas: ')  # points to '['
    depth = 0
    end_pos = bracket_pos
    for i in range(bracket_pos, len(content)):
        if content[i] == '[':
            depth += 1
        elif content[i] == ']':
            depth -= 1
            if depth == 0:
                end_pos = i + 1
                break

    old_stanzas = content[stanzas_start:end_pos]
    replacement = new_stanzas.strip()
    content = content[:stanzas_start] + replacement + content[end_pos:]
    print(f"  OK: replaced stanzas for {poet_id}")
    return content

replacements = [
    ('yunus-emre', yunus_stanzas),
    ('baki',       baki_stanzas),
    ('karacaoglan', karacaoglan_stanzas),
    ('namik-kemal', namik_stanzas),
    ('mehmet-akif', akif_stanzas),
    ('yahya-kemal', yahya_stanzas),
    ('faruk-nafiz', faruk_stanzas),
    ('ahmet-kutsi', ahmet_stanzas),
    ('cahit-sitki', cahit_stanzas),
    ('orhan-veli',  orhan_stanzas),
]

for poet_id, stanzas in replacements:
    content = replace_stanzas(content, poet_id, stanzas)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Done.")
