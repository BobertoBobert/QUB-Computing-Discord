const Discord = require('discord.js');
const fs = require('fs');
const channelFinder = require('./channelFinder');


const client = new Discord.Client();
const config = require('./config.json');
client.config = config;

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
    console.log(`${command.name} ready`)
}



client.on('ready', () => {
    console.log('I am ready!');
});

//when a message is recieved, this will run
client.on('message', message => {

    //checks if the message was sent by a bot or does not contain a prefix. In either of these cases it will then return without doing anything. This will be what happens for most messages
    if (!message.content.startsWith(config.prefix) || message.author.bot) {
        return;
    }

    console.log('had prefix');

    // This piece of string manipulation removes the prefix and whitespace, and then splits the command into an array of arguments by spaces
    const args = message.content.slice(config.prefix.length).trim().split(' ');
    // This removes the command name from the array, and sets it as its own variable
    const commandName = args.shift().toLowerCase();

    //If the commandName doesn't match any prewritten command, exit
    if (!client.commands.has(commandName)) {
        console.log(`${command.name} is not a command`);
        return;
    }


    //Execute the command, and tell the user if it fails
    try {
        client.commands.get(commandName).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }

});



client.on('messageReactionAdd', (messageReaction, user) => {
    if (messageReaction.emoji.name == '🗒️') {
        let targetChannelID = channelFinder.execute(messageReaction.message.channel.id);
        try {
            console.log('Correct reaction');
            console.log(targetChannelID);
            let targetChannel = client.channels.cache.get(targetChannelID);

            targetChannel.send(messageReaction.message.content);
        } catch(error){
            console.error(error);
        }
    }
})







client.login(config.token);


