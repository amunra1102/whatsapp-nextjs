/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';

import { Sidebar } from 'components';

const Dashboard = () => {
  return (
    <div>
      <Head>
        <title>What's App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar />
    </div>
  );
};

export default Dashboard;
