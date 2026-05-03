import re

file_path = "src/app/data/poetsData.ts"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

def replace_between(content, start_str, end_str, replacement):
    start_idx = content.find(start_str)
    if start_idx == -1:
        print(f"Could not find {start_str}")
        return content
    end_idx = content.find(end_str, start_idx)
    if end_idx == -1:
        print(f"Could not find {end_str}")
        return content
    end_idx += len(end_str)
    return content[:start_idx] + replacement + content[end_idx:]

# 1. Otuz Beş Yaş
content = content.replace(
    "[w('Geç'), w('farkettim'), a('s'), at('ert', ['kafiye'], 'Zengin Kafiye: -ert'), a('olduğun'), at('u.', ['redif'], 'Redif: olduğunu sözcüğü')]",
    "[w('Geç'), w('farkettim'), w('taşın'), a('s'), at('ert', ['kafiye'], 'Zengin Kafiye: -ert'), a('olduğun'), at('u.', ['redif'], 'Redif: olduğunu sözcüğü')]"
)

# 2. İstanbul'u Dinliyorum
istanbul_stanzas = """    {
      lines: [
        [wt('İstanbul\\'u', ['konu', 'redif'], ''), wt('dinliyorum,', ['redif', 'edebiSanat'], ''), wt('gözlerim', ['redif'], ''), wt('kapalı;', ['redif'], '')],
        [wt('Kuşlar', ['tema', 'olcu'], 'Ses imgesi: kuş sesi'), w('geçiyor,'), wt('derken;', ['konu'], '')],
        [wt('Yükseklerden,', ['olcu'], ''), w('sürü'), w('sürü,'), w('çığlık'), w('çığlık.')],
        [wt('Ağlar', ['konu'], 'İstanbul\\'a özgü faaliyet'), w('çekiliyor'), wt('dalyanlarda;', ['tema', 'olcu'], '')],
        [w('Bir'), w('kadının'), w('suya'), w('değiyor'), w('ayakları;')],
        [wt('İstanbul\\'u', ['konu', 'redif'], ''), wt('dinliyorum,', ['redif', 'edebiSanat'], ''), wt('gözlerim', ['redif'], ''), wt('kapalı.', ['redif'], '')],
      ],
    },
    {
      lines: [
        [wt('İstanbul\\'u', ['konu', 'redif'], ''), wt('dinliyorum,', ['redif', 'edebiSanat'], ''), wt('gözlerim', ['redif'], ''), wt('kapalı;', ['redif'], '')],
        [wt('Serin', ['edebiSanat', 'olcu'], 'Aliterasyon: "s" sesi'), wt('serin', ['edebiSanat', 'olcu'], ''), wt('Kapalıçarşı', ['konu'], 'İstanbul\\'a özgü mekân')],
        [wt('Cıvıl', ['edebiSanat', 'olcu'], 'Ses yansıması'), wt('cıvıl', ['edebiSanat', 'olcu'], ''), wt('Mahmutpaşa', ['konu'], '')],
        [wt('Güvercin', ['tema'], 'Tema: İstanbul\\'un imgesi'), w('dolu'), w('avlular')],
        [wt('Çekiç', ['olcu'], 'Ses yansıması: çekiç sesi'), w('sesleri'), w('geliyor'), wt('dokaplardan', ['konu'], '')],
        [wt('Güzelim', ['tema', 'konu', 'olcu'], ''), w('bahar'), w('rüzgarında'), w('ter'), w('kokuları;')],
        [wt('İstanbul\\'u', ['konu', 'redif'], ''), wt('dinliyorum,', ['redif', 'edebiSanat'], ''), wt('gözlerim', ['redif'], ''), wt('kapalı.', ['redif'], '')],
      ],
    },
    {
      lines: [
        [wt('İstanbul\\'u', ['konu', 'redif'], ''), wt('dinliyorum,', ['redif', 'edebiSanat'], ''), wt('gözlerim', ['redif'], ''), wt('kapalı;', ['redif'], '')],
        [w('Başımda'), wt('eski', ['tema', 'konu'], ''), w('alemlerin'), w('sarhoşluğu')],
        [w('Loş'), w('kayıkhaneleriyle'), wt('bir', ['olcu', 'tema'], ''), w('yalı;')],
        [wt('Dinmiş', ['konu'], ''), w('lodosların'), wt('uğultusu', ['tema'], ''), w('içinde')],
        [wt('İstanbul\\'u', ['konu', 'redif'], ''), wt('dinliyorum,', ['redif', 'edebiSanat'], ''), wt('gözlerim', ['redif'], ''), wt('kapalı.', ['redif'], '')],
      ],
    },"""

content = replace_between(
    content,
    "    {\n      lines: [\n        [wt('İstanbul\\'u', ['konu', 'redif'], ''), wt('dinliyorum,', ['redif', 'edebiSanat'], ''), wt('gözlerim', ['redif'], ''), wt('kapalı;', ['redif'], '')],\n        [wt('Kuşların', ['tema', 'olcu']",
    "        [wt('İstanbul\\'u', ['konu', 'redif'], ''), wt('dinliyorum,', ['redif', 'edebiSanat'], ''), wt('gözlerim', ['redif'], ''), wt('kapalı.', ['redif'], '')],\n      ],\n    },",
    istanbul_stanzas
)

# 3. Nerdesin
nerdesin_stanzas = """    {
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
    },"""

content = replace_between(
    content,
    "    {\n      lines: [\n        [wt('Orda', ['konu'], 'Konu: Uzaktaki bir Anadolu köyü'), w('bir'), w('köy'), w('var'), w('uzakta,')],",
    "        [w('Seni'), wt('ararım', ['tema', 'olcu'], 'Tema: Sonsuz arayış, vazgeçmeme'), wt('ararım.', ['tema', 'kafiye'], 'Kafiye: usanmam/ararım')],\n      ],\n    },",
    nerdesin_stanzas
)
content = content.replace(
    "    kafiye: { description: 'Şiirde yarım kafiye (köyümüzdür/kızımızdır, kayalarda/çağlar, aşarım/geçerim) kullanılmıştır. Kafiye şeması koşma geleneğine uygun olarak düzenlenmiştir.', count: 5 },",
    "    kafiye: { description: 'Şiirde çapraz kafiye kullanılmıştır (uykumu/onu, nerdesin/sesin).', count: 5 },"
).replace(
    "    olcu: { description: 'Şiir 8\\'li hece ölçüsüyle yazılmıştır. Her dize 8 heceden oluşur. Bu ölçü, halk şiiri geleneğine bağlılığı gösterir.', count: 6 },",
    "    olcu: { description: 'Şiir 11\\'li hece ölçüsüyle yazılmıştır.', count: 6 },"
).replace(
    "    nazimBirimi: { description: 'Nazım birimi dörtlüktür. Şiir 5 dörtlükten oluşmakta; nakarat dörtlüğü iki kez tekrar etmektedir. Bu yapı koşma biçimine yakındır.', count: 5 },",
    "    nazimBirimi: { description: 'Nazım birimi dörtlüktür.', count: 3 },"
).replace(
    "    edebiSanat: { description: 'Nida (Nerdesin!), Tekrir (nerdesin nerdesin, aşarım aşarım, geçerim geçerim, her birinde bir), Kişileştirme (sevda yanar, özlem çağlar)', count: 8 },",
    "    edebiSanat: { description: 'Nida (Nerdesin!), Kişileştirme (sesin yürümesi, haykırması)', count: 5 },"
).replace(
    "    tema: { description: 'Ana tema hasret ve arayıştır. Şair, Anadolu\\'da bıraktığı sevgilisine olan özlemini dağları aşarak, dereleri geçerek arama kararlılığıyla anlatır.', count: 7 },",
    "    tema: { description: 'Ana tema hasret ve yalnızlıktır.', count: 4 },"
).replace(
    "    konu: { description: 'Konu: Uzak bir Anadolu köyünde geride kalan bir kıza duyulan özlem ve onu arama yolculuğu. Şiir Anadolu coğrafyasına ve kültürüne duyulan sevgiyi yansıtır.', count: 5 },",
    "    konu: { description: 'İçsel bir sese, bir dosta veya sevgiliye duyulan özlem.', count: 3 },"
)


# 4. Yunus Emre
yunus_stanzas = """    {
      lines: [
        [w('Ben'), wt('yürürüm', ['olcu'], '8\\'li hece'), wt('yane', ['edebiSanat'], 'Aliterasyon: "y" sesi'), wt('yane,', ['edebiSanat', 'redif'], 'Redif: yane')],
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
    },"""
content = replace_between(
    content,
    "    {\n      lines: [\n        [w('Ben'), wt('yürürüm', ['olcu'], '8\\'li hece')",
    "        [w('Dost'), wt('yüzüne', ['tema'], 'Tema: Tanrı\\'ya kavuşma'), w('bakmadan'), wt('gitsem.', ['nazimBirimi'], 'Dörtlüğün kapanışı')],\n      ],\n    },",
    yunus_stanzas
)

# 5. Fuzuli
fuzuli_stanzas = """    {
      lines: [
        [wt('Beni', ['konu'], 'Konu: Şairin sevgiliden şikâyeti'), w('candan'), w('usandırdı'), wt('cefâdan', ['kafiye'], 'Kafiye: cefadan/şifadan'), w('yâr'), w('usanmaz'), w('mı')],
        [w('Felekler'), w('yandı'), w('âhumdan'), wt('murâdum', ['olcu'], 'Aruz ölçüsü'), w('şem\\'i'), wt('yanmaz', ['redif'], 'Redif: yanmaz mı'), w('mı')],
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
    },"""
content = replace_between(
    content,
    "    {\n      lines: [\n        [wt('Beni', ['konu'], 'Konu: Şairin sevgiliden şikâyeti'), w('candan'), w('usandırdı'), wt('cefadan', ['kafiye'], 'Kafiye: cefadan/şifadan/fedadan')",
    "        [wt('Fuzuli,', ['edebiSanat'], 'Tecridi: Şair kendi adını kullanıyor – mahlas'), w('sabr'), wt('et.', ['tema'], 'Tema: sabır, çaresizlik')],\n      ],\n    },",
    fuzuli_stanzas
)

# 6. Baki
baki_stanzas = """        {
          lines: [
            [w('Ey'), wt('pây-bend-i', ['edebiSanat'], 'İstiare'), wt('dâm-geh-i', ['tema'], 'Tema: dünya geçiciliği'), w('kayd-ı'), w('nâm'), w('ü'), wt('neng,', ['redif'], 'Kafiye/Redif')],
            [wt('Tâ', ['edebiSanat'], ''), w('key'), w('hevâ-yı'), w('meşgale-i'), w('dâr-ı'), w('sûd'), w('u'), wt('ziyân.', ['kafiye'], '')],
          ],
        },
        {
          lines: [
            [w('Minnet'), wt('Hudâya', ['konu'], 'Konu: Allah\\'a şükür'), w('devlet-i'), wt('dünya', ['tema'], 'Tema: geçicilik'), w('fenâ'), w('bulur,')],
            [wt('Bâkî', ['konu'], ''), w('kalır'), w('sahîfe-i'), wt('âlemde', ['tema'], ''), w('ad'), w('u'), w('san.')],
          ],
        },"""
content = replace_between(
    content,
    "        {\n          lines: [\n            [w('Ey'), wt('şehinşah-ı', ['edebiSanat'], 'İstiare: Sultana \"şahların şahı\" hitabı')",
    "            [wt('Gitdi', ['konu'], ''), w('ammâ'), w('gözde'), wt('bıraktın', ['tema'], 'Tema: ardında bırakılan iz'), w('bir'), w('hayal'), w('gibi.')],\n          ],\n        },",
    baki_stanzas
)

# 7. Karacaoğlan
karacaoglan_stanzas = """        {
          lines: [
            [wt('Ela', ['olcu'], '11\\'li hece'), wt('gözlüm', ['konu', 'edebiSanat'], 'Konu: Sevgiliye veda'), w('ben'), w('bu'), w('elden'), wt('gidersem,', ['tema'], 'Tema: Ayrılık')],
            [w('Zülfü'), w('perişanım'), wt('kal', ['konu'], ''), w('melil'), w('melil.')],
            [wt('Kerem', ['tema'], 'Telmih'), w('et,'), w('aklımdan'), wt('çıkarma', ['olcu'], ''), w('beni,')],
            [wt('Ağla', ['edebiSanat'], ''), w('gözyaşını'), wt('sil', ['kafiye'], ''), w('melil'), w('melil.')],
          ],
        },
        {
          lines: [
            [wt('Elvan', ['konu', 'tema'], ''), w('çiçeklerden'), w('sokma'), w('başına,')],
            [w('Kudret'), wt('kalemini', ['olcu'], ''), w('çekme'), w('kaşına,')],
            [w('Beni'), w('ağlatırsan'), w('doyma'), w('yaşına,')],
            [w('Ağla'), w('gözyaşını'), w('sil'), wt('melil', ['kafiye', 'redif'], ''), w('melil.')],
          ],
        },"""
content = replace_between(
    content,
    "        {\n          lines: [\n            [wt('Boz', ['olcu'], '11\\'li hece')",
    "            [w('Söylesem'), w('dili'), wt('dolanır.', ['kafiye', 'redif'], 'Kafiye + Redif: -anır/-ana')],\n          ],\n        },",
    karacaoglan_stanzas
)
content = content.replace("title: 'Koşma (Boz bulanık akan sular)',", "title: 'Koşma (Ela Gözlüm)',")
content = content.replace("bio: 'Karacaoğlan\\'ın doğa ve aşk temalarını işlediği bu koşma, halk edebiyatının en güzel örneklerinden biridir.',", "bio: 'Karacaoğlan\\'ın sevgiliye veda ve ayrılık temalarını işlediği bu koşma, halk edebiyatının en lirik örneklerinden biridir.',")

# 8. Namık Kemal
namik_stanzas = """        {
          lines: [
            [wt('Görüp', ['konu'], 'Konu: Hürriyetin özlemi'), w('ahkâm-ı'), wt('asr\\'ı', ['tema'], 'Tema: Çağın gerektirdiği özgürlük'), w('münharif'), w('sıdk'), w('u'), w('selâmetten,')],
            [wt('Çekildik', ['redif', 'konu'], ''), w('izzet'), w('ü'), w('ikbal'), w('ile'), w('bâb-ı'), w('hükûmetten.')],
          ],
        },
        {
          lines: [
            [wt('Ne', ['edebiSanat'], 'Tezat: esaret/hürriyet'), w('efsunkâr'), w('imişsin'), wt('ah', ['tezat']), w('ey'), w('didar-ı'), w('hürriyet,')],
            [wt('Esir-i', ['tema'], 'Tema: Özgürlük aşkı'), w('aşkın'), w('olduk'), w('gerçi'), w('kurtulduk'), w('esaretten.')],
          ],
        },"""
content = replace_between(
    content,
    "        {\n          lines: [\n            [wt('Görüp', ['konu'], 'Konu: Hürriyetin özlemi'), w('ahkâm-ı')",
    "            [w('demde'), wt('hürriyet', ['redif'], ''), w('için'), w('ölmek'), wt('şereftir.', ['kafiye'], 'Kafiye: -tır')],\n          ],\n        },",
    namik_stanzas
)


with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Changes applied!")
