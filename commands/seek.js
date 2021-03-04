const { isBotConnected, isBotInSameChannel } = require("../utils/utils");

module.exports.run = (message, prefix, serverQueue, client) => {
    if (!isBotConnected(message, serverQueue) || !isBotInSameChannel(message, serverQueue)) return;
    if (!serverQueue.queue.totalSize) return message.channel.send("nothing is playing");
    if (!serverQueue.queue.current.isSeekable) return message.channel.send("Can't manipulate with this song!");
  
    var args = message.content.split(' ').slice(1)[0];
    if (args === undefined || isNaN(args)) return message.channel.send("Please enter seconds");
    var time = Number(args);
    if (time > serverQueue.queue.current.duration / 1000) return message.channel.send("This song is not that long");
    else if (time === serverQueue.queue.current.duration / 1000) return serverQueue.stop();
    else {
        serverQueue.seek(time * 1000);
        return message.channel.send("Done");
    }
}

module.exports.help = {
    name: "seek",
    aliases: [],
    description: "Sets the playing track's position to the specified position."
}

module.exports.requirements = {
    ownerOnly: false,
    userConnection: true
}
