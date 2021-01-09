const express = require('express');
const { getAllMessagesController } = require('../controllers/chatController');

const chatRouter = express.Router();

chatRouter.get('/', getAllMessagesController);

module.exports = chatRouter;
