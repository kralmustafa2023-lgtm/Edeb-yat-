import re

file_path = r"c:\Users\pcx\Desktop\mstf (5)\New folder (5)\src\app\data\poetsData.ts"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# ============================================================
# 1. YUNUS EMRE - PDF: 7 kıta (lines 22-51)
# ============================================================
yunus_old_stanzas = """      stanzas: [
        {
          lines: [
            [w('Ben'), w('yürürüm'), wt('yane', ['kafiye'], 'Kafiye: -ane'), wt('yane', ['kafiye'], 'Kafiye: -ane')],
            [w('Aşk'), w('boyadı'), w('beni'), wt('kane', ['kafiye'], 'Kafiye: -ane')],
            [w('Ne'), w('âkilem'), w('ne'), wt('divane', ['kafiye'], 'Kafiye: -ane')],
            [wt('Gel', ['redif'], 'Redif: Nakarat (Dize Tekrarı)'), wt('gör', ['redif'], 'Redif: Nakarat (Dize Tekrarı)'), wt('beni', ['redif'], 'Redif: Nakarat (Dize Tekrarı)'), wt('aşk', ['redif'], 'Redif: Nakarat (Dize Tekrarı)'), wt('neyledi', ['redif'], 'Her dörtlüğün son mısrası')]
          ]
        },
        {
          lines: [
            [w('Gâh'), w('eserim'), w('yeller'), wt('gibi', ['kafiye'], 'Kafiye: gibi (Redif/Kafiye)')],
            [w('Gâh'), w('tozarım'), w('yollar'), wt('gibi', ['kafiye'], 'Kafiye: gibi (Redif/Kafiye)')],
            [w('Gâh'), w('akarım'), w('seller'), wt('gibi', ['kafiye'], 'Kafiye: gibi (Redif/Kafiye)')],
            [wt('Gel', ['redif'], 'Redif: Nakarat (Dize Tekrarı)'), wt('gör', ['redif'], 'Redif: Nakarat (Dize Tekrarı)'), wt('beni', ['redif'], 'Redif: Nakarat (Dize Tekrarı)'), wt('aşk', ['redif'], 'Redif: Nakarat (Dize Tekrarı)'), wt('neyledi', ['redif'], 'Redif: Nakarat (Dize Tekrarı)')]
          ]
        }
      ]"""

R = "wt('Gel', ['redif'], 'Redif: Nakarat'), wt('gör', ['redif'], 'Redif: Nakarat'), wt('beni', ['redif'], 'Redif: Nakarat'), wt('aşk', ['redif'], 'Redif: Nakarat'), wt('neyledi', ['redif'], 'Redif: Nakarat')"

yunus_new_stanzas = f"""      stanzas: [
        {{
          lines: [
            [w('Ben'), w('yürürüm'), wt('yane', ['kafiye'], 'Kafiye: -ane'), wt('yane', ['kafiye'], 'Kafiye: -ane')],
            [w('Aşk'), w('boyadı'), w('beni'), wt('kane', ['kafiye'], 'Kafiye: -ane')],
            [w('Ne'), w('âkilem'), w('ne'), wt('divane', ['kafiye'], 'Kafiye: -ane')],
            [{R}]
          ]
        }},
        {{
          lines: [
            [w('Gâh'), w('eserim'), w('yeller'), wt('gibi', ['kafiye'], 'Kafiye: gibi')],
            [w('Gâh'), w('tozarım'), w('yollar'), wt('gibi', ['kafiye'], 'Kafiye: gibi')],
            [w('Gâh'), w('akarım'), w('seller'), wt('gibi', ['kafiye'], 'Kafiye: gibi')],
            [{R}]
          ]
        }},
        {{
          lines: [
            [w('Akar'), w('suların'), wt('çağlarım', ['kafiye'], 'Kafiye: -larım')],
            [w('Dertli'), w('ciğerim'), wt('dağlarım', ['kafiye'], 'Kafiye: -larım')],
            [w('Şeyhim'), w('anuban'), wt('ağlarım', ['kafiye'], 'Kafiye: -larım')],
            [{R}]
          ]
        }},
        {{
          lines: [
            [w('Ya'), w('elim'), w('al'), w('kaldır'), wt('beni', ['kafiye'], 'Kafiye: -eni')],
            [w('Ya'), w('vaslına'), w('erdir'), wt('beni', ['kafiye'], 'Kafiye: -eni')],
            [w('Çok'), w('ağlattın'), w('güldür'), wt('beni', ['kafiye'], 'Kafiye: -eni')],
            [{R}]
          ]
        }},
        {{
          lines: [
            [w('Ben'), w('yürürüm'), w('ilden'), wt('ile', ['kafiye'], 'Kafiye: -ile')],
            [w('Şeyh'), w('anarım'), w('dilden'), wt('dile', ['kafiye'], 'Kafiye: -ile')],
            [w('Gurbette'), w('halim'), w('kim'), wt('bile', ['kafiye'], 'Kafiye: -ile')],
            [{R}]
          ]
        }},
        {{
          lines: [
            [w('Mecnun'), w('oluban'), wt('yürürüm', ['kafiye'], 'Kafiye: -ürüm')],
            [w('Ol'), w('yâri'), w('düşte'), wt('görürüm', ['kafiye'], 'Kafiye: -ürüm')],
            [w('Uyanıp'), w('melûl'), wt('olurum', ['kafiye'], 'Kafiye: -ürüm')],
            [{R}]
          ]
        }},
        {{
          lines: [
            [w('Miskin'), w('Yunus'), wt('biçareyim', ['kafiye'], 'Kafiye: -eyim')],
            [w('Baştan'), w('ayağa'), wt('yareyim', ['kafiye'], 'Kafiye: -eyim')],
            [w('Dost'), w('elinde'), wt('avareyim', ['kafiye'], 'Kafiye: -eyim')],
            [{R}]
          ]
        }}
      ]"""

content = content.replace(yunus_old_stanzas, yunus_new_stanzas)

# Update analysisDetails for Yunus Emre
content = content.replace(
    "redif: { description: '\"Gel gör beni aşk neyledi\" — Her dörtlüğün (bent) son mısrasında tekrarlanır.', count: 10 }",
    "redif: { description: '\"Gel gör beni aşk neyledi\" — Her dörtlüğün (bent) son mısrasında tekrarlanır. 4., 8., 12., 16., 20., 24., 28. mısralarda yer alır (toplam 7 kez).', count: 35 }"
)
content = content.replace(
    "kafiye: { description: 'Düz kafiye (aaab / cccb...). yane-kane-divane, gibi-gibi-gibi kafiyelidir.', count: 7 }",
    "kafiye: { description: 'Düz kafiye (aaab / cccb...). yane-kane-divane, gibi-gibi-gibi, çağlarım-dağlarım-ağlarım, beni-beni-beni, ile-dile-bile, yürürüm-görürüm-olurum, biçareyim-yareyim-avareyim kafiyelidir.', count: 21 }"
)
content = content.replace(
    "olcu: { description: 'Hece ölçüsü — 7+7=14\\'lü hece ölçüsü.', count: 8 },\n        nazimBirimi: { description: 'Dörtlük (Bent). Her bent 4 mısradan oluşur.', count: 2 }",
    "olcu: { description: 'Hece ölçüsü — 7+7=14\\'lü hece ölçüsü (bazı mısralarda 11 hece; hece ölçüsü esnekliği).', count: 28 },\n        nazimBirimi: { description: 'Dörtlük (Bent). Her bent 4 mısradan oluşur. Toplam 7 bent (28 mısra).', count: 7 }"
)

print("1. Yunus Emre: 7 kita olarak guncellendi.")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Part 1 done.")
