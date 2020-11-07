const { MessageEmbed } = require("discord.js");
const utils = require("../utils/utils");

module.exports = {
    name: "nowplaying",
    aliases: ["np"],
    description: "Displays info about the playing track.",
    async execute(message, prefix, serverQueue) {
        if (!serverQueue.queue.totalSize) return message.channel.send("nothing is playing");
        message.channel.send(new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(serverQueue.queue.current.title)
            .setURL(serverQueue.queue.current.uri)
            .setThumbnail(serverQueue.queue.current.thumbnail)
            .addFields(
                { name: 'Channel', value: serverQueue.queue.current.author, inline: true },
                { name: 'Song position', value: utils.progressBar(serverQueue.position / serverQueue.queue.current.duration) },
            )
            .setFooter(`Song was requested by ${serverQueue.queue.current.requester.username}`));
    }
};
