const fs = require('fs');

module.exports = {
    execute(id) {
        //First we read the json file
        let rawData = fs.readFileSync('./channels.json');
        //then we save the array in it as a variable
        let channelArray = JSON.parse(rawData).channels;
        //iterate through it
        for (const channels of channelArray) {
            //checking if our ID is on the list
            if (id == channels[0]) {
                console.log(`Original channel was ${channels[2]}`)
                return channels[1];
            }
        }


    }
}