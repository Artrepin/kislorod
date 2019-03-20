const express = require('express')
const app = express()
const pug = require('pug')
const fs = require('fs')
const config = require('config')
require('dotenv').config()
app.set('view engine', 'pug')
app.use(express.static('public'))
app.locals.env = process.env;
const bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
// const amocrm = require('./modules/amocrm')
const multer = require('multer')
const sharp = require('sharp')

const Building = require('./models').Building
const Advantage = require('./models').Advantage
const Stage = require('./models').Stage
const Type = require('./models').type
const Plan = require('./models').plan
const plan_image = require('./models').plan_image
const Apartament = require('./models').apartament
const People = require('./models').people
const Department = require('./models').department

var Recaptcha = require('express-recaptcha').Recaptcha;
var options = {
    theme: 'light',
    callback: 'RecaptchaSuccess',
    hl: 'ru'
}
var recaptcha = new Recaptcha(process.env.RECAPTCHA_PUBLIC, process.env.RECAPTCHA_SECRET, options);


function randomString() {
    var text = ""
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (var i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

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
app.use('/axios', express.static(__dirname + '/node_modules/axios/dist'))
app.use('/vue-router', express.static(__dirname + '/node_modules/vue-router/dist'))
app.use('/vue-picture-input', express.static(__dirname + '/node_modules/vue-picture-input/umd'))
app.use('/vuejs-datepicker', express.static(__dirname + '/node_modules/vuejs-datepicker/dist'))
app.use('/iconfont', express.static(__dirname + '/node_modules/material-design-icons/iconfont/'))

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'))
// app.use('/bootstrap-vue', express.static(__dirname + '/node_modules/bootstrap-vue/dist'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'))
app.use('/jquery-ui', express.static(__dirname + '/node_modules/jquery-ui/ui'))

app.use('/feather-icons', express.static(__dirname + '/node_modules/feather-icons/dist'))

const data = {}

app.get('/', recaptcha.middleware.render, (req, res) => {
    data.title = "Центр недвижимости «Кислород»"
    data.description = "Агентство элитной недвижимости в городе Сочи"
    data.current_month = month_rus[new Date().getMonth()][0]
    data.current_year = new Date().getFullYear()
    data.buildings = []
    data.captcha = res.recaptcha
    res.render('welcome/welcome', data)
})

app.get('/catalog', recaptcha.middleware.render, async (req, res) => {
    data.title = "Каталог недвижимости"
    data.description = "Агентство элитной недвижимости в городе Сочи"
    data.captcha = res.recaptcha
    res.render('catalog/catalog', data)
})
app.post('/catalog/init', async (req, res) => {

    var nowYear = new Date().getFullYear()

    var data = {
        filters: {
            price: {
                min: Math.floor(await Apartament.min('iApartamentPrice')/1000000),
                max: Math.ceil(await Apartament.max('iApartamentPrice')/1000000)
            },
            area: {
                min: Math.floor(await Plan.min('fPlanArea')),
                max: Math.ceil(await Plan.max('fPlanArea'))
            },
            floor: {
                min: Math.floor(await Apartament.min('iApartamentFloor')),
                max: Math.ceil(await Apartament.max('iApartamentFloor'))
            },
            room: {
                min: Math.floor(await Plan.min('iRoomCount')),
                max: Math.ceil(await Plan.max('iRoomCount'))
            },
            year: [
                {
                    title: 'Не важно',
                    value: 0
                },
                {
                    title: 'Сдача в ' + nowYear + ' году',
                    value: nowYear
                },
                {
                    title: 'Сдача в ' + ++nowYear + ' году',
                    value: nowYear
                },
                {
                    title: 'Сдача в ' + ++nowYear + ' году',
                    value: nowYear
                },
            ]
        }
    }

    data.selected = {}
    data.selected.price = data.filters.price.max
    data.selected.area = data.filters.area.max
    data.selected.floor = data.filters.floor.max
    data.selected.room = data.filters.room.max
    data.selected.year = data.filters.year[0].value

    res.json(data)
})
app.post('/catalog/building', async (req, res) => {
    const Sequelize = require('sequelize')
    const Op = Sequelize.Op

    var dBuildingReady = {}
    if (req.body.selected.year) {
        dBuildingReady = {
            dBuildingReady: {
                [Op.gte]: req.body.selected.year + '-01-01',
                [Op.lte]: req.body.selected.year + '-12-31'
            }
        }
    }

    var data = {}
        data.buildings = await Building.findAll({
            where: dBuildingReady,
            include: [
                {
                    model: Advantage
                },{
                    model: Stage
                }, {
                    model: Plan,
                    required: true,
                    where: {
                        fPlanArea: {
                            [Op.lte]: req.body.selected.area
                        },
                        iRoomCount: {
                            [Op.lte]: req.body.selected.room
                        }
                    },
                    include: [
                        {
                            model: Apartament,
                            required: true,
                            where: {
                                iApartamentPrice: {
                                    [Op.lte]: (req.body.selected.price*1000000)
                                },
                                iApartamentFloor: {
                                    [Op.lte]: req.body.selected.floor
                                }
                            }
                        },
                        {
                            model: plan_image,
                            require: true
                        }
                    ]
                }
            ]
        })
    res.json(data)
})

app.get('/about', recaptcha.middleware.render, (req, res) => {
    data.title = "О центре недвижимости «Кислород»"
    data.description = "Агентство элитной недвижимости в городе Сочи"
    data.captcha = res.recaptcha
    res.render('about/about', data)
})

app.get('/partner', recaptcha.middleware.render, (req, res) => {
    data.title = "Наши партнеры"
    data.description = "Агентство элитной недвижимости в городе Сочи"
    data.captcha = res.recaptcha
    res.render('partner/partner', data)
})

app.post('/send', recaptcha.middleware.verify, (req, res) => {

    if (!req.recaptcha.error) {
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

        var request = require('request')

        var custom_fields_phone = {}
        if (req.body.phone) {
            custom_fields_phone.id = 74913
            custom_fields_phone.values = []
            custom_fields_phone.values.push({
                value: Number(req.body.phone.replace(/\D+/g,"")),
                enum: "WORK"
            })
        }

        var custom_fields_email = {}
        if (req.body.email) {
            custom_fields_email.id = 74915
            custom_fields_email.values = []
            custom_fields_email.values.push({
                value: req.body.email,
                enum: "WORK"
            })
        }

        var amoDataJson = {
            json: {
                add: [
                    {
                        source_name: (req.body.subj) ? req.body.subj : "Тема обращения отсутсвует",
                        created_at: new Date().getTime(),
                        incoming_entities: {
                            leads: [
                                {
                                    name: (req.body.subj) ? req.body.subj : "Тема обращения отсутсвует",
                                }
                            ],
                            contacts: [
                                {
                                    name: (req.body.name) ? req.body.name : "Имя не указано",
                                    custom_fields: [ custom_fields_phone, custom_fields_email ]
                                }
                            ]
                        },
                        incoming_lead_info: {
                            form_id: "1",
                            form_page: "http://kislorod123.ru",
                        }
                    }
                ]
            }
        }

        request.post('https://' + process.env.AMOCRM_DOMAIN + '.amocrm.ru/api/v2/incoming_leads/form?login=' + process.env.AMOCRM_LOGIN + '&api_key=' + process.env.AMOCRM_HASH + '&', amoDataJson, function (error, response, body) {
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

            })
        })

    }
    res.json(true)
})

























app.get('/admin', (req, res) => {
    res.render('admin', data)
})

app.post('/admin/BuildingList', async (req, res) => {
    res.json({
        buildings: await Building.paginate({
            page: (req.body.p) ? req.body.p : 1,
            paginate: 4
        })
    })
})
app.post('/admin/BuildingEdit', async (req, res) => {
    res.json({
        building: await Building.getBuildingItem(req.body.iBuildingID),
        type: await Type.findAll()
    })
})
app.post('/admin/BuildingUpdate', async (req, res) => {
    var iBuildingID = (req.body.building.iBuildingID) ? req.body.building.iBuildingID : false

    if (iBuildingID) {
        await Building.update(req.body.building, {
            where: {
                iBuildingID: iBuildingID
            }
        })
    } else {
        await Building.create(req.body.building).then((response) => {
            iBuildingID = response.iBuildingID
        })
    }


    const advantageUpdate = async () => {
        if (req.body.building.Advantages) {
            const advantages = req.body.building.Advantages
            for (const advantage of advantages) {
                if (advantage.iAdvantageID && advantage.del === true) {
                    await Advantage.destroy({
                        where: {
                            iAdvantageID: advantage.iAdvantageID
                        }
                    })
                } else if (advantage.iAdvantageID) {
                    await Advantage.update({
                        sAdvantageTitle: advantage.sAdvantageTitle
                    }, {
                        where: {
                            iAdvantageID: advantage.iAdvantageID
                        }                    
                    })
                } else if (advantage.del !== true) {
                    await Advantage.create({
                        iBuildingID: iBuildingID,
                        sAdvantageTitle: advantage.sAdvantageTitle
                    })
                }
            }
        }
    }
    await advantageUpdate()


    const stageUpdate = async () => {
        if (req.body.building.Stages) {
            const stages = req.body.building.Stages
            for (const stage of stages) {
                if (stage.iStageID && stage.del === true) {
                    await Stage.destroy({
                        where: {
                            iStageID: stage.iStageID
                        }
                    })
                } else if (stage.iStageID) {
                    await Stage.update({
                        sStageImage: stage.sStageImage,
                        tStageDesc: stage.tStageDesc,
                        dStageDate: stage.dStageDate
                    }, {
                        where: {
                            iStageID: stage.iStageID
                        }                    
                    })
                } else if (stage.del !== true) {
                    await Stage.create({
                        iBuildingID: iBuildingID,
                        sStageImage: stage.sStageImage,
                        tStageDesc: stage.tStageDesc,
                        dStageDate: stage.dStageDate
                    })
                }
            }
        }
    }
    await stageUpdate()


    const planImageUpdate = async (images, iPlanID) => {
        for (const image of images) {
            if (image.iPlanImageID && image.del === true) {
                await plan_image.destroy({
                    where: {
                        iPlanImageID: image.iPlanImageID
                    }
                })
            } else if (image.iPlanImageID) {
                await plan_image.update({
                    sPlanImage: image.sPlanImage
                }, {
                    where: {
                        iPlanImageID: image.iPlanImageID
                    }                    
                })
            } else if (image.del !== true) {
                await plan_image.create({
                    iPlanID: iPlanID,
                    sPlanImage: image.sPlanImage
                })
            }
        }        
    }
    const planUpdate = async () => {
        if (req.body.building.plans) {
            const plans = req.body.building.plans
            for (const plan of plans) {
                var iPlanID = (plan.iPlanID) ? plan.iPlanID : false
                if (iPlanID && plan.del === true) {
                    await Plan.destroy({
                        where: {
                            iPlanID: iPlanID
                        }
                    })
                } else if (iPlanID) {
                    await Plan.update({
                        iBuildingID: plan.iBuildingID,
                        iTypeID: plan.iTypeID,
                        iRoomCount: plan.iRoomCount,
                        sPlanName: plan.sPlanName,
                        fPlanArea: plan.fPlanArea,
                    }, {
                        where: {
                            iPlanID: iPlanID
                        }                    
                    })
                } else if (plan.del !== true) {
                    var newplan = await Plan.create({
                        iBuildingID: iBuildingID,
                        iTypeID: plan.iTypeID,
                        iRoomCount: plan.iRoomCount,
                        sPlanName: plan.sPlanName,
                        fPlanArea: plan.fPlanArea,
                    })
                    iPlanID = newplan.iPlanID
                }
                await planImageUpdate(plan.plan_images, iPlanID)
            }
        }
    }
    await planUpdate()


    const apartamentUpdate = async () => {
        if (req.body.building.apartaments) {
            const apartaments = req.body.building.apartaments
            for (const apartament of apartaments) {
                if (apartament.iApartamentID && apartament.del === true) {
                    await Apartament.destroy({
                        where: {
                            iApartamentID: apartament.iApartamentID
                        }
                    })
                } else if (apartament.iApartamentID) {
                    await Apartament.update({
                        iApartamentNum: apartament.iApartamentNum,
                        iApartamentFloor: apartament.iApartamentFloor,
                        iApartamentPrice: apartament.iApartamentPrice,
                        iPlanID: apartament.iPlanID,
                    }, {
                        where: {
                            iApartamentID: apartament.iApartamentID
                        }                    
                    })
                } else if (apartament.del !== true) {
                    await Apartament.create({
                        iBuildingID: iBuildingID,
                        iApartamentNum: apartament.iApartamentNum,
                        iApartamentFloor: apartament.iApartamentFloor,
                        iApartamentPrice: apartament.iApartamentPrice,
                        iPlanID: apartament.iPlanID,
                    })
                }
            }
        }
    }
    await apartamentUpdate()


    res.json(await Building.getBuildingItem(iBuildingID))
})
app.post('/admin/BuildingRemove', async (req, res) => {
    Building.destroy({
        where: {
            iBuildingID: req.body.building.iBuildingID,
        }
    }).then((response) => {
        res.json(response)
    })    
})
app.post('/admin/BuildingUploadAvatar', async (req, res) => {
    var filename = randomString() + '.jpg'
    
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/images/building')
        },
        filename: function (req, file, cb) {
            cb(null, 'temp_' + filename)
        }
    })

    var upload = multer({ storage: storage }).single(req.headers.column)

    upload(req, res, function (err) {
        let x = 0
        let y = 0
        if (req.headers.column == 'sBuildingAvatar') {
            x = 100
            y = 100
        } else if (req.headers.column == 'sBuildingCoverSmall') {
            x = 1170
            y = 450
        } else if (req.headers.column == 'sBuildingCoverBig') {
            x = 1170
            y = 450
        }
        sharp('./public/images/building/' + 'temp_' + filename)
        .resize(x, y)
        .toFile('./public/images/building/' + filename, function(err, response) {
            sharp.cache(false)
            // fs.unlink('./public/images/building/' + 'temp_' + filename)
            req.file.filename = filename
            res.send({ file: req.file, body: req.body })
        })
    })
})
app.post('/admin/BuildingUploadStage', async (req, res) => {
    var filename = randomString() + '.jpg'

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/images/building/stage')
        },
        filename: function (req, file, cb) {
            cb(null, 'temp_' + filename)
        }
    })
    var upload = multer({ storage: storage }).single('stage')
    upload(req, res, function (err) {
        sharp('./public/images/building/stage/' + 'temp_' + filename)
        .resize(1170, 450)
        .toFile('./public/images/building/stage/' + filename, function(err, response) {
            sharp.cache(false)
            // fs.unlink('./public/images/building/stage/' + 'temp_' + filename)
            req.file.filename = filename
            res.send({ file: req.file, body: req.body })
        })
    })
})

app.post('/admin/BuildingEditPlan', async (req, res) => {
    var data = {}
        data.building = await Building.getBuildingItem(req.body.iBuildingID)
        data.plan = await Plan.findAll(
            {
                where: {
                    iBuildingID: req.body.iBuildingID
                },
                include: [plan_image]
            }
        )
        data.type = await Type.findAll()
    res.json(data)
})
app.post('/admin/BuildingUploadPlan', async (req, res) => {
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/images/building/plan')
        },
        filename: function (req, file, cb) {
            cb(null, randomString() + '.jpg')
        }
    })
    var upload = multer({ storage: storage }).single('plan')
    upload(req, res, function (err) {
        res.send({ file: req.file, body: req.body })
    })
})
app.post('/admin/BuildingUpdatePlan', async (req, res) => {

    var iPlanID = (req.body.plan.iPlanID) ? req.body.plan.iPlanID : false

    if (iPlanID) {
        await Plan.update({
            iRoomCount: req.body.plan.iRoomCount,
            iTypeID: req.body.plan.iTypeID,
            sPlanName: req.body.plan.sPlanName,
            fPlanArea: req.body.plan.fPlanArea,
        }, {
            where: {
                iPlanID: req.body.plan.iPlanID
            }
        })
    } else {
        plan = await Plan.create({
            iBuildingID: req.body.iBuildingID,
            iRoomCount: req.body.plan.iRoomCount,
            iTypeID: req.body.plan.iTypeID,
            sPlanName: req.body.plan.sPlanName,
            fPlanArea: req.body.plan.fPlanArea,
        })
        iPlanID = plan.iPlanID
    }


    if ('plan_images_destroy' in req.body.plan) {
        await plan_image.destroy({
            where: {
                iPlanImageID: req.body.plan.plan_images_destroy
            }
        })
    }
    const planImageUpdate = async () => {
        if (req.body.plan.plan_images) {
            const images = req.body.plan.plan_images
            for (const image of images) {
                if (image.iPlanImageID) {
                    await plan_image.update({
                        sPlanImage: image.sPlanImage
                    }, {
                        where: {
                            iPlanImageID: image.iPlanImageID
                        }                    
                    })
                } else {
                    await plan_image.create({
                        iPlanID: iPlanID,
                        sPlanImage: image.sPlanImage
                    })
                }
            }
        }
    }
    await planImageUpdate()

    var data = {}
    data.plan = await Plan.findByPk(iPlanID,
        {
            include: [plan_image]
        }
    )

    res.json(data)
})
app.post('/admin/BuildingDelPlan', (req, res) => {
    Plan.destroy({
        where: {
            iPlanID: req.body.iPlanID,
        }
    }).then((response) => {
        res.json(response)
    })    
})

app.post('/admin/BuildingEditApartament', async (req, res) => {
    var data = {}
        data.building = await Building.getBuildingItem(req.body.iBuildingID)
        data.apartament = await Apartament.findAll({
            where: {
                iBuildingID: req.body.iBuildingID
            },
            include: [Plan]
        })
        data.plan = await Plan.findAll({
            where: {
                iBuildingID: req.body.iBuildingID
            },
        })
    res.json(data)
})
app.post('/admin/BuildingUpdateApartament', async (req, res) => {
    var iApartamentID = (req.body.apartament.iApartamentID) ? req.body.apartament.iApartamentID : false

    if (iApartamentID) {
        await Apartament.update({
            iApartamentNum: req.body.apartament.iApartamentNum,
            iApartamentFloor: req.body.apartament.iApartamentFloor,
            iApartamentPrice: req.body.apartament.iApartamentPrice,
            iPlanID: req.body.apartament.iPlanID
        }, {
            where: {
                iApartamentID: iApartamentID
            }
        })
    } else {
        var apartament = await Apartament.create({
            iBuildingID: req.body.iBuildingID,
            iApartamentNum: req.body.apartament.iApartamentNum,
            iApartamentFloor: req.body.apartament.iApartamentFloor,
            iApartamentPrice: req.body.apartament.iApartamentPrice,
            iPlanID: req.body.apartament.iPlanID
        })
        iApartamentID = apartament.iApartamentID
    }

    var apartament = await Apartament.findByPk(iApartamentID, {
        include: [Plan]
    })
    res.json(apartament)
})
app.post('/admin/BuildingDelApartament', async (req, res) => {
    // var iApartamentID = (req.body.apartament.iApartamentID) ? req.body.apartament.iApartamentID : false
    Apartament.destroy({
        where: {
            iApartamentID: req.body.iApartamentID
        }
    }).then((response) => {
        res.json(response)
    })    
})

app.post('/admin/PeopleList', async (req, res) => {
    var data = {}
        data.people = await People.findAll({
            include: [Department]
        })
        data.department = await Department.findAll()
    res.json(data)
})
app.post('/admin/PeopleUpdate', async (req, res) => {
    var data = {}
    var iPeopleID = (req.body.people.iPeopleID) ? req.body.people.iPeopleID : false
    if (iPeopleID) {
        await People.update({
            iDepartmentID: req.body.people.iDepartmentID,
            sPeopleLastname: req.body.people.sPeopleLastname,
            sPeopleName: req.body.people.sPeopleName,
            sPeoplePosition: req.body.people.sPeoplePosition,
            sPeopleImage: req.body.people.sPeopleImage,
        }, {
            where: {
                iPeopleID: iPeopleID
            }
        })
    } else {
        await People.create({
            iDepartmentID: req.body.people.iDepartmentID,
            sPeopleLastname: req.body.people.sPeopleLastname,
            sPeopleName: req.body.people.sPeopleName,
            sPeoplePosition: req.body.people.sPeoplePosition,
            sPeopleImage: req.body.people.sPeopleImage,
        }).then((people) => {
            iPeopleID = people.iPeopleID
        })
    }
    data.people = await People.findByPk(iPeopleID, {
        include: [Department]
    })

    res.json(data)
})
app.post('/admin/PeopleUpload', async (req, res) => {
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/images/people')
        },
        filename: function (req, file, cb) {
            cb(null, randomString() + '.jpg')
        }
    })
    var upload = multer({ storage: storage }).single('sPeopleImage')
    upload(req, res, function (err) {
        res.send({ file: req.file, body: req.body })
    })
})
app.post('/admin/PeopleDelete', async (req, res) => {
    People.destroy({
        where: {
            iPeopleID: req.body.iPeopleID
        }
    }).then((response) => {
        res.json(response)
    })
})

























app.listen(process.env.PORT, () => {
    console.log('Server is running...')
})
