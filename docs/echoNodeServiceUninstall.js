let Service = require('node-windows').Service;

// Create a new service object
let svc = new Service({
    name: 'ECHO Worship node',
    description: 'Node.js server for ECHO Worship app.',
    script: 'C:\\echo\\echo-worship\\app.js'
})

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall', function () {
    console.log('Uninstall complete.')
    console.log('The service exists: ', svc.exists)
})

// Uninstall the service.
svc.uninstall()