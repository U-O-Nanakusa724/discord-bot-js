/**
 * チャンネル名を「定型文＋入力された値」に変更する
 * @param {*} message 
 */
export const changeChannelName = (message) => {
    var channelName = process.env.NUMBER_ROOM_CHANNEL_NAME_TEMPLATE + message.content
    message.channel.setName(channelName)
}

/** 
 * リマインド ON
 * 1.毎時0,15,30,45分に炊きリマインド
 * 2.毎時0,30分に時速リマインド
 * 3.毎時55分に交代アナウンス
 */
export const sendRemindMessage = () => {
    console.log("リマインド")
}