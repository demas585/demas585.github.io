
(function($){
    jQuery.fn.lightTabs = function(options){

        var createTabs = function(){
            var tabs = $(this);

            tabs.find(".tabs__title").click(function(){
                $(this).closest(".tabs").find(".tabs__contents").eq(0).children(".tabs__content").hide().eq( $(this).index() ).show();
                $(this).addClass("active").siblings().removeClass("active");
            });
        };
        return this.each(createTabs);
    };
})(jQuery);

