module.exports = {
	name: 'ding',
	description: 'Dong!',
	roles: ['Moderators'],
	execute(message, args, client) {
		message.channel.send('Dong!');
	},
};