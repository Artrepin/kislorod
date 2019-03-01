export default {
    name: 'BuildingApartment',
    props: [
        'iBuildingID'
    ],
    data: function () {
        return {
            loading: false,
        }
    },
    template: `
        <div class="main-content">BuildingApartment</div>
    `
}
