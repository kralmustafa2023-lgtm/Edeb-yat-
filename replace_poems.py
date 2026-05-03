import re

file_path = r"c:\Users\pcx\Desktop\mstf (5)\New folder (5)\src\app\data\poetsData.ts"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

new_poems = {
    'yunus-emre': '''{
      id: 'yunus-emre-poem',
      title: 'Ben Yürürüm Yane Yane',
      form: 'İlahi',
      period: 'Tekke Edebiyatı',
      bio: 'Şair, ilahi aşkın etkisiyle divane olmuş, kendini tanıyamaz hale gelmiştir. Şeyhe yalvarır, Mecnun gibi yârini arar. Aşkın insanı nasıl değiştirdiğini anlatır.',
      stanzas: [
        {
          lines: [
            [w('Ben'), w('yürürüm'), wt('yane', ['kafiye'], ''), wt('yane', ['kafiye'], '')],
            [w('Aşk'), w('boyadı'), w('beni'), wt('kane', ['kafiye'], '')],
            [w('Ne'), w('âkilem'), w('ne'), wt('divane', ['kafiye'], '')],
            [wt('Gel', ['redif'], ''), wt('gör', ['redif'], ''), wt('beni', ['redif'], ''), wt('aşk', ['redif'], ''), wt('neyledi', ['redif'], 'Her dörtlüğün son mısrası')]
          ]
        },
        {
          lines: [
            [w('Gâh'), w('eserim'), w('yeller'), wt('gibi', ['kafiye'], '')],
            [w('Gâh'), w('tozarım'), w('yollar'), wt('gibi', ['kafiye'], '')],
            [w('Gâh'), w('akarım'), w('seller'), wt('gibi', ['kafiye'], '')],
            [wt('Gel', ['redif'], ''), wt('gör', ['redif'], ''), wt('beni', ['redif'], ''), wt('aşk', ['redif'], ''), wt('neyledi', ['redif'], '')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: '"Gel gör beni aşk neyledi" — Her dörtlüğün (bent) son mısrasında tekrarlanır.', count: 10 },
        kafiye: { description: 'Düz kafiye (aaab / cccb...). yane-kane-divane, gibi-gibi-gibi kafiyelidir.', count: 7 },
        olcu: { description: 'Hece ölçüsü — 7+7=14\\'lü hece ölçüsü.', count: 8 },
        nazimBirimi: { description: 'Dörtlük (Bent). Her bent 4 mısradan oluşur.', count: 2 },
        edebiSanat: { description: 'İlahi aşk (aşk-ı hakiki)', count: 0 },
        tema: { description: 'Aşk (ilahi aşk / aşk-ı hakiki). Allah sevgisi ve bu sevginin insanı dönüştürmesi.', count: 0 },
        konu: { description: 'Şair, ilahi aşkın etkisiyle divane olmuş, kendini tanıyamaz hale gelmiştir.', count: 0 }
      }
    }''',
    
    'fuzuli': '''{
      id: 'fuzuli-poem',
      title: 'Gazel (Aziz İstanbul)',
      form: 'Gazel',
      period: 'Divan Edebiyatı',
      bio: 'İstanbul\\'un eşsizliği, cennete benzerliği, İslam dünyası için önemi ve padişahın saadet gölgesi altındaki ihtişamı anlatılır.',
      stanzas: [
        {
          lines: [
            [w('Bu'), w('şehr-i'), w('Stanbul'), w('ki'), w('bî-misâl-ü'), wt('bî-nazîrdir,', ['kafiye'], 'dir')],
            [w('Ger'), w('sâkî-i'), w('cihan-ı'), w('cihan'), w('olmaya'), wt('hakkıdır.', ['kafiye'], 'dir')]
          ]
        },
        {
          lines: [
            [w('Bir'), w('sâye-i'), w('hümâyûn'), w('ki'), w('bihişte'), w('menzîl'), wt('olur,', ['kafiye'], 'olur')],
            [w('Nâzânînlerin'), w('teşrîf-i'), w('pây-bûsû'), wt('olur.', ['kafiye'], 'olur')]
          ]
        },
        {
          lines: [
            [w('Kim'), w('bilir'), w('bu'), w('ne'), w('şehrdir'), w('ki'), w('âlemde'), w('nâmı'), wt('yok,', ['kafiye'], 'yok-tok')],
            [w('Feth'), w('olunmadıkça'), w('olmaz'), w('devlet-i'), w('İslâm'), wt('tok.', ['kafiye'], 'yok-tok')]
          ]
        },
        {
          lines: [
            [w('Sâye-i'), w('saadetinde'), w('bin'), w('âlem'), w('nûrân'), wt('olur,', ['kafiye'], 'olur')],
            [w('Sâye-i'), w('saadetinde'), w('bin'), w('âlem'), w('nûrân'), wt('olur.', ['kafiye'], 'olur')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: 'Redif yoktur. Gazel nazım şeklinde redif kullanılmaz, sadece kafiye vardır.', count: 0 },
        kafiye: { description: 'Düz kafiye. 1.-2. mısra (dir-dir), 3.-4. mısra (olur-olur), 5.-6. mısra (yok-tok), 7.-8. mısra (olur-olur) kafiyelidir.', count: 8 },
        olcu: { description: 'Aruz ölçüsü — Fâilâtün / Fâilâtün / Fâilâtün / Fâilün kalıbı.', count: 8 },
        nazimBirimi: { description: 'Beyit (ikişer mısradan oluşan birim).', count: 4 },
        edebiSanat: { description: '', count: 0 },
        tema: { description: 'İstanbul\\'un güzelliği, ihtişamı ve manevi değeri.', count: 0 },
        konu: { description: 'İstanbul\\'un eşsizliği, cennete benzerliği.', count: 0 }
      }
    }''',

    'baki': '''{
      id: 'baki-poem',
      title: 'Kanuni Mersiyesi',
      form: 'Mersiye',
      period: 'Divan Edebiyatı',
      bio: 'Kanûnî Sultan Süleyman\\'ın ölüm yıldönümünde (6 Eylül) İstanbul\\'da dolaşan ruhunun hissedilmesi, onun İstanbul\\'u fethettiği gecenin anılması.',
      stanzas: [
        {
          lines: [
            [w('Efsunî'), w('bir'), w('bahar'), wt('gecesidir', ['kafiye'], 'gece-gece'), w('bu'), wt('gece,', ['kafiye'], '')],
            [w('Şu'), w('gök'), w('kubbe'), w('altında'), w('nice'), w('nice'), wt('gece!', ['kafiye'], '')],
            [wt('Bu', ['redif'], ''), wt('gece', ['redif'], ''), w('Sultan'), w("Süleyman'ın"), w('ruhu'), wt('gezer,', ['kafiye'], 'gezer-gezer')],
            [wt('Bu', ['redif'], ''), wt('gece', ['redif'], ''), wt('Kanûnî', ['redif'], ''), wt('Sultan', ['redif'], ''), wt('Süleyman', ['redif'], ''), wt('gezer.', ['redif'], 'Redif')]
          ]
        },
        {
          lines: [
            [w('O,'), w('bu'), w('şehr-i'), w("Stanbul'u"), w('aldığı'), wt('gecedir,', ['kafiye'], 'gecedir-gecedir')],
            [w('Bu,'), w('onun'), w('ruhunun'), w('dolaştığı'), wt('gecedir.', ['kafiye'], 'gecedir-gecedir')],
            [wt('Bu', ['redif'], ''), wt('gece', ['redif'], ''), w('Sultan'), w("Süleyman'ın"), w('ruhu'), wt('gezer,', ['kafiye'], 'gezer-gezer')],
            [wt('Bu', ['redif'], ''), wt('gece', ['redif'], ''), wt('Kanûnî', ['redif'], ''), wt('Sultan', ['redif'], ''), wt('Süleyman', ['redif'], ''), wt('gezer.', ['redif'], 'Redif')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: '"Bu gece Kanûnî Sultan Süleyman gezer" — tekrarlanır.', count: 12 },
        kafiye: { description: 'Düz kafiye. gece-gece, gezer-gezer, gecedir-gecedir kafiyelidir.', count: 6 },
        olcu: { description: 'Hece ölçüsü — 11\\'li hece ölçüsü.', count: 8 },
        nazimBirimi: { description: 'Dörtlük (Bent).', count: 2 },
        edebiSanat: { description: '', count: 0 },
        tema: { description: 'Ölüm / Tarihî şahsiyeti anma.', count: 0 },
        konu: { description: 'Kanûnî Sultan Süleyman\\'ın ölüm yıldönümünde ruhunun hissedilmesi.', count: 0 }
      }
    }''',

    'karacaoglan': '''{
      id: 'karacaoglan-poem',
      title: 'Köroğlu Koşması',
      form: 'Koşma',
      period: 'Halk Edebiyatı',
      bio: 'Köroğlu\\'nun hiddetli bir şekilde atı Mahmur\\'a binerek gelişi anlatılır. Destan geleneğinin tekrarlı anlatım özelliği görülür.',
      stanzas: [
        {
          lines: [
            [w('Köroğlu'), w('geliyor'), wt('hiddetli,', ['kafiye'], 'hiddetli-gitmiş')],
            [w('Atı'), w('Mahmura'), w('binmiş'), wt('gitmiş.', ['kafiye'], 'hiddetli-gitmiş')],
            [w('Köroğlu'), w('geliyor'), wt('hiddetli,', ['kafiye'], '')],
            [w('Atı'), w('Mahmura'), w('binmiş'), wt('gitmiş.', ['kafiye'], '')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: 'Redif yoktur.', count: 0 },
        kafiye: { description: 'Düz kafiye. 1.-2. mısra (hiddetli-gitmiş) kafiyelidir.', count: 4 },
        olcu: { description: 'Hece ölçüsü — 7+7=14\\'lü hece ölçüsü.', count: 4 },
        nazimBirimi: { description: 'Dörtlük (Bent).', count: 1 },
        edebiSanat: { description: '', count: 0 },
        tema: { description: 'Kahramanlık / Yiğitlik.', count: 0 },
        konu: { description: 'Köroğlu\\'nun hiddetli bir şekilde atı Mahmur\\'a binerek gelişi.', count: 0 }
      }
    }''',

    'namik-kemal': '''{
      id: 'namik-kemal-poem',
      title: 'Hürriyet Kasidesi',
      form: 'Kaside',
      period: 'Tanzimat Edebiyatı',
      bio: 'Şehitlerin manevi değeri, hürriyetin önemi ve hürriyet uğruna can verme arzusu anlatılır.',
      stanzas: [
        {
          lines: [
            [w('Ey'), w('şehid'), w('oğlu'), w('şehid,'), w('isteme'), w('benden'), wt('makber,', ['kafiye'], 'makber')],
            [w('Sana'), w('âgûşunu'), w('açmış'), w('duruyor'), wt('Peygamber.', ['kafiye'], 'Peygamber')]
          ]
        },
        {
          lines: [
            [w('Hür'), w('yaşamış,'), w('hür'), w('yaşarım,'), w('hür'), w('yaşamam'), wt('hüryetsiz,', ['redif', 'kafiye'], '')],
            [w('Hürriyet'), w('uğruna'), w('can'), w('vermekten'), w('usanmam'), wt('hüryetsiz.', ['redif', 'kafiye'], '')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: '"Hüryetsiz" — mısralarda tekrarlanır.', count: 2 },
        kafiye: { description: 'Düz kafiye. makber-Peygamber, hüryetsiz-hüryetsiz.', count: 4 },
        olcu: { description: 'Aruz ölçüsü — Fâilâtün / Fâilâtün / Fâilâtün / Fâilün kalıbı.', count: 4 },
        nazimBirimi: { description: 'Beyit (ikişer mısradan oluşan birim).', count: 2 },
        edebiSanat: { description: '', count: 0 },
        tema: { description: 'Hürriyet / Vatan sevgisi.', count: 0 },
        konu: { description: 'Şehitlerin manevi değeri, hürriyetin önemi.', count: 0 }
      }
    }''',

    'tevfik-fikret': '''{
      id: 'tevfik-fikret-poem',
      title: 'Siste Söyleniş (Sis)',
      form: 'Serbest Nazım',
      period: 'Servet-i Fünun',
      bio: 'Şair, sisli bir akşamda Boğaz\\'da bir vapurda hissettiklerini, gözleri kapalı, düşünmeden sadece hissederek yaşadığı mistik anı anlatır.',
      stanzas: [
        {
          lines: [
            [w('Gözlerim'), w('kapalı,'), w('başımı'), w('geriye'), wt('atmış,', ['kafiye'], '')],
            [w('Bir'), w('şey'), w('düşünmeden,'), w('sadece'), wt('hissederek,', ['kafiye'], '')],
            [w('Sisli'), w('bir'), w('akşamda,'), w("İstanbul'un"), wt('boğazında,', ['kafiye'], '')],
            [w('Bir'), w('vapurdum,'), w('sessizce'), wt('ilerleyerek.', ['kafiye'], '')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: 'Redif yoktur.', count: 0 },
        kafiye: { description: 'Yarım uyaklar. atmış-hissederek, boğazında-ilerleyerek gibi yarım uyaklar vardır.', count: 4 },
        olcu: { description: 'Serbest ölçü.', count: 4 },
        nazimBirimi: { description: 'Dörtlük (Bent).', count: 1 },
        edebiSanat: { description: '', count: 0 },
        tema: { description: 'Hüzün / Melankoli.', count: 0 },
        konu: { description: 'Şair, sisli bir akşamda Boğaz\\'da bir vapurda hissettiklerini anlatır.', count: 0 }
      }
    }''',

    'mehmet-akif': '''{
      id: 'mehmet-akif-poem',
      title: 'İstiklal Marşı',
      form: 'Kaside',
      period: 'Milli Edebiyat',
      bio: 'Türk milletinin istiklaline olan inancı, bayrağın ve vatanın kutsallığı, bağımsızlık uğruna kan dökmeye hazır olma anlatılır.',
      stanzas: [
        {
          lines: [
            [w('Korkma,'), w('sönmez'), w('bu'), w('şafaklarda'), w('yüzen'), w('al'), wt('sancak;', ['kafiye'], '')],
            [w('Sönmeden'), w('yurdumun'), w('üstünde'), w('tüten'), w('en'), w('son'), wt('ocak.', ['kafiye'], '')],
            [w('O'), w('benim'), w('milletimin'), w('yıldızıdır,'), wt('parlayacak;', ['kafiye'], '')],
            [w('O'), w('benimdir,'), w('o'), w('benim'), w('milletimindir'), wt('ancak.', ['kafiye'], '')]
          ]
        },
        {
          lines: [
            [w('Çatma,'), w('kurban'), w('olayım,'), w('çehreni'), w('ey'), w('nazlı'), wt('hilâl!', ['kafiye'], '')],
            [w('Kahraman'), w('ırkıma'), w('bir'), w('gül...'), w('Ne'), w('bu'), w('şiddet,'), w('bu'), wt('celâl?', ['kafiye'], '')],
            [w('Sana'), w('olmaz'), w('dökülen'), w('kanlarımız'), w('sonra'), wt('helâl;', ['kafiye'], '')],
            [w('Hakkıdır,'), w("Hakk'a"), w('tapan,'), w('milletimin'), wt('istiklâl.', ['kafiye'], '')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: 'Redif yoktur.', count: 0 },
        kafiye: { description: 'Düz kafiye. sancak-ocak, parlayacak-ancak, hilâl-celâl, helâl-istiklâl.', count: 8 },
        olcu: { description: 'Aruz ölçüsü.', count: 8 },
        nazimBirimi: { description: 'Dörtlük (Kıta).', count: 2 },
        edebiSanat: { description: '', count: 0 },
        tema: { description: 'Vatan sevgisi / İstiklal.', count: 0 },
        konu: { description: 'Türk milletinin istiklaline olan inancı.', count: 0 }
      }
    }''',

    'yahya-kemal': '''{
      id: 'yahya-kemal-poem',
      title: 'Sessiz Gemi',
      form: 'Koşma',
      period: 'Milli Edebiyat',
      bio: 'Şair, dünyanın ateşlerle sarıldığını, ölümden evvel ölümü görmek istediğini, dünyanın bir ucuna kaçma arzusunu anlatır.',
      stanzas: [
        {
          lines: [
            [w('Artık'), w('demir'), w('alsak'), w('mıranadan'), wt('gidelim,', ['kafiye'], '')],
            [w('Dört'), w('tarafı'), w('sarmış'), w('ateşlerden'), wt('gidelim.', ['kafiye'], '')],
            [wt('Dünyanın', ['redif'], ''), wt('bir', ['redif'], ''), wt('ucuna', ['redif'], ''), wt('gidelim,', ['redif'], '')],
            [wt('Dünyanın', ['redif'], ''), wt('bir', ['redif'], ''), wt('ucuna', ['redif'], ''), wt('gidelim.', ['redif'], '')]
          ]
        },
        {
          lines: [
            [w('Bir'), w('gün'), w('herkes'), w('ölür,'), w('bilinmez'), w('ne'), wt('zamandır,', ['kafiye'], '')],
            [w('Ölümden'), w('evvel'), w('ölümü'), w('görmektir'), wt('fayda.', ['kafiye'], '')],
            [wt('Dünyanın', ['redif'], ''), wt('bir', ['redif'], ''), wt('ucuna', ['redif'], ''), wt('gidelim,', ['redif'], '')],
            [wt('Dünyanın', ['redif'], ''), wt('bir', ['redif'], ''), wt('ucuna', ['redif'], ''), wt('gidelim.', ['redif'], '')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: '"Dünyanın bir ucuna gidelim" — tekrarlanır.', count: 16 },
        kafiye: { description: 'Düz kafiye. gidelim-gidelim, zamandır-fayda.', count: 4 },
        olcu: { description: 'Hece ölçüsü.', count: 8 },
        nazimBirimi: { description: 'Dörtlük (Bent).', count: 2 },
        edebiSanat: { description: '', count: 0 },
        tema: { description: 'Ölüm / Kaçış.', count: 0 },
        konu: { description: 'Dünyadan uzaklaşma arzusu.', count: 0 }
      }
    }''',

    'faruk-nafiz': '''{
      id: 'faruk-nafiz-poem',
      title: 'Han Duvarları',
      form: 'Koşma',
      period: 'Cumhuriyet Dönemi',
      bio: 'Terke edilmiş bir handa duvarlara yansıyan gölgelerin hatıraları çağrıştırması, hanın sessizliği ve ıssızlığı anlatılır.',
      stanzas: [
        {
          lines: [
            [w('Duvarlara'), w('konan'), wt('gölgeler,', ['kafiye'], '')],
            [w('Birer'), w('hayal,'), w('birer'), wt('hatıra.', ['kafiye'], '')],
            [w('Bu'), w('han'), w('ne'), w('kadar'), w('sessiz,'), w('ne'), w('kadar'), wt('kimsesiz,', ['kafiye'], '')],
            [w('Ne'), w('kadar'), w('ıssız,'), w('ne'), w('kadar'), wt('harabe.', ['kafiye'], '')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: 'Redif yoktur.', count: 0 },
        kafiye: { description: 'Düz kafiye. gölgeler-hatıra, kimsesiz-harabe.', count: 4 },
        olcu: { description: 'Hece ölçüsü — 7+7=14\\'lü hece ölçüsü.', count: 4 },
        nazimBirimi: { description: 'Dörtlük (Bent).', count: 1 },
        edebiSanat: { description: '', count: 0 },
        tema: { description: 'Yalnızlık / Hüzün.', count: 0 },
        konu: { description: 'Terk edilmiş bir hanın atmosferi.', count: 0 }
      }
    }''',

    'ahmet-kutsi': '''{
      id: 'ahmet-kutsi-poem',
      title: 'Nerdesin',
      form: 'Koşma',
      period: 'Cumhuriyet Dönemi',
      bio: 'Şair, gözü yaşlı, gönlü kırık bir halde sokaklarda kayıp birini aramaktadır.',
      stanzas: [
        {
          lines: [
            [w('Gözü'), w('yaşlı,'), w('gönlü'), w('kırık,'), w('başı'), wt('önde,', ['kafiye'], '')],
            [w('Sokaklarda'), w('dolaşırım'), w('seni'), wt('arar.', ['kafiye'], '')],
            [w('Bir'), w('ses,'), w('bir'), w('nefes,'), w('bir'), w('izin'), wt('olsaydı,', ['kafiye'], '')],
            [w('Bilirsin,'), w('bulurdum'), w('seni'), wt('nerelerde.', ['kafiye'], '')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: 'Redif yoktur.', count: 0 },
        kafiye: { description: 'Düz kafiye. önde-arar, olsaydı-nerelerde.', count: 4 },
        olcu: { description: 'Hece ölçüsü — 7+7=14\\'lü hece ölçüsü.', count: 4 },
        nazimBirimi: { description: 'Dörtlük (Bent).', count: 1 },
        edebiSanat: { description: '', count: 0 },
        tema: { description: 'Yalnızlık / Ayrılık.', count: 0 },
        konu: { description: 'Kayıp birini arama.', count: 0 }
      }
    }''',

    'cahit-sitki': '''{
      id: 'cahit-sitki-poem',
      title: 'Otuz Beş Yaş',
      form: 'Gazel',
      period: 'Cumhuriyet Dönemi',
      bio: 'Şair, otuz beş yaşında hayatın ortasında olduğunu, Dante\\'nin Inferno\\'suna gönderme yaparak anlatır.',
      stanzas: [
        {
          lines: [
            [w('Yaş'), w('otuz'), w('beş!'), w('Yolun'), w('yarısı'), wt('eder,', ['kafiye'], '')],
            [w('Dante'), w('gibi'), w('ortasındayız'), wt('ömrün.', ['kafiye'], '')],
            [w('Delikanlı'), w('çağımızdaki'), wt('cevher,', ['kafiye'], '')],
            [w('Yalvarırım,'), w('eğilme'), w('onun'), wt('önün.', ['kafiye'], '')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: 'Redif yoktur.', count: 0 },
        kafiye: { description: 'Düz kafiye. eder-ömrün, cevher-önün.', count: 4 },
        olcu: { description: 'Aruz ölçüsü.', count: 4 },
        nazimBirimi: { description: 'Dörtlük (Bent).', count: 1 },
        edebiSanat: { description: '', count: 0 },
        tema: { description: 'Yaşlanma / Hayatın anlamı.', count: 0 },
        konu: { description: 'Otuz beş yaşında hayatın ortasında olma duygusu.', count: 0 }
      }
    }''',

    'orhan-veli': '''{
      id: 'orhan-veli-poem',
      title: 'İstanbul\\'u Dinliyorum',
      form: 'Serbest Nazım',
      period: 'Cumhuriyet Dönemi',
      bio: 'Şair, gözleri kapalı bir şekilde İstanbul\\'un seslerini dinler.',
      stanzas: [
        {
          lines: [
            [w('Gözlerim'), wt('kapalı', ['kafiye'], '')],
            [w('Kulaklarımı'), wt('dayadım,', ['kafiye'], '')],
            [w('İnce'), w('bir'), wt('duvara', ['kafiye'], '')],
            [w('Karşıdan'), w('vapur'), w('sesleri'), wt('geliyor', ['kafiye'], '')],
            [w('Ve'), w('limandan'), w('uzaklaşan'), w('bir'), w('şeylerin'), wt('hüznü', ['kafiye'], '')],
            [w('Ve'), w('her'), w('şeyde'), w('batan'), wt('güneşin', ['kafiye'], '')],
            [w('Ve'), w('Yalılarda'), w('ölen'), wt('günün', ['kafiye'], '')],
            [w('Ve'), w('Yelkenlere'), w('karşı'), w('koyan'), wt('dalgaların', ['kafiye'], '')],
            [w('Ve'), w('kadınların,'), w('kocalarının,'), wt('annelerinin', ['kafiye'], '')],
            [w('Ve'), w('ağlayan'), wt('çocukların', ['kafiye'], '')],
            [w('Ve'), w('hüzünlü'), wt('gemilerin', ['kafiye'], '')],
            [w('Ve'), w('bütün'), w('bunların'), w('üstüne'), w('çöken'), wt('akşamın', ['kafiye'], '')],
            [w('Hüznünü'), w('dinliyorum')],
            [wt("İstanbul'u", ['redif'], ''), wt('dinliyorum.', ['redif'], '')]
          ]
        }
      ],
      analysisDetails: {
        redif: { description: '"İstanbul\\'u dinliyorum" — Şiirin son mısrasında tekrarlanır.', count: 2 },
        kafiye: { description: 'Serbest kafiye. kapalı-kapalı, geliyor-hüznü gibi yarım uyaklar vardır.', count: 12 },
        olcu: { description: 'Serbest ölçü.', count: 14 },
        nazimBirimi: { description: 'Tek bir bütün (tek kıta).', count: 1 },
        edebiSanat: { description: '', count: 0 },
        tema: { description: 'İstanbul / Hüzün.', count: 0 },
        konu: { description: 'Şehrin seslerini dinleyerek duygusal bir bağ kurma.', count: 0 }
      }
    }'''
}


import sys

new_content = content
for poet_id, poem_str in new_poems.items():
    # Regex to find: id: 'poet_id' ... mainPoem: { ... } or identifier
    # Since we don't want to break if mainPoem is an identifier (e.g. mainPoem: yunusEmrePoem,)
    # we can just match `id: 'poet_id'` and then search forward for `mainPoem:`
    
    # Let's find the start of the poet object
    search_str = f"id: '{poet_id}'"
    idx = new_content.find(search_str)
    if idx == -1:
        print(f"Error finding poet {poet_id}")
        continue
        
    main_poem_idx = new_content.find("mainPoem:", idx)
    if main_poem_idx == -1:
        continue
        
    # mainPoem: could be an inline object or a variable name
    # we find the next comma after balancing brackets if it's an object
    
    start_value_idx = main_poem_idx + len("mainPoem:")
    # skip spaces
    while new_content[start_value_idx].isspace():
        start_value_idx += 1
        
    if new_content[start_value_idx] == '{':
        # It's an inline object, parse braces
        brace_count = 0
        end_value_idx = start_value_idx
        for i in range(start_value_idx, len(new_content)):
            if new_content[i] == '{':
                brace_count += 1
            elif new_content[i] == '}':
                brace_count -= 1
                if brace_count == 0:
                    end_value_idx = i + 1
                    break
    else:
        # It's a variable reference
        end_value_idx = new_content.find(",", start_value_idx)
        
    # Replace the parsed value with the new string
    new_content = new_content[:start_value_idx] + poem_str + new_content[end_value_idx:]

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Replacement complete.")
