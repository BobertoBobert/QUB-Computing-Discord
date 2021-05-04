module.exports = {
    name: 'lockdown',
    description: 'Locks the server until a moderator sends in the command again',
    roles: ['Mod', 'Bot Dev'],
    execute(message, args, client) {
        const server = message.guild;
        server.serverLocked = !server.serverLocked;
        let response = '';
        if (args[0] == 'notify') {
            response += '@everyone \n'
        }
        if (server.serverLocked) {
            response += 'The server is now locked. To unlock it, a moderator must use the ! lockdown command';
        } else {
            response += 'The server is now unlocked';
        }
        message.channel.send(response);
    },
};
