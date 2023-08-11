import Message from '@/components/Message/Message';
import { Message as MessageType } from '@/types/types';
import { FC } from 'react';

import styles from './MessageGroup.module.scss';

const MessageGroup: FC<{ date: string; messages: MessageType[] }> = ({
  date,
  messages,
}) => (
  <div className={`${styles['message-group']}`}>
    <h5>{date}</h5>
    {messages.map((message) => (
      <Message key={message.id} message={message} />
    ))}
  </div>
);

export default MessageGroup;
