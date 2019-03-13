import App from '../components/App/App.js'

import Dashboard from '../components/Dashboard/Dashboard.js'

import Building from '../components/Building/Building.js'
import BuildingList from '../components/Building/BuildingList.js'
import BuildingEdit from '../components/Building/BuildingEdit.js'
import BuildingEditPlan from '../components/Building/BuildingEditPlan.js'
import BuildingEditApartment from '../components/Building/BuildingEditApartment.js'

import People from '../components/People/People.js'

Vue.component('building-edit-advantage', {
    props: [
        'advantage'
    ],
    methods: {
        del: function (index) {
            var advantage_destroy = this.advantage.splice(index, 1)
            if ('advantage_destroy' in this.$parent.$data.building) {
                
            } else {
                this.$parent.$data.building.advantage_destroy = []
            }
            if (advantage_destroy[0].iAdvantageID) {
                this.$parent.$data.building.advantage_destroy.push(advantage_destroy[0].iAdvantageID)
            }            
        }
    },
    template: `
        <div v-if="advantage">
            <div
                class="input-group mb-3"
                v-for="(advantage, index) in advantage"
                v-bind:key="index">
                <input type="text" class="form-control" v-model="advantage.sAdvantageTitle">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" v-on:click="del(index)">
                        <i class="material-icons">delete</i>
                    </button>
                </div>
            </div>        
        </div>
    `
})

Vue.component('app-header', {
    props: [
        'button',
        'title',
    ],
    template: `
        <div class="header">
            <div class="container-fluid">
                <div class="header-body">
                    <div class="row align-items-end">
                        <div class="col">
                            <h1 class="header-title">{{ title }}</h1>
                        </div>
                        <div class="col-auto" v-if="button">
                            <template v-if="button.uri">
                                <router-link class="btn btn-primary" v-bind:to="button.uri">{{ button.title }}</router-link>
                            </template>
                            <template v-if="button.method">
                                <template v-if="button.method == 'add'">
                                    <button class="btn btn-primary" v-on:click="this.$parent.add">{{ button.title }}</button>
                                </template>                                
                            </template>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    `
})

Vue.component('building-edit-header', {
    props: [
        'building',
        'menuActive',
        'loading'
    ],
    components: {
        'picture-input': PictureInput,
    },
    data: function () {
        return {
            menu: [
                {
                    title: 'Параметры',
                    uri: ''
                },
                {
                    title: 'Планировки',
                    uri: '/plan'
                },
                {
                    title: 'Квартиры',
                    uri: '/apartment'
                },
            ],
        }
    },
    methods: {
        uploadAvatar: function (column) {
            var formData = new FormData();
                formData.append(column, this.$refs[column].file);
            axios.post('/admin/BuildingUploadAvatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'column': column
                }
            }).then( (response) => {
                Vue.set(this.building, column, response.data.file.filename)
            })
        },
    },
    template: `
        <div class="header building-edit-header">
            <picture-input
                    ref="sBuildingCoverSmall"
                    @change="uploadAvatar('sBuildingCoverSmall')"
                    width="1170"
                    height="450"
                    margin="0"
                    radius="0"
                    accept="image/jpeg,image/png"
                    size="50"
                    v-bind:prefill="Object.keys(building).length !== 0 && building.sBuildingCoverSmall != null ? '/images/building/'+building.sBuildingCoverSmall : ''"
                    buttonClass="btn btn-primary btn-sm"
                    :hideChangeButton='true'
                    :customStrings="{
                        drag: 'Перетащите изображение<br>или<br>нажмите для выбора файла<br>(1170px / 450px)'
                    }"></picture-input>
            <div class="container-fluid" style="z-index:1000000000">
                <div class="header-body mt-n5 mt-md-n6">
                    <div class="row align-items-end">
                        <div class="col-auto">
                            <div class="avatar avatar-xxl header-avatar-top">
                                <picture-input
                                    ref="sBuildingAvatar"
                                    @change="uploadAvatar('sBuildingAvatar')"
                                    width="128"
                                    height="128"
                                    margin="0"
                                    radius="0"
                                    accept="image/jpeg,image/png"
                                    size="50"
                                    v-bind:prefill="Object.keys(building).length !== 0 && building.sBuildingAvatar != null ? '/images/building/'+building.sBuildingAvatar : ''"
                                    buttonClass="btn btn-primary btn-sm"
                                    :hideChangeButton='true'
                                    :customStrings="{
                                        drag: 'Нажмите для выбора файла<br>(100px / 100px)'
                                        }"></picture-input>
                            </div>
                        </div>
                        <div class="col mb-3 ml-n3 ml-md-n2">
                            <h6 class="header-pretitle">Объект</h6>
                            <h1 class="header-title">{{ building.sBuildingTitle }}</h1>
                        </div>
                    </div>
                    <div class="row align-items-center">
                        <div class="col">
                            <ul class="nav nav-tabs nav-overflow header-tabs">
                                <li
                                    class="nav-item"
                                    v-for="(item, index) in menu">
                                    <router-link
                                        class="nav-link"
                                        v-bind:class="{ active: menuActive == index }"
                                        v-bind:to="'/building/'+building.iBuildingID+item.uri"
                                        >{{ item.title }}</router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})

const routes = [
    {
        path: '/',
        component: Dashboard,
        title: 'Dashboard'
    },
    {
        path: '/building/',
        component: Building,
        children: [
            {
                path: '',
                component: BuildingList,
                props: true
            },
            {
                path: 'p/:p',
                component: BuildingList,
                props: true,
            },
            {
                path: 'create',
                component: BuildingEdit
            },
            {
                path: ':iBuildingID',
                component: BuildingEdit,
                props: true
            },
            {
                path: ':iBuildingID/plan',
                component: BuildingEditPlan,
                props: true
            },
            {
                path: ':iBuildingID/apartment',
                component: BuildingEditApartment,
                props: true
            },
    ]
    },
    {
        path: '/people/',
        component: People
    },
]

const router = new VueRouter({
    routes
})

const app = new Vue({
    router,
    data: {
        title: 'ADMIN',
    },
    render: h => h(App, {
        props: {
            menu: [
                {
                    title: 'Рабочий стол',
                    uri: '/'
                },
                {
                    title: 'Объекты',
                    uri: '/building'
                },
                {
                    title: 'Сотрудники',
                    uri: '/people'
                },
            ]
        },
    }),
}).$mount('#app')