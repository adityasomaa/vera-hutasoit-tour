/**
 * VERA BALI TOUR — bilingual dictionary.
 *
 * `en` is the source of truth and the default. `id` is written in a warm,
 * conversational-but-polite register: "Anda" stays, the sentence shapes relax.
 */

export type Lang = "en" | "id";

export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "id", label: "Bahasa Indonesia", short: "ID" },
];

const en = {
  brand: {
    name: "Vera Bali Tour",
    tagline: "Local guides, honest prices, unhurried days.",
  },

  nav: {
    home: "Home",
    about: "About",
    tour: "Tour",
    testimonial: "Testimonial",
    contact: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    close: "Close",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    cta: "Book on WhatsApp",
    allTours: "All tours",
  },

  tourTypes: {
    private: {
      name: "Private Tour",
      short: "Your own car and driver-guide",
      desc: "A car, a driver-guide and a day that belongs only to your group. Routes bend around you.",
      price: "from IDR 850,000",
      unit: "per car",
      action: "Browse private tours",
    },
    sharing: {
      name: "Sharing Tour",
      short: "Small group, fixed route",
      desc: "Join up to eleven other travellers on a set route. Same guides, tickets included, friendlier price.",
      price: "from IDR 245,000",
      unit: "per person",
      action: "Browse sharing tours",
    },
    customized: {
      name: "Customized Tour",
      short: "Built around your list",
      desc: "Send us your dates, your wishlist and your budget. We reply with a real day-by-day plan.",
      price: "quoted per plan",
      unit: "tailored",
      action: "Request a custom tour",
    },
  },

  home: {
    hero: {
      eyebrow: "Licensed local operator, since 2014",
      title: "Explore Bali with guides who live here",
      subtitle:
        "A small Bali-born team running private, sharing and fully custom day trips. Honest prices and unhurried days.",
      ctaPrimary: "Book on WhatsApp",
      ctaSecondary: "See our tours",
      stat1: "12,400 guests guided",
      stat2: "4.9 average rating",
      stat3: "Replies in about 15 minutes",
      slideLabel: "Show slide",
      pause: "Pause slideshow",
      play: "Play slideshow",
    },
    about: {
      eyebrow: "About us",
      title: "From one car in 2014 to a team of eighteen",
      body: [
        "Vera grew up in Gianyar, ten minutes from a rice terrace tourists now queue to photograph. After years driving for large agencies she kept hitting the same problem: the schedule always won and the guest always lost.",
        "So she started something smaller. One rule, then and now: the itinerary bends around the guest, never the other way round.",
      ],
      points: [
        { label: "Local guides", value: "Born and licensed here" },
        { label: "Flat pricing", value: "Fuel, parking and tolls inside" },
        { label: "Day-of changes", value: "Free on private and custom trips" },
      ],
      cta: "Read our story",
    },
    packages: {
      eyebrow: "Tour packages",
      title: "Three ways to travel",
      subtitle: "Same guides, same care. Pick the format that fits your budget and how private you want it.",
    },
    locations: {
      eyebrow: "Destinations",
      title: "Where we can take you",
      subtitle:
        "Every route below can be combined into a single day or spread across several. Tell us which ones you want and we will build the order around the traffic and the light.",
      items: [
        {
          name: "Ubud & The Highlands",
          area: "Gianyar",
          desc: "Rice terraces, the monkey forest, holy springs and a coffee stop with a view down the valley.",
        },
        {
          name: "Nusa Penida",
          area: "45 min by boat",
          desc: "Kelingking cliff, Broken Beach and Crystal Bay, reached on the first boat before the crowds.",
        },
        {
          name: "Mount Batur",
          area: "Kintamani",
          desc: "A dark start, a two-hour climb and breakfast cooked in a volcanic steam vent at 1,717 metres.",
        },
        {
          name: "Uluwatu & The South",
          area: "Badung",
          desc: "Clifftop temple, the Kecak fire dance at sunset and grilled seafood on Jimbaran sand.",
        },
        {
          name: "Northern Waterfalls",
          area: "Buleleng",
          desc: "Sekumpul, Banyumala and Git Git. The green, cool, far-from-traffic side of the island.",
        },
        {
          name: "Sidemen & East Bali",
          area: "Karangasem",
          desc: "Weaving villages, water palaces and the quiet Bali that people came for in the eighties.",
        },
      ],
    },
    testimonial: {
      eyebrow: "Testimonials",
      title: "What our guests say",
      cta: "Read all reviews",
    },
    contact: {
      eyebrow: "Get in touch",
      title: "Tell us what you have in mind",
      subtitle:
        "Fill this in and it opens WhatsApp with your details ready to send. Or message us directly, whichever you prefer.",
      direct: "Message us directly",
    },
  },

  about: {
    hero: {
      eyebrow: "About us",
      title: "A small Bali tour operator, running since 2014",
      subtitle:
        "Vera Bali Tour began in 2014 in a Denpasar living room. Ten years later we are still small on purpose. The moment we grow past what we can personally check, the trips stop feeling like ours.",
    },
    story: {
      eyebrow: "Our story",
      title: "How Vera Bali Tour started",
      body: [
        "Vera grew up in Gianyar, ten minutes from a rice terrace that tourists now queue to photograph. After years of driving for large agencies, she kept running into the same problem: the schedule always won, and the guest always lost.",
        "So in 2014 she started something smaller. One car, one phone number, and a rule that the itinerary bends around the guest rather than the other way round. The first month brought four bookings. All four sent friends.",
        "Today we are a team of eighteen: drivers, guides, planners and one very patient office cat. We still answer every message ourselves. We have simply gotten better at knowing which beach is calm on a windy Tuesday.",
      ],
    },
    values: {
      eyebrow: "Our values",
      title: "Three things we never compromise on",
      items: [
        {
          title: "Nobody gets rushed",
          desc: "If a place moves you, stay. We plan buffer into every route so a long stop never wrecks the day.",
        },
        {
          title: "No commission stops",
          desc: "We are not paid to park at a jewellery showroom. If we take you somewhere, it is because it is worth your time.",
        },
        {
          title: "Locals paid properly",
          desc: "Our guides earn above the island average and keep every rupiah of their tips.",
        },
      ],
    },
    timeline: {
      eyebrow: "Our journey",
      title: "Milestones",
      items: [
        { year: "2014", title: "One car, one driver", desc: "Vera starts taking bookings from a notebook and a second-hand Avanza." },
        { year: "2016", title: "First sharing routes", desc: "Demand from solo travellers pushes us to open small, capped group days." },
        { year: "2018", title: "Licensed and insured", desc: "Full operator licence, passenger insurance and four more cars join the fleet." },
        { year: "2020", title: "The quiet years", desc: "We keep every guide on partial pay and spend the time re-scouting all 38 routes." },
        { year: "2022", title: "Back, and busier", desc: "Multi-day custom trips overtake day tours for the first time." },
        { year: "2025", title: "Eighteen people strong", desc: "Nusa Penida and Lombok extensions go live. Still answering our own WhatsApp." },
      ],
    },
    team: {
      eyebrow: "The people",
      title: "Meet the team",
      items: [
        { name: "Vera Hutasoit", role: "Founder & Head Planner", bio: "Builds every custom itinerary personally. Will argue with you about the best sunrise spot." },
        { name: "Made Suparta", role: "Lead Guide", bio: "Licensed since 2009. Speaks Balinese, Indonesian, English and fluent temple etiquette." },
        { name: "Ayu Pradnya", role: "Guest Relations", bio: "The one who replies at 11pm. Keeps every booking and ferry ticket in order." },
        { name: "Komang Bagus", role: "Senior Driver", bio: "Twelve years, zero incidents. Knows a back road out of every jam in Denpasar." },
      ],
    },
    certs: {
      title: "Licensed, insured, accountable",
      items: ["Registered tour operator", "Passenger insurance covered", "Certified local guides", "Verified payment partner"],
    },
    cta: {
      title: "Ready to travel with us?",
      subtitle: "Tell us the trip you are imagining. We will be honest about what is possible.",
    },
  },

  tour: {
    hero: {
      eyebrow: "Our tours",
      title: "Three formats. One island. Your call.",
      subtitle:
        "Every tour is run by our own licensed guides and priced flat. Browse the private and sharing catalogues, or send us a wishlist and we will build something.",
    },
    compare: {
      eyebrow: "Comparison",
      title: "Which format fits you",
      headers: ["", "Private", "Sharing", "Customized"],
      rows: [
        { label: "Starting price", values: ["IDR 850,000 / car", "IDR 245,000 / person", "Quoted"] },
        { label: "Group", values: ["Only your group", "Max 12 people", "Any size"] },
        { label: "Route changes on the day", values: ["Yes, anytime", "Fixed route", "Yes, anytime"] },
        { label: "Pickup", values: ["Your hotel", "Meeting point", "Anywhere"] },
        { label: "Multi-day", values: ["On request", "No", "Built for it"] },
        { label: "Best for", values: ["Families and couples", "Solo and budget", "Special occasions"] },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Frequently asked questions",
      items: [
        { q: "How far ahead should I book?", a: "For day tours, two or three days is usually enough. For Nusa Penida, Batur sunrise or anything in July, August and December, give us one to two weeks so we can hold the right boat and guide." },
        { q: "What is actually included?", a: "Car, fuel, parking, tolls, driver-guide and their meals. On private tours the entrance tickets and your own meals are separate; on sharing tours they are already bundled in. Every tour page lists it plainly." },
        { q: "Can I change the plan mid-trip?", a: "On private and customized tours, absolutely. Tell your guide and we reshuffle. Sharing tours follow a fixed route because other guests are on the same schedule." },
        { q: "How do I pay?", a: "A small deposit by bank transfer, Wise or PayPal confirms your date. The balance is paid in cash or by transfer after the tour. We never ask for full payment upfront." },
        { q: "What if it rains?", a: "Bali rain is usually short. Your guide will flip the route order so you are indoors during the worst of it. If a boat crossing is cancelled for weather, you get a full refund or a free reschedule." },
        { q: "Is it suitable for kids or older parents?", a: "Yes. Tell us when you message and we will pick flatter stops, add rest breaks, arrange a child seat and skip anything with a 300-step staircase." },
        { q: "What is your cancellation policy?", a: "Free cancellation up to 24 hours before pickup, deposit fully refunded. Inside 24 hours we keep the deposit, unless it is a medical or flight issue, in which case we just reschedule." },
      ],
    },
    cta: {
      title: "Still deciding?",
      subtitle: "Message us and we will tell you which format actually suits your plan.",
    },
  },

  tourList: {
    private: {
      eyebrow: "Private tours",
      title: "Your own car, your own pace",
      subtitle:
        "One vehicle, one driver-guide, and a day that belongs to your group alone. Prices are per car, so a family of five pays the same as a couple.",
    },
    sharing: {
      eyebrow: "Sharing tours",
      title: "Small groups, fixed departures",
      subtitle:
        "Twelve seats maximum, one licensed guide and all the entrance tickets already inside the price. The easy option for solo travellers.",
    },
    count: "tours available",
    viewDetail: "View details",
    from: "from",
    empty: "No tours listed yet. Message us and we will build one.",
    customPrompt: {
      title: "Looking for something different?",
      body: "Tell us what you had in mind instead and we will put a plan together.",
      cta: "Request a custom tour",
    },
  },

  tourDetail: {
    back: "Back to",
    overview: "Overview",
    highlights: "Highlights",
    itinerary: "Itinerary",
    includes: "Included",
    excludes: "Not included",
    bring: "What to bring",
    book: "Book on WhatsApp",
    bookNote: "Opens WhatsApp with this tour already filled in.",
    facts: {
      duration: "Duration",
      group: "Group size",
      pickup: "Pickup",
      difficulty: "Difficulty",
      area: "Area",
      price: "Price",
    },
    otherTours: "Other tours in this format",
    ask: "Have a question first?",
    askCta: "Ask on WhatsApp",
  },

  testimonial: {
    hero: {
      eyebrow: "Testimonials",
      title: "Twelve thousand guests, and counting",
      subtitle:
        "We ask every guest for honest feedback after their trip. Here is what came back.",
    },
    stats: [
      { value: 4.9, suffix: "/5", label: "Average rating", decimals: 1 },
      { value: 2870, suffix: "+", label: "Written reviews", decimals: 0 },
      { value: 96, suffix: "%", label: "Would book again", decimals: 0 },
      { value: 41, suffix: "", label: "Countries hosted", decimals: 0 },
    ],
    grid: {
      eyebrow: "Reviews",
      title: "What our guests say",
      filterAll: "All tours",
      empty: "No reviews in this category yet.",
    },
    verified: "Verified guest",
    cta: {
      title: "Ready to plan your trip?",
      subtitle: "Tell us your dates and we will put a route together.",
    },
  },

  contact: {
    hero: {
      eyebrow: "Contact",
      title: "Get in touch",
      subtitle:
        "WhatsApp is fastest. We usually reply within fifteen minutes between 08.00 and 22.00 Bali time. Email works too, just a little slower.",
    },
    cards: [
      { title: "WhatsApp", value: "+62 821 1499 0113", note: "Fastest, 08.00 to 22.00 WITA", action: "Open chat" },
      { title: "Email", value: "hello@verabalitour.com", note: "Replies within 12 hours", action: "Send email" },
      { title: "Office", value: "Jl. Raya Ubud No. 88, Gianyar, Bali 80571", note: "Visits by appointment", action: "Open in Maps" },
    ],
    hours: {
      title: "When we are around",
      items: [
        { day: "Monday to Friday", time: "08.00 – 22.00" },
        { day: "Saturday", time: "08.00 – 20.00" },
        { day: "Sunday", time: "09.00 – 18.00" },
        { day: "Public holidays", time: "WhatsApp only" },
      ],
      note: "All times are WITA (GMT+8). Guests already on tour can reach their guide at any hour.",
    },
    form: {
      title: "Send us a message",
      subtitle: "This opens WhatsApp with everything below already written out.",
      name: "Your name",
      namePh: "e.g. Sarah Lim",
      email: "Email",
      emailPh: "you@email.com",
      dates: "Travel dates",
      datesPh: "e.g. 12–18 September",
      pax: "How many people",
      paxPh: "e.g. 2 adults, 1 child",
      interest: "Which tour interests you",
      interestOpts: [
        "Not sure yet",
        "Private tour",
        "Sharing tour",
        "Customized tour",
        "Something else",
      ],
      message: "Message",
      messagePh: "Tell us anything. Dates, questions, wild ideas.",
      submit: "Open WhatsApp",
      required: "Required",
      invalidEmail: "That email does not look right",
      note: "Nothing is stored on this site. The form only composes your message.",
    },
    map: {
      title: "Find us",
      note: "Ubud office, 15 minutes from Central Ubud",
      cta: "Get directions",
    },
    social: { title: "Elsewhere" },
  },

  modal: {
    title: "Request a custom tour",
    subtitle: "Tell us what you are after. No payment, no commitment.",
    step: "Step",
    of: "of",
    next: "Next",
    back: "Back",
    submit: "Open WhatsApp",
    close: "Close request form",
    steps: ["Your trip", "About you"],
    outro: "Pressing the button opens WhatsApp with all of this already written out. Nothing is stored here.",
    fields: {
      destinations: "Where do you want to go?",
      destinationsHint: "Pick as many as you like, or none and we will suggest.",
      date: "Preferred start date",
      days: "How many days",
      pax: "How many people",
      paxAdults: "Adults",
      paxKids: "Children",
      budget: "Rough budget per person",
      budgetOpts: ["Not sure yet", "Under IDR 1M", "IDR 1M – 3M", "IDR 3M – 7M", "Above IDR 7M"],
      name: "Your name",
      namePh: "e.g. Sarah Lim",
      email: "Email",
      emailPh: "you@email.com",
      country: "Country",
      countryPh: "e.g. Singapore",
      notes: "Anything else we should know?",
      notesPh: "Dietary needs, mobility, celebrating something, must-see spots.",
    },
    errors: {
      required: "This one is required",
      email: "That email does not look right",
      pax: "At least one traveller, please",
    },
  },

  cookie: {
    title: "We use a few cookies",
    body: "Necessary ones keep the site working. The rest only load if you say yes.",
    accept: "Accept all",
    reject: "Reject non-essential",
    customize: "Customize",
    save: "Save choices",
    policyLink: "Privacy Policy",
    manage: "Cookie settings",
    savedToast: "Cookie preferences saved.",
    categories: {
      necessary: { title: "Strictly necessary", desc: "Language choice, your cookie decision and basic security. These cannot be switched off.", always: "Always on" },
      preferences: { title: "Preferences", desc: "Remembers small things, like the last tour you looked at." },
      analytics: { title: "Analytics", desc: "Anonymous page counts so we know which pages actually help people plan." },
      marketing: { title: "Marketing", desc: "Lets us measure ads and avoid showing you the same one eleven times." },
    },
  },

  floating: {
    whatsapp: "Chat on WhatsApp",
    language: "Change language",
    languageLabel: "Language",
    top: "Back to top",
  },

  loader: {
    welcome: "Welcome to",
    tagline: "Bali tours since 2014",
    loading: "Loading",
  },

  footer: {
    blurb: "A small, licensed Bali tour operator running private, sharing and fully custom trips since 2014.",
    explore: "Explore",
    tours: "Tours",
    legal: "Legal",
    contact: "Get in touch",
    rights: "All rights reserved.",
    disclaimer: "Vera Bali Tour is a demonstration brand. Prices, reviews and illustrations are placeholders.",
  },

  legal: {
    updated: "Last updated",
    updatedDate: "7 August 2026",
    toc: "On this page",
    backHome: "Back to home",
    privacy: {
      title: "Privacy Policy",
      intro:
        "This policy explains what Vera Bali Tour collects when you use this website or book a trip, why we collect it, and what you can ask us to do with it.",
      sections: [
        {
          title: "1. Who we are",
          body: [
            "Vera Bali Tour is a tour operator based at Jl. Raya Ubud No. 88, Gianyar, Bali 80571, Indonesia. We are the data controller for information collected through this website.",
            "For any privacy question, write to hello@verabalitour.com and mark the subject \"Privacy\". A human reads it.",
          ],
        },
        {
          title: "2. What we collect",
          body: [
            "Information you give us: your name, email, travel dates, group size, budget range and any notes you type into our forms.",
            "Because our forms hand off to WhatsApp rather than a server, most of what you type never reaches us until you choose to press send in WhatsApp itself.",
            "Information collected automatically: pages viewed, approximate region, device type and session duration, and only if you accepted analytics cookies.",
            "We never ask for passport scans, card numbers or bank credentials through this website.",
          ],
        },
        {
          title: "3. Why we use it",
          body: [
            "To answer your enquiry and prepare an itinerary and quote.",
            "To run the trip you booked, which means sharing your first name and pickup point with the assigned guide and driver, and your name with ferry operators where a manifest is legally required.",
            "To improve the website, based on aggregated and anonymous usage patterns.",
          ],
        },
        {
          title: "4. Cookies",
          body: [
            "Strictly necessary cookies store your language choice and your cookie decision. They cannot be switched off because the site would not work correctly without them.",
            "Preference, analytics and marketing cookies are off by default and only activate when you enable them in the cookie banner.",
            "You can change or withdraw your choice at any time using the \"Cookie settings\" link in the footer. Withdrawing consent removes the related cookies immediately.",
          ],
        },
        {
          title: "5. Who we share it with",
          body: [
            "Our own guides and drivers, limited to what they need to collect you.",
            "Service providers who host this site and process payments. They act on our instructions only.",
            "Authorities, where Indonesian law requires it, for example passenger manifests for sea crossings.",
            "We do not sell your data. We never have and we do not plan to start.",
          ],
        },
        {
          title: "6. How long we keep it",
          body: [
            "Enquiries that do not become bookings: 12 months, then deleted.",
            "Completed bookings: 5 years, because Indonesian tax and tourism rules require it.",
            "Analytics data: 14 months in aggregated form.",
          ],
        },
        {
          title: "7. Your rights",
          body: [
            "You can ask us for a copy of your data, ask us to correct it, ask us to delete it, or ask us to stop using it for marketing.",
            "Send the request to hello@verabalitour.com. We reply within 30 days and we do not charge for it.",
            "If you are in the EEA or UK, you also have the right to complain to your local data protection authority.",
          ],
        },
        {
          title: "8. Security",
          body: [
            "The site is served over HTTPS. Access to booking records is limited to staff who need it, protected by two-factor authentication.",
            "No system is perfect. If a breach ever affects your data, we will tell you and the relevant authority within 72 hours of discovering it.",
          ],
        },
        {
          title: "9. Children",
          body: [
            "This website is not directed at children under 16. We only process a child's details when a parent or guardian includes them in a booking request.",
          ],
        },
        {
          title: "10. Changes to this policy",
          body: [
            "If we change anything material, we will update the date at the top and show the cookie banner again where consent is affected.",
          ],
        },
      ],
    },
    terms: {
      title: "Terms of Use",
      intro:
        "These terms cover your use of this website and any tour you book with us. By using the site or confirming a booking, you agree to them.",
      sections: [
        {
          title: "1. About these terms",
          body: [
            "The website is operated by Vera Bali Tour, Jl. Raya Ubud No. 88, Gianyar, Bali 80571, Indonesia.",
            "If you do not agree with any part of these terms, please do not use the site or book with us.",
          ],
        },
        {
          title: "2. Using the website",
          body: [
            "You may browse, read and share our pages freely for personal, non-commercial use.",
            "You may not scrape the site at scale, copy our written content or artwork for another travel business, or attempt to break our security.",
            "We may suspend access if the site is being misused.",
          ],
        },
        {
          title: "3. Bookings and quotes",
          body: [
            "A message sent from this site is an enquiry, not a confirmed booking. Nothing is reserved until we reply with a written confirmation.",
            "Prices shown are indicative starting points and can change with season, group size, fuel costs and ferry schedules. The price in your written confirmation is the one that applies.",
            "A deposit confirms your date. The balance is due after the tour, in Indonesian Rupiah cash or by transfer.",
          ],
        },
        {
          title: "4. Cancellation and changes",
          body: [
            "Cancel more than 24 hours before pickup: full deposit refund.",
            "Cancel within 24 hours: the deposit is retained, unless illness or a cancelled flight is involved, in which case we reschedule at no cost.",
            "If we cancel, whether for a mechanical issue, unsafe weather or a cancelled boat crossing, you choose between a full refund and a free reschedule.",
            "Route changes requested during a private or customized tour are free. Sharing tours run a fixed route and cannot be altered for one guest.",
          ],
        },
        {
          title: "5. Your responsibilities on tour",
          body: [
            "Be ready at the agreed pickup time. We wait 30 minutes; after that the day may need shortening.",
            "Follow your guide's safety instructions, especially at waterfalls, cliff viewpoints, volcano trails and on boats.",
            "Dress respectfully at temples. A sarong is provided where one is required.",
            "Tell us in advance about medical conditions, allergies, pregnancy or mobility needs so we can plan properly.",
          ],
        },
        {
          title: "6. Liability",
          body: [
            "Our vehicles carry passenger insurance as required by Indonesian law, and our guides are licensed.",
            "We are not liable for losses caused by events outside our reasonable control: weather, volcanic activity, earthquakes, ferry cancellations, road closures, strikes or government restrictions.",
            "Adventure activities carry inherent risk. We strongly recommend personal travel insurance, and you take part at your own risk.",
          ],
        },
        {
          title: "7. Third-party content",
          body: [
            "Our pages link to maps, WhatsApp and accommodation partners. We do not control those services and are not responsible for their content or privacy practices.",
          ],
        },
        {
          title: "8. Intellectual property",
          body: [
            "All text, layout, illustration and code on this site belong to Vera Bali Tour unless stated otherwise. Guest reviews remain the property of the guests who wrote them.",
          ],
        },
        {
          title: "9. Demonstration notice",
          body: [
            "Vera Bali Tour is a brand built as a portfolio demonstration. Prices, testimonials, addresses and illustrations are placeholders. No form on this site stores data.",
          ],
        },
        {
          title: "10. Governing law",
          body: [
            "These terms are governed by the laws of the Republic of Indonesia. Disputes fall under the jurisdiction of the courts of Denpasar, Bali.",
          ],
        },
      ],
    },
  },

  notFound: {
    code: "404",
    title: "Page not found",
    subtitle: "The page you are looking for does not exist or has moved.",
    cta: "Back to home",
  },

  common: {
    viewAll: "View all",
    from: "from",
    perPerson: "per person",
    optional: "optional",
    skipToContent: "Skip to content",
    choose: "Choose an option",
    openList: "Open the list of options",
    pickDate: "Pick a date",
    photoCredit: "Photography from Pexels",
  },
};

type Dict = typeof en;

/* ------------------------------------------------------------------ */

const id: Dict = {
  brand: {
    name: "Vera Bali Tour",
    tagline: "Guide lokal, harga jujur, hari yang tidak terburu-buru.",
  },

  nav: {
    home: "Beranda",
    about: "Tentang",
    tour: "Tur",
    testimonial: "Testimoni",
    contact: "Kontak",
    privacy: "Kebijakan Privasi",
    terms: "Syarat Penggunaan",
    close: "Tutup",
    openMenu: "Buka menu navigasi",
    closeMenu: "Tutup menu navigasi",
    cta: "Booking via WhatsApp",
    allTours: "Semua tur",
  },

  tourTypes: {
    private: {
      name: "Private Tour",
      short: "Mobil dan driver-guide sendiri",
      desc: "Satu mobil, satu driver-guide, dan satu hari yang sepenuhnya milik rombongan Anda. Rutenya menyesuaikan Anda.",
      price: "mulai Rp 850.000",
      unit: "per mobil",
      action: "Lihat private tour",
    },
    sharing: {
      name: "Sharing Tour",
      short: "Grup kecil, rute tetap",
      desc: "Gabung bersama maksimal sebelas traveler lain di rute yang sudah ditentukan. Guide-nya sama, tiket termasuk, harganya lebih ramah.",
      price: "mulai Rp 245.000",
      unit: "per orang",
      action: "Lihat sharing tour",
    },
    customized: {
      name: "Customized Tour",
      short: "Disusun dari daftar Anda",
      desc: "Kirim tanggal, wishlist, dan budget Anda. Kami balas dengan rencana harian yang siap jalan.",
      price: "harga menyesuaikan",
      unit: "custom",
      action: "Ajukan tur custom",
    },
  },

  home: {
    hero: {
      eyebrow: "Operator lokal berlisensi, sejak 2014",
      title: "Jelajahi Bali bersama guide yang tinggal di sini",
      subtitle:
        "Tim kecil asli Bali yang menjalankan trip harian private, sharing, dan full custom. Harga jujur dan hari yang tidak terburu-buru.",
      ctaPrimary: "Booking via WhatsApp",
      ctaSecondary: "Lihat tur kami",
      stat1: "12.400 tamu dipandu",
      stat2: "Rating rata-rata 4,9",
      stat3: "Dibalas sekitar 15 menit",
      slideLabel: "Tampilkan slide",
      pause: "Jeda slideshow",
      play: "Putar slideshow",
    },
    about: {
      eyebrow: "Tentang kami",
      title: "Dari satu mobil di 2014 jadi tim delapan belas orang",
      body: [
        "Vera besar di Gianyar, sepuluh menit dari sawah terasering yang sekarang antre difoto turis. Setelah bertahun-tahun jadi driver di agensi besar, dia selalu ketemu masalah yang sama: jadwal selalu menang, tamu selalu mengalah.",
        "Jadi dia mulai sesuatu yang lebih kecil. Satu aturan, dulu sampai sekarang: itinerary yang menyesuaikan tamu, bukan sebaliknya.",
      ],
      points: [
        { label: "Guide lokal", value: "Lahir dan berlisensi di sini" },
        { label: "Harga flat", value: "Bensin, parkir, tol sudah masuk" },
        { label: "Ubah di hari-H", value: "Gratis di trip private dan custom" },
      ],
      cta: "Baca cerita kami",
    },
    packages: {
      eyebrow: "Paket tur",
      title: "Tiga cara jalan-jalan",
      subtitle: "Guide-nya sama, perhatiannya sama. Tinggal pilih format yang pas dengan budget dan seberapa privat yang Anda mau.",
    },
    locations: {
      eyebrow: "Destinasi",
      title: "Ke mana saja kami bisa mengantar Anda",
      subtitle:
        "Semua rute di bawah bisa digabung dalam satu hari atau dipecah ke beberapa hari. Sebutkan mana yang Anda mau, urutannya kami atur menyesuaikan lalu lintas dan cahaya.",
      items: [
        {
          name: "Ubud & Dataran Tinggi",
          area: "Gianyar",
          desc: "Sawah terasering, monkey forest, mata air suci, dan ngopi dengan pemandangan lembah.",
        },
        {
          name: "Nusa Penida",
          area: "45 menit naik kapal",
          desc: "Tebing Kelingking, Broken Beach, dan Crystal Bay, dicapai dengan kapal pertama sebelum ramai.",
        },
        {
          name: "Gunung Batur",
          area: "Kintamani",
          desc: "Berangkat saat masih gelap, mendaki dua jam, sarapan dimasak dengan uap vulkanik di ketinggian 1.717 meter.",
        },
        {
          name: "Uluwatu & Bali Selatan",
          area: "Badung",
          desc: "Pura di atas tebing, tari api Kecak saat matahari terbenam, dan seafood bakar di pasir Jimbaran.",
        },
        {
          name: "Air Terjun Bali Utara",
          area: "Buleleng",
          desc: "Sekumpul, Banyumala, dan Git Git. Sisi pulau yang hijau, sejuk, dan jauh dari macet.",
        },
        {
          name: "Sidemen & Bali Timur",
          area: "Karangasem",
          desc: "Desa tenun, taman air, dan Bali yang tenang seperti yang dicari orang di era delapan puluhan.",
        },
      ],
    },
    testimonial: {
      eyebrow: "Testimoni",
      title: "Apa kata tamu kami",
      cta: "Baca semua ulasan",
    },
    contact: {
      eyebrow: "Hubungi kami",
      title: "Ceritakan rencana Anda",
      subtitle:
        "Isi form ini, nanti WhatsApp terbuka dengan detail Anda sudah tertulis rapi. Atau langsung chat kami, mana yang lebih nyaman.",
      direct: "Chat langsung",
    },
  },

  about: {
    hero: {
      eyebrow: "Tentang kami",
      title: "Operator tur Bali berskala kecil, berjalan sejak 2014",
      subtitle:
        "Vera Bali Tour lahir tahun 2014 di ruang tamu sebuah rumah di Denpasar. Sepuluh tahun kemudian kami masih sengaja bertahan kecil. Begitu kami tumbuh melebihi yang bisa kami cek sendiri, trip-nya berhenti terasa seperti milik kami.",
    },
    story: {
      eyebrow: "Cerita kami",
      title: "Awal mula Vera Bali Tour",
      body: [
        "Vera besar di Gianyar, sepuluh menit dari sawah terasering yang sekarang antre difoto turis. Setelah bertahun-tahun jadi driver di agensi besar, dia selalu ketemu masalah yang sama: jadwal selalu menang, tamu selalu mengalah.",
        "Jadi di tahun 2014 dia mulai sesuatu yang lebih kecil. Satu mobil, satu nomor telepon, dan satu aturan: itinerary yang menyesuaikan tamu, bukan sebaliknya. Bulan pertama dapat empat booking. Keempatnya kirim teman.",
        "Sekarang kami delapan belas orang: driver, guide, planner, dan satu kucing kantor yang sangat sabar. Semua pesan masih kami balas sendiri. Bedanya, kami makin hafal pantai mana yang tetap tenang saat Selasa berangin.",
      ],
    },
    values: {
      eyebrow: "Nilai kami",
      title: "Tiga hal yang tidak pernah kami tawar",
      items: [
        {
          title: "Tidak ada yang diburu-buru",
          desc: "Kalau satu tempat bikin Anda betah, ya lanjut betah. Setiap rute kami kasih jeda supaya berhenti lama tidak merusak hari.",
        },
        {
          title: "Tanpa mampir komisi",
          desc: "Kami tidak dibayar untuk parkir di showroom perhiasan. Kalau kami bawa Anda ke satu tempat, artinya tempat itu memang layak.",
        },
        {
          title: "Orang lokal dibayar layak",
          desc: "Guide kami digaji di atas rata-rata Bali dan tip sepenuhnya jadi milik mereka.",
        },
      ],
    },
    timeline: {
      eyebrow: "Perjalanan kami",
      title: "Tonggak penting",
      items: [
        { year: "2014", title: "Satu mobil, satu driver", desc: "Vera mulai terima booking bermodal buku catatan dan Avanza bekas." },
        { year: "2016", title: "Rute sharing pertama", desc: "Permintaan dari solo traveler mendorong kami membuka trip grup kecil." },
        { year: "2018", title: "Berlisensi dan berasuransi", desc: "Izin operator lengkap, asuransi penumpang, dan empat mobil baru bergabung." },
        { year: "2020", title: "Tahun-tahun sepi", desc: "Semua guide tetap kami gaji sebagian, waktunya dipakai survei ulang 38 rute." },
        { year: "2022", title: "Kembali, dan makin ramai", desc: "Untuk pertama kalinya trip custom multi-hari melebihi tur harian." },
        { year: "2025", title: "Delapan belas orang", desc: "Ekstensi Nusa Penida dan Lombok resmi jalan. WhatsApp masih kami balas sendiri." },
      ],
    },
    team: {
      eyebrow: "Orang-orangnya",
      title: "Kenalan dengan tim kami",
      items: [
        { name: "Vera Hutasoit", role: "Founder & Head Planner", bio: "Menyusun sendiri setiap itinerary custom. Siap berdebat soal spot sunrise terbaik." },
        { name: "Made Suparta", role: "Lead Guide", bio: "Berlisensi sejak 2009. Bahasa Bali, Indonesia, Inggris, dan tata krama pura." },
        { name: "Ayu Pradnya", role: "Guest Relations", bio: "Yang balas chat jam 11 malam. Semua booking dan tiket kapal rapi di tangannya." },
        { name: "Komang Bagus", role: "Senior Driver", bio: "Dua belas tahun, nol insiden. Hafal jalan tikus keluar dari setiap macet di Denpasar." },
      ],
    },
    certs: {
      title: "Berlisensi, berasuransi, bertanggung jawab",
      items: ["Operator tur terdaftar", "Asuransi penumpang", "Guide lokal bersertifikat", "Mitra pembayaran terverifikasi"],
    },
    cta: {
      title: "Siap jalan bareng kami?",
      subtitle: "Ceritakan trip yang Anda bayangkan. Kami akan jujur soal apa yang realistis.",
    },
  },

  tour: {
    hero: {
      eyebrow: "Tur kami",
      title: "Tiga format. Satu pulau. Anda yang pilih.",
      subtitle:
        "Semua tur dijalankan guide berlisensi kami sendiri dengan harga flat. Jelajahi katalog private dan sharing, atau kirim wishlist Anda dan kami susunkan.",
    },
    compare: {
      eyebrow: "Perbandingan",
      title: "Format mana yang paling cocok",
      headers: ["", "Private", "Sharing", "Customized"],
      rows: [
        { label: "Harga mulai", values: ["Rp 850.000 / mobil", "Rp 245.000 / orang", "Menyesuaikan"] },
        { label: "Rombongan", values: ["Hanya grup Anda", "Maks 12 orang", "Bebas"] },
        { label: "Ubah rute di hari-H", values: ["Bisa, kapan saja", "Rute tetap", "Bisa, kapan saja"] },
        { label: "Penjemputan", values: ["Hotel Anda", "Titik kumpul", "Di mana saja"] },
        { label: "Multi-hari", values: ["Bisa diminta", "Tidak", "Memang untuk itu"] },
        { label: "Paling cocok untuk", values: ["Keluarga dan pasangan", "Solo dan hemat", "Momen spesial"] },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Pertanyaan yang sering diajukan",
      items: [
        { q: "Sebaiknya booking berapa lama sebelumnya?", a: "Untuk tur harian, dua sampai tiga hari biasanya cukup. Untuk Nusa Penida, sunrise Batur, atau tanggal di Juli, Agustus, dan Desember, kasih kami satu sampai dua minggu supaya kapal dan guide-nya bisa dikunci." },
        { q: "Harga itu sudah termasuk apa saja?", a: "Mobil, bensin, parkir, tol, driver-guide, dan makan mereka. Di private tour, tiket masuk dan makan Anda dihitung terpisah; di sharing tour semuanya sudah digabung. Setiap halaman tur menuliskannya dengan jelas." },
        { q: "Boleh ubah rencana di tengah trip?", a: "Di private dan customized tour, sangat boleh. Bilang saja ke guide dan kami atur ulang. Sharing tour rutenya tetap karena ada tamu lain di jadwal yang sama." },
        { q: "Bayarnya bagaimana?", a: "Deposit kecil lewat transfer bank, Wise, atau PayPal untuk mengunci tanggal. Sisanya dibayar tunai atau transfer setelah tur. Kami tidak pernah minta pelunasan di awal." },
        { q: "Kalau hujan bagaimana?", a: "Hujan di Bali biasanya sebentar. Guide Anda akan membalik urutan rute supaya Anda di dalam ruangan saat hujannya paling deras. Kalau penyeberangan kapal dibatalkan karena cuaca, uang Anda kembali penuh atau bisa dijadwal ulang gratis." },
        { q: "Aman untuk anak-anak atau orang tua?", a: "Aman. Sebutkan saja saat chat, nanti kami pilih spot yang lebih landai, tambah jeda istirahat, siapkan kursi anak, dan lewati tempat dengan tangga 300 anak." },
        { q: "Bagaimana kebijakan pembatalannya?", a: "Batal gratis sampai 24 jam sebelum penjemputan, deposit kembali penuh. Di bawah 24 jam deposit hangus, kecuali karena alasan kesehatan atau penerbangan, dan itu kami jadwal ulang saja." },
      ],
    },
    cta: {
      title: "Masih bingung pilih?",
      subtitle: "Chat kami, nanti kami bilang format mana yang paling pas untuk rencana Anda.",
    },
  },

  tourList: {
    private: {
      eyebrow: "Private tour",
      title: "Mobil sendiri, ritme sendiri",
      subtitle:
        "Satu kendaraan, satu driver-guide, dan satu hari yang jadi milik rombongan Anda saja. Harganya per mobil, jadi keluarga berlima bayarnya sama dengan berdua.",
    },
    sharing: {
      eyebrow: "Sharing tour",
      title: "Grup kecil, jadwal tetap",
      subtitle:
        "Maksimal dua belas kursi, satu guide berlisensi, dan semua tiket masuk sudah termasuk harga. Pilihan paling gampang buat solo traveler.",
    },
    count: "tur tersedia",
    viewDetail: "Lihat detail",
    from: "mulai",
    empty: "Belum ada tur di sini. Chat kami dan akan kami susunkan.",
    customPrompt: {
      title: "Mencari yang lain?",
      body: "Ceritakan yang Anda bayangkan, nanti kami susunkan rencananya.",
      cta: "Ajukan tur custom",
    },
  },

  tourDetail: {
    back: "Kembali ke",
    overview: "Gambaran",
    highlights: "Yang bikin menarik",
    itinerary: "Rangkaian acara",
    includes: "Sudah termasuk",
    excludes: "Belum termasuk",
    bring: "Yang perlu dibawa",
    book: "Booking via WhatsApp",
    bookNote: "WhatsApp terbuka dengan nama tur ini sudah tertulis.",
    facts: {
      duration: "Durasi",
      group: "Jumlah orang",
      pickup: "Penjemputan",
      difficulty: "Tingkat kesulitan",
      area: "Wilayah",
      price: "Harga",
    },
    otherTours: "Tur lain di format ini",
    ask: "Mau tanya dulu?",
    askCta: "Tanya via WhatsApp",
  },

  testimonial: {
    hero: {
      eyebrow: "Testimoni",
      title: "Dua belas ribu tamu, dan terus bertambah",
      subtitle:
        "Kami minta masukan jujur dari setiap tamu setelah trip. Ini hasilnya.",
    },
    stats: [
      { value: 4.9, suffix: "/5", label: "Rating rata-rata", decimals: 1 },
      { value: 2870, suffix: "+", label: "Ulasan tertulis", decimals: 0 },
      { value: 96, suffix: "%", label: "Mau booking lagi", decimals: 0 },
      { value: 41, suffix: "", label: "Negara asal tamu", decimals: 0 },
    ],
    grid: {
      eyebrow: "Ulasan",
      title: "Apa kata tamu kami",
      filterAll: "Semua tur",
      empty: "Belum ada ulasan di kategori ini.",
    },
    verified: "Tamu terverifikasi",
    cta: {
      title: "Siap menyusun trip Anda?",
      subtitle: "Sebutkan tanggalnya, nanti kami susunkan rutenya.",
    },
  },

  contact: {
    hero: {
      eyebrow: "Kontak",
      title: "Hubungi kami",
      subtitle:
        "WhatsApp paling cepat. Biasanya kami balas dalam lima belas menit, antara jam 08.00 sampai 22.00 WITA. Email juga bisa, cuma agak lebih lambat.",
    },
    cards: [
      { title: "WhatsApp", value: "+62 821 1499 0113", note: "Tercepat, 08.00 sampai 22.00 WITA", action: "Buka chat" },
      { title: "Email", value: "hello@verabalitour.com", note: "Dibalas dalam 12 jam", action: "Kirim email" },
      { title: "Kantor", value: "Jl. Raya Ubud No. 88, Gianyar, Bali 80571", note: "Kunjungan dengan janji temu", action: "Buka di Maps" },
    ],
    hours: {
      title: "Jam kami ada",
      items: [
        { day: "Senin sampai Jumat", time: "08.00 – 22.00" },
        { day: "Sabtu", time: "08.00 – 20.00" },
        { day: "Minggu", time: "09.00 – 18.00" },
        { day: "Hari libur nasional", time: "WhatsApp saja" },
      ],
      note: "Semua waktu dalam WITA (GMT+8). Tamu yang sedang tur bisa menghubungi guide-nya kapan saja.",
    },
    form: {
      title: "Kirim pesan ke kami",
      subtitle: "Ini akan membuka WhatsApp dengan semua isian di bawah sudah tertulis rapi.",
      name: "Nama Anda",
      namePh: "mis. Sarah Lim",
      email: "Email",
      emailPh: "anda@email.com",
      dates: "Tanggal perjalanan",
      datesPh: "mis. 12–18 September",
      pax: "Berapa orang",
      paxPh: "mis. 2 dewasa, 1 anak",
      interest: "Tur mana yang Anda minati",
      interestOpts: [
        "Belum tahu",
        "Private tour",
        "Sharing tour",
        "Customized tour",
        "Lainnya",
      ],
      message: "Pesan",
      messagePh: "Ceritakan apa saja. Tanggal, pertanyaan, atau ide liar sekalipun.",
      submit: "Buka WhatsApp",
      required: "Wajib diisi",
      invalidEmail: "Format emailnya sepertinya kurang tepat",
      note: "Tidak ada data yang disimpan di situs ini. Form hanya menyusun pesan Anda.",
    },
    map: {
      title: "Lokasi kami",
      note: "Kantor Ubud, 15 menit dari pusat Ubud",
      cta: "Lihat rute",
    },
    social: { title: "Kami juga ada di sini" },
  },

  modal: {
    title: "Ajukan tur custom",
    subtitle: "Ceritakan yang Anda cari. Tanpa bayar, tanpa ikatan.",
    step: "Langkah",
    of: "dari",
    next: "Lanjut",
    back: "Kembali",
    submit: "Buka WhatsApp",
    close: "Tutup form pengajuan",
    steps: ["Trip Anda", "Data Anda"],
    outro: "Menekan tombolnya akan membuka WhatsApp dengan semua ini sudah tertulis rapi. Tidak ada data yang disimpan di sini.",
    fields: {
      destinations: "Mau ke mana saja?",
      destinationsHint: "Pilih sebanyak yang Anda mau, atau kosongkan biar kami yang usul.",
      date: "Perkiraan tanggal mulai",
      days: "Berapa hari",
      pax: "Berapa orang",
      paxAdults: "Dewasa",
      paxKids: "Anak-anak",
      budget: "Perkiraan budget per orang",
      budgetOpts: ["Belum tahu", "Di bawah Rp 1 jt", "Rp 1 jt – 3 jt", "Rp 3 jt – 7 jt", "Di atas Rp 7 jt"],
      name: "Nama Anda",
      namePh: "mis. Sarah Lim",
      email: "Email",
      emailPh: "anda@email.com",
      country: "Negara asal",
      countryPh: "mis. Singapura",
      notes: "Ada hal lain yang perlu kami tahu?",
      notesPh: "Pantangan makanan, mobilitas, sedang merayakan sesuatu, tempat yang wajib didatangi.",
    },
    errors: {
      required: "Bagian ini wajib diisi",
      email: "Format emailnya sepertinya kurang tepat",
      pax: "Minimal satu orang, ya",
    },
  },

  cookie: {
    title: "Kami pakai sedikit cookie",
    body: "Yang wajib dipakai supaya situsnya jalan normal. Sisanya baru aktif kalau Anda izinkan.",
    accept: "Terima semua",
    reject: "Tolak yang opsional",
    customize: "Atur sendiri",
    save: "Simpan pilihan",
    policyLink: "Kebijakan Privasi",
    manage: "Pengaturan cookie",
    savedToast: "Preferensi cookie tersimpan.",
    categories: {
      necessary: { title: "Wajib", desc: "Pilihan bahasa, keputusan cookie Anda, dan keamanan dasar. Yang ini tidak bisa dimatikan.", always: "Selalu aktif" },
      preferences: { title: "Preferensi", desc: "Mengingat hal-hal kecil, seperti tur terakhir yang Anda lihat." },
      analytics: { title: "Analitik", desc: "Hitungan kunjungan anonim, supaya kami tahu halaman mana yang benar-benar membantu." },
      marketing: { title: "Marketing", desc: "Untuk mengukur iklan dan menghindari menampilkan iklan yang sama sebelas kali." },
    },
  },

  floating: {
    whatsapp: "Chat via WhatsApp",
    language: "Ganti bahasa",
    languageLabel: "Bahasa",
    top: "Kembali ke atas",
  },

  loader: {
    welcome: "Selamat datang di",
    tagline: "Tur Bali sejak 2014",
    loading: "Memuat",
  },

  footer: {
    blurb: "Operator tur Bali berskala kecil dan berlisensi, menjalankan trip private, sharing, dan full custom sejak 2014.",
    explore: "Jelajahi",
    tours: "Tur",
    legal: "Legal",
    contact: "Hubungi kami",
    rights: "Seluruh hak cipta dilindungi.",
    disclaimer: "Vera Bali Tour adalah merek demonstrasi. Harga, ulasan, dan ilustrasi hanya contoh.",
  },

  legal: {
    updated: "Terakhir diperbarui",
    updatedDate: "7 Agustus 2026",
    toc: "Di halaman ini",
    backHome: "Kembali ke beranda",
    privacy: {
      title: "Kebijakan Privasi",
      intro:
        "Kebijakan ini menjelaskan data apa yang Vera Bali Tour kumpulkan saat Anda memakai situs ini atau memesan trip, kenapa kami mengumpulkannya, dan apa yang bisa Anda minta kami lakukan terhadapnya.",
      sections: [
        {
          title: "1. Siapa kami",
          body: [
            "Vera Bali Tour adalah operator tur yang berkantor di Jl. Raya Ubud No. 88, Gianyar, Bali 80571, Indonesia. Kami adalah pengendali data untuk informasi yang dikumpulkan melalui situs ini.",
            "Untuk pertanyaan soal privasi, kirim email ke hello@verabalitour.com dengan subjek \"Privasi\". Yang membaca manusia asli.",
          ],
        },
        {
          title: "2. Data yang kami kumpulkan",
          body: [
            "Data yang Anda berikan: nama, email, tanggal perjalanan, jumlah rombongan, kisaran budget, dan catatan apa pun yang Anda tulis di form kami.",
            "Karena form kami mengarah ke WhatsApp dan bukan ke server, sebagian besar yang Anda ketik tidak sampai ke kami sampai Anda sendiri menekan kirim di WhatsApp.",
            "Data yang terkumpul otomatis: halaman yang dibuka, perkiraan wilayah, jenis perangkat, dan durasi kunjungan, itu pun hanya kalau Anda menyetujui cookie analitik.",
            "Kami tidak pernah meminta scan paspor, nomor kartu, atau kredensial bank melalui situs ini.",
          ],
        },
        {
          title: "3. Untuk apa kami memakainya",
          body: [
            "Untuk menjawab pertanyaan Anda dan menyiapkan itinerary serta penawaran harga.",
            "Untuk menjalankan trip yang Anda pesan, yang berarti membagikan nama depan dan titik jemput Anda ke guide dan driver yang bertugas, serta nama Anda ke operator kapal bila manifes memang diwajibkan.",
            "Untuk memperbaiki situs, berdasarkan pola pemakaian yang sudah dianonimkan.",
          ],
        },
        {
          title: "4. Cookie",
          body: [
            "Cookie wajib menyimpan pilihan bahasa dan keputusan cookie Anda. Ini tidak bisa dimatikan karena situsnya tidak akan berjalan benar tanpa itu.",
            "Cookie preferensi, analitik, dan marketing mati secara default dan baru aktif kalau Anda menyalakannya di banner cookie.",
            "Anda bisa mengubah atau menarik persetujuan kapan saja lewat tautan \"Pengaturan cookie\" di footer. Menarik persetujuan langsung menghapus cookie terkait.",
          ],
        },
        {
          title: "5. Dengan siapa kami membagikannya",
          body: [
            "Guide dan driver kami sendiri, terbatas pada yang mereka butuhkan untuk menjemput Anda.",
            "Penyedia layanan yang meng-hosting situs ini dan memproses pembayaran. Mereka bekerja hanya sesuai instruksi kami.",
            "Pihak berwenang, bila hukum Indonesia mewajibkannya, misalnya manifes penumpang untuk penyeberangan laut.",
            "Kami tidak menjual data Anda. Tidak pernah, dan tidak berencana mulai.",
          ],
        },
        {
          title: "6. Berapa lama kami menyimpannya",
          body: [
            "Pertanyaan yang tidak berlanjut jadi booking: 12 bulan, lalu dihapus.",
            "Booking yang selesai: 5 tahun, karena aturan pajak dan pariwisata Indonesia mengharuskannya.",
            "Data analitik: 14 bulan dalam bentuk agregat.",
          ],
        },
        {
          title: "7. Hak Anda",
          body: [
            "Anda bisa meminta salinan data Anda, meminta kami memperbaikinya, meminta kami menghapusnya, atau meminta kami berhenti memakainya untuk marketing.",
            "Kirim permintaan ke hello@verabalitour.com. Kami balas dalam 30 hari dan tidak memungut biaya.",
            "Kalau Anda berada di EEA atau Inggris, Anda juga berhak mengadu ke otoritas perlindungan data setempat.",
          ],
        },
        {
          title: "8. Keamanan",
          body: [
            "Situs ini disajikan lewat HTTPS. Akses ke catatan booking dibatasi hanya untuk staf yang memerlukannya, dengan autentikasi dua faktor.",
            "Tidak ada sistem yang sempurna. Kalau suatu saat terjadi kebocoran yang memengaruhi data Anda, kami akan memberi tahu Anda dan otoritas terkait dalam 72 jam sejak kami mengetahuinya.",
          ],
        },
        {
          title: "9. Anak-anak",
          body: [
            "Situs ini tidak ditujukan untuk anak di bawah 16 tahun. Kami hanya memproses data anak bila orang tua atau wali menyertakannya dalam permintaan booking.",
          ],
        },
        {
          title: "10. Perubahan kebijakan",
          body: [
            "Kalau ada perubahan penting, kami perbarui tanggal di bagian atas dan menampilkan lagi banner cookie bila persetujuan Anda terdampak.",
          ],
        },
      ],
    },
    terms: {
      title: "Syarat Penggunaan",
      intro:
        "Syarat ini mengatur penggunaan situs ini dan tur apa pun yang Anda pesan dari kami. Dengan memakai situs ini atau mengonfirmasi booking, Anda dianggap menyetujuinya.",
      sections: [
        {
          title: "1. Tentang syarat ini",
          body: [
            "Situs ini dikelola oleh Vera Bali Tour, Jl. Raya Ubud No. 88, Gianyar, Bali 80571, Indonesia.",
            "Kalau ada bagian yang tidak Anda setujui, mohon jangan memakai situs ini atau memesan trip dari kami.",
          ],
        },
        {
          title: "2. Memakai situs ini",
          body: [
            "Anda bebas menjelajah, membaca, dan membagikan halaman kami untuk keperluan pribadi non-komersial.",
            "Anda tidak diperbolehkan melakukan scraping massal, menyalin tulisan atau ilustrasi kami untuk bisnis travel lain, atau mencoba menembus keamanan kami.",
            "Kami berhak menangguhkan akses bila situs ini disalahgunakan.",
          ],
        },
        {
          title: "3. Booking dan penawaran",
          body: [
            "Pesan yang dikirim dari situs ini adalah permintaan, bukan booking terkonfirmasi. Belum ada yang dikunci sampai kami membalas dengan konfirmasi tertulis.",
            "Harga yang ditampilkan bersifat indikatif dan bisa berubah mengikuti musim, jumlah rombongan, harga bahan bakar, dan jadwal kapal. Harga yang berlaku adalah yang tertulis di konfirmasi Anda.",
            "Deposit mengunci tanggal Anda. Sisanya dibayar setelah tur, tunai dalam Rupiah atau lewat transfer.",
          ],
        },
        {
          title: "4. Pembatalan dan perubahan",
          body: [
            "Batal lebih dari 24 jam sebelum penjemputan: deposit kembali penuh.",
            "Batal dalam 24 jam terakhir: deposit hangus, kecuali karena sakit atau penerbangan dibatalkan, dan untuk itu kami jadwalkan ulang tanpa biaya.",
            "Kalau kami yang membatalkan, entah karena kendala mesin, cuaca berbahaya, atau penyeberangan ditutup, Anda boleh memilih antara pengembalian penuh atau penjadwalan ulang gratis.",
            "Perubahan rute saat private atau customized tour berlangsung tidak dipungut biaya. Sharing tour memakai rute tetap dan tidak bisa diubah untuk satu tamu saja.",
          ],
        },
        {
          title: "5. Tanggung jawab Anda saat tur",
          body: [
            "Mohon siap pada waktu penjemputan yang disepakati. Kami menunggu 30 menit; setelah itu durasi hari mungkin perlu dipersingkat.",
            "Ikuti instruksi keselamatan dari guide, terutama di air terjun, tepi tebing, jalur gunung, dan di atas kapal.",
            "Berpakaian sopan di area pura. Sarung kami sediakan di tempat yang memerlukannya.",
            "Beri tahu kami lebih awal soal kondisi medis, alergi, kehamilan, atau keterbatasan mobilitas supaya kami bisa menyusun rencana dengan benar.",
          ],
        },
        {
          title: "6. Batas tanggung jawab",
          body: [
            "Kendaraan kami dilengkapi asuransi penumpang sesuai ketentuan hukum Indonesia, dan guide kami berlisensi.",
            "Kami tidak bertanggung jawab atas kerugian akibat hal di luar kendali wajar kami: cuaca, aktivitas vulkanik, gempa, pembatalan kapal, penutupan jalan, mogok kerja, atau pembatasan dari pemerintah.",
            "Aktivitas petualangan punya risiko bawaan. Kami sangat menyarankan asuransi perjalanan pribadi, dan keikutsertaan Anda adalah atas risiko sendiri.",
          ],
        },
        {
          title: "7. Konten pihak ketiga",
          body: [
            "Halaman kami memuat tautan ke peta, WhatsApp, dan mitra akomodasi. Kami tidak mengendalikan layanan tersebut dan tidak bertanggung jawab atas isi maupun praktik privasinya.",
          ],
        },
        {
          title: "8. Hak kekayaan intelektual",
          body: [
            "Seluruh teks, tata letak, ilustrasi, dan kode di situs ini milik Vera Bali Tour kecuali dinyatakan lain. Ulasan tamu tetap milik penulisnya.",
          ],
        },
        {
          title: "9. Catatan demonstrasi",
          body: [
            "Vera Bali Tour adalah merek yang dibuat sebagai demonstrasi portofolio. Harga, testimoni, alamat, dan ilustrasi hanyalah contoh. Tidak ada form di situs ini yang menyimpan data.",
          ],
        },
        {
          title: "10. Hukum yang berlaku",
          body: [
            "Syarat ini tunduk pada hukum Republik Indonesia. Sengketa berada di yurisdiksi pengadilan Denpasar, Bali.",
          ],
        },
      ],
    },
  },

  notFound: {
    code: "404",
    title: "Halaman tidak ditemukan",
    subtitle: "Halaman yang Anda cari tidak ada atau sudah dipindahkan.",
    cta: "Kembali ke beranda",
  },

  common: {
    viewAll: "Lihat semua",
    from: "mulai",
    perPerson: "per orang",
    optional: "opsional",
    skipToContent: "Lompat ke konten",
    choose: "Pilih salah satu",
    openList: "Buka daftar pilihan",
    pickDate: "Pilih tanggal",
    photoCredit: "Fotografi dari Pexels",
  },
};

export const dictionaries: Record<Lang, Dict> = { en, id };
export type Dictionary = Dict;
