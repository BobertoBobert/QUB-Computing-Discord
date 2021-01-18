module.exports = {
	name: 'ding',
	description: 'Prints "Dong!"',
    roles: ['Moderators','Bot Dev'],
	execute(message, args, client) {
		message.channel.send('Dong!');
	},
};