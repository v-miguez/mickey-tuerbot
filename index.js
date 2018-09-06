const Telegraf = require('telegraf');
const bot = new Telegraf(621360089:AAHlBMMYJpypwLmDEWeSehX1mj0xHEf4S2w);
bot.start((message) => {
  console.log('started:', message.from.id)
  return message.reply('Hello my friend, write anything to start search!!');
})
app.startPolling();