const TelegrafWit = require('telegraf-wit')
const Promesa = require('bluebird')

const wit = new TelegrafWit('A6WATUZSW4FXN634WGI64QEVNIRQHVFG')

module.exports= (message)=>{

	return new Promise((resolve, reject)=>{

		wit.meaning(message.text).then(result =>{
			message.nlu = result
			resolve(message)

		})

	})

}