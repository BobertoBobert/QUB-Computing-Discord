module.exports = {
	name: 'ping',
	description: 'sends "Ping!"',
	execute(message, args, client) {
		message.channel.send('Pong.');
	},
};