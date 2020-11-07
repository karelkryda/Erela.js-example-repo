module.exports = {
    name: "stop",
    aliases: ["clear"],
    description: "Stop the currently playing song and clear the queue",
    execute(message, prefix, serverQueue, client) {
        if (serverQueue.queue.totalSize) {
            serverQueue.queue.clear();
            serverQueue.stop();
            message.channel.send("Stopped...");
        }
    }
};
