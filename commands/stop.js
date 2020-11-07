module.exports.run = (message, prefix, serverQueue, client) => {
    if (!serverQueue || !serverQueue.queue.totalSize) return message.channel.send("nothing is playing");
    serverQueue.queue.clear();
    serverQueue.stop();
    message.channel.send("Stopped...");
}

module.exports.help = {
    name: "stop",
    aliases: ["clear"],
    description: "Stop the currently playing song and clear the queue"
}

module.exports.requirements = {
    ownerOnly: false,
    userConnection: true
}
