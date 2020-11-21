const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1486bd125117e72a2a3e39b8896323fb&query=' + latitude + ',' + longitude + '&units=f'
    request({url, json: true}, (error, { body }) => {
        if (error){
            callback('Not able to acess the api', undefined)
        }
        else if (body.error){
            callback('Unable to find location', undefined)
        }
        else{
            
            callback(undefined, 'it is ' + body.current.weather_descriptions[0] + ' and the temprature is ' + body.current.temperature + 'It feels like ' + body.current.feelslike)
        }
    })
}

module.exports = forecast