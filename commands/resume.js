module.exports.run = (message, prefix, serverQueue, client) => {
    if (!serverQueue || !serverQueue.queue.totalSize) return message.channel.send("nothing is playing");
    if (!serverQueue.paused) return message.channel.send("Music is already playing");
    serverQueue.pause(false); 
    return message.channel.send("Resumed");
}


module.exports.help = {
    name: "resume",
    aliases: [],
    description: "Resume the player"
}

module.exports.requirements = {
    ownerOnly: false,
    userConnection: true
}
