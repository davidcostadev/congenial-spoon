import { PrismaClient } from "@prisma/client";
import omit from "lodash/omit";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

import { LoginInput, UserInput } from "types";

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

  return omit(user, ["password"]);
};

export const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return omit(user, ["password"]);
};
