const express = require("express");
const router = express.Router()
const messageService = require("../services/messageService");

router.post("/", async (req, res) => {
  console.log(req.body);
  const { chatId, sender, content } = req.body;

  try {
    const message = await messageService.sendMessage(chatId, sender, content);
    res.status(201).json(message);
  }
  catch (err) {
    console.error("Error al guardar mensaje", err);
    res.status(500).json({ error: "Error" });
  }
});

router.get("/:chatId", async (req, res) => {
  const chatId = req.params;

  try {
    const messages = await messageService.getMessages(chatId);
    res.status(201).json(messages);
  }
  catch (err) {
    console.error("Error al obtener mensajes", err);
    res.status(500).json({ error: "Error" });
  }
});

module.exports = router;
