var vm = new Vue({
    el: '#catalog',
    data: {
        buildings: []
    },
    created: function () {
        axios.post('/catalog/getBuildings', {

        }).then((json) => {
            this.buildings = json.data.buildings
        })
    }
})