const express = require('express')
const app = express()
const pug = require('pug')
app.set('view engine', 'pug')
app.use(express.static('public'))
require('dotenv').config()
app.locals.env = process.env;
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const nodemailer = require("nodemailer")

app.use('/vue', express.static(__dirname + '/node_modules/vue/dist'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'))
app.use('/jquery-ui', express.static(__dirname + '/node_modules/jquery-ui/ui'))

const data = {}

app.get('/', (req, res) => {
    data.title = "Кислород"
    res.render('welcome/welcome', data)
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

    let smtpTransport;
    
    try {
        smtpTransport = nodemailer.createTransport({
            host: 'smtp.yandex.ru',
            port: 465,
            secure: true,
            auth: {
                user: "kislorod123.ru@yandex.ru",
                pass: process.env.EMAIL_PASS
            }
        })
    } catch (e) {
        return console.log('Error: ' + e.name + ":" + e.message)
    }
    
    let mailOptions = {
        from: 'kislorod123.ru@yandex.ru',
        to: 'info@kislorod123.ru, vlasova@kislorod123.ru',
        subject: 'Обращение с сайта kislorod123.ru',
        text: 'Обращение с сайта kislorod123.ru',
        html: output
    }
    
    smtpTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
            // return console.log('Error');
        } else {
            // console.log('Message sent: %s', info.messageId);
            // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }
        // res.render('feed-ok', {msg: 'В ближайшее время мы с Вами свяжемся и ответим на все вопросы'});
    })

    res.send(true)
})

app.listen(process.env.PORT, () => {
    console.log('Server is running...')
})
