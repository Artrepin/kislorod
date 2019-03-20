export default {
    name: 'BuildingList',
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
        <div class="main-content building-list">
            <app-header v-bind:title="'Список объектов'" v-bind:button="{title:'Добавить',uri:'/building/create'}"></app-header>
            
            <div class="container-fluid">

                <div class="row" v-if="buildings.docs">
                    <div class="col-xl-3 col-lg-4" v-for="(building, index) in buildings.docs" :key="index">
                        <router-link tag="div" v-bind:to="'/building/'+building.iBuildingID" class="card">
                            <img
                                v-if="building.sBuildingCoverSmall !== null"
                                v-bind:src="'/images/building/' + building.sBuildingCoverSmall"
                                class="card-img-top">
                            <div v-else class="card-img-top"></div>
                            <div class="card-body text-center">
                                <div class="avatar avatar-xl card-avatar card-avatar-top">
                                    <img
                                        v-if="building.sBuildingAvatar !== null"
                                        v-bind:src="'/images/building/' + building.sBuildingAvatar"
                                        class="avatar-img rounded-circle border border-4 border-card">
                                    <div v-else class="avatar-img rounded-circle border border-4 border-card" style="background: #EEE;"></div>
                                </div>
                                <h2 class="card-title">{{ building.sBuildingTitle }}</h2>
                                <p class="card-text text-muted card-desc">
                                    <small>{{ building.sBuildingDescription }}</small>
                                </p>
                            </div>
                        </router-link>
                    </div>
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

            </div>
        </div>
    `
}
