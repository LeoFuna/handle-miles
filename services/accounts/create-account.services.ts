import { db } from "db/firebase";
import { addDoc, collection } from "firebase/firestore";

const createAccountService = async (payload: any) => {
  await addDoc(collection(db, 'accounts'), payload);
  return { status: 'ok' };
};

export default createAccountService;
