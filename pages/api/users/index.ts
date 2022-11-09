import { createRouter } from "next-connect";
import { onError, onNoMatch } from "utils/exceptions";
import type { NextApiRequest, NextApiResponse } from "next";
import listUsersByFamily from "services/users/get-users-by-family.services";

const router = createRouter<NextApiRequest, NextApiResponse>();

const users = router
  .get(async (req, res) => {
    const { familyId, name } = req.query;
    if (!familyId || !name) throw new Error('Campos obrigatorios faltando!');
    if (Array.isArray(familyId) || Array.isArray(name)) throw new Error('Campos obrigatorios com dados invalidos!');

    const users = await listUsersByFamily({ familyId, name });
    res.json({ users });
  });


export default users.handler({
  onError,
  onNoMatch,
});
