import { GenericGroup, Message } from '@/types/types';

export const groupMessagesByDate = (messages: Message[]) =>
  messages.reduce((acc, message) => {
    const date = new Date(message.sentOn).toDateString();

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(message);
    return acc;
  }, {} as GenericGroup<Message[]>);

export const getTicketParticipants = (messages: Message[]) =>
  Object.entries(
    messages.reduce((acc, message) => {
      const [name, email] = message.author.split(' <');
      acc[name] = email.slice(0, -1);
      return acc;
    }, {} as GenericGroup<string>)
  );
