module.exports.run = (message, prefix, serverQueue, client) => {
    if (!serverQueue || !serverQueue.queue.totalSize) return message.channel.send("nothing is playing");
    if (serverQueue.paused) return message.channel.send("Music is already paused");
    serverQueue.pause(true); //false for resume
    return message.channel.send("Paused");
}


module.exports.help = {
    name: "pause",
    aliases: [],
    description: "Pause the player"
}

module.exports.requirements = {
    ownerOnly: false,
    userConnection: true
}
