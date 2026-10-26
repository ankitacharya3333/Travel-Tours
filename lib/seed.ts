import { prisma } from "./prisma";
import { DESTINATIONS_DATA, TRIPS_DATA } from "./data";
import { TourCategory, Difficulty, Region } from "@prisma/client";

function mapCategory(cat: string): TourCategory {
  switch (cat) {
    case "Everest and high-altitude trekking":
      return TourCategory.TREKKING;
    case "Annapurna and scenic Himalayan trekking":
      return TourCategory.TREKKING;
    case "Langtang and off-the-beaten-path adventures":
      return TourCategory.TREKKING;
    case "Cultural tours around Kathmandu Valley":
      return TourCategory.CULTURAL_HERITAGE;
    case "Wildlife and jungle experiences in Chitwan":
      return TourCategory.WILDLIFE_SAFARI;
    case "Pokhara, lakes, and soft adventure":
      return TourCategory.LAKES_AND_SOFT_ADVENTURE;
    case "Pilgrimage and heritage journeys":
      return TourCategory.PILGRIMAGE_AND_HERITAGE;
    case "Custom private tours throughout Nepal":
      return TourCategory.CUSTOM_PRIVATE;
    default:
      return TourCategory.TREKKING;
  }
}

function mapRegion(reg: string): Region {
  const upper = reg.toUpperCase();
  if (upper.includes("EVEREST")) return Region.EVEREST;
  if (upper.includes("ANNAPURNA")) return Region.ANNAPURNA;
  if (upper.includes("LANGTANG")) return Region.LANGTANG;
  if (upper.includes("MANASLU")) return Region.MANASLU;
  if (upper.includes("MUSTANG")) return Region.MUSTANG;
  if (upper.includes("POKHARA")) return Region.POKHARA;
  if (upper.includes("CHITWAN")) return Region.CHITWAN;
  return Region.KATHMANDU;
}

function mapDifficulty(diff: string): Difficulty {
  const upper = diff.toUpperCase();
  if (upper === "EASY") return Difficulty.EASY;
  if (upper === "MODERATE") return Difficulty.MODERATE;
  if (upper === "STRENUOUS") return Difficulty.STRENUOUS;
  return Difficulty.CHALLENGING;
}

export async function seedDatabase() {
  console.log("Starting idempotent database seed...");

  for (const dest of DESTINATIONS_DATA) {
    await prisma.destination.upsert({
      where: { slug: dest.slug },
      update: {
        name: dest.name,
        region: mapRegion(dest.region),
        elevation: dest.elevation,
        tagline: dest.tagline,
        description: dest.description,
        heroImage: dest.heroImage,
        highlights: dest.highlights,
        bestTime: dest.bestTime,
        recommendedDuration: dest.recommendedDuration,
      },
      create: {
        slug: dest.slug,
        name: dest.name,
        region: mapRegion(dest.region),
        elevation: dest.elevation,
        tagline: dest.tagline,
        description: dest.description,
        heroImage: dest.heroImage,
        highlights: dest.highlights,
        bestTime: dest.bestTime,
        recommendedDuration: dest.recommendedDuration,
      },
    });
  }

  for (const trip of TRIPS_DATA) {
    const matchingDest = DESTINATIONS_DATA.find(
      (d) => trip.region.toLowerCase().includes(d.region.toLowerCase()) || d.name.toLowerCase().includes(trip.region.toLowerCase())
    );

    let destinationId: string | undefined = undefined;
    if (matchingDest) {
      const dbDest = await prisma.destination.findUnique({ where: { slug: matchingDest.slug } });
      if (dbDest) destinationId = dbDest.id;
    }

    await prisma.trip.upsert({
      where: { slug: trip.slug },
      update: {
        title: trip.title,
        subtitle: trip.subtitle,
        durationDays: trip.durationDays,
        maxAltitudeMeters: trip.maxAltitudeMeters,
        difficulty: mapDifficulty(trip.difficulty),
        category: mapCategory(trip.category),
        region: mapRegion(trip.region),
        startingPoint: trip.startingPoint,
        endingPoint: trip.endingPoint,
        bestSeasons: trip.bestSeasons,
        featured: trip.featured,
        priceFromUsd: trip.priceFromUsd,
        currency: trip.currency ?? "USD",
        maxGroupSize: trip.maxGroupSize ?? 10,
        fitnessRequired: trip.fitnessRequired,
        heroImage: trip.heroImage,
        overview: trip.overview,
        highlights: trip.highlights,
        itinerarySummary: trip.itinerarySummary ?? [],
        includedItems: trip.includedItems ?? [],
        excludedItems: trip.excludedItems ?? [],
        isPublished: true,
        destinationId,
      },
      create: {
        slug: trip.slug,
        title: trip.title,
        subtitle: trip.subtitle,
        durationDays: trip.durationDays,
        maxAltitudeMeters: trip.maxAltitudeMeters,
        difficulty: mapDifficulty(trip.difficulty),
        category: mapCategory(trip.category),
        region: mapRegion(trip.region),
        startingPoint: trip.startingPoint,
        endingPoint: trip.endingPoint,
        bestSeasons: trip.bestSeasons,
        featured: trip.featured,
        priceFromUsd: trip.priceFromUsd,
        currency: trip.currency ?? "USD",
        maxGroupSize: trip.maxGroupSize ?? 10,
        fitnessRequired: trip.fitnessRequired,
        heroImage: trip.heroImage,
        overview: trip.overview,
        highlights: trip.highlights,
        itinerarySummary: trip.itinerarySummary ?? [],
        includedItems: trip.includedItems ?? [],
        excludedItems: trip.excludedItems ?? [],
        isPublished: true,
        destinationId,
      },
    });
  }

  console.log("Database seeded successfully.");
}

if (process.argv[1]?.includes("seed")) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
