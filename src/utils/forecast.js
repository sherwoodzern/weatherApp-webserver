const request = require('postman-request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fbd47e73069bd0d18a6baba2ef684e21&query=' + latitude + ',' + longitude +'&units=f';
    request({url: url, json: true }, (error, response) => {

        if (error) {
            callback("unable to connect to the weather stack", undefined);
        } else if (response.body.success === false) {
            var err = response.body.error;
            callback("code: " + err.code + " type: " + err.type + " info: " + err.info, undefined);
        } else {
        const current = response.body.current;
        if (!current) {
            callback("Unable to access the weather service. Try again later", undefined);
        }
        callback(undefined, {
            temperature: current.temperature,
            feelslike: current.feelslike, 
            });
        }
    });
}

module.exports = forecast;