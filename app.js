require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const ChatGPTService = require("./services/chatgpt.service");
//
const telegramToken = process.env.TELEGRAM_KEY;
// Khởi tạo con Bot từ Token với chế độ Polling
const bot = new TelegramBot(telegramToken, { polling: true });

bot.onText(/\/c/, (msg) => {
  const chatId = msg.chat.id; // ID của cuộc trò chuyện hiện tại
  const chatMsg = msg.text; // Nội dung của tin nhắn đã nhận
  // Nhại lại nội dung tin nhắn
    ChatGPTService.generateCompletion(chatMsg).then((responseMsg) => {
      bot.sendMessage(chatId, responseMsg);
    });
});

bot.onText(/\/i/, (msg) => {
  const chatId = msg.chat.id; // ID của cuộc trò chuyện hiện tại
  const chatMsg = msg.text; // Nội dung của tin nhắn đã nhận
  // Nhại lại nội dung tin nhắn
  ChatGPTService.generateImage(chatMsg).then((responseMsg) => {
    bot.sendMessage(chatId, responseMsg);
  });
});
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Xin chào! Đây là bot của tôi.');
});


