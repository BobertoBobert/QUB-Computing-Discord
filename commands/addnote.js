const channelFinder = require('../channelFinder.js')

module.exports = {
	name: 'addnote',
	description: 'Marks a message as a note to be sent and sends it to the notes channel',
	execute(message, args, client) {
        let targetChannelID = channelFinder.execute(message.channel.id);

        let messageWithoutCommand = message.content.slice(9);
        
        let targetChannel = message.client.channels.cache.get(targetChannelID)

        let credit = `Notes provided by ${message.author}\n\n`;
        targetChannel.send(credit + messageWithoutCommand);
	},
};