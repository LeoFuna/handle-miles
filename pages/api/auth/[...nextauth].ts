import NextAuth from 'next-auth';
import CredentialsProviders from 'next-auth/providers/credentials';
import { db } from 'db/firebase';
import bcrypt from 'bcrypt';
import { collection, getDocs, query, where } from 'firebase/firestore';

const secret = process.env.SECRET;
const maxAge = 24 * 60 * 60;

type LoginUser = {
  email: string,
  password: string,
}

type User = {
  id: string,
  name: string,
}

const authorize = async (credentials: LoginUser | undefined): Promise<User | null> => {
  try {
    if (!credentials?.email || !credentials?.password) return null;

    const usersRef = collection(db, 'users');
    const myQuery = query(usersRef, where('email', '==', `${credentials.email}`));
    const querySnapshot = await getDocs(myQuery);
    const userDoc = querySnapshot.docs[0];

    if (!userDoc) throw new Error('Invalid User!');
    if (await bcrypt.compare(credentials.password, userDoc.data().password)) {
      const { name } = userDoc.data();

      return { id: userDoc.id, name };
    }

    throw new Error('Invalid Credentials!');
  } catch(e) {
    console.error('Error: ', e);
    return null;
  }
};

export default NextAuth({
  providers: [
      CredentialsProviders({
      id: 'credentials',
      name: 'Custom Credential',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Senha', type: 'password' },
      },
      authorize,
    }),
  ],
  secret,
  jwt: {
    secret,
    maxAge,
  },
  session: {
    maxAge,
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.id = token.id;
        session.name = token.name;
      }
      return session;
    },
  },
});