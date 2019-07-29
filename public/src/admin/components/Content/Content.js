export default{
	name:"Content",
	created: function(){
		this.get()
	},
  components: {
      'picture-input': PictureInput,
  },

	data: () => {
		return {
			contents: []
		}
	},


	methods: {
    uploadPlan: function (id, index) {
        console.log(this.$refs)
            console.log(this.$refs['images_'+id][0].file);
        var formData = new FormData();
            formData.append('img', this.$refs['images_'+id][0].file);
        axios.post('/admin/GenericUploadImage', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then( (response) => {
            Vue.set(this.contents[index], 'sContentValue', response.data.file.filename)
        })
    },

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

						<div class="row" v-for="(content, index) in contents">
							<div class="col">
								<label for="">{{ content.sContentName }} </label>

                <picture-input
                    v-bind:ref="'images_'+content.sContentKey"
                    v-if="content.sContentValue.includes('.jpg') || content.sContentValue.includes('.png')"
                    @change="uploadPlan(content.sContentKey, index)"
                    width="450"
                    height="200"
                    margin="0"
                    radius="0"
                    :crop="false"
                    accept="image/jpeg,image/png"
                    size="50"
                    v-bind:prefill="(content.sContentValue) ?content.sContentValue : ''"
                    buttonClass="btn btn-primary btn-sm"
                    :hideChangeButton='true'
                        :customStrings="{
                        drag: 'Перетащите изображение<br>или<br>нажмите для выбора файла'
                    }"></picture-input>
								<input class="form-control" v-model="content.sContentValue" v-else>
							</div>
						</div>
					</div>
			</div>
	`
}

