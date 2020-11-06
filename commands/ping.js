module.exports = {
    name: "ping",
    aliases: [],
    description: "Ping command",
    execute(message, prefix, serverQueue, client) {
        message.channel.send(`:ping_pong: **Pong!**`);
    }
};
