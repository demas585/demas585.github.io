$(function() {

    // carousel

    function carousel() {

        if ( $(".carousel").length ) {

            $('.carousel').each(function () {

                var responsive = $(this).attr("data-items");


                $(this).owlCarousel({
                    margin: 10,
                    nav: true,
                    responsive: {
                        0:      { items: responsive[0] },
                        576:    { items: responsive[1] },
                        768:    { items: responsive[2] },
                        992:    { items: responsive[2] },
                        1200:   { items: responsive[3] }
                    }
                })

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
