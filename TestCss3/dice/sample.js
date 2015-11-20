$(function () {
    var cube = $('.cube');
    $('.btn-front').click(function () {
        cube.attr('class', 'cube front_');
    });
    $('.btn-back').click(function () {
        cube.attr('class', 'cube back_');
    });
    $('.btn-right').click(function () {
        cube.attr('class', 'cube right_');
    });
    $('.btn-left').click(function () {
        cube.attr('class', 'cube left_');
    });
    $('.btn-top').click(function () {
        cube.attr('class', 'cube top_');
    });
    $('.btn-bottom').click(function () {
        cube.attr('class', 'cube bottom_');
    });
});