(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {



        //  offcanvas-menu

        //    click-action
        $(".header-bar").on("click", function () {
            $(".offcanva, .overlay").addClass("active");
            return false;
        });

        $(".cross").on("click", function () {
            $(".offcanva, .overlay").removeClass("active");
        });

        $(".overlay").on("click", function () {
            $(".offcanva, .overlay").removeClass("active");
        });




        $(".coun-actv").owlCarousel({
            items: 1,
            nav: false,
            dot: true,
            loop: true,
            margin: 0,
            autoplay: false,
            autoplayTimeout: 3000,
            smartSpeed: 1000,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,

                },
                768: {
                    items: 1,

                },
                1000: {
                    items: 1,

                }
            }


        });


        $(".mnu-tab").owlCarousel({
            items: 1,
            nav: false,
            dot: false,
            loop: true,
            margin: 0,
            autoplay: false,
            autoplayTimeout: 3000,
            smartSpeed: 1000,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,

                },
                768: {
                    items: 1,

                },
                1000: {
                    items: 1,

                }
            }


        });







        $(".product-active").owlCarousel({
            items: 3,
            nav: false,
            dot: true,
            loop: true,
            margin: 0,
            autoplay: false,
            autoplayTimeout: 3000,
            smartSpeed: 1000,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,

                },
                768: {
                    items: 2,

                },
                1000: {
                    items: 3,

                }
            }


        });



        $(".place-active").owlCarousel({
            items: 1,
            nav: false,
            dot: true,
            loop: true,
            margin: 0,
            autoplay: false,
            autoplayTimeout: 3000,
            smartSpeed: 1000,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,

                },
                768: {
                    items: 1,

                },
                1000: {
                    items: 1,

                }
            }


        });


        $(".sucess-active").owlCarousel({
            items: 1,
            nav: false,
            dot: true,
            loop: true,
            margin: 0,
            autoplay: false,
            autoplayTimeout: 3000,
            smartSpeed: 1000,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,

                },
                768: {
                    items: 1,

                },
                1000: {
                    items: 1,

                }
            }


        });


        $(".upcoming-active").owlCarousel({
            items: 1,
            nav: false,
            dot: true,
            loop: true,
            margin: 0,
            autoplay: false,
            autoplayTimeout: 3000,
            smartSpeed: 1000,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,

                },
                768: {
                    items: 1,

                },
                1000: {
                    items: 1,

                }
            }


        });



    });


    jQuery(window).load(function () {


    });


}(jQuery));