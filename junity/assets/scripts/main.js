$(function () {



    // ---------- Tabs ---------- //

    var tabs = function () {

        if ( $(".tabs").length ) {

            $(".tabs").lightTabs();

        }

    };

    // ---------- / Tabs ---------- //



    // ---------- Accordion ---------- //

    var accordion = function () {

        if ( $(".accordion").length ) {

            $(".accordion").accordion({
                heightStyle: "content",
                collapsible: true,
                active: false,
                header: ".accordion__title",
                activate: function () {
                    $(this)
                        .find(".accordion__item").removeClass("active")
                        .find(".ui-accordion-header-active").closest(".accordion__item").addClass("active");
                }
            });

        }

    };

    // ---------- / Accordion ---------- //



    // ---------- Скролл ---------- //

    var scroll = function () {

        if ( $(".scroll").length ) {

            $( ".scroll" ).mCustomScrollbar({
                scrollInertia: 500,
                // scrollbarPosition: "outside",
                callbacks:{
                    onScrollStart:function(){
                        $(".scroll-inner").addClass("disable-hover");
                    },
                    onScroll:function(){
                        $(".scroll-inner").removeClass("disable-hover");
                    },
                scrollButtons:{ enable: true }
                }

            });

        }

    };

    // -------------------- //





    // ---------- Мобильное меню ---------- //

    var mobileMenu = function () {

        var mobileTopMenu = new Slideout({
            "panel": $(".mobile-menu")[0],
            "menu": $(".mobile-menu-helper")[0],
            "padding": 250,
            "tolerance": 70,
            'easing': 'cubic-bezier(.32,2,.55,.27)'
        });

        $(".toggle-mobile-menu").on("click", function () {
            mobileTopMenu.toggle();
        });

        mobileTopMenu.on("open", function () {
            $(".mobile-menu").addClass("active");
        });

        mobileTopMenu.on("close", function () {
            $(".mobile-menu").removeClass("active");
        });

    };

    // -------------------- //



    // ---------- Popup gallery ---------- //

    var popupGallery = function () {

        if ( $(".popup-gallery").length ) {

            $(".popup-gallery").each(function() {

                $(this).magnificPopup({
                    delegate: "a",
                    type: "image",
                    tClose: "Закрыть (Esc)",
                    removalDelay: 500,
                    callbacks: {
                        beforeOpen: function() {
                            // just a hack that adds mfp-anim class to markup
                            this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                            this.st.mainClass = this.st.el.attr('data-effect');
                        }
                    },
                    gallery: {
                        enabled: true,
                        tPrev: "Предыдущее",
                        tNext: "Следующее",
                        tCounter: "%curr% из %total%"
                    }
                });

            });
        }

    };

    // ---------- / Popup gallery ---------- //



    // ---------- Carousel ---------- //

    var carousel = function () {

        if ( $(".carousel").length ) {

            var carousel = $(".carousel:not([data-sync])"),
                navText = ["<span class='icon icon-arrow-left'>","<span class='icon icon-arrow-right'>"],
                responsive,
                nav,
                dots,
                margin,
                autoPlay;


            carousel.each(function () {

                responsive = $(this).data("responsive").split(" ");
                nav = $(this).data("nav");
                dots = $(this).data("dots");
                margin = $(this).data("margin");
                autoPlay = $(this).data("auto-play");

                $(this).owlCarousel({
                    loop: true,
                    margin: margin,
                    nav: nav,
                    dots: dots,
                    navText: navText,
                    autoPlay: autoPlay,
                    responsive: {
                        0: {
                            items: responsive[0]
                        },
                        768: {
                            items: responsive[1]
                        },
                        992: {
                            items: responsive[2]
                        },
                        1440: {
                            items: responsive[3]
                        }
                    }
                });

            });

        }


        if ( $(".carousel[data-sync]").length ) {

            var sync1 = $("[data-sync=1]");
            var sync2 = $("[data-sync=2]");
            var syncedSecondary = true;

            if ( $("[data-sync=1]:visible").length ) {
                console.log( $("[data-sync=1]:visible") )
            }

            sync1.owlCarousel({
                items : 1,
                slideSpeed : 2000,
                nav: false,
                dots: false,
                autoplay: true,
                autoplayTimeout: 10000,
                autoplayHoverPause: true,
                loop: true,
                responsiveRefreshRate : 200,
                navText: navText,
            }).on('changed.owl.carousel', syncPosition);

            sync2
                .on('initialized.owl.carousel', function () {
                    sync2.find(".owl-item").eq(0).addClass("current");
                })
                .owlCarousel({
                    dots: sync2.data("dots"),
                    nav: sync2.data("nav"),
                    margin: sync2.data("margin"),
                    smartSpeed: 500,
                    slideSpeed: 500,
                    slideBy: 1, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
                    responsiveRefreshRate: 100,
                    responsive: {
                        0: {
                            items: sync2.data("responsive").split(" ")[0]
                        },
                        768: {
                            items: sync2.data("responsive").split(" ")[1]
                        },
                        992: {
                            items: sync2.data("responsive").split(" ")[2]
                        },
                        1440: {
                            items: sync2.data("responsive").split(" ")[3]
                        }
                    }
                }).on('changed.owl.carousel', syncPosition2);

            function syncPosition(el) {
                //if you set loop to false, you have to restore this next line
                //var current = el.item.index;

                //if you disable loop you have to comment this block
                var count = el.item.count-1;
                var current = Math.round(el.item.index - (el.item.count/2) - .5);

                if(current < 0) {
                    current = count;
                }
                if(current > count) {
                    current = 0;
                }

                //end block

                sync2
                    .find(".owl-item")
                    .removeClass("current")
                    .eq(current)
                    .addClass("current");
                var onscreen = sync2.find('.owl-item.active').length - 1;
                var start = sync2.find('.owl-item.active').first().index();
                var end = sync2.find('.owl-item.active').last().index();

                if (current > end) {
                    sync2.data('owl.carousel').to(current, 100, true);
                }
                if (current < start) {
                    sync2.data('owl.carousel').to(current - onscreen, 100, true);
                }
            }

            function syncPosition2(el) {
                if(syncedSecondary) {
                    var number = el.item.index;
                    sync1.data('owl.carousel').to(number, 100, true);
                }
            }

            sync2.on("click", ".owl-item", function(e){
                e.preventDefault();
                var number = $(this).index();
                sync1.data('owl.carousel').to(number, 300, true);
            });
        }

    };

    // ---------- / Carousel ---------- //





    /// ---------- Validation ---------- //

    $("form.form").each(function () {

        $(this).validate({

                invalidHandler: function(event, validator) {
                    var errorForm = $(this);
                    console.log(errorForm);
                },

                submitHandler: function(form) {
                    $("div[data-popup='form-sent']").addClass("active");
                    $("div.popup-wrapper").addClass("active");
                    $(document).delay(3000).queue(function (next) {
                        $("div.popup-wrapper").removeClass("active");
                            next();
                        }).delay(500).queue(function (next) {
                            $("div[data-popup='form-sent']").removeClass("active");
                            next();
                        });
                },

                rules: {
                    fio: {
                        required: true,
                        minlength: 6
                    },
                    phone: {
                        required: true,
                        number: true,
                        minlength: 6,
                        maxlength: 15
                    },
                    email: {
                        required: true,
                        minlength: 3
                    }
                },

                messages: {
                    fio: {
                        required: "Укажите фамилию, имя и отчество. Это необходимо для оформления доставки.",
                        minlength: "Не менее 6 букв"
                    },
                    phone: {
                        required: "Заполните это поле, пожалуйста",
                        number: "Допустимы только цифры",
                        minlength: "Не менее 6 цифр",
                        maxlength: "Не более 15 цифр"
                    },
                    email: {
                        required: "Укажите верный email",
                        minlength: "Не менее 3 символов"
                    }
                }
            });

    });

    // ---------- /Validation ---------- //



    // ---------- Modals ---------- //

    var modals = function () {

        if ( $(".modal-body").length ) {

            $(".modal-body").dialog({
                appendTo: ".modal-container .container",
                dialogClass: "modal",
                width: "100%",
                autoOpen: false,
                modal: true,
                draggable: false,
                resizable: false,
                closeText: "",
                show: {
                    effect: "fade",
                    duration: 300
                },
                hide: {
                    effect: "fade",
                    duration: 300
                },

                open: function (event) {
                    $(".modal-wrapper").fadeIn(300);
                    $("body").addClass("covered");

                    var modalSize = $(this).attr("data-modal-size");
                    $(this).dialog("option", "dialogClass", "modal "+modalSize);

                    $(document).on("click", function(event) {
                        if( !$(event.target).closest("modal").length ) {
                            $(event.target).find(".modal-body").dialog("close");
                        }
                    });

                },

                close: function () {
                    $(".modal-wrapper").fadeOut(300);
                    $("body").removeClass("covered");
                }
            });

            $("[data-modal]").on("click", function () {
                var modalName = $(this).attr("data-modal");
                $( ".modal-body[data-modal="+modalName+"]" ).dialog("open");
            });

        }

    };

    // -------------------- //




    // search();

    // tabs();

    accordion();

    // scroll();

    mobileMenu();

    // popupGallery();

    // carousel();
    // carouselGallery();

    modals();


});



