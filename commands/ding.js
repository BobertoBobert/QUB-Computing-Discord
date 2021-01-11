module.exports = {
	name: 'ding',
	description: 'Prints "Dong!"',
	roles: ['Moderators'],
	execute(message, args, client) {
		message.channel.send('Dong!');
	},
};