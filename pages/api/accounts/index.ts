import { onError, onNoMatch } from "utils/exceptions";
import { createRouter } from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import createAccountService from "services/accounts/create-account.services";
import getUserAccountsService from "services/accounts/get-user-accounts.services";

const router = createRouter<NextApiRequest, NextApiResponse>();

const accounts = router
  .get(async (req, res) => {
    const accounts = await getUserAccountsService(req.query.userId);
    res.json({ accounts });
})
  .post(async (req, res) => {
    const createResponse = await createAccountService(req.body);
    res.json(createResponse);
});

export default accounts.handler({
  onError,
  onNoMatch,
});
