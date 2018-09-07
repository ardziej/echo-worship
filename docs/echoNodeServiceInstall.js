let Service = require('node-windows').Service

// Create a new service object
let svc = new Service({
    name: 'ECHO Worship node',
    description: 'Node.js server for ECHO Worship app.',
    script: 'C:\\echo\\echo-worship\\app.js'
})

// Listen for the 'install' event, which indicates the
// process is available as a service.
svc.on('install', function () {
    svc.start()
})

// install the service
svc.install()