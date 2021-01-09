const { getAllMessages } = require('../mongoModel/messageModel');

const getAllMessagesController = async (_req, res) => {
  try {
    const foundChats = await getAllMessages();

    console.log(foundChats);
    if (!foundChats.length > 0) {
      return res.status(404).json({ message: 'Nenhuma conversa por aqui' });
    }

    return res.status(200).json(foundChats);
  } catch (err) {
    console.error('getAllProductControllers', err.message);
    return res.status(500).json({ message: 'Error fetching' });
  }
};

module.exports = { getAllMessagesController };
