import { createRouter } from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

export const onError = (err: unknown, req: NextApiRequest, res: NextApiResponse) => {
  let errorMessage = 'Erro Genérico';
  if (err instanceof Error) {
    errorMessage = err.message;
  }
  res.status(500).end(errorMessage);
};

export const onNoMatch = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(404).end("Page is not found");
};
