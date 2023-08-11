import { FC } from 'react';
import { Message } from '@/types/types';

import styles from './Message.module.scss';
import Avatar from '../Avatar/Avatar';

const Message: FC<{ message: Message }> = ({ message }) => {
  const { author, message: content } = message;
  return (
    <div className={`${styles.message}`}>
      <Avatar userName={author} />
      <p>{content}</p>
    </div>
  );
};

export default Message;
