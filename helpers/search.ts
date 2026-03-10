import type { UserType } from "@/app/types/user";

export function search(users: UserType[], query: string): UserType[] {
  if (!Array.isArray(users)) return [];
  const q = query.toLowerCase();
  return users.filter(u => u.username.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
}