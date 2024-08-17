import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import * as Actions from './actions.js';

/**
 * メンションを受け取ったらリアクションする
 * @param {*} message 
 */
export const replyBot = (message) => {
    // 特定の文言がメンションと一緒に送られた場合
    // 「リマインド」を含む場合、リマインドON/OFF処理を実行
    if (message.content.includes("リマインド")) {
        Actions.sendRemindMessage(message);
    } else if (message.content.includes("こんにちは")) {
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
        var msg;
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