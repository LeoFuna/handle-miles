import { db } from "db/firebase";
import express from "express";
import { collection, getDocs } from "firebase/firestore";

const app = express();

app.get('/api/companies', async (_req: express.Request, res: express.Response) => {
  const companiesRef = collection(db, 'companies');
  const querySnapshot = await getDocs(companiesRef);
  const companies = querySnapshot.docs.map((doc) => {
    const company = doc.data();
    company.id = doc.id;
    return company;
  });

  res.json({ companies });
});

export default app;
