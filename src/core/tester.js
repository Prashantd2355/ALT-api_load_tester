/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
const https = require('https');

function triggerTest(host, path, method) {
    const body = [];
    const timings = {
        startAt: process.hrtime(),
        dnsLookupAt: undefined,
        tcpConnectionAt: undefined,
        tlsHandshakeAt: undefined,
        firstByteAt: undefined,
        endAt: undefined,
        body: undefined,
        statusCode: undefined,
    };
    const options = {
        host,
        port: 443,
        path,
        method,
    };
    // eslint-disable-next-line promise/param-names
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            timings.statusCode = res.statusCode;
            res.once('readable', () => {
                timings.firstByteAt = process.hrtime();
            });
            res.on('data', (chunk) => {
                body.push(chunk);
            });
            res.on('end', () => {
                timings.endAt = process.hrtime();
                try {
                    timings.body = JSON.parse(Buffer.concat(body).toString());
                } catch (error) {
                    console.log('Error:', error);
                    timings.body.error = Buffer.concat(body).toString();
                }
                return resolve(timings);
            });
        });
        req.on('socket', (socket) => {
            socket.on('lookup', () => {
                timings.dnsLookupAt = process.hrtime();
            });
            socket.on('connect', () => {
                timings.tcpConnectionAt = process.hrtime();
            });
            socket.on('secureConnect', () => {
                timings.tlsHandshakeAt = process.hrtime();
            });
        });
        req.on('error', (error) => {
            console.error(error);
            return reject(error);
        });
        req.end();
    });
}

module.exports = {
    triggerTest,
};