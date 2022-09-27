import { db } from "db/firebase";
import { addDoc, collection } from "firebase/firestore";
import updateAccountService from "services/accounts/update-account.services";

type TransactionType = {
  averagePrice: number,
  company: string,
  date: Date,
  totalMiles: number,
  type: string,
  userId: string,
  note: string,
}

const createTransactionService = async (transaction: any): Promise<TransactionType> => {
  const collectionRef = collection(db, 'transactions');
  await addDoc(collectionRef, transaction);
  const { totalMiles, averagePrice, type, userId } = transaction;
  await updateAccountService(userId, { companyId: 'Q57tEgqh8Fc1jEUDqe2L', totalMiles, averagePrice, type });
  // PRECISAR TRAZER COMPANY ID AQUI, TA VINDO SOMENTE O NAME DA COMPANHIA!!!
  return transaction;
};

export default createTransactionService;
