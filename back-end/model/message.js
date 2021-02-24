const connection = require('./connection');

const getMessages = async (email) => connection().then((db) => db.collection('messages').find({ room: email })
  .toArray());

const saveMessage = async ({ timestamp, message, nickname, room }) => {
  const msg = await connection().then((db) => {
    db.collection('messages').insertOne({ nickname, message, timestamp, room });
  });
  return msg;
};

const getAllMessages = async () => connection().then((db) => db.collection('messages').find()
  .toArray());

module.exports = { getMessages, saveMessage, getAllMessages };
