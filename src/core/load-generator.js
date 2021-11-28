/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
// const childProc = require('child_process');
const { triggerTest } = require('./tester');

function generateAndTriggerLoad(data) {
    return new Promise((resolve, reject) => {
        const { method } = data;
        const path = data.url.substring(data.url.lastIndexOf('/'), data.url.length);
        const url = data.url
            .substring(0, data.url.lastIndexOf('/'))
            .replace(/^https:\/\/|http:\/\//gm, '');
        const responses = [];
        for (let i = 0; i < data.request; i++) {
            responses.push(triggerTest(url, path, method));
        }
        return Promise.all(responses)
            .then((results) => {
                return resolve(results);
            })
            .catch((err) => {
                console.log(err);
                return reject(err);
            });
    });
}
// generateAndTriggerLoad({
//         url: 'https://6164482fb55edc00175c1e7c.mockapi.io/user',
//         request: 10,
//         method: 'GET',
//     })
//     .then((result) => {
//         return result;
//     })
//     .catch((err) => {
//         console.error(err);
//     });
module.exports.generateAndTriggerLoad = generateAndTriggerLoad;