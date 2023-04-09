import mysql from "mysql";
import express from "express";
import http from "http";
import cors from "cors";
import router from "./routes/routes.js";
import { Server } from "socket.io";
import ChatMessages from "./models/chat.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.append("Access-Control-Allow-Headers", "*");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/", router);

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "languagechat",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database");
});

io.on("connection", (socket) => {
  socket.on("join private chat", (privateChatRoomId) => {
    socket.join(privateChatRoomId);
    console.log("A user connected to private chatroom",  privateChatRoomId);
  });

  socket.on("private chat message", async (privateChatRoomId, data) => {
    try {
      const { sender, message, senderId, receiverId } = data;
      const chatMessage = await ChatMessages.create({
        conversationId: privateChatRoomId,
        sender,
        message,
        senderId,
        receiverId,
      });

      console.log(privateChatRoomId);
      socket.to(privateChatRoomId).emit("private chat message", data);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("typing", (privateChatRoomId, user) => {
    socket.to(privateChatRoomId).emit("typing", user);
  });

  socket.on("stopTyping", (privateChatRoomId) => {
    socket.to(privateChatRoomId).emit("stopTyping");
  });
});
 