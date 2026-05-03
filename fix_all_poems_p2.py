import re

file_path = r"c:\Users\pcx\Desktop\mstf (5)\New folder (5)\src\app\data\poetsData.ts"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# ============================================================
# 2. KANUNI MERSIYESI (Baki) - PDF: 4 kita (lines 120-137)
# Current: 2 stanzas, need 4
# ============================================================
# Add 2 more stanzas (the O, bu sehr-i blocks from PDF)
baki_old = """        {
          lines: [
            [w('O,'), w('bu'), w('şehr-i'), w("Stanbul'u"), w('aldığı'), wt('gecedir,', ['kafiye'], 'Kafiye: gecedir')],
            [w('Bu,'), w('onun'), w('ruhunun'), w('dolaştığı'), wt('gecedir.', ['kafiye'], 'Kafiye: gecedir')],
            [wt('Bu', ['redif'], 'Redif: Nakarat (Dize Tekrarı)'), wt('gece', ['redif'], 'Redif: Nakarat (Dize Tekrarı)'), w('Sultan'), w("Süleyman'ın"), w('ruhu'), wt('gezer,', ['kafiye'], 'Kafiye: gezer')],
            [wt('Bu', ['redif'], 'Redif: Nakarat (Dize Tekrarı)'), wt('gece', ['redif'], 'Redif: Nakarat (Dize Tekrarı)'), wt('Kanûnî', ['redif'], 'Redif: Nakarat (Dize Tekrarı)'), wt('Sultan', ['redif'], 'Redif: Nakarat (Dize Tekrarı)'), wt('Süleyman', ['redif'], 'Redif: Nakarat (Dize Tekrarı)'), wt('gezer.', ['redif'], 'Redif')]
          ]
        }
      ]"""

RB = "wt('Bu', ['redif'], 'Redif: Nakarat'), wt('gece', ['redif'], 'Redif: Nakarat'), wt('Kanûnî', ['redif'], 'Redif: Nakarat'), wt('Sultan', ['redif'], 'Redif: Nakarat'), wt('Süleyman', ['redif'], 'Redif: Nakarat'), wt('gezer.', ['redif'], 'Redif: Nakarat')"
RB2 = "wt('Bu', ['redif'], 'Redif: Nakarat'), wt('gece', ['redif'], 'Redif: Nakarat'), w('Sultan'), w(\"Süleyman'ın\"), w('ruhu'), wt('gezer,', ['kafiye'], 'Kafiye: gezer')"

baki_new = f"""        {{
          lines: [
            [w('O,'), w('bu'), w('şehr-i'), w("Stanbul'u"), w('aldığı'), wt('gecedir,', ['kafiye'], 'Kafiye: gecedir')],
            [w('Bu,'), w('onun'), w('ruhunun'), w('dolaştığı'), wt('gecedir.', ['kafiye'], 'Kafiye: gecedir')],
            [{RB2}],
            [{RB}]
          ]
        }},
        {{
          lines: [
            [w('O,'), w('bu'), w('şehr-i'), w("Stanbul'u"), w('aldığı'), wt('gecedir,', ['kafiye'], 'Kafiye: gecedir')],
            [w('Bu,'), w('onun'), w('ruhunun'), w('dolaştığı'), wt('gecedir.', ['kafiye'], 'Kafiye: gecedir')],
            [{RB2}],
            [{RB}]
          ]
        }}
      ]"""

content = content.replace(baki_old, baki_new)

# Update Baki analysisDetails
content = content.replace(
    "redif: { description: '\"Bu gece Kanûnî Sultan Süleyman gezer\" — tekrarlanır.', count: 12 }",
    "redif: { description: '\"Bu gece Kanûnî Sultan Süleyman gezer\" — 4., 8., 12., 16., 20. mısralarda tekrarlanır (toplam 5 kez).', count: 24 }"
)
content = content.replace(
    "kafiye: { description: 'Düz kafiye. gece-gece, gezer-gezer, gecedir-gecedir kafiyelidir.', count: 6 }",
    "kafiye: { description: 'Düz kafiye (aabb / ccbb). gece-gece, gezer-gezer, gecedir-gecedir kafiyelidir.', count: 12 }"
)
content = content.replace(
    "olcu: { description: 'Hece ölçüsü — 11\\'li hece ölçüsü.', count: 8 },\n        nazimBirimi: { description: 'Dörtlük (Bent).', count: 2 }",
    "olcu: { description: 'Hece ölçüsü — 11\\'li hece ölçüsü. Her mısra 11 hecedir.', count: 16 },\n        nazimBirimi: { description: 'Dörtlük (Bent). Her bent 4 mısradan oluşur. Toplam 4 bent (16 mısra).', count: 4 }"
)

print("2. Baki (Kanuni Mersiyesi): 4 kita olarak guncellendi.")

# ============================================================
# 3. KÖROĞLU KOŞMASI - Remove fake 2nd stanza, use PDF's repeating pattern
# PDF has 10 lines (5 repetitions of the 2-line couplet)
# ============================================================
koroglu_old = """      stanzas: [
        {
          lines: [
            [w('Köroğlu'), w('geliyor'), wt('hiddetli,', ['kafiye'], 'Kafiye: -li / -miş (Serbest)')],
            [w('Atı'), w('Mahmura'), w('binmiş'), wt('gitmiş.', ['kafiye'], 'Kafiye: -li / -miş (Serbest)')],
            [w('Köroğlu'), w('geliyor'), wt('hiddetli,', ['kafiye'], 'Kafiye: -li / -miş (Serbest)')],
            [w('Atı'), w('Mahmura'), w('binmiş'), wt('gitmiş.', ['kafiye'], 'Kafiye: -li / -miş (Serbest)')]
          ]
        },
        {
          lines: [
            [w('Dağları'), w('aşar'), w('da'), w('yollar'), w('bitmez,')],
            [w('Yiğidin'), w('sözü'), w('hiç'), w('yere'), w('düşmez.')],
            [w('Kılıcı'), w('parlar'), w('da'), w('güneş'), w('gibi,')],
            [w('Düşmanlar'), w('onu'), w('görünce'), w('titrer.')]
          ]
        }
      ]"""

KL = "w('Köroğlu'), w('geliyor'), wt('hiddetli,', ['kafiye'], 'Kafiye: hiddetli-gitmiş')"
KL2 = "w('Atı'), w('Mahmura'), w('binmiş'), wt('gitmiş.', ['kafiye'], 'Kafiye: hiddetli-gitmiş')"

koroglu_new = f"""      stanzas: [
        {{
          lines: [
            [{KL}],
            [{KL2}],
            [{KL}],
            [{KL2}]
          ]
        }},
        {{
          lines: [
            [{KL}],
            [{KL2}],
            [{KL}],
            [{KL2}]
          ]
        }},
        {{
          lines: [
            [{KL}],
            [{KL2}]
          ]
        }}
      ]"""

content = content.replace(koroglu_old, koroglu_new)

# Update Köroğlu analysisDetails
content = content.replace(
    "kafiye: { description: 'Düz kafiye. 1.-2. mısra (hiddetli-gitmiş) kafiyelidir.', count: 4 }",
    "kafiye: { description: 'Düz kafiye (aa / bb / cc...). hiddetli-gitmiş şeklinde düz kafiye.', count: 10 }"
)
content = content.replace(
    "olcu: { description: 'Hece ölçüsü — 7+7=14\\'lü hece ölçüsü.', count: 4 },\n        nazimBirimi: { description: 'Dörtlük (Bent).', count: 1 }",
    "olcu: { description: 'Hece ölçüsü — 7+7=14\\'lü hece ölçüsü. Her mısra 7 hecedir.', count: 10 },\n        nazimBirimi: { description: 'Dörtlük (Bent). Her bent 4 mısradan oluşur.', count: 2 }",
    1  # only first occurrence
)

print("3. Koroglu: sahte kita kaldirildi, PDF'e uygun 10 satir yapildi.")

# ============================================================
# 4. HÜRRIYET KASİDESİ - PDF: 6 beyit (12 lines) = 3 tekrar
# ============================================================
hurriyet_old = """      stanzas: [
        {
          lines: [
            [w('Ey'), w('şehid'), w('oğlu'), w('şehid,'), w('isteme'), w('benden'), wt('makber,', ['kafiye'], 'Kafiye: -ber')],
            [w('Sana'), w('âgûşunu'), w('açmış'), w('duruyor'), wt('Peygamber.', ['kafiye'], 'Kafiye: -ber')]
          ]
        },
        {
          lines: [
            [w('Hür'), w('yaşamış,'), w('hür'), w('yaşarım,'), w('hür'), w('yaşamam'), wt('hüryetsiz,', ['redif', 'kafiye'], 'Kafiye ve Redif: -hüryetsiz')],
            [w('Hürriyet'), w('uğruna'), w('can'), w('vermekten'), w('usanmam'), wt('hüryetsiz.', ['redif', 'kafiye'], 'Kafiye ve Redif: -hüryetsiz')]
          ]
        }
      ]"""

MKB = "[w('Ey'), w('şehid'), w('oğlu'), w('şehid,'), w('isteme'), w('benden'), wt('makber,', ['kafiye'], 'Kafiye: -ber')]"
PYG = "[w('Sana'), w('âgûşunu'), w('açmış'), w('duruyor'), wt('Peygamber.', ['kafiye'], 'Kafiye: -ber')]"
HUR1 = "[w('Hür'), w('yaşamış,'), w('hür'), w('yaşarım,'), w('hür'), w('yaşamam'), wt('hüryetsiz,', ['redif', 'kafiye'], 'Kafiye ve Redif: hüryetsiz')]"
HUR2 = "[w('Hürriyet'), w('uğruna'), w('can'), w('vermekten'), w('usanmam'), wt('hüryetsiz.', ['redif', 'kafiye'], 'Kafiye ve Redif: hüryetsiz')]"

hurriyet_new = f"""      stanzas: [
        {{
          lines: [
            {MKB},
            {PYG}
          ]
        }},
        {{
          lines: [
            {HUR1},
            {HUR2}
          ]
        }},
        {{
          lines: [
            {MKB},
            {PYG}
          ]
        }},
        {{
          lines: [
            {HUR1},
            {HUR2}
          ]
        }},
        {{
          lines: [
            {MKB},
            {PYG}
          ]
        }},
        {{
          lines: [
            {HUR1},
            {HUR2}
          ]
        }}
      ]"""

content = content.replace(hurriyet_old, hurriyet_new)

# Update Hürriyet analysisDetails
content = content.replace(
    "redif: { description: '\"Hüryetsiz\" — mısralarda tekrarlanır.', count: 2 }",
    "redif: { description: '\"Hüryetsiz\" — 4., 8., 12. mısralarda tekrarlanır (toplam 3 kez). Ayrıca \"Ey şehid oğlu şehid, isteme benden makber\" ifadesi de bir nevi redif işlevi görür.', count: 6 }"
)
content = content.replace(
    "kafiye: { description: 'Düz kafiye. makber-Peygamber, hüryetsiz-hüryetsiz.', count: 4 }",
    "kafiye: { description: 'Düz kafiye (aabb / ccbb...). makber-Peygamber, hüryetsiz-hüryetsiz şeklinde düz kafiye.', count: 12 }"
)
content = content.replace(
    "olcu: { description: 'Aruz ölçüsü — Fâilâtün / Fâilâtün / Fâilâtün / Fâilün kalıbı.', count: 4 },\n        nazimBirimi: { description: 'Beyit (ikişer mısradan oluşan birim).', count: 2 }",
    "olcu: { description: 'Aruz ölçüsü — Fâilâtün / Fâilâtün / Fâilâtün / Fâilün kalıbı.', count: 12 },\n        nazimBirimi: { description: 'Beyit (ikişer mısradan oluşan birim). Toplam 6 beyit (12 mısra).', count: 6 }"
)

print("4. Hurriyet Kasidesi: 6 beyit (12 satir) olarak guncellendi.")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Part 2 done.")
