const AmoCRM = require('amocrm-js')

const newAmo = async () => {
    return new AmoCRM({
        domain: process.env.AMOCRM_DOMAIN,
        auth: {
            login: process.env.AMOCRM_LOGIN,
            hash: process.env.AMOCRM_HASH
        }
    })    
}
module.exports.newAmo = newAmo

const getContact = async (req = {}, amo) => {
    if (req.id) {
        var query = { id: req.id }
    } else if (req.phone) {
        var query = { query: Number(req.phone.replace(/\D+/g,"")) }
    } else {
        return false
    }
    return amo.connect().then((status) => {
        return amo.request.get( '/api/v2/contacts', query)
    })
}
module.exports.getContact = getContact

const addContact = async (req = {}, amo) => {
    var query = {}
        query.name = (req.name) ? req.name : 'Без имени'
    if ( req.phone || req.email ) {
        query.custom_fields = []
    }
    if ( req.phone ) {
        query.custom_fields.push({
            id: 74913,
            values: [
                {
                    value: Number(req.phone.replace(/\D+/g,"")),
                    enum: 154761
                }
            ]
        })
    }
    if ( req.email ) {
        query.custom_fields.push({
            id: 74915,
            values: [
                {
                    value: req.email,
                    enum: 154773
                }
            ]
        })
    }
    return amo.connect().then((status) => {
        return amo.Contact.insert([query]).then( data => {
            return data
        })
    })
}
module.exports.addContact = addContact

const checkContact = async (req = {}, amo) => {
    return getContact(req, amo).then(contact => {
        console.log('checkContact: ', contact)
        if (contact && Object.entries(contact).length !== 0 && contact.constructor === Object) {
            return contact._embedded.items[0].id
        } else {
            return addContact(req, amo).then(contact => {
                return contact._response._embedded.items[0].id
            })
        }
    })
}
module.exports.checkContact = checkContact

const addLead = async (req = {}) => {
    return newAmo().then((amo) => {
        return checkContact(req, amo).then(id => {
            return amo.Lead.insert([
                {
                    name: req.subj,
                    contacts_id: id,
                    tags: [344723]
                }
            ])
        })
    })
}
module.exports.addLead = addLead

// Пример вызова из файла app.js. Убрали, так как сдедлали добавление в раздел Неразобранное
// 
// var amoData = {}
// if (req.body.subj) { amoData.subj = req.body.subj }
// if (req.body.name) { amoData.name = req.body.name }
// if (req.body.phone) { amoData.phone = req.body.phone }
// if (req.body.email) { amoData.email = req.body.email }
// 
// amocrm.addLead(amoData).then((status) => {
//     var mailgun = require('mailgun-js')({
//         apiKey: process.env.MAILGUN_APIKEY,
//         domain: process.env.MAILGUN_DOMAIN
//     })
//     var data = {
//         from: process.env.MAILGUN_MAILFROM,
//         to: process.env.MAILGUN_MAILTO,
//         subject: 'Обращение с сайта kislorod123.ru',
//         text: 'Обращение с сайта kislorod123.ru',
//         html: output
//     }
//     mailgun.messages().send(data, function (error, body) {
// 
//     })
// })
