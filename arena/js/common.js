$(function() {

    // carousel

    function carousel() {

        if ( $(".carousel").length ) {

            $('.carousel').each(function () {

                var responsive = $(this).attr("data-items");

                $(this).owlCarousel({
                    margin: 20,
                    loop:true,
                    nav: true,
                    navContainer: true,
                    autoplay: true,
                    autoplayTimeout: 500,
                    responsive: {
                        0:      { items: responsive[0] },
                        576:    { items: responsive[1] },
                        768:    { items: responsive[2] },
                        992:    { items: responsive[2] },
                        1200:   { items: responsive[3] }
                    }
                });


            });

            $(".carousel-prev").click(function() {
                $(this).closest(".carousel-wrapper").find(".carousel").trigger("prev.owl.carousel");
            });
            $(".carousel-next").click(function() {
                $(this).closest(".carousel-wrapper").find(".carousel").trigger("next.owl.carousel");
            });

        }

    }

    carousel();



    // carousel

    function scroll() {

        if ( $(".scroll").length ) {

            $('.scroll').mCustomScrollbar({
                scrollbarPosition: "outside",
            });

        }

    }

    scroll()

});
