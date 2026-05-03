import json
import re

pdf_content = """1. BEN YÜRÜRÜM YANE YANE
Yunus Emre
Ben yürürüm yane yane
Aşk boyadı beni kane
Ne âkilem ne divane
Gel gör beni aşk neyledi
Gâh eserim yeller gibi
Gâh tozarım yollar gibi
Gâh akarım seller gibi
Gel gör beni aşk neyledi

2. GAZEL (AZİZ İSTANBUL)
Yahya Kemal Beyatlı
Bu şehr-i Stanbul ki bî-misâl-ü bî-nazîrdir,
Ger sâkî-i cihan-ı cihan olmaya hakkıdır.
Bir sâye-i hümâyûn ki bihişte menzîl olur,
Nâzânînlerin teşrîf-i pây-bûsû olur.
Kim bilir bu ne şehrdir ki âlemde nâmı yok,
Feth olunmadıkça olmaz devlet-i İslâm tok.
Sâye-i saadetinde bin âlem nûrân olur,
Sâye-i saadetinde bin âlem nûrân olur.

3. KANUNİ MERSİYESİ
Yahya Kemal Beyatlı
Efsunî bir bahar gecesidir bu gece,
Şu gök kubbe altında nice nice gece!
Bu gece Sultan Süleyman'ın ruhu gezer,
Bu gece Kanûnî Sultan Süleyman gezer.
Bir efsunlu bahar gecesidir bu gece,
Şu gök kubbe altında nice nice gece!
Bu gece Sultan Süleyman'ın ruhu gezer,
Bu gece Kanûnî Sultan Süleyman gezer.

4. KÖROĞLU KOŞMASI
Anonim (Halk Edebiyatı)
Köroğlu geliyor hiddetli,
Atı Mahmura binmiş gitmiş.
Köroğlu geliyor hiddetli,
Atı Mahmura binmiş gitmiş.

5. HÜRRİYET KASİDESİ
Namık Kemal
Ey şehid oğlu şehid, isteme benden makber,
Sana âgûşunu açmış duruyor Peygamber.
Hür yaşamış, hür yaşarım, hür yaşamam hüryetsiz,
Hürriyet uğruna can vermekten usanmam hüryetsiz.

6. SİSTE SÖYLENİŞ (SİS)
Yahya Kemal Beyatlı
Gözlerim kapalı, başımı geriye atmış,
Bir şey düşünmeden, sadece hissederek,
Sisli bir akşamda, İstanbul'un boğazında,
Bir vapurdum, sessizce ilerleyerek.
Gözlerim kapalı, başımı geriye atmış,
Bir şey düşünmeden, sadece hissederek,
Sisli bir akşamda, İstanbul'un boğazında,
Bir vapurdum, sessizce ilerleyerek.

7. İSTİKLAL MARŞI (İLK İKİ KITA)
Mehmet Akif Ersoy
Korkma, sönmez bu şafaklarda yüzen al sancak;
Sönmeden yurdumun üstünde tüten en son ocak.
O benim milletimin yıldızıdır, parlayacak;
O benimdir, o benim milletimindir ancak.
Çatma, kurban olayım, çehreni ey nazlı hilâl!
Kahraman ırkıma bir gül... Ne bu şiddet, bu celâl?
Sana olmaz dökülen kanlarımız sonra helâl;
Hakkıdır, Hakk'a tapan, milletimin istiklâl.

8. SESSİZ GEMİ
Yahya Kemal Beyatlı
Artık demir alsak mıranadan gidelim,
Dört tarafı sarmış ateşlerden gidelim.
Dünyanın bir ucuna gidelim,
Dünyanın bir ucuna gidelim.
Bir gün herkes ölür, bilinmez ne zamandır,
Ölümden evvel ölümü görmektir fayda.
Dünyanın bir ucuna gidelim,
Dünyanın bir ucuna gidelim.

9. HAN DUVARLARI
Faruk Nafiz Çamlıbel
Duvarlara konan gölgeler,
Birer hayal, birer hatıra.
Bu han ne kadar sessiz, ne kadar kimsesiz,
Ne kadar ıssız, ne kadar harabe.
Duvarlara konan gölgeler,
Birer hayal, birer hatıra.
Bu han ne kadar sessiz, ne kadar kimsesiz,
Ne kadar ıssız, ne kadar harabe.

10. NERDESİN
Ahmet Kutsi Tecer
Gözü yaşlı, gönlü kırık, başı önde,
Sokaklarda dolaşırım seni arar.
Bir ses, bir nefes, bir izin olsaydı,
Bilirsin, bulurdum seni nerelerde.
Gözü yaşlı, gönlü kırık, başı önde,
Sokaklarda dolaşırım seni arar.
Bir ses, bir nefes, bir izin olsaydı,
Bilirsin, bulurdum seni nerelerde.

11. OTUZ BEŞ YAŞ
Cahit Sıtkı Tarancı
Yaş otuz beş! Yolun yarısı eder,
Dante gibi ortasındayız ömrün.
Delikanlı çağımızdaki cevher,
Yalvarırım, eğilme onun önün.
Yaş otuz beş! Yolun yarısı eder,
Dante gibi ortasındayız ömrün.
Delikanlı çağımızdaki cevher,
Yalvarırım, eğilme onun önün.

12. İSTANBUL'U DİNLİYORUM
Orhan Veli Kanık
Gözlerim kapalı
Kulaklarımı dayadım,
İnce bir duvara
Karşıdan vapur sesleri geliyor
Ve limandan uzaklaşan bir şeylerin hüznü
Ve her şeyde batan güneşin
Ve Yalılarda ölen günün
Ve Yelkenlere karşı koyan dalgaların
Ve kadınların, kocalarının, annelerinin
Ve ağlayan çocukların
Ve hüzünlü gemilerin
Ve bütün bunların üstüne çöken akşamın
Hüznünü dinliyorum
İstanbul'u dinliyorum.
"""

# I will write a script that generates the TypeScript objects for these poems.
# For simplicity, I'll use simple rule-based tagging based on the PDF.
def tag_word(word, redif_phrases, kafiye_suffixes):
    tags = []
    # check redif
    for r in redif_phrases:
        if r.lower() in word.lower():
            tags.append('redif')
            break
    # check kafiye
    for k in kafiye_suffixes:
        if word.lower().endswith(k):
            tags.append('kafiye')
            break
    
    if tags:
        return f"wt('{word}', {json.dumps(tags)}, '')"
    else:
        return f"w('{word}')"

# Instead of complex logic, I'll just hardcode the replacements for each of the 12 poets in the script.
# The user wants exact highlighting based on the PDF.
