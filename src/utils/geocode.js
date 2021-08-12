const request = require('postman-request');

const apiKey = process.env.MAPBOX_API_KEY;
const geocode = (address, callback) => {
    const geocode = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=' + apiKey + '&limit=1'

    request({url: geocode, json: true}, (error, response) => {
        if (error) {
            callback("Unable to connect to geocode server", undefined)
        } else if (response.body.features.length === 0) {
            callback("Unable to find location. Try Another Service", undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;