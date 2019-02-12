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
const AmoCRM = require('amocrm-js')
const crm = new AmoCRM({
    domain: process.env.AMOCRM_DOMAIN,
    auth: {
        login: process.env.AMOCRM_LOGIN,
        hash: process.env.AMOCRM_HASH
    }
})

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



    // amocrm send
    var phone = Number(req.body.phone.replace(/\D+/g,""))
    var name = (req.body.name) ? req.body.name : 'Без имени'
    var email = (req.body.email) ? req.body.email : false
    var insert_contact_data = {}
        insert_contact_data.name = name
        insert_contact_data.custom_fields = []
        insert_contact_data.custom_fields.push( { id: 74913, values: [{ value: phone, enum: 154761 }] } )
        if (email) {
            insert_contact_data.custom_fields.push( { id: 74915, values: [ { value: req.body.email, enum: 154773 } ] } )
        }

    // console.log(req.body.email)
    // console.log(insert_contact_data)

    crm.connect().then((data) => {
        var contacts_id = false
        crm.request.get( '/api/v2/contacts', {
            query: phone
        }).then( data => {
            if (Object.keys(data).length == 0) {
                crm.Contact.insert([ insert_contact_data ]).then( data => {
                    contacts_id = data._response._embedded.items[0].id

                    crm.Lead.insert([
                        {
                            name: "ТЕСТ",
                            contacts_id: contacts_id
                        }
                    ]).then( data => {

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
                            console.log(body)
                            res.send(true)
                        })

                    })
                })                    
            } else {
                contacts_id = data._embedded.items[0].id

                crm.Lead.insert([
                    {
                        name: "ТЕСТ",
                        contacts_id: contacts_id
                    }
                ]).then( data => {

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
                        console.log(body)
                        res.send(true)
                    })
                

                })

            }
        })
    })


})


app.get('/amocrm', (req, res, next) => {

    // crm.connect().then((data) => {
    //     // crm.request.get( '/api/v2/account' ).then( data => {
    //     //     console.log( 'Полученные данные', data )
    //     // }).catch( e => {
    //     //     console.log( 'Произошла ошибка', e )
    //     // })
    
    //     crm.request.get( '/api/v2/contacts', {
    //         id: '8144077',
    //         // 'custom_fields': '79876523070'
    //         // 74913: '79876523070'
    //     }).then( data => {
    //         data._embedded['items'].forEach(element => {
    //             res.json(element)
    //             // console.log(element.custom_fields)
    //         })
            
    //         // console.log(data._links)
    //         // console.log(data._embedded['items'])
    //         // return false
    //         // console.log( 'Полученные данные', data )
    //     }).catch( e => {
    //         console.log( 'Произошла ошибка', e )
    //     })
    
    
    //     // crm.request.get( '/api/v2/contacts', { id: 8144077 } ).then( data => {
    //     //     console.log(data._links)
    //     //     data._embedded['items'].forEach(element => {
    //     //         console.log(element.custom_fields)
    //     //     })
    //     //     // console.log(data._embedded['items'])
    //     //     // return false
    //     //     // console.log( 'Полученные данные', data )
    //     // }).catch( e => {
    //     //     console.log( 'Произошла ошибка', e )
    //     // })
    
        
    // })
    
    



    // res.send(200)

    // console.log(crm)

    // crm.connect().catch(next)

    // crm.request.get( '/api/v2/account' ).then( data => {
    //     console.log( 'Полученные данные', data );
    // }).catch( e => {
    //     console.log( 'Произошла ошибка', e );
    // })

    // res.json(111)
     
    // crm.connect().catch(next)
    
    // amoClient.auth(process.env.AMOCRM_DOMAIN, process.env.AMOCRM_LOGIN, process.env.AMOCRM_HASH).then(function (data) {
        // console.log(data)
        // res.send(true)
        // if (res.auth === true) {
        //     amoClient.addLeads([{name: 'Test'}]).then(function (leadsIds) {
        //         console.log('leadsIds: ', leadsIds)
        //         if (leadsIds[0] && leadsIds[0].id) {
        //             amoClient.listLeads({id: leadsIds[0].id}).then(function (leads) {
        //                 console.log('lead: ', leads[0])
        //             })
        //         }
        //     })
        // }
    // }).catch(next)

    
    
    // amoClient.auth(process.env.AMOCRM_DOMAIN, process.env.AMOCRM_LOGIN, process.env.AMOCRM_HASH).then(function (res) {
        // res.send(res)
        // console.log('auth res: ', res)
        // if (res.auth === true) {
        //     amoClient.addLeads([{name: 'Test'}]).then(function (leadsIds) {
        //         console.log('leadsIds: ', leadsIds)
        //         if (leadsIds[0] && leadsIds[0].id) {
        //             amoClient.listLeads({id: leadsIds[0].id}).then(function (leads) {
        //                 console.log('lead: ', leads[0])
        //             })
        //         }
        //     })
        // }
    // })
    

    

})

app.get('/amocrm/contact/add', (req, res) => {
    crm.connect().then((data) => {
        crm.Contact.insert([
            {
                name: "Тестовый контакт",
                custom_fields: [
                    {
                        id: "74913",
                        values: [
                            {
                                value: "79037876601",
                                enum: "154761"
                            }                        
                        ]
                    }
                ]
            }
        ]).then( data => {
            res.json(data)
        })
    })
})

app.get('/amocrm/contact/:id', (req, res) => {
    crm.connect().then((data) => {
        crm.request.get( '/api/v2/contacts', {
            id: Number(req.params.id)
        }).then( data => {
            res.json(data)
        }).catch( e => {
            console.log( 'Произошла ошибка', e )
        })
    })
})

app.get('/amocrm/contact/find/:phone', (req, res) => {
    // Тестовый телефон имеющийся в базе 79876523070
    crm.connect().then((data) => {
        crm.request.get( '/api/v2/contacts', {
            query: req.params.phone
        }).then( data => {
            res.json(data)
        }).catch( e => {
            console.log( 'Произошла ошибка', e )
        })
    })
})

app.get('/amocrm/lead/add', (req, res) => {
    crm.connect().then((data) => {
        crm.Lead.insert([
            {
                name: "ТЕСТ"
            }
        ]).then( data => {
            res.json(data)
        })
    })
})



app.listen(process.env.PORT, () => {
    console.log('Server is running...')
})
