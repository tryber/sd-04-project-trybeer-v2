const connection = require('./connection');

const getByNickname = async (nickname) =>
  connection().then((db) => db.collection('messages').findOne({ nickname }));

const getAll = async () =>
  connection().then((db) => db.collection('messages').find({}).toArray());

const addNew = async (nickname, msg) => {
  const db = await connection();
  await db
    .collection('messages')
    .updateOne({ nickname }, { $push: { messages: msg } }, { upsert: true });
  return getAll();
};

module.exports = { addNew, getAll, getByNickname };
