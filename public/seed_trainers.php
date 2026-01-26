<?php
// public/seed_trainers.php
require_once 'api/db.php';

echo "<h1>Seeding Trainers...</h1>";

$trainers = [
    [
        'name' => 'Karolis Brusokas',
        'role' => 'Treneris',
        'bio' => 'Elkis taip, kaip norėtum, kad elgtusi su tavimi',
        'image' => 'https://picsum.photos/id/91/600/800',
        'education' => 'Aukštasis',
        'location' => 'Vilniaus Šeškinės pradinė mokykla',
        'phone' => '+370 620 82727',
        'email' => 'karolis@skm.lt',
        'motto' => 'Elkis taip, kaip norėtum, kad elgtusi su tavimi',
        'achievements' => ''
    ],
    [
        'name' => 'Rolandas Mocevičius',
        'role' => 'Treneris',
        'bio' => 'Elkis su kitais taip, kaip norėtum jog su tavimi elgtųsi',
        'image' => 'https://picsum.photos/id/1005/600/800',
        'education' => 'Aukštasis',
        'location' => 'Kunigaikščio Gedimino progimnazija ir Vilniaus Privati Gimnazija',
        'phone' => '+370 674 83461',
        'email' => 'Rmocevicius@gmail.com',
        'motto' => 'Elkis su kitais taip, kaip norėtum jog su tavimi elgtųsi',
        'achievements' => ''
    ],
    [
        'name' => 'Goda Papartytė',
        'role' => 'Kineziterapijos specialistė',
        'bio' => 'Enjoy the butterflies, enjoy being naive, enjoy the nerves',
        'image' => 'https://picsum.photos/id/342/600/800',
        'education' => 'Vidurinis. 3 kurso studentė Vilniaus kolegijoje',
        'location' => 'Gabijos progimnazija',
        'phone' => '+370 624 54412',
        'email' => 'papartytegoda@gmail.com',
        'motto' => 'Enjoy the butterflies, enjoy being naive, enjoy the nerves, the pressure - no regrets, only memories',
        'achievements' => ''
    ],
    [
        'name' => 'Erika Filipavičiūtė',
        'role' => 'Kineziterapeutė',
        'bio' => 'Net mažiausia pastanga veda link didelių rezultatų',
        'image' => 'https://picsum.photos/id/64/600/800',
        'education' => 'Vidurinysis. Šiuo metu paskutinis (3 kursas) kineziterapijos',
        'location' => 'Vyturio pradinė mokykla',
        'phone' => '+370 602 23575',
        'email' => 'erikutefil@gmail.com',
        'motto' => 'Net mažiausia pastanga veda link didelių rezultatų',
        'achievements' => ''
    ],
    [
        'name' => 'Melita Ribikauskaitė',
        'role' => 'Kineziterapijos specialistė',
        'bio' => 'Nėra ribų - yra tik tikslai',
        'image' => 'https://picsum.photos/id/338/600/800',
        'education' => 'Vidurinis išsilavinimas. Šiuo metu antro kurso kineziterapijos studentė',
        'location' => 'Maironio progimnazija',
        'phone' => '+370 626 69962',
        'email' => 'melitaribikauskaite@gmail.com',
        'motto' => 'Nėra ribų - yra tik tikslai',
        'achievements' => ''
    ],
    [
        'name' => 'Arūnė Anskaitienė',
        'role' => 'Sporto vadybininkė / Trenerė',
        'bio' => '2024 m. Lietuvos fizinio ugdymo pedagogų apdovanojimas',
        'image' => 'https://picsum.photos/id/65/600/800',
        'education' => 'Kūno kultūros bakalauras, sporto vadybos magistras',
        'location' => 'Prano Mašioto pradinė mokykla',
        'phone' => '+370 600 79372',
        'email' => 'Arunebud10@gmail.com',
        'motto' => '-',
        'achievements' => '2024 m. Lietuvos fizinio ugdymo pedagogų apdovanojimas'
    ],
    [
        'name' => 'Ugnė Skipariūtė',
        'role' => 'Kineziterapeutė',
        'bio' => 'Kiekviena diena - nauja galimybė tapti geresniu nei buvai vakar',
        'image' => 'https://picsum.photos/id/331/600/800',
        'education' => 'VU Kineziterapijos 4 kurso studentė',
        'location' => 'Jono Basanavičiaus progimnazija',
        'phone' => '+370 671 23388',
        'email' => 'ugneskipa@gmail.com',
        'motto' => 'Kiekviena diena - nauja galimybė tapti geresniu nei buvai vakar',
        'achievements' => ''
    ],
    [
        'name' => 'Elvita Vilkavickaitė',
        'role' => 'Kineziterapijos specialistė',
        'bio' => 'Maži žingsniai veda į didelius stebuklus',
        'image' => 'https://picsum.photos/id/836/600/800',
        'education' => 'Kineziterapija II kursas',
        'location' => 'Vilniaus Prano Mašioto pradinė mokykla',
        'phone' => '+370 625 09935',
        'email' => 'elvita.vilkavickaite@gmail.com',
        'motto' => 'Maži žingsniai veda į didelius stebuklus',
        'achievements' => ''
    ],
    [
        'name' => 'Vėjūnė Malūnavičiūtė',
        'role' => 'Kineziterapijos specialistė',
        'bio' => 'Sveikas kūnas - laimingo žmogaus namai',
        'image' => 'https://picsum.photos/id/1011/600/800',
        'education' => 'Kineziterapijos II kursas, Vilniaus Kolegija',
        'location' => 'J. Basanavičiaus progimnazija, Vyturio pradinė mokykla',
        'phone' => '+370 659 89149',
        'email' => 'vejunemal@gmail.com',
        'motto' => 'Sveikas kūnas - laimingo žmogaus namai',
        'achievements' => ''
    ],
    [
        'name' => 'Domas Krivelis',
        'role' => 'Masažo specialistas / Kineziterapeutas',
        'bio' => 'Turime įsivaizduoti Sizifą laimingą',
        'image' => 'https://picsum.photos/id/1025/600/800',
        'education' => 'Tolesnis profesinis mokymas: Sveikatos priežiūros – gydomojo masažo specialistas. Kineziterapijos studijų programos paskutinio kurso studentas',
        'location' => 'Vilniaus Jeruzalės progimnazija',
        'phone' => '+370 620 28068',
        'email' => 'domas.krivelis@sportogalia.lt',
        'motto' => 'Turime įsivaizduoti Sizifą laimingą',
        'achievements' => 'Multidisciplininis sportinis pasirengimas: karate, plaukimas, bėgimas, graikų–romėnų imtynės, futbolas, gatvės gimnastika, MMA (mišrieji kovos menai)'
    ],
    [
        'name' => 'Benas Jonkus',
        'role' => 'Kineziterapeutas',
        'bio' => 'Disciplina šiandien, laisvė rytoj',
        'image' => 'https://picsum.photos/id/1074/600/800',
        'education' => 'Kineziterapijos bakalauras',
        'location' => 'Fabijoniškių gimnazija',
        'phone' => '+370 662 33130',
        'email' => 'benasjonkus@gmail.com',
        'motto' => 'Disciplina šiandien, laisvė rytoj',
        'achievements' => 'Esu laimingas darydamas, tai ką darau, o tai be vargo ryte padeda išlipti iš lovos'
    ],
    [
        'name' => 'Aurimas Maščinskas',
        'role' => 'Kineziterapijos specialistas / Krepšinio treneris',
        'bio' => 'Klysk, Daryk, Atverk širdį, tobulėk',
        'image' => 'https://picsum.photos/id/1060/600/800',
        'education' => '3 kurso kineziterapijos studentas',
        'location' => 'Antakalnio gimnazija',
        'phone' => '+370 601 04529',
        'email' => 'Aurisbasket@gmail.com',
        'motto' => 'Klysk, Daryk, Atverk širdį, tobulėk',
        'achievements' => '3 kartus MKL čempionas, EYBL vicečempionas, RKL B vicečempionas, SKM fizinio rengimo treneris'
    ]
];

try {
    $stmt = $pdo->prepare("INSERT INTO trainers (name, specialization, description, image_url, education, location, phone, email, motto, achievements, order_index) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    $count = 0;
    foreach ($trainers as $index => $t) {
        // Check if exists
        $check = $pdo->prepare("SELECT id FROM trainers WHERE name = ?");
        $check->execute([$t['name']]);
        
        if (!$check->fetch()) {
            $stmt->execute([
                $t['name'],
                $t['role'],
                $t['bio'],
                $t['image'],
                $t['education'],
                $t['location'],
                $t['phone'],
                $t['email'],
                $t['motto'],
                $t['achievements'],
                $index
            ]);
            echo "<p style='color:green'>Added: " . $t['name'] . "</p>";
            $count++;
        } else {
             echo "<p style='color:orange'>Skipped (Exists): " . $t['name'] . "</p>";
        }
    }
    
    echo "<h3>Done! Added $count trainers.</h3>";
    echo "<p><a href='/admin'>Go to Admin</a></p>";
    echo "<p style='color:red'><strong>IMPORTANT: Please delete 'seed_trainers.php' from your server!</strong></p>";

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
