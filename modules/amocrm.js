const AmoCRM = require('amocrm-js')
const amo = new AmoCRM({
    domain: process.env.AMOCRM_DOMAIN,
    auth: {
        login: process.env.AMOCRM_LOGIN,
        hash: process.env.AMOCRM_HASH
    }
})
  
const getContact = async (req = {}) => {
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

const addContact = async (req = {}) => {
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

const checkContact = async (req = {}) => {
    return getContact(req).then(contact => {
        console.log(contact)
        if (Object.entries(contact).length !== 0 && contact.constructor === Object) {
            return contact._embedded.items[0].id
        } else {
            return addContact(req).then(contact => {
                return contact._response._embedded.items[0].id
            })
        }
    })
}
module.exports.checkContact = checkContact

const addLead = async (req = {}) => {
    console.log('addLead request: '.req)
    return checkContact(req).then(id => {
        return amo.Lead.insert([
            {
                name: req.subj,
                contacts_id: id,
                tags: [344723]
            }
        ])
    })
}
module.exports.addLead = addLead
