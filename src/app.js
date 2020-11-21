const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const ap = express()
const port = process.env.PORT || 3000

//Define the path for Express config
const publicpath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
ap.set('view engine', 'hbs')
ap.set('views', viewspath)
hbs.registerPartials(partialspath)

//Setup static directory to serve
ap.use(express.static(publicpath))

ap.get('', (req, res) => {
   res.render('index',{
       title: 'Weather app',
       name: 'Dibyajyoti'
   })
})

ap.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Dibyajyoti Sahoo'
    })
})

ap.get('/help', (req, res) =>{
    res.render('help',{
        helptext: 'This is some helpful test',
        title: 'help',
        name: 'Dibyajyoti Sahoo'
    })
})

ap.get('/weather', (req, res) =>{
    if(!req.query.adress){
        return res.send({
            error: 'You must provide an adress!'
        })
    }

    geocode(req.query.adress, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location: location,
                forecast: forecastData
            })
        })
    })

    // res.send({
    //     forecast: "It is snowing",
    //     location: "new Delhi"
    // })
})

ap.get('/products', (req, res) =>{
    if(!req.query.search){
        res.send({
            error: "You must provide a search term"
        })
    }
    else{
        console.log(req.query.search)
        res.send({
        products:[]
        })
    }
})
ap.get('/help/*', (req, res) =>{
    res.send("help not found")
})

ap.get('*',(req, res) => {
    res.render('404',{
        title: '404',
        name: 'Dibyajyoti Sahoo',
        errorMessage: 'Page not found'
    })
})
ap.listen(port, () => {
    console.log('Server is up on port' + port)
})