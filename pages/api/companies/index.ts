import { createRouter } from "next-connect";
import { onError, onNoMatch } from "utils/exceptions";
import type { NextApiRequest, NextApiResponse } from "next";
import listCompaniesService from "services/companies/list-companies.services";

const router = createRouter<NextApiRequest, NextApiResponse>();

const companies = router
  .get(async (_req, res) => {
  const companies = await listCompaniesService();
  res.json({ companies });
});

export default companies.handler({
  onError,
  onNoMatch,
});
