/**
 * Safely get the window object or return undefined if in a non-browser environment
 */
export default function getWindow(): Window | undefined {
  if (typeof window !== 'undefined') {
    return window;
  }
  return undefined;
}