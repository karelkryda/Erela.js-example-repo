const { isBotConnected, isBotInSameChannel } = require("../utils/utils");

const levels = {
  none: 0.0,
  low: 0.10,
  medium: 0.15,
  high: 0.25,
};

module.exports.run = (message, prefix, serverQueue, client) => {
    if (!isBotConnected(message, serverQueue) || !isBotInSameChannel(message, serverQueue)) return;

    let args = message.content.split(' ').slice(1);
    if (!args.length) return message.channel.send("Please enter bass boost level");

    let level;
    if (args[0].toLowerCase() in levels) level = args[0].toLowerCase();
    else return message.channel.send("Please enter a valid value");

    serverQueue.setEQ(...new Array(3).fill(null).map((_, i) => ({ band: i, gain: levels[level] })));

    return message.channel.send(`Bass boost level is **${level}**`));
}

module.exports.help = {
    name: "bassboost",
    aliases: ["bass"],
    description: "Changes bass boost effect"
}

module.exports.requirements = {
    ownerOnly: false,
    userConnection: true
}
