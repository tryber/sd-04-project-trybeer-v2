const getTime = (date) => `${date.getHours()}:${(`0${date.getMinutes()}`).slice(-2)}`;

const createMessage = (message, sender) => ({
  time: getTime(new Date(Date.now())),
  message,
  sender,
});

const createPrivateChat = ({ name, messages = [], users = [] }) => (
  {
    name,
    messages,
    users,
  }
);

module.exports = {
  createMessage,
  createPrivateChat,
};
