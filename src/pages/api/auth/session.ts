import { NextApiHandler } from "next";

import { getUser } from "models/User";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { token: userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const entity = await getUser(userId);
    res.status(200).json({ data: entity });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error instanceof Error ? error.message : "Something went wrong" });
  }
};

export default handler;
