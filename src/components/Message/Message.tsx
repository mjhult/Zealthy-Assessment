import { FC } from 'react';
import { Message } from '@/types/types';

import styles from './Message.module.css';

const Message: FC<{ message: Message }> = ({ message }) => {
  const { author, message: content, sentOn } = message;

  return (
    <div className={`${styles.message}`}>
      <h4>
        {author} @ {new Date(sentOn).toDateString()}
      </h4>
      <p>{content}</p>
    </div>
  );
};

export default Message;
