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
            filters: {},
            selected: {},
            buildings: [],
            useBuilding: false
        },
        created: function () {
            axios.post('/catalog/init', {

            }).then((json) => {
                // console.log(json.data)
                this.filters = json.data.filters,
                this.selected = json.data.selected

                this.getBuilding()
                
                // Vue.nextTick(function () {
                //     $(".js-slider-wrapper").each(function(){
            
                //         var slider_options = $(this).find(".js-slider-options"),
                //             slider_val = slider_options.data("value"),
                //             slider_min = slider_options.data("min"),
                //             slider_max = slider_options.data("max"),
                //             slider_step = slider_options.data("step"),
                //             slider_meas = slider_options.data("meas"),
                //             slider_mask = $(this).find(".js-slider-mask");
                        
                //         $(this).find(".js-slider").slider({
                //             range: "min",
                //             min: slider_min,
                //             max: slider_max,
                //             value: slider_val,
                //             step: slider_step,
                //             slide: function( event, ui ) {
                //                 slider_options.val( ui.value + " " + slider_meas );
                //                 slider_mask.val( ui.value );
                //             }
                //         });

                //         $(".js-slider-mask").keyup(function(){
                //             var slider_mask = $(this).val();
                //             var slider_meas = $(this).closest(".js-slider-wrapper").find(".js-slider-options").data("meas");
                //             $(this).closest(".js-slider-wrapper").find(".js-slider").slider({value: slider_mask});
                //             $(this).closest(".js-slider-wrapper").find(".js-slider-options").val( slider_mask + " " + slider_meas  );
                //         });                
                        
                //     });
            
                // })
            })
        },
        methods: {
            declOfNum(number, titles) {  
                cases = [2, 0, 1, 1, 1, 2];  
                return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
            },
            search: function () {
                Vue.set(this.selected, 'price', Number($("input#price").prev().val()) )
                Vue.set(this.selected, 'area', Number($("input#square").prev().val()) )
                Vue.set(this.selected, 'floor', Number($("input#floor").prev().val()) )
                Vue.set(this.selected, 'room', Number($("input#rooms").prev().val()) )
                Vue.set(this.selected, 'year', Number($('input[name=deadline]:checked').val()) )

                this.getBuilding()

                $("html, body").animate({
                    scrollTop: $('#catalog').offset().top + "px"
                }, {
                    duration: 500
                });
    
            },
            getBuilding: function () {
                axios.post('/catalog/building', {
                    selected: this.selected
                }).then((json) => {
                    this.buildings = json.data.buildings
                    this.buildings.forEach(element => {
                        // console.log(element)
                        
                        element.plansCount = element.plans.length
                        element.plansCountString = this.declOfNum(element.plansCount, ['планировка', 'планировки', 'планировок'])

                        var fPlanAreaMin = [];
                        var apartmentCount = [];
                        
                        var iApartamentPriceMin = [];

                        element.plans.forEach(element2 => {
                            fPlanAreaMin.push(element2.fPlanArea)
                            apartmentCount.push(element2.apartaments.length)
                            element2.apartaments.forEach(element3 => {
                                iApartamentPriceMin.push(element3.iApartamentPrice)
                            });
                        });
                        // console.log(apartmentCount)
                        element.fPlanAreaMin = Math.min.apply(null, fPlanAreaMin)

                        element.iApartamentPriceMin = Math.min.apply(null, iApartamentPriceMin)

                        var apartmentCount = apartmentCount.reduce(function(sum, current) {
                            return sum + current
                        });
                        element.apartmentCount = apartmentCount
                        element.apartmentCountString = this.declOfNum(element.apartmentCount, ['квартира', 'квартиры', 'квартир'])
                        // console.log(apartmentCount)
                    });
                    // Vue.nextTick(function () {
                        // vm.use(0)
                    // })
                })
            },
            use: function (index) {
                Vue.set(this, 'useBuilding', index)
                Vue.nextTick(function () {
                    // maskForInput()
                    // validateAndSendForm()

                    if ($('.catalog-slider').hasClass('slick-slider')) {
                        $('.catalog-slider').slick('unslick')
                    }

                    $('.catalog-slider').slick({
                        arrows: true,
                        prevArrow: '<button class="slick-arrow slick-arrow_prev icon-right-arrow"></button>',
                        nextArrow: '<button class="slick-arrow slick-arrow_next icon-right-arrow"></button>',
                        dots: false,
                        infinite: true,
                        speed: 500,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    })

                    // $(".catalog-slider .slick-arrow").each(function(){
                    //     var height_pic = $(".catalog-slider__pic:visible").height();
                    //     height_pic = height_pic/2;
                    //     $(this).css("top",height_pic);
                    // })
                })

                // this.useBuilding = i
                // $(".cases-list__item.active").removeClass("active").find(".cases-list__hide").hide()
                // $(".cases-list__item").eq(index).addClass("active").find(".cases-list__hide").show()
            }
        },
    })

}
