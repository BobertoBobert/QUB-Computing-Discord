const fs = require('fs');

module.exports = {
    execute(id) {
        console.log(id);

        let rawData = fs.readFileSync('./channels.json');
        let channelArray = JSON.parse(rawData).channels;
        for (const channels of channelArray) {
            if (id == channels[0]) {
                return channels[1];
            }
        }


    }
}