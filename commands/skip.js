const { isBotConnected, isBotInSameChannel } = require("../utils/utils");

module.exports.run = (message, prefix, serverQueue, client) => {
  if (!isBotConnected(message, serverQueue) || !isBotInSameChannel(message, serverQueue)) return;
  if (!serverQueue.queue.totalSize) return message.channel.send("nothing is playing");
  serverQueue.stop();
  return message.channel.send("Skipped");
}

module.exports.help = {
  name: "skip",
  aliases: ["s"],
  description: "Skip the currently playing song"
}

module.exports.requirements = {
  ownerOnly: false,
  userConnection: true
}
