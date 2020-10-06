const fs = require('fs');

module.exports = {
    name: 'notechannel',
    description: 'Takes 3 arguments. The source, the target, and the label. When you run it, it allows the addnote command to be run in the source to transfer notes to the target',
    execute(message, args) {
        let newLink = [args[0], args[1], args[2]];


        //First we read the json file
        let rawData = fs.readFileSync('./channels.json');
        //then we save the array in it as a variable
        let channelArray = JSON.parse(rawData).channels;
        //iterate through it

        channelArray.push(newLink);

        let jsonObject = {
            channels: channelArray
        }

        let jsonString = JSON.stringify(jsonObject, null, '\t');
        console.log(jsonString);
        fs.writeFileSync('./channels.json', jsonString);


    },
};