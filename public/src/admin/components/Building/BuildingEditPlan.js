export default {
    name: 'BuildingEditPlan',
    created: function () {
        Vue.set(this.$parent, 'menuActive', 1)
    },
    components: {
        'picture-input': PictureInput,
    },
    props: [
        'building'
    ],
    data: function () {
        return {
            usePlan: false
        }
    },
    methods: {
        openModal: function (index) {
            Vue.set(this, 'usePlan', index)
            $('#modalPlanEdit').modal()
        },
        add: function () {
            this.building.plans.push({plan_images: []})
            // this.openModal(this.plan.length-1)
        },
        del: function () {
            Vue.set(this.building.plans[this.usePlan], 'del', true)
            $('#modalPlanEdit').modal('hide')
        },
        addImage: function () {
            this.building.plans[this.usePlan].plan_images.push({})
        },
        delImage: function (index) {
            Vue.set(this.building.plans[this.usePlan].plan_images[index], 'del', true)
        },
        uploadPlan: function (index) {
            var formData = new FormData();
                formData.append('plan', this.$refs.planImage[index].file);
            axios.post('/admin/BuildingUploadPlan', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then( (response) => {
                Vue.set(this.building.plans[this.usePlan].plan_images[index], 'sPlanImage', response.data.file.filename)
            })
        },
    },
    template: `
        <div class="container-fluid building-edit-plan">
            <div class="row">
                <div class="col-xl-3 col-lg-4 col-md-6" v-for="(plan, index) in building.plans" v-if="!plan.del">
                    <div class="card" v-on:click.prevent="openModal(index)">

                        <div v-bind:id="'carousel'+index" class="carousel slide">
                            <ol class="carousel-indicators" v-if="plan.plan_images && plan.plan_images.length > 1">
                                <li
                                    v-for="(image, index) in plan.plan_images"
                                    v-if="image.sPlanImage && !image.del"
                                    v-bind:data-target="'#carousel'+index"
                                    v-bind:data-slide-to="index"
                                    v-bind:class="{ active: index == 0}"></li>
                            </ol>
                            <div class="carousel-inner" v-if="plan.plan_images && plan.plan_images.length > 0">
                                <div class="carousel-item"
                                    data-interval="600000"
                                    v-for="(image, index) in plan.plan_images"
                                    v-if="image.sPlanImage && !image.del"
                                    v-bind:class="{ active: index == 0 }">
                                    <img v-bind:src="'/images/building/plan/' + image.sPlanImage" class="d-block w-100 mt-4" alt="...">
                                </div>
                            </div>
                            <div v-else class="empty mt-4"></div>
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
                                    <h4 class="card-title mb-2">
                                        <template v-if="plan.sPlanName">{{ plan.sPlanName }}</template>
                                        <template v-else>Без названия</template>
                                    </h4>
                                    <div class="edit"></div>
                                    <p class="card-text small text-muted">
                                        <template v-if="plan.iRoomCount">Кол-во комнат: {{ plan.iRoomCount }}</template>
                                        <template v-else>Не указано кол-во комнат</template>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal" id="modalPlanEdit" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content" v-if="usePlan !== false && building.plans[usePlan]">
                        <form>
                            <div class="modal-header">
                                <h4 class="modal-title">Карточка планировки</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-sm">
                                        <div class="form-group">
                                            <label for="">Наименование планировки</label>
                                            <input type="text" class="form-control" v-model="building.plans[usePlan].sPlanName">
                                        </div>
                                    </div>
                                    <div class="col-sm">
                                        <div class="form-group">
                                            <label for="">Количество комнат</label>
                                            <input type="text" class="form-control" v-model.number="building.plans[usePlan].iRoomCount">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm">
                                        <div class="form-group">
                                            <label for="">Площадь</label>
                                            <input type="text" class="form-control" v-model.number="building.plans[usePlan].fPlanArea">
                                        </div>
                                    </div>
                                    <div class="col-sm">
                                        <div class="form-group">
                                            <label for="">Тип планировки</label>
                                            <select class="form-control" v-model="building.plans[usePlan].iTypeID">
                                                <option
                                                    v-for="(type, index) in this.$parent.type"
                                                    v-bind:value="type.iTypeID"
                                                    >{{ type.sTypeTitle }}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group form-group-image" v-for="(image, index) in building.plans[usePlan].plan_images" v-if="!image.del">
                                    <input type="hidden" class="form-control" v-model="image.sPlanImage">
                                    <picture-input
                                        ref="planImage"
                                        @change="uploadPlan(index)"
                                        width="450"
                                        height="200"
                                        margin="0"
                                        radius="0"
                                        :crop="false"
                                        accept="image/jpeg,image/png"
                                        size="50"
                                        v-bind:prefill="(image.sPlanImage) ? '/images/building/plan/'+image.sPlanImage : ''"
                                        buttonClass="btn btn-primary btn-sm"
                                        :hideChangeButton='true'
                                            :customStrings="{
                                            drag: 'Перетащите изображение<br>или<br>нажмите для выбора файла'
                                        }"></picture-input>
                                    <div class="remove" v-on:click.prevent="delImage(index)"><i class="material-icons">delete</i></div>
                                </div>
                                <button type="button" class="btn btn-primary" v-on:click.prevent="addImage">Добавить изображение</button>
                                <button type="button" class="btn btn-outline-danger float-right d-block d-sm-block" v-on:click.prevent="del">Удалить</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <button class="btn btn-primary" v-on:click="add">Добавить планировку</button>
        </div>
    `
}
