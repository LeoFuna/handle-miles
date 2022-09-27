import { db } from "db/firebase";
import { collection, DocumentData, getDocs } from "firebase/firestore";

type CompanyResponse = {
  id: string;
  name: string;
}

const listCompaniesService = async (): Promise<CompanyResponse[] | DocumentData[]> => {
  const companiesRef = collection(db, 'companies');
  const querySnapshot = await getDocs(companiesRef);
  const companies = querySnapshot.docs.map((doc): DocumentData |CompanyResponse => {
    const company = doc.data();
    company.id = doc.id;
    return company;
  });
  return companies;
};

export default listCompaniesService;
