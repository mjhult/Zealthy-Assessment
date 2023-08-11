import { FC } from 'react';
import styles from './Avatar.module.scss';

const Avatar: FC<{ userName: string }> = ({ userName }) => {
  // This is converting "Firstname Lastname <email@domain.com>" to "FL"
  // It could likely be made more readable.
  const fullName = userName.split(' <')[0];
  const [firstName, lastName] = fullName.split(' ');
  const avatarLetters = `${firstName[0]}${
    lastName ? lastName[0] : ''
  }`.toUpperCase();

  return (
    <div
      className={`${styles.avatar}`}
      // I had grand plans of making this a fun and unique color for each person that responded to a ticket.
      // Then I realized there will only be two people per ticket.
      style={{ backgroundColor: fullName === 'admin' ? '#6F74D8' : undefined }}>
      <p>{avatarLetters}</p>
    </div>
  );
};

export default Avatar;
