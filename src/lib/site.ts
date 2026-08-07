import type { Lang } from "@/lib/i18n/dictionary";

export const SITE = {
  name: "Vera Bali Tour",
  domain: "vera-hutasoit-tour.vercel.app",
  url: "https://vera-hutasoit-tour.vercel.app",
  whatsapp: "6281234567890",
  whatsappDisplay: "+62 812-3456-7890",
  email: "hello@verabalitour.com",
  address: "Jl. Raya Ubud No. 88, Gianyar, Bali 80571, Indonesia",
  mapsQuery: "Jl.+Raya+Ubud,+Gianyar,+Bali",
  founded: 2014,
} as const;

export const waLink = (text: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

export const WA_PREFILL: Record<Lang, string> = {
  en: "Hi Vera Bali Tour! I'd like to plan a trip to Bali. Could you help me?",
  id: "Halo Vera Bali Tour! Saya mau merencanakan trip ke Bali. Boleh dibantu?",
};

export const ROUTES = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/tour", key: "tour" },
  { href: "/testimonial", key: "testimonial" },
  { href: "/contact", key: "contact" },
] as const;

export type TourKey = "private" | "sharing" | "customized";

export const TOUR_KEYS: TourKey[] = ["private", "sharing", "customized"];

/** Visual identity per tour type — maps onto the 3 palettes. */
export const TOUR_THEME: Record<
  TourKey,
  { accent: string; accentSoft: string; ring: string; text: string; chip: string; grad: string; scene: SceneVariant }
> = {
  private: {
    accent: "bg-lagoon-500",
    accentSoft: "bg-lagoon-50",
    ring: "ring-lagoon-200",
    text: "text-lagoon-700",
    chip: "bg-lagoon-100 text-lagoon-800",
    grad: "from-lagoon-500 to-lagoon-700",
    scene: "temple",
  },
  sharing: {
    accent: "bg-sunbeam-400",
    accentSoft: "bg-sunbeam-50",
    ring: "ring-sunbeam-200",
    text: "text-sunbeam-700",
    chip: "bg-sunbeam-100 text-sunbeam-800",
    grad: "from-sunbeam-400 to-sunbeam-600",
    scene: "boat",
  },
  customized: {
    accent: "bg-coral-500",
    accentSoft: "bg-coral-50",
    ring: "ring-coral-200",
    text: "text-coral-700",
    chip: "bg-coral-100 text-coral-800",
    grad: "from-coral-400 to-coral-600",
    scene: "volcano",
  },
};

export type SceneVariant =
  | "temple"
  | "beach"
  | "terrace"
  | "volcano"
  | "waterfall"
  | "boat"
  | "cliff"
  | "village";

export const DESTINATION_SCENES: SceneVariant[] = [
  "terrace",
  "cliff",
  "volcano",
  "beach",
  "waterfall",
  "village",
];

/** Destination options offered inside the tour request modal. */
export const DESTINATION_OPTIONS: { id: string; label: Record<Lang, string> }[] = [
  { id: "ubud", label: { en: "Ubud & Highlands", id: "Ubud & Dataran Tinggi" } },
  { id: "penida", label: { en: "Nusa Penida", id: "Nusa Penida" } },
  { id: "batur", label: { en: "Mount Batur Sunrise", id: "Sunrise Gunung Batur" } },
  { id: "uluwatu", label: { en: "Uluwatu & South", id: "Uluwatu & Bali Selatan" } },
  { id: "waterfalls", label: { en: "North Waterfalls", id: "Air Terjun Utara" } },
  { id: "sidemen", label: { en: "Sidemen & East Bali", id: "Sidemen & Bali Timur" } },
  { id: "lombok", label: { en: "Lombok & Gili", id: "Lombok & Gili" } },
  { id: "surprise", label: { en: "Surprise me", id: "Terserah kalian" } },
];

export const SOCIALS = [
  { name: "Instagram", href: "https://instagram.com", handle: "@verabalitour" },
  { name: "TikTok", href: "https://tiktok.com", handle: "@verabalitour" },
  { name: "YouTube", href: "https://youtube.com", handle: "Vera Bali Tour" },
  { name: "Facebook", href: "https://facebook.com", handle: "verabalitour" },
];

export type Testimonial = {
  id: string;
  name: string;
  country: string;
  flag: string;
  tour: TourKey;
  rating: number;
  date: string;
  featured?: boolean;
  quote: Record<Lang, string>;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Lim",
    country: "Singapore",
    flag: "🇸🇬",
    tour: "private",
    rating: 5,
    date: "2026-06-14",
    featured: true,
    quote: {
      en: "We had three generations in one car — my parents, us, and a five-year-old — and I genuinely expected it to be a disaster. Komang planned around all of us. He found shaded parking so my dad could rest, skipped the 300-step temple without making us feel like we'd missed something, and knew a warung where the kid could actually eat. The itinerary changed twice mid-day and nobody blinked. That flexibility is the whole product.",
      id: "Kami tiga generasi dalam satu mobil — orang tua saya, kami, dan anak lima tahun — dan jujur saya sudah siap kacau. Komang menyusun semuanya menyesuaikan kami. Dia cari parkir teduh biar ayah saya bisa istirahat, melewati pura dengan 300 anak tangga tanpa bikin kami merasa kehilangan sesuatu, dan tahu warung yang makanannya cocok buat anak kecil. Itinerary berubah dua kali di tengah hari dan tidak ada yang panik. Fleksibilitas itulah produk sesungguhnya.",
    },
  },
  {
    id: "t2",
    name: "Tom Bracken",
    country: "Australia",
    flag: "🇦🇺",
    tour: "sharing",
    rating: 5,
    date: "2026-05-30",
    featured: true,
    quote: {
      en: "Solo traveller here, and sharing tours are usually a coach full of people staring at their phones. This was ten of us in a minibus and by the second stop we were swapping numbers. Made is a proper guide — he explained the offerings at Tirta Empul in a way that actually made sense instead of the usual two-sentence version. Left with a decent tan and four people I still message.",
      id: "Saya solo traveler, dan biasanya sharing tour itu isinya satu bus penuh orang yang sibuk main HP. Kali ini kami sepuluh orang dalam minibus, dan di pemberhentian kedua sudah tukeran nomor. Made itu guide beneran — dia menjelaskan sesajen di Tirta Empul dengan cara yang benar-benar masuk akal, bukan versi dua kalimat seperti biasanya. Pulang bawa kulit kecokelatan dan empat teman baru yang sampai sekarang masih saya chat.",
    },
  },
  {
    id: "t3",
    name: "Yuki Tanaka",
    country: "Japan",
    flag: "🇯🇵",
    tour: "customized",
    rating: 5,
    date: "2026-07-02",
    featured: true,
    quote: {
      en: "Nine days, Bali plus Lombok, planned entirely over WhatsApp with Vera. She pushed back on two things I wanted — said the driving would ruin the day — and she was right both times. Ferries, hotels, a private chef for our anniversary dinner, all handled. Receiving a full day-by-day plan with realistic timings, and then having reality match it, is rarer than it should be.",
      id: "Sembilan hari, Bali plus Lombok, semuanya direncanakan lewat WhatsApp bareng Vera. Dia sempat menolak dua permintaan saya — katanya perjalanannya bakal terlalu jauh dan merusak hari — dan ternyata dia benar dua-duanya. Kapal, hotel, sampai private chef untuk makan malam anniversary kami, semua diurus. Dapat rencana harian lengkap dengan estimasi waktu yang realistis, lalu kenyataannya benar-benar sesuai, itu jarang sekali terjadi.",
    },
  },
  {
    id: "t4",
    name: "Elena Rossi",
    country: "Italy",
    flag: "🇮🇹",
    tour: "private",
    rating: 5,
    date: "2026-04-21",
    quote: {
      en: "Booked the day before, confirmed in twenty minutes, picked up at 07.55 for an 08.00 start. That punctuality alone earned the five stars.",
      id: "Booking sehari sebelumnya, dikonfirmasi dalam dua puluh menit, dijemput jam 07.55 untuk start jam 08.00. Ketepatan waktunya saja sudah layak lima bintang.",
    },
  },
  {
    id: "t5",
    name: "Daniel Mwangi",
    country: "Kenya",
    flag: "🇰🇪",
    tour: "customized",
    rating: 5,
    date: "2026-03-11",
    quote: {
      en: "They arranged a photographer for our proposal at Lempuyang without telling my partner. Flawless secrecy, beautiful photos, and the price was exactly what was quoted.",
      id: "Mereka menyiapkan fotografer untuk momen lamaran kami di Lempuyang tanpa ketahuan pasangan saya. Rahasianya terjaga rapi, fotonya bagus, dan harganya persis seperti yang ditawarkan.",
    },
  },
  {
    id: "t6",
    name: "Priya Nair",
    country: "India",
    flag: "🇮🇳",
    tour: "sharing",
    rating: 4,
    date: "2026-02-08",
    quote: {
      en: "Great value and a lovely guide. Only note: the fixed route means you can't linger, so if you're a slow photographer go private instead. They told me this upfront, which I appreciated.",
      id: "Harganya sepadan dan guide-nya menyenangkan. Satu catatan: rutenya tetap, jadi tidak bisa berlama-lama. Kalau Anda tipe yang suka foto lama, mending ambil private. Mereka sudah bilang ini dari awal, dan saya menghargainya.",
    },
  },
  {
    id: "t7",
    name: "Marcus Weber",
    country: "Germany",
    flag: "🇩🇪",
    tour: "private",
    rating: 5,
    date: "2026-01-19",
    quote: {
      en: "The Batur sunrise trek was organised properly — headlamps, a pace that suited us, and hot tea at the top. No upselling at any point during the entire day.",
      id: "Trekking sunrise Batur diorganisir dengan rapi — headlamp disiapkan, ritme jalannya menyesuaikan kami, dan ada teh hangat di puncak. Tidak ada jualan tambahan sama sekali sepanjang hari.",
    },
  },
  {
    id: "t8",
    name: "Chloé Dubois",
    country: "France",
    flag: "🇫🇷",
    tour: "customized",
    rating: 5,
    date: "2025-12-27",
    quote: {
      en: "Vegan for the whole family and I barely had to explain twice. Every restaurant they picked had real options, not a sad plate of rice.",
      id: "Satu keluarga kami vegan dan saya nyaris tidak perlu menjelaskan dua kali. Setiap restoran pilihan mereka punya menu yang beneran, bukan sekadar sepiring nasi.",
    },
  },
  {
    id: "t9",
    name: "Ana Beatriz",
    country: "Brazil",
    flag: "🇧🇷",
    tour: "sharing",
    rating: 5,
    date: "2025-11-15",
    quote: {
      en: "Nusa Penida in one day sounds brutal but they timed the boat perfectly and we beat every crowd at Kelingking. Worth the 6am alarm.",
      id: "Nusa Penida dalam sehari kedengarannya berat, tapi mereka mengatur jadwal kapalnya dengan pas dan kami tiba di Kelingking sebelum ramai. Bangun jam 6 pagi jadi terasa sepadan.",
    },
  },
  {
    id: "t10",
    name: "James O'Connor",
    country: "Ireland",
    flag: "🇮🇪",
    tour: "private",
    rating: 5,
    date: "2025-10-04",
    quote: {
      en: "Rain hit at 11am. Our guide flipped the whole route around and we ended up at a coffee plantation while it poured. Barely lost an hour.",
      id: "Hujan turun jam 11 pagi. Guide kami langsung membalik seluruh rute dan kami malah berteduh di perkebunan kopi saat hujan deras. Nyaris tidak kehilangan waktu satu jam pun.",
    },
  },
  {
    id: "t11",
    name: "Nadia Hakim",
    country: "Malaysia",
    flag: "🇲🇾",
    tour: "customized",
    rating: 5,
    date: "2025-09-22",
    quote: {
      en: "They built prayer times into the schedule without me having to ask twice, and found halal restaurants along every route. Small thing, big deal.",
      id: "Mereka memasukkan waktu salat ke dalam jadwal tanpa saya perlu minta dua kali, dan mencarikan restoran halal di setiap rute. Hal kecil, tapi artinya besar.",
    },
  },
  {
    id: "t12",
    name: "Sofia Hernández",
    country: "Mexico",
    flag: "🇲🇽",
    tour: "sharing",
    rating: 4,
    date: "2025-08-30",
    quote: {
      en: "Good day out and honestly priced. The minibus was full but never cramped, and the guide made sure everyone got their photo at every stop.",
      id: "Harinya menyenangkan dan harganya jujur. Minibusnya penuh tapi tidak pernah terasa sempit, dan guide-nya memastikan semua orang kebagian foto di setiap lokasi.",
    },
  },
];

export const FEATURED_TESTIMONIALS = TESTIMONIALS.filter((t) => t.featured);
