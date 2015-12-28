$(function () {
    var transitionEnd = (function () {
        var el = $('.test-field')[0];
        var transEndEventNames = {
            'WebkitTransition' : 'webkitTransitionEnd',
            'MozTransition'    : 'transitionend',
            'OTransition'      : 'oTransitionEnd otransitionend',
            'transition'       : 'transitionend'
        };

        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return transEndEventNames[name];
            }
        }

        return null;
    })();

    var end_show = function () {
        msg.html("show");
        console.log("show");
    };
    var end_hide = function () {
        msg.html("hide");
        console.log("hide");
    };

    var test = $('.test-field');
    var msg = $('.test-msg');
    test.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () { console.log(test.hasClass('hide')); });
    $('.btn-1').click(function () {
        test.removeClass('hide');
        if (transitionEnd != null) {
            test[0].removeEventListener(transitionEnd, end_hide, false);
            test[0].addEventListener(transitionEnd, end_show, false);
        }
    });
    $('.btn-2').click(function () {
        test.addClass('hide');
        if (transitionEnd != null) {
            test[0].removeEventListener(transitionEnd, end_show, false);
            test[0].addEventListener(transitionEnd, end_hide, false);
        }
    });


});