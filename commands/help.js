module.exports = {
    name: 'help',
    description: 'When a command is passed as an argument, it will print the description',
    execute(message, args, client) {
        if (args.length == 0) {
            let returnString = 'Here are available commands: \`\`\`';
            client.commands.each(command => {
                returnString += `\n${command.name}`
            })
            returnString += '\n\`\`\`';
            message.channel.send(returnString);
            return;
        }

        if (!client.commands.has(args[0])) {
            message.channel.send(`${args[0]} is not a command`);
            return;
        }

        const command = client.commands.get(args[0]);
        message.channel.send(`${command.name} description\n\`\`\`${command.description}\`\`\``);


    },
};