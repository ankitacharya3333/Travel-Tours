export interface DestinationItem {
  id: string;
  slug: string;
  name: string;
  region: "Everest" | "Annapurna" | "Langtang" | "Pokhara" | "Chitwan" | "Kathmandu Valley";
  elevation: string;
  tagline: string;
  description: string;
  heroImage: string;
  highlights: string[];
  bestTime: string;
  recommendedDuration: string;
}

export interface TripItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  durationDays: number;
  maxAltitudeMeters: number;
  difficulty: "Easy" | "Moderate" | "Strenuous" | "Challenging";
  category: "Trekking" | "Cultural Heritage" | "Wildlife Safari" | "Expedition";
  region: string;
  startingPoint: string;
  endingPoint: string;
  bestSeasons: string[];
  featured: boolean;
  priceFromUsd: number;
  heroImage: string;
  overview: string;
  highlights: string[];
}

export interface TravelGuideArticle {
  slug: string;
  title: string;
  category: string;
  readingTimeMin: number;
  excerpt: string;
  publishedDate: string;
  coverImage: string;
  content: string[];
}

export const DESTINATIONS_DATA: DestinationItem[] = [
  {
    id: "dest-everest",
    slug: "everest-khumbu",
    name: "Everest & Khumbu Region",
    region: "Everest",
    elevation: "2,840m - 8,848m",
    tagline: "Glaciated valleys, Sherpa homesteads, and the world's highest summits.",
    description: "The Khumbu region in northeastern Nepal is revered both for majestic Himalayan titans like Sagarmatha (Mount Everest), Lhotse, and Ama Dablam, and for its rich Buddhist monastic tradition.",
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
    highlights: ["Sagarmatha National Park", "Tengboche Monastery", "Kala Patthar panoramic views", "Sherpa culture & hospitality"],
    bestTime: "March–May, October–November",
    recommendedDuration: "12–16 Days",
  },
  {
    id: "dest-annapurna",
    slug: "annapurna-sanctuary",
    name: "Annapurna Massif",
    region: "Annapurna",
    elevation: "1,000m - 8,091m",
    tagline: "Rhododendron forests, amphitheater sanctuaries, and high trans-Himalayan passes.",
    description: "Encompassing sub-tropical river basins, high-altitude alpine meadows, and the dramatic amphitheater of Annapurna Base Camp, this region provides Nepal's most diverse landscape shifts.",
    heroImage: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?q=80&w=1600&auto=format&fit=crop",
    highlights: ["Annapurna Sanctuary amphitheater", "Thorong La high alpine pass", "Gurung & Magar heritage hamlets", "Poon Hill morning skyline"],
    bestTime: "October–December, March–April",
    recommendedDuration: "10–18 Days",
  },
  {
    id: "dest-langtang",
    slug: "langtang-valley",
    name: "Langtang & Helambu",
    region: "Langtang",
    elevation: "1,460m - 4,984m",
    tagline: "The valley of glaciers, Tamang heritage, and tranquil yak pastures close to Tibet.",
    description: "Directly north of Kathmandu, Langtang National Park offers immediate access to tranquil pine forests, alpine rivers, and high pastures framed by Langtang Lirung.",
    heroImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1600&auto=format&fit=crop",
    highlights: ["Kyanjin Gompa high pasture", "Kyanjin Ri & Tserko Ri viewpoints", "Tamang artisan culture", "Quiet, uncrowded mountain paths"],
    bestTime: "March–May, September–November",
    recommendedDuration: "7–10 Days",
  },
  {
    id: "dest-pokhara",
    slug: "pokhara-valley",
    name: "Pokhara & Phewa Lake",
    region: "Pokhara",
    elevation: "822m - 1,740m",
    tagline: "Sub-tropical serenity reflecting the snow-draped Machapuchare (Fishtail).",
    description: "The gateway to the western Himalayas, Pokhara offers tranquil lakes, verdant hillsides, paragliding ridges, and direct vistas of the towering Annapurna range.",
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop",
    highlights: ["Phewa Lake wooden boating", "Sarangkot sunrise over Fishtail", "World Peace Pagoda", "International Mountain Museum"],
    bestTime: "Year-round; best Oct–April",
    recommendedDuration: "3–5 Days",
  },
  {
    id: "dest-chitwan",
    slug: "chitwan-terai",
    name: "Chitwan National Park",
    region: "Chitwan",
    elevation: "150m - 800m",
    tagline: "Dense sal forest, river safaris, one-horned rhinos, and Tharu folklore.",
    description: "A UNESCO World Heritage sanctuary in the southern Terai plains, Chitwan preserves prehistoric wildlife habitats including Bengal tigers, greater one-horned rhinoceros, and marsh mugger crocodiles.",
    heroImage: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=1600&auto=format&fit=crop",
    highlights: ["Greater one-horned rhino sightings", "Rapti River canoe safaris", "Tharu cultural villages & dances", "Over 500 species of resident birds"],
    bestTime: "October–March",
    recommendedDuration: "3–4 Days",
  },
  {
    id: "dest-kathmandu",
    slug: "kathmandu-valley",
    name: "Kathmandu Valley",
    region: "Kathmandu Valley",
    elevation: "1,400m",
    tagline: "Seven UNESCO World Heritage ensembles spanning medieval art, pagodas, and stupas.",
    description: "A living museum of Newari craftsmanship, tiered pagoda architecture, sacred Hindu pilgrimage shrines at Pashupatinath, and serene Buddhist prayer drums at Boudhanath and Swayambhunath.",
    heroImage: "https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?q=80&w=1600&auto=format&fit=crop",
    highlights: ["Boudhanath Stupa circumambulation", "Pashupatinath sacred evening aarti", "Bhaktapur medieval durbar square", "Patan Museum metal crafts"],
    bestTime: "September–May",
    recommendedDuration: "3–5 Days",
  },
];

export const TRIPS_DATA: TripItem[] = [
  {
    id: "trip-ebc-classic",
    slug: "everest-base-camp-trek",
    title: "Everest Base Camp & Kala Patthar",
    subtitle: "The definitive Himalayan pilgrimage into the heart of the Khumbu.",
    durationDays: 14,
    maxAltitudeMeters: 5545,
    difficulty: "Strenuous",
    category: "Trekking",
    region: "Everest",
    startingPoint: "Lukla",
    endingPoint: "Lukla",
    bestSeasons: ["Autumn (Sep-Nov)", "Spring (Mar-May)"],
    featured: true,
    priceFromUsd: 1480,
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
    overview: "Walk the footsteps of legendary mountaineers. Follow the Dudh Koshi river through alpine rhododendron woods, cross suspension bridges festooned with prayer flags, visit the monastic center of Tengboche, and stand face-to-face with the Khumbu Icefall.",
    highlights: [
      "Scenic mountain flight into Tenzing-Hillary Airport (Lukla)",
      "Acclimatization days in vibrant Namche Bazaar",
      "Sunrise vista of Mount Everest, Nuptse, and Pumori from Kala Patthar (5,545m)",
      "Sherpa hospitality and traditional teahouses along the route",
    ],
  },
  {
    id: "trip-abc-sanctuary",
    slug: "annapurna-base-camp-trek",
    title: "Annapurna Sanctuary Trek",
    subtitle: "A 360-degree mountain amphitheater flanked by 7,000m and 8,000m summits.",
    durationDays: 11,
    maxAltitudeMeters: 4130,
    difficulty: "Moderate",
    category: "Trekking",
    region: "Annapurna",
    startingPoint: "Nayapul / Pokhara",
    endingPoint: "Siwai / Pokhara",
    bestSeasons: ["Autumn (Oct-Dec)", "Spring (Mar-May)"],
    featured: true,
    priceFromUsd: 1120,
    heroImage: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?q=80&w=1200&auto=format&fit=crop",
    overview: "Pass through emerald bamboo thickets, traditional Gurung stone villages, and sub-alpine gorge passages before arriving inside the natural natural sanctuary of Annapurna I, Machapuchare, and Hiunchuli.",
    highlights: [
      "Natural hot springs at Jhinu Danda",
      "Close-up perspective of the sacred Fishtail peak (Machapuchare)",
      "Rich biodiversity of the Annapurna Conservation Area",
      "Comfortable teahouse lodging with warm stove dining rooms",
    ],
  },
  {
    id: "trip-langtang-kyanjin",
    slug: "langtang-valley-kyanjin-ri",
    title: "Langtang Valley & Kyanjin Ri",
    subtitle: "Tranquil mountain trails, Tibetan-influenced Tamang culture, and alpine cheese pastures.",
    durationDays: 8,
    maxAltitudeMeters: 4773,
    difficulty: "Moderate",
    category: "Trekking",
    region: "Langtang",
    startingPoint: "Syabrubesi",
    endingPoint: "Syabrubesi",
    bestSeasons: ["Spring (Mar-May)", "Autumn (Sep-Nov)"],
    featured: true,
    priceFromUsd: 840,
    heroImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop",
    overview: "A rewarding, less crowded journey north of Kathmandu along the Langtang Khola. Ascend past water-driven prayer wheels and dry-stone walls to the high settlement of Kyanjin Gompa.",
    highlights: [
      "Spectacular summit views of Langtang Lirung from Kyanjin Ri",
      "Visit to the historic Kyanjin yak cheese factory",
      "Heartwarming Tamang hospitality and community teahouses",
      "Accessible overland transit directly from Kathmandu",
    ],
  },
  {
    id: "trip-nepal-heritage-wildlife",
    slug: "kathmandu-pokhara-chitwan-heritage",
    title: "Golden Triangle: Heritage, Lakes & Wildlife",
    subtitle: "A balanced non-trekking immersion into Nepal's history, scenery, and natural wonders.",
    durationDays: 9,
    maxAltitudeMeters: 1400,
    difficulty: "Easy",
    category: "Cultural Heritage",
    region: "Kathmandu & Terai",
    startingPoint: "Kathmandu",
    endingPoint: "Kathmandu",
    bestSeasons: ["September to April"],
    featured: true,
    priceFromUsd: 1290,
    heroImage: "https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?q=80&w=1200&auto=format&fit=crop",
    overview: "Designed for travelers who seek deep cultural understanding and wildlife without strenuous high-altitude trekking. Explores Kathmandu's centuries-old monuments, Pokhara's peaceful lakeside vistas, and Chitwan's wildlife-dense river banks.",
    highlights: [
      "Guided architectural tours of Patan and Bhaktapur royal courtyards",
      "Sunrise across the Annapurnas from Sarangkot",
      "Jeep and canoe safaris looking for rhinos in Chitwan",
      "Boutique heritage hotels and private overland transfers",
    ],
  },
  {
    id: "trip-manaslu-circuit",
    slug: "manaslu-circuit-trek",
    title: "Manaslu Circuit & Larkya La",
    subtitle: "The premier off-the-beaten-path teahouse trek circling the world's eighth-highest mountain.",
    durationDays: 15,
    maxAltitudeMeters: 5106,
    difficulty: "Challenging",
    category: "Trekking",
    region: "Manaslu",
    startingPoint: "Soti Khola / Machha Khola",
    endingPoint: "Dharapani / Besisahar",
    bestSeasons: ["September-November", "March-May"],
    featured: false,
    priceFromUsd: 1590,
    heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    overview: "Traverse a restricted-area valley running along the ancient salt trading route between Nepal and Tibet. Pass remote Bhotia villages before crossing the dramatic Larkya La pass at 5,106 meters.",
    highlights: [
      "Restricted-permit tranquility with low trail congestion",
      "Authentic Tibetan Buddhist monasteries and mani walls in Samagaun",
      "Spectacular crossing of Larkya La with sweeping glacier views",
      "Deep river gorges transitioning into high arctic tundra",
    ],
  },
  {
    id: "trip-upper-mustang",
    slug: "upper-mustang-forbidden-kingdom",
    title: "Upper Mustang: The Walled City of Lo Manthang",
    subtitle: "A trans-Himalayan desert plateau rich in ancient cave dwellings and Tibetan monastic art.",
    durationDays: 13,
    maxAltitudeMeters: 3840,
    difficulty: "Moderate",
    category: "Cultural Heritage",
    region: "Mustang",
    startingPoint: "Jomsom",
    endingPoint: "Jomsom",
    bestSeasons: ["May to October (Rain Shadow Region)"],
    featured: false,
    priceFromUsd: 2150,
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
    overview: "Sheltered behind the Annapurna and Dhaulagiri barriers, Upper Mustang remains untouched by monsoon rains. Discover clay-walled fortifications, thousand-year-old cliff caves, and dry sandstone formations.",
    highlights: [
      "The fortified medieval capital of Lo Manthang",
      "Centuries-old Buddhist wall murals and active monastic schools",
      "Ideal summer destination during monsoon elsewhere in Nepal",
      "Unique wind-carved canyons and ochre cliffs",
    ],
  },
];

export const TRAVEL_ARTICLES: TravelGuideArticle[] = [
  {
    slug: "nepal-trekking-season-guide",
    title: "Understanding Nepal's Trekking Seasons: Autumn vs. Spring",
    category: "Trip Planning",
    readingTimeMin: 6,
    excerpt: "Clear skies and post-monsoon crispness or blooming rhododendrons and warmer mountain passes? Here is how to pick your ideal window.",
    publishedDate: "October 2026",
    coverImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop",
    content: [
      "Nepal's Himalayan geography creates two primary trekking seasons each year: Autumn (late September through November) and Spring (March through May).",
      "Autumn follows the summer monsoon. The air is washed clean of dust, offering crystal-clear panoramic visibility of peaks across Everest, Annapurna, and Langtang. Daytime temperatures are pleasant, though nights at altitude drop well below freezing by November.",
      "Spring brings rising temperatures and vibrant color as high-altitude rhododendron and magnolia forests bloom between 2,000m and 3,500m. Mountain passes are warm and snow begins to recede, though occasional afternoon haze can gather in lower valleys.",
      "For rain-shadow regions like Upper Mustang and Dolpo, summer (June to August) is also suitable, as the northern Himalayan massif shields these plateaus from the southern monsoon.",
    ],
  },
  {
    slug: "altitude-acclimatization-fundamentals",
    title: "High-Altitude Acclimatization: Practical Rules for Himalayan Trails",
    category: "Health & Safety",
    readingTimeMin: 7,
    excerpt: "How our itineraries build gradual elevation steps, hydration rules, and early recognition of mountain sickness symptoms.",
    publishedDate: "September 2026",
    coverImage: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?q=80&w=800&auto=format&fit=crop",
    content: [
      "Trekking in Nepal regularly carries travelers above 3,500 meters (11,500 feet), where air density and available oxygen decrease significantly. Safe acclimatization relies on physiological adaptation, not physical strength alone.",
      "The cardinal rule is gradual ascent: above 3,000m, keep your net sleeping altitude increase between 300 to 500 meters per day, with rest or active acclimatization days scheduled every 3-4 days.",
      "Climb high, sleep low. On rest days, our guides lead gentle exploratory day hikes up surrounding ridges before returning to the lower teahouse village to sleep.",
      "Maintain consistent hydration (3 to 4 liters of purified water daily) and listen candidly to your body. We carry pulse oximeters on all high-altitude routes to monitor blood oxygen saturation twice daily.",
    ],
  },
  {
    slug: "teahouse-etiquette-and-mountain-life",
    title: "Teahouse Culture: What to Expect in Himalayan Mountain Lodges",
    category: "Cultural Insight",
    readingTimeMin: 5,
    excerpt: "From communal wood-stove dining halls to solar-heated bucket showers, discover how mountain hospitality functions across remote trails.",
    publishedDate: "August 2026",
    coverImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop",
    content: [
      "The teahouse network in Nepal is one of the world's most unique mountain lodge traditions. Run primarily by local families, these stone and timber lodges provide warm shelter and hearty food after a long day of hiking.",
      "The heart of every lodge is the dining hall, centered around a metal wood stove fueled by dried yak dung or responsibly harvested timber. Travelers gather here in the evening to review maps, share stories, and enjoy hot meals.",
      "Dal Bhat (steamed rice, spiced lentil soup, seasonal vegetables, and pickles) is the national staple and the ideal fuel for trekkers: nutritious, comforting, and traditionally served with free second portions.",
      "Rooms are simple twin bedrooms with foam mattresses, clean sheets, and blankets. Trekkers are advised to bring a 3-to-4 season sleeping bag for warmth at elevations above 3,500m.",
    ],
  },
  {
    slug: "packing-essentials-for-nepal-trek",
    title: "Packing for the Himalayas: The Layering System Explained",
    category: "Gear & Preparation",
    readingTimeMin: 6,
    excerpt: "A realistic breakdown of moisture-wicking base layers, insulating down, footwear selection, and what gear can be rented in Kathmandu.",
    publishedDate: "July 2026",
    coverImage: "https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?q=80&w=800&auto=format&fit=crop",
    content: [
      "Preparing for a Himalayan trek is about adaptability. You will experience temperatures ranging from 25°C in sunny sub-tropical river valleys to -15°C at high mountain base camps.",
      "Rely on a three-tier technical layering system: moisture-wicking merino wool or synthetic base layers, insulating fleece or mid-layer jackets, and a windproof/waterproof breathable outer shell.",
      "A quality down jacket (rated to -10°C or -20°C depending on the route and season) is indispensable for evening comfort. If you don't own high-grade down apparel, excellent rental options are readily available in Kathmandu's Thamel district.",
      "Break in your trekking boots at home before departing. Stiff, unconditioned boots on high rocky trails can cause severe blisters that compromise your journey.",
    ],
  },
];
