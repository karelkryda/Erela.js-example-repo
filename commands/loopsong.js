const { isBotConnected, isBotInSameChannel } = require("../utils/utils");

module.exports.run = (message, prefix, serverQueue, client) => {
    if (!isBotConnected(message, serverQueue) || !isBotInSameChannel(message, serverQueue)) return;
    if (!serverQueue.queue.totalSize) return message.channel.send("nothing is playing");
    serverQueue.setTrackRepeat(!serverQueue.trackRepeat);
    if (serverQueue.trackRepeat) message.channel.send("Track loop is now on");
    else message.channel.send("Track loop is now off");
}

module.exports.help = {
    name: "loop",
    aliases: [],
    description: "Starts looping your current playing track."
}

module.exports.requirements = {
    ownerOnly: false,
    userConnection: true
}
