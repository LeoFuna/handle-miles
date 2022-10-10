import { db } from "db/firebase";
import { updateDoc, doc } from "firebase/firestore";

const updateSettingsService = async ({ configId, sellAveragePrice }: any) => {
  const exchangeConfigsRef = doc(db, 'exchangeConfigs', `${configId}`);
  await updateDoc(exchangeConfigsRef, {
    sellAveragePrice,
  });
  return { id: configId };
};

export default updateSettingsService;
