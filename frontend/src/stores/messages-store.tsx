import {createStore} from 'zustand/vanilla'
import {getMessages} from "@/actions/get-messages";

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
  messages: {
    data: Message[];
    loading: boolean;
    error: Error | null;
  };
  addMessage: (message: Message) => void;
  fetch: () => void;
}

export const defaultInitState: MessageState = {
  messages: {
    data: [],
    loading: false,
    error: null,
  },
  addMessage: () => {
  },
  fetch: () => {
  },
}

export const createMessagesStore = (
  initState: MessageState = defaultInitState,
) => createStore<MessageState>((set) => ({
  ...initState,
  addMessage: (message) => set((state) => ({
    messages: {
      data: [message, ...state.messages.data],
      loading: false,
      error: null,
    }
  })),
  fetch: async () => {
    set({messages: {data: [], loading: true, error: null}});
    const messages = await getMessages();

    if (messages.error) {
      set({messages: {data: [], loading: false, error: messages.error}});
      return;
    }

    set({
      messages: {data: messages.data, loading: false, error: null}
    });
  },
}));