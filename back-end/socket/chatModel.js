const { ObjectId } = require('mongodb');
const format = require('date-format');
const connection = require('./connection');

// método para buscar as mensagens no banco

const getMessages = async () => {
  const messages = await connection().then((db) => db.collection('messages').find({}).toArray());

  const messagesWithDate = messages.map((msg) => {
    const { _id: id } = msg;

    const isoDate = new Date(ObjectId(id).getTimestamp());

    const date = format.asString('dd-MM-yyyy hh:mm:ss', isoDate);

    return { ...msg, date };
  });

  return messagesWithDate;
};

// método para salvar uma mensagem no banco

const saveMessage = async (chatMessage, nickname) => {
  const result = await connection().then((db) =>
    db.collection('messages').insertOne({ chatMessage, nickname }));

  const { _id: id } = result;

  const isoDate = new Date(ObjectId(id).getTimestamp());

  const date = format.asString('dd-MM-yyyy hh:mm:ss', isoDate);

  return { ...result.ops[0], date };
};

module.exports = { getMessages, saveMessage };
