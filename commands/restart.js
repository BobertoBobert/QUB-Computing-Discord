module.exports = {
	name: 'restart',
	description: 'Restarts bot, or with node arg stops the node process to be restarted fully',
	execute(message, args, client) {
		if (args[0]=="node") {
            message.channel.send("Stopping node...").then(() => {
                process.exit()})
        } else if (args[0]==null) {
            message.channel.send("Restarting bot...").then(msg => client.destroy(3001)).then(() => client.login(client.config.token)).then(() => message.channel.send("Restarted!"));
        } else {
            message.channel.send("Incorrect arguments!")
        }
	},
};