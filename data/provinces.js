// Data budaya 38 provinsi Indonesia.
// "nama" harus sama persis dengan nama provinsi di data/map-paths.js.
// Kolom yang tidak diketahui boleh dikosongkan (null) — tidak akan ditampilkan.
// Tradisi ditulis sebagai [nama, penjelasan singkat].

window.PROVINCES = [
  // ===================== SUMATERA =====================
  {
    nama: "Aceh", ibukota: "Banda Aceh", wilayah: "Sumatera",
    julukan: "Serambi Mekkah",
    deskripsi: "Aceh ada di ujung paling barat Indonesia. Di sini ada kota Sabang, tempat titik Nol Kilometer Indonesia. Masyarakat Aceh terkenal taat beragama dan punya tarian yang sangat kompak.",
    rumah: "Rumoh Aceh (Krong Bade)",
    pakaian: "Ulee Balang",
    tarian: ["Tari Saman", "Tari Seudati", "Tari Ratoh Jaroe"],
    musik: ["Serune Kalee", "Rapai"],
    lagu: ["Bungong Jeumpa"],
    makanan: ["Mie Aceh", "Kuah Pliek U", "Timphan"],
    senjata: "Rencong",
    tradisi: [
      ["Peusijuek", "Upacara tepung tawar sebagai tanda syukur dan doa keselamatan."],
      ["Meugang", "Makan daging bersama keluarga menjelang bulan Ramadan."]
    ],
    tempat: ["Masjid Raya Baiturrahman", "Tugu Nol Kilometer di Pulau Weh (Sabang)", "Museum Tsunami Aceh"],
    hewan: "Gajah sumatera dan orangutan di Taman Nasional Gunung Leuser",
    fakta: "Tari Saman dimainkan banyak penari yang duduk berbaris dan bergerak sangat cepat tanpa alat musik. UNESCO mengakuinya sebagai warisan budaya dunia!"
  },
  {
    nama: "Sumatera Utara", ibukota: "Medan", wilayah: "Sumatera",
    julukan: null,
    deskripsi: "Sumatera Utara adalah rumah bagi suku Batak, Melayu, dan Nias. Di sini ada Danau Toba, danau vulkanik terbesar di dunia, dengan Pulau Samosir di tengahnya.",
    rumah: "Rumah Bolon",
    pakaian: "Ulos (kain tenun Batak)",
    tarian: ["Tari Tor-Tor", "Tari Piso Surit", "Tari Serampang Dua Belas"],
    musik: ["Gondang", "Taganing", "Sarune"],
    lagu: ["Butet", "Sing Sing So", "Anju Ahu"],
    makanan: ["Arsik Ikan Mas", "Bika Ambon", "Mie Gomak"],
    senjata: "Piso Gaja Dompak",
    tradisi: [
      ["Lompat Batu (Fahombo)", "Pemuda Nias melompati tumpukan batu setinggi 2 meter sebagai tanda kedewasaan."],
      ["Mangulosi", "Memberikan kain ulos sebagai tanda kasih sayang dan doa restu."]
    ],
    tempat: ["Danau Toba", "Pulau Samosir", "Istana Maimun"],
    hewan: "Orangutan tapanuli, kera besar paling langka di dunia",
    fakta: "Gambar lompat batu Nias pernah ada di uang kertas Rp1.000!"
  },
  {
    nama: "Sumatera Barat", ibukota: "Padang", wilayah: "Sumatera",
    julukan: "Ranah Minang",
    deskripsi: "Sumatera Barat adalah tanah suku Minangkabau. Atap rumah adatnya runcing seperti tanduk kerbau. Orang Minang terkenal suka merantau dan pandai memasak.",
    rumah: "Rumah Gadang",
    pakaian: "Bundo Kanduang",
    tarian: ["Tari Piring", "Tari Payung", "Randai"],
    musik: ["Saluang", "Talempong"],
    lagu: ["Ayam Den Lapeh", "Kampuang Nan Jauh di Mato"],
    makanan: ["Rendang", "Sate Padang", "Kerupuk Sanjai"],
    senjata: "Karih (keris Minang)",
    tradisi: [
      ["Tabuik", "Arak-arakan menara hias yang tinggi di Pariaman lalu dilarung ke laut."],
      ["Pacu Jawi", "Balapan sapi di sawah berlumpur setelah panen."],
      ["Makan Bajamba", "Makan bersama-sama dari satu wadah besar sambil duduk bersila."]
    ],
    tempat: ["Jam Gadang (Bukittinggi)", "Ngarai Sianok", "Danau Maninjau"],
    hewan: null,
    fakta: "Rendang dari Sumatera Barat pernah dinobatkan sebagai salah satu makanan terlezat di dunia!"
  },
  {
    nama: "Riau", ibukota: "Pekanbaru", wilayah: "Sumatera",
    julukan: "Bumi Lancang Kuning",
    deskripsi: "Riau adalah pusat budaya Melayu. Wilayahnya punya banyak sungai besar, hutan, dan kebun kelapa sawit. Riau juga kaya minyak bumi.",
    rumah: "Rumah Selaso Jatuh Kembar",
    pakaian: "Baju Kurung dan Teluk Belanga",
    tarian: ["Tari Zapin", "Tari Persembahan"],
    musik: ["Gambus", "Kompang"],
    lagu: ["Lancang Kuning", "Soleram"],
    makanan: ["Gulai Ikan Patin", "Bolu Kemojo", "Mie Sagu"],
    senjata: "Pedang Jenawi",
    tradisi: [
      ["Pacu Jalur", "Lomba perahu panjang berisi puluhan pendayung di Sungai Kuantan. Di ujung perahu ada anak kecil yang menari!"],
      ["Bakar Tongkang", "Membakar replika kapal di Bagansiapiapi untuk mengenang leluhur."]
    ],
    tempat: ["Istana Siak Sri Indrapura", "Candi Muara Takus", "Gelombang Bono di Sungai Kampar"],
    hewan: "Harimau sumatera dan gajah di Taman Nasional Tesso Nilo",
    fakta: "Di Sungai Kampar ada ombak sungai yang disebut Bono. Ombaknya bisa dipakai untuk berselancar!"
  },
  {
    nama: "Jambi", ibukota: "Jambi", wilayah: "Sumatera",
    julukan: "Bumi Sepucuk Jambi Sembilan Lurah",
    deskripsi: "Jambi dilalui Sungai Batanghari, sungai terpanjang di Pulau Sumatera. Di Jambi juga tinggal Suku Anak Dalam yang hidup dekat dengan hutan.",
    rumah: "Rumah Panggung Kajang Leko",
    pakaian: "Baju Kurung Tanggung",
    tarian: ["Tari Sekapur Sirih", "Tari Selampit Delapan"],
    musik: ["Kelintang Kayu"],
    lagu: ["Batanghari", "Injit-Injit Semut"],
    makanan: ["Tempoyak (durian fermentasi)", "Gulai Ikan Patin", "Kue Padamaran"],
    senjata: "Keris Siginjai",
    tradisi: [
      ["Kenduri Sko", "Pesta adat di Kerinci untuk mensyukuri panen dan membersihkan benda pusaka."]
    ],
    tempat: ["Candi Muaro Jambi", "Gunung Kerinci", "Danau Kerinci"],
    hewan: "Harimau sumatera di Taman Nasional Kerinci Seblat",
    fakta: "Gunung Kerinci adalah gunung api tertinggi di Indonesia, tingginya sekitar 3.805 meter!"
  },
  {
    nama: "Sumatera Selatan", ibukota: "Palembang", wilayah: "Sumatera",
    julukan: "Bumi Sriwijaya",
    deskripsi: "Dahulu di sini berdiri Kerajaan Sriwijaya, kerajaan maritim yang sangat besar. Kota Palembang dibelah Sungai Musi yang lebar dan dihubungkan oleh Jembatan Ampera.",
    rumah: "Rumah Limas",
    pakaian: "Aesan Gede",
    tarian: ["Tari Gending Sriwijaya", "Tari Tanggai"],
    musik: ["Gambus", "Gendang Melayu"],
    lagu: ["Cuk Mak Ilang", "Dek Sangke", "Gending Sriwijaya"],
    makanan: ["Pempek", "Tekwan", "Pindang Patin"],
    senjata: "Tombak Trisula",
    tradisi: [
      ["Lomba Bidar", "Lomba perahu panjang di Sungai Musi, biasanya saat perayaan kemerdekaan."]
    ],
    tempat: ["Jembatan Ampera", "Pulau Kemaro", "Bukit Siguntang"],
    hewan: null,
    fakta: "Kain Songket Palembang ditenun dengan benang emas, jadi tampak berkilau!"
  },
  {
    nama: "Bengkulu", ibukota: "Bengkulu", wilayah: "Sumatera",
    julukan: "Bumi Rafflesia",
    deskripsi: "Bengkulu terletak di pantai barat Sumatera menghadap Samudra Hindia. Ibu Fatmawati, penjahit Bendera Pusaka Merah Putih, berasal dari Bengkulu.",
    rumah: "Rumah Bubungan Lima",
    pakaian: "Pakaian adat Melayu Bengkulu",
    tarian: ["Tari Andun", "Tari Bidadari Teminang Anak"],
    musik: ["Dol (gendang besar)"],
    lagu: ["Lalan Belek"],
    makanan: ["Pendap", "Lemea", "Bagar Hiu"],
    senjata: "Rudus",
    tradisi: [
      ["Tabot", "Festival tahunan dengan menara hias Tabot dan tabuhan alat musik Dol."]
    ],
    tempat: ["Benteng Marlborough", "Rumah Pengasingan Bung Karno", "Rumah Ibu Fatmawati"],
    hewan: "Bunga Rafflesia arnoldii, bunga terbesar di dunia",
    fakta: "Bunga Rafflesia bisa selebar 1 meter dan tidak punya daun maupun batang!"
  },
  {
    nama: "Lampung", ibukota: "Bandar Lampung", wilayah: "Sumatera",
    julukan: "Sai Bumi Ruwa Jurai",
    deskripsi: "Lampung adalah pintu gerbang Pulau Sumatera dari Pulau Jawa lewat Selat Sunda. Lampung terkenal dengan kopi, keripik pisang, dan mahkota emas bernama Siger.",
    rumah: "Nuwo Sesat",
    pakaian: "Pakaian adat Tulang Bawang dengan mahkota Siger",
    tarian: ["Tari Sigeh Pengunten", "Tari Bedana", "Tari Melinting"],
    musik: ["Gamolan (Cetik)"],
    lagu: ["Tanoh Lado", "Cangget Agung"],
    makanan: ["Seruit", "Keripik Pisang", "Gulai Taboh"],
    senjata: "Terapang",
    tradisi: [
      ["Begawi", "Upacara adat besar untuk memberi gelar adat kepada seseorang."]
    ],
    tempat: ["Taman Nasional Way Kambas", "Gunung Anak Krakatau", "Menara Siger"],
    hewan: "Gajah sumatera dan badak sumatera di Way Kambas",
    fakta: "Kain Tapis Lampung dihias sulaman benang emas atau perak berbentuk kapal dan hewan."
  },
  {
    nama: "Kepulauan Bangka Belitung", ibukota: "Pangkalpinang", wilayah: "Sumatera",
    julukan: "Negeri Serumpun Sebalai",
    deskripsi: "Provinsi ini terdiri dari dua pulau besar, Bangka dan Belitung, serta ratusan pulau kecil. Daerah ini terkenal dengan tambang timah dan pantai berbatu granit raksasa.",
    rumah: "Rumah Rakit",
    pakaian: "Paksian",
    tarian: ["Tari Campak", "Tari Sepen"],
    musik: ["Dambus"],
    lagu: ["Yo Miak"],
    makanan: ["Mie Bangka", "Lempah Kuning", "Otak-Otak"],
    senjata: null,
    tradisi: [
      ["Perang Ketupat", "Saling melempar ketupat sebagai tanda syukur dan menolak bala."],
      ["Nganggung", "Membawa dulang berisi makanan ke masjid untuk dimakan bersama."]
    ],
    tempat: ["Pantai Tanjung Tinggi", "Danau Kaolin", "Pulau Lengkuas"],
    hewan: null,
    fakta: "Film dan novel terkenal 'Laskar Pelangi' bercerita tentang anak-anak sekolah di Belitung."
  },
  {
    nama: "Kepulauan Riau", ibukota: "Tanjungpinang", wilayah: "Sumatera",
    julukan: "Bumi Segantang Lada",
    deskripsi: "Kepulauan Riau terdiri dari sekitar 2.000 pulau dan berbatasan dengan Singapura serta Malaysia. Bahasa Indonesia berasal dari bahasa Melayu Riau.",
    rumah: "Rumah Belah Bubung",
    pakaian: "Kebaya Labuh dan Teluk Belanga",
    tarian: ["Tari Zapin", "Mak Yong", "Joget Dangkong"],
    musik: ["Gendang Panjang", "Gambus"],
    lagu: ["Segantang Lada", "Pak Ngah Balek"],
    makanan: ["Gonggong", "Otak-Otak", "Mie Lendir"],
    senjata: "Badik",
    tradisi: [
      ["Mak Yong", "Teater tradisional Melayu yang memadukan tari, nyanyian, dan cerita."]
    ],
    tempat: ["Pulau Penyengat", "Jembatan Barelang (Batam)", "Kepulauan Natuna"],
    hewan: null,
    fakta: "Raja Ali Haji dari Pulau Penyengat menulis 'Gurindam Dua Belas' dan diangkat menjadi Pahlawan Nasional."
  },

  // ===================== JAWA =====================
  {
    nama: "DKI Jakarta", ibukota: "Jakarta", wilayah: "Jawa",
    julukan: "Kota Metropolitan",
    deskripsi: "Jakarta adalah kota terbesar di Indonesia dan sudah lama menjadi pusat pemerintahan. Penduduk aslinya adalah suku Betawi. Ibu kota negara akan pindah ke Ibu Kota Nusantara (IKN) di Kalimantan Timur.",
    rumah: "Rumah Kebaya (Betawi)",
    pakaian: "Sadariah (pria) dan Kebaya Encim (wanita)",
    tarian: ["Tari Yapong", "Tari Topeng Betawi", "Tari Cokek"],
    musik: ["Tanjidor", "Gambang Kromong", "Rebana"],
    lagu: ["Kicir-Kicir", "Jali-Jali", "Ondel-Ondel"],
    makanan: ["Kerak Telor", "Soto Betawi", "Asinan Betawi"],
    senjata: "Golok",
    tradisi: [
      ["Palang Pintu", "Saat pernikahan, rombongan pengantin pria harus berbalas pantun dan beradu silat dulu sebelum boleh masuk."],
      ["Ondel-Ondel", "Boneka raksasa yang diarak keliling kampung, dulu dipercaya sebagai penolak bala."]
    ],
    tempat: ["Monumen Nasional (Monas)", "Kota Tua", "Taman Mini Indonesia Indah", "Masjid Istiqlal"],
    hewan: null,
    fakta: "Puncak Monas dilapisi emas! Dari atas Monas kita bisa melihat seluruh kota Jakarta."
  },
  {
    nama: "Jawa Barat", ibukota: "Bandung", wilayah: "Jawa",
    julukan: "Tanah Pasundan",
    deskripsi: "Jawa Barat adalah tanah suku Sunda dan provinsi dengan penduduk terbanyak di Indonesia. Alamnya bergunung-gunung, sejuk, dan banyak kebun teh.",
    rumah: "Rumah Julang Ngapak dan Jolopong",
    pakaian: "Kebaya Sunda dan Beskap",
    tarian: ["Tari Jaipong", "Tari Merak", "Tari Topeng Cirebon"],
    musik: ["Angklung", "Kecapi Suling", "Calung"],
    lagu: ["Manuk Dadali", "Bubuy Bulan", "Es Lilin"],
    makanan: ["Nasi Timbel", "Karedok", "Surabi", "Batagor"],
    senjata: "Kujang",
    tradisi: [
      ["Seren Taun", "Upacara syukuran panen padi yang meriah."],
      ["Wayang Golek", "Pertunjukan boneka kayu yang dimainkan seorang dalang."],
      ["Sisingaan", "Anak-anak dinaikkan ke boneka singa yang diusung dan diarak keliling kampung."]
    ],
    tempat: ["Gunung Tangkuban Parahu", "Kawah Putih", "Gedung Sate"],
    hewan: "Macan tutul jawa",
    fakta: "Angklung dari bambu diakui UNESCO sebagai warisan budaya dunia sejak 2010."
  },
  {
    nama: "Jawa Tengah", ibukota: "Semarang", wilayah: "Jawa",
    julukan: null,
    deskripsi: "Jawa Tengah adalah pusat budaya Jawa. Di sini berdiri Candi Borobudur, candi Buddha terbesar di dunia. Batik dan wayang kulit juga berkembang pesat di sini.",
    rumah: "Rumah Joglo",
    pakaian: "Jawi Jangkep (pria) dan Kebaya (wanita)",
    tarian: ["Tari Gambyong", "Tari Serimpi", "Tari Bedhaya"],
    musik: ["Gamelan"],
    lagu: ["Gundul Pacul", "Lir-Ilir", "Gambang Suling"],
    makanan: ["Lumpia Semarang", "Soto Kudus", "Garang Asem", "Nasi Gandul"],
    senjata: "Keris",
    tradisi: [
      ["Dugderan", "Pasar malam dan arak-arakan di Semarang untuk menyambut bulan Ramadan, lengkap dengan maskot Warak Ngendog."],
      ["Wayang Kulit", "Pertunjukan bayangan boneka kulit, diakui UNESCO sebagai warisan dunia."],
      ["Membatik", "Melukis kain dengan malam (lilin) memakai canting."]
    ],
    tempat: ["Candi Borobudur", "Dataran Tinggi Dieng", "Lawang Sewu", "Karimunjawa"],
    hewan: null,
    fakta: "Candi Borobudur punya 504 arca Buddha dan lebih dari 2.600 panel relief!"
  },
  {
    nama: "Daerah Istimewa Yogyakarta", ibukota: "Yogyakarta", wilayah: "Jawa",
    julukan: "Kota Pelajar",
    deskripsi: "Yogyakarta disebut 'istimewa' karena dipimpin oleh Sultan dari Keraton Yogyakarta. Banyak pelajar dari seluruh Indonesia datang ke sini untuk bersekolah dan kuliah.",
    rumah: "Bangsal Kencono dan Rumah Joglo",
    pakaian: "Surjan dan Kebaya",
    tarian: ["Tari Serimpi", "Tari Golek Menak", "Tari Bedhaya"],
    musik: ["Gamelan"],
    lagu: ["Suwe Ora Jamu", "Pitik Tukung"],
    makanan: ["Gudeg", "Bakpia", "Geplak"],
    senjata: "Keris",
    tradisi: [
      ["Sekaten", "Perayaan Maulid Nabi dengan pasar malam dan gamelan pusaka keraton."],
      ["Grebeg", "Gunungan berisi hasil bumi diarak dari keraton lalu diperebutkan warga."]
    ],
    tempat: ["Keraton Yogyakarta", "Jalan Malioboro", "Candi Prambanan", "Tugu Yogyakarta"],
    hewan: null,
    fakta: "Yogyakarta pernah menjadi ibu kota Indonesia pada tahun 1946–1949!"
  },
  {
    nama: "Jawa Timur", ibukota: "Surabaya", wilayah: "Jawa",
    julukan: null,
    deskripsi: "Jawa Timur adalah tanah suku Jawa, Madura, Osing, dan Tengger. Surabaya dijuluki Kota Pahlawan karena pertempuran 10 November 1945.",
    rumah: "Rumah Joglo Situbondo",
    pakaian: "Pesa'an (Madura)",
    tarian: ["Reog Ponorogo", "Tari Remo", "Tari Gandrung"],
    musik: ["Bonang", "Saronen"],
    lagu: ["Rek Ayo Rek", "Tanduk Majeng", "Cublak-Cublak Suweng"],
    makanan: ["Rawon", "Rujak Cingur", "Lontong Balap", "Sate Madura"],
    senjata: "Celurit",
    tradisi: [
      ["Karapan Sapi", "Lomba balap sapi di Pulau Madura."],
      ["Yadnya Kasada", "Suku Tengger mempersembahkan hasil bumi ke kawah Gunung Bromo."]
    ],
    tempat: ["Gunung Bromo", "Kawah Ijen", "Gunung Semeru", "Tugu Pahlawan"],
    hewan: null,
    fakta: "Di Kawah Ijen ada api biru yang menyala di malam hari. Fenomena ini sangat langka di dunia!"
  },
  {
    nama: "Banten", ibukota: "Serang", wilayah: "Jawa",
    julukan: "Tanah Jawara",
    deskripsi: "Banten ada di ujung barat Pulau Jawa. Dahulu ada Kesultanan Banten yang menjadi pelabuhan lada terkenal. Sekolah kita, SDN Jatake Pagedangan, berada di Kabupaten Tangerang, Banten!",
    rumah: "Rumah Sulah Nyanda (Suku Baduy)",
    pakaian: "Pangsi",
    tarian: ["Rampak Bedug", "Tari Cokek"],
    musik: ["Bedug", "Angklung Buhun"],
    lagu: ["Dayung Sampan", "Jereh Jaro"],
    makanan: ["Sate Bandeng", "Rabeg", "Emping Melinjo"],
    senjata: "Golok Ciomas",
    tradisi: [
      ["Seba Baduy", "Suku Baduy berjalan kaki berhari-hari membawa hasil bumi untuk pemimpin daerah."],
      ["Debus", "Pertunjukan bela diri yang menunjukkan kekuatan dan keberanian."]
    ],
    tempat: ["Taman Nasional Ujung Kulon", "Masjid Agung Banten", "Pantai Anyer"],
    hewan: "Badak jawa bercula satu di Ujung Kulon",
    fakta: "Badak jawa adalah salah satu hewan paling langka di dunia, dan rumah terakhirnya ada di Ujung Kulon, Banten."
  },

  // ===================== BALI & NUSA TENGGARA =====================
  {
    nama: "Bali", ibukota: "Denpasar", wilayah: "Bali & Nusa Tenggara",
    julukan: "Pulau Dewata",
    deskripsi: "Bali terkenal di seluruh dunia karena budaya, pura, dan pantainya. Sebagian besar warganya beragama Hindu dan setiap hari membuat sesajen kecil bernama canang.",
    rumah: "Rumah Gapura Candi Bentar",
    pakaian: "Payas Agung, Udeng, dan Kamen",
    tarian: ["Tari Kecak", "Tari Pendet", "Tari Legong", "Tari Barong"],
    musik: ["Gamelan Bali", "Rindik", "Jegog"],
    lagu: ["Mejangeran", "Meong-Meong", "Ratu Anom"],
    makanan: ["Ayam Betutu", "Sate Lilit", "Lawar"],
    senjata: "Keris",
    tradisi: [
      ["Nyepi", "Hari raya ketika seluruh Bali hening: tidak ada lampu, kendaraan, maupun keramaian."],
      ["Subak", "Sistem pengairan sawah bersama yang diakui UNESCO."],
      ["Mekare-kare", "Perang pandan berduri di Desa Tenganan sebagai persembahan."]
    ],
    tempat: ["Pura Tanah Lot", "Pura Besakih", "Sawah Terasering Tegallalang"],
    hewan: "Jalak bali, burung putih yang sangat langka",
    fakta: "Sehari sebelum Nyepi, warga mengarak boneka raksasa bernama Ogoh-Ogoh!"
  },
  {
    nama: "Nusa Tenggara Barat", ibukota: "Mataram", wilayah: "Bali & Nusa Tenggara",
    julukan: "Bumi Gora",
    deskripsi: "NTB terdiri dari dua pulau besar, Lombok dan Sumbawa. Lombok adalah tanah suku Sasak, sedangkan Sumbawa adalah tanah suku Samawa dan Mbojo (Bima).",
    rumah: "Bale Lumbung (Sasak) dan Dalam Loka (Sumbawa)",
    pakaian: "Lambung (wanita Sasak) dan Pegon (pria)",
    tarian: ["Tari Gandrung Lombok", "Tari Mpaa Lenggogo"],
    musik: ["Gendang Beleq", "Serunai"],
    lagu: ["Pai Mura Rame"],
    makanan: ["Ayam Taliwang", "Plecing Kangkung", "Sate Rembiga"],
    senjata: "Sampari",
    tradisi: [
      ["Bau Nyale", "Warga beramai-ramai menangkap cacing laut warna-warni di pantai, berkaitan dengan legenda Putri Mandalika."],
      ["Peresean", "Adu ketangkasan dua pemuda memakai tongkat rotan dan perisai."]
    ],
    tempat: ["Gunung Rinjani", "Gili Trawangan", "Desa Adat Sade"],
    hewan: "Rusa timor",
    fakta: "Di Desa Sade, lantai rumah adat dibersihkan dengan kotoran kerbau agar kuat dan tidak berdebu!"
  },
  {
    nama: "Nusa Tenggara Timur", ibukota: "Kupang", wilayah: "Bali & Nusa Tenggara",
    julukan: "Flobamora",
    deskripsi: "NTT terdiri dari lebih dari 500 pulau, di antaranya Flores, Sumba, Timor, dan Alor. Di sinilah satu-satunya tempat hidup komodo, kadal terbesar di dunia.",
    rumah: "Rumah Musalaki dan Mbaru Niang",
    pakaian: "Tenun Ikat dan topi Ti'i Langga",
    tarian: ["Tari Caci", "Tari Ja'i", "Tari Gong"],
    musik: ["Sasando"],
    lagu: ["Bolelebo", "Anak Kambing Saya", "Gemu Fa Mi Re"],
    makanan: ["Se'i", "Jagung Bose", "Catemak"],
    senjata: "Sundu",
    tradisi: [
      ["Pasola", "Ketangkasan berkuda sambil melempar tongkat kayu di Pulau Sumba."],
      ["Tari Caci", "Adu ketangkasan memakai cambuk dan perisai dari suku Manggarai."]
    ],
    tempat: ["Taman Nasional Komodo", "Danau Kelimutu", "Kampung Wae Rebo", "Pulau Padar"],
    hewan: "Komodo",
    fakta: "Danau Kelimutu punya tiga danau dengan warna berbeda, dan warnanya bisa berubah-ubah!"
  },

  // ===================== KALIMANTAN =====================
  {
    nama: "Kalimantan Barat", ibukota: "Pontianak", wilayah: "Kalimantan",
    julukan: "Bumi Khatulistiwa",
    deskripsi: "Kota Pontianak dilewati garis khatulistiwa. Kalimantan Barat adalah rumah suku Dayak, Melayu, dan Tionghoa. Sungai Kapuas, sungai terpanjang di Indonesia, mengalir di sini.",
    rumah: "Rumah Radakng (Rumah Panjang Dayak)",
    pakaian: "King Baba (pria) dan King Bibinge (wanita)",
    tarian: ["Tari Monong", "Tari Zapin Tembung"],
    musik: ["Sape"],
    lagu: ["Cik-Cik Periuk", "Aek Kapuas"],
    makanan: ["Bubur Pedas", "Choi Pan", "Pengkang"],
    senjata: "Mandau",
    tradisi: [
      ["Naik Dango", "Pesta syukur panen padi suku Dayak."],
      ["Meriam Karbit", "Membunyikan meriam bambu raksasa di tepi Sungai Kapuas saat malam Lebaran."],
      ["Cap Go Meh Singkawang", "Perayaan akhir Tahun Baru Imlek dengan arak-arakan yang meriah."]
    ],
    tempat: ["Tugu Khatulistiwa", "Danau Sentarum", "Kota Singkawang"],
    hewan: "Orangutan dan burung enggang",
    fakta: "Setiap bulan Maret dan September, bayangan benda di Tugu Khatulistiwa bisa menghilang tepat tengah hari!"
  },
  {
    nama: "Kalimantan Tengah", ibukota: "Palangka Raya", wilayah: "Kalimantan",
    julukan: "Bumi Tambun Bungai",
    deskripsi: "Kalimantan Tengah adalah provinsi terluas di Pulau Kalimantan. Hutan dan rawa gambutnya menjadi rumah bagi orangutan. Sebagian besar penduduk aslinya adalah suku Dayak.",
    rumah: "Rumah Betang",
    pakaian: "Sangkarut",
    tarian: ["Tari Tambun dan Bungai", "Tari Manasai", "Tari Balean Dadas"],
    musik: ["Garantung", "Kecapi Dayak"],
    lagu: ["Kalayar", "Tumpi Wayu"],
    makanan: ["Juhu Singkah (sayur rotan muda)", "Kalumpe", "Wadi"],
    senjata: "Mandau dan Sumpit",
    tradisi: [
      ["Tiwah", "Upacara besar suku Dayak untuk menghormati arwah leluhur."]
    ],
    tempat: ["Taman Nasional Tanjung Puting", "Taman Nasional Sebangau", "Bukit Batu"],
    hewan: "Orangutan kalimantan",
    fakta: "Rumah Betang bisa sepanjang 100 meter lebih dan dihuni banyak keluarga sekaligus!"
  },
  {
    nama: "Kalimantan Selatan", ibukota: "Banjarbaru", wilayah: "Kalimantan",
    julukan: "Bumi Lambung Mangkurat",
    deskripsi: "Kalimantan Selatan adalah tanah suku Banjar. Banyak warganya hidup di tepi sungai sehingga ada pasar yang berada di atas perahu. Sejak 2022, ibu kotanya pindah dari Banjarmasin ke Banjarbaru.",
    rumah: "Rumah Bubungan Tinggi",
    pakaian: "Bagajah Gamuling Baular Lulut",
    tarian: ["Tari Baksa Kembang", "Tari Radap Rahayu"],
    musik: ["Panting"],
    lagu: ["Ampar-Ampar Pisang", "Paris Barantai"],
    makanan: ["Soto Banjar", "Ketupat Kandangan", "Kue Bingka"],
    senjata: "Keris Banjar",
    tradisi: [
      ["Pasar Terapung", "Pedagang berjualan sayur, buah, dan kue dari atas perahu di sungai."],
      ["Baayun Maulid", "Mengayun bayi dan anak-anak sambil bershalawat saat Maulid Nabi."]
    ],
    tempat: ["Pasar Terapung Lok Baintan", "Pegunungan Meratus", "Martapura (Kota Intan)"],
    hewan: "Bekantan, monyet berhidung panjang",
    fakta: "Kain Sasirangan khas Banjar dibuat dengan cara dijelujur dan diikat, lalu dicelup warna."
  },
  {
    nama: "Kalimantan Timur", ibukota: "Samarinda", wilayah: "Kalimantan",
    julukan: "Benua Etam",
    deskripsi: "Kalimantan Timur kaya batu bara, minyak, dan hutan. Di sinilah Ibu Kota Nusantara (IKN) sedang dibangun sebagai ibu kota negara yang baru. Dahulu juga ada Kerajaan Kutai, kerajaan Hindu tertua di Indonesia.",
    rumah: "Rumah Lamin",
    pakaian: "Ta'a (wanita) dan Sapei Sapaq (pria)",
    tarian: ["Tari Gong (Kancet Ledo)", "Tari Hudoq", "Tari Kancet Papatai"],
    musik: ["Sampek (Sape)"],
    lagu: ["Indung-Indung", "Buah Bolok"],
    makanan: ["Nasi Bekepor", "Ayam Cincane", "Gence Ruan"],
    senjata: "Mandau",
    tradisi: [
      ["Erau", "Festival budaya Kutai Kartanegara yang meriah dengan berbagai lomba dan upacara."],
      ["Hudoq", "Penari bertopeng menari agar panen padi berhasil."]
    ],
    tempat: ["Ibu Kota Nusantara (IKN)", "Kepulauan Derawan", "Danau Kakaban", "Masjid Islamic Center Samarinda"],
    hewan: "Pesut mahakam, lumba-lumba air tawar",
    fakta: "Di Danau Kakaban hidup ubur-ubur yang tidak menyengat, jadi kita bisa berenang bersama mereka!"
  },
  {
    nama: "Kalimantan Utara", ibukota: "Tanjung Selor", wilayah: "Kalimantan",
    julukan: "Bumi Benuanta",
    deskripsi: "Kalimantan Utara berbatasan langsung dengan Malaysia. Penduduknya terdiri dari suku Tidung, Bulungan, dan Dayak. Provinsi ini dibentuk pada tahun 2012.",
    rumah: "Rumah Baloy (Suku Tidung)",
    pakaian: "Ta'a dan Sapei Sapaq",
    tarian: ["Tari Jugit Demaring", "Tari Kancet Lasan"],
    musik: ["Sampek (Sape)"],
    lagu: null,
    makanan: ["Kepiting Soka", "Kapah (kerang)"],
    senjata: "Mandau",
    tradisi: [
      ["Iraw Tengkayu", "Pesta laut suku Tidung di Tarakan dengan melarung perahu hias ke laut."]
    ],
    tempat: ["Kota Tarakan", "Taman Nasional Kayan Mentarang", "Pulau Sebatik"],
    hewan: "Bekantan dan burung enggang",
    fakta: "Pulau Sebatik dibagi dua: setengah milik Indonesia, setengah lagi milik Malaysia!"
  },

  // ===================== SULAWESI =====================
  {
    nama: "Sulawesi Utara", ibukota: "Manado", wilayah: "Sulawesi",
    julukan: "Bumi Nyiur Melambai",
    deskripsi: "Sulawesi Utara ada di ujung utara Pulau Sulawesi. Lautnya sangat indah dan menjadi tempat menyelam terkenal. Suku terbesarnya adalah Minahasa.",
    rumah: "Rumah Walewangko (Rumah Pewaris)",
    pakaian: "Laku Tepu",
    tarian: ["Tari Maengket", "Tari Kabasaran", "Tari Katrili"],
    musik: ["Kolintang", "Musik Bambu"],
    lagu: ["O Ina Ni Keke", "Si Patokaan"],
    makanan: ["Tinutuan (Bubur Manado)", "Klappertaart", "Cakalang Fufu"],
    senjata: null,
    tradisi: [
      ["Tulude", "Upacara syukur menyambut tahun baru di Kepulauan Sangihe."],
      ["Waruga", "Makam batu kuno berbentuk rumah kecil milik leluhur Minahasa."]
    ],
    tempat: ["Taman Laut Bunaken", "Danau Tondano", "Selat Lembeh"],
    hewan: "Tarsius (monyet terkecil) dan yaki (monyet hitam berjambul)",
    fakta: "Tarsius bisa memutar kepalanya hampir ke belakang, dan matanya lebih besar dari otaknya!"
  },
  {
    nama: "Gorontalo", ibukota: "Gorontalo", wilayah: "Sulawesi",
    julukan: "Serambi Madinah",
    deskripsi: "Gorontalo dulu bagian dari Sulawesi Utara, lalu menjadi provinsi sendiri pada tahun 2000. Masyarakatnya sangat menjunjung adat yang bersendikan agama.",
    rumah: "Rumah Dulohupa dan Bandayo Poboide",
    pakaian: "Biliu (wanita) dan Makuta (pria)",
    tarian: ["Tari Saronde", "Tari Polopalo", "Tari Dana-Dana"],
    musik: ["Polopalo", "Gambus"],
    lagu: ["Hulondalo Lipu'u"],
    makanan: ["Binte Biluhuta (sup jagung)", "Ilabulo"],
    senjata: "Wamilo",
    tradisi: [
      ["Tumbilotohe", "Menyalakan ribuan lampu minyak di seluruh kota pada tiga malam terakhir Ramadan."]
    ],
    tempat: ["Danau Limboto", "Benteng Otanaha", "Pantai Botubarani (hiu paus)"],
    hewan: "Hiu paus yang ramah di Botubarani",
    fakta: "Gorontalo punya sulaman khas bernama Karawo, dibuat dengan mencabut benang kain lalu menyulamnya kembali."
  },
  {
    nama: "Sulawesi Tengah", ibukota: "Palu", wilayah: "Sulawesi",
    julukan: "Bumi Tadulako",
    deskripsi: "Sulawesi Tengah adalah provinsi terluas di Pulau Sulawesi dan dilewati garis khatulistiwa. Di lembah-lembahnya ada patung batu kuno yang misterius.",
    rumah: "Rumah Tambi dan Souraja",
    pakaian: "Baju Nggembe",
    tarian: ["Tari Dero", "Tari Pajoge", "Tari Lumense"],
    musik: ["Lalove (seruling)", "Kakula"],
    lagu: ["Tondok Kadadingku"],
    makanan: ["Kaledo", "Uta Kelo"],
    senjata: "Pasatimpo",
    tradisi: [
      ["Dero (Molimo)", "Menari bersama sambil bergandengan tangan membentuk lingkaran, tanda persaudaraan."]
    ],
    tempat: ["Danau Poso", "Kepulauan Togean", "Lembah Bada (patung megalit)", "Taman Nasional Lore Lindu"],
    hewan: "Burung maleo, anoa, dan babirusa",
    fakta: "Telur burung maleo besarnya 5 kali telur ayam, dan dikubur di pasir panas sampai menetas!"
  },
  {
    nama: "Sulawesi Barat", ibukota: "Mamuju", wilayah: "Sulawesi",
    julukan: "Bumi Malaqbiq",
    deskripsi: "Sulawesi Barat adalah tanah suku Mandar yang terkenal sebagai pelaut tangguh. Provinsi ini dibentuk pada tahun 2004, sebelumnya bagian dari Sulawesi Selatan.",
    rumah: "Rumah Boyang",
    pakaian: "Pattuqduq Towaine",
    tarian: ["Tari Patuddu"],
    musik: ["Kecapi Mandar"],
    lagu: ["Tenggang-Tenggang Lopi"],
    makanan: ["Jepa", "Bau Piapi"],
    senjata: null,
    tradisi: [
      ["Sayyang Pattuddu", "Kuda menari! Anak yang sudah khatam Al-Qur'an diarak naik kuda yang bergerak mengikuti irama rebana."],
      ["Lomba Sandeq", "Lomba perahu layar tradisional Mandar, salah satu perahu layar tercepat."]
    ],
    tempat: ["Pantai Manakarra", "Mamasa"],
    hewan: null,
    fakta: "Perahu Sandeq tidak memakai mesin, tetapi bisa melaju sangat cepat hanya dengan tenaga angin."
  },
  {
    nama: "Sulawesi Selatan", ibukota: "Makassar", wilayah: "Sulawesi",
    julukan: null,
    deskripsi: "Sulawesi Selatan adalah tanah suku Bugis, Makassar, dan Toraja. Orang Bugis dan Makassar terkenal sebagai pelaut ulung yang berlayar dengan kapal Pinisi.",
    rumah: "Tongkonan (Toraja) dan Balla Lompoa (Makassar)",
    pakaian: "Baju Bodo",
    tarian: ["Tari Pakarena", "Tari Paduppa"],
    musik: ["Kecapi", "Gendang Makassar"],
    lagu: ["Angin Mamiri", "Ma Rencong-Rencong", "Anak Kukang"],
    makanan: ["Coto Makassar", "Konro", "Pisang Epe", "Es Pisang Ijo"],
    senjata: "Badik",
    tradisi: [
      ["Rambu Solo", "Upacara adat Toraja untuk mengantar orang yang sudah meninggal."],
      ["Membuat Kapal Pinisi", "Keahlian membuat kapal layar kayu tanpa gambar rancangan, diakui UNESCO."]
    ],
    tempat: ["Tana Toraja", "Pantai Losari", "Benteng Rotterdam", "Taman Prasejarah Leang-Leang"],
    hewan: null,
    fakta: "Di gua-gua Maros ditemukan lukisan purba berumur puluhan ribu tahun, termasuk yang tertua di dunia!"
  },
  {
    nama: "Sulawesi Tenggara", ibukota: "Kendari", wilayah: "Sulawesi",
    julukan: "Bumi Anoa",
    deskripsi: "Sulawesi Tenggara terdiri dari daratan dan banyak pulau. Suku utamanya adalah Tolaki, Buton, dan Muna. Lautnya sangat kaya terumbu karang.",
    rumah: "Rumah Banua Tada (Buton) dan Laikas (Tolaki)",
    pakaian: "Babu Nggawi",
    tarian: ["Tari Lulo", "Tari Balumpa"],
    musik: ["Gambus", "Ganda (gendang)"],
    lagu: ["Peia Tawa-Tawa", "Tana Wolio"],
    makanan: ["Sinonggi", "Kasuami", "Kambuse"],
    senjata: null,
    tradisi: [
      ["Molulo", "Menari Lulo bersama sambil bergandengan tangan, tanda persatuan dan persahabatan."]
    ],
    tempat: ["Taman Nasional Wakatobi", "Benteng Keraton Buton", "Pulau Labengki"],
    hewan: "Anoa, kerbau kecil khas Sulawesi",
    fakta: "Wakatobi adalah singkatan dari empat pulau: Wangi-Wangi, Kaledupa, Tomia, dan Binongko!"
  },

  // ===================== MALUKU =====================
  {
    nama: "Maluku", ibukota: "Ambon", wilayah: "Maluku",
    julukan: "Provinsi Seribu Pulau",
    deskripsi: "Maluku terkenal sebagai Kepulauan Rempah. Dahulu bangsa Eropa datang jauh-jauh untuk mencari pala dan cengkih dari sini. Orang Maluku sangat pandai bernyanyi.",
    rumah: "Rumah Baileo",
    pakaian: "Baju Cele",
    tarian: ["Tari Cakalele", "Tari Lenso", "Tari Saureka-Reka"],
    musik: ["Tifa", "Totobuang"],
    lagu: ["Rasa Sayange", "Ayo Mama", "Burung Kakatua", "Sio Mama"],
    makanan: ["Papeda", "Ikan Kuah Kuning", "Kohu-Kohu"],
    senjata: "Parang dan Salawaku (perisai)",
    tradisi: [
      ["Pela Gandong", "Ikatan persaudaraan antardesa untuk saling membantu walaupun berbeda agama."],
      ["Sasi", "Larangan adat mengambil hasil laut atau hutan untuk sementara, supaya alam tetap lestari."]
    ],
    tempat: ["Kepulauan Banda", "Pantai Ora", "Benteng Duurstede"],
    hewan: "Burung kakatua maluku",
    fakta: "Kota Ambon diakui UNESCO sebagai 'Kota Musik Dunia' pada tahun 2019!"
  },
  {
    nama: "Maluku Utara", ibukota: "Sofifi", wilayah: "Maluku",
    julukan: "Moloku Kie Raha",
    deskripsi: "Maluku Utara adalah asal cengkih dunia. Dahulu ada empat kesultanan besar: Ternate, Tidore, Jailolo, dan Bacan. Gunung Gamalama menjulang di tengah Pulau Ternate.",
    rumah: "Rumah Sasadu",
    pakaian: "Manteren Lamo",
    tarian: ["Tari Soya-Soya", "Tari Lalayon"],
    musik: ["Tifa", "Gambus"],
    lagu: ["Borero", "Tanase"],
    makanan: ["Gohu Ikan", "Papeda"],
    senjata: "Parang Salawaku",
    tradisi: [
      ["Kololi Kie", "Mengelilingi Gunung Gamalama dengan perahu sambil berdoa untuk keselamatan."],
      ["Legu Gam", "Festival budaya rakyat Ternate."]
    ],
    tempat: ["Gunung Gamalama", "Danau Tolire", "Benteng Tolukko", "Pulau Morotai"],
    hewan: "Burung bidadari halmahera",
    fakta: "Pemandangan Pulau Maitara dan Tidore pernah menjadi gambar di uang kertas Rp1.000!"
  },

  // ===================== PAPUA =====================
  {
    nama: "Papua", ibukota: "Jayapura", wilayah: "Papua",
    julukan: "Bumi Cenderawasih",
    deskripsi: "Provinsi Papua berada di pesisir utara Pulau Papua, termasuk Kota Jayapura dan Pulau Biak. Di sini ada Danau Sentani yang dihiasi banyak pulau kecil.",
    rumah: "Rumah Kariwari",
    pakaian: "Rok Rumbai dan hiasan bulu burung",
    tarian: ["Tari Yospan", "Tari Musyoh"],
    musik: ["Tifa"],
    lagu: ["Apuse", "Yamko Rambe Yamko"],
    makanan: ["Papeda", "Sagu Lempeng", "Ikan Bakar"],
    senjata: "Busur dan Panah",
    tradisi: [
      ["Festival Danau Sentani", "Pesta budaya dengan tarian di atas perahu di Danau Sentani."],
      ["Lukisan Kulit Kayu", "Melukis motif khas di atas kulit kayu, berasal dari Kampung Asei."]
    ],
    tempat: ["Danau Sentani", "Pantai Base G", "Pulau Biak"],
    hewan: "Burung cenderawasih, si 'burung surga'",
    fakta: "Lagu 'Apuse' yang sering kita nyanyikan berasal dari Biak, Papua!"
  },
  {
    nama: "Papua Barat", ibukota: "Manokwari", wilayah: "Papua",
    julukan: null,
    deskripsi: "Papua Barat berada di bagian 'kepala burung' Pulau Papua. Di sini ada Pegunungan Arfak yang sejuk dengan danau dan kupu-kupu yang indah.",
    rumah: "Rumah Kaki Seribu (Mod Aki Aksa)",
    pakaian: "Rok Rumbai",
    tarian: ["Tari Tumbu Tanah"],
    musik: ["Tifa"],
    lagu: ["Sajojo"],
    makanan: ["Papeda", "Ikan Bakar"],
    senjata: "Busur dan Panah",
    tradisi: [
      ["Tari Tumbu Tanah", "Tarian suku Arfak sambil menghentakkan kaki ke tanah, biasa ditampilkan untuk menyambut tamu."]
    ],
    tempat: ["Pegunungan Arfak", "Danau Anggi", "Taman Nasional Teluk Cenderawasih", "Pulau Mansinam"],
    hewan: "Burung namdur dan kupu-kupu sayap burung",
    fakta: "Rumah Kaki Seribu dibuat di atas banyak tiang kayu agar terlindung dari udara dingin dan binatang buas."
  },
  {
    nama: "Papua Barat Daya", ibukota: "Sorong", wilayah: "Papua",
    julukan: null,
    deskripsi: "Papua Barat Daya adalah provinsi termuda di Indonesia, dibentuk pada Desember 2022. Di sini ada Raja Ampat, kepulauan dengan terumbu karang paling beragam di dunia.",
    rumah: null,
    pakaian: "Rok Rumbai",
    tarian: ["Tari Yospan"],
    musik: ["Tifa"],
    lagu: null,
    makanan: ["Papeda", "Ikan Kuah Kuning", "Sagu"],
    senjata: null,
    tradisi: [
      ["Sasi Laut", "Larangan adat menangkap ikan di tempat tertentu untuk sementara, agar laut tetap kaya ikan."]
    ],
    tempat: ["Raja Ampat", "Piaynemo", "Pulau Wayag"],
    hewan: "Burung cenderawasih botak dan cenderawasih merah",
    fakta: "Indonesia sekarang punya 38 provinsi, dan Papua Barat Daya adalah provinsi yang ke-38!"
  },
  {
    nama: "Papua Selatan", ibukota: "Merauke", wilayah: "Papua",
    julukan: null,
    deskripsi: "Papua Selatan ada di ujung paling timur Indonesia. Wilayahnya berupa dataran luas, rawa, dan padang rumput. Di sini tinggal suku Asmat, ahli ukir kayu yang terkenal di dunia.",
    rumah: "Rumah Jew (Rumah Bujang Suku Asmat)",
    pakaian: "Rok Rumbai",
    tarian: null,
    musik: ["Tifa"],
    lagu: null,
    makanan: ["Sagu", "Papeda", "Daging Rusa"],
    senjata: "Busur dan Panah",
    tradisi: [
      ["Ukiran Asmat", "Mengukir kayu menjadi patung dan perisai untuk menghormati leluhur."],
      ["Festival Budaya Asmat", "Pesta budaya tahunan yang memamerkan ukiran, tarian, dan perahu Asmat."]
    ],
    tempat: ["Taman Nasional Wasur", "Tugu Nol Kilometer Merauke", "Musamus (rumah semut raksasa)"],
    hewan: "Walabi (kerabat kanguru) dan burung kasuari",
    fakta: "Lagu 'Dari Sabang sampai Merauke' menyebut Merauke sebagai ujung timur Indonesia!"
  },
  {
    nama: "Papua Tengah", ibukota: "Nabire", wilayah: "Papua",
    julukan: null,
    deskripsi: "Papua Tengah punya gunung-gunung tertinggi di Indonesia. Puncaknya sangat dingin hingga ada es abadi, padahal letaknya dekat garis khatulistiwa.",
    rumah: "Rumah Honai",
    pakaian: "Koteka dan Rok Rumbai",
    tarian: ["Tari Perang"],
    musik: ["Tifa", "Pikon"],
    lagu: null,
    makanan: ["Papeda", "Ubi Jalar"],
    senjata: "Busur dan Panah",
    tradisi: [
      ["Bakar Batu", "Memasak bersama dengan batu panas sebagai tanda syukur dan persaudaraan."]
    ],
    tempat: ["Puncak Jaya (Carstensz)", "Danau Paniai", "Teluk Kwatisore (hiu paus)"],
    hewan: "Hiu paus di Teluk Cenderawasih",
    fakta: "Puncak Jaya tingginya 4.884 meter dan menjadi gunung tertinggi di Indonesia!"
  },
  {
    nama: "Papua Pegunungan", ibukota: "Wamena (Jayawijaya)", wilayah: "Papua",
    julukan: null,
    deskripsi: "Papua Pegunungan adalah satu-satunya provinsi di Indonesia yang tidak punya laut! Wilayahnya berupa lembah dan pegunungan tinggi, termasuk Lembah Baliem.",
    rumah: "Honai (pria), Ebei (wanita), dan Wamai (kandang ternak)",
    pakaian: "Koteka (pria) dan Sali (rok rumput wanita)",
    tarian: ["Tari Perang Lembah Baliem"],
    musik: ["Pikon"],
    lagu: null,
    makanan: ["Ubi Jalar (Hipere)", "Bakar Batu"],
    senjata: "Busur dan Panah",
    tradisi: [
      ["Bakar Batu", "Memasak ubi, sayur, dan daging bersama di atas batu panas, sebagai tanda syukur dan perdamaian."],
      ["Festival Lembah Baliem", "Pesta budaya besar yang menampilkan tari perang dan permainan adat."]
    ],
    tempat: ["Lembah Baliem", "Danau Habbema", "Puncak Trikora"],
    hewan: "Burung cenderawasih dan kuskus",
    fakta: "Rumah Honai beratap jerami bulat dan tidak berjendela, supaya tetap hangat di udara pegunungan yang dingin."
  }
];
