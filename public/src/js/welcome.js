$(document).on("click", ".play-box__thumb", function(){
    var c = $('<div class="box-modal box-modal-index-video" />');
        c.prepend(
            '<div class="arcticmodal-close"></div>'+
            '<video src="/images/video.mp4" controls="controls" autoplay width="100%" poster="/images/main/video-thumb1.jpg">'
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