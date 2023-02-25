const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
class ChatGPTService {
  rolePlayIntroduction =
    "Trong vai một chatbot chuyên gia với tên là Bot ngáo, " +
      "nhiệm vụ chính của bạn là tâm sự với người dùng như một " +
      "người am hiểu tất cả mọi thứ.";
  async generateCompletion(prompt) {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_KEY,
    });
    const openai = new OpenAIApi(configuration);
    let fullPrompt = this.rolePlayIntroduction + "\n\n";
    fullPrompt += `Người dùng: ${prompt}\n`;
    fullPrompt += `Bot ngáo: `;

    // Gửi request về OpenAI Platform để tạo text completion
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: fullPrompt,
      temperature: 0.7,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    const responseMessage = completion.data.choices[0].text.replace(
      /^\s+|\s+$/g,
      ""
    );
    return responseMessage;
  }
}

module.exports = new ChatGPTService();
