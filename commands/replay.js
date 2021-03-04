const { isBotConnected, isBotInSameChannel } = require("../utils/utils");

module.exports.run = async (message, prefix, serverQueue, client) => {
    if (!isBotConnected(message, serverQueue) || !isBotInSameChannel(message, serverQueue)) return;
    if (!serverQueue.queue.totalSize) return message.channel.send("nothing is playing");
    if (!serverQueue.queue.current.isSeekable) return message.channel.send("Can't manipulate with this song!");
    serverQueue.seek(0);
    return message.channel.send("I play from the beginning");
}

module.exports.help = {
    name: "replay",
    aliases: ["again", "playagain"],
    description: "Play from the beginning."
}

module.exports.requirements = {
    ownerOnly: false,
    userConnection: true
}
