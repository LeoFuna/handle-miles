import express from "express";
import listCompaniesService from "services/companies/list-companies.services";

const app = express();

app.get('/api/companies', async (_req: express.Request, res: express.Response) => {
  const companies = await listCompaniesService();
  res.json({ companies });
});

export default app;
