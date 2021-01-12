// const { ObjectId } = require('mongodb');
require('dotenv').config();
// const dayjs = require('dayjs');
const connection = require('./connection');

const getAllMessages = async () => {
  try {
    const db = await connection();
    console.log('inside getAllMessages db');
    const allMessages = await db.collection('messages').find({}).toArray();
    console.log('allMessages', allMessages);
    return allMessages;
  } catch (err) {
    console.log('Error', err);
  }
};

const storeMessage = async (payload) => {
  try {
    console.log('storeMessage', payload);
    // const dateToStore = dayjs(new Date()).format('DD-MM-YYYY hh:mm:ss');
    const { userId } = payload;
    const db = await connection();

    await db
      .collection('messages')
      .updateOne({ userId }, { $push: { messages: payload } }, { upsert: true });

    return 'message stored';
  } catch (err) {
    console.log('Error', err);
  }
};

module.exports = {
  getAllMessages,
  storeMessage,
};
