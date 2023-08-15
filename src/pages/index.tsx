import { FormEvent, useState } from 'react';
import { ErrorState, ResponseOTW, Ticket } from '@/types/types';

import Head from 'next/head';

import styles from '@/styles/index.module.scss';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [error, setError] = useState<ErrorState>({
    didError: null,
    message: '',
  });
  const [success, setSuccess] = useState<boolean>(false);

  const formSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: event.currentTarget.email.value,
        name: event.currentTarget['full-name'].value,
        title: event.currentTarget['issue-title'].value,
        message: event.currentTarget.message.value,
      }),
    })
      .then(async (d) => {
        const response: ResponseOTW<Ticket> = await d.json();
        if (!d.ok || !response.success) throw {};
        setSuccess(true);
      })
      .catch((err) => {
        setError({
          didError: true,
          message: err.errorMessage || `An error occured: ${err}`,
        });
      });
  };

  return (
    <>
      <Head>
        <title>Create an Awesome Ticket</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1>Awesome Support Help Desk</h1>
        {error.didError ? <p>{error.message}</p> : null}
        {success && !error.didError ? (
          <p>Your ticket has been submitted!</p>
        ) : null}
        <form onSubmit={formSubmit}>
          <input
            required
            autoFocus
            type='email'
            name='email'
            aria-label='Please enter your email'
            placeholder='Please enter your email'
          />
          <input
            required
            type='text'
            name='full-name'
            aria-label='Please enter your full name'
            placeholder='Please enter your full name'
          />
          <input
            required
            type='text'
            name='issue-title'
            aria-label='Please enter the subject of your ticket.'
            placeholder='What is the problem?'
          />
          <textarea
            required
            name='message'
            aria-label='Please enter an in-depth description of your issue.'
            placeholder='Please describe your issue.'
            cols={23}
            rows={5}
          />
          <input type='submit' value='Submit' />
        </form>
      </main>
    </>
  );
}
