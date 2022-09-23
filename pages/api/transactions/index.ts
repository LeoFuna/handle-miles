import { db } from "db/firebase";
import express from "express";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { formatTimestampsToDate } from "utils/date-utils";

const app = express();

app.get('/api/transactions', async (req: express.Request, res: express.Response) => {
  const usersRef = collection(db, 'transactions');
  const myQuery = query(usersRef, where('userId', '==', `${req.query.userId}`));
  const querySnapshot = await getDocs(myQuery);
  const transactions = querySnapshot.docs.map((doc) => {
    const transaction = doc.data();
    transaction.date = formatTimestampsToDate(transaction.date.seconds, 'dd/MM/yyyy');
    transaction.id = doc.id;
    return transaction;
  });

  return res.json({ transactions });
});

export default app;

