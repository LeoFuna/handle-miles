import { db } from "db/firebase";
import express from "express";
import { collection, getDocs, query, where } from 'firebase/firestore';
import listCompaniesService from "services/companies/list-companies.services";
import createTransactionService from "services/transactions/create-transaction.services";
import { formatDate } from "utils/date-utils";

const app = express();

app.route('/api/transactions')
  .get(async (req: express.Request, res: express.Response) => {
    const companies = await listCompaniesService();
    const transactionsRef = collection(db, 'transactions');
    const myQuery = query(transactionsRef, where('userId', '==', `${req.query.userId}`));
    const querySnapshot = await getDocs(myQuery);
    const transactions = querySnapshot.docs.map((doc) => {
      const transaction = doc.data();
      transaction.company = companies.find((company) => company.id === transaction.companyId)?.name;
      transaction.date = formatDate(transaction.date, 'dd/MM/yyyy');
      transaction.id = doc.id;
      return transaction;
    });

    return res.json({ transactions });
})
  .post(async (req: express.Request, res: express.Response) => {
    const createResponse = await createTransactionService(JSON.parse(req.body));
    return res.json(createResponse);
});

export default app;

