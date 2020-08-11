$(function () {
    /*new WOW({
        animateClass: 'animate__animated'
    }).init();*/
    /*$('.header-arrows').on('click', function() {
        $('html,body').animate({scrollTop:$('.surf').offset().top+"px"},{duration:1E3});
    });*/
    $('.reason-text').readmore({
        speed: 75,
        collapsedHeight: 115,
        moreLink: '<div class="reason-link container-content"><a href="#">Read More >></a></div>',
        lessLink: '<div class="reason-link container-content"><a href="#">Close</a></div>'
    });

    $('.photo-slider').slick({
        prevArrow: '<button type="button" class="slick-prev"><img src="images/arrow-left.svg" alt=""></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="images/arrow-right.svg" alt=""></button>'
    });
    $(document).ready(function () {
        alert("index.js");
    });

});