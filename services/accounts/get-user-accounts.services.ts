import { db } from "db/firebase";
import { collection, DocumentData, getDocs, query, where } from "firebase/firestore";
import listCompaniesService from "services/companies/list-companies.services";

type AccountResponse = {
  averagePrice: number;
  companyId: string;
  totalMiles: number;
  userId: string;
  company: string;
}

type CompanyResponse = {
  id: string;
  name: string;
}

const getUserAccountsService = async (userId: any): Promise<AccountResponse[] | DocumentData> => {
  const companies = await listCompaniesService();
  const accountsRef = collection(db, 'accounts');
  const querySnapshot = query(accountsRef, where('userId', '==', `${userId}`));
  const documentsAccounts = await getDocs(querySnapshot);
  const accounts = documentsAccounts.docs.map((doc): AccountResponse | DocumentData => {
    const account = doc.data();
    account.company = companies.find((company: CompanyResponse | DocumentData) => company.id === account.companyId)?.name;
    account.id = doc.id;
    return account;
  });

  return accounts;
};

export default getUserAccountsService;
