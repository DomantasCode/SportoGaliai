import {
  Activity,
  Users,
  Heart,
  Dumbbell,
  Award,
  Clock,
  ShieldCheck,
  Smile
} from 'lucide-react';
import { NavItem, Service, Benefit, Trainer, Step, FAQItem, Testimonial, Sponsor, Camp, CampProgramDay } from './types.ts';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Apie mus', href: '#about' },
  { label: 'Paslaugos', href: '#services' },
  { label: 'Stovyklos', href: '#camps' },
  { label: 'Treneriai', href: '#trainers' },
  { label: 'Programos kelias', href: '#process' },
  { label: 'Naujienos', href: '#news' },
  { label: 'DUK', href: '#faq' },
  { label: 'Kontaktai', href: '#contact-form' },
];

export const SERVICES: Service[] = [
  {
    title: 'Kineziterapija',
    description: 'Kineziterapeutų vedami užsiėmimai, skirti vaiko laikysenos korekcijai, raumenų balansui ir saugiam judėjimui.',
    icon: Activity,
    fullDescription: 'Užsiėmimai skirti vaikams su laikysenos sutrikimais (skoliozė, kifozė), pėdų deformacijomis ar raumenų disbalansu. Kineziterapeutai veda užsiėmimus, derindami žaidimą ir tikslingus pratimus, kad sustiprintų raumenis ir padėtų formuoti taisyklingus judėjimo įpročius.',
    features: [
      'Individualus kineziterapinis įvertinimas',
      'Laikysenos korekcija ir stebėjimas',
      'Pėdų skliauto formavimas',
      'Kvėpavimo pratimai',
      'Namų darbų programos sudarymas'
    ],
    duration: '45-60 min.'
  },
  {
    title: 'Individualios Treniruotės',
    description: 'Asmeninis profesionalo dėmesys ir individuali programa, orientuota į vaiko fizinę raidą bei tikslus.',
    icon: Dumbbell,
    fullDescription: 'Individualios treniruotės vaikams, turintiems specifinių tikslų (pvz., pasiruošimas varžyboms, svorio korekcija, atsigavimas po traumos) ir norintiems daugiau asmeninio trenerio dėmesio. Programa pritaikoma pagal vaiko amžių, kūno ypatybes ir pomėgius.',
    features: [
      'Individualus trenerio dėmesys',
      'Lankstus grafikas',
      'Dar greitesnis progresas',
      'Individuali programa',
      'Nuolatinė motyvacija ir palaikymas'
    ],
    duration: '60 min.'
  },
  {
    title: 'Grupiniai Užsiėmimai',
    description: 'Smagios ir aktyvios treniruotės bendraamžių būryje, skatinančios socializaciją ir komandinį darbą.',
    icon: Users,
    fullDescription: 'Užsiėmimai vyksta nedidelėse grupėse – iki 12 vaikų. Čia vaikai sportuoja, mokosi bendradarbiauti, laikytis taisyklių ir sveikai priimti pergales bei pralaimėjimus. Treniruotės sudarytos iš linksmų žaidimų, estafečių, kliūčių ruožų ir įvairių edukacinių užduočių.',
    features: [
      'Socializacija su bendraamžiais',
      'Komandiškumo ugdymas',
      'Koordinacijos ir vikrumo lavinimas',
      'Emocijų valdymas',
      'Smagūs ir dinamiški užsiėmimai'
    ],
    duration: '50 min.'
  },
  {
    title: 'Šeimos Sporto Programos',
    description: 'Aktyvus laisvalaikis visai šeimai – stiprinti ryšį sportuojant kartu.',
    icon: Heart,
    fullDescription: 'Savaitgaliais vykstantys užsiėmimai, kuriuose vaikai sportuoja kartu su tėvais. Programa sudaryta iš porinių pratimų, šeimos estafečių, edukacinių ir atsipalaidavimo užduočių. Puiki proga visiems kartu kokybiškai praleisti laiką.',
    features: [
      'Tėvų ir vaikų ryšio stiprinimas',
      'Teigiamas pavyzdys vaikams',
      'Kokybiškai kartu praleistas laikas',
      'Edukacija apie vaiko fizinę raidą tėvams',
      'Gera nuotaika visai savaitei'
    ],
    duration: '90 min.'
  }
];

export const BENEFITS: Benefit[] = [
  {
    title: 'Profesionali komanda',
    description: 'Mūsų treneriai ir kineziterapeutai yra sertifikuoti specialistai, turintys ilgametę patirtį dirbant su vaikais.',
    image: 'https://picsum.photos/id/453/800/600'
  },
  {
    title: 'Individualus dėmesys',
    description: 'Kiekvienas vaikas yra unikalus. Mes pritaikome krūvį ir pratimus pagal vaiko fizinį pasirengimą ir poreikius.',
    image: 'https://picsum.photos/id/336/800/600'
  },
  {
    title: 'Saugi ir moderni aplinka',
    description: 'Mūsų studija įrengta naudojant saugų, modernų inventorių, užtikrinantį geriausią patirtį mažiesiems sportininkams.',
    image: 'https://picsum.photos/id/96/800/600'
  }
];

export const TRAINERS: Trainer[] = [
  {
    name: 'Karolis Brusokas',
    role: 'Treneris',
    bio: 'Elkis taip, kaip norėtum, kad elgtusi su tavimi',
    image: 'https://picsum.photos/id/91/600/800',
    education: 'Aukštasis',
    location: 'Vilniaus Šeškinės pradinė mokykla',
    phone: '+370 620 82727',
    email: 'karolis@skm.lt',
    motto: 'Elkis taip, kaip norėtum, kad elgtusi su tavimi',
    achievements: ''
  },
  {
    name: 'Rolandas Mocevičius',
    role: 'Treneris',
    bio: 'Elkis su kitais taip, kaip norėtum jog su tavimi elgtųsi',
    image: 'https://picsum.photos/id/1005/600/800',
    education: 'Aukštasis',
    location: 'Kunigaikščio Gedimino progimnazija ir Vilniaus Privati Gimnazija',
    phone: '+370 674 83461',
    email: 'Rmocevicius@gmail.com',
    motto: 'Elkis su kitais taip, kaip norėtum jog su tavimi elgtųsi',
    achievements: ''
  },
  {
    name: 'Goda Papartytė',
    role: 'Kineziterapijos specialistė',
    bio: 'Enjoy the butterflies, enjoy being naive, enjoy the nerves',
    image: 'https://picsum.photos/id/342/600/800',
    education: 'Vidurinis. 3 kurso studentė Vilniaus kolegijoje',
    location: 'Gabijos progimnazija',
    phone: '+370 624 54412',
    email: 'papartytegoda@gmail.com',
    motto: 'Enjoy the butterflies, enjoy being naive, enjoy the nerves, the pressure - no regrets, only memories',
    achievements: ''
  },
  {
    name: 'Erika Filipavičiūtė',
    role: 'Kineziterapeutė',
    bio: 'Net mažiausia pastanga veda link didelių rezultatų',
    image: 'https://picsum.photos/id/64/600/800',
    education: 'Vidurinysis. Šiuo metu paskutinis (3 kursas) kineziterapijos',
    location: 'Vyturio pradinė mokykla',
    phone: '+370 602 23575',
    email: 'erikutefil@gmail.com',
    motto: 'Net mažiausia pastanga veda link didelių rezultatų',
    achievements: ''
  },
  {
    name: 'Melita Ribikauskaitė',
    role: 'Kineziterapijos specialistė',
    bio: 'Nėra ribų - yra tik tikslai',
    image: 'https://picsum.photos/id/338/600/800',
    education: 'Vidurinis išsilavinimas. Šiuo metu antro kurso kineziterapijos studentė',
    location: 'Maironio progimnazija',
    phone: '+370 626 69962',
    email: 'melitaribikauskaite@gmail.com',
    motto: 'Nėra ribų - yra tik tikslai',
    achievements: ''
  },
  {
    name: 'Arūnė Anskaitienė',
    role: 'Sporto vadybininkė / Trenerė',
    bio: '2024 m. Lietuvos fizinio ugdymo pedagogų apdovanojimas',
    image: 'https://picsum.photos/id/65/600/800',
    education: 'Kūno kultūros bakalauras, sporto vadybos magistras',
    location: 'Prano Mašioto pradinė mokykla',
    phone: '+370 600 79372',
    email: 'Arunebud10@gmail.com',
    motto: '-',
    achievements: '2024 m. Lietuvos fizinio ugdymo pedagogų apdovanojimas'
  },
  {
    name: 'Ugnė Skipariūtė',
    role: 'Kineziterapeutė',
    bio: 'Kiekviena diena - nauja galimybė tapti geresniu nei buvai vakar',
    image: 'https://picsum.photos/id/331/600/800',
    education: 'VU Kineziterapijos 4 kurso studentė',
    location: 'Jono Basanavičiaus progimnazija',
    phone: '+370 671 23388',
    email: 'ugneskipa@gmail.com',
    motto: 'Kiekviena diena - nauja galimybė tapti geresniu nei buvai vakar',
    achievements: ''
  },
  {
    name: 'Elvita Vilkavickaitė',
    role: 'Kineziterapijos specialistė',
    bio: 'Maži žingsniai veda į didelius stebuklus',
    image: 'https://picsum.photos/id/836/600/800',
    education: 'Kineziterapija II kursas',
    location: 'Vilniaus Prano Mašioto pradinė mokykla',
    phone: '+370 625 09935',
    email: 'elvita.vilkavickaite@gmail.com',
    motto: 'Maži žingsniai veda į didelius stebuklus',
    achievements: ''
  },
  {
    name: 'Vėjūnė Malūnavičiūtė',
    role: 'Kineziterapijos specialistė',
    bio: 'Sveikas kūnas - laimingo žmogaus namai',
    image: 'https://picsum.photos/id/1011/600/800',
    education: 'Kineziterapijos II kursas, Vilniaus Kolegija',
    location: 'J. Basanavičiaus progimnazija, Vyturio pradinė mokykla',
    phone: '+370 659 89149',
    email: 'vejunemal@gmail.com',
    motto: 'Sveikas kūnas - laimingo žmogaus namai',
    achievements: ''
  },
  {
    name: 'Domas Krivelis',
    role: 'Masažo specialistas / Kineziterapeutas',
    bio: 'Turime įsivaizduoti Sizifą laimingą',
    image: 'https://picsum.photos/id/1025/600/800',
    education: 'Tolesnis profesinis mokymas: Sveikatos priežiūros – gydomojo masažo specialistas. Kineziterapijos studijų programos paskutinio kurso studentas',
    location: 'Vilniaus Jeruzalės progimnazija',
    phone: '+370 620 28068',
    email: 'domas.krivelis@sportogalia.lt',
    motto: 'Turime įsivaizduoti Sizifą laimingą',
    achievements: 'Multidisciplininis sportinis pasirengimas: karate, plaukimas, bėgimas, graikų–romėnų imtynės, futbolas, gatvės gimnastika, MMA (mišrieji kovos menai)'
  },
  {
    name: 'Benas Jonkus',
    role: 'Kineziterapeutas',
    bio: 'Disciplina šiandien, laisvė rytoj',
    image: 'https://picsum.photos/id/1074/600/800',
    education: 'Kineziterapijos bakalauras',
    location: 'Fabijoniškių gimnazija',
    phone: '+370 662 33130',
    email: 'benasjonkus@gmail.com',
    motto: 'Disciplina šiandien, laisvė rytoj',
    achievements: 'Esu laimingas darydamas, tai ką darau, o tai be vargo ryte padeda išlipti iš lovos'
  },
  {
    name: 'Aurimas Maščinskas',
    role: 'Kineziterapijos specialistas / Krepšinio treneris',
    bio: 'Klysk, Daryk, Atverk širdį, tobulėk',
    image: 'https://picsum.photos/id/1060/600/800',
    education: '3 kurso kineziterapijos studentas',
    location: 'Antakalnio gimnazija',
    phone: '+370 601 04529',
    email: 'Aurisbasket@gmail.com',
    motto: 'Klysk, Daryk, Atverk širdį, tobulėk',
    achievements: '3 kartus MKL čempionas, EYBL vicečempionas, RKL B vicečempionas, SKM fizinio rengimo treneris'
  }
];

export const STEPS: Step[] = [
  {
    number: 1,
    title: 'Registracija',
    description: 'Užpildykite formą arba mums paskambinkite'
  },
  {
    number: 2,
    title: 'Bandomoji treniruotė',
    description: 'Pirmąjį užsiėmimą išbandykite visiškai nemokamai'
  },
  {
    number: 3,
    title: 'Programos parinkimas',
    description: 'Treneris parenka tinkamiausią planą jūsų vaikui'
  },
  {
    number: 4,
    title: 'Startas',
    description: 'Pradedame sportuoti ir augti kartu!'
  }
];

export const FAQ: FAQItem[] = [
  {
    question: 'Nuo kokio amžiaus vaikai gali lankyti užsiėmimus?',
    answer: 'Bendro fizinio rengimo grupės skirtos vaikams nuo 3 metų, o kineziterapijos užsiėmimai galimi ir jaunesniems vaikams.'
  },
  {
    question: 'Ar galima treniruotę išbandyti nemokamai?',
    answer: 'Taip! Pirmoji treniruotė yra visiškai nemokama – jos metu galėsite susipažinti su mūsų metodika ir vėliau priimti jums tinkamiausią sprendimą.'
  },
  {
    question: 'Ką reikėtų atsinešti į treniruotę?',
    answer: 'Patogią sportinę aprangą, švarius salei skirtus sportinius batelius ir vandens buteliuką.'
  },
  {
    question: 'Kokia yra užsiėmimų trukmė?',
    answer: 'Standartinė treniruotė trunka apie 45-60 min., priklausomai nuo vaiko amžiaus ir pasirinktos programos.'
  },
  {
    question: 'Kur vyksta treniruotės?',
    answer: 'Pilną mokyklų sąrašą rasite paspaudę mygtuką „Registruotis“.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    text: "Nuostabi vieta! Mano sūnus labai noriai eina į treniruotes, o trenerė Gintarė tiesiog stebuklingai moka bendrauti su vaikais.",
    author: "Rasa M.",
    role: "Jono (5 m.) mama"
  },
  {
    text: "Po pusmečio lankymo pastebėjome akivaizdų laikysenos pagerėjimą. Labai rekomenduoju visiems, kas rūpinasi vaikų sveikata.",
    author: "Tomas K.",
    role: "Emilijos (8 m.) tėtis"
  }
];

export const SPONSORS: Sponsor[] = [
  {
    name: "Peilis ir šakutė",
    logo: "/sponsors/peilis_ir_sakute.png"
  },
  {
    name: "Old Rabbit Design Studio",
    logo: "/sponsors/old_rabbit.png"
  },
  {
    name: "Hustle Point",
    logo: "/sponsors/hustle_point.png"
  },
  {
    name: "SKM",
    logo: "/sponsors/skm.png"
  },
  {
    name: "LIRASA",
    logo: "/sponsors/lirasa.jpg"
  },
  {
    name: "MozeTech",
    logo: "/sponsors/mozetech.png"
  },
  {
    name: "LemonGym",
    logo: "/sponsors/logo_lemons-ee_1.png"
  }
];

export const CAMPS: Camp[] = [
  {
    id: "june-week-1",
    month: "Birželis",
    weekLabel: "1 savaitė",
    dateRange: "06.08 – 06.12",
    registerUrl: "https://embed.exoclass.com/lt/embed/provider/cc909582-9556-49fb-ae29-4ded9b2fee2e/group-management/0de61ce8-d1f2-4949-8ac2-e6064f39f50f",
    accent: "primary"
  },
  {
    id: "june-week-2",
    month: "Birželis",
    weekLabel: "2 savaitė",
    dateRange: "06.15 – 06.19",
    registerUrl: "https://embed.exoclass.com/lt/embed/provider/cc909582-9556-49fb-ae29-4ded9b2fee2e/group-management/9bc470d2-b7cb-47a3-8014-3819c50b61aa",
    accent: "secondary"
  },
  {
    id: "july",
    month: "Liepa",
    weekLabel: "Vasaros finišas",
    dateRange: "07.06 – 07.10",
    registerUrl: "https://embed.exoclass.com/lt/embed/provider/cc909582-9556-49fb-ae29-4ded9b2fee2e/group-management/cb8f3e2c-d25f-4304-953e-5c97c49710e3",
    accent: "accent"
  }
];

export const CAMP_DESCRIPTION = "Aktyvus vaikas – stiprus, pasitikintis savimi ir smalsus pasauliui. Ši sporto ir sveikatingumo stovykla skirta vaikams, kuriems svarbu ne tik judėti, bet ir augti per patirtį. Kiekvieną dieną vaikai išbando skirtingas sporto kryptis: futbolą, krepšinį, lauko tenisą, lengvąją atletiką bei HYROX Kids treniruotes.";

export const CAMP_BENEFITS: { title: string; description: string }[] = [
  {
    title: "Komandinis darbas",
    description: "Vaikai mokosi bendradarbiauti, pasitikėti komanda ir siekti bendro tikslo."
  },
  {
    title: "Atsakomybė ir fair-play",
    description: "Ugdomi sąžiningo žaidimo principai, pagarba varžovams ir savo žodžiui."
  },
  {
    title: "Pasitikėjimas savimi",
    description: "Kiekvienas iššūkis – proga atrasti savo jėgą ir didžiuotis savo pastangomis."
  },
  {
    title: "Sveika gyvensena",
    description: "Sveikos mitybos, emocinės savijautos ir aktyvaus laisvalaikio pagrindai."
  }
];

export const CAMP_PROGRAM: CampProgramDay[] = [
  {
    day: 1,
    title: "Susipažinimas ir futbolas",
    slots: [
      { time: "08:30–09:00", activity: "Atvykimas, susipažinimas, grupių formavimas" },
      { time: "09:00–09:30", activity: "Pusryčiai" },
      { time: "09:30–11:00", activity: "Fizinis pasirengimas (apšilimas, ištvermė)" },
      { time: "11:00–11:30", activity: "Pertrauka" },
      { time: "11:30–13:00", activity: "Futbolo treniruotė" },
      { time: "13:00–14:00", activity: "Pietūs" },
      { time: "14:00–15:30", activity: "Edukacija: komandinis darbas ir draugystė" },
      { time: "15:30–16:00", activity: "Pavakariai" },
      { time: "16:00–17:00", activity: "Refleksija" }
    ]
  },
  {
    day: 2,
    title: "Krepšinis",
    slots: [
      { time: "09:00–09:30", activity: "Pusryčiai" },
      { time: "09:30–11:00", activity: "Koordinacija ir greitis" },
      { time: "11:30–13:00", activity: "Krepšinio pagrindai" },
      { time: "13:00–14:00", activity: "Pietūs" },
      { time: "14:00–15:30", activity: "Edukacija: sveikos mitybos pagrindai" },
      { time: "15:30–17:00", activity: "Refleksija" }
    ]
  },
  {
    day: 3,
    title: "Lauko tenisas",
    slots: [
      { time: "09:00–09:30", activity: "Pusryčiai" },
      { time: "09:30–11:00", activity: "Jėga ir lankstumas" },
      { time: "11:00–11:30", activity: "Pertrauka" },
      { time: "11:30–13:00", activity: "Lauko teniso treniruotė: pagrindai, technika, žaidybiniai elementai" },
      { time: "13:00–14:00", activity: "Pietūs" },
      { time: "14:00–15:30", activity: "Edukacija: sporto kultūra ir fair-play" },
      { time: "15:30–16:00", activity: "Pavakariai" },
      { time: "16:00–17:00", activity: "Refleksija" }
    ]
  },
  {
    day: 4,
    title: "Lengvoji atletika ir gamta",
    slots: [
      { time: "09:00–09:30", activity: "Pusryčiai" },
      { time: "09:30–11:00", activity: "Greitis ir koordinacija" },
      { time: "11:30–13:00", activity: "Lengvosios atletikos pagrindai" },
      { time: "13:00–14:00", activity: "Pietūs" },
      { time: "14:00–15:30", activity: "Gamtos edukacija (judėjimas gamtoje, Viršuliškių miško parkas)" },
      { time: "15:30–17:00", activity: "Refleksija" }
    ]
  },
  {
    day: 5,
    title: "HYROX Kids ir uždarymas",
    slots: [
      { time: "09:00–09:30", activity: "Pusryčiai" },
      { time: "09:30–11:00", activity: "HYROX Kids treniruotė (funkciniai iššūkiai)" },
      { time: "11:30–13:00", activity: "Mini turnyras" },
      { time: "13:00–14:00", activity: "Pietūs" },
      { time: "15:30–16:00", activity: "Pavakariai" },
      { time: "16:00–17:00", activity: "Stovyklos uždarymas, pažymėjimai" }
    ]
  }
];