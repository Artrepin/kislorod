const express = require('express')
const app = express()
const pug = require('pug')
app.set('view engine', 'pug')
app.use(express.static('public'))
require('dotenv').config()
app.locals.env = process.env;
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const amocrm = require('./amocrm')

var month_rus = [
    ['январь'],
    ['февраль'],
    ['март'],
    ['апрель'],
    ['май'],
    ['июнь'],
    ['июль'],
    ['август'],
    ['сентябрь'],
    ['октябрь'],
    ['ноябрь'],
    ['декабрь'],
]

app.use('/vue', express.static(__dirname + '/node_modules/vue/dist'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'))
app.use('/jquery-ui', express.static(__dirname + '/node_modules/jquery-ui/ui'))

const data = {}

app.get('/', (req, res) => {
    data.title = "Центр недвижимости «Кислород»"
    data.current_month = month_rus[new Date().getMonth()][0]
    data.current_year = new Date().getFullYear()
    res.render('welcome/welcome', data)
})

app.get('/catalog', (req, res) => {
    data.title = "Каталог недвижимости"
    res.render('catalog/catalog', data)
})

app.get('/about', (req, res) => {
    data.title = "О центре недвижимости «Кислород»"
    res.render('about/about', data)
})

app.get('/partner', (req, res) => {
    data.title = "Наши партнеры"
    res.render('partner/partner', data)
})

app.post('/send', (req, res) => {

    var output = "<h3>Данные заявки:</h3>"

    if (req.body.subj) output+= "<p>Тема: " + req.body.subj + "</p>"
    if (req.body.message) output+= "<p>Сообщение: " + req.body.message + "</p>"
    if (req.body.name) output+= "<p>Имя: " + req.body.name + "</p>"
    if (req.body.phone) output+= "<p>Телефон: " + req.body.phone + "</p>"
    if (req.body.call) output+= "<p>call: " + req.body.call + "</p>"
    if (req.body.call2) output+= "<p>call2: " + req.body.call2 + "</p>"
    if (req.body.email) output+= "<p>Email: " + req.body.email + "</p>"
    if (req.body.ask) output+= "<p>ask: " + req.body.ask + "</p>"
    if (req.body.quiz) output+= "<p>quiz: " + req.body.quiz + "</p>"

    if (req.body.type) output+= "<p>Выберите тип недвижимости: " + req.body.type + "</p>"
    if (req.body.target) output+= "<p>Для каких целей планируете покупку?: " + req.body.target + "</p>"
    if (req.body.location) output+= "<p>Какое расположение ЖК рассматриваете?: " + req.body.location + "</p>"
    if (req.body.budget) output+= "<p>На какой бюджет рассчитываете?: " + req.body.budget + "</p>"
    if (req.body.kredit) output+= "<p>Нужна ли рассрочка или ипотека?: " + req.body.kredit + "</p>"

    var amoData = {}
    if (req.body.subj) { amoData.subj = req.body.subj }
    if (req.body.name) { amoData.name = req.body.name }
    if (req.body.phone) { amoData.phone = req.body.phone }
    if (req.body.email) { amoData.email = req.body.email }

    amocrm.addLead(amoData).then((status) => {
        var mailgun = require('mailgun-js')({
            apiKey: process.env.MAILGUN_APIKEY,
            domain: process.env.MAILGUN_DOMAIN
        })
    
        var data = {
            from: process.env.MAILGUN_MAILFROM,
            to: process.env.MAILGUN_MAILTO,
            subject: 'Обращение с сайта kislorod123.ru',
            text: 'Обращение с сайта kislorod123.ru',
            html: output
        }
    
        mailgun.messages().send(data, function (error, body) {
            res.send(true)
        })
    })

})

app.listen(process.env.PORT, () => {
    console.log('Server is running...')
})
