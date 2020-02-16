(function($){
    jQuery.fn.lighttabs = function(options){

        var createTabs = function(){

            var tabs = $(this);

            tabs.find(".lighttabs__title").eq(0).addClass("active");
            tabs.find(".lighttabs__content").eq(0).addClass("active");

            tabs.find(".lighttabs__title").click( function() {
                var currentTab = $(this);
                var currentTabNum = currentTab.closest(".lighttabs").find(".lighttabs__title").index( $(this) );

                currentTab.closest(".lighttabs").find(".lighttabs__title").removeClass("active");
                currentTab.addClass("active");
                currentTab.closest(".lighttabs").find(".lighttabs__contents").eq(0).children(".lighttabs__content").removeClass("active").eq( currentTabNum ).addClass("active");
            });

            tabs.find(".lighttabs__next").click( function() {
                $(this).closest(".lighttabs").find(".lighttabs__contents").eq(0).children(".lighttabs__content.active").removeClass("active").next().addClass("active");
            });
 
            tabs.find(".lighttabs__prev").click(function(){
                $(this).closest(".lighttabs").find(".lighttabs__contents").eq(0).children(".lighttabs__content.active").removeClass("active").prev().addClass("active");
            });

        };
        return this.each(createTabs);

    };
})(jQuery);

