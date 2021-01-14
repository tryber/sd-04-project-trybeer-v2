const messageModel = require('../../modelsMongo/message');

const addMessage = async (req, res) => {
  try {
    const { nickname, message, chat } = req.body;
    const timestamp = new Date();
    const time = `${timestamp.getHours()}:${timestamp.getMinutes()}`;
    const newMessage = await messageModel.addMessage(nickname, time, message, timestamp, chat);
    return res.status(201).json(newMessage);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong!' });
  }
};

// teste de controller pro socket
const addMessagetest = async (msgData) => {
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

const getMessageByClient = async (req, res) => {
  try {
    console.log('req.bodyyyyyy', req.body);
    const { chat } = req.body;
    const message = await messageModel.getMessageByClient(chat);
    console.log('newmessageeeee', message);
    return res.status(201).json(message);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong!' });
  }
};

module.exports = { addMessage, addMessagetest, getMessageByClient };
