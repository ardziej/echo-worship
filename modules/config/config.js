if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

exports.node = function () {
    return {
        "ip": process.env.NODE_IP || "localhost",
        "port": process.env.NODE_PORT || "50780"
    }
}

exports.ws = function () {
    return {
        "ip": process.env.WS_IP || "localhost",
        "port": process.env.WS_PORT || "50731"
    }
}

exports.songsApi = function () {
    return {
        "ip": process.env.SONGS_API_IP || "localhost",
        "port": process.env.SONGS_API_PORT || "50781"
    }
}
