const Mongo = require('../services/mongoService');

const listChats = async (_req, res) => {
  const chats = await Mongo.getAll();
  res.status(200).json(chats);
};

module.exports = { listChats };
