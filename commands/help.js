module.exports = {
    name: 'help',
    description: 'When a command is passed as an argument, it will print the description',
    execute(message, args, client) {
        if (args.length == 0) {
            message.channel.send('Here are available commands: ');
            return;
        }

        if (!client.commands.has(args[0])) {
            message.channel.send(`${args[0]} is not a command`);
            return;
        }

        const command = client.commands.get(args[0]); 
        message.channel.send(`${command.name} description\n\`\`\`${command.description}\`\`\`` );
           

    },
};