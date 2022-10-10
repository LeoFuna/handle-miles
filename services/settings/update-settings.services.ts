import { db } from "db/firebase";
import { updateDoc, doc } from "firebase/firestore";

const updateSettingsService = async ({ settingsId, sellAveragePrice }: any) => {
  const exchangeConfigsRef = doc(db, 'exchangeConfigs', `${settingsId}`);
  await updateDoc(exchangeConfigsRef, {
    sellAveragePrice,
  });
  return { id: settingsId };
};

export default updateSettingsService;
