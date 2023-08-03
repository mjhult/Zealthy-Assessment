export type Message = {
  id: number;
  sentOn: Date;
  message: string;
  author: string;
  ticketId: number;
};

export type Ticket = {
  id: number;
  title: string;
  author: string;
  status: 'new' | 'in-progress' | 'resolved';
  messages: Message[];
};

export type ResponseOTW<T> = {
  success: boolean;
  errorMessage?: string;
  data?: T;
};

export type ErrorState = {
  didError: boolean | null;
  message: string;
};
