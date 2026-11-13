export interface DishItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  doodle?: string;
  doodleCaption?: string;
}

export interface MilestoneItem {
  year: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  mobileDescription?: string;
  quote?: string;
  isLatest?: boolean;
}

export interface LocationItem {
  id: string;
  name: string;
  area: string;
  landmark: string;
  address: string;
  hours: string;
  phone: string;
  displayPhone: string;
  image: string;
  secondaryImage?: string;
  description: string;
  mobileDescription?: string;
  mapsUrl: string;
  amenity: "pet-friendly" | "valet-parking";
}

export const websiteContent = {
  brand: {
    name: "X&Y",
    type: "Bakehouse & Bistro",
    fullName: "X&Y Bakehouse",
    city: "Kolkata",
    headline: "Where every table is yours",
    description: "A bakehouse & bistro in the heart of Kolkata — made for mornings, lingering lunches, and slow evenings.",
    logo: "/Logo.png",
  },
  
  navigation: [
    { label: "Philosophy", href: "#philosophy" },
    { label: "Food & Drinks", href: "#food-drinks" },
    { label: "Our Evolution", href: "#evolution" },
    { label: "Location", href: "#locations" },
    { label: "Menu", href: "/Menu.pdf", isExternal: true },
  ],

  hero: {
    badge: "Bakehouse & Bistro • Kolkata",
    headline: "Where every table is yours",
    subtext: "A bakehouse & bistro in the heart of Kolkata — made for mornings, lingering lunches, and slow evenings.",
    videoDesktop: "/videos/Desktop1.mp4",
    videoDesktopWebm: "/videos/Desktop1.webm",
    videoMobile: "/videos/Mobile1-2.mp4",
    videoMobileWebm: "/videos/Mobile1-2.webm",
    posterImage: "/Hero.webp",
    posterImageMobile: "/Hero-mobile.webp",
    primaryCta: {
      label: "View Menu",
      href: "/Menu.pdf",
    },
    secondaryCta: {
      label: "Find Us",
      href: "#locations",
    },
  },

  philosophy: {
    tag: "OUR PHILOSOPHY",
    title: "Food made with intention. A place built with love.",
    mobileTitle: "Food Made With Pure Intention",
    description:
      "At the heart of our restaurant is a deep love for authentic Italian cuisine, crafted with passion, tradition, and the finest ingredients. We believe in creating more than just meals — we create experiences filled with warmth, soul, and the joy of sharing. Every dish tells a story, honoring culinary heritage while embracing the spirit of modern dining.",
    mobileDescription:
      "Authentic Italian cuisine crafted with passion, tradition, and the finest ingredients.",
    image: "/locations/Allipore_Location.webp",
    badgeLabel: "X&Y BAKEHOUSE",
    values: [
      {
        letter: "X",
        identity: "YOU",
        text: "Bring your hunger, your laptop, your stories. Your table is yours for as long as you need it.",
      },
      {
        letter: "&",
        identity: "TOGETHER",
        text: "Food is better when it's shared. Slow down over a second cup of coffee.",
      },
      {
        letter: "Y",
        identity: "US",
        text: "We bake from scratch, every single day. Sourdough fermented for 18 hours, laminated by hand.",
      },
    ],
  },

  foodAndDrinks: {
    tag: "SIGNATURE DISHES",
    title: "Handcrafted from Scratch Daily",
    subtitle: "From slow-fermented doughs to delicate pastry lamination, every creation reflects pure craftsmanship.",
    dishes: [
      {
        id: "eggs-benedict",
        name: "Eggs Benedict",
        tagline: "Morning Classic",
        description: "Poached free-range eggs. Silky golden hollandaise. Hand-toasted English muffin.",
        image: "/dishes/Dish1.webp",
        doodle: "/artwork/Doodle1.png",
        doodleCaption: "SET ON KOLKATA'S CORNERS, X&Y WELCOMES GUESTS FROM MORNING THROUGH TO LATE AFTERNOON.",
      },
      {
        id: "chilli-spaghetti",
        name: "Burnt Chilli Oil Spaghetti",
        tagline: "Bistro Signature",
        description: "Spaghetti tossed in artisanal charred garlic chilli oil, finished with aged Parmigiano-Reggiano.",
        image: "/dishes/Dish2.webp",
        doodle: "/artwork/Doodle2.png",
        doodleCaption: "EVERY NOODLE IS INFUSED WITH HOUSE-SMOKED CHILLI OIL AND RICH AROMATICS.",
      },
      {
        id: "cheesecake",
        name: "New York Cheesecake",
        tagline: "Patisserie Pillar",
        description: "Velvety cultured cream cheese, baked low and slow on a buttery toasted graham cracker base.",
        image: "/dishes/Dish3.webp",
        doodle: "/artwork/Doodle3.png",
        doodleCaption: "DENSE, SILKY, AND BALANCED WITH NATURAL MADAGASCAR BOURBON VANILLA.",
      },
      {
        id: "croissant",
        name: "Butter Croissant",
        tagline: "Artisanal Bake",
        description: "Pure French butter, unbleached stoneground flour, sea salt. Laminated layer by crisp layer.",
        image: "/dishes/Dish4.webp",
        doodle: "/artwork/Doodle6.png",
        doodleCaption: "EIGHTEEN HOURS OF FERMENTATION FOR A FEATHER-LIGHT HONEYCOMB CRUMB.",
      },
      {
        id: "truffle-pasta",
        name: "Artisan Handcrafted Pasta",
        tagline: "Chef's Special",
        description: "Freshly rolled egg pasta tossed with woodland mushrooms and a silky emulsion.",
        image: "/dishes/Dish7.webp",
        doodle: "/artwork/Doodle5.png",
        doodleCaption: "ROLLED BY HAND EVERY MORNING FOR THAT PERFECT AL DENTE TEXTURE.",
      },
    ],
  },

  evolution: {
    tag: "JOURNEY OF X&Y",
    title: "OUR EVOLUTION",
    subtitle: "How an uncompromising obsession with craft grew into Kolkata's favourite neighborhood tables.",
    milestones: [
      {
        year: "2023",
        badge: "23",
        title: "TRAINING YEARS",
        subtitle: "The Foundation",
        description:
          "Vasudha graduates and returns home with an unrelenting vision. Months of rigorous recipe development, sourcing heritage grains, and training visionary bakers who refused to cut corners.",
        mobileDescription:
          "Rigorous recipe development, heritage grains, and visionary bakers refusing to cut corners.",
        quote: "“The difference between good and extraordinary is always time.”",
      },
      {
        year: "2024",
        badge: "24",
        title: "FEBRUARY 2024",
        subtitle: "The First Door — Alipore",
        description:
          "X&Y opens its very first door in Alipore. One warm room, hand-laminated croissants, and an 18-hour fermented sourdough starter. Within weeks, guests were lining up before opening.",
        mobileDescription:
          "X&Y opens its first door, serving warm hand-laminated croissants and sourdough.",
        quote: "“If it doesn't exist here, that's exactly why we must build it.”",
      },
      {
        year: "2025",
        badge: "25",
        title: "FEBRUARY 2025",
        subtitle: "Sector 2 — Salt Lake",
        description:
          "Bringing the beloved Alipore experience to Salt Lake without altering a single recipe. The same hollandaise, the same warmth, allowing more people across the city to find us.",
        mobileDescription:
          "Bringing our beloved bakehouse warmth and unchanged recipes to Salt Lake.",
        isLatest: true,
      },
    ],
  },

  locations: [
    {
      id: "salt-lake",
      name: "Salt Lake",
      area: "SALT LAKE — SECTOR II",
      landmark: "Just a 6-minute drive from Central Park.",
      address: "CG-220, Ground Floor, Sector 2, Salt Lake City, Kolkata – 700091",
      hours: "11:00 AM – 11:00 PM",
      phone: "+91 82409 68898",
      displayPhone: "+91 82409 68898",
      image: "/locations/SALTLAKELOCATIONPIC.webp",
      secondaryImage: "/locations/Saltlake_Location2.webp",
      description: "Just a 6-minute drive from Central Park.",
      mobileDescription: "Just a 6-minute drive from Central Park.",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=CG-220,+Ground+Floor,+Sector+2,+Salt+Lake+City,+Kolkata+700091",
      amenity: "pet-friendly",
    },
    {
      id: "alipore",
      name: "Alipore",
      area: "ALIPORE — SOUTH KOLKATA",
      landmark: "Just a 4-minute drive from Alipore Court.",
      address: "Ground Floor, 6, Burdwan Rd, Alipore, Kolkata, West Bengal 700027",
      hours: "11:00 AM – 11:00 PM",
      phone: "+91 92309 85229",
      displayPhone: "+91 92309 85229",
      image: "/locations/Allipore_Location.webp",
      secondaryImage: "/locations/Allipore_Location2.webp",
      description: "Just a 4-minute drive from Alipore Court.",
      mobileDescription: "Just a 4-minute drive from Alipore Court.",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ground+Floor,+6,+Burdwan+Rd,+Alipore,+Kolkata,+West+Bengal+700027",
      amenity: "valet-parking",
    },
  ],

  press: {
    tag: "IN THE PRESS",
    title: "A Little Love From The Publications",
    subtitle: "Features, stories and mentions from some of our favourite publications.",
    ratings: [
      {
        platform: "Zomato",
        score: "4.4 / 5",
        logo: "/icons/zomato.png",
        color: "#E23744",
      },
      {
        platform: "Swiggy",
        score: "4.4 / 5",
        logo: "/icons/swiggy.png",
        color: "#FE5005",
      },
    ],
    articles: [
      {
        id: "the-telegraph",
        publication: "The Telegraph",
        headline: "Café X & Y, the new bakehouse and all-day bistro, opens in Kolkata",
        url: "https://www.telegraphindia.com/amp/my-kolkata/try-this/visit/cafe-x-y-the-new-bakehouse-and-all-day-bistro-opens-in-kolkata/cid/2002040",
      },
      {
        id: "restaurant-india",
        publication: "Restaurant India",
        headline: "All-Day Bistro Café X & Y Launches in Kolkata",
        url: "https://www.restaurantindia.in/news/all-day-bistro-caf-x-y-launches-in-kolkata.n11078",
      },
      {
        id: "lbb",
        publication: "LBB",
        headline: "Café X & Y: A Parisian-inspired bakehouse in Kolkata",
        url: "https://lbb.in/kolkata/the-green-house-8f4413/",
      },
      {
        id: "hoteliers-web",
        publication: "Hoteliers Web",
        headline: "Café X & Y: The All-New Bakehouse and All-Day Bistro",
        url: "https://hoteliersweb.com/News/articles/10877",
      },
      {
        id: "hospitality-news",
        publication: "Hospitalitynews.in",
        headline: "Café X & Y Invites You to Experience Kolkata's Newest Bistro",
        url: "https://hospitalitynews.in/news/cafe-x-y-invites-you-to-experience-kolkatas-newest-bistro",
      },
    ],
  },

  footer: {
    tagline: "Where every table is yours.",
    copyright: `© ${new Date().getFullYear()} X&Y Bakehouse & Bistro. All rights reserved.`,
    instagram: {
      handle: "@xybakehouse",
      url: "https://instagram.com",
      icon: "/icons/instagram.png",
    },
    deliveryPartners: [
      {
        name: "Swiggy",
        icon: "/icons/swiggy.png",
        url: "https://www.swiggy.com",
      },
      {
        name: "Zomato",
        icon: "/icons/zomato.png",
        url: "https://www.zomato.com",
      },
    ],
  },
};

