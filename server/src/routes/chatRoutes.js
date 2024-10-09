const express = require("express");
const router = express.Router();
const chatService = require("../services/chatService");

router.post("/", async (req, res) => {
  const { chat_name, is_group, participants } = req.body;

  try {
    const chat = await chatService.createChat(chat_name, is_group, participants);
    res.status(201).json(chat);
  }
  catch (err) {
    console.error('Error al crear el chat:', err);
    res.status(500).json({ error: 'Error al crear el chat' });
  }
});

module.exports = router;