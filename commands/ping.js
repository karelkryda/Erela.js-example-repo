module.exports.run = (message, prefix, serverQueue, client) => {
    message.channel.send(`:ping_pong: **Pong!**`);
}

module.exports.help = {
    name: "ping",
    aliases: [],
    description: "Ping command"
}

module.exports.requirements = {
    ownerOnly: false,
    userConnection: false
}
