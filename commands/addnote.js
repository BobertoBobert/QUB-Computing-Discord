exports.run = (client, message, args) => {
	// combining all output into one message allows us to bypass rate limiters
	let output = '';
    let targetChannel = client.channels.get('755400893175955548');
    output += message.content;

    targetChannel.send("test");
};
