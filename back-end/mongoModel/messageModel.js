const connection = require('./mongoConnection');

const insertMessages = async (roomId, message, email, timestamp) => {
  const db = await connection();
  const result = await db.collection('messages').insertOne({ roomId, message, email, timestamp });
  return result.ops[0];
};

const getAllMessages = async () => {
  const db = await connection();
  return db.collection('messages').find().toArray();
};

const getMessagesByRoom = async (roomId) => {
  const db = await connection();
  const result = await db.collection('messages').find({ roomId }).toArray();
  return result.ops[0];
};

module.exports = {
  insertMessages,
  getAllMessages,
  getMessagesByRoom,
};
