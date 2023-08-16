import { User as PrismaUser } from "@prisma/client";

export type User = Omit<PrismaUser, "password">;

export type UserInput = Pick<PrismaUser, "name" | "email" | "password">;

export type LoginInput = Pick<PrismaUser, "email" | "password">;

export type AuthResponse = { data: User };

export type LoginResponse = { data: { token: string } };
