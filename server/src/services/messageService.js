const client = require('../config/database');
const TimeUuid = require('cassandra-driver').types.TimeUuid;

exports.sendMessage = async (chatId, sender, content) => {
    const messageId = TimeUuid.now();
    await client.execute('INSERT INTO chat_app.message_by_chat (chat_id, message_id, sender, content, sent_at) VALUES (?, ?, ?, ?, ?)', 
        [chatId, messageId, sender, content, new Date()]);

    return messageId;
};

exports.getMessages = async (chatId) => {
    const result = await client.execute('SELECT * FROM chat_app.message WHERE chat_id = ? ORDER BY sent_at DESC', [chatId]);
    return result.rows;
};
