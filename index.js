const venom = require('venom-bot')
const venomOptions = require('./venom-options.js')

var express = require('express');
// var app = express();

// app.get('/', function(req, res){
//   console.log(req.query.id)
// });

const TWENTY_MINUTES = 1200000
let client = null

dateLog('Started index.js')
initBot()

function initBot() {
	dateLog('Initializing bot')
	venom
		//	create bot with options
		.create(venomOptions)
		// 	start bot
		.then((client) => startBot(client))
		// 	catch errors
		.catch((err) => {
			dateLog(err)
		})
}

function startBot(_client) {
	dateLog('Starting bot')
	client = _client

	//	restart bot every 20 minutos
	//	stops working otherwise
	setTimeout(() => {
		//	close bot
		client.close()
		dateLog('Closing bot')

		//	init bot again
		initBot()
	}, TWENTY_MINUTES)

	//
	// add your code here
	//

	// example: reply every message with "Hi!""
	client.onMessage(reply)
}

function reply(message) {
    if (message.body === 'Hi') {
	const sender = message.from
	dateLog(`Message received from: ${sender}`)
	const replyText = 'asdwer'
	client.sendText(sender, replyText)
	dateLog(`Message: "${replyText}" sent to: ${sender}`)
	}
}

//
//	Aux
//

// Catch ctrl+C
process.on('SIGINT', function () {
	client.close()
})

function dateLog(text) {
	console.log(new Date(), ' - ', text)
}
