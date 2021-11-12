import { NextApiResponse } from "next";

export const handleError = (error: any, res: NextApiResponse) => {
  if (error instanceof Error) {
    res.status(500).json({ message: error.message });
  } else {
    res.status(500).json({ message: error });
  }
};
