const messageModel = require('../../modelsMongo/message');

const addMessage = async (msgData) => {
  try {
    const { nickname, message, chat } = msgData;
    const timestamp = new Date();
    const time = `${timestamp.getHours()}:${timestamp.getMinutes()}`;
    const newMessage = await messageModel.addMessage(nickname, time, message, timestamp, chat);
    return newMessage;
  } catch (error) {
    return { message: 'Something goes wrong!' };
  }
};
const getMessageByClient = async (chat) => {
  try {
    const message = await messageModel.getMessageByClient(chat);
    // console.log('newmessageeeee', message);
    return message;
  } catch (error) {
    return { message: 'Something goes wrong!' };
  }
};

module.exports = { addMessage, getMessageByClient };
