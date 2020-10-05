const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
const config = require('./config.json');
// We also need to make sure we're attaching the config to the CLIENT 
// so it's accessible everywhere!
client.config = config;


client.on('ready', () => {
    console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {

    if (message.author.bot) return;

    // If the message is "ping"
    if (message.content.includes("?addNote")) {
        console.log('test');
        let targetChannelID = channelFinder(message.channel.id);

        let noCommandVersion = message.content;
        noCommandVersion = ((noCommandVersion.substring(0, noCommandVersion.indexOf("addNote"))) +
            noCommandVersion.substring(noCommandVersion.indexOf("addNote") + 7, noCommandVersion.length));

        let targetChannel = client.channels.cache.get(targetChannelID)
        targetChannel.send(noCommandVersion);
    }

    if (message.content.includes("ping")) {
        message.channel.send('pong');
    }
});



client.on('messageReactionAdd', (messageReaction, user) => {


    if (messageReaction.emoji.name == '🗒️') {
        let targetChannelID = channelFinder(messageReaction.message.channel.id);
        console.log('Correct reaction');
        console.log(targetChannelID);
        let targetChannel = client.channels.cache.get(targetChannelID);

        targetChannel.send(messageReaction.message.content);


    }


})



function channelFinder(id) {
    if (id == '761548502051586068') { //Networking
        return ('757969407199674422');
    }
    if (id == '760850283172462672') { //Programming
        return ('757969503148834826');
    }
    if (id == '760561671164526612') { // Procedural Programming
        return ('757969536317390960');
    }
    if (id == '757969446395707432') { // Maths Discussion
        return ('760520891972714518');
    }
    if (id == '762784686560378927') { //Bot Testing
        return ('762785719026057246');
    }
}



client.login(config.token);


