import { db } from "db/firebase";
import express from "express";
import { collection, getDocs, query, where } from 'firebase/firestore';
import createTransactionService from "services/transactions/create-transaction.services";
import { formatDate } from "utils/date-utils";

const app = express();

app.get('/api/transactions', async (req: express.Request, res: express.Response) => {
  const usersRef = collection(db, 'transactions');
  const myQuery = query(usersRef, where('userId', '==', `${req.query.userId}`));
  const querySnapshot = await getDocs(myQuery);
  const transactions = querySnapshot.docs.map((doc) => {
    const transaction = doc.data();
    transaction.date = formatDate(transaction.date, 'dd/MM/yyyy');
    transaction.id = doc.id;
    return transaction;
  });

  return res.json({ transactions });
});

app.post('/api/transactions', async (req: express.Request, res: express.Response) => {
  const createResponse = await createTransactionService(JSON.parse(req.body));
  return res.json(createResponse);
});

export default app;

