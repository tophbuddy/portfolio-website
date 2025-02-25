/**
 * Represents a skill category
 */
export interface Category {
  /** Unique identifier for the category */
  id: string;
  /** Display name of the category */
  name: string;
  /** Optional emoji icon */
  icon?: string;
  /** Optional count of items in this category */
  count?: number;
  /** Optional description */
  description?: string;
  /** Optional color theme */
  color?: {
    light: string;
    dark: string;
  };
}
