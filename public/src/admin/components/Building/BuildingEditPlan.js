export default {
    name: 'BuildingEditPlan',
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
    methods: {
        get: function () {
            if (this.iBuildingID) {
                axios.post('/admin/BuildingEditPlan', {
                    iBuildingID: this.iBuildingID
                })
                .then( (response) => {
                    this.building = response.data.building
                })
            }    
        },
    },
    template: `
        <div class="main-content">
            <building-edit-header v-bind:building="building" v-bind:menuActive=1></building-edit-header>
            <div class="container-fluid">
                <form>
                    <input type="text" v-model="building.iBuildingID">
                </form>
            </div>
        </div>
    `
}
