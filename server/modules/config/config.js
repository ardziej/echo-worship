if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

exports.node = function () {
  let ip = process.env.NODE_IP || "localhost"
  let port = process.env.NODE_PORT || "50780"
  let publicUrl = process.env.NODE_PUBLIC_URL || ip + ':' + port
  return {
    "ip": ip,
    "port": port,
    "url": ip + ':' + port,
    "publicUrl": publicUrl
  }
}

exports.ws = function () {
  let ip = process.env.WS_IP || "localhost"
  let port = process.env.WS_PORT || "50731"
  let publicUrl = process.env.WS_PUBLIC_URL || ip + ':' + port
  return {
    "ip": ip,
    "port": port,
    "url": ip + ':' + port,
    "publicUrl": publicUrl
  }
}

exports.songsApi = function () {
  return {
    "ip": process.env.SONGS_API_IP || "localhost",
    "port": process.env.SONGS_API_PORT || "50781"
  }
}
