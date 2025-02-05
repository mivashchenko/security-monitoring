import { createStore } from 'zustand/vanilla'
import {getMessages} from "@/actions/getMessages";

export type Message = {
  id: number;
  content: string;
  flagged: boolean;
  email: string;
  severity: string;
  timestamp: string;
  user: string;
  violationType: string;
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
    set({messages: await getMessages()});
  },
}));