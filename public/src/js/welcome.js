$(document).on("click", ".play-box__thumb", function(){
    var c = $('<div class="box-modal box-modal-index-video" />');
        c.prepend(
            '<div class="arcticmodal-close"></div>'+
            '<iframe src="https://www.youtube.com/embed/gd1RtXXg2ag?autoplay=1&amp;loop=1&amp;rel=0&amp;playlist=gd1RtXXg2ag" allow="autoplay; encrypted-media;" allowfullscreen="" frameborder="0" width="100%" height="100%"></iframe>'
        )
        $.arcticmodal({
            content: c,
            overlay: {
                css: {
                    backgroundColor: '#232637',
                    opacity: .8
                }    
            }
        })
})