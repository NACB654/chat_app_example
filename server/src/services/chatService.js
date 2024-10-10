const client = require("../config/database");
const Uuid = require('cassandra-driver').types.Uuid;

exports.createChat = async (chat_name, is_group, participants) => {
    const chatId = Uuid.random();
    await client.execute('INSERT INTO chat_app.chats (chat_id, chat_name, is_group, created_at) VALUES (?, ?, ?, ?)', 
        [chatId, chat_name, is_group, new Date()]);

    // for (let userId of participants) {
    //     await client.execute('INSERT INTO chat_app.participants (chat_id, user_id) VALUES (?, ?)', [chatId, userId]);
    // }

    return chatId;
};
