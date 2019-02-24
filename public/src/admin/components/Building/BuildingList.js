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
        <div class="main-content">
            <app-header v-bind:title="'Building List'" v-bind:button="{title:'Create',uri:'/building/create'}"></app-header>
            <div class="container-fluid">
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
            </div>
        </div>
    `
}
