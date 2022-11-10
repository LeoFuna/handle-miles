import { createRouter } from "next-connect";
import { onError, onNoMatch } from "utils/exceptions";
import type { NextApiRequest, NextApiResponse } from "next";
import listUsersByFamily from "services/users/get-users-by-family.services";

const router = createRouter<NextApiRequest, NextApiResponse>();

const users = router
  .get(async (req, res) => {
    const { familyId, name } = req.query;
    if (typeof familyId !== 'string' || typeof name !== 'string') throw new Error('Dados inválidos!');

    const users = await listUsersByFamily({ familyId, name });

    res.json({ users });
  });


export default users.handler({
  onError,
  onNoMatch,
});
