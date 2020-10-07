module.exports = {
	name: 'ding',
	description: 'Dong!',
	execute(message, args, client) {
		message.channel.send('Dong!');
	},
};