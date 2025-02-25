/**
 * Date formatting utilities for experience timeline
 */

/**
 * Formats a date into a human-readable string
 * @param date Date string in any valid format
 * @param format Display format ('short', 'medium', or 'long')
 * @returns Formatted date string
 */
export function formatDate(date: string, format: 'short' | 'medium' | 'long' = 'medium'): string {
  if (date === 'Present') return date;

  const dateObj = new Date(date);
  const month = dateObj.toLocaleString('default', { month: format === 'short' ? 'short' : 'long' });
  const year = dateObj.getFullYear();

  switch (format) {
    case 'short':
      return `${month} ${year}`;
    case 'medium':
      return `${month} ${year}`;
    case 'long':
      return `${month} ${year}`;
    default:
      return `${month} ${year}`;
  }
}

/**
 * Calculates the duration between two dates
 * @param startDate Start date string
 * @param endDate End date string or 'Present'
 * @param format Display format ('short', 'medium', or 'long')
 * @returns Formatted duration string
 */
export function calculateDuration(
  startDate: string,
  endDate: string,
  format: 'short' | 'medium' | 'long' = 'medium'
): string {
  const start = new Date(startDate);
  const end = endDate === 'Present' ? new Date() : new Date(endDate);

  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();

  let totalMonths = years * 12 + months;
  if (totalMonths < 0) return 'Invalid duration';

  const finalYears = Math.floor(totalMonths / 12);
  const finalMonths = totalMonths % 12;

  switch (format) {
    case 'short':
      return formatDurationShort(finalYears, finalMonths);
    case 'medium':
      return formatDurationMedium(finalYears, finalMonths);
    case 'long':
      return formatDurationLong(finalYears, finalMonths);
    default:
      return formatDurationMedium(finalYears, finalMonths);
  }
}

/**
 * Formats a date range
 * @param startDate Start date string
 * @param endDate End date string or 'Present'
 * @param format Display format ('short', 'medium', or 'long')
 * @returns Formatted date range string
 */
export function formatDateRange(
  startDate: string,
  endDate: string,
  format: 'short' | 'medium' | 'long' = 'medium'
): string {
  return `${formatDate(startDate, format)} - ${formatDate(endDate, format)}`;
}

/**
 * Returns a relative time string (e.g., "2 years ago")
 * @param date Date string
 * @returns Relative time string
 */
export function getRelativeTimeString(date: string): string {
  if (date === 'Present') return 'Current';

  const timeMs = new Date(date).getTime();
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);
  const deltaMinutes = Math.round(deltaSeconds / 60);
  const deltaHours = Math.round(deltaMinutes / 60);
  const deltaDays = Math.round(deltaHours / 24);
  const deltaWeeks = Math.round(deltaDays / 7);
  const deltaMonths = Math.round(deltaDays / 30);
  const deltaYears = Math.round(deltaMonths / 12);

  switch (true) {
    case Math.abs(deltaYears) > 0:
      return `${Math.abs(deltaYears)} year${Math.abs(deltaYears) === 1 ? '' : 's'} ago`;
    case Math.abs(deltaMonths) > 0:
      return `${Math.abs(deltaMonths)} month${Math.abs(deltaMonths) === 1 ? '' : 's'} ago`;
    case Math.abs(deltaWeeks) > 0:
      return `${Math.abs(deltaWeeks)} week${Math.abs(deltaWeeks) === 1 ? '' : 's'} ago`;
    case Math.abs(deltaDays) > 0:
      return `${Math.abs(deltaDays)} day${Math.abs(deltaDays) === 1 ? '' : 's'} ago`;
    default:
      return 'Recently';
  }
}

// Helper functions for duration formatting
function formatDurationShort(years: number, months: number): string {
  if (years === 0) return `${months}mo`;
  if (months === 0) return `${years}y`;
  return `${years}y ${months}mo`;
}

function formatDurationMedium(years: number, months: number): string {
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years !== 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} mo${months !== 1 ? 's' : ''}`);
  return parts.join(' ');
}

function formatDurationLong(years: number, months: number): string {
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} year${years !== 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} month${months !== 1 ? 's' : ''}`);
  return parts.join(' and ');
}

/**
 * Sorts dates in chronological order
 * @param dates Array of date strings
 * @param ascending Sort in ascending order if true, descending if false
 * @returns Sorted array of date strings
 */
export function sortDates(dates: string[], ascending: boolean = true): string[] {
  return dates.sort((a, b) => {
    if (a === 'Present') return ascending ? 1 : -1;
    if (b === 'Present') return ascending ? -1 : 1;
    
    const dateA = new Date(a).getTime();
    const dateB = new Date(b).getTime();
    
    return ascending ? dateA - dateB : dateB - dateA;
  });
}
