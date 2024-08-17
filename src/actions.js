import {
    createRequire
} from 'module';
const require = createRequire(
    import.meta.url);
const cron = require('node-cron');
const http = require('http');

var remindFlag = false;
var livebonus;
var speed;
var shift;

/**
 * チャンネル名を「定型文＋入力された値」に変更する
 * @param {*} message 
 */
export const changeChannelName = (message) => {
    var channelName = process.env.NUMBER_ROOM_CHANNEL_NAME_TEMPLATE + message.content
    message.channel.setName(channelName)
}


/** 
 * リマインド ON/OFF
 * 
 */
export const sendRemindMessage = message => {
    if (livebonus == null) {
        livebonus = cron.schedule(process.env.LIVE_BONUS_REMIND_INTERVAL, function () {
            message.channel.send(`炊きどころ…ってコト!?`)
        }, false);
    }
    if (speed == null) {
        speed = cron.schedule(process.env.SPEED_REMIND_INTERVAL, function () {
            message.channel.send(`時速…お願いしマース!!`)
        }, false);
    }
    if (shift == null) {
        shift = cron.schedule(process.env.SHIFT_REMIND_INTERVAL, function () {
            message.channel.send(`交代の時間だよッ!!`)
            message.channel.send(`みんなッ…ありがとうッ!!`)
        }, false);
    }

    if (!remindFlag) {
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

// export const getWeather = message => {
//     const req = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=tokyo&lang=ja&units=metric&appid='+ process.env.WEATHER_API_KEY +'&exclude=current';

//     http.get(req, res => {
//             var body = '';
//             res.setEncoding('utf8');
//             res.on('data', (chunk) => {
//                 body += chunk;
//             });
//             res.on('end', () => {
//                 res = JSON.parse(body);
//                 console.log(res);
//             });
//         })
//         .on('error', e => {
//             console.error(e.message);
//         }
//     );
// }