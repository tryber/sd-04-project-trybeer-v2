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

const findAndSort = async() =>{
  const mySort = {nickname: 1, date: -1}
  return mongoConnection().then((db) => db.collection('messages').find().sort(mySort).toArray())
}


const registeredHistoric = async () =>
  mongoConnection().then((db) => db.collection('messages').find().toArray());

module.exports = {
  registerData,
  registeredHistoric,
  findAndSort
};
