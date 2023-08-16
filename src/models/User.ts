import { PrismaClient } from "@prisma/client";
import omit from "lodash/omit";

const prisma = new PrismaClient();

interface UserInput {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (data: UserInput) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (user) {
    throw new Error("User already exists");
  }

  const newEntity = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });

  return omit(newEntity, ["password"]);
};
