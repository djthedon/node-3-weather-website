const request = require('request') 
const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + adress + '.json?access_token=pk.eyJ1IjoiZGlieWExMjMiLCJhIjoiY2toZXhoNnA4MGFtczJ0cGw3b3l0YzMyYiJ9.gENsj9lf4XeZPs7ywfmqGQ&limit=1'
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to location service', undefined)
        }
        else if (response.body.features == 0){
            callback('Unable to find another location Try another search.', undefined)
        }
        else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode