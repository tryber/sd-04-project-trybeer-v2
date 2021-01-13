const connectionMongo = require('../config/mongoDb');

// A chave 'chat' é a relação entre loja e cliente
const addMessage = async (nickname, time, message, timestamp, chat) => {
  const result = await connectionMongo()
    .then((db) => db.collection('Messages').insertOne({ nickname, time, message, timestamp, chat }));
  return result.ops[0];
};

const getMessageByClient = async (chat) => {
  const result = await connectionMongo()
    .then((db) => db.collection('Messages')
      .find({ chat })
      .sort({ timestamp: -1 })
      .toArray());
  return result;
};

module.exports = { addMessage, getMessageByClient };
