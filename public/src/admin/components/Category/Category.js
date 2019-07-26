export default{

		name: "Category",
    created: function () {
        this.get()
    },
		data: function() {
			return {
				categories:[],
				current: false
			}
		},
    components: {
        'picture-input': PictureInput,
        'datepicker': vuejsDatepicker,
    },
		methods: {
			get: function(){
					axios.post('/admin/CategoryList', {})
					.then( (response) => {
							Vue.set(this,"categories" , response.data.categories)
					})
			},
      uploadAvatar: function (column) {
          var formData = new FormData();
              formData.append(column, this.$refs[column].file);
          axios.post('/admin/CategoryUploadImage', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  'column': column,
                  'id': this.categories[this.current].iCategoryID
              }
          }).then( (response) => {
              Vue.set(this.categories[this.current], column, response.data.file.filename)
          })
      },
			openModal: function () {
					$('#modalCategoryEdit').modal()
			},
			clickCard: function (index) {
					Vue.set(this, 'current', index)
					this.openModal()
			},
			add: function () {
					this.categories.push({})
					this.clickCard(this.categories.length-1)
			},
			del: function () {
					if (this.categories[this.current].iCategoryID) {
							axios.post('/admin/CategoryDelete', {
									iCategoryID: this.categories[this.current].iCategoryID
							})
							.then( (response) => {

							})
					}
					this.categories.splice(this.current,1)
					Vue.set(this, 'category', false)
					$('#modalCategoryEdit').modal('hide')
			},
			update: function () {
					axios.post('/admin/CategoryUpdate', {
							category: this.categories[this.current]
					})
					.then( (response) => {
							Vue.set(this.categories, response.data.categories)
							Vue.set(this, 'current', false)
              this.get()
							$('#modalCategoryEdit').modal('hide')
					})
			},
		},
    template: `
        <div class="main-content content-people">
            <app-header v-bind:title="'Категории'" v-bind:button="{title:'Добавить', method:'add'}"></app-header>

            <div class="modal" id="modalCategoryEdit" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                        <form>
                            <div class="modal-header">
                                <h4 class="modal-title">Категория</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body" v-if="current !== false && categories[current]">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label for="">Имя категории</label>
                                            <input type="text" class="form-control" v-model="categories[current].sCategoryName">
                                        </div>
                                        <div class="form-group">
                                            <label for="">Порядок сортировки</label>
                                            <input type="text" class="form-control" v-model="categories[current].iCategorySort">
                                        </div>

                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Изображение категории </label>
                                    <picture-input
                                        ref="sCategoryImage"
                                        @change="uploadAvatar('sCategoryImage')"
                                        width="1170"
                                        height="450"
                                        margin="0"
                                        radius="0"
                                        accept="image/jpeg,image/png"
                                        size="50"
                                        v-bind:prefill="Object.keys(categories[current]).length !== 0 && categories[current].sCategoryImage != null ? '/images/categories/'+categories[current].sCategoryImage : ''"
                                        buttonClass="btn btn-primary btn-sm"
                                        :hideChangeButton='true'
                                        :customStrings="{
                                            drag: 'Перетащите изображение<br>или<br>нажмите для выбора файла<br>(260px / 175px)'
                                        }"></picture-input>
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
                    <template v-for="(category, index) in categories">
                        <div class="col-xl-3 col-lg-4" v-if="category.iCategoryID">
                            <div class="card" v-on:click="clickCard(index)">
                                <div class="card-img-top"><img style="max-width:100%" v-bind:src="'/images/categories/'+category.sCategoryImage">  </div>
                                <div class="card-body text-center">
                                    <h2 class="card-title">
                                        <template v-if="category.sCategoryName">{{ category.sCategoryName }}</template>
                                        <template v-else><br></template>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>            
        </div>
    `,

}
