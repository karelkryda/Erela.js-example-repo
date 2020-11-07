const { MessageEmbed } = require("discord.js");
const utils = require("../utils/utils");

module.exports.run = async (message, prefix, serverQueue) => {
    if (!serverQueue || !serverQueue.queue.totalSize) return message.channel.send("nothing is playing");
    message.channel.send(new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(serverQueue.queue.current.title)
        .setURL(serverQueue.queue.current.uri)
        .setThumbnail(serverQueue.queue.current.thumbnail)
        .addFields(
            { name: 'Channel', value: serverQueue.queue.current.author, inline: true },
            { name: 'Song position', value: `${utils.secToTimestamp(serverQueue.position / 1000)}` + utils.progressBar(serverQueue.position / serverQueue.queue.current.duration) + `${utils.secToTimestamp(serverQueue.queue.current.duration / 1000)}` },
        )
        .setFooter(`Song was requested by ${serverQueue.queue.current.requester.username}`));
}

module.exports.help = {
    name: "nowplaying",
    aliases: ["np"],
    description: "Displays info about the playing track."
}

module.exports.requirements = {
    ownerOnly: false,
    userConnection: false
}
