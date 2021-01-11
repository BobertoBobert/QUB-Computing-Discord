module.exports = {
    name: 'lockdown',
    description: 'Locks the server until a moderator sends in the command again',
    roles: ['Moderators','Bot Dev'],
    execute(message, args, client) {
        const server = message.guild;
        server.serverLocked=!server.serverLocked;
        if(server.serverLocked){
            message.channel.send('@everyone \nThe server is now locked. To unlock it, a moderator must use the ! lockdown command');
        } else{
            message.channel.send('@everyone \nThe server is now unlocked');
        }
    },
};