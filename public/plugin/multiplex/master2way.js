(function () {

    // Don't emit events from inside of notes windows
    if (window.location.search.match(/receiver/gi)) {
        return;
    }

    var multiplex = Reveal.getConfig().multiplex;
    var socketId = multiplex.id;
    var uid = multiplex.uid;
    console.log("2w: " + uid);
    var socket = io.connect(multiplex.url);

    function post() {

        var messageData = {
            state: Reveal.getState(),
            secret: multiplex.secret,
            socketId: multiplex.id,
            uid: uid
        };
        console.log('Request | uid ' + uid + ' - ' + uid);
        console.log(messageData);
        socket.emit('multiplex-statechanged', messageData);

    }

    // post once the page is loaded, so the client follows also on "open URL".
    window.addEventListener('load', post);

    // Monitor events that trigger a change in state
    Reveal.addEventListener('slidechanged', post);
    Reveal.addEventListener('fragmentshown', post);
    Reveal.addEventListener('fragmenthidden', post);
    Reveal.addEventListener('overviewhidden', post);
    Reveal.addEventListener('overviewshown', post);
    Reveal.addEventListener('paused', post);
    Reveal.addEventListener('resumed', post);

    socket.on(multiplex.id, function (data) {
        // ignore data from sockets that aren't ours
        if (data.socketId !== socketId) {
            return;
        }
        console.log('Response | uid local: ' + uid + ' - remote: ' + data.uid);

        if (data.uid === uid) {
            //return;
        }
        if (window.location.host === 'localhost:1947') return;
        //console.log('res | uid local: ' + uid + ' - remote: ' + data.uid);
        console.log(data);
        Reveal.setState(data.state);
    });

}());