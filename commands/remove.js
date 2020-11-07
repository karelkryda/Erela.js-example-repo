module.exports.run = (message, prefix, serverQueue, client) => {
    if (!serverQueue || !serverQueue.queue.totalSize) return message.channel.send("no songs in the queue");

    var splittedMessage = message.content.split(' ').slice(1)[0];

    if (splittedMessage >= serverQueue.queue.totalSize) return message.channel.send(`There aren't that many songs`);
    var title = serverQueue.queue[splittedMessage - 1].title;
    serverQueue.queue.remove(splittedMessage - 1)
    return message.channel.send(`\`${title}\` was successfully removed`);
}

module.exports.help = {
    name: "remove",
    aliases: ["rm"],
    description: "Removes the specified track from the queue."
}

module.exports.requirements = {
    ownerOnly: false,
    userConnection: true
}
