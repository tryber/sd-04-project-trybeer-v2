const messageModel = require('../../models/message');

/* const addMessage = async (msgData) => {
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
}; */

const addMessage = async (userEmail, msg) => {
  try {
    const time = new Date();
    const timestamp = `${time.getHours()}:${time.getMinutes()}`;
    const finalMsg = { content: msg, timestamp };
    const message = await messageModel.insertMessage(userEmail, timestamp, finalMsg);
    return message;
  } catch (error) {
    return { message: 'Something goes wrong!' };
  }
};

const addUser = async (req, res) => {
  try {
    const { userEmail } = req.body;
    const user = await messageModel.findUser(userEmail);
    if (user.length !== 0) return res.status(201).end();
    const newUser = await messageModel.insertUser(userEmail);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong!' });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const users = await messageModel.findAllUsers();
    return res.status(201).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong!' });
  }
};

const getHistoryByUser = async (userEmail) => {
  try {
    const history = await messageModel.findHistoryByUser(userEmail);
    return history;
  } catch (error) {
    return { message: 'Something goes wrong!' };
  }
};

module.exports = { addMessage, addUser, getAllUsers, getHistoryByUser };
