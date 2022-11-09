import { db } from "db/firebase";
import { onError, onNoMatch } from "utils/exceptions";
import { createRouter } from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { collection, DocumentData, getDocs, query, where } from "firebase/firestore";
import listCompaniesService from "services/companies/list-companies.services";
import createSettingService from "services/settings/create-setting.service";
import updateSettingsService from "services/settings/update-settings.services";

type ExchangeConfigResponse = {
  id: string;
  companyId: string;
  companyName: string;
  familyId: string;
  sellAveragePrice: number;
}

const router = createRouter<NextApiRequest, NextApiResponse>();

const settings = router
  .get(async (req, res) => {
    const { familyId } = req.query;
    const companies = await listCompaniesService();
    const exchangeConfigsRef = collection(db, 'exchangeConfigs');
    const myQuery = query(exchangeConfigsRef, where('familyId', '==', `${familyId}`));
    const querySnapshot = await getDocs(myQuery);

    const exchangeConfigs = querySnapshot.docs.map((doc): DocumentData | ExchangeConfigResponse => {
      const exchangeConfig = doc.data();
      exchangeConfig.companyName = companies.find((company) => company.id === exchangeConfig.companyId)?.name;
      exchangeConfig.id = doc.id;
      return exchangeConfig;
    });

    res.json({ exchangeConfigs });
})
  .put(async (req, res) => {
    const updateResponse = await updateSettingsService(JSON.parse(req.body));
    res.json(updateResponse);
})
  .post(async (req, res) => {
    const createResponse = await createSettingService(req.body);
    res.json(createResponse);
});

export default settings.handler({
  onError,
  onNoMatch,
});

