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
const cron = require('node-cron');

var remindFlag = false;
var livebonus;
var speed;
var shift;

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
    // 「リマインド」を含む場合、リマインドON/OFF処理を実行
    if (message.content.includes("リマインド")) {
      sendRemindMessage(message);
    } else {
      Mentions.replyBot(message)
    }
  }
})

client.login(process.env.TOKEN);

/** 
 * リマインド ON/OFF
 * 
 */
function sendRemindMessage(message) {
  if (livebonus == null) {
    livebonus = cron.schedule(process.env.LIVE_BONUS_REMIND_INTERVAL, function () {
      message.channel.send(`炊きどころ…ってコト!?`)
    }, false);
  }
  if (speed == null) {
    speed = cron.schedule(process.env.SPEED_REMIND_INTERVAL, function () {
      message.channel.send(`時速…１枚でもいいのがあればさッイイよねッ!!`)
    }, false);
  }
  if (shift == null) {
    shift = cron.schedule(process.env.SHIFT_REMIND_INTERVAL, function () {
      message.channel.send(`交代の時間だよッ!!`)
      message.channel.send(`みんなッ…ありがとうッ!!`)
    }, false);
  }

  if(!remindFlag) {
    message.channel.send(`始めるよッ…リマインドッ!!`)
    remindFlag = true;
    livebonus.start();
    speed.start();
    shift.start();
  } else {
    message.channel.send(`終わるねッ…リマインドッ!!`)
    remindFlag = false;
    livebonus.stop();
    speed.stop();
    shift.stop();
  }
}
