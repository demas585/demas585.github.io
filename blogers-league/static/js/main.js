$(document).ready(function () {
    svg4everybody({});

    document.addEventListener(
        "DOMContentLoaded", () => {
            const node = document.querySelector( "#mobile-menu" );
            const menu = new MmenuLight( node, {
                title: "Меню"
            } );

            menu.enable( "(max-width: 1300px)" );
            menu.offcanvas();

            document.querySelector( 'a[href="#mobile-menu"]' )
                .addEventListener( 'click', ( evnt ) => {
                    menu.open();
                    // evnt.preventDefault();
                    // evnt.stopPropagation();
                });

            document.querySelector( '.main-nav__item' )
                .addEventListener( 'click', ( evnt ) => {
                    menu.close();
                    // evnt.preventDefault();
                    // evnt.stopPropagation();
                });
        }
    );

    AOS.init();

});


