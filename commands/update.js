const child_process = require('child_process');

module.exports = {
	name: 'update',
	description: 'Runs one or both of 2 bash scripts, either just fetching the master repo branch or also updating node modules',
	execute(message, args, client) {
		if (args[0]=="fetch" || args[0]==null) {
			message.channel.send("Running git fetch on bot!")
			
			// run git fetch script
			child_process.exec('sh /bot-files/gitfetch.sh', (error, stdout) => {
				if (error) {
					console.error(`Exec error: ${error}`)
				}
				console.log(`stdout: ${stdout}`);
				message.channel.send("Success! Restarting...").then(msg => client.destroy(3001)).then(() => client.login(client.config.token));
			})
		} else if (args[0]=="node") {

			message.channel.send("Node install request detected!")
			// message.channel.send("Running git fetch before updating node modules");

			// // run git fetch script
			// const fetchScript = execSync('sh gitfetch.sh /bot-files');
			// fetchScript.stdout.on('data', (data)=>{
			// 	message.channel.send(data);				
			// })
			// fetchScript.stderr.on('data', (data)=>{
			// 	message.channel.send(data);				
			// })

			// message.channel.send("Updating node modules")

			// // run node update script
			// const modulesscript = execSync('sh nodeinstall.sh /bot-files');
			// modulesscript.stdout.on('data', (data)=>{
			// 	message.channel.send(data);				
			// })
			// modulesscript.stderr.on('data', (data)=>{
			// 	message.channel.send(data);	
			// })

			// message.channel.send("Stopping node!")

			// client.destroy().then(() => process.exit());

		} else {
			message.channel.send("Incorrect arguments!")
		}
	},
};