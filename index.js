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

//refine console.log to catch logs and print them to discord channel
console.log = (text) => {
    process.stdout.write(text.toString())
    client.channels.cache.get(`763414067678937129`).send("**Log:** \n```" + text + "```")
}

console.error = (text) => {
    process.stdout.write("ERROR: " + text.toString())
    client.channels.cache.get(`763414067678937129`).send("**ERROR:** \n```" + text + "```")
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

    // This piece of string manipulation removes the prefix and whitespace, and then splits the command into an array of arguments by spaces
    const args = message.content.slice(config.prefix.length).trim().split(' ');
    // This removes the command name from the array, and sets it as its own variable
    const commandName = args.shift().toLowerCase();

    //If the commandName doesn't match any prewritten command, exit
    if (!client.commands.has(commandName)) {
        console.log(`${commandName} is not a command`);
        return;
    }


    //Execute the command, and tell the user if it fails
    try {
        client.commands.get(commandName).execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }

});


// When a message is reacted to, check that if reaction is the notebook emoji
client.on('messageReactionAdd', (messageReaction, user) => {
    if (messageReaction.emoji.name == '🗒️') {
            // Before do anything, verify that there have been at least 3 reactions to the message
            // and that it has not already been sent into the notes channel. We will react to 
            // messages that have been processed  with our own reaction to mark them as having 
            // been processed. ALso makes sure message was not moved with command
            if (messageReaction.count <3 || messageReaction.me || messageReaction.message.content.toLowerCase().startsWith(`${config.prefix}addnote`)){
                return;
            }
            messageReaction.message.react('🗒️');


            //check the target id using the id of the current channel

        let targetChannelID = channelFinder.execute(messageReaction.message.channel.id);

        //try catch to make sure the channel is valid
        try {
            console.log(targetChannelID);
            let targetChannel = client.channels.cache.get(targetChannelID);

            let credit = `Notes provided by ${messageReaction.message.author}\n\n`;
            targetChannel.send(credit + messageReaction.message.content);

        } catch(error){
            console.error(error);
        }
    }
})







client.login(config.token);


