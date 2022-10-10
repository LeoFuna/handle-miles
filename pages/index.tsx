import Header from 'components/core/Header';
import Dashboard from 'components/home/Dashboard';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { getSerializedValuesFromSession } from 'utils/session-utils';
import styles from '../styles/Home.module.css';
import Signout from './auth/signout';

const Home: NextPage = () => {
  const session = useSession();
  const { familyId, userId, name } = getSerializedValuesFromSession(session.data);

  if (session.status === 'loading') return <h1>Carregando...</h1>;
  if (session.status === 'unauthenticated') return <Signout />;
  return (
    <div className={styles.container}>
      <Head>
        <title>Gestor de Milhas</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Dashboard
        userId={ userId }
        familyId={ familyId }
        name={name}
      />
    </div>
  );
};

export default Home;
