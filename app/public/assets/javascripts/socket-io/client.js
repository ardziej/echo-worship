(function () {
    let multiplex = Reveal.getConfig().multiplex
    let socketId = multiplex.id
    let socket = io.connect(multiplex.url)

    socket.on('echo', function (data) {
        //console.log(data)
        if (data.action === 'reload') location.reload()
    });

    socket.on(multiplex.id, function (data) {
        // ignore data from sockets that aren't ours

        if (data.socketId !== socketId) {
            return
        }
        if (window.location.host === 'localhost:1948') return

        Reveal.setState(data.state)
    })
}())



