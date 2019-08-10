$(document).ready(function () {
    svg4everybody({});

    var menu = new MmenuLight( $("#mobile-menu")[0], { title: "Меню" });

    menu.enable( "(max-width: 1300px)" );
    menu.offcanvas();

    $( 'a[href="#mobile-menu"]' ).on("click", function(){
        menu.open();
        // evnt.preventDefault();
        // evnt.stopPropagation();
    });

    $( '.main-nav__item' ).on("click", function(){
        menu.close();
        // evnt.preventDefault();
        // evnt.stopPropagation();
    });

    AOS.init({
        duration: "600"
    });



    // Cache selectors
    var lastId,
        topMenu = $(".main-nav"),
        topMenuHeight = topMenu.outerHeight(),
        // All list items
        menuItems = topMenu.find("a"),
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
        }, 1000);
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
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#"+id+"']").parent().addClass("active");
        }
    });

    $(document).on("scroll", function (event) {
        $(document).scrollTop() > 100 ? $("header").addClass("fixed") : $("header").removeClass("fixed");
    });
});


