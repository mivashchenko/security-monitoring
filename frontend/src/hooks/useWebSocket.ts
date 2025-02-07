import {useEffect, useRef} from "react";
import {io, Socket} from "socket.io-client";
import {useMessagesStore} from "@/providers/messages-store-provider";
import {Message} from "@/stores/messages-store";

const SOCKET_URL = `wss://vast-retreat-05206-d317ca74ea03.herokuapp.com`;
// const SOCKET_URL = `ws://localhost:4000`;
let socket: Socket | null = null;


export const useWebSocket = () => {
  const addMessage = useMessagesStore((state) => state.addMessage);
  const messagesRef = useRef<Message[]>([]);

  useEffect(() => {
    if (!socket) {
      socket = io(SOCKET_URL);

      socket.on("newMessage", (message) => {
        console.log("New message received", message);
        const flagged = true;
        const newMessage = { ...message, flagged };

        addMessage(newMessage);
        messagesRef.current = [...messagesRef.current, newMessage];
      });

      console.log("WebSocket connection established");
    }

    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
        console.log("WebSocket connection closed");
      }
    };
  }, [addMessage]);
};