export default {
    name: 'BuildingEditStage',
    created: function () {
        Vue.set(this.$parent, 'menuActive', 3)
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
        stageAdd: function () {
            this.building.Stages.push({})
        },
        uploadStage: function (index) {
            var formData = new FormData();
                formData.append('stage', this.$refs.stageImage[index].file);
            axios.post('/admin/BuildingUploadStage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then( (response) => {
                Vue.set(this.building.Stages[index], 'sStageImage', response.data.file.filename)
            })
        },
        stageDel: function (index) {
            Vue.set(this.building.Stages[index], 'del', true)
        }
    },
    template: `
        <div class="container-fluid building-edit-stage">
            <div class="row">
                <div class="col-xl-4 col-lg-6" v-for="(stage, index) in building.Stages" v-if="!stage.del">
                    <div class="card">
                        <picture-input
                            ref="stageImage"
                            @change="uploadStage(index)"
                            width="1170"
                            height="450"
                            margin="0"
                            radius="0"
                            accept="image/jpeg,image/png"
                            size="50"
                            v-bind:prefill="(stage.sStageImage) ? '/images/building/stage/'+stage.sStageImage : ''"
                            buttonClass="btn btn-primary btn-sm"
                            :hideChangeButton='true'
                            :customStrings="{
                                drag: 'Перетащите изображение<br>или<br>нажмите для выбора файла'
                            }"></picture-input>
                        <div class="remove" v-on:click="stageDel(index)"><i class="material-icons">delete</i></div>
                        <div class="card-body">
                            <div class="form-group">
                                <label for="">Дата съемки</label>
                                <datepicker input-class="form-control" :format="'yyyy-MM-dd'" v-model="stage.dStageDate"></datepicker>
                            </div>
                            <label for="">Описание этапа строительства</label>
                            <textarea class="form-control" rows="3" v-model="stage.tStageDesc"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <button type="button" class="btn btn-primary" v-on:click="stageAdd">Добавить этап</button>
            </div>
        </div>
    `
}
