const { isBotConnected, isBotInSameChannel } = require("../utils/utils");

module.exports.run = (message, prefix, serverQueue, client) => {
    if (!isBotConnected(message, serverQueue) || !isBotInSameChannel(message, serverQueue)) return;
    var args = message.content.split(' ').slice(1)[0];
    if (args === undefined || isNaN(args)) return message.channel.send(`Current volume is ${serverQueue.volume}`);
    args = Number(args);
    if (args < 0 || args > 100) return message.channel.send(`new volume must be between 0 and 100`);
    else {
        serverQueue.setVolume(args)
        return message.channel.send(`New volume is ${serverQueue.volume}`);
    }
}

module.exports.help = {
    name: "volume",
    aliases: ["vol"],
    description: "Change bot volume"
}

module.exports.requirements = {
    ownerOnly: false,
    userConnection: true
}
