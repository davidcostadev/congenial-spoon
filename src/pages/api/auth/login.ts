import { NextApiHandler } from "next";

import { loginUser } from "models/User";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const entity = await loginUser({ email, password });
    res.status(200).json({ data: entity });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error instanceof Error ? error.message : "Something went wrong" });
  }
};

export default handler;
