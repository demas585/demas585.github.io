
$(document).ready(function () {

    function notifications () {

        new Noty({
            layout: "topLeft",
            text: "Ваш город <b>Новосибирск</b>?<br><button class='btn btn-sm btn-primary mr-1 mt-2'>Верно</button><button class='btn btn-sm btn-light mt-2' data-fancybox data-src='#modal-geo'>Другой</button>",
            theme: "light",
            timeout: 8000
        }).show();

        $("[data-noty]").each(function () {
            $(this).on("click", function () {
                new Noty({
                    text: $(this).data("noty"),
                    theme: "light",
                    timeout: 3000
                }).show();
            })
        });

    }
    notifications();


    $(".mobile-menu").hcOffcanvasNav({
        maxWidth: 1200,
        width: 360,
        customToggle: $(".toggle-mobile-menu"),
        labelClose: "",
        labelBack: "Назад"
    });

    tippy("[data-tippy-content]", {
        interactive: true,
        theme: "light",
        arrow: true,
        delay: [0,500]
    });



    $(".raty").each(function () {
        let score = $(this).data("score"),
            readonly = $(this).data("readonly");
        $(this).raty({
            hints: ['ужасный товар', 'плохой товар', 'нормальный товар', 'хороший товар', 'отличный товар'],
            readOnly: readonly,
            score: score,
            path: "themes/engine/scripts/raty/images"
        });
    });

    $('select').niceSelect();


    const observer = new IntersectionObserver(
        ([e]) => e.target.toggleAttribute('stuck', e.intersectionRatio < 1),
        {threshold: [1]}
    );

    observer.observe(document.querySelector('header'));


    function slider() {
        var slider;
        $(".slider:not(.slick-slider)").each(function () {
            $(this).slick({
                infinite: false,
                dots: true,
                arrows: true,
                speed: 300,
                slidesToShow: 1,
                variableWidth: true,
                mobileFirst: true,
                prevArrow: $(this).closest(".slider-wrapper").find(".slider-prev"),
                nextArrow: $(this).closest(".slider-wrapper").find(".slider-next"),
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: "unslick"
                    }

                ]
            })

        })
    }

    slider();
    $(window).resize(function () {
        slider();
    })


    $(".lighttabs").lighttabs();


    function spoiler() {
        var spoiler = $(".spoiler");
        if ( spoiler.length ) {
            $('.spoiler__header').click(function() {
                $(this).closest(".spoiler").find(".spoiler__body").slideToggle( function () {
                    $(this).closest(".spoiler").toggleClass("collapsed");
                });
            });
        }
    }
    // spoiler();


    function searchFilter() {

        var searchFilterInput, searchFilterInputText, searchFilterList, searchFilterListItem, searchFilterListEl, searchFilterTextVal;

        searchFilterInput = $(".search-filter__input");
        searchFilterInputText = searchFilterInput.val().toUpperCase();
        searchFilterList = $(".search-filter__list");
        searchFilterListItem = searchFilterList.find(".search-filter__list-item");


        // Loop through all list items, and hide those who don't match the search query
        for (var i=0; i < searchFilterListItem.length; i++) {
            searchFilterListEl = searchFilterListItem.eq(i).find("a");
            searchFilterTextVal = searchFilterListEl.text();
            if (searchFilterTextVal.toUpperCase().indexOf(searchFilterInputText) > -1) {
                searchFilterListItem.eq(i).slideDown();
            } else {
                searchFilterListItem.eq(i).slideUp();
            }
        }

    }

    $(".search-filter__input").keyup( function () {
        searchFilter();
    });


    yall();


    function scrollTop() {
        $("button.up").on("click", function () {
            $("html, body").stop().animate({scrollTop: 0}, 2000, 'swing');
        })
    }
    // scrollTop();


    $.fancybox.defaults.lang  = "ru";
    $.fancybox.defaults.i18n.ru = {
        CLOSE: "Закрыть",
        NEXT: "Вперед",
        PREV: "Назад",
        ERROR: "Ошибка при загрузке. <br/> Пожалуйста, повторите позже.",
        PLAY_START: "Слайдшоу",
        PLAY_STOP: "Остановить",
        FULL_SCREEN: "Во весь экран",
        THUMBS: "Превью",
        DOWNLOAD: "Скачать",
        SHARE: "Поделиться",
        ZOOM: "Увеличить"
    };


});