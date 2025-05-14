import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateReadingTime(text: string) {
  if (!text) return 0

  const plainText = text.replace(/<[^>]+>/g, "")
  const wordCount = plainText.trim().split(/\s+/).length
  const wordsPerMinute = 200

  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  return readingTime === 0 ? 1 : readingTime
}

export const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, "-")
