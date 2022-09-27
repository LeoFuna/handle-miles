import { db } from "db/firebase";
import { collection, getDocs, updateDoc, doc, getDoc, where, query, DocumentData } from "firebase/firestore";

type AccountFromStorage = {
  id: string,
  averagePrice: number,
  companyId: string,
  totalMiles: number,
  userId: string,
}

type UpdateAccountPayload = {
  companyId: string,
  totalMiles: number,
  averagePrice: number,
  type: string,
};

type UpdateAccountResponse = {
  id: string,
}

function calcNewAccountValues(type: string, totalMiles: number, averagePrice: number, account: AccountFromStorage | any): AccountFromStorage {
  const newAccount = { ...account };
  if (type === '+') {
    const totalPrice = (newAccount.totalMiles / 1000) * newAccount.averagePrice + (totalMiles/1000) * averagePrice;
    newAccount.totalMiles += totalMiles;
    newAccount.averagePrice = parseFloat((totalPrice / (newAccount.totalMiles/1000)).toFixed(2));
    return newAccount;
  }
  newAccount.totalMiles -= totalMiles;
  return newAccount;
}

const updateAccountService = async (
    userId: string,
    { companyId, totalMiles, averagePrice, type }: UpdateAccountPayload
  ): Promise<UpdateAccountResponse> => {
  const accountsRef = collection(db, 'accounts');
  const querySnapshot = query(accountsRef, where('userId', '==', `${userId}`), where('companyId', '==', `${companyId}`));
  const documents = await getDocs(querySnapshot);
  const [account] = documents.docs.map((doc) => {
    const account = doc.data();
    account.id = doc.id;
    return account;
  }); 

  const newAccountValues = calcNewAccountValues(type, totalMiles, averagePrice, account);

  const accountDocRef = doc(db, 'accounts', `${account.id}`);
  await updateDoc(accountDocRef, {
    averagePrice: newAccountValues.averagePrice,
    totalMiles: newAccountValues.totalMiles,
  });

  return {
    id: newAccountValues.id,
  };
};

export default updateAccountService;
