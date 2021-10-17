const https = require('https');
const moment = require('moment');
const _ = require('underscore');
const argv = require('minimist')(process.argv.slice(2));

(async() => {
    const timings = {
        startAt: process.hrtime(),
        dnsLookup: undefined,
        tcpConnectionAt: undefined,
        tlsConnectionAt: undefined,
        firstByteAt: undefined,
        endAt: undefined
    }
    var options = {
        host: argv.url,
        port: 443,
        path: argv.path,
        method: argv.method
    };
    const req = https.request(options, (res) => {
        res.on('data', () => {})
        res.on('end', () => {
            timings.endAt = process.hrtime();
            process.stdout.write(JSON.stringify(timings));
            process.exitCode = 0;
        })
    });
    req.on('socket', (socket) => {
        socket.on('lookup', () => {
            timings.dnsLookupAt = process.hrtime()
        })
        socket.on('connect', () => {
            timings.tcpConnectionAt = process.hrtime()
        })
        socket.on('secureConnect', () => {
            timings.tlsHandshakeAt = process.hrtime()
        })
    });
    req.on('error', function(error) {
        process.stdout.write(JSON.stringify(error));
        process.exitCode = 1;
    })
    req.end();
})();