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
import { NavItem, Service, Benefit, Trainer, Step, FAQItem, Testimonial, Sponsor } from './types.ts';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Apie mus', href: '#about' },
  { label: 'Paslaugos', href: '#services' },
  { label: 'Treneriai', href: '#trainers' },
  { label: 'DUK', href: '#faq' },
  { label: 'Kontaktai', href: '#contact-form' },
];

export const SERVICES: Service[] = [
  {
    title: 'Kineziterapija',
    description: 'Laikysenos korekcija, raumenų stiprinimas ir judesių lavinimas vaikams profesionalių kineziterapeutų priežiūroje.',
    icon: Activity,
    fullDescription: 'Užsiėmimai skirti vaikams su laikysenos sutrikimais (skoliozė, kifozė), pėdų deformacijomis ar raumenų disbalansu. Kineziterapeutai naudoja modernias metodikas per žaidimą ir tikslingus pratimus, kad sustiprintų raumenis ir suformuotų taisyklingus judesio įpročius.',
    features: [
      'Individualus kinezaterapinis ištyrimas',
      'Laikysenos korekcija ir stebėjimas',
      'Pėdų skliauto formavimas',
      'Kvėpavimo pratimai',
      'Namų darbų programos sudarymas'
    ],
    duration: '45-60 min.'
  },
  {
    title: 'Individualios Treniruotės',
    description: 'Asmeninis dėmesys ir pritaikyta programa, skirta pasiekti konkrečius vaiko fizinius tikslus.',
    icon: Dumbbell,
    fullDescription: 'Individualios treniruotės skirtos tiems, kurie nori maksimalaus trenerio dėmesio arba turi specifinių tikslų (pvz., pasiruošimas varžyboms, svorio korekcija, atsigavimas po traumos). Programa sudaroma atsižvelgiant į vaiko fiziologiją, amžių ir pomėgius.',
    features: [
      '100% trenerio dėmesys',
      'Lankstus grafikas',
      'Greitesnis progresas',
      'Saugus krūvio dozavimas',
      'Nuolatinė motyvacija ir palaikymas'
    ],
    duration: '60 min.'
  },
  {
    title: 'Grupiniai Užsiėmimai',
    description: 'Smagios ir aktyvios treniruotės bendraamžių būryje, skatinančios socializaciją ir komandinį darbą.',
    icon: Users,
    fullDescription: 'Tai bendro fizinio rengimo treniruotės nedidelėse grupėse (iki 10 vaikų). Čia vaikai ne tik sportuoja, bet ir mokosi bendrauti, laikytis taisyklių, laimėti ir pralaimėti. Užsiėmimai kupini estafetinių žaidimų, kliūčių ruožų ir smagių užduočių.',
    features: [
      'Socializacija su bendraamžiais',
      'Komandinio darbo ugdymas',
      'Koordinacijos ir vikrumo lavinimas',
      'Emocijų valdymas per sportą',
      'Smagi ir dinamiška aplinka'
    ],
    duration: '50 min.'
  },
  {
    title: 'Šeimos Sporto Programos',
    description: 'Aktyvus laisvalaikis visai šeimai – stiprinkite ryšį sportuodami kartu.',
    icon: Heart,
    fullDescription: 'Savaitgalio užsiėmimai, kuriuose dalyvauja vaikai kartu su tėvais. Tai puiki proga parodyti vaikams pavyzdį ir kokybiškai praleisti laiką. Programoje – poriniai pratimai, šeimų estafetės ir atsipalaidavimo technikos.',
    features: [
      'Ryšio stiprinimas tarp tėvų ir vaikų',
      'Teigiamas pavyzdys vaikams',
      'Bendras aktyvus laisvalaikis',
      'Tėvų edukacija apie vaiko fizinę raidą',
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
    description: 'Užpildykite formą arba paskambinkite mums.'
  },
  {
    number: 2,
    title: 'Bandomoji treniruotė',
    description: 'Išbandykite mus nemokamai ir susipažinkite.'
  },
  {
    number: 3,
    title: 'Programos parinkimas',
    description: 'Treneris parinks geriausią planą jūsų vaikui.'
  },
  {
    number: 4,
    title: 'Startas',
    description: 'Pradedame sportuoti ir augti kartu!'
  }
];

export const FAQ: FAQItem[] = [
  {
    question: 'Nuo kokio amžiaus priimami vaikai?',
    answer: 'Priimame vaikus nuo 3 metų amžiaus į bendro fizinio rengimo grupes, o kineziterapijos užsiėmimai galimi ir jaunesniems pagal poreikį.'
  },
  {
    question: 'Ar galima išbandyti nemokamai?',
    answer: 'Taip! Pirmoji bandomoji treniruotė yra visiškai nemokama, kad galėtumėte įvertinti ar jums tinka mūsų metodika.'
  },
  {
    question: 'Ką reikia turėti treniruotei?',
    answer: 'Patogią sportinę aprangą, sportinius batelius (švarius, skirtus salei) ir buteliuką vandens.'
  },
  {
    question: 'Kas yra kineziterapija?',
    answer: 'Tai gydymas judesiu – specialūs pratimai, padedantys atstatyti ar pagerinti kaulų ir raumenų sistemos būklę, koreguoti laikyseną.'
  },
  {
    question: 'Kiek trunka užsiėmimai?',
    answer: 'Standartinė treniruotė trunka 45–60 minučių, priklausomai nuo vaiko amžiaus ir pasirinktos programos.'
  },
  {
    question: 'Kur vyksta treniruotės?',
    answer: 'Laukiame jūsų mūsų studijoje Vilniuje. Tikslų adresą rasite kontaktų skiltyje.'
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
    name: "Vilniaus Savivaldybė",
    logo: "https://placehold.co/200x80/f5f3ef/1a3c30?text=VILNIAUS+MIESTAS"
  },
  {
    name: "Sportland",
    logo: "https://placehold.co/200x80/f5f3ef/1a3c30?text=SPORTLAND"
  },
  {
    name: "Audimas",
    logo: "https://placehold.co/200x80/f5f3ef/1a3c30?text=AUDIMAS"
  },
  {
    name: "Sveikas Miestas",
    logo: "https://placehold.co/200x80/f5f3ef/1a3c30?text=SVEIKAS+MIESTAS"
  },
  {
    name: "Nike",
    logo: "https://placehold.co/200x80/f5f3ef/1a3c30?text=NIKE"
  }
];