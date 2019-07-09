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
		methods: {
			get: function(){
					axios.post('/admin/CategoryList', {})
					.then( (response) => {
							this.categories = response.data.categories
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
					console.log(this.categories)
					console.log(this.current)
					axios.post('/admin/CategoryUpdate', {
							category: this.categories[this.current]
					})
					.then( (response) => {
							Vue.set(this.categories, response.data.categories)
							Vue.set(this, 'current', false)
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
                                <div class="card-img-top"></div>
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
