const connectionMongo = require('../config/mongoDb');

const insertMessage = async (userEmail, time, finalMsg) => {
  const result = await connectionMongo()
    .then((db) => db.collection('messages').updateOne(
      { userEmail }, { $set: { lastMsg: time }, $push: { msgs: finalMsg } },
    ));
  return result;
};

const findHistoryByUser = async (userEmail) => {
  const result = await connectionMongo()
    .then((db) => db.collection('messages').findOne({ userEmail }, { projection: { _id: 1, userEmail: 1, msgs: 1 } }));
  return result;
};

const findUser = async (userEmail) => {
  const result = await connectionMongo()
    .then((db) => db.collection('messages').findOne({ userEmail }, { projection: { msgs: 0 } }));
  return result;
};

const findAllUsers = async () => {
  const result = await connectionMongo()
    .then((db) => db.collection('messages').find({}, { projection: { msgs: 0 } }).toArray());
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
