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
# 5. NAMIK KEMAL - Hürriyet Kasidesi (Osmanlıca orijinal, "-etten" redifi)
# ============================================================
namik_poem = """mainPoem: {
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
    }"""

content = replace_main_poem(content, 'namik-kemal', namik_poem)

# ============================================================
# 6. TEVFİK FİKRET - Sis/Siste Söyleniş (Yahya Kemal'in gerçek Sis metni)
# ============================================================
fikret_poem = """mainPoem: {
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
    }"""

content = replace_main_poem(content, 'tevfik-fikret', fikret_poem)

# ============================================================
# 7. MEHMET AKİF - İstiklal Marşı (3 kıta - PDF'de "ilk üç kıta")
# ============================================================
akif_poem = """mainPoem: {
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
            [w('Hakkıdır,'), w("Hakk'a"), w('tapan'), w('milletimin'), wt('istiklal.', ['kafiye'], 'Kafiye: -lal')]
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
    }"""

content = replace_main_poem(content, 'mehmet-akif', akif_poem)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Part B done: Namik Kemal, Tevfik Fikret, Mehmet Akif updated.")
