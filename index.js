const childProc = require('child_process');

(async() => {
    let times = [];
    let children = [];
    let method = 'GET';
    let path = '/user';
    let url = '6164482fb55edc00175c1e7c.mockapi.io';
    for (let i = 0; i < 5; i++) {
        let childProcess = childProc.spawn("node", ["engine/tester.js", `--method=${method}`, `--url=${url}`, `--path=${path}`]);
        children.push(childProcess);
    }
    let responses = children.map(function wait(child) {
        return new Promise((resolve, reject) => {
            child.stdout.on('data', (data) => {
                times.push(JSON.parse(data));
            })
            child.on('exit', (code) => {
                if (code == 0) {
                    resolve(true);
                } else {
                    reject(false);
                }
            })
        })
    })
    responses = await Promise.all(responses);
    if (responses.filter(Boolean).length == responses.length) {
        console.log(times);
        console.log("success!");
    } else {
        console.log("failures!");
    }
})()