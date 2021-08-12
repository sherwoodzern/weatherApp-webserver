const path     = require('path');
const express  = require('express');
const hbs      = require('hbs');
const geocode  = require('./utils/geocode');
const forecast = require('./utils/forecast');
const https    = require('https');
const fs       = require('fs');


const app = express();

const keyFile = process.env.PATH_TO_SSL_CERTIFICATE_PRIVATE_KEY_FILE;
const fullchain = process.env.PATH_TO_SSL_CERTIFICATE_FILE;

const options = {
    
    key: fs.readFileSync(keyFile),
    cert: fs.readFileSync(fullchain)
    //key: fs.readFileSync('/etc/letsencrypt/live/ic6.gmelo.us/privkey.pem'),
    //cert: fs.readFileSync('/etc/letsencrypt/live/ic6.gmelo.us/fullchain.pem')
 };

// Define paths for Express config
var publicDirectoryPath = path.join(__dirname, '../public');
var viewsPath = path.join(__dirname, '../templates/views');
var partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sherwood Zern'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Help is only a click away',
        name: 'Sherwood Zern'
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sherwood Zern'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({error})
        }
        forecast(data.latitude,data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                geo:  data.location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error Page',
        status: 404,
        message: 'Help page not found',
        name: 'Sherwood Zern'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error Page',
        status: 404,
        message: 'Requested Page Not Found',
        name: 'Sherwood Zern'
    })
})

/*app.listen(3000, () => {
    console.log("Server is up and running on port 3000")
})*/

https.createServer(options, app).listen(3000);