module.exports = {
    name: "connect",
    aliases: ["join"],
    description: "Connect to voice channel",
    async execute(message, prefix, serverQueue, client) {
        const voiceChannel = message.member.voice.channel;
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
};
