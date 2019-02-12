$(document).ready(function(){

	$("input[name='telephone'], input[type='tel']").mask("+7 (999) 999-99-99").each(function() {

		var title = $(this).attr("title");

		$(this).val(title);

	});
	
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
    
    function thanck() {
        $(".popup-wrap").fadeOut(500);
        $(".popup").removeClass("popup_active");
        $(".js-popup-thanck").fadeIn(500);
        $(".js-popup-thanck .popup").addClass("popup_active");
    }
    
    $(".ajax-form").ajaxForm({
        beforeSubmit: function(){
            $(this).parsley({
            });
            thanck();
        },
        success: function(){
            // thanck();
        }
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
    
    if($('.catalog-slider').length) {
		$('.catalog-slider').slick({
			arrows: true,
            prevArrow: '<button class="slick-arrow slick-arrow_prev icon-right-arrow"></button>',
            nextArrow: '<button class="slick-arrow slick-arrow_next icon-right-arrow"></button>',
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1
		});
	};
	
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
    
    $(".cases-list__item:first").addClass("active");
    $(".cases-list__item:first .cases-list__hide").fadeIn(500);
    
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
    
    if ( $(".js-slider-options").length ) {
        $(".js-slider-wrapper").each(function(){
            
            var slider_options = $(this).find(".js-slider-options"),
                slider_val = slider_options.data("value"),
                slider_min = slider_options.data("min"),
                slider_max = slider_options.data("max"),
                slider_step = slider_options.data("step"),
                slider_meas = slider_options.data("meas");
            
            $(this).find(".js-slider").slider({
                range: "min",
                min: slider_min,
                max: slider_max,
                value: slider_val,
                step: slider_step,
                slide: function( event, ui ) {
                    slider_options.val( ui.value + " " + slider_meas );
                }
            });
            
        });
        
        $(".js-slider-mask").keyup(function(){
            var slider_mask = $(this).val();
            var slider_meas = $(this).closest(".js-slider-wrapper").find(".js-slider-options").data("meas");
            $(this).closest(".js-slider-wrapper").find(".js-slider").slider({value: slider_mask});
            $(this).closest(".js-slider-wrapper").find(".js-slider-options").val( slider_mask + " " + slider_meas  );
        });
    }
    
    $(".catalog-tabs__item").click(function(){
        
        var tab_index = $(this).index();
        
        if ( $(this).hasClass("catalog-tabs__item_active") ) {
            
        } else {
            $(".catalog-tabs__item_active").removeClass("catalog-tabs__item_active");
            $(this).addClass("catalog-tabs__item_active");
            $(".tabs-slider__slide:visible").hide();
            $(".tabs-slider__slide:eq(" + tab_index + ")").fadeIn(500);
            $(".catalog-slider").slick('refresh');
            $(".catalog-slider .slick-arrow").each(function(){
                var height_pic = $(".catalog-slider__pic:visible").height();
                height_pic = height_pic/2;
                $(this).css("top",height_pic);
            });
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
    
    $(".js-object-show").click(function(){
        $(this).parent().find(".object-popup").fadeIn(500); 
    });
    
    $(".object-popup__close").click(function(){
        $(this).parent().fadeOut(500); 
    });
    
    $(".object-category__item").click(function(){
        
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
    
    $(".js-kredit-step").submit(function() {
        next_step();
        return false;
    });
    
    function next_step() {
        $(".kredit-step_active").removeClass("kredit-step_active").hide().next().fadeIn(500).addClass("kredit-step_active");
    }
    
    $(".js-all-banks").click(function(){
        $(".bank-list__input").attr("checked","checked");
        return false;
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