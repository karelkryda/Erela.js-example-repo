module.exports = {
    secToTimestamp,
    progressBar
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
