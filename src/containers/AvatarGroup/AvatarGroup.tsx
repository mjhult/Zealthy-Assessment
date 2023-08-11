import { FC } from 'react';
import styles from './AvatarGroup.module.scss';
import Avatar from '@/components/Avatar/Avatar';

const AvatarGroup: FC<{ participants: string[][] }> = ({ participants }) => (
  <div className={`${styles['avatar-group']}`}>
    {participants.map((participant) => {
      const [name, email] = participant;
      return (
        <div key={Math.random()} className={`${styles.participant}`}>
          <Avatar userName={name} />
          <h6>{name}</h6>
          <h6>{email}</h6>
        </div>
      );
    })}
  </div>
);

export default AvatarGroup;
