import {useEffect, useRef} from "react";
import { io } from "socket.io-client";
import { analyzeMessage } from "@/lib/profanityFilter";
import {useMessagesStore} from "@/providers/messages-store-provider";
import {Message} from "@/stores/messages-store";

const SOCKET_URL = "ws://localhost:4000";

export const useWebSocket = () => {
  const addMessage = useMessagesStore((state) => state.addMessage);
  const messages = useMessagesStore((state) => state.messages);
  const messagesRef = useRef<Message[]>([]); // Ref to store the latest messages

  // Keep ref updated whenever store updates
  useEffect(() => {
    messagesRef.current = messages;
  }, [addMessage]);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on("newMessage", (message) => {

      const flagged = analyzeMessage(message.content);
      const newMessage = { ...message, flagged };

      // Use the latest messages from messagesRef
      const updatedMessages = [...messagesRef.current, newMessage];

      // Update the store
      addMessage(newMessage);

      // Update the ref to prevent stale state
      messagesRef.current = updatedMessages;
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};