import { PrismaClient } from "@prisma/client";
import omit from "lodash/omit";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

import { LoginInput, UserInput, User } from "types";

export const registerUser = async (data: UserInput) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email.toLowerCase(),
    },
  });

  if (user) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newEntity = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email.toLowerCase(),
      password: hashedPassword,
    },
  });

  return omit(newEntity, ["password"]);
};

export const loginUser = async (data: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new Error("Invalid email or/and password");
  }

  if (!(await bcrypt.compare(data.password, user.password))) {
    throw new Error("Invalid email or/and password");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not set");
  }

  const userOmitted = omit(user, ["password"]);

  const token = jwt.sign(userOmitted, process.env.JWT_SECRET);

  return {
    token,
  };
};

export const getUser = async (token: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not set");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET) as User | undefined;

  if (!decoded) {
    throw new Error("Invalid token");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return omit(user, ["password"]);
};
