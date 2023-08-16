import { NextApiHandler } from "next";

import { registerUser } from "models/User";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const entity = await registerUser({ name, email, password });
    res.status(200).json({ data: entity });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error instanceof Error ? error.message : "Something went wrong" });
  }
};

export default handler;
