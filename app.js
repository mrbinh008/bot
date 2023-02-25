require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const ChatGPTService = require("./services/chatgpt.service");
const express = require('express');
const bodyParser = require('body-parser');
const MessengerBot = require('messenger-bot');
//
const telegramToken = process.env.TELEGRAM_KEY;
const app = express();
app.use(bodyParser.json());

const bot_mess = new MessengerBot({
  accessToken: process.env.PAGE_ACCESS_TOKEN,
  verifyToken: process.env.VERIFY_TOKEN
});
// Khởi tạo con Bot từ Token với chế độ Polling
const bot_tele = new TelegramBot(telegramToken, { polling: true });

bot_tele.on("message", (msg) => {
  const chatId = msg.chat.id; // ID của cuộc trò chuyện hiện tại
  const chatMsg = msg.text; // Nội dung của tin nhắn đã nhận
  // Nhại lại nội dung tin nhắn
    ChatGPTService.generateCompletion(chatMsg).then((responseMsg) => {
      bot_tele.sendMessage(chatId, responseMsg);
    });
});

bot_mess.on('message', (payload, reply) => {
  const messageText = payload.message.text;

  if (messageText === '/hello') {
    reply({ text: 'Hello, World!' });
  }
});

app.use('/webhook', bot.middleware());

app.listen(3000, () => {
  console.log('Bot server is running on port 3000');
});

