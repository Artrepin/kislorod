export default {
    name: 'BuildingEditApartment',
    created: function () {
        Vue.set(this.$parent, 'menuActive', 2)
    },
    props: [
        'building'
    ],
    data: function () {
        return {

        }
    },
    methods: {
        add: function () {
            this.building.apartaments.push({})
        },
        del: function (index) {
            Vue.set(this.building.apartaments[index], 'del', true)
        },
    },
    template: `
        <div class="container-fluid building-edit-apartment">
            <div class="card">
                <div class="table-responsive mb-0">
                    <table class="table table-sm table-nowrap card-table">
                        <thead>
                            <tr>
                                <th width="25%">№ квартиры</th>
                                <th width="25%">Этаж</th>
                                <th width="25%">Планировка</th>
                                <th width="25%">Цена</th>
                                <th width="70px"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(apartament, index) in building.apartaments" v-if="apartament.del !== true">
                                <td>
                                    <input type="text" class="form-control form-control-sm border-0 p-0" v-model.number="apartament.iApartamentNum">
                                </td>
                                <td>
                                    <input type="text" class="form-control form-control-sm border-0 p-0 pl-3" v-model.number="apartament.iApartamentFloor">
                                </td>
                                <td class="pl-3" style="min-width: 200px">
                                    <select v-model="apartament.iPlanID" class="form-control form-control-sm border-0 p-0">
                                        <option v-for="(plan, index) in building.plans" v-if="plan.iPlanID" :value="plan.iPlanID">{{ plan.sPlanName }}</option>
                                    </select>
                                </td>
                                <td style="min-width: 100px">
                                    <input type="text" class="form-control form-control-sm border-0 p-0 pl-3" v-model.number="apartament.iApartamentPrice">
                                </td>
                                <td style="min-width: 70px">
                                    <button type="button" class="btn btn-sm btn-block btn-outline-danger" v-on:click.prevent="del(index)"><i class="material-icons">delete</i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <button type="button" class="btn btn-primary mt-auto" v-on:click.prevent="add">Добавить квартиру</button>
        </div>
    `
}
