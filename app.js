const express = require('express')
const app = express()
const pug = require('pug')
const config = require('config')
require('dotenv').config()
app.set('view engine', 'pug')
app.use(express.static('public'))
app.locals.env = process.env;
const bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
const amocrm = require('./modules/amocrm')
const multer = require('multer')
const sharp = require('sharp')

const Building = require('./models').Building
const Advantage = require('./models').Advantage
const Stage = require('./models').Stage
const Type = require('./models').type
const Plan = require('./models').plan
const plan_image = require('./models').plan_image
const Apartament = require('./models').apartament

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

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'))
app.use('/jquery-ui', express.static(__dirname + '/node_modules/jquery-ui/ui'))

app.use('/feather-icons', express.static(__dirname + '/node_modules/feather-icons/dist'))

const data = {}

app.get('/', (req, res) => {
    data.title = "Центр недвижимости «Кислород»"
    data.current_month = month_rus[new Date().getMonth()][0]
    data.current_year = new Date().getFullYear()
    data.buildings = []
    res.render('welcome/welcome', data)
})

app.get('/catalog', (req, res) => {
    data.title = "Каталог недвижимости"
    data.buildings = []
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
            
        })
    })

    res.send(true)
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
        building: await Building.getBuildingItem(req.body.iBuildingID)
    })
})
app.post('/admin/BuildingUpdate', async (req, res) => {
    var iBuildingID = (req.body.building.iBuildingID) ? req.body.building.iBuildingID : false

    if (iBuildingID) {
        await Building.update({
            sBuildingTitle: req.body.building.sBuildingTitle,
            sBuildingAvatar: req.body.building.sBuildingAvatar,
            sBuildingCoverSmall: req.body.building.sBuildingCoverSmall,
            sBuildingCoverBig: req.body.building.sBuildingCoverBig,
            sBuildingDescription: req.body.building.sBuildingDescription,
            fBuildingLocationeX: req.body.building.fBuildingLocationeX,
            fBuildingLocationeY: req.body.building.fBuildingLocationeY,
            sBuildingYoutube: req.body.building.sBuildingYoutube,
        }, {
            where: {
                iBuildingID: iBuildingID
            }
        })
    } else {
        await Building.create({
            sBuildingTitle: req.body.building.sBuildingTitle,
            sBuildingAvatar: req.body.building.sBuildingAvatar,
            sBuildingCoverSmall: req.body.building.sBuildingCoverSmall,
            sBuildingCoverBig: req.body.building.sBuildingCoverBig,
            sBuildingDescription: req.body.building.sBuildingDescription,
            fBuildingLocationeX: req.body.building.fBuildingLocationeX,
            fBuildingLocationeY: req.body.building.fBuildingLocationeY,
            sBuildingYoutube: req.body.building.sBuildingYoutube,
        }).then((response) => {
            iBuildingID = response.iBuildingID
        })        
    }


    if ('advantage_destroy' in req.body.building) {
        await Advantage.destroy({
            where: {
                iAdvantageID: req.body.building.advantage_destroy
            }
        })
    }
    const advantageUpdate = async () => {
        if (req.body.building.advantage) {
            const advantages = req.body.building.advantage
            for (const advantage of advantages) {
                if (advantage.iAdvantageID) {
                    await Advantage.update({
                        sAdvantageTitle: advantage.sAdvantageTitle
                    }, {
                        where: {
                            iAdvantageID: advantage.iAdvantageID
                        }                    
                    })
                } else {
                    await Advantage.create({
                        iBuildingID: iBuildingID,
                        sAdvantageTitle: advantage.sAdvantageTitle
                    })
                }
            }
        }
    }
    await advantageUpdate()


    if ('stage_destroy' in req.body.building) {
        await Stage.destroy({
            where: {
                iStageID: req.body.building.stage_destroy
            }
        })
    }
    const stageUpdate = async () => {
        if (req.body.building.stage) {
            const stages = req.body.building.stage
            for (const stage of stages) {
                if (stage.iStageID) {
                    await Stage.update({
                        sStageImage: stage.sStageImage,
                        tStageDesc: stage.tStageDesc,
                        dStageDate: stage.dStageDate
                    }, {
                        where: {
                            iStageID: stage.iStageID
                        }                    
                    })
                } else {
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

    var building = await Building.getBuildingItem(iBuildingID)

    res.json(building)

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
    console.log('upload start')
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/images/building')
        },
        filename: function (req, file, cb) {
            cb(null, randomString() + '.jpg')
        }
    })
    var upload = multer({ storage: storage }).single(req.headers.column)
    upload(req, res, function (err) {
        console.log('upload complete')
        sharp('./public/images/building' + req.file.fieldname)
        .resize(300, 200)
        .toFile('output.jpg', function(err) {
            res.send({ file: req.file, body: req.body })
        })        
    })
})
app.post('/admin/BuildingUploadStage', async (req, res) => {
    console.log('upload start')
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/images/building/stage')
        },
        filename: function (req, file, cb) {
            cb(null, randomString() + '.jpg')
        }
    })
    var upload = multer({ storage: storage }).single('stage')
    upload(req, res, function (err) {
        res.send({ file: req.file, body: req.body })
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
    data.plan = await Plan.findById(iPlanID,
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

    var apartament = await Apartament.findById(iApartamentID, {
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








app.listen(process.env.PORT, () => {
    console.log('Server is running...')
})
