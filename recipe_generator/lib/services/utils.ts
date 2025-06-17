import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStrapiURL() {
  return process.env.STRAPI_API_URL ?? "https://cms.ite4108m.com";
}