import MessageList from "./MessageList";
// import SearchFilter from "./SearchFilter";
import { useWebSocket } from "../hooks/useWebSocket";

const Dashboard = () => {
  useWebSocket();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Security Monitoring Dashboard</h1>
      {/*<SearchFilter />*/}
      <MessageList />
    </div>
  );
};

export default Dashboard;