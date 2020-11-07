module.exports.run = async (message, prefix, serverQueue, client) => {
    if (!serverQueue) {
        const player = client.manager.create({
            selfDeafen: true,
            guild: message.guild.id,
            serverName: message.guild.name,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
        });
        player.connect();
        message.channel.send("Joined");
    }
}

module.exports.help = {
    name: "connect",
    aliases: ["join"],
    description: "Connect to voice channel"
}

module.exports.requirements = {
    ownerOnly: false,
    userConnection: true
}
