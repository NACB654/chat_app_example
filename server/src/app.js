const express = require("express");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const bodyParser = require("body-parser");
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(bodyParser.json())
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}))
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

module.exports = app;