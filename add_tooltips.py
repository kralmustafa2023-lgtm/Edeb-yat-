import re

with open('src/app/data/poetsData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# I will define replacement strings for the empty tooltips of the 9 poets.
# Yunus Emre
content = content.replace("wt('yane', ['kafiye'], '')", "wt('yane', ['kafiye'], 'Kafiye: -ane')")
content = content.replace("wt('kane', ['kafiye'], '')", "wt('kane', ['kafiye'], 'Kafiye: -ane')")
content = content.replace("wt('divane', ['kafiye'], '')", "wt('divane', ['kafiye'], 'Kafiye: -ane')")
content = content.replace("wt('gibi', ['kafiye'], '')", "wt('gibi', ['kafiye'], 'Kafiye: gibi (Redif/Kafiye)')")
# Fuzuli
content = content.replace("wt('bî-nazîrdir,', ['kafiye'], 'dir')", "wt('bî-nazîrdir,', ['kafiye'], 'Kafiye: -dir')")
content = content.replace("wt('hakkıdır.', ['kafiye'], 'dir')", "wt('hakkıdır.', ['kafiye'], 'Kafiye: -dir')")
content = content.replace("wt('olur,', ['kafiye'], 'olur')", "wt('olur,', ['kafiye'], 'Kafiye: -olur')")
content = content.replace("wt('olur.', ['kafiye'], 'olur')", "wt('olur.', ['kafiye'], 'Kafiye: -olur')")
content = content.replace("wt('yok,', ['kafiye'], 'yok-tok')", "wt('yok,', ['kafiye'], 'Kafiye: -ok')")
content = content.replace("wt('tok.', ['kafiye'], 'yok-tok')", "wt('tok.', ['kafiye'], 'Kafiye: -ok')")

# Baki
content = content.replace("wt('gecesidir', ['kafiye'], 'gece-gece')", "wt('gecesidir', ['kafiye'], 'Kafiye: gece')")
content = content.replace("wt('gece,', ['kafiye'], '')", "wt('gece,', ['kafiye'], 'Kafiye: gece')")
content = content.replace("wt('gece!', ['kafiye'], '')", "wt('gece!', ['kafiye'], 'Kafiye: gece')")
content = content.replace("wt('gezer,', ['kafiye'], 'gezer-gezer')", "wt('gezer,', ['kafiye'], 'Kafiye: gezer')")
content = content.replace("wt('gecedir,', ['kafiye'], 'gecedir-gecedir')", "wt('gecedir,', ['kafiye'], 'Kafiye: gecedir')")
content = content.replace("wt('gecedir.', ['kafiye'], 'gecedir-gecedir')", "wt('gecedir.', ['kafiye'], 'Kafiye: gecedir')")

# Karacaoglan
content = content.replace("wt('hiddetli,', ['kafiye'], 'hiddetli-gitmiş')", "wt('hiddetli,', ['kafiye'], 'Kafiye: -li / -miş (Serbest)')")
content = content.replace("wt('gitmiş.', ['kafiye'], 'hiddetli-gitmiş')", "wt('gitmiş.', ['kafiye'], 'Kafiye: -li / -miş (Serbest)')")
content = content.replace("wt('hiddetli,', ['kafiye'], '')", "wt('hiddetli,', ['kafiye'], 'Kafiye: -li / -miş (Serbest)')")
content = content.replace("wt('gitmiş.', ['kafiye'], '')", "wt('gitmiş.', ['kafiye'], 'Kafiye: -li / -miş (Serbest)')")

# Namik Kemal
content = content.replace("wt('makber,', ['kafiye'], 'makber')", "wt('makber,', ['kafiye'], 'Kafiye: -ber')")
content = content.replace("wt('Peygamber.', ['kafiye'], 'Peygamber')", "wt('Peygamber.', ['kafiye'], 'Kafiye: -ber')")
content = content.replace("wt('hüryetsiz,', ['redif', 'kafiye'], '')", "wt('hüryetsiz,', ['redif', 'kafiye'], 'Kafiye ve Redif: -hüryetsiz')")
content = content.replace("wt('hüryetsiz.', ['redif', 'kafiye'], '')", "wt('hüryetsiz.', ['redif', 'kafiye'], 'Kafiye ve Redif: -hüryetsiz')")

# Tevfik Fikret
content = content.replace("wt('atmış,', ['kafiye'], '')", "wt('atmış,', ['kafiye'], 'Kafiye: -atmış / -erek (Yarım uyak)')")
content = content.replace("wt('hissederek,', ['kafiye'], '')", "wt('hissederek,', ['kafiye'], 'Kafiye: -atmış / -erek (Yarım uyak)')")
content = content.replace("wt('boğazında,', ['kafiye'], '')", "wt('boğazında,', ['kafiye'], 'Kafiye: -ında / -erek (Yarım uyak)')")
content = content.replace("wt('ilerleyerek.', ['kafiye'], '')", "wt('ilerleyerek.', ['kafiye'], 'Kafiye: -ında / -erek (Yarım uyak)')")

# Mehmet Akif
content = content.replace("wt('sancak;', ['kafiye'], '')", "wt('sancak;', ['kafiye'], 'Kafiye: -cak')")
content = content.replace("wt('ocak.', ['kafiye'], '')", "wt('ocak.', ['kafiye'], 'Kafiye: -cak')")
content = content.replace("wt('parlayacak;', ['kafiye'], '')", "wt('parlayacak;', ['kafiye'], 'Kafiye: -cak')")
content = content.replace("wt('ancak.', ['kafiye'], '')", "wt('ancak.', ['kafiye'], 'Kafiye: -cak')")
content = content.replace("wt('hilâl!', ['kafiye'], '')", "wt('hilâl!', ['kafiye'], 'Kafiye: -lâl')")
content = content.replace("wt('celâl?', ['kafiye'], '')", "wt('celâl?', ['kafiye'], 'Kafiye: -lâl')")
content = content.replace("wt('helâl;', ['kafiye'], '')", "wt('helâl;', ['kafiye'], 'Kafiye: -lâl')")
content = content.replace("wt('istiklâl.', ['kafiye'], '')", "wt('istiklâl.', ['kafiye'], 'Kafiye: -lâl')")

# Faruk Nafiz
content = content.replace("wt('gölgeler,', ['kafiye'], '')", "wt('gölgeler,', ['kafiye'], 'Kafiye: -geler / -tıra')")
content = content.replace("wt('hatıra.', ['kafiye'], '')", "wt('hatıra.', ['kafiye'], 'Kafiye: -geler / -tıra')")
content = content.replace("wt('kimsesiz,', ['kafiye'], '')", "wt('kimsesiz,', ['kafiye'], 'Kafiye: -siz / -be')")
content = content.replace("wt('harabe.', ['kafiye'], '')", "wt('harabe.', ['kafiye'], 'Kafiye: -siz / -be')")

# Ahmet Kutsi
content = content.replace("wt('önde,', ['kafiye'], '')", "wt('önde,', ['kafiye'], 'Kafiye: -de / -rar')")
content = content.replace("wt('arar.', ['kafiye'], '')", "wt('arar.', ['kafiye'], 'Kafiye: -de / -rar')")
content = content.replace("wt('olsaydı,', ['kafiye'], '')", "wt('olsaydı,', ['kafiye'], 'Kafiye: -dı / -de')")
content = content.replace("wt('nerelerde.', ['kafiye'], '')", "wt('nerelerde.', ['kafiye'], 'Kafiye: -dı / -de')")

# Any leftover empty redifs
content = content.replace("wt('Gel', ['redif'], '')", "wt('Gel', ['redif'], 'Redif: Nakarat (Dize Tekrarı)')")
content = content.replace("wt('gör', ['redif'], '')", "wt('gör', ['redif'], 'Redif: Nakarat (Dize Tekrarı)')")
content = content.replace("wt('beni', ['redif'], '')", "wt('beni', ['redif'], 'Redif: Nakarat (Dize Tekrarı)')")
content = content.replace("wt('aşk', ['redif'], '')", "wt('aşk', ['redif'], 'Redif: Nakarat (Dize Tekrarı)')")
content = content.replace("wt('neyledi', ['redif'], '')", "wt('neyledi', ['redif'], 'Redif: Nakarat (Dize Tekrarı)')")
content = content.replace("wt('Bu', ['redif'], '')", "wt('Bu', ['redif'], 'Redif: Nakarat (Dize Tekrarı)')")
content = content.replace("wt('gece', ['redif'], '')", "wt('gece', ['redif'], 'Redif: Nakarat (Dize Tekrarı)')")
content = content.replace("wt('Kanûnî', ['redif'], '')", "wt('Kanûnî', ['redif'], 'Redif: Nakarat (Dize Tekrarı)')")
content = content.replace("wt('Sultan', ['redif'], '')", "wt('Sultan', ['redif'], 'Redif: Nakarat (Dize Tekrarı)')")
content = content.replace("wt('Süleyman', ['redif'], '')", "wt('Süleyman', ['redif'], 'Redif: Nakarat (Dize Tekrarı)')")

with open('src/app/data/poetsData.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Tooltips added.")
