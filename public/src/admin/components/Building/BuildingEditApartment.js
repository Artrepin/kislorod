export default {
    name: 'BuildingEditApartment',
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
                axios.post('/admin/BuildingEditApartament', {
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
            <building-edit-header v-bind:building="building" v-bind:menuActive=2></building-edit-header>
        </div>
    `
}
