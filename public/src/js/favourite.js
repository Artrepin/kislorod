if($("#favvue").length) {

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
        el: '#favvue',
        data: {
            buildings: [],
        },
        updated: function() {
                Vue.nextTick(() => {
                  updateFavourite()
                })
        },
        created: function () {
          let fav = JSON.parse(localStorage.getItem("fav") || "[]")
          fav.forEach(id => {
            axios.post('/getBuilding',{
              id: id
            }).then(json => {
              json = json.data
              let data = {}
              data.id = json.iBuildingID
              data.name = json.sBuildingTitle
              data.district = json.sBuildingDistrict
              data.sBuildingAvatar = json.sBuildingAvatar
              data.status = json.sBuildingStatus

              data.min_area = Infinity
              data.max_area = -Infinity
              data.min_price = Infinity
              data.max_price = -Infinity
              
              json.plans.forEach(plan => {
                data.min_area = Math.min(data.min_area,plan.fPlanArea)
                data.max_area = Math.max(data.max_area,plan.fPlanArea)
              })
              json.apartaments.forEach(apt => {
                data.min_price = Math.min(data.min_price,apt.iApartamentPrice)
                data.max_price = Math.max(data.max_price,apt.iApartamentPrice)
              })
              this.buildings.push(data)
            })
          })
        },
        methods: {
        },
    })

}

