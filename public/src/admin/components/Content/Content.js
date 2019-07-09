export default{
	name:"Content",
	created: function(){
		this.get()
	},

	data: () => {
		return {
			contents: []
		}
	},


	methods: {

		get: function(){
			axios.post('/admin/ContentGet', {
			})
			.then( (response) => {
				this.contents = response.data.contents
				console.log(this.contents)
			})
		},
		update: function(){
			axios.post('/admin/ContentEdit', {
				contents: this.contents
			})
		},
		add: function(){
			this.update()
		}
	},
	template: `
			<div class="main-content content-people">
					<app-header v-bind:title="'Контент'" v-bind:button="{title:'Сохранить', method:'add'}"></app-header>
					<div class="container-fluid">

						<div class="row" v-for="content in contents">
							<div class="col">
								<label for="">{{ content.sContentName }} </label>
								<input class="form-control" v-model="content.sContentValue">
							</div>
						</div>
					</div>
			</div>
	`
}

