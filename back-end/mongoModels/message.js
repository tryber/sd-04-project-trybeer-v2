const connectionMongo = require('../config/mongoDb');

// A chave 'chat' é a relação entre loja e cliente
/* const addMessage = async (nickname, time, message, timestamp, chat) => {
  const result = await connectionMongo()
    .then((db) => db.collection('messages').insertOne(
      { nickname, time, message, timestamp, chat }));
  return result.ops[0];
};

const getMessageByClient = async (chat) => {
  const result = await connectionMongo()
    .then((db) => db.collection('messages')
      .find({ chat })
      .sort({ timestamp: 1 })
      .toArray());
  return result;
}; */

const insertMessage = async (userEmail, time, finalMsg) => {
  const result = await connectionMongo()
    .then((db) => db.collection('messages').updateOne(
      { userEmail }, { $set: { lastMsg: time }, $push: { msgs: finalMsg } },
    ));
  return result;
};

const findHistoryByUser = async (userEmail) => {
  const result = await connectionMongo()
    .then((db) => db.collection('messages').findOne({ userEmail }, { projection: { _id: 0, userEmail: 1, msgs: 1 } }).toArray());
  return result;
};

const findUser = async (userEmail) => {
  const result = await connectionMongo()
    .then((db) => db.collection('messages').findOne({ userEmail }, { projection: { msgs: 0 } }));
  return result;
};

const findAllUsers = async () => {
  const result = await connectionMongo()
    .then((db) => db.collection('messages').find({}, { projection: { _id: 0, msgs: 0 } }).toArray());
  return result;
};

const insertUser = async (userEmail) => {
  const result = await connectionMongo()
    .then((db) => db.collection('messages').insertOne({
      userEmail, msgs: [], lastMsg: '',
    }));
  return result.ops[0];
};

module.exports = {
  insertMessage,
  insertUser,
  findHistoryByUser,
  findAllUsers,
  findUser,
};
