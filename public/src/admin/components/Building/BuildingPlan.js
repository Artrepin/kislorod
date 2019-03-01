export default {
    name: 'BuildingPlan',
    props: [
        'iBuildingID'
    ],
    data: function () {
        return {
            loading: false,
        }
    },
    template: `
        <div class="main-content">BuildingPlan</div>
    `
}
