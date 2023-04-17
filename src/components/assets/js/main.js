(function ($) {
    "use strict";
    $(window).on('load', function(){
        setTimeout(function(){ 
            $('.popup_wrapper').fadeIn();
        }, 10000);
        $('.popup_close').on('click', function(){
            $('.popup_wrapper').fadeOut();
        })
    });
    $(window).on('load resize', function(){
        if (window.matchMedia('(min-width: 768px)').matches){
            $('.dropdown .dropdown-toggle').on('click', function(event){
                return false;
                event.stopPropagation();
            });
        }        

        if (window.matchMedia('(min-width: 768px)').matches){
            $('.collapse_title[data-toggle="collapse"]').click(function(e) {
                e.preventDefault();
                e.stopPropagation();
            });

            $('.collapse').addClass('show');
        }
    });

    $(document).ready(function($){
        // toggle menu
        $('.menu-trigger').on('click', function(){
            $('.mainmenu').addClass('show-menu');
        })
        $('.close-menu').on('click', function(){
            $('.mainmenu').removeClass('show-menu');
        })
        //===== Scroll To Top Start
        $(window).on('scroll', function (event) {
            if ($(this).scrollTop() > 600) {
                $('.down-button').fadeIn(200)
            } else {
                $('.down-button').fadeOut(200)
            }
        });
            //Animate the scroll to yop
        $('.down-button').on('click', function (event) {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: 0,
            }, 1500);
        });

        //===== Scroll To Top End

        $('.hero-area').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            prevArrow: false,
            nextArrow: false
        });

        $('.testmonial-area').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            prevArrow: false,
            nextArrow: false
        });

        // Nice_select Plugin Active Start
        $('select').niceSelect();

        $('.close_btn').on('click', function(){
            $('.subscribe_box').addClass('d-none');
        });  
        $('.drop_main').on('show.bs.dropdown', function(e){
            $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
        });

        $('.drop_main').on('hide.bs.dropdown', function(e){
            $(this).find('.dropdown-menu').first().stop(true, true).slideUp(300);
        });

        $('.dropdown').on('click', function(event){
            var events = $._data(document, 'events') || {};
            events = events.click || [];
            for(var i = 0; i < events.length; i++) {
                if(events[i].selector) {
                    if($(event.target).is(events[i].selector)) {
                        events[i].handler.call(event.target, event);
                    }
                    $(event.target).parents(events[i].selector).each(function(){
                        events[i].handler.call(this, event);
                    });
                }
            }
            event.stopPropagation(); 
        });

        $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
          if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').slideUp(300);
          }
          $(".dropdown.show .dropdown-submenu .dropdown-menu").slideUp(300);
          var $subMenu = $(this).next(".dropdown-menu");
          $subMenu.slideToggle(300);


          $(this).parents('li.dropdown.show').on('hide.bs.dropdown', function(e) {
            $('.dropdown-submenu .dropdown-menu').slideUp(300);
          });
          return false;
        });
    });


    // MASONRY IMGLOAD
    $('.mas-grid-wrapper').imagesLoaded(function() {
        $('.mas-grid-wrapper').masonry({
          // options
          itemSelector: '.grid-item',
        });
    });

    AOS.init({
        duration: 900,
        offset: 200,
    });

    // Nice_select Plugin Active Start
    $('select').niceSelect();


}(jQuery)); 