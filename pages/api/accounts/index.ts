import express from "express";
import createAccountService from "services/accounts/create-account.services";
import getUserAccountsService from "services/accounts/get-user-accounts.services";

const app = express();

app.get('/api/accounts', async (req: express.Request, res: express.Response) => {
  const accounts = await getUserAccountsService(req.query.userId);
  res.json({ accounts });
});

app.post('/api/accounts', async (req, res) => {
  const createResponse = await createAccountService(req.body);
  res.json(createResponse);
});

export default app;
