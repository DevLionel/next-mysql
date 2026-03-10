// helpers/validation.ts
import type { UserType } from "@/app/types/user";

/**
 * Check if the email has a valid format
 */
export function isValidEmail(email: string): boolean {
  // Simple regex for email validation
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Check if email already exists in the user list
 */
export function isDuplicateEmail(email: string, users: UserType[], ignoreId?: number): boolean {
  return users.some(user => user.email === email && user.id !== ignoreId);
}