const connectFile = require("./connect.js");

module.exports.run = async (message, prefix, serverQueue, client) => {
    const voiceChannel = message.member.voice.channel;
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) return message.channel.send("I need the permissions to join and speak in your voice channel!");

    if (!serverQueue) await connectFile.run(message, prefix, serverQueue, client);

    serverQueue = client.manager.players.get(message.guild.id);

    var args = message.content.substr(message.content.indexOf(' ') + 1)

    const res = await client.manager.search(
        args,
        message.author
    );

    switch (res.loadType) {
        case "TRACK_LOADED":
        case "SEARCH_RESULT":
            serverQueue.queue.add(res.tracks[0]);
            if (!serverQueue.playing && !serverQueue.paused && !serverQueue.queue.size) serverQueue.play();
            break;
        case "PLAYLIST_LOADED":
            serverQueue.queue.add(res.tracks);
            if (!serverQueue.playing && !serverQueue.paused && serverQueue.queue.totalSize === res.tracks.length) serverQueue.play();
            break;
        case "NO_MATCHES":
            return message.channel.send(`song could not be found`);
        case "LOAD_FAILED":
            return message.channel.send(`This song cannot be loaded`);
    }
}

module.exports.help = {
    name: "play",
    aliases: ["p"],
    description: "Play song by name or URL"
}

module.exports.requirements = {
    ownerOnly: false,
    userConnection: true
}
