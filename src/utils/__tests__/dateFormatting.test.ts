import {
  formatDate,
  calculateDuration,
  formatDateRange,
  getRelativeTimeString,
  sortDates,
} from '../dateFormatting';

describe('Date Formatting Utils', () => {
  describe('formatDate', () => {
    it('should format dates correctly', () => {
      expect(formatDate('2023-01-15', 'short')).toBe('Jan 2023');
      expect(formatDate('2023-01-15', 'medium')).toBe('January 2023');
      expect(formatDate('2023-01-15', 'long')).toBe('January 2023');
    });

    it('should return "Present" for "Present"', () => {
      expect(formatDate('Present')).toBe('Present');
    });
  });

  describe('calculateDuration', () => {
    it('should calculate duration in different formats', () => {
      const start = '2022-01-15';
      const end = '2023-06-15';

      expect(calculateDuration(start, end, 'short')).toBe('1y 5mo');
      expect(calculateDuration(start, end, 'medium')).toBe('1 yr 5 mos');
      expect(calculateDuration(start, end, 'long')).toBe('1 year and 5 months');
    });

    it('should handle Present as end date', () => {
      const start = '2022-01-15';
      const result = calculateDuration(start, 'Present', 'medium');
      expect(result).toMatch(/^\d+ yr[s]? \d+ mos$/);
    });

    it('should handle invalid durations', () => {
      expect(calculateDuration('2023-01-15', '2022-01-15')).toBe('Invalid duration');
    });
  });

  describe('formatDateRange', () => {
    it('should format date ranges correctly', () => {
      const start = '2022-01-15';
      const end = '2023-06-15';

      expect(formatDateRange(start, end, 'short')).toBe('Jan 2022 - Jun 2023');
      expect(formatDateRange(start, 'Present', 'short')).toBe('Jan 2022 - Present');
    });
  });

  describe('getRelativeTimeString', () => {
    beforeAll(() => {
      // Mock current date to ensure consistent test results
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-01-15'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should return relative time strings', () => {
      expect(getRelativeTimeString('2023-01-15')).toBe('1 year ago');
      expect(getRelativeTimeString('2023-12-15')).toBe('1 month ago');
      expect(getRelativeTimeString('Present')).toBe('Current');
    });
  });

  describe('sortDates', () => {
    it('should sort dates in ascending order', () => {
      const dates = ['2023-01-15', '2022-01-15', 'Present', '2023-06-15'];
      const sorted = sortDates(dates);
      expect(sorted).toEqual(['2022-01-15', '2023-01-15', '2023-06-15', 'Present']);
    });

    it('should sort dates in descending order', () => {
      const dates = ['2023-01-15', '2022-01-15', 'Present', '2023-06-15'];
      const sorted = sortDates(dates, false);
      expect(sorted).toEqual(['Present', '2023-06-15', '2023-01-15', '2022-01-15']);
    });
  });
});
