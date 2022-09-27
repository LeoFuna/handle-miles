import Header from 'components/core/Header';
import Dashboard from 'components/home/Dashboard';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const session = useSession();
  const userId = (typeof session.data?.id === 'string') ? session.data?.id : undefined;
  if (session.status !== 'authenticated') return <h1>Usuário não autenticado!</h1>;
  return (
    <div className={styles.container}>
      <Head>
        <title>Gestor de Milhas</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Dashboard
        userId={ userId }
      />
    </div>
  );
};

export default Home;
