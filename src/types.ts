import { User as PrismaUser } from "@prisma/client";

export type User = Omit<PrismaUser, "password">;

export type UserInput = Pick<PrismaUser, "name" | "email" | "password">;

export type RegisterResponse = { data: User };
