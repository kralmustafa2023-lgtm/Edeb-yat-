file_path = r"c:\Users\pcx\Desktop\mstf (5)\New folder (5)\src\app\data\poetsData.ts"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# ============================================================
# Find and replace entire mainPoem stanzas + analysisDetails
# for each poet, based on corrected PDF
# ============================================================

# Helper to find the mainPoem block for a poet and replace it
def replace_main_poem(content, poet_id, new_poem_block):
    # Find "id: 'poet_id'" then find "mainPoem: {" after it
    start_marker = f"id: '{poet_id}'"
    idx = content.find(start_marker)
    if idx == -1:
        print(f"ERROR: Could not find poet {poet_id}")
        return content
    
    mp_start = content.find("mainPoem: {", idx)
    if mp_start == -1:
        print(f"ERROR: Could not find mainPoem for {poet_id}")
        return content
    
    # Balance braces to find end of mainPoem block
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
# 1. YUNUS EMRE - 3 kıta, 8'li hece, redif 7x, PDF metni
# ============================================================
yunus_poem = """mainPoem: {
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
    }"""

content = replace_main_poem(content, 'yunus-emre', yunus_poem)

# ============================================================
# 2. FUZULI (Gazel Aziz İstanbul - Yahya Kemal'in gerçek metni)
# ============================================================
fuzuli_poem = """mainPoem: {
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
    }"""

content = replace_main_poem(content, 'fuzuli', fuzuli_poem)

# ============================================================
# 3. BAKİ - Kanuni Mersiyesi (Osmanlıca orijinal metin)
# ============================================================
baki_poem = """mainPoem: {
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
    }"""

content = replace_main_poem(content, 'baki', baki_poem)

# ============================================================
# 4. KARACAOĞLAN - Köroğlu Koşması (PDF'deki doğru metin)
# ============================================================
karacaoglan_poem = """mainPoem: {
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
    }"""

content = replace_main_poem(content, 'karacaoglan', karacaoglan_poem)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Part A done: Yunus, Fuzuli, Baki, Karacaoglan updated.")
