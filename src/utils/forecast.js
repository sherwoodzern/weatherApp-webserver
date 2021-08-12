const request = require('postman-request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=<weatherstack API Key>' + latitude + ',' + longitude +'&units=f';
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
        var descriptions = current.weather_descriptions;
        callback(undefined, {
            temperature: current.temperature,
            feelslike: current.feelslike,
            description: descriptions[0],
            windSpeed: descriptions.wind_speed,
            windDirection: descriptions.wind_dir,
            precipitation: descriptions.precip,
            humidity: descriptions.humidity,
            precipitation: descriptions.precip,
            });
        }
    });
}

module.exports = forecast;