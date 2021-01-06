const connection = require('./connection');

const addNew = async (nickname, msg) => {
  const db = await connection();
  await db
    .collection('messages')
    .updateOne({ nickname }, { $push: { messages: msg } }, { upsert: true });
};

const getByNickname = async (nickname) =>
  connection().then((db) => db.collection('messages').findOne({ nickname }));

const getAll = async () =>
  connection().then((db) => db.collection('messages').find({}).toArray());

module.exports = { addNew, getAll, getByNickname };
