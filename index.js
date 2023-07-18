const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: Object.values(GatewayIntentBits).reduce((a, b) => a | b)
});

const { token } = require('./config.json');

client.on('ready', () => {
  console.log('ready');
})

client.on('messageCreate', async message => {
  if(message.author.bot) return;
  if(message.content === '!ping'){
    message.channel.send('pong');
  }
  if(message.content === '!pong'){
    message.channel.send('ping');
  }
  if (message.content === '!mese') {
        message.channel.send('yes か no を送信してください')
        const filter = msg => msg.author.id === message.author.id
        const collected = await message.channel.awaitMessages({ filter, max: 1, time: 10000 })
        const response = collected.first()
        if (!response) return message.channel.send('タイムアウト')
        if (!['yes', 'no'].includes(response.content)) return message.channel.send('正しくありません')
        message.channel.send(`${response.content} が送信されました`)
    }
})

client.login(token);