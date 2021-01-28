const connection = require('./connection');

const getMessages = async () => connection().then((db) => db.collection('messages').find()
  .toArray());

const saveMessage = async (timestamp, message, nickname) => {
  const msg = await connection().then((db) => {
    db.collection('messages').insertOne({ nickname, message, timestamp });
  });
  return msg;
};

module.exports = { getMessages, saveMessage };
