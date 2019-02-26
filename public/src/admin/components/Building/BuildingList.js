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
            <app-header v-bind:title="'Список объектов'" v-bind:button="{title:'Create',uri:'/building/create'}"></app-header>
            <div class="container-fluid">

                <div class="row">
                    <div class="col-xl-3 col-lg-4" v-for="(building, index) in buildings.docs" :key="index">
                        <div class="card">
                            <div class="dropdown card-dropdown">
                                <a href="#!" class="dropdown-ellipses dropdown-toggle text-white" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fe fe-more-vertical"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <a href="#!" class="dropdown-item">Action</a>
                                    <a href="#!" class="dropdown-item">Another action</a>
                                    <a href="#!" class="dropdown-item">Something else here</a>
                                </div>
                            </div>
                            <img
                                v-if="building.sBuildingCoverSmall !== null"
                                v-bind:src="'/images/building/' + building.sBuildingCoverSmall"
                                alt="..."
                                class="card-img-top">
                            <img
                                v-else
                                src="/images/admin/covers/profile-cover-2.jpg"
                                alt="..."
                                class="card-img-top">
                            <div class="card-body text-center">
                                <router-link class="avatar avatar-xl card-avatar card-avatar-top" v-bind:to="'/building/'+building.iBuildingID">
                                    <img
                                        v-if="building.sBuildingAvatar !== null"
                                        v-bind:src="'/images/building/' + building.sBuildingAvatar"
                                        class="avatar-img rounded-circle border border-4 border-card"
                                        alt="...">
                                    <img
                                        v-else
                                        src="/images/admin/avatars/profiles/avatar-2.jpg"
                                        class="avatar-img rounded-circle border border-4 border-card"
                                        alt="...">
                                </router-link>
                                <h2 class="card-title">
                                    <router-link v-bind:to="'/building/'+building.iBuildingID">{{ building.sBuildingTitle }}</router-link>
                                </h2>
                                <p class="card-text text-muted card-desc">
                                    <small>{{ building.sBuildingDescription }}</small>
                                </p>
                                <p class="card-text">
                                    <span class="badge badge-soft-secondary">UX Team</span>
                                    <span class="badge badge-soft-secondary">Research Team</span>
                                </p>
                                <hr>
                                <div class="row align-items-center justify-content-between">
                                    <div class="col-auto">
                                        <small><span class="text-success">●</span> Online</small>
                                    </div>
                                    <div class="col-auto">
                                        <router-link class="btn btn-sm btn-primary" v-bind:to="'/building/'+building.iBuildingID">Подробнее</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
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

                <pre>{{ buildings }}</pre>
            </div>
        </div>
    `
}
