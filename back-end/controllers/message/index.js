const messageModel = require('../../mongoModels/message');

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

const addMessage = async (userEmail, message) => {
  try {
    const timestamp = new Date();
    const time = `${timestamp.getHours()}:${timestamp.getMinutes()}`;
    const finalMsg = { content: message, time, timestamp };
    const insertedMessage = await messageModel.insertMessage(userEmail, time, finalMsg);
    return insertedMessage;
  } catch (error) {
    return { message: 'Something goes wrong! addMessage' };
  }
};

const addUser = async (userEmail) => {
  try {
    // const { userEmail } = req.body;
    console.log(userEmail);
    const user = await messageModel.findUser(userEmail);
    console.log('addUser, user: ', user);
    // if (user.length !== 0) return res.status(201).end();
    // if (user.length !== 0) return 'Já tem usuário';
    if (user) return 'Já tem usuário';
    const newUser = await messageModel.insertUser(userEmail);
    // return res.status(201).json(newUser);
    return newUser;
  } catch (error) {
    // return res.status(500).json({ message: 'Something goes wrong! addUser' });
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
