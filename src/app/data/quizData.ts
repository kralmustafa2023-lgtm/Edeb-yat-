export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'kolay' | 'orta' | 'zor';
}

import { unit1Questions } from './quizData_u1';
import { unit2Questions } from './quizData_u2';
import { unit3Questions } from './quizData_u3';
import { unit4Questions } from './quizData_u4';
import { unit5Questions } from './quizData_u5';
import { unit6Questions } from './quizData_u6';

export interface QuizTopic {
  id: string;
  title: string;
  icon: string;
  color: string;
  questions: QuizQuestion[];
}

export const QUIZ_TOPICS: QuizTopic[] = [
  {
    id: 'Giriş (Ünite 1)',
    title: 'Ünite 1: Giriş',
    icon: '📚',
    color: 'from-violet-600 to-purple-700',
    questions: unit1Questions,
  },
  {
    id: 'Hikâye (Ünite 2)',
    title: 'Ünite 2: Hikâye',
    icon: '📖',
    color: 'from-amber-600 to-yellow-700',
    questions: unit2Questions,
  },
  {
    id: 'Şiir (Ünite 3)',
    title: 'Ünite 3: Şiir',
    icon: '🎭',
    color: 'from-pink-600 to-rose-700',
    questions: unit3Questions,
  },
  {
    id: 'Masal & Fabl (Ünite 4)',
    title: 'Ünite 4: Masal ve Fabl',
    icon: '🦄',
    color: 'from-emerald-600 to-teal-700',
    questions: unit4Questions,
  },
  {
    id: 'Roman (Ünite 5)',
    title: 'Ünite 5: Roman',
    icon: '📘',
    color: 'from-blue-600 to-indigo-700',
    questions: unit5Questions,
  },
  {
    id: 'Tiyatro (Ünite 6)',
    title: 'Ünite 6: Tiyatro',
    icon: '🎭',
    color: 'from-orange-500 to-red-600',
    questions: unit6Questions,
  },
  {
    id: 'Biyografi/Otobiyografi (Ünite 7)',
    title: 'Ünite 7: Biyo / Otobiyo',
    icon: '📝',
    color: 'from-teal-600 to-cyan-700',
    questions: [
      {
        id: 'u7-1',
        question: 'Bir kişinin kendi hayat hikayesini yansıttığı esere ne ad verilir?',
        options: ['Biyografi', 'Otobiyografi', 'Monografi', 'Tutanak'],
        correct: 1,
        explanation: 'Kişinin kendi hayatını anlattığı türe otobiyografi (özyaşamöyküsü) denir.',
        difficulty: 'kolay',
      },
      {
        id: 'u7-2',
        question: '"Okuyanlar bu kitabı sevdi." cümlesindeki "Okuyanlar" sözcüğü için aşağıdakilerden hangisi doğrudur?',
        options: ['İsim-Fiil', 'Sıfat-Fiil (Adlaşmış)', 'Zarf-Fiil', 'Çekimli Fiil'],
        correct: 1,
        explanation: '"Okuyan (insanlar)" şeklindeki sıfat-fiil, adlaşmış sıfat-fiil olmuştur.',
        difficulty: 'orta',
      },
      {
        id: 'u7-3',
        question: 'Cevat Şakir Kabaağaçlı edebiyatımızdaki hangi lakabıyla tanınır?',
        options: ['Halikarnas Balıkçısı', 'Kaptan', 'Dalgıç Ağa', 'Ege Şairi'],
        correct: 0,
        explanation: 'Cevat Şakir, "Halikarnas Balıkçısı" lakabını kullanmıştır.',
        difficulty: 'zor',
      },
      {
        id: 'u7-4',
        question: 'Biyografi hangi bakış açısıyla yazılır?',
        options: ['Birinci kişi (ben)', 'İkinci kişi (sen)', 'Üçüncü kişi (o)', 'Belirsiz'],
        correct: 2,
        explanation: 'Biyografi başka birinin hayatını anlattığı için üçüncü kişi ağzından yazılır.',
        difficulty: 'kolay',
      },
      {
        id: 'u7-5',
        question: 'Otobiyografide anlatıcı kimdir?',
        options: ['Bir gazeteci', 'Yazarın kendisi', 'Bir tarihçi', 'Aileden biri'],
        correct: 1,
        explanation: 'Otobiyografide kişi kendi hayatını kendisi anlatır, birinci kişi ağzı kullanılır.',
        difficulty: 'kolay',
      },
      {
        id: 'u7-6',
        question: 'Biyografi ile otobiyografi arasındaki en temel fark nedir?',
        options: ['Uzunluk farkı', 'Anlatıcı farkı', 'Konu farkı', 'Dil farkı'],
        correct: 1,
        explanation: 'Biyografiyi başkası, otobiyografiyi kişinin kendisi yazar. Temel fark anlatıcıdadır.',
        difficulty: 'orta',
      },
      {
        id: 'u7-7',
        question: 'Divan edebiyatında şairlerin hayatlarının anlatıldığı eserlere ne denir?',
        options: ['Tezkire', 'Münşeat', 'Divançe', 'Mesnevi'],
        correct: 0,
        explanation: 'Tezkire, Divan edebiyatında şairlerin biyografilerinin toplandığı eserlerdir.',
        difficulty: 'orta',
      },
      {
        id: 'u7-8',
        question: 'Biyografide bilgiler nereden elde edilir?',
        options: ['Hayal gücünden', 'Belge, mektup, tanık ifadesi gibi kaynaklardan', 'Sadece romanlardan', 'Uydurma hikâyelerden'],
        correct: 1,
        explanation: 'Biyografi gerçek belgelere, kaynaklara ve araştırmaya dayanan bir türdür.',
        difficulty: 'orta',
      },
      {
        id: 'u7-9',
        question: '"Anı" türü ile "otobiyografi" arasındaki fark nedir?',
        options: ['Fark yoktur', 'Anı belli bir dönemi, otobiyografi tüm hayatı anlatır', 'Otobiyografi başkası tarafından yazılır', 'Anı nesirle, otobiyografi nazımla yazılır'],
        correct: 1,
        explanation: 'Anı hayatın belli bir dönemini, otobiyografi ise kişinin doğumundan itibaren tüm hayatını ele alır.',
        difficulty: 'zor',
      },
      {
        id: 'u7-10',
        question: 'Aşağıdakilerden hangisi biyografi türünün özelliklerinden biri DEĞİLDİR?',
        options: ['Gerçeklere dayanır', 'Araştırmaya dayalıdır', 'Hayal gücüne dayanır', 'Belgelerle desteklenir'],
        correct: 2,
        explanation: 'Biyografi hayal gücüne değil gerçeklere, belgelere ve araştırmaya dayanır.',
        difficulty: 'kolay',
      },
    ],
  },
  {
    id: 'Mektup/E-Posta (Ünite 8)',
    title: 'Ünite 8: Mektup ve E-Posta',
    icon: '📨',
    color: 'from-sky-500 to-blue-600',
    questions: [
      {
        id: 'u8-1',
        question: 'Dilekçelerde sol alt köşeye genellikle hangi bilgi yazılır?',
        options: ['Yetkili makamın adı', 'İmza', 'İletişim/Adres bilgileri', 'Tarih'],
        correct: 2,
        explanation: 'Dilekçede sol alta ad-soyad, adres ve iletişim bilgileri yazılır.',
        difficulty: 'kolay',
      },
      {
        id: 'u8-2',
        question: 'Edebi şahsiyetlerin kendi aralarındaki yazışmalarını içeren mektuplara ne denir?',
        options: ['Özel mektup', 'Edebi mektup', 'Resmi mektup', 'Açık mektup'],
        correct: 1,
        explanation: 'Sanatçıların ve aydınların fikir alışverişinde bulundukları belgeler "Edebi Mektup" olarak adlandırılır.',
        difficulty: 'orta',
      },
      {
        id: 'u8-3',
        question: 'Divan edebiyatında mektupların toplandığı defter türüne ne ad verilir?',
        options: ['Münşeat', 'Tezkire', 'Divançe', 'Siyasetname'],
        correct: 0,
        explanation: 'Münşeat, divan edebiyatında mektupların toplandığı eserlerin adıdır.',
        difficulty: 'zor',
      },
      {
        id: 'u8-4',
        question: 'Mektubun en önemli özelliği nedir?',
        options: ['Uzun olması', 'Samimi ve içten bir dil kullanılması', 'Resmi dil kullanılması', 'Şiirsel olması'],
        correct: 1,
        explanation: 'Özel mektuplarda samimi, içten ve doğal bir dil kullanılır.',
        difficulty: 'kolay',
      },
      {
        id: 'u8-5',
        question: 'E-posta ile mektup arasındaki en temel fark nedir?',
        options: ['Konuları farklıdır', 'E-posta dijital ortamda iletilir', 'Mektup daha kısadır', 'E-posta resmi değildir'],
        correct: 1,
        explanation: 'E-posta internet üzerinden dijital ortamda gönderilir, mektup ise kâğıda yazılıp posta ile gönderilir.',
        difficulty: 'kolay',
      },
      {
        id: 'u8-6',
        question: 'Bir devlet kurumuna yazılan resmi yazıya ne ad verilir?',
        options: ['Özel mektup', 'Dilekçe', 'Edebi mektup', 'Açık mektup'],
        correct: 1,
        explanation: 'Resmi kurumlara istek, şikâyet veya bilgi amacıyla yazılan yazılara dilekçe denir.',
        difficulty: 'orta',
      },
      {
        id: 'u8-7',
        question: 'Açık mektup nedir?',
        options: ['Zarfı olmayan mektup', 'Kamuoyuna hitaben yazılan mektup', 'Şifreli mektup', 'İmzasız mektup'],
        correct: 1,
        explanation: 'Açık mektup, bir kişiye hitaben yazılsa da kamuoyuyla paylaşılması amaçlanan mektuptur.',
        difficulty: 'orta',
      },
      {
        id: 'u8-8',
        question: 'Mektup türü hangi bakış açısıyla yazılır?',
        options: ['Üçüncü kişi', 'İkinci kişi', 'Birinci kişi', 'Belirsiz'],
        correct: 2,
        explanation: 'Mektup birinci kişi ağzıyla (ben) yazılır çünkü yazar kendi duygu ve düşüncelerini aktarır.',
        difficulty: 'kolay',
      },
      {
        id: 'u8-9',
        question: 'Türk edebiyatında mektup türünün en önemli örneklerinden "Çağdaş Mektuplar" kime aittir?',
        options: ['Namık Kemal', 'Cahit Sıtkı Tarancı', 'Ziya Gökalp', 'Mehmet Akif'],
        correct: 1,
        explanation: 'Cahit Sıtkı Tarancı ve Ziya Osman Saba arasındaki mektuplar Türk edebiyatının en güzel mektup örneklerindendir.',
        difficulty: 'zor',
      },
      {
        id: 'u8-10',
        question: 'E-postanın "Konu" (Subject) bölümüne ne yazılmalıdır?',
        options: ['Gönderenin adı', 'Mektubun tamamı', 'Kısa ve öz bir başlık', 'Alıcının adresi'],
        correct: 2,
        explanation: 'E-postanın konu bölümüne, e-postanın içeriğini özetleyen kısa ve açıklayıcı bir başlık yazılmalıdır.',
        difficulty: 'kolay',
      },
    ],
  },
  {
    id: 'Günlük/Blog (Ünite 9)',
    title: 'Ünite 9: Günlük ve Blog',
    icon: '📅',
    color: 'from-slate-600 to-gray-800',
    questions: [
      {
        id: 'u9-1',
        question: 'Günlük (günce) türünün anı (hatıra) türünden en temel farkı nedir?',
        options: ['Günlüklerin ünlü kişilere ait olması', 'Günlüğün yaşanırken tarih atılarak günü gününe yazılması', 'Günlüğün sadece birinci şahıs ağzından yazılması', 'Anıların edebi değer taşımaması'],
        correct: 1,
        explanation: 'Günlükler yaşandığı anda, günü gününe ve tarih tutularak yazılır.',
        difficulty: 'kolay',
      },
      {
        id: 'u9-2',
        question: '"Günce" terimini yaygınlaştıran ve günlük türünün önemli ustası kimdir?',
        options: ['Nurullah Ataç', 'Sait Faik', 'Ahmet Hamdi Tanpınar', 'Halit Ziya Uşaklıgil'],
        correct: 0,
        explanation: '"Günce" adını kullanan en önemli yazarımız Nurullah Ataç\'tır.',
        difficulty: 'orta',
      },
      {
        id: 'u9-3',
        question: '"Blog" kelimesinin etimolojik kökeni hangi kelimelerin birleşimidir?',
        options: ['Basic Log', 'Web Log', 'Binary Log', 'Broadcast Log'],
        correct: 1,
        explanation: '"Blog" kelimesi İngilizce "Web Log" kavramının kısalmasıdır.',
        difficulty: 'zor',
      },
      {
        id: 'u9-4',
        question: 'Günlük türünde anlatıcı kimdir?',
        options: ['Bir gazeteci', 'Yazarın kendisi', 'Hayali bir karakter', 'Belirsiz'],
        correct: 1,
        explanation: 'Günlük, kişinin kendi yaşamından kesitler sunduğu birinci kişi anlatılı bir türdür.',
        difficulty: 'kolay',
      },
      {
        id: 'u9-5',
        question: 'Blog ile günlük arasındaki en belirgin fark nedir?',
        options: ['Blog dijital ortamda paylaşılır', 'Blog daha uzundur', 'Günlük daha resmidir', 'Aralarında fark yoktur'],
        correct: 0,
        explanation: 'Blog internet üzerinden herkesin okuyabileceği dijital bir günlüktür.',
        difficulty: 'kolay',
      },
      {
        id: 'u9-6',
        question: 'Günlüklerde dil nasıl kullanılır?',
        options: ['Resmi ve ağır', 'Samimi ve içten', 'Bilimsel ve teknik', 'Şiirsel ve ölçülü'],
        correct: 1,
        explanation: 'Günlükler kişisel yazılar olduğu için samimi, içten ve doğal bir dil kullanılır.',
        difficulty: 'kolay',
      },
      {
        id: 'u9-7',
        question: 'Günlüğün en önemli yapısal özelliği nedir?',
        options: ['Bölümlere ayrılması', 'Tarih atılarak yazılması', 'Şiir biçiminde olması', 'Diyaloglar içermesi'],
        correct: 1,
        explanation: 'Günlük her gün veya belirli aralıklarla tarih atılarak yazılır. Bu onun en belirgin yapısal özelliğidir.',
        difficulty: 'orta',
      },
      {
        id: 'u9-8',
        question: 'Aşağıdakilerden hangisi günlük türünün özelliklerinden biri DEĞİLDİR?',
        options: ['Günü gününe yazılır', 'Birinci kişi ağzı kullanılır', 'Nesnel ve tarafsızdır', 'İçten bir dil kullanılır'],
        correct: 2,
        explanation: 'Günlükler öznel yazılardır. Yazarın kendi bakış açısını yansıtır, nesnel değildir.',
        difficulty: 'orta',
      },
      {
        id: 'u9-9',
        question: 'Blogların yaygınlaşması hangi teknolojik gelişmeyle doğrudan ilişkilidir?',
        options: ['Televizyon', 'Radyo', 'İnternet', 'Matbaa'],
        correct: 2,
        explanation: 'Bloglar internetin yaygınlaşmasıyla ortaya çıkmış ve gelişmiş dijital günlüklerdir.',
        difficulty: 'kolay',
      },
      {
        id: 'u9-10',
        question: 'Türk edebiyatında "Günlük" türünde eser veren yazarlardan biri DEĞİLDİR?',
        options: ['Nurullah Ataç', 'Oğuz Atay', 'Tomris Uyar', 'Mehmet Akif Ersoy'],
        correct: 3,
        explanation: 'Mehmet Akif Ersoy şiirleriyle tanınır, günlük türünde eseri yoktur.',
        difficulty: 'zor',
      },
    ],
  }
];
