import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shorten(addr: string, n = 4): string {
  if (addr.length <= n * 2 + 2) return addr;
  return `${addr.slice(0, n + 2)}...${addr.slice(-n)}`;
}
