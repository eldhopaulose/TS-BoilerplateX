import { v4 as uuidv4 } from "uuid";

/**
 * User interface representing the shape of a user entity.
 */
export interface IUser {
  id: string;
  name: string;
  email: string;
  age: number;
  role: "admin" | "user" | "moderator";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * In-memory user store.
 * Replace this with your database (MongoDB, PostgreSQL, etc.) in production.
 */
const users: Map<string, IUser> = new Map();

// ─── Seed some sample data ──────────────────────────────────────────────────
const seedUsers: Omit<IUser, "id" | "createdAt" | "updatedAt">[] = [
  { name: "Eldho Paulose", email: "eldho@example.com", age: 28, role: "admin", isActive: true },
  { name: "Jane Smith", email: "jane@example.com", age: 25, role: "user", isActive: true },
  { name: "Bob Wilson", email: "bob@example.com", age: 32, role: "moderator", isActive: false },
];

seedUsers.forEach((userData) => {
  const id = uuidv4();
  users.set(id, {
    ...userData,
    id,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
});

// ─── Data Access Functions ───────────────────────────────────────────────────

export function findAll(): IUser[] {
  return Array.from(users.values());
}

export function findById(id: string): IUser | undefined {
  return users.get(id);
}

export function findByEmail(email: string): IUser | undefined {
  return Array.from(users.values()).find((u) => u.email === email);
}

export function create(data: Omit<IUser, "id" | "createdAt" | "updatedAt">): IUser {
  const id = uuidv4();
  const now = new Date();
  const user: IUser = { ...data, id, createdAt: now, updatedAt: now };
  users.set(id, user);
  return user;
}

export function update(id: string, data: Partial<Omit<IUser, "id" | "createdAt" | "updatedAt">>): IUser | null {
  const existing = users.get(id);
  if (!existing) return null;

  const updated: IUser = {
    ...existing,
    ...data,
    updatedAt: new Date(),
  };
  users.set(id, updated);
  return updated;
}

export function remove(id: string): boolean {
  return users.delete(id);
}

export function count(): number {
  return users.size;
}
