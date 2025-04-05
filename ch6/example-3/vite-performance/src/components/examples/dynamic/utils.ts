/**
 * Utility functions.
 * This module will only be loaded when specifically requested through dynamic import.
 */

/**
 * Generate a random number between min and max (inclusive)
 */
export function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a simple UUID
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Get current timestamp in ISO format
 */
export function getCurrentTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Check if a value is empty (null, undefined, empty string, empty array, or empty object)
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) {
    return true;
  }
  if (typeof value === 'string' && value.trim() === '') {
    return true;
  }
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }
  if (typeof value === 'object' && value !== null && Object.keys(value).length === 0) {
    return true;
  }
  return false;
}

/**
 * Delay execution for a specified amount of time
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get browser information
 */
export function getBrowserInfo(): Record<string, string> {
  if (typeof window === 'undefined') {
    return { environment: 'server' };
  }
  
  const userAgent = navigator.userAgent;
  const browserInfo: Record<string, string> = {
    userAgent,
    platform: navigator.platform,
    language: navigator.language
  };
  
  return browserInfo;
} 