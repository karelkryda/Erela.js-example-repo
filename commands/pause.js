module.exports = {
    name: "pause",
    aliases: [],
    description: "Pause the player",
    execute(message, prefix, serverQueue, client) {
        if (serverQueue.paused) return message.channel.send("Music is already paused");
        serverQueue.pause(true); //false for resume
        return message.channel.send("Paused");
    }
};
