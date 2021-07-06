const weatherForm = document.querySelector('form')
const search      = document.querySelector('input')
const place       = document.querySelector('#place')
const result      = document.querySelector('#result')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value
    place.textContent = 'Loading..........'
    result.textContent = ''
    fetch('https://129.146.65.194/weather?address='+ location)
        .then(handleResponse)
        .then((data) => {
            if (data.error) {
                place.textContent = ''
                result.textContent = data.error
            } else {
                place.textContent = data.geo
                result.textContent = new String('Temperature: ' + data.forecast.temperature + ' Feels Like: ' + data.forecast.feelslike) 
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
