export type Role = "ADMIN" | "STAFF" | "CUSTOMER";

export const canAccessAdmin = (role?: Role | null) =>
  role === "ADMIN" || role === "STAFF";
