const axios = require('axios');
const moment = require('moment');
const _ = require('underscore');

axios.interceptors.request.use(function(config) {
    config.time = {
        reqTime: moment(new Date())
    }
    return config;
}, function(error) {
    console.error('ERROR')
    console.log(error);
})

axios.interceptors.response.use(function(response) {
    _.extend(response.config.time, { resTime: moment(new Date()) })
    return response;
}, function(error) {
    console.error('ERROR')
    console.log(error);
    return error;
})

function triggerUrl(method, url) {
    this.method = method;
    this.url = url;
    return new Promise((resolve, reject) => {
        axios[method](url)
            .then((response) => {
                resolve({
                    timeTaken: moment.duration(response.config.time.resTime.diff(response.config.time.reqTime)).asMilliseconds(),
                    success: true
                })
            })
            .catch((err) => {
                console.log(`${err} some error occured`);
                reject({
                    success: false
                })
            })
    })
}

module.exports = {
    triggerUrl
}