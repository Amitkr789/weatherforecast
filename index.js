const path = require('path');
const express = require('express');
const hbs = require('hbs');
require('events');
const requests = require('requests');
const app = express();
require('./connection');
const port = 1300;
const PartialPath = path.join(__dirname, '/partilas');
hbs.registerPartials(PartialPath);
app.set('view engine', 'hbs');
app.get('/weather', (req, res) => {
    const ques = req.query;
    console.log(ques);
    requests(
        `https://api.openweathermap.org/data/2.5/weather?q=Durgapur&appid=ce3d9c1a9c5ede78caa89ea4603e0473`,
    ).on('data', (chunk) => {
        const ObjData = JSON.parse(chunk);
        const Objarr = [ObjData];
        const temp = Objarr[0].main.temp - 273.15;
        const min = Objarr[0].main.temp_min - 273.15;
        const max = Objarr[0].main.temp_min - 273.15;
        const city = Objarr[0].name;
        console.log(city);
        res.render('weather', {
            temper: temp.toFixed(2),
            mintemp: min.toFixed(2),
            maxtemp: max.toFixed(2),
            cityname: city,
        });
    }).on('end', (err) => {
        if (err) return console.log(err);
        console.log('end');
    });
});
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/', (req, res) => {
    res.render('index');
});
app.listen(port, () => {
    console.log(`Port ${port} is running`);
});