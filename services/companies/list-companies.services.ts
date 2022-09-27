import { db } from "db/firebase";
import { collection, getDocs } from "firebase/firestore";

const listCompaniesService = async () => {
  const companiesRef = collection(db, 'companies');
  const querySnapshot = await getDocs(companiesRef);
  const companies = querySnapshot.docs.map((doc) => {
    const company = doc.data();
    company.id = doc.id;
    return company;
  });
  return companies;
};

export default listCompaniesService;
