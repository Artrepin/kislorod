const Dashboard = {
    template: `<div>Dashboard</div>`
}

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

const Building = {
    template: `<router-view></router-view>`
}
const BuildingList = {
    created: function () {
        this.get()
    },
    props: {
        p: {
            type: [ Number, String ],
            default: 1
        }
    },
    data: function () {
        return {
            buildings: []
        }
    },
    watch: {
        p: function () {
            this.get()
        }
    },
    methods: {
        get: function () {
            axios.post('/admin/BuildingList', {
                p: this.p
            })
            .then( (response) => {
                this.buildings = response.data.buildings
            })
        }
    },
    template: `
        <div>
            <h1>BuildingList!</h1>
            <div class="list-group" style="margin-bottom: 1rem;">
                <router-link
                    class="list-group-item list-group-item-action"
                    v-for="(building, index) in buildings.docs"
                    v-bind:to="'/building/'+building.iBuildingID"
                    :key="index">{{ building.sBuildingTitle }}</router-link>
            </div>
            <nav v-if="buildings.pages > 1">
                <ul class="pagination">
                    <li
                        class="page-item"
                        v-bind:class="{ active: page == p }"
                        v-for="(page, index) in buildings.pages"
                        :key="index">
                        <router-link
                            class="page-link"
                            v-bind:to="'/building/p/'+page">{{ page }}</router-link>
                    </li>
                </ul>
            </nav>
            <router-link class="btn btn-primary" to="/building/create">New Building</router-link>
        </div>
    `
}
const BuildingEdit = {
    created: function () {
        this.get()
    },
    props: [
        'iBuildingID'
    ],
    data: function () {
        return {
            loading: false,
            building: {}
        }
    },
    components: {
        'picture-input': PictureInput
    },
    methods: {
        get: function () {
            if (this.iBuildingID) {
                axios.post('/admin/BuildingEdit', {
                    iBuildingID: this.iBuildingID
                })
                .then( (response) => {
                    this.building = response.data.building
                })
            }    
        },
        update: function () {
            Vue.set(this, 'loading', true)
            axios.post('/admin/BuildingUpdate', {
                building: this.building
            })
            .then( (response) => {
                Vue.set(this, 'building', response.data)
                Vue.set(this, 'loading', false)
                this.$router.push('/building/' + this.building.iBuildingID)
            })
        },
        remove: function () {
            axios.post('/admin/BuildingRemove', {
                building: this.building
            })
            .then( (response) => {
                this.$router.push('/building')
            })
        },
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
        advantageAdd: function () {
            if ('advantage' in this.building) {

            } else {
                Vue.set(this.building, 'advantage', [])
            }
            this.building.advantage.push({
                iAdvantageID: null,
                sAdvantageTitle: null
            })
        }
    },
    template: `
        <div>
            <h1 v-if="Object.keys(building).length && building.sBuildingTitle && building.sBuildingTitle.length !== 0">{{ building.sBuildingTitle }}</h1>
            <h1 v-else>New Building</h1>
            <div class=row>
                <div class="col">
                    <picture-input
                        ref="sBuildingAvatar"
                        @change="uploadAvatar('sBuildingAvatar')"
                        width="200"
                        height="200"
                        margin="16"
                        radius="6"
                        accept="image/jpeg,image/png"
                        size="50"
                        v-bind:prefill="Object.keys(building).length !== 0 && building.sBuildingAvatar != null ? '/images/building/'+building.sBuildingAvatar : ''"
                        buttonClass="btn btn-primary btn-sm"
                        :customStrings="{
                            drag: 'Drag or click',
                            change: 'Change img'
                        }"></picture-input>
                </div>
                <div class="col">
                    <picture-input
                        ref="sBuildingCoverSmall"
                        @change="uploadAvatar('sBuildingCoverSmall')"
                        width="200"
                        height="200"
                        margin="16"
                        radius="6"
                        accept="image/jpeg,image/png"
                        size="50"
                        v-bind:prefill="Object.keys(building).length !== 0 && building.sBuildingCoverSmall != null ? '/images/building/'+building.sBuildingCoverSmall : ''"
                        buttonClass="btn btn-primary btn-sm"
                        :customStrings="{
                            drag: 'Drag or click',
                            change: 'Change img'
                        }"></picture-input>
                </div>
                <div class="col">
                    <picture-input
                        ref="sBuildingCoverBig"
                        @change="uploadAvatar('sBuildingCoverBig')"
                        width="200"
                        height="200"
                        margin="16"
                        radius="6"
                        accept="image/jpeg,image/png"
                        size="50"
                        v-bind:prefill="Object.keys(building).length !== 0 && building.sBuildingCoverBig != null ? '/images/building/'+building.sBuildingCoverBig : ''"
                        buttonClass="btn btn-primary btn-sm"
                        :customStrings="{
                            drag: 'Drag or click',
                            change: 'Change img'
                        }"></picture-input>
                </div>
            </div>
            <form>
                <input type="hidden" v-model="building.iBuildingID">
                <input type="hidden" v-model="building.sBuildingAvatar">
                <input type="hidden" v-model="building.sBuildingCoverSmall">
                <input type="hidden" v-model="building.sBuildingCoverBig">
                
                <div class="form-group">
                    <label for="">sBuildingTitle</label>
                    <input type="text" class="form-control" v-model="building.sBuildingTitle">
                </div>
                <div class="form-group">
                    <label for="">sBuildingDescription</label>
                    <textarea class="form-control" v-model="building.sBuildingDescription"></textarea>
                </div>
                <div class="form-group">
                    <label for="">fBuildingLocationeX</label>
                    <input type="text" class="form-control" v-model="building.fBuildingLocationeX">
                </div>
                <div class="form-group">
                    <label for="">fBuildingLocationeY</label>
                    <input type="text" class="form-control" v-model="building.fBuildingLocationeY">
                </div>
                <div class="form-group">
                    <label for="">sBuildingYoutube</label>
                    <input type="text" class="form-control" v-model="building.sBuildingYoutube">
                </div>

                <building-edit-advantage v-bind:advantage="building.advantage"></building-edit-advantage>
                
                <button type="button" v-on:click="advantageAdd">Add</button>

                <button v-bind:disabled="loading" class="btn btn-primary" type="submit" v-on:click.prevent="update">update</button>
                <button v-bind:disabled="loading" v-if="building && building.iBuildingID" class="btn btn-danger float-right" type="button" v-on:click.prevent="remove">remove</button>
            </form>
            <pre>{{ building }}</pre>
        </div>
    `
}

const Apartament = {
    template: `<router-view></router-view>`
}
const ApartamentList = {
    template: `<div>ApartamentList</div>`
}
const ApartamentView = {
    template: `<div>ApartamentView</div>`
}

const Plan = {
    template: `<router-view></router-view>`
}
const PlanList = {
    template: `<div>PlanList</div>`
}
const PlanView = {
    template: `<div>PlanView</div>`
}

const routes = [
    {
        path: '/',
        component: Dashboard
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
    template: `
        <div class="main">
            <div class="menu bg-dark">
                <ul>
                    <li v-for="(menu, index) in menu">
                        <router-link v-bind:to="menu.uri">{{ menu.title }}</router-link>
                    </li>
                </ul>
            </div>
            <router-view class="content"></router-view>
        </div>
    `
}).$mount('#app')