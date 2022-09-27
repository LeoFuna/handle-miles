import { db } from "db/firebase";
import { addDoc, collection } from "firebase/firestore";
import updateAccountService from "services/accounts/update-account.services";

type TransactionType = {
  averagePrice: number,
  companyId: string,
  date: Date,
  totalMiles: number,
  type: string,
  userId: string,
  note: string,
}

const createTransactionService = async (transaction: TransactionType): Promise<TransactionType> => {
  transaction.averagePrice = parseFloat(transaction.averagePrice.toFixed(2));
  const collectionRef = collection(db, 'transactions');
  await addDoc(collectionRef, transaction);
  const { totalMiles, averagePrice, type, userId, companyId } = transaction;
  await updateAccountService(userId, { companyId, totalMiles, averagePrice, type });
  return transaction;
};

export default createTransactionService;
