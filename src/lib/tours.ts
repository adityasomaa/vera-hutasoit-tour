import type { Lang } from "@/lib/i18n/dictionary";
import type { PhotoKey } from "@/lib/photos";

/** The two formats that have their own browsable catalogue. */
export type TourFormat = "private" | "sharing";

export const TOUR_FORMATS: TourFormat[] = ["private", "sharing"];

type L = Record<Lang, string>;
type LA = Record<Lang, string[]>;

export type Stop = {
  time: string;
  title: L;
  desc: L;
};

export type Tour = {
  slug: string;
  format: TourFormat;
  cover: PhotoKey;
  /** secondary frames used on the detail page */
  gallery: PhotoKey[];
  area: L;
  name: L;
  tagline: L;
  summary: L;
  /** display price, already formatted per language */
  price: L;
  priceUnit: L;
  duration: L;
  group: L;
  pickup: L;
  difficulty: L;
  highlights: LA;
  itinerary: Stop[];
  includes: LA;
  excludes: LA;
  bring: LA;
};

/* ------------------------------------------------------------------ */
/*  PRIVATE — your own car, your own pace                              */
/* ------------------------------------------------------------------ */

const PRIVATE: Tour[] = [
  {
    slug: "ubud-culture-day",
    format: "private",
    cover: "tourUbudCulture",
    gallery: ["templeGates", "monkeyForest", "offerings"],
    area: { en: "Ubud & Gianyar", id: "Ubud & Gianyar" },
    name: { en: "Ubud Culture Day", id: "Sehari Budaya Ubud" },
    tagline: {
      en: "Rice terraces, a water temple and a ridge walk at golden hour.",
      id: "Sawah terasering, pura air, dan jalan santai di punggung bukit saat senja.",
    },
    summary: {
      en: "The classic Ubud loop, run in the order that actually avoids the crowds. We start at the terraces before the buses arrive, sit out the midday heat somewhere shaded, and finish on the Campuhan ridge as the light softens.",
      id: "Rute klasik Ubud, tapi urutannya kami atur supaya benar-benar terhindar dari rombongan. Mulai dari terasering sebelum bus datang, istirahat di tempat teduh saat panas terik, lalu tutup hari di punggung bukit Campuhan waktu cahayanya mulai lembut.",
    },
    price: { en: "IDR 850,000", id: "Rp 850.000" },
    priceUnit: { en: "per car, up to 6 people", id: "per mobil, sampai 6 orang" },
    duration: { en: "10 hours", id: "10 jam" },
    group: { en: "1–6 people", id: "1–6 orang" },
    pickup: {
      en: "Hotel pickup across South Bali & Ubud",
      id: "Jemput di hotel area Bali Selatan & Ubud",
    },
    difficulty: { en: "Easy · some stairs", id: "Ringan · ada beberapa tangga" },
    highlights: {
      en: [
        "Tegalalang terraces at 08.00, before the tour buses",
        "A purification ceremony at Tirta Empul, explained properly",
        "Coffee tasting on a working plantation, no hard sell",
        "Campuhan ridge walk timed for the last hour of light",
      ],
      id: [
        "Terasering Tegalalang jam 08.00, sebelum bus wisata datang",
        "Upacara penyucian di Tirta Empul, dijelaskan dengan benar",
        "Cicip kopi di kebun yang beneran produksi, tanpa dipaksa beli",
        "Jalan di Campuhan Ridge pas satu jam terakhir sebelum matahari turun",
      ],
    },
    itinerary: [
      {
        time: "07.00",
        title: { en: "Hotel pickup", id: "Jemput di hotel" },
        desc: {
          en: "Your driver-guide messages the night before and is in the lobby on time.",
          id: "Driver-guide Anda chat malam sebelumnya dan sudah standby di lobi tepat waktu.",
        },
      },
      {
        time: "08.00",
        title: { en: "Tegalalang Rice Terrace", id: "Terasering Tegalalang" },
        desc: {
          en: "Two hours while it is still quiet and cool. Walk down as far as you like.",
          id: "Dua jam saat masih sepi dan sejuk. Turun sejauh yang Anda mau.",
        },
      },
      {
        time: "10.30",
        title: { en: "Coffee plantation", id: "Kebun kopi" },
        desc: {
          en: "Tasting flight of local coffees and teas, with the plants growing beside you.",
          id: "Cicip aneka kopi dan teh lokal, dengan tanamannya tumbuh persis di sebelah Anda.",
        },
      },
      {
        time: "12.00",
        title: { en: "Lunch in Tampaksiring", id: "Makan siang di Tampaksiring" },
        desc: {
          en: "A warung your guide actually eats at, overlooking the valley.",
          id: "Warung yang memang jadi langganan guide Anda, menghadap lembah.",
        },
      },
      {
        time: "13.30",
        title: { en: "Tirta Empul", id: "Tirta Empul" },
        desc: {
          en: "The holy spring temple. Join the purification queue or just watch — both are fine.",
          id: "Pura mata air suci. Mau ikut antre penyucian atau cuma melihat, dua-duanya boleh.",
        },
      },
      {
        time: "15.30",
        title: { en: "Sacred Monkey Forest", id: "Monkey Forest" },
        desc: {
          en: "Banyan roots, three temples and several hundred very confident macaques.",
          id: "Akar beringin, tiga pura, dan beberapa ratus monyet yang sangat percaya diri.",
        },
      },
      {
        time: "17.00",
        title: { en: "Campuhan Ridge Walk", id: "Campuhan Ridge Walk" },
        desc: {
          en: "A flat forty-minute ridge between two valleys, timed for the softest light.",
          id: "Jalur datar empat puluh menit di antara dua lembah, pas saat cahayanya paling lembut.",
        },
      },
      {
        time: "18.30",
        title: { en: "Drop-off", id: "Antar pulang" },
        desc: {
          en: "Back to your hotel, or dropped anywhere in Ubud if you want dinner there.",
          id: "Kembali ke hotel, atau turun di mana saja di Ubud kalau mau makan malam di sana.",
        },
      },
    ],
    includes: {
      en: [
        "Private air-conditioned car with fuel, parking and tolls",
        "English-speaking licensed driver-guide",
        "Hotel pickup and drop-off",
        "Bottled water, umbrellas and phone chargers on board",
        "Sarong loan for temple entry",
      ],
      id: [
        "Mobil AC pribadi lengkap dengan bensin, parkir, dan tol",
        "Driver-guide berlisensi dan berbahasa Inggris",
        "Jemput dan antar di hotel",
        "Air mineral, payung, dan charger HP tersedia di mobil",
        "Pinjaman sarung untuk masuk pura",
      ],
    },
    excludes: {
      en: [
        "Entrance tickets (about IDR 150,000 per person in total)",
        "Your own meals and drinks",
        "Tips, entirely at your discretion",
      ],
      id: [
        "Tiket masuk (totalnya sekitar Rp 150.000 per orang)",
        "Makan dan minum Anda sendiri",
        "Tip, sepenuhnya terserah Anda",
      ],
    },
    bring: {
      en: ["Comfortable shoes", "Sunscreen", "Cash for tickets", "Modest clothing for temples"],
      id: ["Sepatu yang nyaman", "Sunscreen", "Uang tunai untuk tiket", "Pakaian sopan untuk ke pura"],
    },
  },
  {
    slug: "nusa-penida-west",
    format: "private",
    cover: "tourPenidaWest",
    gallery: ["penidaCliffWalk", "penidaAerial", "jukung"],
    area: { en: "Nusa Penida", id: "Nusa Penida" },
    name: { en: "Nusa Penida West Coast", id: "Nusa Penida Pesisir Barat" },
    tagline: {
      en: "The cliff everyone photographs, reached before everyone photographs it.",
      id: "Tebing yang semua orang foto, tapi kita sampai sebelum semua orang memfotonya.",
    },
    summary: {
      en: "A long day and worth every hour. We book the earliest fast boat so you stand at Kelingking while it is still quiet, then work north along the coast. The roads on Penida are rough, so we use a proper 4x4 and a driver who knows them.",
      id: "Harinya panjang, tapi sepadan sampai jam terakhir. Kami pesan fast boat paling pagi supaya Anda sampai di Kelingking saat masih sepi, lalu lanjut menyusuri pesisir ke utara. Jalanan di Penida memang rusak, jadi kami pakai 4x4 dan driver yang hafal medannya.",
    },
    price: { en: "IDR 1,150,000", id: "Rp 1.150.000" },
    priceUnit: { en: "per person, minimum 2", id: "per orang, minimal 2 orang" },
    duration: { en: "12 hours", id: "12 jam" },
    group: { en: "2–6 people", id: "2–6 orang" },
    pickup: { en: "Sanur harbour or your hotel", id: "Pelabuhan Sanur atau hotel Anda" },
    difficulty: {
      en: "Moderate · steep steps at Kelingking",
      id: "Sedang · tangga curam di Kelingking",
    },
    highlights: {
      en: [
        "First fast boat out, so Kelingking is still calm",
        "Private 4x4 and driver on the island, not a shared truck",
        "Broken Beach and Angel's Billabong back to back",
        "Snorkel stop or swim at Crystal Bay before the return crossing",
      ],
      id: [
        "Naik fast boat paling pagi, jadi Kelingking masih adem",
        "4x4 dan driver pribadi di pulau, bukan truk berbagi",
        "Broken Beach dan Angel's Billabong berurutan",
        "Snorkeling atau berenang di Crystal Bay sebelum menyeberang balik",
      ],
    },
    itinerary: [
      {
        time: "05.30",
        title: { en: "Hotel pickup", id: "Jemput di hotel" },
        desc: {
          en: "Early, but the whole day depends on catching the first boat.",
          id: "Memang pagi sekali, tapi seluruh harinya bergantung pada kapal pertama.",
        },
      },
      {
        time: "07.00",
        title: { en: "Fast boat from Sanur", id: "Fast boat dari Sanur" },
        desc: {
          en: "Forty-five minutes across. Sit toward the back if you feel the swell.",
          id: "Empat puluh lima menit menyeberang. Duduk agak ke belakang kalau Anda mudah mabuk laut.",
        },
      },
      {
        time: "08.30",
        title: { en: "Kelingking Beach", id: "Kelingking Beach" },
        desc: {
          en: "The viewpoint first. The descent to the sand is steep and optional.",
          id: "Ke titik pandangnya dulu. Turun ke pasirnya curam dan sifatnya opsional.",
        },
      },
      {
        time: "10.30",
        title: { en: "Broken Beach & Angel's Billabong", id: "Broken Beach & Angel's Billabong" },
        desc: {
          en: "A collapsed sea cave and a natural rock pool, five minutes apart.",
          id: "Gua laut yang runtuh dan kolam batu alami, jaraknya cuma lima menit.",
        },
      },
      {
        time: "12.30",
        title: { en: "Lunch above the water", id: "Makan siang di atas laut" },
        desc: {
          en: "Simple Indonesian food at a cliffside warung.",
          id: "Masakan Indonesia sederhana di warung tepi tebing.",
        },
      },
      {
        time: "14.00",
        title: { en: "Crystal Bay", id: "Crystal Bay" },
        desc: {
          en: "Swim, snorkel or just sit. The calmest part of the day.",
          id: "Berenang, snorkeling, atau duduk saja. Bagian paling santai sepanjang hari.",
        },
      },
      {
        time: "16.00",
        title: { en: "Return crossing", id: "Menyeberang kembali" },
        desc: {
          en: "Back to Sanur, then your driver takes you to the hotel.",
          id: "Kembali ke Sanur, lalu driver Anda mengantar ke hotel.",
        },
      },
    ],
    includes: {
      en: [
        "Return fast boat tickets and harbour fees",
        "Private 4x4 with driver on the island",
        "Licensed guide for the full day",
        "Snorkel gear at Crystal Bay",
        "Hotel pickup and drop-off in South Bali",
        "Drinking water throughout",
      ],
      id: [
        "Tiket fast boat pulang-pergi dan retribusi pelabuhan",
        "4x4 pribadi dengan driver di pulau",
        "Guide berlisensi untuk seharian penuh",
        "Peralatan snorkeling di Crystal Bay",
        "Jemput dan antar hotel di Bali Selatan",
        "Air minum sepanjang perjalanan",
      ],
    },
    excludes: {
      en: ["Lunch (about IDR 80,000)", "Entrance donations at viewpoints", "Travel insurance"],
      id: ["Makan siang (sekitar Rp 80.000)", "Donasi masuk di titik pandang", "Asuransi perjalanan"],
    },
    bring: {
      en: ["Swimwear and a towel", "Shoes with grip", "Motion sickness tablets if you need them", "Dry bag"],
      id: ["Baju renang dan handuk", "Sepatu yang tidak licin", "Obat anti mabuk kalau perlu", "Dry bag"],
    },
  },
  {
    slug: "batur-sunrise-trek",
    format: "private",
    cover: "tourBaturTrek",
    gallery: ["baturDawn", "baturTrekkers", "baturClouds"],
    area: { en: "Kintamani & Bangli", id: "Kintamani & Bangli" },
    name: { en: "Mount Batur Sunrise Trek", id: "Trekking Sunrise Gunung Batur" },
    tagline: {
      en: "Up in the dark, breakfast cooked in a steam vent, hot springs after.",
      id: "Naik saat masih gelap, sarapan dimasak di uap panas bumi, lanjut berendam air panas.",
    },
    summary: {
      en: "An active volcano, a two-hour climb and a summit at 1,717 metres. The pace is set by you, not the group. Afterwards you soak in hot springs on the lake shore instead of being rushed straight back.",
      id: "Gunung api aktif, pendakian dua jam, dan puncak di ketinggian 1.717 meter. Ritmenya Anda yang tentukan, bukan rombongan. Setelahnya berendam di air panas tepi danau, bukan langsung diburu-buru pulang.",
    },
    price: { en: "IDR 1,050,000", id: "Rp 1.050.000" },
    priceUnit: { en: "per person, minimum 2", id: "per orang, minimal 2 orang" },
    duration: { en: "11 hours", id: "11 jam" },
    group: { en: "2–8 people", id: "2–8 orang" },
    pickup: { en: "Hotel pickup, South Bali & Ubud", id: "Jemput di hotel, Bali Selatan & Ubud" },
    difficulty: {
      en: "Challenging · 2 hours uphill on loose rock",
      id: "Menantang · 2 jam menanjak di batuan lepas",
    },
    highlights: {
      en: [
        "Licensed mountain guide, one per small group",
        "Headlamps and walking poles provided",
        "Eggs and bananas steamed in a volcanic vent at the summit",
        "Toya Devasya hot springs on Lake Batur afterwards",
      ],
      id: [
        "Guide gunung berlisensi, satu untuk tiap grup kecil",
        "Headlamp dan tongkat jalan disediakan",
        "Telur dan pisang dikukus di uap vulkanik tepat di puncak",
        "Lanjut berendam di air panas Toya Devasya, tepi Danau Batur",
      ],
    },
    itinerary: [
      {
        time: "02.00",
        title: { en: "Hotel pickup", id: "Jemput di hotel" },
        desc: {
          en: "Coffee in the car. The drive up takes about two hours.",
          id: "Kopi diminum di mobil. Perjalanan naik sekitar dua jam.",
        },
      },
      {
        time: "04.00",
        title: { en: "Trailhead briefing", id: "Briefing di titik awal" },
        desc: {
          en: "Headlamps handed out, pace agreed, and a short safety talk.",
          id: "Headlamp dibagikan, ritme jalan disepakati, plus penjelasan singkat soal keselamatan.",
        },
      },
      {
        time: "04.15",
        title: { en: "Climb begins", id: "Mulai mendaki" },
        desc: {
          en: "Roughly two hours. Three rest points, and nobody is left behind.",
          id: "Kurang lebih dua jam. Ada tiga titik istirahat, dan tidak ada yang ditinggal.",
        },
      },
      {
        time: "06.00",
        title: { en: "Summit and sunrise", id: "Puncak dan matahari terbit" },
        desc: {
          en: "Lake Batur below, Mount Agung across, Lombok on a clear morning.",
          id: "Danau Batur di bawah, Gunung Agung di seberang, Lombok kalau paginya cerah.",
        },
      },
      {
        time: "06.45",
        title: { en: "Steam-vent breakfast", id: "Sarapan uap vulkanik" },
        desc: {
          en: "Eggs and bananas cooked in the ground, with hot tea.",
          id: "Telur dan pisang dimasak di dalam tanah, ditemani teh hangat.",
        },
      },
      {
        time: "09.00",
        title: { en: "Down and to the hot springs", id: "Turun lalu ke air panas" },
        desc: {
          en: "Two hours in the natural pools on the lake shore.",
          id: "Dua jam di kolam alami tepi danau.",
        },
      },
      {
        time: "13.00",
        title: { en: "Drop-off", id: "Antar pulang" },
        desc: {
          en: "Most guests sleep the whole way back. That is expected.",
          id: "Kebanyakan tamu tidur sepanjang jalan pulang. Itu wajar.",
        },
      },
    ],
    includes: {
      en: [
        "Private car, fuel, parking and tolls",
        "Licensed mountain guide and trekking permit",
        "Headlamp, walking pole and gloves",
        "Summit breakfast and hot drinks",
        "Hot springs entry",
      ],
      id: [
        "Mobil pribadi, bensin, parkir, dan tol",
        "Guide gunung berlisensi dan izin trekking",
        "Headlamp, tongkat jalan, dan sarung tangan",
        "Sarapan di puncak dan minuman hangat",
        "Tiket masuk pemandian air panas",
      ],
    },
    excludes: {
      en: ["Lunch", "Towel rental at the springs", "Tips for your mountain guide"],
      id: ["Makan siang", "Sewa handuk di pemandian", "Tip untuk guide gunung Anda"],
    },
    bring: {
      en: ["A warm layer, it is cold at the top", "Trainers with grip", "Swimwear for the springs", "A small backpack"],
      id: ["Jaket, di atas dingin", "Sepatu olahraga yang tidak licin", "Baju renang untuk pemandian", "Tas ransel kecil"],
    },
  },
];

/* ------------------------------------------------------------------ */
/*  SHARING — small fixed-departure groups                             */
/* ------------------------------------------------------------------ */

const SHARING: Tour[] = [
  {
    slug: "ubud-highlights-group",
    format: "sharing",
    cover: "tourUbudGroup",
    gallery: ["jungleFall", "riceTerraceSoft", "balineseWoman"],
    area: { en: "Ubud & Gianyar", id: "Ubud & Gianyar" },
    name: { en: "Ubud Highlights", id: "Ubud Highlights" },
    tagline: {
      en: "The four Ubud stops most people come for, in one shared minibus.",
      id: "Empat spot Ubud yang paling dicari, dalam satu minibus bersama.",
    },
    summary: {
      en: "Our most-booked shared day. Twelve seats maximum, one licensed guide, a fixed route and a fixed price with the tickets already inside it. Good if you are travelling alone or watching the budget.",
      id: "Trip berbagi kami yang paling laris. Maksimal dua belas kursi, satu guide berlisensi, rute tetap, dan harga tetap yang tiketnya sudah termasuk. Cocok kalau Anda jalan sendirian atau sedang hemat.",
    },
    price: { en: "IDR 285,000", id: "Rp 285.000" },
    priceUnit: { en: "per person, tickets included", id: "per orang, tiket sudah termasuk" },
    duration: { en: "9 hours", id: "9 jam" },
    group: { en: "Maximum 12 people", id: "Maksimal 12 orang" },
    pickup: {
      en: "Meeting points in Kuta, Seminyak & Ubud",
      id: "Titik kumpul di Kuta, Seminyak & Ubud",
    },
    difficulty: { en: "Easy · some stairs", id: "Ringan · ada beberapa tangga" },
    highlights: {
      en: [
        "Twelve people maximum, never a full coach",
        "Every entrance ticket already in the price",
        "Fixed 08.00 departure, back before sunset",
        "An easy way to meet other travellers",
      ],
      id: [
        "Maksimal dua belas orang, bukan bus penuh",
        "Semua tiket masuk sudah termasuk harga",
        "Berangkat pasti jam 08.00, balik sebelum matahari terbenam",
        "Cara gampang kenalan dengan traveler lain",
      ],
    },
    itinerary: [
      {
        time: "08.00",
        title: { en: "Meeting point departure", id: "Berangkat dari titik kumpul" },
        desc: {
          en: "Kuta, Seminyak or Ubud. We send the exact spot the night before.",
          id: "Kuta, Seminyak, atau Ubud. Titik persisnya kami kirim malam sebelumnya.",
        },
      },
      {
        time: "09.30",
        title: { en: "Tegenungan Waterfall", id: "Air Terjun Tegenungan" },
        desc: {
          en: "A short walk down, and a swim if you want one.",
          id: "Jalan turun sebentar, boleh berenang kalau mau.",
        },
      },
      {
        time: "11.00",
        title: { en: "Sacred Monkey Forest", id: "Monkey Forest" },
        desc: {
          en: "An hour among the banyans. Keep sunglasses in your bag.",
          id: "Sejam di antara pohon beringin. Kacamata simpan di tas ya.",
        },
      },
      {
        time: "12.30",
        title: { en: "Lunch in Ubud", id: "Makan siang di Ubud" },
        desc: {
          en: "Buffet with vegetarian options, included in the price.",
          id: "Prasmanan dengan pilihan vegetarian, sudah termasuk harga.",
        },
      },
      {
        time: "14.00",
        title: { en: "Tirta Empul", id: "Tirta Empul" },
        desc: {
          en: "The holy spring temple, with the ritual explained before you decide.",
          id: "Pura mata air suci, ritualnya dijelaskan dulu sebelum Anda memutuskan ikut.",
        },
      },
      {
        time: "15.30",
        title: { en: "Tegalalang Rice Terrace", id: "Terasering Tegalalang" },
        desc: {
          en: "Late afternoon light, and the swings are quieter by now.",
          id: "Cahaya sore, dan ayunannya sudah lebih sepi jam segini.",
        },
      },
      {
        time: "17.00",
        title: { en: "Return", id: "Perjalanan pulang" },
        desc: {
          en: "Back to your meeting point, roughly 18.00.",
          id: "Kembali ke titik kumpul, sekitar jam 18.00.",
        },
      },
    ],
    includes: {
      en: [
        "Air-conditioned minibus, maximum 12 seats",
        "Licensed English-speaking guide",
        "All entrance tickets",
        "Buffet lunch with vegetarian options",
        "Drinking water",
      ],
      id: [
        "Minibus AC, maksimal 12 kursi",
        "Guide berlisensi berbahasa Inggris",
        "Semua tiket masuk",
        "Makan siang prasmanan dengan pilihan vegetarian",
        "Air minum",
      ],
    },
    excludes: {
      en: ["Hotel pickup outside the listed meeting points", "Personal spending", "Tips"],
      id: ["Jemput hotel di luar titik kumpul yang tersedia", "Pengeluaran pribadi", "Tip"],
    },
    bring: {
      en: ["Swimwear for the waterfall", "Sunscreen", "A sarong or long trousers"],
      id: ["Baju renang untuk air terjun", "Sunscreen", "Sarung atau celana panjang"],
    },
  },
  {
    slug: "nusa-penida-group",
    format: "sharing",
    cover: "tourPenidaGroup",
    gallery: ["penidaAerial", "beachBoats", "canoe"],
    area: { en: "Nusa Penida", id: "Nusa Penida" },
    name: { en: "Nusa Penida Day Trip", id: "Nusa Penida Sehari" },
    tagline: {
      en: "The island's west coast in one shared, long, very good day.",
      id: "Pesisir barat pulau ini dalam satu hari berbagi yang panjang dan sangat berkesan.",
    },
    summary: {
      en: "Same route as our private Penida trip, shared with up to eleven others and priced accordingly. The boat and the island transport are booked as a group, which is where the saving comes from.",
      id: "Rutenya sama dengan trip Penida private kami, hanya saja dibagi bersama maksimal sebelas orang lain dan harganya menyesuaikan. Kapal dan transportasi di pulau dipesan sekaligus untuk satu grup, dari situlah hematnya.",
    },
    price: { en: "IDR 725,000", id: "Rp 725.000" },
    priceUnit: { en: "per person, boat included", id: "per orang, kapal sudah termasuk" },
    duration: { en: "12 hours", id: "12 jam" },
    group: { en: "Maximum 12 people", id: "Maksimal 12 orang" },
    pickup: { en: "Sanur harbour meeting point", id: "Titik kumpul Pelabuhan Sanur" },
    difficulty: {
      en: "Moderate · steep steps at Kelingking",
      id: "Sedang · tangga curam di Kelingking",
    },
    highlights: {
      en: [
        "Return fast boat and island transport included",
        "Kelingking, Broken Beach, Angel's Billabong, Crystal Bay",
        "Snorkel gear provided at Crystal Bay",
        "Roughly a third of the private trip price",
      ],
      id: [
        "Fast boat pulang-pergi dan transportasi di pulau sudah termasuk",
        "Kelingking, Broken Beach, Angel's Billabong, Crystal Bay",
        "Peralatan snorkeling disediakan di Crystal Bay",
        "Harganya kira-kira sepertiga dari trip private",
      ],
    },
    itinerary: [
      {
        time: "06.30",
        title: { en: "Sanur harbour check-in", id: "Check-in Pelabuhan Sanur" },
        desc: {
          en: "Meet your guide at the boat desk. Make your own way here.",
          id: "Bertemu guide di loket kapal. Menuju ke sini secara mandiri.",
        },
      },
      {
        time: "07.30",
        title: { en: "Fast boat crossing", id: "Menyeberang dengan fast boat" },
        desc: {
          en: "Forty-five minutes to Toya Pakeh.",
          id: "Empat puluh lima menit ke Toya Pakeh.",
        },
      },
      {
        time: "09.00",
        title: { en: "Kelingking Beach", id: "Kelingking Beach" },
        desc: {
          en: "The viewpoint, with time to walk down if you have the legs for it.",
          id: "Titik pandangnya, dengan waktu untuk turun kalau kaki Anda kuat.",
        },
      },
      {
        time: "11.00",
        title: { en: "Broken Beach & Angel's Billabong", id: "Broken Beach & Angel's Billabong" },
        desc: {
          en: "Two of the most photographed spots on the island, side by side.",
          id: "Dua spot paling difoto di pulau ini, letaknya bersebelahan.",
        },
      },
      {
        time: "13.00",
        title: { en: "Lunch", id: "Makan siang" },
        desc: {
          en: "Included buffet at a cliffside warung.",
          id: "Prasmanan sudah termasuk, di warung tepi tebing.",
        },
      },
      {
        time: "14.30",
        title: { en: "Crystal Bay", id: "Crystal Bay" },
        desc: {
          en: "Swim or snorkel before the crossing back.",
          id: "Berenang atau snorkeling sebelum menyeberang pulang.",
        },
      },
      {
        time: "16.30",
        title: { en: "Return to Sanur", id: "Kembali ke Sanur" },
        desc: {
          en: "Arriving around 18.00, depending on the sea.",
          id: "Tiba sekitar jam 18.00, tergantung kondisi laut.",
        },
      },
    ],
    includes: {
      en: [
        "Return fast boat and harbour fees",
        "Shared island transport with driver",
        "Licensed guide",
        "Buffet lunch",
        "Snorkel gear at Crystal Bay",
      ],
      id: [
        "Fast boat pulang-pergi dan retribusi pelabuhan",
        "Transportasi bersama di pulau lengkap dengan driver",
        "Guide berlisensi",
        "Makan siang prasmanan",
        "Peralatan snorkeling di Crystal Bay",
      ],
    },
    excludes: {
      en: ["Hotel transfer to Sanur harbour", "Viewpoint donations", "Travel insurance"],
      id: ["Antar-jemput hotel ke Pelabuhan Sanur", "Donasi di titik pandang", "Asuransi perjalanan"],
    },
    bring: {
      en: ["Swimwear and towel", "Shoes with grip", "Motion sickness tablets", "Dry bag"],
      id: ["Baju renang dan handuk", "Sepatu yang tidak licin", "Obat anti mabuk", "Dry bag"],
    },
  },
  {
    slug: "uluwatu-kecak-group",
    format: "sharing",
    cover: "tourKecak",
    gallery: ["uluwatuTemple", "kecakTorches", "beachBoats"],
    area: { en: "Uluwatu & Jimbaran", id: "Uluwatu & Jimbaran" },
    name: { en: "Uluwatu Sunset & Kecak", id: "Sunset Uluwatu & Kecak" },
    tagline: {
      en: "A clifftop temple, a fire dance and dinner on the sand.",
      id: "Pura di atas tebing, tari api, dan makan malam di atas pasir.",
    },
    summary: {
      en: "A half-day that uses the best part of the day. We leave after lunch, stop at a quiet beach first, then take our seats at the Kecak amphitheatre before it fills up. Dinner is grilled seafood at Jimbaran with your feet in the sand.",
      id: "Setengah hari yang memanfaatkan bagian terbaik dari hari itu. Kami berangkat setelah makan siang, mampir dulu ke pantai yang sepi, lalu ambil tempat duduk di amfiteater Kecak sebelum penuh. Makan malamnya seafood bakar di Jimbaran dengan kaki menyentuh pasir.",
    },
    price: { en: "IDR 245,000", id: "Rp 245.000" },
    priceUnit: { en: "per person, ticket included", id: "per orang, tiket sudah termasuk" },
    duration: { en: "7 hours", id: "7 jam" },
    group: { en: "Maximum 12 people", id: "Maksimal 12 orang" },
    pickup: {
      en: "Meeting points in Kuta, Seminyak & Jimbaran",
      id: "Titik kumpul di Kuta, Seminyak & Jimbaran",
    },
    difficulty: { en: "Easy · mostly flat", id: "Ringan · sebagian besar datar" },
    highlights: {
      en: [
        "Kecak ticket booked in advance, so you get a real seat",
        "Padang Padang beach before the crowds arrive for sunset",
        "The temple explained before the performance, not during",
        "Jimbaran seafood dinner on the beach",
      ],
      id: [
        "Tiket Kecak dipesan lebih awal, jadi Anda dapat tempat duduk beneran",
        "Pantai Padang Padang sebelum ramai orang datang untuk sunset",
        "Puranya dijelaskan sebelum pertunjukan, bukan saat berlangsung",
        "Makan malam seafood Jimbaran di tepi pantai",
      ],
    },
    itinerary: [
      {
        time: "13.00",
        title: { en: "Meeting point departure", id: "Berangkat dari titik kumpul" },
        desc: {
          en: "Kuta, Seminyak or Jimbaran.",
          id: "Kuta, Seminyak, atau Jimbaran.",
        },
      },
      {
        time: "14.00",
        title: { en: "Padang Padang Beach", id: "Pantai Padang Padang" },
        desc: {
          en: "Down through the rock cleft to a small, sheltered bay.",
          id: "Menyusuri celah batu menuju teluk kecil yang terlindung.",
        },
      },
      {
        time: "16.00",
        title: { en: "Uluwatu Temple", id: "Pura Uluwatu" },
        desc: {
          en: "A clifftop walk seventy metres above the water, sarong provided.",
          id: "Jalan di atas tebing tujuh puluh meter dari permukaan laut, sarung disediakan.",
        },
      },
      {
        time: "18.00",
        title: { en: "Kecak fire dance", id: "Tari api Kecak" },
        desc: {
          en: "An hour of chanting and fire, with the sunset behind the stage.",
          id: "Sejam penuh kidung dan api, dengan matahari terbenam di belakang panggung.",
        },
      },
      {
        time: "19.30",
        title: { en: "Jimbaran seafood dinner", id: "Makan malam seafood Jimbaran" },
        desc: {
          en: "Grilled fish on the beach. Paid separately so you order what you want.",
          id: "Ikan bakar di pantai. Dibayar terpisah supaya Anda bebas pesan sesuai selera.",
        },
      },
      {
        time: "21.00",
        title: { en: "Return", id: "Perjalanan pulang" },
        desc: {
          en: "Back to your meeting point.",
          id: "Kembali ke titik kumpul.",
        },
      },
    ],
    includes: {
      en: [
        "Air-conditioned minibus, maximum 12 seats",
        "Licensed English-speaking guide",
        "Uluwatu temple entry and Kecak ticket",
        "Sarong loan",
        "Drinking water",
      ],
      id: [
        "Minibus AC, maksimal 12 kursi",
        "Guide berlisensi berbahasa Inggris",
        "Tiket masuk Pura Uluwatu dan tiket Kecak",
        "Pinjaman sarung",
        "Air minum",
      ],
    },
    excludes: {
      en: ["Seafood dinner at Jimbaran", "Hotel pickup outside the meeting points", "Tips"],
      id: ["Makan malam seafood di Jimbaran", "Jemput hotel di luar titik kumpul", "Tip"],
    },
    bring: {
      en: ["A light jacket for the evening", "Sandals", "Cash for dinner"],
      id: ["Jaket tipis untuk malam hari", "Sandal", "Uang tunai untuk makan malam"],
    },
  },
];

/* ------------------------------------------------------------------ */

export const TOURS: Tour[] = [...PRIVATE, ...SHARING];

export const toursByFormat = (format: TourFormat) =>
  TOURS.filter((t) => t.format === format);

export const findTour = (format: string, slug: string) =>
  TOURS.find((t) => t.format === format && t.slug === slug);

export const isTourFormat = (v: string): v is TourFormat =>
  v === "private" || v === "sharing";
