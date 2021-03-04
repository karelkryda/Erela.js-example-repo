const { isBotConnected, isBotInSameChannel } = require("../utils/utils");

module.exports.run = (message, prefix, serverQueue, client) => {
    if (!isBotConnected(message, serverQueue) || !isBotInSameChannel(message, serverQueue)) return;
    if (!serverQueue.queue.totalSize) return message.channel.send("nothing is playing");
    if (!serverQueue.queue.current.isSeekable) return message.channel.send("Can't manipulate with this song!");
  
    var args = message.content.split(' ').slice(1)[0];
    var time = 5000;
    if (args !== undefined && !isNaN(args)) time = Number(args) * 1000;
    var position = serverQueue.position - time;
  
    if (position <= 0) {
        serverQueue.seek(0);
        return message.channel.send("I play from the beginning");
    }
    else serverQueue.seek(position);
    return message.channel.send(`Rewinded by ${time / 1000}`);
}

module.exports.help = {
    name: "rewind",
    aliases: ["rw"],
    description: "Rewinds by a certain amount in the current track (or by 5 seconds by default)."
}

module.exports.requirements = {
    ownerOnly: false,
    userConnection: true
}
