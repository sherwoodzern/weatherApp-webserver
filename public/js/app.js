const weatherForm = document.querySelector('form')
const search      = document.querySelector('input')
const place       = document.querySelector('#place')
const result      = document.querySelector('#result')
const description = document.querySelector('#description')
const windspeed   = document.querySelector('#windspeed')
const winddirection = document.querySelector('#winddirection')
const humidity      = document.querySelector('#humidity')
const precipitation = document.querySelector('#precipitation')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value
    place.textContent = 'Loading..........'
    
    fetch('https://129.146.65.194/weather?address='+ location)
        .then(handleResponse)
        .then((data) => {
            if (data.error) {
                place.textContent = ''
                result.textContent = data.error
            } else {
                console.log(data)
                place.textContent = data.geo
                result.textContent = new String(
                    'Temperature: ' + data.forecast.temperature + 
                    ' Feels Like: ' + data.forecast.feelslike) 
                description.textContent = data.forecast.description
                windspeed.textContent = data.forecast.windspeed
                winddirection.textContent = data.forecast.winddirection
                humidity.textContent = data.forecast.humidity
                precipitation.textContent = data.forecast.precipitation
                }
            })
        .catch(error => console.log("Error: " + error));
})

function handleResponse (response) {
    return response.json()
        .then(json => {
            if (response.ok) {
                return json
            } else {
                return Promise.reject(Object.assign({}, json, {
                    status: response.status,
                    statusText: response.statusText
                }))
            }
        })
}

function clearPage() {
    result.textContent = ''
    description.textContent = ''
    windspeed.textContent = ''
    winddirection.textContent = ''
    humidity.textContent = ''
    precipitation.textContent = ''
}
