const client = require('../config/database');
const TimeUuid = require('cassandra-driver').types.TimeUuid;

exports.sendMessage = async (chatId, senderId, content) => {
    const messageId = TimeUuid.now();
    await client.execute('INSERT INTO chat_app.messages (chat_id, message_id, sender_id, content, sent_at) VALUES (?, ?, ?, ?, ?)', 
        [chatId, messageId, senderId, content, new Date()]);

    return messageId;
};

exports.getMessages = async (chatId) => {
    const result = await client.execute('SELECT * FROM chat_app.messages WHERE chat_id = ? ORDER BY sent_at DESC', [chatId]);
    return result.rows;
};
