export interface DishItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  quote?: string;
  story?: string;
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
    title: "Bakehouse first. Everything else follows.",
    mobileTitle: "Bakehouse first. Everything else follows.",
    description:
      "Everything at X&Y starts at the oven. The bread, the pastry and the base of every plate come from our bakehouse, and the bistro is built around it, not the other way round. We keep the menu focused and make what’s on it properly, so the food on your table is the food we’d want on ours.",
    mobileDescription:
      "Everything at X&Y starts at the oven. The bread, the pastry and the base of every plate come from our bakehouse, and the bistro is built around it, not the other way round. We keep the menu focused and make what’s on it properly, so the food on your table is the food we’d want on ours.",
    quote: '“It started with the oven. The rest of the café grew around it.”',
    image: "/Chef_BTS.webp",
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
        id: "burnt-chilli-oil-spaghetti",
        name: "Burnt Chilli Oil Spaghetti",
        tagline: "Bistro Signature",
        description: "Spaghetti tossed in chilli oil, garlic and Parmesan, with nothing else on the plate.",
        quote: "CHILLI OIL TAKEN TO THE EDGE OF BURNT, WHERE THE SMOKE STARTS.",
        story: "The oil is cooked dark until it turns smoky and deep, then tossed through the pasta with garlic and finished with Parmesan. Three ingredients, and no room to hide behind any of them.",
        image: "/dishes/burnt-chilli-oil-spaghetti.webp",
        doodle: "/artwork/Doodle2.png",
      },
      {
        id: "mongolian-bowl",
        name: "Mongolian Bowl",
        tagline: "Wok Special",
        description: "Wok-tossed vegetables in a glossy, savoury sauce, over your choice of noodles or rice.",
        quote: "HIGH HEAT, BIG FLAVOUR, ONE BOWL.",
        story: "Everything hits the wok hot and fast, so the vegetables stay crisp and the sauce clings to every strand or grain. It’s a full meal in a single bowl, built for days when you want something that fills you up.",
        image: "/dishes/mongolian-bowl.webp",
        doodle: "/artwork/Doodle5.png",
      },
      {
        id: "burrata-pizza",
        name: "Burrata Pizza",
        tagline: "Wood-Fired Pizza",
        description: "Creamy burrata on a blistered crust, in whichever base you choose.",
        quote: "PICK YOUR CRUST. THE BURRATA DOES THE REST.",
        story: "Choose Neapolitan, sourdough or sourdough thin crust. Burrata melts into the hot base and adds a cool, milky richness to every slice.",
        image: "/dishes/burrata-pizza.webp",
        doodle: "/artwork/Doodle1.png",
      },
      {
        id: "loaded-nachos",
        name: "Loaded Nachos",
        tagline: "Appetizer",
        description: "House-made tortilla chips piled high with queso, zesty salsa and refried beans.",
        quote: "BUILT TO BE SHARED. HARD TO ACTUALLY SHARE.",
        story: "The chips are made in-house, so they hold up under the queso instead of going soft. For more, add peri peri chicken and make it a meal.",
        image: "/dishes/loaded-nachos.webp",
        doodle: "/artwork/Doodle1.png",
      },
      {
        id: "apple-pie",
        name: "Apple Pie",
        tagline: "Bakehouse Dessert",
        description: "Stewed apples, cinnamon and a hint of spice under a crumble topping.",
        quote: "ADD THE SOFTIE. WE WON’T JUDGE.",
        story: "The apples are stewed down with cinnamon and warming spice, then topped with a buttery crumble. Add a vanilla softie for ₹105 and you get hot and cold in the same spoonful.",
        image: "/dishes/apple-pie.webp",
        doodle: "/artwork/Doodle3.png",
      },
      {
        id: "chocolate-eclair",
        name: "Chocolate Eclair",
        tagline: "French Patisserie",
        description: "Delicate choux filled with Venezuelan chocolate cream, under a shiny chocolate glaze.",
        quote: "A LIGHT SHELL. A DEEP CHOCOLATE CENTRE.",
        story: "The choux stays delicate, the cream is properly chocolatey, and the glaze gives it a clean snap on the first bite. It’s a small dessert that finishes a meal well.",
        image: "/dishes/chocolate-eclair.webp",
        doodle: "/artwork/Doodle3.png",
      },
      {
        id: "new-york-cheesecake",
        name: "New York Cheesecake",
        tagline: "Patisserie Pillar",
        description: "Dense, set slow and served plain.",
        quote: "WHEN SOMETHING IS RIGHT, IT DOESN’T NEED ANYTHING ELSE.",
        story: "Cooled overnight and never rushed, on a biscuit base that holds its ground. No toppings, no distractions.",
        image: "/dishes/new-york-cheesecake.webp",
        doodle: "/artwork/Doodle3.png",
      },
      {
        id: "protein-bread",
        name: "Protein Bread",
        tagline: "Artisan Loaf",
        description: "A loaf made for people who want their bread to work as hard as they do.",
        quote: "BREAD THAT ACTUALLY KEEPS YOU GOING.",
        story: "Baked in our bakehouse for people who train, work long days or just want more from a slice. 62g protein per loaf without losing the crust or the flavour of a proper loaf.",
        image: "/dishes/protein-bread.webp",
        doodle: "/artwork/Doodle6.png",
      },
      {
        id: "sourdoughs",
        name: "Sourdoughs",
        tagline: "Wild Ferment",
        description: "The quiet backbone of the whole menu.",
        quote: "THE QUIET BACKBONE OF THE WHOLE MENU.",
        story: "Sourdough is the bun on our burgers, the pita under our dips, the ciabatta in our sandwiches and one of the bases for our pizzas. Slow-fermented dough gives each of them a better chew, a deeper flavour and a crust that stands up to whatever goes on it.",
        image: "/dishes/sourdoughs.webp",
        doodle: "/artwork/Doodle6.png",
      },
      {
        id: "croissants",
        name: "Croissants",
        tagline: "Morning Viennoiserie",
        description: "Flaky, buttery and made fresh every day.",
        quote: "YOU’LL HEAR IT BEFORE YOU TASTE IT.",
        story: "Made before sunrise, with layers that shatter when you tear into them and a soft, honeyed centre. Best with a coffee, and good enough to eat plain.",
        image: "/dishes/croissants.webp",
        doodle: "/artwork/Doodle6.png",
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

