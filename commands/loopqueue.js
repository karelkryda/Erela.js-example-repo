const { isBotConnected, isBotInSameChannel } = require("../utils/utils");

module.exports.run = (message, prefix, serverQueue, client) => {
    if (!isBotConnected(message, serverQueue) || !isBotInSameChannel(message, serverQueue)) return;
    if (!serverQueue.queue.totalSize) return message.channel.send("nothing is playing");
    serverQueue.setQueueRepeat(!serverQueue.queueRepeat);
    if (serverQueue.queueRepeat) message.channel.send("Queue loop is now on");
    else message.channel.send("Queue loop is now off");
}

module.exports.help = {
    name: "loopqueue",
    aliases: ["lq"],
    description: "Starts looping your current queue."
}

module.exports.requirements = {
    ownerOnly: false,
    userConnection: true
}
