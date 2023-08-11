import { useState, PropsWithChildren } from 'react';
import { ResponseOTW, Ticket as TicketType } from '@/types/types';
import { GetServerSideProps } from 'next';

import { Inter } from 'next/font/google';
import Head from 'next/head';
import DynamicMessage from '@/components/DynamicMessage/DynamicMessage';
import Ticket from '@/components/Ticket/Ticket';

import styles from '@/styles/tickets.module.scss';

const inter = Inter({ subsets: ['latin'] });

export const getServerSideProps: GetServerSideProps = async (context) => {
  const host = context.req.headers.host;
  const response = await (await fetch(`http://${host}/api/tickets`)).json();
  return { props: { ...response } };
};

export default function Admin(
  props: PropsWithChildren<ResponseOTW<TicketType[]>>
) {
  const { success, errorMessage, data: tickets } = props;

  const [showResolved, setShowResolved] = useState<boolean>(false);

  const ticketsFiltered = (tickets ?? []).filter((ticket) => {
    if (showResolved) return true;
    return ticket.status !== 'resolved';
  });

  return (
    <>
      <Head>
        <title>Manage Some Awesome Tickets</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <main className={`${styles.tickets} ${inter.className}`}>
        <header>
          <h1>All Tickets</h1>
          <button onClick={() => setShowResolved(!showResolved)}>
            {showResolved ? 'Hide' : 'Show'} resolved
          </button>
        </header>
        <section className={`${styles['tickets-container']}`}>
          <DynamicMessage
            didError={!success}
            noItem={ticketsFiltered.length !== 0}
            errorMessage={
              errorMessage || 'An error occured while getting the tickets.'
            }
            noItemMessage='No tickets were found.'
          />
          {ticketsFiltered.map((ticket) => (
            <Ticket
              key={ticket.id}
              id={ticket.id}
              title={ticket.title}
              status={ticket.status}
            />
          ))}
        </section>
      </main>
    </>
  );
}
