import { PropsWithChildren, useState } from 'react';
import { GetServerSideProps } from 'next';
import { ResponseOTW, Ticket } from '@/types/types';

import Head from 'next/head';
import Link from 'next/link';
import DynamicMessage from '@/components/DynamicMessage/DynamicMessage';
import Message from '@/components/Message/Message';

import styles from '@/styles/ticketview.module.scss';

type UpdateTicket = {
  message?: string;
  status?: Ticket['status'];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const host = context.req.headers.host;
  const ticketURL = context.resolvedUrl;
  const response = await (await fetch(`http://${host}/api${ticketURL}`)).json();
  return {
    props: { ...response },
  };
};

export default function TicketView(
  props: PropsWithChildren<ResponseOTW<Ticket>>
) {
  const { success, errorMessage, data: ticket } = props;

  const [error, setError] = useState<{ didError: boolean; message: string }>({
    didError: !success,
    message: errorMessage || '',
  });

  const [messages, setMessages] = useState<Ticket['messages']>(
    ticket?.messages ?? []
  );

  const updateTicket = (toUpdate: UpdateTicket) => {
    fetch(`/api/tickets/${ticket?.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toUpdate),
    }).catch(() =>
      setError({
        didError: true,
        message: 'An error occured while adding a message.',
      })
    );

    // Create a faux message in state to make it appear like it was sent immediately.
    if (toUpdate.message)
      setMessages([
        ...messages,
        {
          // This may seem strange, I think it does. Its purpose is to prevent conflicting keys for React.
          id: parseInt(Math.random().toString().slice(2), 10),
          author: 'admin <admin@admin.io>',
          message: toUpdate.message,
          sentOn: new Date(),
          ticketId: ticket!.id,
        },
      ]);
  };

  return (
    <>
      <Head>
        <title>Manage Some Awesome Tickets</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <main className={`${styles.ticket}`}>
        <header className={`${styles.header}`}>
          <h1 hidden={!error.didError} aria-hidden={!error.didError}>
            {error.message || 'An error occured while loading ticket.'}
          </h1>
          <h1 hidden={error.didError} aria-hidden={error.didError}>
            {ticket?.title} from {ticket?.author.split(' <')[0]}
          </h1>

          <select
            defaultValue={ticket?.status}
            onChange={(event) =>
              updateTicket({
                status: event.currentTarget.value as Ticket['status'],
              })
            }>
            {/* If we had more options, or wanted to define them somewhere else, we could refactor this to pull from an api and map them into elements. */}
            {/* I chose to manually write them out because it was only three options. */}
            <option value='new'>New</option>
            <option value='in-progress'>In Progress</option>
            <option value='resolved'>Resolved</option>
          </select>

          <Link href='/tickets' aria-label='Go back'>
            Back
          </Link>
        </header>

        <section className={`${styles.messages}`}>
          <DynamicMessage
            didError={error.didError}
            noItem={messages.length !== 0}
            errorMessage={error.message || 'Messages could not be fetched.'}
            noItemMessage='No messages.'
          />

          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </section>

        <form
          className={`${styles['send-message']}`}
          onSubmit={(event) => {
            event.preventDefault();
            const { newMessage: newMessageElement } = event.currentTarget;
            updateTicket({ message: newMessageElement.value });
            newMessageElement.value = '';
          }}>
          <textarea
            name='newMessage'
            placeholder='Your response'
            required
            rows={10}
            cols={50}
          />

          <input
            type='submit'
            value='Send'
            disabled={error.didError}
            aria-disabled={error.didError}
          />
        </form>
      </main>
    </>
  );
}
