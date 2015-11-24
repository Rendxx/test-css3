$(function () {
    // data
    var containor = $('.containor')
    var scene = $('.scene')
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
    // get mouse position fomr mouse event
    var _getMousePosition = function (e) {
        var pos = {};
        pos["x"] = e.pageX == undefined ? e.originalEvent.touches[0].pageX : e.pageX;
        pos["y"] = e.pageY == undefined ? e.originalEvent.touches[0].pageY : e.pageY;
        return pos;
    };

    var _lastPos = null;
    var startDrag = function (e) {
        e.preventDefault();
        _lastPos = _getMousePosition(e);

        containor.bind("mousemove", onDrag);
        containor.bind("mouseup", stopDrag);
    };

    var onDrag = function (e) {
        e.preventDefault();
        var mousePos = _getMousePosition(e);
        sceneRotate.x -= mousePos.y - _lastPos.y;
        sceneRotate.y += mousePos.x - _lastPos.x;
        _lastPos = mousePos;
        _render();
    };
    var stopDrag = function (e) {
        containor.unbind("mousemove", onDrag);
        containor.unbind("mouseup", stopDrag);

        var mousePos = _getMousePosition(e);
        var mousePos = _getMousePosition(e);
        sceneRotate.x -= mousePos.y - _lastPos.y;
        sceneRotate.y += mousePos.x - _lastPos.x;
        _lastPos = mousePos;
        _render();
    };

    containor.bind("mousedown", startDrag);


    // function
    var _renderScene = function () {
        scene.css({
            'transform': 'rotateX(' + sceneRotate.x + 'deg) rotateY(' + sceneRotate.y + 'deg) rotateZ(' + sceneRotate.z + 'deg) translate3D(' + sceneTranslate.x + 'px, ' + sceneTranslate.y + 'px, ' + sceneTranslate.z + 'px)'
        });
    };
    var _render = function () {
        scene.css({
            'transform': 'rotateX(' + sceneRotate.x + 'deg) rotateY(' + sceneRotate.y + 'deg) rotateZ(' + sceneRotate.z + 'deg) translate3D(' + sceneTranslate.x + 'px, ' + sceneTranslate.y + 'px, ' + sceneTranslate.z + 'px)'
        });
    };
});