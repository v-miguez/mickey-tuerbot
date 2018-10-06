const Promesa = require('bluebird')
const fs = require('fs')
module.exports = (message) =>{

	return new Promise ((resolve, reject)=>{
		if(message.nlu.entities && message.nlu.entities.intent[0].confidence > 0.8){

			fs.readFile(`./frases/${message.nlu.entities.intent[0].value}`,(err, data)=>{

				let frases = data.toString().split('\n')
				let fraseEnvio = frases[Math.round(Math.random()*frases.length)]
				resolve(fraseEnvio)
			})

		}else{

			resolve('No entiendo tus palabras')

		}

	})	

}