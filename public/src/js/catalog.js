if($("#catalogvue").length) {

    // $('.catalog-slider').slick({
    //     arrows: true,
    //     prevArrow: '<button class="slick-arrow slick-arrow_prev icon-right-arrow"></button>',
    //     nextArrow: '<button class="slick-arrow slick-arrow_next icon-right-arrow"></button>',
    //     dots: false,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1
    // })

    var vm = new Vue({
        el: '#catalogvue',
        data: {
            categories: [],
            filters: [],
            selected: {},
            buildings: [],
						buildings_total: 0,
            useBuilding: false
        },
        updated: function() {
                connectTabs()
                Vue.nextTick(() => {

                  updateFavourite()
                })
                if($(".js-tabs-link.active").length == 0){
                  $(".js-tabs-link").first().click()
                }
        },
        created: function () {
            axios.post('/catalog/init', {

            }).then((json) => {
                // console.log(json.data)
                this.categories = json.data.categories

            })
        },
        methods: {
            declOfNum(number, titles) {  
                cases = [2, 0, 1, 1, 1, 2];  
                return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
            },
            search: function () {
								let parent = $(".catalog .tabs__container > .tabs__item:visible");
								console.log(parent)
								Vue.set(this.selected, 'cat', $(".catalog .tabs__nav .tabs__link.active .name").text())
                Vue.set(this.selected, 'min_price', Number(parent.find(".js-price-start").text()) )
                Vue.set(this.selected, 'max_price', Number(parent.find(".js-price-finish").text()) )
                Vue.set(this.selected, 'min_area', Number(parent.find(".js-area-start").text()) )
                Vue.set(this.selected, 'max_area', Number(parent.find(".js-area-finish").text()) )
                Vue.set(this.selected, 'district', parent.find(".district").val() )
                Vue.set(this.selected, 'ready', parent.find(".ready").val() )
                Vue.set(this.selected, 'class', parent.find(".class").val() )
                Vue.set(this.selected, 'type', parent.find(".type").val() )

                this.getBuilding()

                //$("html, body").animate({
                    //scrollTop: $('#catalog').offset().top + "px"
                //}, {
                    //duration: 500
                //});
    
            },
            getBuilding: function () {
                axios.post('/catalog/building', {
                    selected: this.selected
                }).then((json) => {
                    Vue.set(this,'buildings', [])
										Vue.set(this,'buildings_total',json.data.length)
                    json.data.forEach(element => {
                        // console.log(element)
												let data = {}
                        data.id = element.iBuildingID
												data.name = element.sBuildingTitle
												data.district = element.sBuildingDistrict
                        data.sBuildingAvatar = element.sBuildingCoverSmall
                        data.status = element.sBuildingStatus

                        data.min_area = Infinity
                        data.max_area = -Infinity
                        data.min_price = Infinity
                        data.max_price = -Infinity
                        
                        element.plans.forEach(plan => {
                          data.min_area = Math.min(data.min_area,plan.fPlanArea)
                          data.max_area = Math.max(data.max_area,plan.fPlanArea)
                        })
                        element.apartaments.forEach(apt => {
                          data.min_price = Math.min(data.min_price,apt.iApartamentPrice)
                          data.max_price = Math.max(data.max_price,apt.iApartamentPrice)
                        })
                        this.buildings.push(data)
                        // console.log(apartmentCount)
                    });
                })
            },
        },
    })

}

$(document).ready( () => {

    console.log('test')

	function x(){
		$(".tabs-slider .kredit-step .ajax-form").not(".js-kredit-step").off('submit')
		$(".tabs-slider .kredit-step .ajax-form").not(".js-kredit-step").on('submit', e => {
			debugger;

			e.preventDefault()
			e.stopPropagation()

			$.ajax({
				type: "POST",
				url:"/send",
				data:	$(".kredit-step .ajax-form").serialize(),
				success: function(){
					$(".tabs-slider .kredit-step_active").removeClass("kredit-step_active").hide().next().fadeIn(500).addClass("kredit-step_active");
				}

			})


		})

	}

	x()
	setTimeout(x,1000)

})
