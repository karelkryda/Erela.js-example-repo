const { isBotConnected, isBotInSameChannel } = require("../utils/utils");

module.exports.run = (message, prefix, serverQueue, client) => {
    if (!isBotConnected(message, serverQueue) || !isBotInSameChannel(message, serverQueue)) return;
    if (!serverQueue.queue.previous) return message.channel.send("There isn't previous song");
    if (serverQueue.queue.totalSize) {
        serverQueue.queue.add(serverQueue.queue.previous, 0);
        serverQueue.queue.add(serverQueue.queue.current, 1);
        serverQueue.stop();
    }
    else {
        serverQueue.queue.add(serverQueue.queue.previous);
        if (!serverQueue.playing && !serverQueue.paused && !serverQueue.queue.size) serverQueue.play();
    }
    return message.channel.send("Playing previous song");
}

module.exports.help = {
    name: "previous",
    aliases: ["back", "prev"],
    description: "Skip back to the previous song"
}

module.exports.requirements = {
    ownerOnly: false,
    userConnection: true
}
