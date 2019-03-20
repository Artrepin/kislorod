export default {
    name: 'BuildingEditBasic',
    created: function () {
        Vue.set(this.$parent, 'menuActive', 0)
    },
    components: {
        'picture-input': PictureInput,
        'datepicker': vuejsDatepicker,
    },
    props: [
        'building'
    ],
    data: function () {
        return {

        }
    },
    methods: {
        advantageAdd: function () {
            this.building.Advantages.push({})
        },
        advantageDel: function (index) {
            Vue.set(this.building.Advantages[index], 'del', true)
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
        }
    },
    template: `
        <div class="container-fluid">
            <form id="form-building">
                <div class="row">
                    <div class="col-md">
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
                                <div class="form-group">
                                    <label>Превью для видео YouTube</label>
                                    <picture-input
                                        ref="sBuildingCoverBig"
                                        @change="uploadAvatar('sBuildingCoverBig')"
                                        width="1170"
                                        height="450"
                                        margin="0"
                                        radius="0"
                                        accept="image/jpeg,image/png"
                                        size="50"
                                        v-bind:prefill="Object.keys(building).length !== 0 && building.sBuildingCoverBig != null ? '/images/building/'+building.sBuildingCoverBig : ''"
                                        buttonClass="btn btn-primary btn-sm"
                                        :hideChangeButton='true'
                                        :customStrings="{
                                            drag: 'Перетащите изображение<br>или<br>нажмите для выбора файла<br>(1170px / 450px)'
                                        }"></picture-input>
                                </div>
                                <div class="form-group">
                                    <label for="">Дата сдачи объекта</label>
                                    <datepicker input-class="form-control" :format="'yyyy-MM-dd'" v-model="building.dBuildingReady"></datepicker>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md">
                        <div class="card">
                            <div class="card-header">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <h4 class="card-header-title">Преимущества</h4>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body" v-if="building.Advantages">
                                <div
                                    class="input-group mb-3"
                                    v-for="(advantage, index) in building.Advantages"
                                    v-bind:key="index"
                                    v-if="!advantage.del">
                                    <input type="text" class="form-control" v-model="advantage.sAdvantageTitle">
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="button" v-on:click="advantageDel(index)">
                                            <i class="material-icons">delete</i>
                                        </button>
                                    </div>
                                </div>        
                                <button type="button" class="btn btn-primary mt-3" v-on:click="advantageAdd">Добавить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>        
    `
}
