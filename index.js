const Telegraf = require('telegraf')
const express = require('express')
const expressApp = express()

const bot = new Telegraf("621360089:AAHlBMMYJpypwLmDEWeSehX1mj0xHEf4S2w")
expressApp.use(bot.webhookCallback('/secret-path'))
bot.telegram.setWebhook('https://9154339f.ngrok.io/secret-path')

expressApp.get('/', (req, res) => {
  res.send('Hello World!')
})



expressApp.post('/secret-path', (req, res)=>{
	console.log('ruta secreta')
	res.send('hola')
})

bot.command('hola', (ctx)=>ctx.reply('¡Hola forastero!'))
bot.command('creators', (ctx)=>ctx.reply('Como veo que eres un humano curioso te contaré algo:\nEn lo más profundo de las alcantarillas se encuentra el reino de los Tres Ratones Ciegos, un lugar próspero con el mejor moho y restos de comida que uno podría imaginar.\n Allí, tres reyes cuidan del reino desde los muros inexpugnables de una caja de Aliexpress: Víctor el Sagaz, Luis el Certero e Inés la Elocuente. Ellos son mis señores y yo les sirvo con este ojo que lo ve todo.'))

// bot.command()

expressApp.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})

