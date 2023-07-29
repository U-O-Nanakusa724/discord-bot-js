import { createRequire } from 'module';
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
    changeChannelName(message)
  }

  // メンションされた場合の処理
  if (message.mentions.users.has(process.env.USER_ID)) {
    replyBot(message)
  }
})

client.login(process.env.TOKEN);

/**
 * メンションを受け取ったらリアクションする
 * @param {*} message 
 */
async function replyBot(message) {

  // 特定の文言がメンションと一緒に送られた場合
  if (message.content.includes("こんにちは")) {
    message.channel.send("こんにちはッ！");
  } else if (message.content.includes("ハチワレ")) {
    message.channel.send("なになに!?");
  } else if (message.content.includes("ちいかわ")) {
    message.channel.send("フ!!");
  } else if (message.content.includes("うさぎ")) {
    message.channel.send("ヤハーッ!!");
  } else {
    // メンションのみだった場合ランダムメッセージを返す
    var rand = Math.floor(Math.random() * 11);
    switch (rand) {
      case 0:
        msg = "わァ〜…";
        break;
      case 1:
        msg = "喜びがない〜…";
        break;
      case 2:
        msg = "なんとかなれーーっ";
        break;
      case 3:
        msg = "視界がモノクロになる〜…";
        break;
      case 4:
        msg = "今度はギリギリ攻めるね!!";
        break;
      case 5:
        msg = "ハァ？";
        break;
      case 6:
        msg = "帰ってさァチャリメラ食べよッ";
        break;
      case 7:
        msg = "サイコーじゃない？";
        break;
      case 8:
        msg = "なんでェ？";
        break;
      case 9:
        msg = "なまァ〜…がわ〜…き〜〜";
        break;
      default:
        msg = "イヤッ！イヤ！イヤ！！！";
        break;
    }
    message.channel.send(msg);
  }

  // 会話できるロジックサンプル
  // if (message.content === '!mese') {
  //   message.channel.send('yes か no を送信してください')
  //   const filter = msg => msg.author.id === message.author.id
  //   const collected = await message.channel.awaitMessages({
  //     filter,
  //     max: 1,
  //     time: 10000
  //   })
  //   const response = collected.first()
  //   if (!response) return message.channel.send('タイムアウト')
  //   if (!['yes', 'no'].includes(response.content)) return message.channel.send('正しくありません')
  //   message.channel.send(`${response.content} が送信されました`)
  // }


}

/**
 * チャンネル名を「定型文＋入力された値」に変更する
 * @param {*} message 
 */
async function changeChannelName(message) {
  var channelName = process.env.NUMBER_ROOM_CHANNEL_NAME_TEMPLATE + message.content
  message.channel.setName(channelName)
}