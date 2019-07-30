if($("#cartvue").length) {

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
        el: '#cartvue',
        data: {
          building: []
        },
        updated: function(){
          Vue.nextTick(() => {
            updateFavourite()
          })

        },
        created: function () {
            axios.post('/getBuilding', {
              id: window.location.pathname.replace('/cart/','')

            }).then((json) => {
                // console.log(json.data)
              this.building = json.data
              let element = this.building
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
              set_map(element.fBuildingLocationeX,element.fBuildingLocationeY,element.sBuildingTitle,'/images/building' + element.sBuildingAvatar)
              Vue.nextTick(() => {
                updateFavourite()
              })


            })
        },
        methods: {
            declOfNum(number, titles) {  
                cases = [2, 0, 1, 1, 1, 2];  
                return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
            },
        },
    })

}


