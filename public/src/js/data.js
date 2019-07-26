
function toggleFavourite(that){

  console.log(that)
  let $this = $(that)
  $this.toggleClass("active")
  let fav = JSON.parse(localStorage.getItem("fav") || "[]")
  let id = $this.attr('id')
  if($this.hasClass("active")){
    fav.push(id)
  }else{
    fav = fav.filter(el => el != id)
  }
  console.log(fav)
  localStorage.setItem("fav",JSON.stringify(fav))
}

function updateFavourite(){
  let fav = JSON.parse(localStorage.getItem("fav") || "[]")
  console.log("UPDATE FAV")

  $("button.prod__favorite").each((ind,el) => {
    el = $(el)
    console.log(el)
    let id =  el.attr("id")
    console.log(fav,id)
    if(fav.indexOf(id) != -1){
      console.log("SET ACTIVE")
      el.addClass("active")
    }else{
      console.log("SET INACTIVE")
      el.removeClass("active")
    }
  })
}

// получить куки
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
// колхоз для показа modal exit
var secTimeShowModalExit = 10
var checkTimeShowModalExit = (getCookie('checkTimeShowModalExit')) ? getCookie('checkTimeShowModalExit') : 0
if (checkTimeShowModalExit < secTimeShowModalExit) {
    var checkTimeShowModalExitInterval = setInterval(setTimeShowModalExit, 1000)
}
function setTimeShowModalExit () {
    if (checkTimeShowModalExit >= secTimeShowModalExit) {
        var d = new Date(new Date().getTime() + 60 * 1000 * 60 * 24);
        document.cookie = "showModalExit=true; path=/; domain=kislorod123.ru; expires=" + d.toUTCString();
        clearInterval(checkTimeShowModalExitInterval)
    } else {
        checkTimeShowModalExit++
        var d = new Date(new Date().getTime() + 60 * 1000 * 60 * 24);
        document.cookie = "checkTimeShowModalExit=" + checkTimeShowModalExit + "; path=/; domain=kislorod123.ru; expires=" + d.toUTCString();
    }
}
// *** //

// tabs
function connectTabs () {
		var tabs = $('.js-tabs');
		tabs.each(function () {
				var thisTabs = $(this),
				    nav = thisTabs.find('.js-tabs-link'),
				    item = thisTabs.find('.js-tabs-item');
				nav.on('click', function () {
						var thisNav = $(this),
						    indexNav = thisNav.index();
						nav.removeClass('active');
						thisNav.addClass('active');
						item.hide();
						item.eq(indexNav).fadeIn();
						return false;
				});
		});
        $(".popup-catalog__item").click(function(){
            console.log("clicked")
            var tab_index = $(this).index();
            $('.js-tabs-link:eq(' + tab_index + ')').click();
            $(".js-catalog-close").click();
            $("html, body").animate({
                scrollTop: $(".catalog__center").offset().top + "px"
            }, {
                duration: 1000
            });
        });

    $(".js-catalog-close").click(function(){
        $(".js-popup-catalog").fadeOut(500);
        $("body").css("overflow","auto");
    });
    $('select').niceSelect();
    $('select').niceSelect("update");
    
    $(function () {
				var sliderPrice = $('.js-price-slider')
        sliderPrice.each((index,slider) => {
          let slide = $(slider)
          let parent = slide.closest('.filters__in')
          let min = parseInt(parent.find('.price-min').text())
          let max = parseInt(parent.find('.price-max').text())
				slide.slider({
						range: true,
						values: [min, max],
						min: min,
						max: max,
						step: (max - min)/100,
						slide: function slide(event, ui) {
                var sliderPrice = $(event.target),
                    startPrice = sliderPrice.closest('.filters__wrap').find('.js-price-start'),
                    finishPrice = sliderPrice.closest('.filters__wrap').find('.js-price-finish');
                console.log(ui)
                console.log(sliderPrice,startPrice,finishPrice)
								startValue = ui.values[0];
								startPriceFixed = startValue.toFixed().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
								startPrice.text(startPriceFixed);
								finishValue = ui.values[1];
								finishPriceFixed = finishValue.toFixed().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
								finishPrice.text(finishPriceFixed);
						}
          });
        })
		});
		$(function () {
				var sliderArea = $('.js-area-slider')
        sliderArea.each( (index,slider) => {
          let slide = $(slider)
          let parent = slide.closest('.filters__in')
          let min = parseInt(parent.find('.area-min').text())
          let max = parseInt(parent.find('.area-max').text())
				slide.slider({
						range: true,
						values: [min, max],
						min: min,
						max: max,
						step: (max - min)/100,
						slide: function slide(event, ui) {
                var sliderArea = $(event.target),
                    startArea = sliderArea.closest('.filters__wrap').find('.js-area-start'),
                    finishArea = sliderArea.closest('.filters__wrap').find('.js-area-finish');
								startArea.text(ui.values[0]);
								finishArea.text(ui.values[1]);
						}
          });
        })
		});



}

// Google Recaptch
function RecaptchaSuccess (response) {
    $('.gcaptcha').prop('disabled', false)
}
// *** //

function thanck() {
    $(".popup-wrap").fadeOut(500);
    $(".popup").removeClass("popup_active");
    $(".js-popup-thanck").fadeIn(500);
    $(".js-popup-thanck .popup").addClass("popup_active");
}

function maskForInput () {
    $("input[type='tel']").mask("+7 (999) 999-99-99").each(function() {

        var title = $(this).attr("title");

		$(this).val(title);

	});
}

function validateAndSendForm () {
    $(".ajax-form").not(".js-kredit-step").not(".popup__kredit *").ajaxForm({
        success: function(){
            thanck();
        }
		})
	$(".popup__kredit .ajax-form").not(".js-kredit-step").on('submit', e => {

		e.preventDefault()
		e.stopPropagation()

		$.ajax({
			type: "POST",
			url:"/send",
			data:	$(".popup__kredit .ajax-form").serialize(),
			success: function(){
					thanck();
			}

		})


	})

}

$(document).ready(function(){

    if($('.js-catalog-slider').length) {
        $(".js-catalog-slider").each(function(){
            
            var slider = $(this),
            status = $(this).closest(".js-catalog-parent").find(".js-catalog-status");

            slider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
                //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
                var i = (currentSlide ? currentSlide : 0) + 1;
                if (i < 10) {
                    status.html( i + '/' + slick.slideCount);
                } else {
                    status.html(i);
                }
            });

            slider.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
                infinite: true,
                pauseOnHover: false,
                prevArrow: '<button type="button" class="cart__arrow cart__arrow_prev"></button>',
                nextArrow: '<button type="button" class="cart__arrow cart__arrow_next"></button>',
                speed: 700
            });
        });
	};


		$(document).on("click", ".cart__tabs-link", function () {
        
        var index = $(this).index();
        
        if( $(this).hasClass("cart__tabs-link_active") ) { 
        } else {
            $(".cart__tabs-link_active").removeClass("cart__tabs-link_active");
            $(this).addClass("cart__tabs-link_active");
            
            $(".cart__item:visible").hide();
            $(".cart__item:eq(" + index + ")").fadeIn(500);
            $(".js-catalog-slider").slick("refresh");
            
            return false;
        }
        
    });

    // Показ modal exit
    $('html').mouseleave(function () {
        if (getCookie('showModalExit') == 'true') {
            var d = new Date(new Date().getTime() + 60 * 1000 * 60 * 24);
            document.cookie = "showModalExit=false; path=/; domain=kislorod123.ru; expires=" + d.toUTCString();
            $('.js-popup-exit').show()
        }        
    })
    // *** //

    maskForInput()
    validateAndSendForm()
	
	
	$("input[type='text'], input[type='tel'], textarea").focus(function(){
		if($(this).hasClass("error")) {
			$(this).val("").removeClass("error");
		}
	});
	
	$("input[type='text'], input[type='tel'], textarea").focus(function(){
		var title=$(this).attr("title");
		var val=$(this).val();
		if(title==val) {
			$(this).val("");
		}
	});
	
	$("input[type='text'], input[type='tel'], textarea").blur(function(){
		var title=$(this).attr("title");
		var val=$(this).val();
		if(val=='') {
			$(this).val(title);
		}
	});
	
	/* placeholder*/       
    $('input, textarea').each(function(){
        var placeholder = $(this).attr('placeholder');
        $(this).focus(function(){ $(this).attr('placeholder', '');});
        $(this).focusout(function(){             
            $(this).attr('placeholder', placeholder);           
        });
    });
    /* placeholder*/
    
    $(".js-popup-show").click(function(){
        var name = $(this).data("popup-name");
		var subj = $(this).data("popup-subj");
        $("."+name).fadeIn(500);
        $("."+name+" .popup").addClass("popup_active");
        $("."+name+" input[name='subj']").val(subj);
        $("body").css("overflow","hidden");
        return false;
    });
    
    $(".js-popup-close").click(function() {
        $(".popup-wrap").fadeOut(500);
        $(".popup").removeClass("popup_active");
        $("body").css("overflow","auto");
    });
    
    
    
	
	/* components */
	

	if($('.fancybox').length) {
		$('.fancybox').fancybox({
			margin  : 10,
			padding  : 10
		});
	};

	if($('.certification-slider').length) {
		$('.certification-slider').slick({
			arrows: true,
            prevArrow: '<button class="slick-arrow slick-arrow_prev icon-right-arrow"></button>',
            nextArrow: '<button class="slick-arrow slick-arrow_next icon-right-arrow"></button>',
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 1,
			responsive: [
				{
				  breakpoint: 769,
				  settings: {
					slidesToShow: 2,
                      slidesToScroll: 1
				  }
				},
                {
				  breakpoint: 479,
				  settings: {
					slidesToShow: 1,
                      slidesToScroll: 1
				  }
				}
			]
		});
	};
    
    // $(document).ready(function(){
    //     if($('.catalog-slider').length) {
    //         $('.catalog-slider').slick({
    //             arrows: true,
    //             prevArrow: '<button class="slick-arrow slick-arrow_prev icon-right-arrow"></button>',
    //             nextArrow: '<button class="slick-arrow slick-arrow_next icon-right-arrow"></button>',
    //             dots: false,
    //             infinite: true,
    //             speed: 500,
    //             slidesToShow: 1,
    //             slidesToScroll: 1
    //         })
    //     }
    // })
	
	$(".js-scroll-to").click(function() {
        var attr_href = $(this).attr("href");
        var data_href = $(this).data("href");
        if ( data_href ) {
            attr_href = data_href;
        }
		$("html, body").animate({
            scrollTop: $(attr_href).offset().top + "px"
        }, {
            duration: 1000
        });
        return false;
    });
	
	$(".js-svg").each(function(){
        var svg_src = $(this).data("svg-src");
        $(this).load(svg_src);
    });

    function js_next_step_click(el) {
        $(el).click()
        // setTimeout(, 1000)
    }
      
      
    $('.js-next-step-click').click(function () {
        var el = $(this).parents('.quiz__answers').find('button.js-next-step')
        setTimeout(function () {
            js_next_step_click(el)
        }, 500);
    })
    
    $(".js-next-step, .js-skip-step").click(function(){
        var step_length = $(".quiz__step").length;
        var step_index = $(this).closest(".quiz__step").index();
        $(this).closest(".quiz__step").hide();
        $(this).closest(".quiz__step").next().fadeIn(700);
        
        if ( ( step_index + 3 ) > step_length ) {
            $(".quiz__bottom").hide();
        }
        
        var load_width = $(".quiz-scale__load").width();
        var scale_width = $(".quiz-scale").width()/5;
        $(".quiz-scale__load").animate({ width: load_width + scale_width },500);
        
        var step_count = $(".js-count-quiz").text()*1;
        $(".js-count-quiz").text( step_count - 1 );
    });
    
    $(".js-next-step").click(function(){
        var step_val = $(this).closest(".quiz__step").find(".quiz-radio__input:checked").val();
        var step_name = $(this).closest(".quiz__step").find(".quiz-radio__input:checked").attr("name");
        $(".quiz-form input[name='" + step_name + "']").val( step_val );
    });
    
    $(".js-skip-step").click(function(){
        var step_name = $(this).closest(".quiz__step").find(".quiz-radio__input:checked").attr("name");
        $(".quiz-form input[name='" + step_name + "']").val( "Не выбрано" );
        return false;
    });
    
    $(".quiz-radio__input").change(function(){
        $(this).closest(".quiz__step").find(".button").removeAttr("disabled"); 
    });
    
    $(".js-play").mouseover(function(){
        $(this).parent().addClass("active");
    }).mouseleave(function(){
        $(this).parent().removeClass("active");
    });
    
    $(".cases-list__head1").click(function(){
        $(".cases-list__item.active .cases-list__hide").hide();
        $(".cases-list__item.active").removeClass("active");
        
        $(this).parent().addClass("active");
        $(this).parent().find(".cases-list__hide").fadeIn(500);
    });
    
    $(".js-case-show").click(function(){
        var case_index = $(this).parent().index();
        $(".cases-slider__slide:visible").hide();
        $(".cases-slider__slide:eq("+case_index+")").fadeIn(700);
    });
    
    if ( viewport().width < 769 ) {
        $(".cases-list__head1").click(function(){
            $("html, body").animate({
                scrollTop: $(".cases-screen__right").offset().top + "px"
            }, {
                duration: 1000
            });
        });
    }
    
    // $(".cases-list__item:first").addClass("active");
    // $(".cases-list__item:first .cases-list__hide").fadeIn(500);
    
    $(".js-before-after").each(function(){
        $(".js-after-img").width($(".js-before-after").width());
    });
    
    $(".js-before-after").mouseover(function(){
        $(".js-after").stop().removeClass("anim");
    }).mousemove(function(e){
        var pos = $(".js-after").offset();
        var elem_left = pos.left;
        // положение курсора внутри элемента
        var Xinner = e.pageX - elem_left;
        $(".js-after").width(Xinner);
        if ( $(".js-after").hasClass("anim") ) {
            $(".js-after").removeClass("anim");
        }
    }).mouseleave(function(){
        $(".js-after").stop().animate({width: '40%'}, 2000).queue(function() {
            $(this).addClass("anim");
            $(this).dequeue();
        });
    });
    
    if (window.Touch) {
        $(".js-before-after").on('touchstart', function(){
            $(".js-after").stop().removeClass("anim");
        }).on('touchmove', function(event, a){
            var pos = $(".js-after").offset();
            var elem_left = pos.left;
            // положение курсора внутри элемента
            var touch = event.originalEvent.touches[0];
            a = touch.pageX;
            var Xinner = a - elem_left;
            var touch_end = $(".before-after__area").width();
            //touch_end = touch_end + elem_left;
            if ( Xinner < touch_end ) {
                $(".js-after").width(Xinner);
            }
            if ( $(".js-after").hasClass("anim") ) {
                $(".js-after").removeClass("anim");
            }
        }).on('touchend', function(){
            $(".js-after").stop().animate({width: '40%'}, 2000).queue(function() {
                $(this).addClass("anim");
                $(this).dequeue();
            });
        });
    }
    
    // if ( $(".js-slider-options").length ) {
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
            
    //     });
        
    //     $(".js-slider-mask").keyup(function(){
    //         var slider_mask = $(this).val();
    //         var slider_meas = $(this).closest(".js-slider-wrapper").find(".js-slider-options").data("meas");
    //         $(this).closest(".js-slider-wrapper").find(".js-slider").slider({value: slider_mask});
    //         $(this).closest(".js-slider-wrapper").find(".js-slider-options").val( slider_mask + " " + slider_meas  );
    //     });
    // }
    
    var thousandSeparator = function(str) {
        var parts = (str + '').split('.'),
            main = parts[0],
            len = main.length,
            output = '',
            i = len - 1;

        while(i >= 0) {
            output = main.charAt(i) + output;
            if ((len - i) % 3 === 0 && i > 0) {
                output = ' ' + output;
            }
            --i;
        }

        if (parts.length > 1) {
            output += '.' + parts[1];
        }
        return output;
    };
    
    if ( $(".js-slider-result").length ) {

        $(".js-slider-wrapper").each(function(){
            
            
            var slider_options = $(this).find(".js-slider-options"),
                slider_val = slider_options.data("value"),
                slider_min = slider_options.data("min"),
                slider_max = slider_options.data("max"),
                slider_step = slider_options.data("step"),
                slider_meas = slider_options.data("meas"),
                slider_mask = $(this).find(".js-slider-mask");
            
            $(this).find(".js-slider-result").slider({
                range: "min",
                min: slider_min,
                max: slider_max,
                value: slider_val,
                step: slider_step,
                slide: function( event, ui ) {
                    slider_options.val( ui.value + " " + slider_meas );
                    slider_mask.val( ui.value );
                    
                    var price = $("#price").val(),
                        customers = $("#customers").val(),
                        conversion = $("#conversion").val(),
                        conversion = 1 + ( conversion/100 ),
                        result = price * customers * conversion,
                        result = result.toFixed();
                        result2 = result/1000000;
                    
                    if ( result < 750000 ) {
                        $(".result-box__circle").css("transform","scale(0.8)");
                    } else {
                        if ( result > 750000 ) {
                            $(".result-box__circle").css("transform","scale(" + ( result2 ) + ")");
                        } 
                        if ( result > 1100000 ) {
                            $(".result-box__circle").css("transform","scale(" + ( result2 * 0.8 ) + ")");
                        }
                        if ( result > 1500000 ) {
                            $(".result-box__circle").css("transform","scale(" + ( result2 * 0.7 ) + ")");
                        }
                        if ( result > 2000000 ) {
                            $(".result-box__circle").css("transform","scale(" + ( result2 * 0.6 ) + ")");
                        }
                        if ( result > 2500000 ) {
                            $(".result-box__circle").css("transform","scale(1.5)");
                        }
                    }

                    $(".js-result-profit").text(thousandSeparator(result));
                }
            });
            
        });
    }
    

    $(document).on("click", ".catalog-tabs__item:not(.catalog-tabs__item_active)", function () {
        
        var tab_index = $(this).index();
        
        $(".catalog-tabs__item_active").removeClass("catalog-tabs__item_active");
        $(this).addClass("catalog-tabs__item_active");
        $(".tabs-slider__slide:visible").hide();
        $(".tabs-slider__slide:eq(" + tab_index + ")").fadeIn(500);
        $(".catalog-slider").slick('refresh');
        // $(".catalog-slider .slick-arrow").each(function(){
        //     var height_pic = $(".catalog-slider__pic:visible").height();
        //     height_pic = height_pic/2;
        //     $(this).css("top",height_pic);
        // });
        if (tab_index == 2) {
            $('.kredit-box .ajax-form').parsley()
            maskForInput()
        }
        
        return false;
        
    });
    
    setTimeout( function() {
        $(".catalog-slider .slick-arrow").each(function(){
            var height_pic = $(".catalog-slider__pic:visible").height();
            height_pic = height_pic/2;
            $(this).css("top",height_pic);
        });
    }, 1000 );
    
    // Catalog Открытие/Закрытие попапа на квартире
    $(document).on("click", ".js-object-show", function () {
        $(this).parent().find(".object-popup").fadeIn(500).find('.ajax-form').parsley()
        validateAndSendForm()
        maskForInput()
    }).on("click", ".object-popup__close", function () {
        $(this).parent().fadeOut(500);
    })
    
    
    $(document).on("click", ".object-category__item", function () {

        var cat_index = $(this).index();
        
         if ( $(this).hasClass("object-category__item_active") ) {
             
         } else {
             $(".object-category__item_active").removeClass("object-category__item_active");
             $(this).addClass("object-category__item_active");
             $(".object-slider__slide:visible").hide();
             $(".object-slider__slide:eq(" + cat_index + ")").fadeIn(500);
             if ( viewport().width < 600 ) {
                $("html, body").animate({
                    scrollTop: $(".object-container__right").offset().top + "px"
                }, {
                    duration: 1000
                });
            }
         }
        return false;

    });
    
    $(document).on("click", ".object-popup__gallery-item", function () {

        var img_src = $(this).find("img").attr("src");
        
        $(".object-popup__img-big img").attr("src",img_src);
        
        return false;

    });
    
    $(document).on("submit", ".js-kredit-step", function (e) {
				e.preventDefault()
			  e.stopPropagation()
        next_step()
        return false
    })

    function next_step() {
        // validateAndSendForm()
        $(".kredit-step_active").removeClass("kredit-step_active").hide().next().fadeIn(500).addClass("kredit-step_active");
    }
    
    $(document).on("click", ".js-all-banks", function (){
        $(".bank-list__input").attr("checked","checked");
        return false;
    })

    $(".js-yes-price").mouseover(function(){
        $(".modal-exit__zhurnal").addClass("active");
    }).mouseleave(function(){
        $(".modal-exit__zhurnal").removeClass("active");
    });
    
    $(".js-show-requisites").click(function(){
        $(".js-popup-requisites").fadeIn(500);
        return false;
    });
    
    $(".js-close-requisites").click(function(){
        $(".js-popup-requisites").fadeOut(500);
    });
    
    if($('.js-team-slider').length) {
		$('.js-team-slider').slick({
			arrows: true,
            prevArrow: '<button class="slick-arrow slick-arrow_prev icon-right-arrow"></button>',
            nextArrow: '<button class="slick-arrow slick-arrow_next icon-right-arrow"></button>',
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 2,
			slidesToScroll: 1,
            responsive: [
                {
				  breakpoint: 479,
				  settings: {
					slidesToShow: 1,
                      slidesToScroll: 1
				  }
				}
			]
		});
	};
    
    if($('.js-history-slider').length) {
		$('.js-history-slider').slick({
			arrows: true,
            prevArrow: '<button class="slick-arrow slick-arrow_prev icon-right-arrow"></button>',
            nextArrow: '<button class="slick-arrow slick-arrow_next icon-right-arrow"></button>',
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 5,
			slidesToScroll: 1,
            responsive: [
                {
				  breakpoint: 900,
				  settings: {
					slidesToShow: 4,
                      slidesToScroll: 1
				  }
				},{
                    breakpoint: 600,
				  settings: {
					slidesToShow: 3,
                      slidesToScroll: 1
				  }
                },{
                    breakpoint: 400,
				  settings: {
					slidesToShow: 2,
                      slidesToScroll: 1
				  }
                }
			]
		});
	};
    
    if ( $(".js-history-scale").length ) {

        $(".js-history-scale").slider({
            range: "min",
            min: 1,
            max: 5,
            value: 1,
            step: 1,
            slide: function( event, ui ) {
                $(".history-line__time.active").removeClass("active");
                $(".history-line__time[data-value='" + ui.value + "']").click();
            }
        });
        
        $(".history-line__time").click(function(){
            
            var year_val = $(this).data("value");
            var year_index = $(this).index();
            
            if ( $(this).hasClass("active") ) {
            } else {
                $(".history-line__time.active").removeClass("active");
                $(this).addClass("active");
                
                $(".js-history-scale").slider({
                    value: year_val
                });
                
                $(".history-slider:visible").hide();
                $(".history-slider:eq("+year_index+")").fadeIn(700);
                $(".js-history-slider").slick('refresh');
                
            }
            
        });
        
    }
    
    if($('.js-department-slider').length) {
		$('.js-department-slider').slick({
			arrows: true,
            prevArrow: '<button class="slick-arrow slick-arrow_prev icon-right-arrow"></button>',
            nextArrow: '<button class="slick-arrow slick-arrow_next icon-right-arrow"></button>',
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 4,
			slidesToScroll: 1,
            responsive: [
                {
				  breakpoint: 900,
				  settings: {
					slidesToShow: 3,
                      slidesToScroll: 1
				  }
				},{
                    breakpoint: 600,
				  settings: {
					slidesToShow: 2,
                      slidesToScroll: 1
				  }
                },{
                    breakpoint: 400,
				  settings: {
					slidesToShow: 1,
                      slidesToScroll: 1
				  }
                }
			]
		});
        
        department_slider_slick_arrow()
        
    };
    
    function department_slider_slick_arrow () {
        if ( viewport().width > 1360 ) {
            setTimeout(function(){
                $(".department-slider .slick-arrow").each(function(){
                    var height_pic = $(".department-slider__foto:visible").height();
                    height_pic = height_pic/2;
                    $(this).css("top",height_pic);
                    console.log(height_pic)
                });
            },1000);
        }
    }
    
    $(".department-tabs__item").click(function(){
        
        var tab_id = $(this).attr("href");
        
        if ( $(this).hasClass("department-tabs__item_active") ) {
            
        } else {
            $(".department-tabs__item_active").removeClass("department-tabs__item_active");
            $(this).addClass("department-tabs__item_active");
            $(".department-slide:visible").hide();
            $(".department-slide" + tab_id).fadeIn(500);
            $(".js-department-slider").slick('refresh');
            if ( viewport().width < 600 ) {
                $("html, body").animate({
                    scrollTop: $(".department-slides").offset().top - 50 + "px"
                }, {
                    duration: 1000
                });
            }
        }

        department_slider_slick_arrow()
        
        return false;
        
    });
    
    if($('.js-reviews-slider').length) {
		$('.js-reviews-slider').slick({
			arrows: true,
            prevArrow: '<button class="slick-arrow slick-arrow_prev icon-right-arrow"></button>',
            nextArrow: '<button class="slick-arrow slick-arrow_next icon-right-arrow"></button>',
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 1,
            responsive: [
                {
				  breakpoint: 1200,
				  settings: {
					slidesToShow: 1,
                      slidesToScroll: 1
				  }
				}
			]
		});
    };
    
    function timer(){
		var thisdate = new Date();
		var hours = 16 - thisdate.getHours();
		var mins = 59 - thisdate.getMinutes();
		$(".js-hours").text(hours);
		$(".js-mins").text(mins);
        if ( hours < 0 ) {
            $(".vebinar-screen__time-active").remove();
            $(".vebinar-screen__time-noactive").show();
        }
	}
    
    timer();

	setInterval( timer, 10000 );
    
    if($('.js-professional-list').length) {
		$('.js-professional-list').slick({
			slidesToShow: 5,
            slidesToScroll: 1,
            asNavFor: '.js-professional-content',
            arrows: false,
            dots: false,
            centerMode: false,
            focusOnSelect: true,
            infinite: false,
            vertical: true,
            verticalSwiping: true,
            responsive: [
                {
				  breakpoint: 769,
				  settings: {
					slidesToShow: 1,
                      slidesToScroll: 1,
                      vertical: false
				  }
				}
			]
		});
        $('.js-professional-content').slick({
			slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: '.js-professional-list',
            arrows: true,
            prevArrow: '<button class="slick-arrow slick-arrow_prev icon-right-arrow"></button>',
            nextArrow: '<button class="slick-arrow slick-arrow_next icon-right-arrow"></button>',
            dots: false
		});
	};
    
    $(".task-tabs__item").click(function(){
        var index = $(this).index();
        if ( $(this).hasClass("task-tabs__item_active") ) {
            
        } else {
            $(".task-tabs__item_active").removeClass("task-tabs__item_active");
            $(this).addClass("task-tabs__item_active");
            $(".task-slider__slide:visible").hide();
            $(".task-slider__slide:eq(" + index + ")").fadeIn(500);
        }
    });
    
});

$(window).resize(function(){
    $(".catalog-slider .slick-arrow").each(function(){
        var height_pic = $(".catalog-slider__pic:visible").height();
        height_pic = height_pic/2;
        $(this).css("top",height_pic);
    });
});

/* viewport width */
function viewport(){
    var e = window, 
        a = 'inner';
    if ( !( 'innerWidth' in window ) )
    {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
};
/* viewport width */

//Анимации по странице
$(window).scroll(function(){
    var viewport_height = viewport().height;
    var scroll_top = $(window).scrollTop();
    $(".js-animateme").each(function(){
        var animate_pos = $(this).offset().top;
        var animate_offset = $(this).data("animate-offset");
        var animate_delay = $(this).data("animate-delay");
        var animate = $(this).data("animate-class");
        var win_scroll = scroll_top + viewport_height - animate_offset;
        $(this).css("transition-delay",animate_delay+"ms");
        if ( win_scroll >= animate_pos ) {
            $(this).addClass(animate);
        } else {
            $(this).removeClass(animate);
        }
    });
    if ( viewport().width > 960 ) {
        $(".js-paralax").each(function(){
            var paralax_pos = $(this).offset().top;
            var paralax_side = $(this).data("paralax-side");
            var paralax_step = $(this).data("paralax-step");
            var paralax_speed = $(this).data("paralax-speed");
            if ( paralax_side == 'bottom') {
                $(this).animate({ marginBottom: ( scroll_top - paralax_pos )/paralax_step },paralax_speed);
            } else {
                $(this).animate({ marginTop: ( scroll_top - paralax_pos )/paralax_step },paralax_speed);
            }
        });
    }
});
