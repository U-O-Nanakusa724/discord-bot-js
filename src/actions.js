/**
 * チャンネル名を「定型文＋入力された値」に変更する
 * @param {*} message 
 */
export const changeChannelName = (message) => {
    var channelName = process.env.NUMBER_ROOM_CHANNEL_NAME_TEMPLATE + message.content
    message.channel.setName(channelName)
}
