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
            building: {},
            plan: [],
            type: [],
            usePlan: false
        }
    },
    components: {
        'picture-input': PictureInput,
    },
    methods: {
        get: function () {
            if (this.iBuildingID) {
                axios.post('/admin/BuildingEditPlan', {
                    iBuildingID: this.iBuildingID
                })
                .then( (response) => {
                    this.building = response.data.building
                    this.plan = response.data.plan
                    this.type = response.data.type
                    // this.openModal(0)
                })
            }    
        },
        openModal: function (index) {
            Vue.set(this, 'usePlan', index)
            $('#modalPlanEdit').modal().on('hidden.bs.modal', function (e) {
                this.usePlan = false
            })
        },
        add: function () {
            this.plan.push({plan_images: []})
            this.openModal(this.plan.length-1)
        },
        del: function () {
            $('#modalPlanEdit').modal('hide')
            axios.post('/admin/BuildingDelPlan', {
                iPlanID: this.plan[this.usePlan].iPlanID
            })
            .then( (response) => {
                this.plan.splice(this.usePlan, 1)
                Vue.set(this, 'usePlan', false)
            })
        },
        uploadPlan: function (index) {
            var formData = new FormData();
                formData.append('plan', this.$refs.planImage[index].file);
            axios.post('/admin/BuildingUploadPlan', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then( (response) => {
                Vue.set(this.plan[this.usePlan].plan_images[index], 'sPlanImage', response.data.file.filename)
            })
        },
        update: function () {
            axios.post('/admin/BuildingUpdatePlan', {
                plan: this.plan[this.usePlan],
                iBuildingID: this.iBuildingID
            })
            .then( (response) => {
                Vue.set(this.plan, this.usePlan, response.data.plan)
                // Vue.set(this.plan[this.usePlan], 'plan_images_destroy', [])
                $('#modalPlanEdit').modal('hide')
            })
        },
        addImage: function () {
            this.plan[this.usePlan].plan_images.push({})
        },
        delImage: function (index) {
            var iPlanImageID = this.plan[this.usePlan].plan_images[index].iPlanImageID
            if (iPlanImageID) {
                if ('plan_images_destroy' in this.plan[this.usePlan]) {
                    
                } else {
                    this.plan[this.usePlan].plan_images_destroy = []
                }
                this.plan[this.usePlan].plan_images_destroy.push(iPlanImageID)
            }
            this.plan[this.usePlan].plan_images.splice(index, 1)

            // this.plan[this.usePlan].plan_images.push({})
        }
    },
    template: `
        <div class="main-content building-edit-plan">

            <div class="modal fixed-right" id="modalPlanEdit" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
                <div class="modal-dialog modal-dialog-vertical" role="document">
                    <form class="modal-content" v-if="usePlan !== false">
                        <div class="modal-body">
                            <!-- Close -->
                            <a class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></a>
                            <div class="form-group">
                                <label for="">Наименование плана</label>
                                <input type="text" class="form-control" v-model="plan[usePlan].sPlanName">
                            </div>
                            <div class="form-group">
                                <label for="">Количество комнат</label>
                                <input type="text" class="form-control" v-model.number="plan[usePlan].iRoomCount">
                            </div>
                            <div class="form-group">
                                <label for="">Площадь</label>
                                <input type="text" class="form-control" v-model.number="plan[usePlan].fPlanArea">
                            </div>
                            <div class="form-group">
                                <label for="">Комнатность</label>
                                <select class="form-control" v-model="plan[usePlan].iTypeID">
                                    <option
                                        v-for="(type, index) in type"
                                        v-bind:value="type.iTypeID"
                                        >{{ type.sTypeTitle }}</option>
                                </select>
                            </div>
                            <template v-for="(image, index) in plan[usePlan].plan_images">
                                <input type="hidden" class="form-control" v-model="image.sPlanImage">
                                <picture-input
                                    ref="planImage"
                                    @change="uploadPlan(index)"
                                    width="200"
                                    height="200"
                                    margin="16"
                                    radius="6"
                                    accept="image/jpeg,image/png"
                                    size="50"
                                    v-bind:prefill="(image.sPlanImage && image.sPlanImage.length) ? '/images/building/plan/'+image.sPlanImage : ''"
                                    buttonClass="btn btn-primary btn-sm"
                                    :customStrings="{
                                        drag: 'Drag or click',
                                        change: 'Change img'
                                    }"></picture-input>
                                <button type="button" class="btn btn-sm btn-danger" v-on:click.prevent="delImage(index)">Удалить изображение</button>
                            </template>
                            <div class="modal-footer border-0">
                                <button type="button" class="btn btn-block btn-sm btn-primary mt-auto" v-on:click.prevent="addImage">Добавить изображение</button>
                            </div>
                            <button type="button" class="btn btn-block btn-sm btn-danger mt-auto" v-on:click.prevent="del">Удалить планировку</button>
                        </div>
                        <div class="modal-footer border-0">
                            <button type="button" class="btn btn-block btn-primary mt-auto" v-on:click.prevent="update">Сохранить</button>
                        </div>
                    </form>
                </div>
            </div>

            <building-edit-header v-bind:building="building" v-bind:menuActive=1></building-edit-header>
            <div class="container-fluid">

                <div class="row">
                    <div class="col-xl-3" v-for="(plan, index) in plan">
                        <div class="card">

                            <div v-bind:id="'carousel'+index" class="carousel slide">
                                <ol class="carousel-indicators" v-if="plan.plan_images && plan.plan_images.length > 1">
                                    <li
                                        v-for="(image, index) in plan.plan_images"
                                        v-if="image.sPlanImage"
                                        v-bind:data-target="'#carousel'+index"
                                        v-bind:data-slide-to="index"
                                        v-bind:class="{ active: index == 0}"></li>
                                </ol>
                                <div class="carousel-inner" v-if="plan.plan_images && plan.plan_images.length > 0">
                                    <div class="carousel-item"
                                        data-interval="600000"
                                        v-for="(image, index) in plan.plan_images"
                                        v-bind:class="{ active: index == 0 }">
                                        <img v-bind:src="'/images/building/plan/' + image.sPlanImage" class="d-block w-100" alt="...">
                                    </div>
                                </div>
                                <div v-else class="empty"></div>
                                <a class="carousel-control-prev" v-if="plan.plan_images && plan.plan_images.length > 1" v-bind:href="'#carousel'+index" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" v-if="plan.plan_images && plan.plan_images.length > 1" v-bind:href="'#carousel'+index" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                            <div class="card-body">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <!-- Title -->
                                        <h4 class="card-title mb-2">
                                            <a href="#" v-bind:to="'/building/' + iBuildingID + '/plan/' + plan.iPlanID" v-on:click.prevent="openModal(index)">
                                                <template v-if="plan.sPlanName">{{ plan.sPlanName }}</template>
                                                <template v-else>Без названия</template>
                                            </a>
                                        </h4>
                                        <!-- Subtitle -->
                                        <p class="card-text small text-muted">
                                            <template v-if="plan.iRoomCount">Кол-во комнат: {{ plan.iRoomCount }}</template>
                                            <template v-else>Не указано кол-во комнат</template>                                            
                                        </p>
                                    </div>
                                </div> <!-- / .row -->
                            </div> <!-- / .card-body -->
                        </div>
                    </div>
                </div>

                <button class="btn btn-primary" v-on:click="add">Добавить планировку</button>
            </div>
        </div>
    `
}
