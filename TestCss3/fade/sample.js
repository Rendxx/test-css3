$(function () {
    var test = $('.test-wrap');
    test.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () { console.log(test.hasClass('hide')); });
    $('.btn-1').click(function () {
        test.removeClass('hide');
    });
    $('.btn-2').click(function () {
        test.addClass('hide');
    });
});