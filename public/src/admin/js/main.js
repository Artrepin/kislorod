import App from '../components/App/App.js';

import Dashboard from '../components/Dashboard/Dashboard.js'

import Building from '../components/Building/Building.js'
import BuildingList from '../components/Building/BuildingList.js'
import BuildingEdit from '../components/Building/BuildingEdit.js'

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
        <ul v-if="advantage">
            <li
                v-for="(advantage, index) in advantage"
                v-bind:key="index">
                <input type="text" v-model="advantage.sAdvantageTitle">
                <button type="button" v-on:click="del(index)">del</button>
            </li>
        </ul>
    `
})

Vue.component('app-header', {
    props: [
        'button',
        'title'
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
                props: true
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
                    title: 'Dashboard',
                    uri: '/'
                },
                {
                    title: 'Buildings',
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