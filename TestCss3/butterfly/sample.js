$(function () {
    // data
    var scene = $('.containor')
    var butterfly = $('.butterfly');
    var sceneRotate = {
        x: 0,
        y: 0,
        z: 0
    };
    var sceneTranslate = {
        x: 0,
        y: 0,
        z: 0
    };

    // button control
    $('.btn-front').click(function () {
        sceneRotate.z -= 10;
        _render();
    });
    $('.btn-back').click(function () {
        sceneRotate.z += 10;
        _render();
    });
    $('.btn-right').click(function () {
        sceneRotate.y += 10;
        _render();
    });
    $('.btn-left').click(function () {
        sceneRotate.y -= 10;
        _render();
    });
    $('.btn-top').click(function () {
        sceneRotate.x += 10;
        _render();
    });
    $('.btn-bottom').click(function () {
        sceneRotate.x -= 10;
        _render();
    });

    // mouse control



    // function
    var _render = function () {
        butterfly.css({
            'transform': 'rotateX(' + sceneRotate.x + 'deg) rotateY(' + sceneRotate.y + 'deg) rotateZ(' + sceneRotate.z + 'deg) translate3D(' + sceneTranslate.x + 'px, ' + sceneTranslate.y + 'px, ' + sceneTranslate.z + 'px)'
        });
    };
});