const { isBotConnected, isBotInSameChannel } = require("../utils/utils");

module.exports.run = (message, prefix, serverQueue, client) => {
    if (!isBotConnected(message, serverQueue) || !isBotInSameChannel(message, serverQueue)) return;
    if (!serverQueue.queue.totalSize) return message.channel.send("nothing is playing");

    serverQueue.queue.shuffle();
    message.channel.send('Done');
}

module.exports.help = {
    name: "shuffle",
    aliases: [],
    description: "Shuffle the queue"
}

module.exports.requirements = {
    ownerOnly: false,
    userConnection: true
}
