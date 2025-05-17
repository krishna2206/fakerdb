/**
 * User-related utility functions
 */

/**
 * Generates initials from a user's name (up to 2 characters)
 * 
 * @param name - The user's name (optional)
 * @returns The initials in uppercase, or "?" if no name is provided
 */
export const getUserInitials = (name?: string): string => {
  if (!name) return "?";
  
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};
