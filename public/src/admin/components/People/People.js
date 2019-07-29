export default {
    name: 'People',
    created: function () {
        this.get()
    },
    data: function () {
        return {
            loading: false,
            people: [],
            department: [],
            usePeople: false
        }
    },
    methods: {
        get: function () {
            axios.post('/admin/PeopleList', {})
            .then( (response) => {
                this.people = response.data.people
                this.department = response.data.department
            })
        },
        openModal: function () {
            $('#modalPeopleEdit').modal()
        },
        clickCard: function (index) {
            Vue.set(this, 'usePeople', index)
            this.openModal()
        },
        add: function () {
            this.people.push({})
            this.clickCard(this.people.length-1)
        },
        del: function () {
            if (this.people[this.usePeople].iPeopleID) {
                axios.post('/admin/PeopleDelete', {
                    iPeopleID: this.people[this.usePeople].iPeopleID
                })
                .then( (response) => {

                })
            }
            this.people.splice(this.usePeople,1)
            Vue.set(this, 'usePeople', false)
            $('#modalPeopleEdit').modal('hide')
        },
        update: function () {
            axios.post('/admin/PeopleUpdate', {
                people: this.people[this.usePeople]
            })
            .then( (response) => {
                Vue.set(this.people, this.usePeople, response.data.people)
                Vue.set(this, 'usePeople', false)
                $('#modalPeopleEdit').modal('hide')
            })
        },
        uploadAvatar: function () {
            var formData = new FormData();
                formData.append('sPeopleImage', this.$refs.sPeopleImage.file);
            axios.post('/admin/PeopleUpload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then( (response) => {
                Vue.set(this.people[this.usePeople], 'sPeopleImage', response.data.file.filename)
            })
        }
    },
    components: {
        'picture-input': PictureInput,
    },
    template: `
        <div class="main-content content-people">
            <app-header v-bind:title="'Сотрудники'" v-bind:button="{title:'Добавить', method:'add'}"></app-header>

            <div class="modal" id="modalPeopleEdit" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                        <form>
                            <div class="modal-header">
                                <h4 class="modal-title">Карточка сотрудника</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body" v-if="usePeople !== false && people[usePeople]">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="form-group" style="margin-bottom: 1.375rem;">
                                            <label for="">Изображение</label>
                                            <picture-input
                                                ref="sPeopleImage"
                                                @change="uploadAvatar"
                                                width="300"
                                                height="318"
                                                margin="0"
                                                radius="0"
                                                accept="image/jpeg,image/png"
                                                size="50"
                                                v-bind:prefill="usePeople !== false && people[usePeople].sPeopleImage != null ? '/images/people/'+people[usePeople].sPeopleImage : ''"
                                                buttonClass="btn btn-primary btn-sm"
                                                :hideChangeButton='true'
                                                :customStrings="{
                                                    drag: 'Перетащите изображение<br>или<br>нажмите для выбора файла'
                                                }"></picture-input>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label for="">Фамилия сотрудника</label>
                                            <input type="text" class="form-control" v-model="people[usePeople].sPeopleLastname">
                                        </div>
                                        <div class="form-group">
                                            <label for="">Имя сотрудника</label>
                                            <input type="text" class="form-control" v-model="people[usePeople].sPeopleName">
                                        </div>
                                        <div class="form-group">
                                            <label for="">Должность сотрудника</label>
                                            <input type="text" class="form-control" v-model="people[usePeople].sPeoplePosition">
                                        </div>
                                        <div class="form-group">
                                            <label for="">Отдел</label>
                                            <select class="form-control" v-model="people[usePeople].iDepartmentID">
                                                <option v-for="(department, index) in department" v-bind:value="department.iDepartmentID">{{ department.sDepartmentTitle }}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary" v-on:click.prevent="update">Сохранить</button>
                                <button type="button" class="btn btn-outline-danger float-right" v-on:click.prevent="del"><i class="material-icons">delete</i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            <div class="container-fluid people-list">
                <div class="row">
                    <template v-for="(people, index) in people">
                        <div class="col-xl-3 col-lg-4" v-if="people.iPeopleID">
                            <div class="card" v-on:click="clickCard(index)">
                                <img v-if="people.sPeopleImage !== null" v-bind:src="'/images/people/' + people.sPeopleImage" class="card-img-top">
                                <div v-else class="card-img-top"></div>
                                <div class="card-body text-center">
                                    <h2 class="card-title">
                                        <template v-if="people.sPeopleLastname">{{ people.sPeopleLastname }}</template>
                                        <template v-else><br></template>
                                        <br>
                                        <template v-if="people.sPeopleName">{{ people.sPeopleName }}</template>
                                        <template v-else></template>
                                    </h2>
                                    <p class="card-text text-muted card-desc">
                                        <template v-if="people.sPeoplePosition">{{ people.sPeoplePosition }}</template>
                                        <template v-else><br></template>
                                    </p>
                                    <hr>
                                    <p class="card-text text-muted card-desc">
                                        <template v-if="people.department && people.department.sDepartmentTitle"><small>{{ people.department.sDepartmentTitle }}</small></template>
                                        <template v-else><br></template>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>            
        </div>
    `,
}
