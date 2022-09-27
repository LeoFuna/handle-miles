import express from "express";
import getUserAccountsService from "services/accounts/get-user-accounts.services";

const app = express();

app.get('/api/accounts', async (req: express.Request, res: express.Response) => {
  const accounts = await getUserAccountsService(req.query.userId);
  res.json({ accounts });
});

export default app;
