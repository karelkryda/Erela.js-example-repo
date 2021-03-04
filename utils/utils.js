module.exports = {
    secToTimestamp,
    progressBar,
    isBotConnected,
    isBotInSameChannel
}

function secToTimestamp(time) {
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";
    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

function progressBar(percent) {
    let str = "";
    for (let i = 0; i < 12; i++) {
        if (i == parseInt(percent * 12))
            str += "\uD83D\uDD18"; // 🔘
        else
            str += "▬";
    }
    return str;
}

function isBotConnected(message, serverQueue) {
    if (!serverQueue) message.channel.send('I am not connected to a voice channel');
    return (serverQueue);
}

function isBotInSameChannel(message, serverQueue) {
    if (serverQueue.voiceChannel != message.member.voice.channel) message.channel.send("You must be in the same voice channel in which bot is");
    return (serverQueue.voiceChannel == message.member.voice.channel);
}
