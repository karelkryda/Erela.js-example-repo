module.exports = {
    progressBar
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
