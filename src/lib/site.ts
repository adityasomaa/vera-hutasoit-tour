import type { Lang } from "@/lib/i18n/dictionary";
import type { PhotoKey } from "@/lib/photos";

export const SITE = {
  name: "Vera Bali Tour",
  domain: "vera-hutasoit-tour.vercel.app",
  url: "https://vera-hutasoit-tour.vercel.app",
  whatsapp: "6282114990113",
  whatsappDisplay: "+62 821 1499 0113",
  email: "hello@verabalitour.com",
  address: "Jl. Raya Ubud No. 88, Gianyar, Bali 80571, Indonesia",
  mapsQuery: "Jl.+Raya+Ubud,+Gianyar,+Bali",
  founded: 2014,
} as const;

/** Every booking action on the site ends up here. */
export const waLink = (text: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

export const WA_GENERAL: Record<Lang, string> = {
  en: "Hi Vera Bali Tour! I'd like to plan a trip to Bali. Could you help me?",
  id: "Halo Vera Bali Tour! Saya mau merencanakan trip ke Bali. Boleh dibantu?",
};

/** Booking message for a specific tour. */
export const waBookTour = (lang: Lang, tourName: string, price: string) =>
  lang === "id"
    ? `Halo Vera Bali Tour! Saya mau booking tur "${tourName}" (${price}). Boleh dibantu untuk tanggal dan detailnya?`
    : `Hi Vera Bali Tour! I'd like to book the "${tourName}" tour (${price}). Could you help me with dates and details?`;

export const ROUTES = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/tour", key: "tour" },
  { href: "/testimonial", key: "testimonial" },
  { href: "/contact", key: "contact" },
] as const;

/**
 * The three ways to travel. Two of them are browsable catalogues with their
 * own pages; the customized one opens the request form instead.
 */
export type TourKey = "private" | "sharing" | "customized";

export const TOUR_KEYS: TourKey[] = ["private", "sharing", "customized"];

export const TOUR_ROUTE: Record<TourKey, string | null> = {
  private: "/tour/private",
  sharing: "/tour/sharing",
  customized: null, // opens the request modal
};

/** Flat colour only — one accent per format, no gradients. */
export const TOUR_ACCENT: Record<
  TourKey,
  { dot: string; text: string; chip: string; photo: PhotoKey }
> = {
  private: {
    dot: "bg-lagoon",
    text: "text-lagoon-deep",
    chip: "bg-lagoon-soft text-lagoon-deep",
    photo: "ubudSwing",
  },
  sharing: {
    dot: "bg-sunbeam",
    text: "text-sunbeam-deep",
    chip: "bg-sunbeam-soft text-sunbeam-deep",
    photo: "beachBoats",
  },
  customized: {
    dot: "bg-coral",
    text: "text-coral-deep",
    chip: "bg-coral-soft text-coral-deep",
    photo: "templeGates",
  },
};

/** Home hero slider — iconic Bali, alternating dark and light frames. */
export const HERO_SLIDES: PhotoKey[] = [
  "heroTerrace",
  "heroKelingking",
  "heroLempuyang",
  "heroBatur",
  "heroUluwatu",
];

/** The "where we can take you" section on the home page. */
export const LOCATIONS: { id: string; photo: PhotoKey }[] = [
  { id: "ubud", photo: "locUbud" },
  { id: "penida", photo: "locPenida" },
  { id: "batur", photo: "locBatur" },
  { id: "uluwatu", photo: "locUluwatu" },
  { id: "waterfalls", photo: "locWaterfall" },
  { id: "sidemen", photo: "locSidemen" },
];

/** Destination options offered inside the customized request form. */
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
];

export type Testimonial = {
  id: string;
  name: string;
  country: string;
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
    tour: "private",
    rating: 5,
    date: "2026-06-14",
    featured: true,
    quote: {
      en: "We had three generations in one car and I expected a disaster. Komang planned around all of us: shaded parking so my dad could rest, skipping the 300-step temple without making us feel we had missed something, and a warung where the five-year-old would actually eat. The itinerary changed twice mid-day and nobody blinked.",
      id: "Kami tiga generasi dalam satu mobil dan saya sudah siap kacau. Komang menyusun semuanya menyesuaikan kami: parkir teduh biar ayah saya bisa istirahat, melewati pura dengan 300 anak tangga tanpa bikin kami merasa kehilangan sesuatu, dan warung yang makanannya cocok buat anak lima tahun. Itinerary berubah dua kali di tengah hari dan tidak ada yang panik.",
    },
  },
  {
    id: "t2",
    name: "Tom Bracken",
    country: "Australia",
    tour: "sharing",
    rating: 5,
    date: "2026-05-30",
    featured: true,
    quote: {
      en: "Solo traveller here, and shared tours are usually a coach full of people staring at their phones. This was ten of us in a minibus and by the second stop we were swapping numbers. Made explained the offerings at Tirta Empul in a way that actually made sense.",
      id: "Saya solo traveler, dan biasanya sharing tour itu satu bus penuh orang yang sibuk main HP. Kali ini kami sepuluh orang dalam minibus, dan di pemberhentian kedua sudah tukeran nomor. Made menjelaskan sesajen di Tirta Empul dengan cara yang benar-benar masuk akal.",
    },
  },
  {
    id: "t3",
    name: "Yuki Tanaka",
    country: "Japan",
    tour: "customized",
    rating: 5,
    date: "2026-07-02",
    featured: true,
    quote: {
      en: "Nine days, Bali plus Lombok, planned entirely over WhatsApp with Vera. She pushed back on two things I wanted, said the driving would ruin the day, and she was right both times. Ferries, hotels and a private chef for our anniversary, all handled.",
      id: "Sembilan hari, Bali plus Lombok, semuanya direncanakan lewat WhatsApp bareng Vera. Dia sempat menolak dua permintaan saya, katanya perjalanannya terlalu jauh dan merusak hari, dan ternyata dia benar dua-duanya. Kapal, hotel, sampai private chef untuk anniversary kami, semua diurus.",
    },
  },
  {
    id: "t4",
    name: "Elena Rossi",
    country: "Italy",
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
    tour: "customized",
    rating: 5,
    date: "2026-03-11",
    quote: {
      en: "They arranged a photographer for our proposal at Lempuyang without telling my partner. Flawless secrecy, and the price was exactly what was quoted.",
      id: "Mereka menyiapkan fotografer untuk momen lamaran kami di Lempuyang tanpa ketahuan pasangan saya. Rahasianya terjaga rapi, dan harganya persis seperti yang ditawarkan.",
    },
  },
  {
    id: "t6",
    name: "Priya Nair",
    country: "India",
    tour: "sharing",
    rating: 4,
    date: "2026-02-08",
    quote: {
      en: "Great value and a lovely guide. The fixed route means you cannot linger, so if you are a slow photographer go private instead. They told me this upfront, which I appreciated.",
      id: "Harganya sepadan dan guide-nya menyenangkan. Rutenya tetap, jadi tidak bisa berlama-lama. Kalau Anda tipe yang suka foto lama, mending ambil private. Mereka sudah bilang ini dari awal, dan saya menghargainya.",
    },
  },
  {
    id: "t7",
    name: "Marcus Weber",
    country: "Germany",
    tour: "private",
    rating: 5,
    date: "2026-01-19",
    quote: {
      en: "The Batur sunrise trek was organised properly. Headlamps, a pace that suited us, hot tea at the top, and no upselling at any point in the day.",
      id: "Trekking sunrise Batur diorganisir dengan rapi. Headlamp disiapkan, ritme jalannya menyesuaikan kami, ada teh hangat di puncak, dan tidak ada jualan tambahan sepanjang hari.",
    },
  },
  {
    id: "t8",
    name: "Chloé Dubois",
    country: "France",
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
    tour: "sharing",
    rating: 5,
    date: "2025-11-15",
    quote: {
      en: "Nusa Penida in one day sounds brutal but they timed the boat perfectly and we beat every crowd at Kelingking. Worth the early alarm.",
      id: "Nusa Penida dalam sehari kedengarannya berat, tapi mereka mengatur jadwal kapalnya dengan pas dan kami tiba di Kelingking sebelum ramai. Bangun pagi jadi terasa sepadan.",
    },
  },
  {
    id: "t10",
    name: "James O'Connor",
    country: "Ireland",
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
    tour: "customized",
    rating: 5,
    date: "2025-09-22",
    quote: {
      en: "They built prayer times into the schedule without me having to ask twice, and found halal restaurants along every route.",
      id: "Mereka memasukkan waktu salat ke dalam jadwal tanpa saya perlu minta dua kali, dan mencarikan restoran halal di setiap rute.",
    },
  },
  {
    id: "t12",
    name: "Sofia Hernández",
    country: "Mexico",
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
