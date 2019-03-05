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
            building: {},
            apartament: [],
            plan: [],
            useApartament: false
        }
    },
    methods: {
        get: function () {
            if (this.iBuildingID) {
                axios.post('/admin/BuildingEditApartament', {
                    iBuildingID: this.iBuildingID
                })
                .then( (response) => {
                    this.building = response.data.building,
                    this.apartament = response.data.apartament
                    this.plan = response.data.plan
                })
            }    
        },
        openModal: function (index) {
            Vue.set(this, 'useApartament', index)
            $('#modalApartamentEdit').modal()
        },
        add: function () {
            this.apartament.push({})
            this.openModal(this.apartament.length-1)
        },
        del: function () {
            var iApartamentID = this.apartament[this.useApartament].iApartamentID
            $('#modalApartamentEdit').modal('hide')
            this.apartament.splice(this.useApartament, 1)
            Vue.set(this, 'useApartament', false)

            if (iApartamentID) {
                axios.post('/admin/BuildingDelApartament', {
                    iApartamentID: iApartamentID
                })
                .then( (response) => {
                                        
                })
            }
            
        },
        update: function () {
            axios.post('/admin/BuildingUpdateApartament', {
                iBuildingID: this.iBuildingID,
                apartament: this.apartament[this.useApartament]
            })
            .then( (response) => {
                Vue.set(this.apartament, this.useApartament, response.data)
                $('#modalApartamentEdit').modal('hide')
                Vue.set(this, 'useApartament', false)
            })
        }
    },
    template: `
        <div class="main-content">
            <building-edit-header v-bind:building="building" v-bind:menuActive=2></building-edit-header>

            <div class="modal fixed-right" id="modalApartamentEdit" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
                <div class="modal-dialog modal-dialog-vertical" role="document">
                    <form class="modal-content">
                        <div class="modal-body" v-if="useApartament !== false && apartament[useApartament]">
                            <a class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></a>
                            <div class="form-group">
                                <label for="">Номер квартиры</label>
                                <input type="text" class="form-control" v-model="apartament[useApartament].iApartamentNum">
                            </div>
                            <div class="form-group">
                                <label for="">Этаж</label>
                                <input type="text" class="form-control" v-model="apartament[useApartament].iApartamentFloor">
                            </div>
                            <div class="form-group">
                                <label for="">Цена</label>
                                <input type="text" class="form-control" v-model="apartament[useApartament].iApartamentPrice">
                            </div>
                            <div class="form-group">
                                <label for="">Планировка</label>
                                <select class="form-control" v-model="apartament[useApartament].iPlanID">
                                    <option
                                        v-for="(plan, index) in plan"
                                        v-bind:value="plan.iPlanID"
                                        >{{ plan.sPlanName }}</option>
                                </select>
                            </div>
                            <button type="button" class="btn btn-block btn-sm btn-danger mt-auto" v-on:click.prevent="del">Удалить квартиру</button>
                        </div>
                        <div class="modal-footer border-0">
                            <button type="button" class="btn btn-block btn-primary mt-auto" v-on:click.prevent="update">Сохранить</button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="container-fluid">

                <div class="card">
                    <div class="table-responsive mb-0">
                        <table class="table table-sm table-nowrap card-table">
                            <thead>
                                <tr>
                                    <th width=50>№ квартиры</th>
                                    <th>Этаж</th>
                                    <th>Планировка</th>
                                    <th>Цена</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(apartament, index) in apartament" v-on:click="openModal(index)">
                                    <td><span>{{ apartament.iApartamentNum }}</span></td>
                                    <td>{{ apartament.iApartamentFloor }}</td>
                                    <td>
                                        <template v-if="apartament.plan">
                                            {{ apartament.plan.sPlanName }}
                                        </template>
                                        <template v-else>
                                            Не указано
                                        </template>
                                    </td>
                                    <td>{{ apartament.iApartamentPrice }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <button type="button" class="btn btn-primary mt-auto" v-on:click.prevent="add">Добавить квартиру</button>

            </div>

        </div>
    `
}
