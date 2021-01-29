const connection = require('./connection');

const getRoom = async (roomRef) => connection().then((db) => db.collection('rooms').find({ roomRef })
  .toArray());

const createRoom = async (roomRef) => {
  const room = await connection().then((db) => {
    db.collection('rooms').insertOne({ roomRef });
  });
  return room;
};

module.exports = { createRoom, getRoom };
