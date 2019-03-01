import App from '../components/App/App.js';

import Dashboard from '../components/Dashboard/Dashboard.js'

import Building from '../components/Building/Building.js'
import BuildingList from '../components/Building/BuildingList.js'
import BuildingEdit from '../components/Building/BuildingEdit.js'
import BuildingPlan from '../components/Building/BuildingPlan.js'
import BuildingApartment from '../components/Building/BuildingApartment.js'


import Apartament from '../components/Apartament/Apartament.js'
import ApartamentList from '../components/Apartament/ApartamentList.js'
import ApartamentView from '../components/Apartament/ApartamentView.js'

import Plan from '../components/Plan/Plan.js'
import PlanList from '../components/Plan/PlanList.js'
import PlanView from '../components/Plan/PlanView.js'

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
                        del
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
                            <router-link class="btn btn-primary" v-bind:to="button.uri">{{ button.title }}</router-link>
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
    ],
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
                    uri: '/apartament'
                },
            ],
        }
    },
    template: `
        <div class="container-fluid">
            <div class="header">
                <div class="header-body">
                    <div class="row align-items-center">
                        <div class="col-auto" v-if="building && building.sBuildingAvatar != null">
                            <div class="avatar avatar-lg">
                                <img v-bind:src="'/images/building/'+building.sBuildingAvatar" alt="..." class="avatar-img rounded-circle">
                            </div>
                        </div>
                        <div class="col">
                            <h6 class="header-pretitle">Объект</h6>
                            <h1 class="header-title">
                                <span v-if="Object.keys(building).length && building.sBuildingTitle && building.sBuildingTitle.length !== 0">{{ building.sBuildingTitle }}</span>
                                <span v-else>Наименование объекта</span>
                            </h1>
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
                component: BuildingPlan,
                props: true
            },
            {
                path: ':iBuildingID/apartment',
                component: BuildingApartment,
                props: true
            },
    ]
    },
    {
        path: '/apartament/',
        component: Apartament,
        children: [
            {
                path: '',
                component: ApartamentList
            },
            {
                path: ':id',
                component: ApartamentView,
                props: true
            }
        ]
    },
    {
        path: '/plan/',
        component: Plan,
        children: [
            {
                path: '',
                component: PlanList
            },
            {
                path: ':id',
                component: PlanView,
                props: true
            }
        ]
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
                    title: 'Apartaments',
                    uri: '/apartament'
                },
                {
                    title: 'Floor plans',
                    uri: '/plan'
                },
            ]
        },
    }),
}).$mount('#app')