const {Server} = require("socket.io");
const io = new Server(4000, {cors: {origin: "*"}});
const messagesJSON = require("./messages.json");

io.on("connection", (socket) => {


  setInterval(() => {

    const _messages = messagesJSON;

    const randomMessage = {
      ..._messages.messages[Math.floor(Math.random() * _messages.messages.length)],
      id: new Date().valueOf(),
      timestamp: new Date().toISOString()
    };
    socket.emit("newMessage", randomMessage);
  }, 3000);
});