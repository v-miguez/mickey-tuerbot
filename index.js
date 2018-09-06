const Telegraf = require('telegraf')
const express = require('express')
const expressApp = express()

const bot = new Telegraf("621360089:AAHlBMMYJpypwLmDEWeSehX1mj0xHEf4S2w")
expressApp.use(bot.webhookCallback('/secret-path'))
bot.telegram.setWebhook('https://bc151c44.ngrok.io')

expressApp.get('/', (req, res) => {
  res.send('Hello World!')
})

expressApp.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})