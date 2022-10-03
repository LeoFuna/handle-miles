import { db } from "db/firebase";
import { collection, getDocs, where, query } from "firebase/firestore";

const listUsersByFamily = async ({ familyId, name }: { familyId: string, name: string }) => {
  const usersRef = collection(db, 'users');
  const querySnapshot = query(usersRef, where('familyId', '==', `${familyId}`));
  const docsUsers = await getDocs(querySnapshot);
  const users = docsUsers.docs.map((doc) => {
    const { password, ...userWithoutPassword } = doc.data();
    userWithoutPassword.id = doc.id;
    return userWithoutPassword;
  });
  const orderCurrentUserAsFirst: any[] = [];
  users.forEach((user) => {
    user.name === name ? orderCurrentUserAsFirst.unshift(user) :
      orderCurrentUserAsFirst.push(user);
  });
  return orderCurrentUserAsFirst;
};

export default listUsersByFamily;
