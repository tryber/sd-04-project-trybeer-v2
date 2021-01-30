const mongoConnection = require('./mongoConnection');

const registerData = (data, date) => {
  mongoConnection().then((db) => {
    db.collection('messages').insertOne({
      nickname: data.nickname,
      chatMessage: data.chatMessage,
      date,
    });
  });
};

const registeredHistoric = async () =>
  mongoConnection().then((db) => db.collection('messages').find().toArray());

module.exports = {
  registerData,
  registeredHistoric,
};
