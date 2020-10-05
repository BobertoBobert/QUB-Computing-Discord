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
    // If the message is "ping"
    if (message.content.includes(" addNote ")) {
        let targetChannel = client.channels.cache.get('755400893175955548');

        let noCommandVersion = message.content;
        noCommandVersion = ((noCommandVersion.substring(0, noCommandVersion.indexOf("addNote"))) +
            noCommandVersion.substring(noCommandVersion.indexOf("addNote") + 7, noCommandVersion.length - 1));
        targetChannel.send(noCommandVersion);
    }
});



client.on('messageReactionAdd', (messageReaction, user) => {
    let targetChannel = '';
    switch (messageReaction.message.channel.id) {
        case '761548502051586068': //networks
            targetChannel = '757969407199674422';
            break;
        case '757969503148834826': //1027 Programming
            targetChannel = '760850283172462672';
            break;
        case '757969536317390960': //procedural Programming
            targetChannel = '760561671164526612';
            break;
        case '760520891972714518': //Maths
            targetChannel = '757969446395707432';
            break;

        default:
            console.log('nope');
            return;
    }
    if (messageReaction.emoji.name == '🗒️') {
        let notesChannel = messageReaction.message.client.channels.cache.get(targetChannel);

        let noCommandVersion = messageReaction.message.content;
        noCommandVersion = ((noCommandVersion.substring(0, noCommandVersion.indexOf("addNote"))) +
            noCommandVersion.substring(noCommandVersion.indexOf("addNote") + 7, noCommandVersion.length - 1));
        targetChannel.send(noCommandVersion);


    }


})



client.login(config.token);


