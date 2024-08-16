import { createRequire } from 'module';
import * as Mentions from './src/mentions.js';
import * as Actions from './src/actions.js';
const require = createRequire(import.meta.url);
const {
  Client,
  GatewayIntentBits
} = require("discord.js");
const client = new Client({
  intents: Object.values(GatewayIntentBits).reduce((a, b) => a | b)
});

require('dotenv').config();
if (typeof process.env.TOKEN == 'undefined') {
  console.error('環境ファイルが見つからないよッ!');
  console.error('envファイル…見直してみてッ!');
  process.exit(1);
}

client.on('ready', () => {
  console.log('準備ッ…できたよッ！');
})

client.on('messageCreate', async message => {
  // メッセージ送信者がBotだった場合は何もしない
  if (message.author.bot) return;

  // 部屋番号チャンネルに投稿があった場合の処理
  if (message.channelId === process.env.NUMBER_ROOM_CHANNEL_ID) {
    Actions.changeChannelName(message)
  }

  // メンションされた場合の処理
  if (message.mentions.users.has(process.env.USER_ID)) {
      Mentions.replyBot(message)
  }
})

client.login(process.env.TOKEN);
