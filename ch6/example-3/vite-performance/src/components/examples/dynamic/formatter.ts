/**
 * String formatting utilities.
 * This module will only be loaded when specifically requested through dynamic import.
 */

/**
 * Capitalize the first letter of each word in a string
 */
export function capitalize(str: string): string {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Reverse a string
 */
export function reverse(str: string): string {
  return str.split('').reverse().join('');
}

/**
 * Convert a string to a URL-friendly slug
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
}

/**
 * Truncate a string to a specified length with ellipsis
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) {
    return str;
  }
  return str.slice(0, length) + '...';
}

/**
 * Count the number of words in a string
 */
export function countWords(str: string): number {
  return str.trim().split(/\s+/).length;
}

/**
 * Convert a string to camelCase
 */
export function camelCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
} 