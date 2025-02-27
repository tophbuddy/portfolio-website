/**
 * Format a date string into a human-readable format
 * @param dateString ISO date string
 * @returns Formatted date string (e.g., "February 26, 2024")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC', // Ensure consistent date formatting regardless of timezone
  });
}
