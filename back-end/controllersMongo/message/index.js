const messageModel = require('../../modelsMongo/message');

const addMessage = async (req, res) => {
  try {
    const { nickname, message, chat } = req.body;
    const timestamp = new Date();
    const time = `${timestamp.getHours()}:${timestamp.getMinutes()}`;
    const newMessage = await messageModel.addMessage({ nickname, time, message, timestamp, chat });
    return res.status(201).json({ newMessage });
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong!' });
  }
};

const getMessageByClient = async (req, res) => {
  try {
    const { chat } = req.body;
    const message = await messageModel.getMessageByClient({ chat });
    return res.status(201).json({ message });
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong!' });
  }
};

module.exports = { addMessage, getMessageByClient };
