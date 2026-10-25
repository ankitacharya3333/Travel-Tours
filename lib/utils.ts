import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatElevation(meters: number): string {
  const feet = Math.round(meters * 3.28084);
  return `${meters.toLocaleString()} m (${feet.toLocaleString()} ft)`;
}
