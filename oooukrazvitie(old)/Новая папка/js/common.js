$(function() {



    // ---------- Анкорное меню ---------- //

    var anchorMenu = function () {

        // Cache selectors
        var lastId,
            topMenu = $("header form, .panel.horizontal"),
            topMenuHeight = 15,

            // All list items
            menuItems = $("a[href^='#']:not([href^='#tab'])"),

            // Anchors corresponding to menu items
            scrollItems = menuItems.map(function(){
                var item = $($(this).attr("href"));
                if (item.length) { return item; }
            });


        // Bind click handler to menu items
        // so we can get a fancy scroll animation
        menuItems.click(function(e){
            var href = $(this).attr("href"),
                offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
            $('html, body').stop().animate({
                scrollTop: offsetTop
            }, 300);
            e.preventDefault();
        });


        // Bind to scroll
        $(window).scroll(function(){

            // Get container scroll position
            var fromTop = $(this).scrollTop()+topMenuHeight;

            // Get id of current scroll item
            var cur = scrollItems.map(function(){
                if ($(this).offset().top < fromTop)
                    return this;
            });

            // Get the id of the current element
            cur = cur[cur.length-1];
            var id = cur && cur.length ? cur[0].id : "";

            if (lastId !== id) {
                lastId = id;

                // Set/remove active class
                // menuItems
                //     .removeClass("active")
                //     .filter("[href='#"+id+"']").addClass("active");
            }
        });

    };

    anchorMenu();

    // ---------- //




    // ---------- Модальные окна ---------- //

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
                open: function () {
                    $(".modal-wrapper").fadeIn(300);
                    $("body").addClass("covered");

                    var modalSize = $(this).attr("data-modal-size");
                    $(this).dialog("option", "dialogClass", "modal "+modalSize);

                    $(".modal").on("click", function (e) {
                        e.stopPropagation();
                    });

                    $(".modal-wrapper").on("click", function(e) {
                        $(this).find(".modal-body").dialog("close");
                        e.preventDefault();
                        return false;
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

    modals();

    // -------------------- //



    // ---------- Валидация форм ---------- //

    var formValidation = function () {

        $("form .send-form").on("click", function () {

            var form = $(this).parents("form");
            var inputsInvalid = form.find("input[required]:invalid");
            var inputsValid = form.find("input[required]:valid");

            if ( inputsInvalid.length ) {

                inputsInvalid.parents("label").addClass("invalid");
                inputsValid.parents("label").removeClass("invalid");

            } else {

                showMessage();

                inputsInvalid.parents("label").addClass("invalid");
                inputsValid.parents("label").removeClass("invalid");

            }

        });




    };

    formValidation();

    // -------------------- //



    // ---------- Всплывающие уведомления ---------- //

    var showMessage = function () {


        $(".modal-message-wrapper").fadeIn(300);

        $(".modal.modal-message").find(".close-button").on("click", function () {
            $(this).parents(".modal-message-wrapper").fadeOut(300);
        });

        setTimeout(function () {
            $(".modal-message-wrapper").fadeOut(1000);
        },3000);


    };


    // -------------------- //



    // ---------- Табы ---------- //

    var tabs = function () {

        if ( $(".tabs").length ) {

            $(".tabs").tabs({
                activate: function () {
                    $('html, body').stop().animate({
                        scrollTop: $(".tabs-content").offset().top - 100
                    }, 300);
                }
            });

        }

    };

    tabs();


    // -------------------- //



    // ---------- Табы ---------- //

    var scroll = function () {

        if ( $(".scroll").length ) {

            $(".scroll").mCustomScrollbar();

        }

    };

    scroll();


    // -------------------- //



});
