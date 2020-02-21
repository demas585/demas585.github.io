
$(document).ready(function () {

    function notifications () {

        new Noty({
            layout: "topLeft",
            text: "Ваш город <b>Новосибирск</b>?<br><button class='btn btn-sm btn-primary mr-1 mt-2'>Верно</button><button class='btn btn-sm btn-light mt-2' data-modal='geo'>Другой</button>",
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

    tippy("[data-tippy-apply]", {
        interactive: true,
        theme: "primary",
        arrow: true,
        trigger: "click",
        followCursor: "vertical",
        placement: "right",
        onMount: function () {
            $(".tippy-tooltip").addClass("p-0")
        },
        content: "<button type='button' class='btn btn-primary btn-lg'>Применить</button>",
        delay: [0,3000]
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




    $("[class*='active-']").on("click", function () {
        $(this).toggleClass("active");
    });

    $(".lighttabs").lighttabs();


    // - modals
    function modals() {

        var modalSelector = $(".modal-body");

        if ( modalSelector.length) {

            $("body").append("<div class='modal-wrapper'><div class='container'></div></div>");

            var modalWrapper = $(".modal-wrapper");

            modalSelector.dialog({
                appendTo: modalWrapper.find(".container"),
                dialogClass: "modal",
                autoOpen: false,
                modal: true,
                draggable: false,
                resizable: false,
                closeText: "",
                show: { effect: "fade", duration: 300 },
                hide: { effect: "fade", duration: 300 },
                open: function open() {

                    var modal = $(this);

                    modal.find("[data-autofocus]").removeAttr("data-autofocus").attr("autofocus='autofocus'");

                    modalWrapper.fadeIn();
                    $("body").addClass("covered");

                    modal.dialog("option", "dialogClass", "modal modal-" + modal.attr("data-modal-size"));

                    if ( this.hasAttribute("data-nofocus") ) { modal.parent().focus() }

                    $(".modal-wrapper").on("click", function (e) {
                        !$(e.target).closest(".ui-dialog").length ? modal.dialog('close') : true
                    });

                    $(document).on('click', '.modal-close', function() { $(this).dialog('close') });

                },
                close: function close() { modalWrapper.fadeOut(300); $("body").removeClass("covered"); }
            });
            $("[data-modal]").on("click", function() {
                var modalName = $(this).attr("data-modal");
                $(".modal-body[data-modal=" + modalName + "]").dialog("open");
            });

        }
    }
    modals();


    function dropdowns () {

        dropdownSelector = $(".dropdown");

        if ( dropdownSelector.length ) {

            var currentDropdown, currentDropdownData;

            $("[data-dropdown-target]").hover(
                function () {
                    currentDropdown = $(this);
                    currentDropdownData = currentDropdown.data("dropdown-target");
                    $("[data-dropdown='" + currentDropdownData + "']").addClass("active");
                },
                function () {
                    $("[data-dropdown-wrapper]").mouseleave( function () {
                        $("[data-dropdown='" + currentDropdownData + "']").removeClass("active")
                    });
                }
            );

        }

    }
    dropdowns();



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
    spoiler();


    /*$(".rangeslider").ionRangeSlider({
        type: "double",
        grid: false
    });*/


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


    $("[data-btn-toggle]").click(function () {
        if ( $(this).attr("data-btn-toggle") === "done") {
            $(this).attr("data-btn-toggle","").addClass("loader").delay(1000).queue(function (next) {
                $(this).removeClass("loader");
                next();
            })
        } else {
            $(this).addClass("loader").delay(1000).queue(function (next) {
                $(this).removeClass("loader").attr("data-btn-toggle","done");
                next();
            })
        }
    });
    $("[data-btn-check]").click(function () {
        if ( $(this).attr("data-btn-check") === "done") {
            $(this).addClass("loader").delay(1000).queue(function (next) {
                $(this).removeClass("loader");
                next();
            })
        } else {
            $(this).addClass("loader").delay(1000).queue(function (next) {
                $(this).removeClass("loader").attr("data-btn-check","done");
                next();
            })
        }
    });

    function comparisonTable() {
        function liAutoHeight() {
            var li = $("li.auto-height");
            var liNumber = li.filter(":last-child").index()+1;
            var maxHeight, currentLi;

            li.height("auto");

            for (var i=1; i<=liNumber; i++) {

                currentLi = li.filter(":nth-child(" + i + ")");

                maxHeight = Math.max.apply(null, currentLi.map(
                    function(){
                        return $(this).height();
                    }).get()
                );

                currentLi.each(function () {
                    $(this).height(maxHeight)
                });

            }

        }
        liAutoHeight();

        $(window).on("resize",function () {
            liAutoHeight();
        })
    }
    comparisonTable();


    function visibility() {

        var item = $("[data-visible-offset]");

        function visibilityToggling() { $(document).scrollTop() >= item.data("visible-offset") ? item.fadeIn(300) : item.fadeOut(300); }

        if ( item.length ) {
            visibilityToggling();
            $(document).scroll( visibilityToggling )
        }
    }
    visibility();


    yall({
        events: {
            load: function (event) {
                if (!event.target.classList.contains("lazy") && event.target.nodeName == "IMG") {
                    event.target.classList.add("yall-loaded");
                }
            },
            play: function (event) {
                if (event.target.nodeName == "VIDEO") {
                    event.target.nextElementSibling.classList.add("visible");
                }
            },
            error: {
                listener: function (event) {
                    if (!event.target.classList.contains("lazy") && event.target.nodeName == "IMG") {
                        event.target.classList.add("yall-error");
                        event.target.nextElementSibling.classList.add("visible");
                    }
                },
                options: {
                    once: true
                }
            }
        }
    });


    function autocomplete() {
        $(".search-field").on("keyup", function () {
            $(".autocomplete").fadeIn(300);
            $(document).on("click", function (e) {
                if ( !$(e.target).closest(".search").length ) {
                    $(".autocomplete").fadeOut(300);
                }
            })
        })
    }

    autocomplete();


    function scrollTop() {
        $("button.up").on("click", function () {
            $("html, body").stop().animate({scrollTop: 0}, 2000, 'swing');
        })
    }
    scrollTop();


    function toggling() {
        if ( $("[data-toggle]").length ) {
            var togglingItemClass;
            $("[data-toggle]").on("click", function() {

                togglingItemClass = $(this).data("toggle");
                $(this).closest("[data-toggle-parent]").find(togglingItemClass).fadeToggle("300");

            })
        }
    }
    toggling();

    // $("select").niceSelect();

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