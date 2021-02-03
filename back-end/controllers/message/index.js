const messageModel = require('../../mongoModels/message');

const addMessage = async (userEmail, message, nick) => {
  try {
    const timestamp = new Date();
    const time = `${timestamp.getHours()}:${timestamp.getMinutes()}`;
    const finalMsg = { nick, content: message, time, timestamp };
    const insertedMessage = await messageModel.insertMessage(userEmail, time, finalMsg);
    return insertedMessage;
  } catch (error) {
    return { message: 'Something goes wrong! addMessage' };
  }
};

const addUser = async (userEmail) => {
  try {
    const user = await messageModel.findUser(userEmail);
    if (user) return 'Já tem usuário';
    const newUser = await messageModel.insertUser(userEmail);
    return newUser;
  } catch (error) {
    return { message: 'Something goes wrong! addUser', Err: error };
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
    return { message: 'Something goes wrong! getHistoryUser', Err: error };
  }
};

module.exports = { addMessage, addUser, getAllUsers, getHistoryByUser };
