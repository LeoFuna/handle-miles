import express from "express";
import listUsersByFamily from "services/users/get-users-by-family.services";

const app = express();

type Params = {};
type ResBody = {};
type ReqBody = {};
type ReqQuery = {
  familyId: string;
  name: string;
}

app.get('/api/users', async (req: express.Request<Params, ResBody, ReqBody, ReqQuery>, res: express.Response) => {
  const { familyId, name } = req.query;
  const users = await listUsersByFamily({ familyId, name });
  res.json({ users });
});

export default app;
