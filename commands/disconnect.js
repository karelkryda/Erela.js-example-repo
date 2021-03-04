module.exports.run = (message, prefix, serverQueue, client) => {
    if (!serverQueue) return message.channel.send("I'm not connected to any voice channel");
    serverQueue.destroy();
    return message.channel.send("Disconnected");
}

module.exports.help = {
    name: "disconnect",
    aliases: ["leave"],
    description: "Disconnect from voice channel"
}

module.exports.requirements = {
    ownerOnly: false,
    userConnection: true
}
