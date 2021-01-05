
(function ( $ ) {
 
    $.fn.tblfix = function( options ) {
    
        $elem = this;
        
        if(!$elem.parent().hasClass("tblfix")) {
           $elem.wrap($("<div>").addClass("tblfix")); 
            
            $elem.mousedown(function(event) {
                if(!$elem.hasClass("on")) return
                $(this).addClass("drag").data({
                    x: event.clientX,
                    y: event.clientY,
                    bx: $($elem).closest(".tblfix").scrollLeft(),
                    by: $($elem).closest(".tblfix").scrollTop()
                })
            }).mouseup(function(event) {
                if(!$elem.hasClass("on")) return
                $(this).removeClass("drag")
            }).mouseleave(function(event) {
                if(!$elem.hasClass("on")) return
                $(this).removeClass("drag")
            }).mousemove( function(event) {
                if(!$elem.hasClass("on")) return
                if($(this).hasClass("drag")) {
        
                    var speed = 4,
                        x = Math.max(0, Math.min(($(this).data("sw") ? $(this).data("sw") - $(this).data("cw") : 10000), (event.clientX - $(this).data("x")) * speed + $(this).data("bx"))),
                        y = Math.max(0, Math.min(($(this).data("sh") ? $(this).data("sh") - $(this).data("ch") : 10000), (event.clientY - $(this).data("y")) * speed + $(this).data("by")));

                    $($elem).closest(".tblfix").scrollTop(y).scrollLeft(x)
                }
            })

            $(".tblfix").scroll(function() {
                if($.isFunction($.create_charts)) {
                    $.create_charts()
                }
            });

        }

        $elem.closest(".tblfix").removeClass("on").addClass(options.active ? "on" : "")
        $elem.removeClass("on").addClass(options.active ? "on" : "")
        // set top & left sticky position

        if(options.active) {
            var top = $("thead tr", $elem).first().outerHeight(true),
            left = 0,
            trc = $(".trc .fixed", $elem),
            trh = $(".trh .fixed", $elem),
            trs = [],
            bs = parseInt($elem.css("border-spacing").slice(0, 1))
                    
            $("tbody tr", $elem).each(function() {
                var tds = $("td", $(this))
                trs.push(tds.slice(0, trh.length))
            })

            $(".trc th", $elem).css("top", top + "px")
        
            $(".trc .fixed", $elem).each(function(i, e) {
                $(trc[i]).css("left", left + "px")
                left = left + ($(this).css("display") != "none" ? $(this).outerWidth(true) + bs : 0)
            })

            left = 0
            $(".trh .fixed", $elem).each(function(i, e) {
                $(trh[i]).css("left", left + "px")
                $.each(trs, function(r, e) {
                    $(trs[r][i]).addClass("fixed").css("left", left + "px")
                })
                left = left + ($(this).css("display") != "none" ? $(this).outerWidth(true) + bs : 0)
            }) 
        } else {
            var trc = $(".trc .fixed", $elem),
                trh = $(".trh .fixed", $elem),
                trs = [];
                    
            $("tbody tr", $elem).each(function() {
                var tds = $("td", $(this))
                trs.push(tds.slice(0, trh.length))
            })

            $(".trh th", $elem).each(function(i, e) {
               $(this).css("top", '')
            })
        
            $(".trc .fixed", $elem).each(function(i, e) {
                $(trc[i]).css("left", '')
            })

            $(".trh .fixed", $elem).each(function(i, e) {
                $(trh[i]).css("left", '')
                $.each(trs, function(r, e) {
                    $(trs[r][i]).css("left", '')
                })
            }) 
        }
    }

}( jQuery ));