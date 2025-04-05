/**
 * A collection of basic math functions.
 * This module will only be loaded when specifically requested through dynamic import.
 */

/**
 * Adds two numbers together
 */
export function add(a: number, b: number): number {
  return a + b;
}

/**
 * Subtracts the second number from the first
 */
export function subtract(a: number, b: number): number {
  return a - b;
}

/**
 * Multiplies two numbers together
 */
export function multiply(a: number, b: number): number {
  return a * b;
}

/**
 * Divides the first number by the second
 */
export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

/**
 * Calculates the square of a number
 */
export function square(a: number): number {
  return a * a;
}

/**
 * Calculates the square root of a number
 */
export function sqrt(a: number): number {
  if (a < 0) {
    throw new Error('Cannot calculate square root of negative number');
  }
  return Math.sqrt(a);
}

/**
 * Calculates the power of a number
 */
export function power(base: number, exponent: number): number {
  return Math.pow(base, exponent);
} 