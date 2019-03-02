export default {
    name: 'BuildingEdit',
    created: function () {
        this.get()
    },
    props: [
        'iBuildingID'
    ],
    data: function () {
        return {
            loading: false,
            menu: [
                {
                    title: 'Параметры',
                    uri: ''
                },
                {
                    title: 'Планировки',
                    uri: '/plan'
                },
                {
                    title: 'Квартиры',
                    uri: '/apartament'
                },
            ],
            building: {
                advantage: [],
                stage: []
            }
        }
    },
    components: {
        'picture-input': PictureInput,
        'datepicker': vuejsDatepicker
    },
    methods: {
        get: function () {
            if (this.iBuildingID) {
                axios.post('/admin/BuildingEdit', {
                    iBuildingID: this.iBuildingID
                })
                .then( (response) => {
                    this.building = response.data.building
                })
            }    
        },
        update: function () {
            Vue.set(this, 'loading', true)
            axios.post('/admin/BuildingUpdate', {
                building: this.building
            })
            .then( (response) => {
                Vue.set(this, 'building', response.data)
                Vue.set(this, 'loading', false)
                this.$router.push('/building/' + this.building.iBuildingID)
            })
        },
        remove: function () {
            axios.post('/admin/BuildingRemove', {
                building: this.building
            })
            .then( (response) => {
                this.$router.push('/building')
            })
        },
        uploadAvatar: function (column) {
            var formData = new FormData();
                formData.append(column, this.$refs[column].file);
            axios.post('/admin/BuildingUploadAvatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'column': column
                }
            }).then( (response) => {
                Vue.set(this.building, column, response.data.file.filename)
            })
        },
        uploadStage: function (index) {
            var formData = new FormData();
                formData.append('stage', this.$refs.stageImage[index].file);
            axios.post('/admin/BuildingUploadStage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then( (response) => {
                Vue.set(this.building.stage[index], 'sStageImage', response.data.file.filename)
            })
        },
        advantageAdd: function () {
            this.building.advantage.push({
                iAdvantageID: null,
                sAdvantageTitle: null
            })
        },
        stageAdd: function () {
            this.building.stage.push({})
        },
        stageDel: function (index) {
            var iStageID = this.building.stage[index].iStageID
            if (iStageID) {
                if ('stage_destroy' in this.building) {
                    
                } else {
                    this.building.stage_destroy = []
                }
                this.building.stage_destroy.push(iStageID)
            }
            this.building.stage.splice(index, 1)
        }
    },
    template: `
        <div class="main-content">
            <building-edit-header v-bind:building="building" v-bind:menuActive=0></building-edit-header>
            <div class="container-fluid">
                <form>
                    <input type="hidden" v-model="building.iBuildingID">
                    <input type="hidden" v-model="building.sBuildingAvatar">
                    <input type="hidden" v-model="building.sBuildingCoverSmall">
                    <input type="hidden" v-model="building.sBuildingCoverBig">
                    <div class="tab-pane fade show active" id="tab_0" role="tabpanel" aria-labelledby="tab_0">
                    <div class="row">
                        <div class="col">
                            <div class="card">
                                <div class="card-header">
                                    <div class="row align-items-center">
                                        <div class="col">
                                            <h4 class="card-header-title">Основные данные</h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="">Наименование объекта</label>
                                        <input type="text" class="form-control" v-model="building.sBuildingTitle">
                                    </div>
                                    <div class="form-group">
                                        <label for="">Краткое описание объекта</label>
                                        <textarea class="form-control" rows="3" v-model="building.sBuildingDescription"></textarea>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="">Google Координаты X</label>
                                                <input type="text" class="form-control" v-model="building.fBuildingLocationeX">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="">Google Координаты Y</label>
                                                <input type="text" class="form-control" v-model="building.fBuildingLocationeY">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="">Ссылка на видео YouTube</label>
                                        <input type="text" class="form-control" v-model="building.sBuildingYoutube">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card">
                                <div class="card-header">
                                    <div class="row align-items-center">
                                        <div class="col">
                                            <h4 class="card-header-title">Преимущества</h4>
                                        </div>
                                        <div class="col-auto">
                                            <button type="button" class="btn btn-sm btn-primary" v-on:click="advantageAdd">Добавить</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <building-edit-advantage v-bind:advantage="building.advantage"></building-edit-advantage>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="card">
                                <div class="card-header">
                                    <div class="row align-items-center">
                                        <div class="col">
                                            <h4 class="card-header-title">Изображения</h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class=row>
                                        <div class="col-12">
                                            <picture-input
                                                ref="sBuildingAvatar"
                                                @change="uploadAvatar('sBuildingAvatar')"
                                                width="200"
                                                height="200"
                                                margin="16"
                                                radius="6"
                                                accept="image/jpeg,image/png"
                                                size="50"
                                                v-bind:prefill="Object.keys(building).length !== 0 && building.sBuildingAvatar != null ? '/images/building/'+building.sBuildingAvatar : ''"
                                                buttonClass="btn btn-primary btn-sm"
                                                :customStrings="{
                                                    drag: 'Drag or click',
                                                    change: 'Change img'
                                                }"></picture-input>
                                        </div>
                                        <div class="col-12">
                                            <picture-input
                                                ref="sBuildingCoverSmall"
                                                @change="uploadAvatar('sBuildingCoverSmall')"
                                                width="200"
                                                height="200"
                                                margin="16"
                                                radius="6"
                                                accept="image/jpeg,image/png"
                                                size="50"
                                                v-bind:prefill="Object.keys(building).length !== 0 && building.sBuildingCoverSmall != null ? '/images/building/'+building.sBuildingCoverSmall : ''"
                                                buttonClass="btn btn-primary btn-sm"
                                                :customStrings="{
                                                    drag: 'Drag or click',
                                                    change: 'Change img'
                                                }"></picture-input>
                                        </div>
                                        <div class="col-12">
                                            <picture-input
                                                ref="sBuildingCoverBig"
                                                @change="uploadAvatar('sBuildingCoverBig')"
                                                width="200"
                                                height="200"
                                                margin="16"
                                                radius="6"
                                                accept="image/jpeg,image/png"
                                                size="50"
                                                v-bind:prefill="Object.keys(building).length !== 0 && building.sBuildingCoverBig != null ? '/images/building/'+building.sBuildingCoverBig : ''"
                                                buttonClass="btn btn-primary btn-sm"
                                                :customStrings="{
                                                    drag: 'Drag or click',
                                                    change: 'Change img'
                                                }"></picture-input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card">
                                <div class="card-header">
                                    <div class="row align-items-center">
                                        <div class="col">
                                            <h4 class="card-header-title">Этапы строительства</h4>
                                        </div>
                                        <div class="col-auto">
                                            <button type="button" class="btn btn-sm btn-primary" v-on:click="stageAdd">Добавить</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="row" v-for="(stage, index) in building.stage">
                                        <input type="hidden" v-model="stage.iStageID">
                                        <input type="hidden" v-model="stage.sStageImage">
                                        <div class="col">
                                            <picture-input
                                                ref="stageImage"
                                                @change="uploadStage(index)"
                                                width="200"
                                                height="200"
                                                margin="16"
                                                radius="6"
                                                accept="image/jpeg,image/png"
                                                size="50"
                                                v-bind:prefill="(stage.sStageImage) ? '/images/building/stage/'+stage.sStageImage : ''"
                                                buttonClass="btn btn-primary btn-sm"
                                                :customStrings="{
                                                    drag: 'Drag or click',
                                                    change: 'Change img'
                                                }"></picture-input>
                                        </div>
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="">Дата съемки</label>
                                                <datepicker input-class="form-control" :format="'yyyy-MM-dd'" v-model="stage.dStageDate"></datepicker>
                                            </div>
                                            <div class="form-group">
                                                <label for="">Описание этапа строительства</label>
                                                <textarea class="form-control" rows="2" v-model="stage.tStageDesc"></textarea>
                                            </div>
                                            <div class="form-group">
                                                <button type="button" class="btn btn-sm btn-danger" v-on:click="stageDel(index)">удалить</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <button v-bind:disabled="loading" class="btn btn-success" type="submit" v-on:click.prevent="update">Сохранить</button>
                        <button v-bind:disabled="loading" v-if="building && building.iBuildingID" class="btn btn-danger" type="button" v-on:click.prevent="remove">Удалить</button>
                    </div>
                </form>
            </div>
        </div>
    `
}
