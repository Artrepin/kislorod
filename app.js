const express = require('express')
const app = express()
const pug = require('pug')
app.set('view engine', 'pug')
app.use(express.static('public'));
require('dotenv').config()
app.locals.env = process.env;

app.use('/vue', express.static(__dirname + '/node_modules/vue/dist'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'))
app.use('/jquery-ui', express.static(__dirname + '/node_modules/jquery-ui/ui'))

const data = {}

app.get('/', (req, res) => {
    data.title = "Кислород"
    res.render('welcome/welcome', data)
})

app.listen(process.env.PORT, () => {
    console.log('Server is running...')
})
