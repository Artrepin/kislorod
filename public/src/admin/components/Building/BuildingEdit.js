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
            building: {}
        }
    },
    components: {
        'picture-input': PictureInput
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
        advantageAdd: function () {
            if ('advantage' in this.building) {

            } else {
                Vue.set(this.building, 'advantage', [])
            }
            this.building.advantage.push({
                iAdvantageID: null,
                sAdvantageTitle: null
            })
        }
    },
    template: `
        <div class="main-content">
            <app-header
                v-if="Object.keys(building).length && building.sBuildingTitle && building.sBuildingTitle.length !== 0"
                v-bind:title="building.sBuildingTitle"></app-header>
            <app-header
                v-else
                v-bind:title="'New Building'"></app-header>
            <div class="container-fluid">
                <div class=row>
                    <div class="col">
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
                    <div class="col">
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
                    <div class="col">
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
                <form>
                    <input type="hidden" v-model="building.iBuildingID">
                    <input type="hidden" v-model="building.sBuildingAvatar">
                    <input type="hidden" v-model="building.sBuildingCoverSmall">
                    <input type="hidden" v-model="building.sBuildingCoverBig">
                    
                    <div class="form-group">
                        <label for="">sBuildingTitle</label>
                        <input type="text" class="form-control" v-model="building.sBuildingTitle">
                    </div>
                    <div class="form-group">
                        <label for="">sBuildingDescription</label>
                        <textarea class="form-control" v-model="building.sBuildingDescription"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="">fBuildingLocationeX</label>
                        <input type="text" class="form-control" v-model="building.fBuildingLocationeX">
                    </div>
                    <div class="form-group">
                        <label for="">fBuildingLocationeY</label>
                        <input type="text" class="form-control" v-model="building.fBuildingLocationeY">
                    </div>
                    <div class="form-group">
                        <label for="">sBuildingYoutube</label>
                        <input type="text" class="form-control" v-model="building.sBuildingYoutube">
                    </div>

                    <building-edit-advantage v-bind:advantage="building.advantage"></building-edit-advantage>
                    
                    <button type="button" v-on:click="advantageAdd">Add</button>

                    <button v-bind:disabled="loading" class="btn btn-primary" type="submit" v-on:click.prevent="update">update</button>
                    <button v-bind:disabled="loading" v-if="building && building.iBuildingID" class="btn btn-danger float-right" type="button" v-on:click.prevent="remove">remove</button>
                </form>
            </div>
            <pre>{{ building }}</pre>
        </div>
    `
}
