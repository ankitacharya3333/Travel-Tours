import { prisma } from "./prisma";
import { DESTINATIONS_DATA, TRIPS_DATA } from "./data";
import { TourCategory, Difficulty, Region, Prisma } from "@prisma/client";

export async function getDestinationsFromDb() {
  try {
    const destinations = await prisma.destination.findMany({
      orderBy: { name: "asc" },
      include: {
        trips: {
          where: { isPublished: true },
          select: { id: true, title: true, slug: true, durationDays: true, priceFromUsd: true, difficulty: true, heroImage: true },
        },
      },
    });

    if (destinations && destinations.length > 0) {
      return destinations;
    }
  } catch (error) {
    console.warn("Database connection unavailable or unseeded. Falling back to verified dataset.", error);
  }

  // Fallback to static verified dataset
  return DESTINATIONS_DATA.map((d) => ({
    ...d,
    createdAt: new Date(),
    updatedAt: new Date(),
    trips: TRIPS_DATA.filter((t) => t.region.toLowerCase().includes(d.region.toLowerCase()) || d.name.toLowerCase().includes(t.region.toLowerCase())),
  }));
}

export async function getDestinationBySlug(slug: string) {
  try {
    const destination = await prisma.destination.findUnique({
      where: { slug },
      include: {
        trips: {
          where: { isPublished: true },
        },
      },
    });
    if (destination) return destination;
  } catch (error) {
    console.warn("Database unavailable for destination query, using fallback.", error);
  }

  const staticMatch = DESTINATIONS_DATA.find((d) => d.slug === slug);
  if (!staticMatch) return null;

  return {
    ...staticMatch,
    createdAt: new Date(),
    updatedAt: new Date(),
    trips: TRIPS_DATA.filter((t) => t.region.toLowerCase().includes(staticMatch.region.toLowerCase()) || staticMatch.name.toLowerCase().includes(t.region.toLowerCase())),
  };
}

export interface TripsFilterOptions {
  search?: string;
  category?: string;
  region?: string;
  difficulty?: string;
  duration?: string; // "short" (1-8), "medium" (9-14), "long" (15+)
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price-asc" | "price-desc" | "duration-asc" | "duration-desc" | "popular";
  page?: number;
  pageSize?: number;
}

export async function getTrips(options: TripsFilterOptions = {}) {
  const {
    search,
    category,
    region,
    difficulty,
    duration,
    minPrice,
    maxPrice,
    sortBy = "popular",
    page = 1,
    pageSize = 9,
  } = options;

  try {
    // Build Prisma query
    const whereClause: Prisma.TripWhereInput = {
      isPublished: true,
    };

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { subtitle: { contains: search, mode: "insensitive" } },
        { overview: { contains: search, mode: "insensitive" } },
      ];
    }

    if (category && category !== "all") {
      whereClause.category = category as TourCategory;
    }

    if (region && region !== "all") {
      whereClause.region = region.toUpperCase() as Region;
    }

    if (difficulty && difficulty !== "all") {
      whereClause.difficulty = difficulty.toUpperCase() as Difficulty;
    }

    if (duration === "short") {
      whereClause.durationDays = { lte: 8 };
    } else if (duration === "medium") {
      whereClause.durationDays = { gte: 9, lte: 14 };
    } else if (duration === "long") {
      whereClause.durationDays = { gte: 15 };
    }

    if (minPrice || maxPrice) {
      whereClause.priceFromUsd = {};
      if (minPrice) (whereClause.priceFromUsd as Prisma.IntFilter).gte = minPrice;
      if (maxPrice) (whereClause.priceFromUsd as Prisma.IntFilter).lte = maxPrice;
    }

    let orderByClause: Prisma.TripOrderByWithRelationInput = { featured: "desc" };
    if (sortBy === "price-asc") orderByClause = { priceFromUsd: "asc" };
    if (sortBy === "price-desc") orderByClause = { priceFromUsd: "desc" };
    if (sortBy === "duration-asc") orderByClause = { durationDays: "asc" };
    if (sortBy === "duration-desc") orderByClause = { durationDays: "desc" };

    const totalCount = await prisma.trip.count({ where: whereClause });

    if (totalCount > 0) {
      const trips = await prisma.trip.findMany({
        where: whereClause,
        orderBy: orderByClause,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: { destination: true },
      });

      return {
        trips,
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
        currentPage: page,
      };
    }
  } catch (error) {
    console.warn("Database unavailable for trips query, falling back to static catalog.", error);
  }

  // Robust in-memory filtering fallback for the static catalog
  let filtered = [...TRIPS_DATA];

  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(
      (t) =>
        t.title.toLowerCase().includes(s) ||
        t.subtitle.toLowerCase().includes(s) ||
        t.overview.toLowerCase().includes(s)
    );
  }

  if (category && category !== "all") {
    filtered = filtered.filter((t) => t.category.toLowerCase() === category.toLowerCase());
  }

  if (region && region !== "all") {
    filtered = filtered.filter((t) => t.region.toLowerCase().includes(region.toLowerCase()));
  }

  if (difficulty && difficulty !== "all") {
    filtered = filtered.filter((t) => t.difficulty.toLowerCase() === difficulty.toLowerCase());
  }

  if (duration === "short") {
    filtered = filtered.filter((t) => t.durationDays <= 8);
  } else if (duration === "medium") {
    filtered = filtered.filter((t) => t.durationDays >= 9 && t.durationDays <= 14);
  } else if (duration === "long") {
    filtered = filtered.filter((t) => t.durationDays >= 15);
  }

  if (minPrice) {
    filtered = filtered.filter((t) => t.priceFromUsd >= minPrice);
  }
  if (maxPrice) {
    filtered = filtered.filter((t) => t.priceFromUsd <= maxPrice);
  }

  // Sorting
  if (sortBy === "price-asc") {
    filtered.sort((a, b) => a.priceFromUsd - b.priceFromUsd);
  } else if (sortBy === "price-desc") {
    filtered.sort((a, b) => b.priceFromUsd - a.priceFromUsd);
  } else if (sortBy === "duration-asc") {
    filtered.sort((a, b) => a.durationDays - b.durationDays);
  } else if (sortBy === "duration-desc") {
    filtered.sort((a, b) => b.durationDays - a.durationDays);
  } else {
    filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  const totalCount = filtered.length;
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return {
    trips: paginated,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
  };
}

export async function getTripBySlug(slug: string) {
  try {
    const trip = await prisma.trip.findUnique({
      where: { slug },
      include: {
        destination: true,
      },
    });
    if (trip && trip.isPublished) return trip;
  } catch (error) {
    console.warn("Database unavailable for trip slug query, falling back to static catalog.", error);
  }

  return TRIPS_DATA.find((t) => t.slug === slug) ?? null;
}
