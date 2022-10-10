import { db } from "db/firebase";
import { addDoc, collection } from "firebase/firestore";

const createSettingService = async (payload: any) => {
  await addDoc(collection(db, 'exchangeConfigs'), payload);
  return { created: 'ok!' };
};

export default createSettingService;
