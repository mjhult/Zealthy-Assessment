import { FC } from 'react';
import { useRouter } from 'next/router';
import { Ticket as TicketType } from '@/types/types';

import styles from './Ticket.module.scss';

const Ticket: FC<{
  id: TicketType['id'];
  title: TicketType['title'];
  status: TicketType['status'];
}> = ({ id, title, status }) => {
  const router = useRouter();
  return (
    <div
      className={`${styles.ticket}`}
      onClick={() => router.push(`/tickets/${id}`)}>
      <h1>{title}</h1>
      <h2>{status}</h2>
    </div>
  );
};

export default Ticket;
