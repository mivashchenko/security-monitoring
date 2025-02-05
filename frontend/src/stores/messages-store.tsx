import { createStore } from 'zustand/vanilla'

export type Message = {
  id: number;
  content: string;
  flagged: boolean;
  email: string;
  severity: string;
  timestamp: string;
  user: string;
}

export type MessageState = {
  messages: Message[];
  addMessage: (message: Message) => void;
  fetch: () => void;
}

export const defaultInitState: MessageState = {
  messages: [],
  addMessage: () => {
  },
  fetch: () => {
  },
}

export const createMessagesStore = (
  initState: MessageState = defaultInitState,
) => createStore<MessageState>((set) => ({
  ...initState,
  addMessage: (message) => set((state) => ({messages: [message, ...state.messages]})),
  fetch: async () => {
    const response = await fetch('http://localhost:4001/messages?_sort=timestamp&_order=desc&_limit=100')
    set({messages: await response.json()})
  },
}));