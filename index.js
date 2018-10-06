const Telegraf = require('telegraf')
const express = require('express')
const expressApp = express()
const https = require('https')
var request = require('sync-request');
const nlu = require('./nlu')
const dialog = require('./dialog')

const bot = new Telegraf("574532789:AAEOQ7xF6WmOp08kKfkMxt44v-kPLqV563Y")
expressApp.use(bot.webhookCallback('/secret-path'))
bot.telegram.setWebhook('https://61f654cb.ngrok.io/secret-path')

expressApp.get('/', (req, res) => {
	res.send('Hello World!')
})


expressApp.post('/secret-path', (req, res)=>{
	console.log('ruta secreta')
	res.send('hola')
})

bot.command('hola', (ctx)=>ctx.reply('¡Hola forastero!'))

bot.command('creadores', (ctx)=>ctx.reply('Como veo que eres un humano curioso te contaré algo:\nEn lo más profundo de las alcantarillas se encuentra el reino de los Tres Ratones Ciegos, un lugar próspero con el mejor moho y restos de comida que uno podría imaginar.\n Allí, tres reyes cuidan del reino desde los muros inexpugnables de una caja de Aliexpress: Víctor el Sagaz, Luis el Certero e Inés la Elocuente. Ellos son mis señores y yo les sirvo con este ojo que lo ve todo.'))

bot.command('pizza', (ctx)=>ctx.reply('A mi amigo el Maestro Astilla le hará ilusión conseguir una pizza para sus cuatro tortugas ninjas.'))

bot.command('novi@', (ctx)=>ctx.reply('¡No gracias! Prefiero seguir con mi vida en las alcantarillas que juntarme con humanos entrometidos'))

bot.command('chiste', (ctx) => {
	let random = Math.round(Math.random()*10);
	console.log(random)
	if(random < 3){
		ctx.reply('Iban dos ratones de campo (un poco paletos) caminando por una carretera, cuando uno de ellos se encuentra una china de hachís.\nEl ratón, muy envalentonado, decide comérsela, mientras su amigo le mira con mala cara.\nAl rato el ratón empieza a flipar un poco y a creerse un Super Ratón. Y justo en aquel momento a lo lejos aparece un camión por la carretera.\nEl Super Ratón le dice a su amigo que lo va a parar con una sola pata, y entonces su amigo empieza a decirle que deje de hacer el gañan porque le va a espachurar el camión.\nEl Super Ratón no le hace caso y se planta en medio de la carretera a la espera de que llegue el camión.\nCuando el camión esta a 300 metros, pincha una rueda y va freanado poco a poco, hasta detenerse justo delante de donde el Super Ratón lo espera.\nEl camionero se baja, mira a su alrededor y dice: ¡Voy a sacar el gato!\nA lo que Super Ratón contesta: ¡¡Como te pongas tonto te vuelco el camión!')
	}else if(random >= 3 && random < 6){
		ctx.reply('¿Qué hace una rata con metralleta? -Ratatatatata')
	}else{
		ctx.reply('¿Por qué los elefantes no chatean?\n-Porque les dan miedo los ratones')
	}
})

bot.command('edad', (ctx)=>ctx.reply('Soy de la quinta de David el Gnomo, tengo unos 300 años más o menos.'))

bot.command('tiempo',(ctx)=>{
	let direccion = ctx.message.text	
	let pos = direccion.indexOf(' ')
	let ciudad = direccion.substring(pos+1)

	let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},es&units=metric&appid=0735552c050058af9d1225b1ec61fef7`
	try{
		var res = request('GET', url)
		let tiempo = JSON.parse(res.getBody('utf8')).main.temp
		let weather = JSON.parse(res.getBody('utf8')).weather[0].main
		ctx.reply(`Los cielos dicen que hay ${tiempo} grados y que la atmósfera se encuentra ${weather} (¡¿Qué bien hablo inglés eh?!)`)
	}catch(e){
		ctx.reply('Para poder consultar al oráculo del tiempo, necesito que me des una ciudad de este mundo.')
	}
})

bot.command('direccion',(ctx)=>{
	let direccion = ctx.message.text	
	let pos = direccion.indexOf(' ')
	let dirFinal = direccion.substring(pos+1)

	//console.log(dirFinal);
	
	let url = `https://geocode.xyz/${dirFinal}?json=1`

	var res = request('GET', url);
	let latitud = JSON.parse(res.getBody('utf8')).latt
	let longitud = JSON.parse(res.getBody('utf8')).longt
	let mapa = `https://maps.googleapis.com/maps/api/staticmap?center=${dirFinal}&zoom=17&size=900x600&maptype=roadmap&format=png&visual_refresh=true
	&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7C${dirFinal}&key=AIzaSyC2BwMEw_TnEGVRzn_Swk_LQ9giz-cbQa8`

	if(latitud == 0.00000 && longitud == 0.00000){
		ctx.reply('Tu dirección no es válida. Haz un favor a este pobre ratón tuerto y añade una dirección que siga esta sintaxis: Calle Numero Ciudad');
	}else{
		ctx.replyWithPhoto(mapa);
		ctx.reply(`Todos nos encontramos en un punto especial del mundo.\nEl tuyo es:\nLATITUD ${latitud} \nLONGITUD ${longitud} `)
	}
})

bot.command('ayuda', (ctx) => {
	ctx.reply(
		'Con estos comandos te echaré una mano:\n\n'
		+'/hola ☛ Te saludaré de buen grado.\n\n'
		+'/creadores ☛ Por si quieres saber a quiénes sirvo con tanto esmero.\n\n'
		+'/tiempo ☛ Útil si quieres saber qué ropa ponerte\n\n'
		+'/direccion ☛ Si me das una buena dirección señalaré tu lugar en el mundo.\n\n'
		+'/chiste ☛ ¡Por si quieres reírte un rato conmigo!\n\n'
		+'/edad ☛ Si eres un humano cotilla te revelaré mi edad.\n\n'
		+'/piropo ☛ ¡Fiuu fiuu!.\n\n')
})


bot.command('piropo', (ctx)=>{
	let random = Math.round(Math.random()*10);
	console.log(random)
	if(random < 3){
		ctx.reply('¡Estás más bueno que un queso! 😘')
	}else if(random >= 3 && random < 6){
		ctx.reply('Estoy tan enamorado de ti que voy a montar una tienda de quesos y la voy a llamar: QUESERÍA DE MI SIN TI 😍')
	}else{
		ctx.reply('¡Por uno de tus besos te regalo yo mil quesos! 🧀🐭')
	}
})

bot.on('text', ctx =>{

	nlu(ctx.message).then(dialog).then((res)=>{

		bot.telegram.sendMessage(ctx.from.id, res)

	})

})

// EJEMPLO DE APLICACION EN EXPRESS
// express.post('/bot/text', (req, res)=>{

// 	bot.on('text', ctx =>{

// 		nlu(ctx.message).then(dialog).then((res)=>{

// 			bot.telegram.sendMessage(ctx.from.id, res)

// 		})

// 	})


// })

expressApp.listen(3000, () => {
	console.log('Example app listening on port 3000!')
})


