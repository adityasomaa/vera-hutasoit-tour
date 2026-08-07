/**
 * VERA BALI TOUR — bilingual dictionary.
 *
 * `en` is the source of truth and the default language.
 * `id` is deliberately written in a warm, conversational-but-polite register:
 * we keep "Anda" (formal pronoun) yet use relaxed, everyday sentence shapes —
 * no stiff government-brochure phrasing.
 */

export type Lang = "en" | "id";

export const LANGS: { code: Lang; label: string; short: string; flag: string }[] = [
  { code: "en", label: "English", short: "EN", flag: "🇬🇧" },
  { code: "id", label: "Bahasa Indonesia", short: "ID", flag: "🇮🇩" },
];

const en = {
  brand: {
    name: "Vera Bali Tour",
    short: "VBT",
    tagline: "Bali, the way you'd want a friend to show it to you.",
  },

  nav: {
    home: "Home",
    about: "About",
    tour: "Tour",
    testimonial: "Testimonial",
    contact: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    menu: "Menu",
    close: "Close",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    cta: "Plan My Trip",
    dropdownHint: "Pick one and tell us what you have in mind →",
  },

  tourTypes: {
    private: {
      name: "Private Tour",
      short: "Just your group, your pace",
      desc: "A car, a driver-guide and a full day that belongs only to you and the people you came with.",
      price: "from IDR 750K",
      unit: "/ car / day",
      duration: "8–12 hours",
      group: "1–6 people",
      features: [
        "Private AC car with fuel & parking covered",
        "English-speaking driver-guide who actually guides",
        "Hotel pickup & drop-off anywhere in South Bali",
        "Free itinerary reshuffling on the day",
        "Unlimited photo stops — we never rush you",
        "Bottled water, umbrella & phone charger on board",
      ],
    },
    sharing: {
      name: "Sharing Tour",
      short: "Small group, smaller price",
      desc: "Join a capped group of like-minded travellers on a fixed route. Same guide, same stops, friendlier bill.",
      price: "from IDR 285K",
      unit: "/ person",
      duration: "9–10 hours",
      group: "max 12 people",
      features: [
        "Maximum 12 travellers — never a coach full of strangers",
        "Fixed departure at 08.00, back before sunset",
        "Shared AC minibus with a licensed guide",
        "Meeting point pickup in Kuta, Seminyak & Ubud",
        "Entrance tickets bundled into one clean price",
        "A built-in way to meet people from everywhere",
      ],
    },
    customized: {
      name: "Customized Tour",
      short: "Built around your list",
      desc: "Send us your wishlist, your dates and your budget. We reply with a real, workable day-by-day plan.",
      price: "quoted per plan",
      unit: "/ tailored",
      duration: "1–14 days",
      group: "any size",
      features: [
        "Multi-day routing across Bali, Nusa & Lombok",
        "Hotels, villas and boat transfers arranged for you",
        "Photographer, chef or spa therapist on request",
        "Honeymoon, family, corporate & content-shoot setups",
        "Dietary, mobility and prayer-time needs accounted for",
        "One WhatsApp thread from planning to goodbye",
      ],
    },
  },

  home: {
    hero: {
      eyebrow: "Licensed local operator · Since 2014",
      title1: "See Bali",
      title2: "like a local",
      title3: "not a list",
      subtitle:
        "We are a small Bali-born team building private, sharing and fully custom day trips. No megaphone, no forced souvenir stops — just the island, paced the way you like it.",
      ctaPrimary: "Request a Tour",
      ctaSecondary: "Browse Tours",
      badge1: "No hidden fees",
      badge2: "Free cancellation 24h",
      badge3: "Replies in ~15 min",
      scroll: "Scroll",
    },
    ticker: [
      "Ubud Rice Terraces",
      "Nusa Penida",
      "Mount Batur Sunrise",
      "Uluwatu Kecak",
      "Tanah Lot",
      "Sekumpul Waterfall",
      "Gili Islands",
      "Sidemen Valley",
    ],
    why: {
      eyebrow: "Why travellers pick us",
      title: "Small operator, obsessive about the details",
      subtitle:
        "We run fewer trips than the big agencies on purpose. It keeps every day personal.",
      items: [
        {
          title: "Real local guides",
          desc: "Born here, licensed here. They know which warung is worth stopping at and which viewpoint empties out at 4pm.",
        },
        {
          title: "Honest, flat pricing",
          desc: "The number we quote is the number you pay. Fuel, parking, driver meals and tolls are already inside it.",
        },
        {
          title: "Flexible on the day",
          desc: "Woke up late? Fell in love with a beach? Say the word and we reshuffle the route, no surcharge.",
        },
        {
          title: "Answered by a human",
          desc: "One WhatsApp thread, one person, from your first question until we drop you at the airport.",
        },
      ],
    },
    experiences: {
      eyebrow: "Three ways to travel",
      title: "Pick the shape of your day",
      subtitle:
        "Same guides, same care — three different formats depending on your budget and how private you want it.",
      cta: "Request this tour",
      compare: "Compare all three",
    },
    destinations: {
      eyebrow: "Where we go",
      title: "The island, sorted by mood",
      subtitle:
        "Every route below is fully mixable. Tell us the mood and we'll build the day around it.",
      items: [
        {
          name: "Ubud & The Highlands",
          tag: "Culture",
          desc: "Terraced rice fields, monkey forest, silversmiths and a coffee stop with a view.",
        },
        {
          name: "Nusa Penida",
          tag: "Island hop",
          desc: "Kelingking cliff, Angel's Billabong and a fast-boat morning you'll talk about for years.",
        },
        {
          name: "Mount Batur",
          tag: "Sunrise",
          desc: "A 2am start, a volcano ridge, and breakfast cooked in actual steam vents.",
        },
        {
          name: "Uluwatu & The South",
          tag: "Sunset",
          desc: "Clifftop temple, Kecak fire dance and a seafood dinner on Jimbaran sand.",
        },
        {
          name: "North Waterfalls",
          tag: "Nature",
          desc: "Sekumpul, Banyumala and Git Git — the green, cool, far-from-traffic side of Bali.",
        },
        {
          name: "Sidemen & The East",
          tag: "Slow travel",
          desc: "Weaving villages, water palaces and the Bali people came for in the eighties.",
        },
      ],
    },
    steps: {
      eyebrow: "How it works",
      title: "Four steps, zero stress",
      subtitle: "Most trips are fully locked in within a single afternoon.",
      items: [
        {
          title: "Tell us your wishlist",
          desc: "Dates, group size, must-sees and hard no's. A rough idea is completely fine.",
        },
        {
          title: "Get a real plan back",
          desc: "Within a few hours you receive a timed route, a flat price and honest notes on what won't fit.",
        },
        {
          title: "Confirm & relax",
          desc: "A small deposit locks the date. The rest is paid in cash or transfer after the trip.",
        },
        {
          title: "We pick you up",
          desc: "Your guide messages the night before and is at the lobby on time. That's it.",
        },
      ],
    },
    stats: {
      eyebrow: "Ten years on the road",
      title: "Numbers we're quietly proud of",
      items: [
        { value: 12400, suffix: "+", label: "Guests guided", decimals: 0 },
        { value: 4.9, suffix: "/5", label: "Average rating", decimals: 1 },
        { value: 96, suffix: "%", label: "Would book again", decimals: 0 },
        { value: 38, suffix: "", label: "Routes on the map", decimals: 0 },
      ],
    },
    testimonialTeaser: {
      eyebrow: "Guest words",
      title: "Not written by us",
      subtitle: "A few of the messages that made the whole team's week.",
      cta: "Read all reviews",
    },
    cta: {
      title: "Ready when you are",
      subtitle:
        "Send us a rough idea today and you'll have a real itinerary before you go to bed.",
      primary: "Request a Tour",
      secondary: "Chat on WhatsApp",
      note: "No deposit needed to get a quote.",
    },
  },

  about: {
    hero: {
      eyebrow: "About us",
      title: "Started with one car and a very long list of favourite places",
      subtitle:
        "Vera Bali Tour began in 2014 in a Denpasar living room. Ten years later we're still small on purpose — because the moment we grow past what we can personally check, the trips stop feeling like ours.",
    },
    story: {
      eyebrow: "Our story",
      title: "We built the company we wished existed",
      body: [
        "Vera grew up in Gianyar, ten minutes from a rice terrace that tourists now queue to photograph. After years of driving for large agencies, she kept running into the same problem: the schedule always won, and the guest always lost.",
        "So in 2014 she started something smaller. One car, one phone number, and a rule that the itinerary bends around the guest rather than the other way round. The first month brought four bookings. All four sent friends.",
        "Today we're a team of eighteen — drivers, guides, planners and one very patient office cat — and we still answer every message ourselves. We've simply gotten better at knowing which beach is calm on a windy Tuesday.",
      ],
    },
    values: {
      eyebrow: "What we stand on",
      title: "Three things we refuse to compromise",
      items: [
        {
          title: "Nobody gets rushed",
          desc: "If a place moves you, stay. We plan buffer into every route so a long stop never wrecks the day.",
        },
        {
          title: "No commission stops",
          desc: "We don't get paid to park at a jewellery showroom. If we take you somewhere, it's because it's worth your time.",
        },
        {
          title: "Locals paid properly",
          desc: "Our guides earn above the island average and keep 100% of tips. Good trips come from people who aren't exhausted.",
        },
      ],
    },
    timeline: {
      eyebrow: "The long version",
      title: "How we got here",
      items: [
        { year: "2014", title: "One car, one driver", desc: "Vera starts taking bookings from a notebook and a second-hand Avanza." },
        { year: "2016", title: "First sharing routes", desc: "Demand from solo travellers pushes us to open small, capped group days." },
        { year: "2018", title: "Licensed & insured", desc: "Full operator licence, passenger insurance and four more cars join the fleet." },
        { year: "2020", title: "The quiet years", desc: "We keep every guide on partial pay and spend the time re-scouting all 38 routes." },
        { year: "2022", title: "Back, and busier", desc: "Multi-day custom trips overtake day tours for the first time." },
        { year: "2025", title: "Eighteen people strong", desc: "Nusa Penida and Lombok extensions go live. Still answering our own WhatsApp." },
      ],
    },
    team: {
      eyebrow: "The people",
      title: "Who you'll actually be talking to",
      subtitle: "No call centre. These are the names that show up in your chat.",
      items: [
        { name: "Vera Hutasoit", role: "Founder & Head Planner", bio: "Builds every custom itinerary personally. Will absolutely argue with you about the best sunrise spot." },
        { name: "Made Suparta", role: "Lead Guide", bio: "Licensed guide since 2009. Speaks Balinese, Indonesian, English and fluent temple etiquette." },
        { name: "Ayu Pradnya", role: "Guest Relations", bio: "The one who replies at 11pm. Keeps every booking, ferry ticket and dietary note in order." },
        { name: "Komang Bagus", role: "Senior Driver", bio: "Twelve years, zero incidents. Knows a back road out of every traffic jam in Denpasar." },
      ],
    },
    certs: {
      title: "Licensed, insured, accountable",
      items: ["Registered Tour Operator", "Passenger Insurance Covered", "Certified Local Guides", "Verified Payment Partner"],
    },
    cta: {
      title: "Come travel with us",
      subtitle: "Tell us what kind of trip you're imagining. We'll be honest about what's possible.",
      primary: "Request a Tour",
    },
  },

  tour: {
    hero: {
      eyebrow: "Our tours",
      title: "Three formats. One island. Your call.",
      subtitle:
        "Every tour below is run by our own guides and priced flat. Pick a format, hit request, and tell us what your ideal day looks like.",
    },
    cardCta: "Request this tour",
    cardIncludes: "What's included",
    labels: {
      duration: "Duration",
      group: "Group size",
      price: "Starting at",
      popular: "Most popular",
      best: "Best value",
      flexible: "Fully flexible",
    },
    compare: {
      eyebrow: "Side by side",
      title: "Which one fits you?",
      subtitle: "The honest comparison — including where each format falls short.",
      headers: ["", "Private", "Sharing", "Customized"],
      rows: [
        { label: "Starting price", values: ["IDR 750K / car", "IDR 285K / person", "Quoted"] },
        { label: "Group", values: ["Only your group", "Max 12 people", "Any size"] },
        { label: "Route changes on the day", values: ["Yes, anytime", "Fixed route", "Yes, anytime"] },
        { label: "Pickup", values: ["Your hotel", "Meeting point", "Anywhere"] },
        { label: "Multi-day", values: ["On request", "No", "Built for it"] },
        { label: "Best for", values: ["Families & couples", "Solo & budget", "Special occasions"] },
      ],
    },
    packages: {
      eyebrow: "Ready-made routes",
      title: "Popular day plans",
      subtitle: "Book one as-is, or use it as a starting point and we'll edit it with you.",
      cta: "Request",
      items: [
        { name: "Ubud Classic", tag: "Culture", duration: "10h", price: "IDR 850K", desc: "Tegalalang terraces, monkey forest, Tirta Empul and a Campuhan ridge sunset." },
        { name: "Nusa Penida West", tag: "Island", duration: "12h", price: "IDR 1.150K", desc: "Fast boat, Kelingking, Broken Beach, Angel's Billabong and Crystal Bay." },
        { name: "Batur Sunrise Trek", tag: "Adventure", duration: "11h", price: "IDR 1.050K", desc: "2am start, guided summit hike, volcanic steam breakfast and hot springs after." },
        { name: "South Cliffs & Kecak", tag: "Sunset", duration: "8h", price: "IDR 780K", desc: "Padang Padang, Uluwatu temple, Kecak fire dance and Jimbaran seafood." },
        { name: "North Waterfall Chase", tag: "Nature", duration: "12h", price: "IDR 980K", desc: "Sekumpul, Banyumala twin falls, Ulun Danu Beratan and a Munduk coffee stop." },
        { name: "East Bali Slow Day", tag: "Slow", duration: "10h", price: "IDR 890K", desc: "Lempuyang gates, Tirta Gangga, Sidemen weaving and Virgin Beach." },
      ],
    },
    faq: {
      eyebrow: "Before you ask",
      title: "Frequently asked",
      items: [
        { q: "How far ahead should I book?", a: "For day tours, 2–3 days is usually enough. For Nusa Penida, Batur sunrise or anything in July–August and December, give us 1–2 weeks so we can hold the right boat and guide." },
        { q: "What's actually included in the price?", a: "Car, fuel, parking, tolls, driver-guide and their meals. Entrance tickets and your own meals are separate on Private tours, and already bundled in on Sharing tours. We list it plainly in every quote — no surprises at the end of the day." },
        { q: "Can I change the plan mid-trip?", a: "On Private and Customized tours, absolutely. Tell your guide and we reshuffle. Sharing tours follow a fixed route because other guests are on the same schedule." },
        { q: "How do I pay?", a: "A small deposit by bank transfer, Wise or PayPal confirms your date. The balance is paid in cash (IDR) or transfer after the tour. We never ask for full payment upfront." },
        { q: "What if it rains?", a: "Bali rain is usually short. Your guide will flip the route order so you're indoors during the worst of it. If a boat crossing is cancelled for weather, you get a full refund or a free reschedule." },
        { q: "Is it suitable for kids or older parents?", a: "Yes — just tell us in the request form. We'll pick flatter stops, add rest breaks, arrange a child seat and skip anything with a 300-step staircase." },
        { q: "Do you cover Nusa Penida and Lombok?", a: "Yes. Nusa Penida runs as a day trip or overnight, and Lombok / Gili is a 2–4 day extension we arrange end to end, ferries included." },
        { q: "What's your cancellation policy?", a: "Free cancellation up to 24 hours before pickup, deposit fully refunded. Inside 24 hours we keep the deposit, unless it's a medical or flight issue — then we just reschedule." },
      ],
    },
    cta: {
      title: "Still deciding?",
      subtitle: "Send the request form anyway. We'll tell you which format actually suits your plan.",
      primary: "Request a Tour",
    },
  },

  testimonial: {
    hero: {
      eyebrow: "Testimonials",
      title: "Twelve thousand guests, and counting",
      subtitle:
        "We ask everyone for honest feedback after their trip — the good and the awkward. Here's what came back.",
    },
    stats: [
      { value: 4.9, suffix: "/5", label: "Average rating", decimals: 1 },
      { value: 2870, suffix: "+", label: "Written reviews", decimals: 0 },
      { value: 96, suffix: "%", label: "Would book again", decimals: 0 },
      { value: 41, suffix: "", label: "Countries hosted", decimals: 0 },
    ],
    featured: {
      eyebrow: "Featured",
      title: "The long ones",
      subtitle: "Reviews that took people a while to write. Drag or use the arrows.",
      prev: "Previous review",
      next: "Next review",
    },
    grid: {
      eyebrow: "Everything else",
      title: "Straight from the inbox",
      filterAll: "All tours",
      empty: "No reviews in this category yet.",
    },
    cta: {
      title: "Your turn",
      subtitle: "Let's build the trip your friends will ask you about.",
      primary: "Request a Tour",
    },
    verified: "Verified guest",
  },

  contact: {
    hero: {
      eyebrow: "Contact",
      title: "Talk to an actual person",
      subtitle:
        "WhatsApp is fastest — we usually reply within fifteen minutes between 08.00 and 22.00 Bali time (GMT+8). Email works too, just a little slower.",
    },
    cards: [
      { title: "WhatsApp", value: "+62 812-3456-7890", note: "Fastest · 08.00–22.00 WITA", action: "Chat now" },
      { title: "Email", value: "hello@verabalitour.com", note: "Replies within 12 hours", action: "Send email" },
      { title: "Office", value: "Jl. Raya Ubud No. 88, Gianyar, Bali 80571", note: "Visits by appointment", action: "Open in Maps" },
    ],
    hours: {
      title: "When we're around",
      items: [
        { day: "Monday – Friday", time: "08.00 – 22.00" },
        { day: "Saturday", time: "08.00 – 20.00" },
        { day: "Sunday", time: "09.00 – 18.00" },
        { day: "Public holidays", time: "WhatsApp only" },
      ],
      note: "All times are WITA (GMT+8). Guests already on tour can reach their guide 24/7.",
    },
    form: {
      title: "Send us a message",
      subtitle: "Prefer a form? Fill this in and we'll pick it up from there.",
      name: "Your name",
      namePh: "e.g. Sarah Lim",
      email: "Email",
      emailPh: "you@email.com",
      phone: "WhatsApp number",
      phonePh: "+62 · optional but faster",
      subject: "Subject",
      subjectPh: "What's this about?",
      message: "Message",
      messagePh: "Tell us anything — dates, questions, wild ideas.",
      submit: "Send message",
      sending: "Sending…",
      success: "Got it! We'll get back to you shortly.",
      successNote: "This is a demo form — nothing was actually sent.",
      another: "Send another",
      required: "Required",
      invalidEmail: "That email doesn't look right",
    },
    map: {
      title: "Find us",
      note: "Ubud office · 15 min from Central Ubud",
      cta: "Get directions",
    },
    social: { title: "Elsewhere on the internet" },
  },

  modal: {
    title: "Request a tour",
    subtitle: "Tell us what you're after. No payment, no commitment — just a real plan back.",
    step: "Step",
    of: "of",
    next: "Next",
    back: "Back",
    submit: "Send request",
    sending: "Sending…",
    close: "Close request form",
    steps: ["Tour type", "Trip details", "About you"],
    fields: {
      tourType: "Which tour format?",
      destinations: "Where do you want to go?",
      destinationsHint: "Pick as many as you like — or none, and we'll suggest.",
      date: "Preferred start date",
      days: "How many days?",
      pax: "How many people?",
      paxAdults: "Adults",
      paxKids: "Children",
      budget: "Rough budget per person",
      budgetOpts: ["Not sure yet", "Under IDR 1M", "IDR 1M – 3M", "IDR 3M – 7M", "Above IDR 7M"],
      name: "Your name",
      namePh: "e.g. Sarah Lim",
      email: "Email",
      emailPh: "you@email.com",
      phone: "WhatsApp",
      phonePh: "+62 812…",
      country: "Country",
      countryPh: "e.g. Singapore",
      notes: "Anything else we should know?",
      notesPh: "Dietary needs, mobility, celebrating something, must-see spots…",
      consent: "I agree to be contacted about this request.",
    },
    success: {
      title: "Request sent!",
      body: "We've got your details. Expect a real itinerary and a flat price in your inbox within a few hours.",
      note: "Demo notice: this is a front-end prototype, so nothing left your browser.",
      cta: "Done",
      whatsapp: "Continue on WhatsApp",
    },
    errors: {
      required: "This one's required",
      email: "That email doesn't look right",
      consent: "Please tick the box so we can reply",
      pax: "At least one traveller, please",
    },
  },

  cookie: {
    title: "We use a few cookies",
    body: "Necessary ones keep the site working. The rest only load if you say yes — analytics to see which pages help, and marketing to stop showing you ads you've already seen.",
    accept: "Accept all",
    reject: "Reject non-essential",
    customize: "Customize",
    save: "Save my choices",
    policyLink: "Read our Privacy Policy",
    manage: "Cookie settings",
    savedToast: "Cookie preferences saved.",
    categories: {
      necessary: { title: "Strictly necessary", desc: "Language choice, your cookie decision and basic security. These can't be switched off.", always: "Always on" },
      preferences: { title: "Preferences", desc: "Remembers small things like your last viewed tour so the site feels less forgetful." },
      analytics: { title: "Analytics", desc: "Anonymous page counts so we know which pages actually help people plan." },
      marketing: { title: "Marketing", desc: "Lets us measure ads and avoid showing you the same one eleven times." },
    },
  },

  floating: {
    whatsapp: "Chat on WhatsApp",
    whatsappBubble: "Hi! Need help planning?",
    language: "Change language",
    languageLabel: "Language",
    top: "Back to top",
  },

  loader: {
    welcome: "Welcome to",
    tagline: "Crafting your island escape…",
    phases: ["Waking the volcanoes", "Warming the ocean", "Brewing the coffee", "Almost there"],
    loading: "Loading",
  },

  footer: {
    blurb: "A small, licensed Bali tour operator running private, sharing and fully custom trips since 2014.",
    explore: "Explore",
    tours: "Tours",
    legal: "Legal",
    contact: "Get in touch",
    newsletter: {
      title: "Slow travel notes",
      desc: "One short email a month: a route we re-scouted, a warung worth the detour. No spam.",
      placeholder: "your@email.com",
      button: "Subscribe",
      success: "You're on the list. Selamat datang!",
      invalid: "Please enter a valid email.",
      note: "Demo form — nothing is stored.",
    },
    rights: "All rights reserved.",
    madeIn: "Made in Bali",
    disclaimer: "Vera Bali Tour is a fictional demo brand. Prices, reviews and imagery are illustrative.",
  },

  legal: {
    updated: "Last updated",
    updatedDate: "7 August 2026",
    toc: "On this page",
    backHome: "Back to home",
    privacy: {
      title: "Privacy Policy",
      intro:
        "This policy explains what Vera Bali Tour collects when you use this website or book a trip with us, why we collect it, and what you can ask us to do with it. Plain language, no legal fog.",
      sections: [
        {
          title: "1. Who we are",
          body: [
            "Vera Bali Tour (\"we\", \"us\") is a tour operator based at Jl. Raya Ubud No. 88, Gianyar, Bali 80571, Indonesia. We are the data controller for information collected through verabalitour.com.",
            "For any privacy question, write to hello@verabalitour.com and mark the subject \"Privacy\". A human reads it.",
          ],
        },
        {
          title: "2. What we collect",
          body: [
            "Information you give us: your name, email, WhatsApp number, country, travel dates, group size, budget range and any notes you type into our request or contact forms.",
            "Information collected automatically: pages viewed, approximate region, device type, referring site and session duration — and only if you accepted analytics cookies.",
            "We never ask for passport scans, card numbers or bank credentials through this website.",
          ],
        },
        {
          title: "3. Why we use it",
          body: [
            "To answer your enquiry and prepare an itinerary and quote.",
            "To run the trip you booked — sharing your first name and pickup point with the assigned guide and driver, and your name with ferry or ticket operators where a manifest is legally required.",
            "To improve the website, based on aggregated and anonymous usage patterns.",
            "To send you our monthly newsletter, but only if you subscribed. Every email has a one-click unsubscribe.",
          ],
        },
        {
          title: "4. Cookies",
          body: [
            "Strictly necessary cookies store your language choice and your cookie decision. They cannot be switched off because the site would not work correctly without them.",
            "Preference, analytics and marketing cookies are off by default and only activate when you enable them in the cookie banner.",
            "You can change or withdraw your choice at any time using the \"Cookie settings\" link in the footer. Withdrawing consent removes the related cookies on your next page load.",
          ],
        },
        {
          title: "5. Who we share it with",
          body: [
            "Our own guides and drivers, limited to what they need to collect you.",
            "Service providers who host this site, deliver our email and process payments. They act on our instructions only.",
            "Authorities, where Indonesian law requires it — for example passenger manifests for sea crossings.",
            "We do not sell your data. We never have and we do not plan to start.",
          ],
        },
        {
          title: "6. How long we keep it",
          body: [
            "Enquiries that do not become bookings: 12 months, then deleted.",
            "Completed bookings: 5 years, because Indonesian tax and tourism rules require it.",
            "Newsletter subscribers: until you unsubscribe, plus 30 days.",
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
            "The site is served over HTTPS. Form submissions are encrypted in transit. Access to booking records is limited to staff who need it, protected by two-factor authentication.",
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
        "These terms cover your use of verabalitour.com and any tour you book with us. By using the site or confirming a booking, you agree to them.",
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
            "You may not scrape the site at scale, copy our written content or photography for another travel business, attempt to break our security, or upload anything unlawful through our forms.",
            "We may suspend access if the site is being misused.",
          ],
        },
        {
          title: "3. Bookings and quotes",
          body: [
            "A request submitted through this site is an enquiry, not a confirmed booking. Nothing is reserved until we reply with a written confirmation.",
            "Prices shown on the site are indicative starting points and can change with season, group size, fuel costs and ferry schedules. The price in your written confirmation is the one that applies.",
            "A deposit confirms your date. The balance is due after the tour, in Indonesian Rupiah cash or by transfer.",
          ],
        },
        {
          title: "4. Cancellation and changes",
          body: [
            "Cancel more than 24 hours before pickup: full deposit refund.",
            "Cancel within 24 hours: the deposit is retained, unless illness or a cancelled flight is involved — in that case we reschedule at no cost.",
            "If we cancel — mechanical issue, unsafe weather, a cancelled boat crossing — you choose between a full refund or a free reschedule.",
            "Route changes requested during a Private or Customized tour are free. Sharing tours run a fixed route and cannot be altered for one guest.",
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
            "We are not responsible for personal belongings left behind at a stop or in a vehicle, although we will always try to recover them.",
            "Adventure activities — trekking, snorkelling, rafting, cliff viewpoints — carry inherent risk. We strongly recommend personal travel insurance, and you take part at your own risk.",
          ],
        },
        {
          title: "7. Third-party content",
          body: [
            "Our pages may link to maps, ticket operators or accommodation partners. We do not control those sites and are not responsible for their content or their privacy practices.",
          ],
        },
        {
          title: "8. Intellectual property",
          body: [
            "All text, layout, illustration and code on this site belong to Vera Bali Tour unless stated otherwise. Guest reviews remain the property of the guests who wrote them and are published with permission.",
          ],
        },
        {
          title: "9. Demo disclaimer",
          body: [
            "Vera Bali Tour is a fictional brand built as a portfolio demonstration. Prices, testimonials, addresses, phone numbers and illustrations are placeholders. Forms on this site do not transmit or store data.",
          ],
        },
        {
          title: "10. Governing law",
          body: [
            "These terms are governed by the laws of the Republic of Indonesia. Disputes fall under the jurisdiction of the courts of Denpasar, Bali — although we would much rather sort it out over a message.",
          ],
        },
      ],
    },
  },

  notFound: {
    title: "Took a wrong turn",
    subtitle: "This page isn't on any of our routes. Let's get you back on the road.",
    cta: "Back to home",
    code: "404",
  },

  common: {
    learnMore: "Learn more",
    viewAll: "View all",
    from: "from",
    perPerson: "per person",
    days: "days",
    hours: "hours",
    people: "people",
    optional: "optional",
    new: "New",
    skipToContent: "Skip to content",
  },
};

/* ------------------------------------------------------------------ */
/*  BAHASA INDONESIA — santai tapi tetap sopan                         */
/* ------------------------------------------------------------------ */

type Dict = typeof en;

const id: Dict = {
  brand: {
    name: "Vera Bali Tour",
    short: "VBT",
    tagline: "Keliling Bali seperti diajak jalan sama teman sendiri.",
  },

  nav: {
    home: "Beranda",
    about: "Tentang",
    tour: "Tur",
    testimonial: "Testimoni",
    contact: "Kontak",
    privacy: "Kebijakan Privasi",
    terms: "Syarat Penggunaan",
    menu: "Menu",
    close: "Tutup",
    openMenu: "Buka menu navigasi",
    closeMenu: "Tutup menu navigasi",
    cta: "Rencanakan Trip",
    dropdownHint: "Pilih satu, lalu ceritakan rencana Anda →",
  },

  tourTypes: {
    private: {
      name: "Private Tour",
      short: "Cuma rombongan Anda",
      desc: "Satu mobil, satu driver-guide, dan satu hari penuh yang sepenuhnya milik Anda dan orang-orang yang Anda ajak.",
      price: "mulai Rp 750rb",
      unit: "/ mobil / hari",
      duration: "8–12 jam",
      group: "1–6 orang",
      features: [
        "Mobil AC pribadi, bensin & parkir sudah termasuk",
        "Driver-guide berbahasa Inggris yang benar-benar memandu",
        "Jemput & antar ke hotel mana pun di Bali Selatan",
        "Rute boleh diubah di hari-H, tanpa biaya tambahan",
        "Berhenti foto sepuasnya — kami tidak akan buru-buru",
        "Air mineral, payung, dan charger HP tersedia di mobil",
      ],
    },
    sharing: {
      name: "Sharing Tour",
      short: "Grup kecil, harga lebih ramah",
      desc: "Gabung dengan traveler lain dalam grup terbatas di rute yang sudah ditentukan. Guide-nya sama, tempatnya sama, tagihannya lebih bersahabat.",
      price: "mulai Rp 285rb",
      unit: "/ orang",
      duration: "9–10 jam",
      group: "maks 12 orang",
      features: [
        "Maksimal 12 peserta — bukan bus penuh orang asing",
        "Berangkat pasti jam 08.00, balik sebelum matahari terbenam",
        "Minibus AC bersama dengan guide berlisensi",
        "Titik jemput di Kuta, Seminyak, dan Ubud",
        "Tiket masuk sudah digabung jadi satu harga",
        "Cara paling gampang kenalan sama traveler dari mana-mana",
      ],
    },
    customized: {
      name: "Customized Tour",
      short: "Disusun dari daftar Anda",
      desc: "Kirim wishlist, tanggal, dan budget Anda. Kami balas dengan rencana harian yang realistis dan siap jalan.",
      price: "harga menyesuaikan",
      unit: "/ custom",
      duration: "1–14 hari",
      group: "bebas",
      features: [
        "Rute multi-hari lintas Bali, Nusa, sampai Lombok",
        "Hotel, vila, dan tiket kapal kami yang urus",
        "Fotografer, chef, atau terapis spa bisa ditambahkan",
        "Cocok untuk honeymoon, keluarga, korporat, atau content shoot",
        "Kebutuhan makanan, mobilitas, dan waktu ibadah kami perhatikan",
        "Satu chat WhatsApp dari awal rencana sampai hari terakhir",
      ],
    },
  },

  home: {
    hero: {
      eyebrow: "Operator lokal berlisensi · Sejak 2014",
      title1: "Nikmati Bali",
      title2: "ala orang lokal",
      title3: "bukan sekadar checklist",
      subtitle:
        "Kami tim kecil asli Bali yang bikin trip harian: private, sharing, dan full custom. Tanpa megafon, tanpa mampir toko oleh-oleh paksaan — hanya Bali, dengan ritme yang Anda tentukan sendiri.",
      ctaPrimary: "Ajukan Tur",
      ctaSecondary: "Lihat Semua Tur",
      badge1: "Tanpa biaya tersembunyi",
      badge2: "Batal gratis H-24 jam",
      badge3: "Dibalas ±15 menit",
      scroll: "Gulir",
    },
    ticker: [
      "Terasering Ubud",
      "Nusa Penida",
      "Sunrise Gunung Batur",
      "Kecak Uluwatu",
      "Tanah Lot",
      "Air Terjun Sekumpul",
      "Kepulauan Gili",
      "Lembah Sidemen",
    ],
    why: {
      eyebrow: "Kenapa banyak yang balik lagi",
      title: "Operator kecil, tapi rewel soal detail",
      subtitle:
        "Kami memang sengaja ambil trip lebih sedikit dari agensi besar. Supaya setiap hari tetap terasa personal.",
      items: [
        {
          title: "Guide lokal beneran",
          desc: "Lahir dan berlisensi di sini. Mereka tahu warung mana yang layak mampir, dan spot mana yang sepi jam 4 sore.",
        },
        {
          title: "Harga jujur dan flat",
          desc: "Angka yang kami sebut ya itu yang Anda bayar. Bensin, parkir, makan driver, dan tol sudah masuk di dalamnya.",
        },
        {
          title: "Fleksibel di hari-H",
          desc: "Bangun kesiangan? Kepincut satu pantai? Bilang saja, rutenya kami atur ulang tanpa biaya tambahan.",
        },
        {
          title: "Dibalas manusia asli",
          desc: "Satu chat WhatsApp, satu orang yang sama, dari pertanyaan pertama sampai kami antar ke bandara.",
        },
      ],
    },
    experiences: {
      eyebrow: "Tiga cara jalan-jalan",
      title: "Pilih bentuk hari Anda",
      subtitle:
        "Guide-nya sama, perhatiannya sama — tiga format berbeda, tinggal sesuaikan budget dan seberapa privat yang Anda mau.",
      cta: "Ajukan tur ini",
      compare: "Bandingkan ketiganya",
    },
    destinations: {
      eyebrow: "Ke mana saja kami pergi",
      title: "Satu pulau, dibagi per suasana",
      subtitle:
        "Semua rute di bawah bisa dicampur. Sebutkan suasananya, kami susun harinya.",
      items: [
        {
          name: "Ubud & Dataran Tinggi",
          tag: "Budaya",
          desc: "Sawah terasering, monkey forest, pengrajin perak, dan ngopi dengan pemandangan.",
        },
        {
          name: "Nusa Penida",
          tag: "Island hop",
          desc: "Tebing Kelingking, Angel's Billabong, dan pagi naik fast boat yang bakal diceritakan bertahun-tahun.",
        },
        {
          name: "Gunung Batur",
          tag: "Sunrise",
          desc: "Berangkat jam 2 pagi, jalan di punggung gunung, sarapan dimasak dengan uap panas bumi.",
        },
        {
          name: "Uluwatu & Bali Selatan",
          tag: "Sunset",
          desc: "Pura di atas tebing, tari Kecak, dan makan seafood di pasir Jimbaran.",
        },
        {
          name: "Air Terjun Bali Utara",
          tag: "Alam",
          desc: "Sekumpul, Banyumala, dan Git Git — sisi Bali yang hijau, sejuk, dan jauh dari macet.",
        },
        {
          name: "Sidemen & Bali Timur",
          tag: "Slow travel",
          desc: "Desa tenun, taman air, dan Bali yang bikin orang jatuh cinta sejak era delapan puluhan.",
        },
      ],
    },
    steps: {
      eyebrow: "Cara kerjanya",
      title: "Empat langkah, tanpa drama",
      subtitle: "Kebanyakan trip sudah fix cuma dalam satu sore.",
      items: [
        {
          title: "Ceritakan wishlist Anda",
          desc: "Tanggal, jumlah orang, wajib ke mana, dan yang tidak diminati. Gambaran kasar saja sudah cukup.",
        },
        {
          title: "Terima rencana beneran",
          desc: "Dalam beberapa jam Anda dapat rute lengkap dengan jam, harga flat, plus catatan jujur soal apa yang tidak muat.",
        },
        {
          title: "Konfirmasi, lalu santai",
          desc: "Deposit kecil untuk mengunci tanggal. Sisanya dibayar tunai atau transfer setelah trip selesai.",
        },
        {
          title: "Kami jemput Anda",
          desc: "Guide Anda chat malam sebelumnya dan sudah standby di lobi tepat waktu. Selesai.",
        },
      ],
    },
    stats: {
      eyebrow: "Sepuluh tahun di jalan",
      title: "Angka yang diam-diam kami banggakan",
      items: [
        { value: 12400, suffix: "+", label: "Tamu dipandu", decimals: 0 },
        { value: 4.9, suffix: "/5", label: "Rating rata-rata", decimals: 1 },
        { value: 96, suffix: "%", label: "Mau booking lagi", decimals: 0 },
        { value: 38, suffix: "", label: "Rute di peta kami", decimals: 0 },
      ],
    },
    testimonialTeaser: {
      eyebrow: "Kata tamu kami",
      title: "Bukan kami yang menulis",
      subtitle: "Beberapa pesan yang bikin satu tim senyum seminggu penuh.",
      cta: "Baca semua ulasan",
    },
    cta: {
      title: "Kami siap kapan pun Anda siap",
      subtitle:
        "Kirim gambaran kasarnya hari ini, itinerary lengkapnya sampai sebelum Anda tidur.",
      primary: "Ajukan Tur",
      secondary: "Chat WhatsApp",
      note: "Minta penawaran tidak perlu bayar deposit dulu.",
    },
  },

  about: {
    hero: {
      eyebrow: "Tentang kami",
      title: "Berawal dari satu mobil dan daftar tempat favorit yang kepanjangan",
      subtitle:
        "Vera Bali Tour lahir tahun 2014 di ruang tamu sebuah rumah di Denpasar. Sepuluh tahun kemudian kami masih sengaja bertahan kecil — karena begitu kami tumbuh melebihi yang bisa kami cek sendiri, trip-nya berhenti terasa seperti milik kami.",
    },
    story: {
      eyebrow: "Cerita kami",
      title: "Kami bikin perusahaan yang dulu kami cari-cari",
      body: [
        "Vera besar di Gianyar, sepuluh menit dari sawah terasering yang sekarang antre difoto turis. Setelah bertahun-tahun jadi driver di agensi besar, dia selalu ketemu masalah yang sama: jadwal selalu menang, tamu selalu mengalah.",
        "Jadi di tahun 2014 dia mulai sesuatu yang lebih kecil. Satu mobil, satu nomor telepon, dan satu aturan: itinerary yang menyesuaikan tamu, bukan sebaliknya. Bulan pertama dapat empat booking. Keempatnya kirim teman.",
        "Sekarang kami delapan belas orang — driver, guide, planner, dan satu kucing kantor yang sangat sabar — dan semua pesan masih kami balas sendiri. Bedanya, kami makin hafal pantai mana yang tetap tenang saat Selasa berangin.",
      ],
    },
    values: {
      eyebrow: "Yang kami pegang",
      title: "Tiga hal yang tidak kami tawar",
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
          desc: "Guide kami digaji di atas rata-rata Bali dan tip 100% jadi milik mereka. Trip bagus datang dari orang yang tidak kelelahan.",
        },
      ],
    },
    timeline: {
      eyebrow: "Versi panjangnya",
      title: "Perjalanan sampai di sini",
      items: [
        { year: "2014", title: "Satu mobil, satu driver", desc: "Vera mulai terima booking bermodal buku catatan dan Avanza bekas." },
        { year: "2016", title: "Rute sharing pertama", desc: "Permintaan dari solo traveler mendorong kami buka trip grup kecil." },
        { year: "2018", title: "Berlisensi & berasuransi", desc: "Izin operator lengkap, asuransi penumpang, dan empat mobil baru bergabung." },
        { year: "2020", title: "Tahun-tahun sepi", desc: "Semua guide tetap kami gaji sebagian, waktunya dipakai survei ulang 38 rute." },
        { year: "2022", title: "Kembali, dan makin ramai", desc: "Untuk pertama kalinya trip custom multi-hari melebihi tur harian." },
        { year: "2025", title: "Delapan belas orang", desc: "Ekstensi Nusa Penida dan Lombok resmi jalan. WhatsApp masih kami balas sendiri." },
      ],
    },
    team: {
      eyebrow: "Orang-orangnya",
      title: "Siapa yang benar-benar ngobrol dengan Anda",
      subtitle: "Bukan call center. Ini nama-nama yang muncul di chat Anda.",
      items: [
        { name: "Vera Hutasoit", role: "Founder & Head Planner", bio: "Menyusun sendiri setiap itinerary custom. Siap berdebat soal spot sunrise terbaik." },
        { name: "Made Suparta", role: "Lead Guide", bio: "Guide berlisensi sejak 2009. Bahasa Bali, Indonesia, Inggris, dan tata krama pura." },
        { name: "Ayu Pradnya", role: "Guest Relations", bio: "Yang balas chat jam 11 malam. Semua booking, tiket kapal, dan catatan makanan rapi di tangannya." },
        { name: "Komang Bagus", role: "Senior Driver", bio: "Dua belas tahun, nol insiden. Hafal jalan tikus keluar dari setiap macet di Denpasar." },
      ],
    },
    certs: {
      title: "Berlisensi, berasuransi, bertanggung jawab",
      items: ["Operator Tur Terdaftar", "Asuransi Penumpang", "Guide Lokal Bersertifikat", "Mitra Pembayaran Terverifikasi"],
    },
    cta: {
      title: "Ayo jalan bareng kami",
      subtitle: "Ceritakan trip seperti apa yang Anda bayangkan. Kami akan jujur soal apa yang realistis.",
      primary: "Ajukan Tur",
    },
  },

  tour: {
    hero: {
      eyebrow: "Tur kami",
      title: "Tiga format. Satu pulau. Anda yang pilih.",
      subtitle:
        "Semua tur di bawah dijalankan guide kami sendiri dengan harga flat. Pilih formatnya, klik ajukan, lalu ceritakan hari ideal versi Anda.",
    },
    cardCta: "Ajukan tur ini",
    cardIncludes: "Yang sudah termasuk",
    labels: {
      duration: "Durasi",
      group: "Jumlah orang",
      price: "Mulai dari",
      popular: "Paling diminati",
      best: "Paling hemat",
      flexible: "Paling fleksibel",
    },
    compare: {
      eyebrow: "Berdampingan",
      title: "Mana yang paling cocok?",
      subtitle: "Perbandingan jujurnya — termasuk kekurangan masing-masing format.",
      headers: ["", "Private", "Sharing", "Customized"],
      rows: [
        { label: "Harga mulai", values: ["Rp 750rb / mobil", "Rp 285rb / orang", "Menyesuaikan"] },
        { label: "Rombongan", values: ["Hanya grup Anda", "Maks 12 orang", "Bebas"] },
        { label: "Ubah rute di hari-H", values: ["Bisa, kapan saja", "Rute tetap", "Bisa, kapan saja"] },
        { label: "Penjemputan", values: ["Hotel Anda", "Titik kumpul", "Di mana saja"] },
        { label: "Multi-hari", values: ["Bisa diminta", "Tidak", "Memang untuk itu"] },
        { label: "Paling cocok untuk", values: ["Keluarga & pasangan", "Solo & hemat", "Momen spesial"] },
      ],
    },
    packages: {
      eyebrow: "Rute siap pakai",
      title: "Paket harian favorit",
      subtitle: "Ambil apa adanya, atau jadikan titik awal lalu kita rapikan bareng.",
      cta: "Ajukan",
      items: [
        { name: "Ubud Klasik", tag: "Budaya", duration: "10j", price: "Rp 850rb", desc: "Terasering Tegalalang, monkey forest, Tirta Empul, dan sunset di Campuhan Ridge." },
        { name: "Nusa Penida Barat", tag: "Pulau", duration: "12j", price: "Rp 1.150rb", desc: "Fast boat, Kelingking, Broken Beach, Angel's Billabong, dan Crystal Bay." },
        { name: "Trekking Sunrise Batur", tag: "Petualangan", duration: "11j", price: "Rp 1.050rb", desc: "Start jam 2 pagi, naik puncak bersama guide, sarapan uap vulkanik, lanjut air panas." },
        { name: "Tebing Selatan & Kecak", tag: "Sunset", duration: "8j", price: "Rp 780rb", desc: "Padang Padang, Pura Uluwatu, tari Kecak, dan seafood Jimbaran." },
        { name: "Buru Air Terjun Utara", tag: "Alam", duration: "12j", price: "Rp 980rb", desc: "Sekumpul, kembar Banyumala, Ulun Danu Beratan, dan ngopi di Munduk." },
        { name: "Bali Timur Santai", tag: "Santai", duration: "10j", price: "Rp 890rb", desc: "Gerbang Lempuyang, Tirta Gangga, tenun Sidemen, dan Virgin Beach." },
      ],
    },
    faq: {
      eyebrow: "Sebelum Anda tanya",
      title: "Pertanyaan yang sering masuk",
      items: [
        { q: "Sebaiknya booking berapa lama sebelumnya?", a: "Untuk tur harian, 2–3 hari biasanya cukup. Untuk Nusa Penida, sunrise Batur, atau tanggal di Juli–Agustus dan Desember, kasih kami 1–2 minggu supaya kapal dan guide-nya bisa dikunci." },
        { q: "Harga itu sebenarnya sudah termasuk apa saja?", a: "Mobil, bensin, parkir, tol, driver-guide, dan makan mereka. Tiket masuk dan makan Anda dihitung terpisah di Private tour, sedangkan di Sharing tour sudah digabung. Semua kami tulis jelas di penawaran — tidak ada kejutan di akhir hari." },
        { q: "Boleh ubah rencana di tengah trip?", a: "Di Private dan Customized tour, sangat boleh. Bilang saja ke guide dan kami atur ulang. Sharing tour rutenya tetap karena ada tamu lain di jadwal yang sama." },
        { q: "Bayarnya bagaimana?", a: "Deposit kecil lewat transfer bank, Wise, atau PayPal untuk mengunci tanggal. Sisanya dibayar tunai (IDR) atau transfer setelah tur. Kami tidak pernah minta pelunasan di awal." },
        { q: "Kalau hujan bagaimana?", a: "Hujan di Bali biasanya sebentar. Guide Anda akan membalik urutan rute supaya Anda di dalam ruangan saat hujannya paling deras. Kalau penyeberangan kapal dibatalkan karena cuaca, uang Anda kembali penuh atau bisa dijadwal ulang gratis." },
        { q: "Aman untuk anak-anak atau orang tua?", a: "Aman — tinggal sebutkan di form pengajuan. Kami pilih spot yang lebih landai, tambah jeda istirahat, siapkan kursi anak, dan lewati tempat dengan tangga 300 anak." },
        { q: "Melayani Nusa Penida dan Lombok juga?", a: "Ya. Nusa Penida bisa sehari pulang-pergi atau menginap, sedangkan Lombok / Gili kami atur sebagai ekstensi 2–4 hari lengkap dengan tiket kapalnya." },
        { q: "Bagaimana kebijakan pembatalannya?", a: "Batal gratis sampai 24 jam sebelum penjemputan, deposit kembali penuh. Di bawah 24 jam deposit hangus, kecuali karena alasan kesehatan atau penerbangan — itu kami jadwal ulang saja." },
      ],
    },
    cta: {
      title: "Masih bingung pilih?",
      subtitle: "Kirim saja form pengajuannya. Nanti kami yang bilang format mana yang paling pas untuk rencana Anda.",
      primary: "Ajukan Tur",
    },
  },

  testimonial: {
    hero: {
      eyebrow: "Testimoni",
      title: "Dua belas ribu tamu, dan terus bertambah",
      subtitle:
        "Kami minta masukan jujur ke semua tamu setelah trip — yang enak maupun yang bikin kami mikir. Ini hasilnya.",
    },
    stats: [
      { value: 4.9, suffix: "/5", label: "Rating rata-rata", decimals: 1 },
      { value: 2870, suffix: "+", label: "Ulasan tertulis", decimals: 0 },
      { value: 96, suffix: "%", label: "Mau booking lagi", decimals: 0 },
      { value: 41, suffix: "", label: "Negara asal tamu", decimals: 0 },
    ],
    featured: {
      eyebrow: "Pilihan",
      title: "Yang panjang-panjang",
      subtitle: "Ulasan yang ditulis dengan effort. Geser atau pakai panahnya.",
      prev: "Ulasan sebelumnya",
      next: "Ulasan berikutnya",
    },
    grid: {
      eyebrow: "Sisanya",
      title: "Langsung dari kotak masuk",
      filterAll: "Semua tur",
      empty: "Belum ada ulasan di kategori ini.",
    },
    cta: {
      title: "Sekarang giliran Anda",
      subtitle: "Ayo susun trip yang nanti ditanyain terus sama teman-teman Anda.",
      primary: "Ajukan Tur",
    },
    verified: "Tamu terverifikasi",
  },

  contact: {
    hero: {
      eyebrow: "Kontak",
      title: "Ngobrol langsung dengan orangnya",
      subtitle:
        "WhatsApp paling cepat — biasanya kami balas dalam lima belas menit, antara jam 08.00–22.00 WITA. Email juga bisa, cuma agak lebih lambat.",
    },
    cards: [
      { title: "WhatsApp", value: "+62 812-3456-7890", note: "Tercepat · 08.00–22.00 WITA", action: "Chat sekarang" },
      { title: "Email", value: "hello@verabalitour.com", note: "Dibalas dalam 12 jam", action: "Kirim email" },
      { title: "Kantor", value: "Jl. Raya Ubud No. 88, Gianyar, Bali 80571", note: "Kunjungan dengan janji temu", action: "Buka di Maps" },
    ],
    hours: {
      title: "Jam kami ada",
      items: [
        { day: "Senin – Jumat", time: "08.00 – 22.00" },
        { day: "Sabtu", time: "08.00 – 20.00" },
        { day: "Minggu", time: "09.00 – 18.00" },
        { day: "Hari libur nasional", time: "WhatsApp saja" },
      ],
      note: "Semua waktu dalam WITA (GMT+8). Tamu yang sedang tur bisa menghubungi guide-nya 24 jam.",
    },
    form: {
      title: "Kirim pesan ke kami",
      subtitle: "Lebih nyaman lewat form? Isi saja di sini, sisanya kami yang lanjutkan.",
      name: "Nama Anda",
      namePh: "mis. Sarah Lim",
      email: "Email",
      emailPh: "anda@email.com",
      phone: "Nomor WhatsApp",
      phonePh: "+62 · opsional, tapi lebih cepat",
      subject: "Subjek",
      subjectPh: "Mau membahas apa?",
      message: "Pesan",
      messagePh: "Ceritakan apa saja — tanggal, pertanyaan, atau ide liar sekalipun.",
      submit: "Kirim pesan",
      sending: "Mengirim…",
      success: "Diterima! Kami segera menghubungi Anda kembali.",
      successNote: "Ini form demo — tidak ada data yang benar-benar terkirim.",
      another: "Kirim lagi",
      required: "Wajib diisi",
      invalidEmail: "Format emailnya sepertinya kurang tepat",
    },
    map: {
      title: "Lokasi kami",
      note: "Kantor Ubud · 15 menit dari pusat Ubud",
      cta: "Lihat rute",
    },
    social: { title: "Kami juga ada di sini" },
  },

  modal: {
    title: "Ajukan tur",
    subtitle: "Ceritakan yang Anda cari. Tanpa bayar, tanpa ikatan — nanti kami balas dengan rencana beneran.",
    step: "Langkah",
    of: "dari",
    next: "Lanjut",
    back: "Kembali",
    submit: "Kirim pengajuan",
    sending: "Mengirim…",
    close: "Tutup form pengajuan",
    steps: ["Jenis tur", "Detail trip", "Data Anda"],
    fields: {
      tourType: "Mau format tur yang mana?",
      destinations: "Mau ke mana saja?",
      destinationsHint: "Pilih sebanyak yang Anda mau — atau kosongkan, biar kami yang usul.",
      date: "Perkiraan tanggal mulai",
      days: "Berapa hari?",
      pax: "Berapa orang?",
      paxAdults: "Dewasa",
      paxKids: "Anak-anak",
      budget: "Perkiraan budget per orang",
      budgetOpts: ["Belum tahu", "Di bawah Rp 1 jt", "Rp 1 jt – 3 jt", "Rp 3 jt – 7 jt", "Di atas Rp 7 jt"],
      name: "Nama Anda",
      namePh: "mis. Sarah Lim",
      email: "Email",
      emailPh: "anda@email.com",
      phone: "WhatsApp",
      phonePh: "+62 812…",
      country: "Negara asal",
      countryPh: "mis. Singapura",
      notes: "Ada hal lain yang perlu kami tahu?",
      notesPh: "Pantangan makanan, mobilitas, sedang merayakan sesuatu, tempat yang wajib didatangi…",
      consent: "Saya setuju dihubungi terkait pengajuan ini.",
    },
    success: {
      title: "Pengajuan terkirim!",
      body: "Data Anda sudah kami terima. Itinerary lengkap dan harga flat akan masuk ke email Anda dalam beberapa jam.",
      note: "Catatan demo: ini prototipe front-end, jadi tidak ada data yang keluar dari browser Anda.",
      cta: "Selesai",
      whatsapp: "Lanjut lewat WhatsApp",
    },
    errors: {
      required: "Bagian ini wajib diisi",
      email: "Format emailnya sepertinya kurang tepat",
      consent: "Centang dulu ya, supaya kami boleh membalas",
      pax: "Minimal satu orang, ya",
    },
  },

  cookie: {
    title: "Kami pakai sedikit cookie",
    body: "Yang wajib dipakai supaya situsnya jalan normal. Sisanya baru aktif kalau Anda izinkan — analitik untuk tahu halaman mana yang membantu, dan marketing supaya Anda tidak dikejar iklan yang itu-itu saja.",
    accept: "Terima semua",
    reject: "Tolak yang opsional",
    customize: "Atur sendiri",
    save: "Simpan pilihan saya",
    policyLink: "Baca Kebijakan Privasi",
    manage: "Pengaturan cookie",
    savedToast: "Preferensi cookie tersimpan.",
    categories: {
      necessary: { title: "Wajib", desc: "Pilihan bahasa, keputusan cookie Anda, dan keamanan dasar. Yang ini tidak bisa dimatikan.", always: "Selalu aktif" },
      preferences: { title: "Preferensi", desc: "Mengingat hal-hal kecil seperti tur terakhir yang Anda lihat, biar situsnya tidak pelupa." },
      analytics: { title: "Analitik", desc: "Hitungan kunjungan anonim, supaya kami tahu halaman mana yang benar-benar membantu." },
      marketing: { title: "Marketing", desc: "Untuk mengukur iklan dan menghindari menampilkan iklan yang sama sebelas kali." },
    },
  },

  floating: {
    whatsapp: "Chat via WhatsApp",
    whatsappBubble: "Halo! Butuh bantuan menyusun rencana?",
    language: "Ganti bahasa",
    languageLabel: "Bahasa",
    top: "Kembali ke atas",
  },

  loader: {
    welcome: "Selamat datang di",
    tagline: "Menyiapkan pelarian pulau Anda…",
    phases: ["Membangunkan gunung", "Menghangatkan laut", "Menyeduh kopi", "Hampir siap"],
    loading: "Memuat",
  },

  footer: {
    blurb: "Operator tur Bali berskala kecil dan berlisensi, menjalankan trip private, sharing, dan full custom sejak 2014.",
    explore: "Jelajahi",
    tours: "Tur",
    legal: "Legal",
    contact: "Hubungi kami",
    newsletter: {
      title: "Catatan slow travel",
      desc: "Satu email pendek tiap bulan: rute yang baru kami survei ulang, warung yang layak memutar arah. Tanpa spam.",
      placeholder: "email@anda.com",
      button: "Berlangganan",
      success: "Anda sudah terdaftar. Selamat datang!",
      invalid: "Mohon isi email yang valid.",
      note: "Form demo — tidak ada data yang disimpan.",
    },
    rights: "Seluruh hak cipta dilindungi.",
    madeIn: "Dibuat di Bali",
    disclaimer: "Vera Bali Tour adalah merek demo fiktif. Harga, ulasan, dan ilustrasi hanya contoh.",
  },

  legal: {
    updated: "Terakhir diperbarui",
    updatedDate: "7 Agustus 2026",
    toc: "Di halaman ini",
    backHome: "Kembali ke beranda",
    privacy: {
      title: "Kebijakan Privasi",
      intro:
        "Kebijakan ini menjelaskan data apa yang Vera Bali Tour kumpulkan saat Anda memakai situs ini atau memesan trip, kenapa kami mengumpulkannya, dan apa yang bisa Anda minta kami lakukan terhadapnya. Bahasa sederhana, tanpa kabut hukum.",
      sections: [
        {
          title: "1. Siapa kami",
          body: [
            "Vera Bali Tour (\"kami\") adalah operator tur yang berkantor di Jl. Raya Ubud No. 88, Gianyar, Bali 80571, Indonesia. Kami adalah pengendali data untuk informasi yang dikumpulkan melalui verabalitour.com.",
            "Untuk pertanyaan soal privasi, kirim email ke hello@verabalitour.com dengan subjek \"Privasi\". Yang membaca manusia asli, bukan bot.",
          ],
        },
        {
          title: "2. Data yang kami kumpulkan",
          body: [
            "Data yang Anda berikan: nama, email, nomor WhatsApp, negara asal, tanggal perjalanan, jumlah rombongan, kisaran budget, dan catatan apa pun yang Anda tulis di form pengajuan atau kontak.",
            "Data yang terkumpul otomatis: halaman yang dibuka, perkiraan wilayah, jenis perangkat, situs perujuk, dan durasi kunjungan — itu pun hanya kalau Anda menyetujui cookie analitik.",
            "Kami tidak pernah meminta scan paspor, nomor kartu, atau kredensial bank melalui situs ini.",
          ],
        },
        {
          title: "3. Untuk apa kami memakainya",
          body: [
            "Untuk menjawab pertanyaan Anda dan menyiapkan itinerary serta penawaran harga.",
            "Untuk menjalankan trip yang Anda pesan — kami bagikan nama depan dan titik jemput Anda ke guide dan driver yang bertugas, serta nama Anda ke operator kapal atau tiket bila manifes memang diwajibkan.",
            "Untuk memperbaiki situs, berdasarkan pola pemakaian yang sudah dianonimkan.",
            "Untuk mengirim newsletter bulanan, tapi hanya kalau Anda berlangganan. Setiap email ada tombol berhenti berlangganan sekali klik.",
          ],
        },
        {
          title: "4. Cookie",
          body: [
            "Cookie wajib menyimpan pilihan bahasa dan keputusan cookie Anda. Ini tidak bisa dimatikan karena situsnya tidak akan berjalan benar tanpa itu.",
            "Cookie preferensi, analitik, dan marketing mati secara default dan baru aktif kalau Anda menyalakannya di banner cookie.",
            "Anda bisa mengubah atau menarik persetujuan kapan saja lewat tautan \"Pengaturan cookie\" di footer. Menarik persetujuan akan menghapus cookie terkait saat halaman dimuat berikutnya.",
          ],
        },
        {
          title: "5. Dengan siapa kami membagikannya",
          body: [
            "Guide dan driver kami sendiri, terbatas pada yang mereka butuhkan untuk menjemput Anda.",
            "Penyedia layanan yang meng-hosting situs ini, mengirim email kami, dan memproses pembayaran. Mereka bekerja hanya sesuai instruksi kami.",
            "Pihak berwenang, bila hukum Indonesia mewajibkannya — misalnya manifes penumpang untuk penyeberangan laut.",
            "Kami tidak menjual data Anda. Tidak pernah, dan tidak berencana mulai.",
          ],
        },
        {
          title: "6. Berapa lama kami menyimpannya",
          body: [
            "Pertanyaan yang tidak berlanjut jadi booking: 12 bulan, lalu dihapus.",
            "Booking yang selesai: 5 tahun, karena aturan pajak dan pariwisata Indonesia mengharuskannya.",
            "Pelanggan newsletter: sampai Anda berhenti berlangganan, ditambah 30 hari.",
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
            "Situs ini disajikan lewat HTTPS. Data form dienkripsi saat dikirim. Akses ke catatan booking dibatasi hanya untuk staf yang memerlukannya, dengan autentikasi dua faktor.",
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
        "Syarat ini mengatur penggunaan verabalitour.com dan tur apa pun yang Anda pesan dari kami. Dengan memakai situs ini atau mengonfirmasi booking, Anda dianggap menyetujuinya.",
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
            "Anda tidak diperbolehkan melakukan scraping massal, menyalin tulisan atau foto kami untuk bisnis travel lain, mencoba menembus keamanan kami, atau mengunggah hal melanggar hukum lewat form kami.",
            "Kami berhak menangguhkan akses bila situs ini disalahgunakan.",
          ],
        },
        {
          title: "3. Booking dan penawaran",
          body: [
            "Pengajuan lewat situs ini adalah permintaan, bukan booking terkonfirmasi. Belum ada yang dikunci sampai kami membalas dengan konfirmasi tertulis.",
            "Harga di situs ini bersifat indikatif dan bisa berubah mengikuti musim, jumlah rombongan, harga bahan bakar, dan jadwal kapal. Harga yang berlaku adalah yang tertulis di konfirmasi Anda.",
            "Deposit mengunci tanggal Anda. Sisanya dibayar setelah tur, tunai dalam Rupiah atau lewat transfer.",
          ],
        },
        {
          title: "4. Pembatalan dan perubahan",
          body: [
            "Batal lebih dari 24 jam sebelum penjemputan: deposit kembali penuh.",
            "Batal dalam 24 jam terakhir: deposit hangus, kecuali karena sakit atau penerbangan dibatalkan — untuk itu kami jadwalkan ulang tanpa biaya.",
            "Kalau kami yang membatalkan — kendala mesin, cuaca berbahaya, penyeberangan ditutup — Anda boleh memilih antara pengembalian penuh atau penjadwalan ulang gratis.",
            "Perubahan rute saat Private atau Customized tour berlangsung tidak dipungut biaya. Sharing tour memakai rute tetap dan tidak bisa diubah untuk satu tamu saja.",
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
            "Kami tidak bertanggung jawab atas barang pribadi yang tertinggal di lokasi atau di kendaraan, meski kami akan selalu berusaha membantu mencarinya.",
            "Aktivitas petualangan — trekking, snorkeling, rafting, tepi tebing — punya risiko bawaan. Kami sangat menyarankan asuransi perjalanan pribadi, dan keikutsertaan Anda adalah atas risiko sendiri.",
          ],
        },
        {
          title: "7. Konten pihak ketiga",
          body: [
            "Halaman kami bisa memuat tautan ke peta, operator tiket, atau mitra akomodasi. Kami tidak mengendalikan situs tersebut dan tidak bertanggung jawab atas isi maupun praktik privasinya.",
          ],
        },
        {
          title: "8. Hak kekayaan intelektual",
          body: [
            "Seluruh teks, tata letak, ilustrasi, dan kode di situs ini milik Vera Bali Tour kecuali dinyatakan lain. Ulasan tamu tetap milik penulisnya dan ditampilkan atas izin mereka.",
          ],
        },
        {
          title: "9. Catatan demo",
          body: [
            "Vera Bali Tour adalah merek fiktif yang dibuat sebagai demonstrasi portofolio. Harga, testimoni, alamat, nomor telepon, dan ilustrasi hanyalah contoh. Form di situs ini tidak mengirim maupun menyimpan data.",
          ],
        },
        {
          title: "10. Hukum yang berlaku",
          body: [
            "Syarat ini tunduk pada hukum Republik Indonesia. Sengketa berada di yurisdiksi pengadilan Denpasar, Bali — walaupun kami jauh lebih suka menyelesaikannya lewat obrolan biasa.",
          ],
        },
      ],
    },
  },

  notFound: {
    title: "Sepertinya salah belok",
    subtitle: "Halaman ini tidak ada di rute kami. Ayo balik ke jalan yang benar.",
    cta: "Kembali ke beranda",
    code: "404",
  },

  common: {
    learnMore: "Selengkapnya",
    viewAll: "Lihat semua",
    from: "mulai",
    perPerson: "per orang",
    days: "hari",
    hours: "jam",
    people: "orang",
    optional: "opsional",
    new: "Baru",
    skipToContent: "Lompat ke konten",
  },
};

export const dictionaries: Record<Lang, Dict> = { en, id };
export type Dictionary = Dict;
