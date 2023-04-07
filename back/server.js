import mysql from "mysql";
import express from "express";
import http from "http";
import cors from "cors";
import router from "./routes/routes.js";
import { Server } from "socket.io";
import ChatMessages from "./models/chat.js";

//server
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
// io.origins((origin, callback) => {
//   if (origin !== "https://foo.example.com") {
//     return callback("origin not allowed", false);
//   }
//   callback(null, true);
// });





//CORS
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.append("Access-Control-Allow-Headers", "*");
  next();
});

// const PORT=process.env.PORT || 5000
// const server=app.listen(PORT,()=>{
//     console.log("Server running on port 5000")
// })

// app.get('/api', (req, res) => {
//   res.json({
//     message: 'Hello world',
//   });
// });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/", router);
// app.use(bodyParser.json({ limit: '1mb' }));
// app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

// const httpServer = createServer(server);
// const io = new Server(server, { cors: { origin: 'http://localhost:5000' } });

//baza
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
  // console.log("A user connected!");
  // Listen for incoming requests to join a private chat room
  socket.on("join private chat", (privateChatRoomId) => {
    // Check if the user is authorized to join the private chat room

    // Join the user to the private chat room
    socket.join(privateChatRoomId);
    console.log("A user connected! to private");
  });
  // Listen for incoming private chat messages
  // socket.on("private chat message", (privateChatRoomId, message) => {
  //   // Broadcast the message to the two users in the private chat room
  //   console.log(`Received message in room ${privateChatRoomId}: ${message.message}`);

  //   socket.to(privateChatRoomId).emit("private chat message", message);
  // });
  socket.on("private chat message", async (privateChatRoomId,data) => {
    try {
      const {  sender, message,senderId,receiverId } = data;
      const chatMessage = await ChatMessages.create({
        conversationId: privateChatRoomId,
        sender,
        message,
        senderId,
        receiverId,
      });
      console.log("Message saved to database:", chatMessage);


      console.log(privateChatRoomId)
      socket.to(privateChatRoomId).emit("private chat message", data);
    } catch (error) {
      console.error(error);
    }

  

  });









  socket.on("typing", (privateChatRoomId,user) => {
    socket.to(privateChatRoomId).emit("typing",user);
  });

  socket.on("stopTyping", (privateChatRoomId) => {
    socket.to(privateChatRoomId).emit("stopTyping");
  });
});
// server.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });
