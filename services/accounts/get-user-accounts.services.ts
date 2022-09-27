import { db } from "db/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const getUserAccountsService = async (userId: any) => {
  const accountsRef = collection(db, 'accounts');
  const querySnapshot = query(accountsRef, where('userId', '==', `${userId}`));
  const documentsAccounts = await getDocs(querySnapshot);
  const accounts = documentsAccounts.docs.map((doc) => {
    const account = doc.data();
    account.id = doc.id;
    return account;
  });
  return accounts;
};

export default getUserAccountsService;
