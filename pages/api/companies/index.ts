import router, { onError, onNoMatch } from "utils/router";
import listCompaniesService from "services/companies/list-companies.services";

const companies = router
  .get(async (_req, res) => {
  const companies = await listCompaniesService();
  res.json({ companies });
});

export default companies.handler({
  onError,
  onNoMatch,
});
