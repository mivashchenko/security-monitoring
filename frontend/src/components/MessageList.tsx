import { useMessagesStore } from "@/stores/useMessagesStore";

const MessageList = () => {
  const messages = useMessagesStore((state) => state.messages);

  return (
    <ul className="mt-4">
      {messages.map((msg) => (
        <li key={msg.id} className={`p-2 ${msg.flagged ? "bg-red-200" : "bg-gray-100"}`}>
          {msg.content}
        </li>
      ))}
    </ul>
  );
};

export default MessageList;