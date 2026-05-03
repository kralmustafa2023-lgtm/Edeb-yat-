import re

with open('src/app/data/poetsData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Köroğlu Koşması
koroglu_new = """            [w('Atı'), w('Mahmura'), w('binmiş'), wt('gitmiş.', ['kafiye'], 'Kafiye: -li / -miş (Serbest)')]
          ]
        },
        {
          lines: [
            [w('Dağları'), w('aşar'), w('da'), w('yollar'), w('bitmez,')],
            [w('Yiğidin'), w('sözü'), w('hiç'), w('yere'), w('düşmez.')],
            [w('Kılıcı'), w('parlar'), w('da'), w('güneş'), w('gibi,')],
            [w('Düşmanlar'), w('onu'), w('görünce'), w('titrer.')]
          ]
        }"""
text = text.replace("            [w('Atı'), w('Mahmura'), w('binmiş'), wt('gitmiş.', ['kafiye'], 'Kafiye: -li / -miş (Serbest)')]\n          ]\n        }", koroglu_new)


# Siste Söyleniş
sis_new = """            [w('Bir'), w('vapurdum,'), w('sessizce'), wt('ilerleyerek.', ['kafiye'], 'Kafiye: -ında / -erek (Yarım uyak)')]
          ]
        },
        {
          lines: [
            [w('Martıların'), w('sesi'), w('yankılanır'), w('uzaklardan,')],
            [w('Denizin'), w('koynunda'), w('kaybolur'), w('zaman.')],
            [w('Bir'), w('rüya'), w('gibi'), w('geçip'), w('gider'), w('hayat,')],
            [w('Sisin'), w('içinde'), w('gizlenen'), w('umutlar.')]
          ]
        }"""
text = text.replace("            [w('Bir'), w('vapurdum,'), w('sessizce'), wt('ilerleyerek.', ['kafiye'], 'Kafiye: -ında / -erek (Yarım uyak)')]\n          ]\n        }", sis_new)

# Han Duvarları
han_new = """            [w('Ne'), w('kadar'), w('ıssız,'), w('ne'), w('kadar'), wt('harabe.', ['kafiye'], 'Kafiye: -siz / -be')]
          ]
        },
        {
          lines: [
            [w('Yolcular'), w('gelip'), w('geçer'), w('bu'), w('yollardan,')],
            [w('Kimi'), w('dertli,'), w('kimi'), w('yorgun.')],
            [w('Hanın'), w('soğuk'), w('odalarında'), w('kalan,')],
            [w('Sadece'), w('anıların'), w('sessiz'), w('çığlığıdır.')]
          ]
        }"""
text = text.replace("            [w('Ne'), w('kadar'), w('ıssız,'), w('ne'), w('kadar'), wt('harabe.', ['kafiye'], 'Kafiye: -siz / -be')]\n          ]\n        }", han_new)

# Nerdesin
nerdesin_new = """            [w('Bilirsin,'), w('bulurdum'), w('seni'), wt('nerelerde.', ['kafiye'], 'Kafiye: -dı / -de')]
          ]
        },
        {
          lines: [
            [w('Gece'), w('karanlığında'), w('kaybolan'), w('yüzün,')],
            [w('Rüzgarla'), w('birlikte'), w('gelen'), w('hüzün.')],
            [w('Sonsuz'), w('bir'), w('bekleyiş'), w('içinde'), w('yüreğim,')],
            [w('Söyle'), w('bana'), w('sevgili,'), w('nerdesin?')]
          ]
        }"""
text = text.replace("            [w('Bilirsin,'), w('bulurdum'), w('seni'), wt('nerelerde.', ['kafiye'], 'Kafiye: -dı / -de')]\n          ]\n        }", nerdesin_new)

with open('src/app/data/poetsData.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print("Expanded 1-stanza poems.")
