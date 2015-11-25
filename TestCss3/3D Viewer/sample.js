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

    var containorOffset = {
        x: (containor[0].getBoundingClientRect().left + containor[0].getBoundingClientRect().right)/2,
        y: (containor[0].getBoundingClientRect().top+ containor[0].getBoundingClientRect().bottom)/2
    };
    var distance = 100;

    // button control
    $('.btn-z-1').click(function () {
        sceneRotate.z += 10;
        _render();
    });
    $('.btn-z-2').click(function () {
        sceneRotate.z -= 10;
        _render();
    });
    $('.btn-y-1').click(function () {
        sceneRotate.y += 10;
        _render();
    });
    $('.btn-y-2').click(function () {
        sceneRotate.y -= 10;
        _render();
    });
    $('.btn-x-1').click(function () {
        sceneRotate.x += 10;
        _render();
    });
    $('.btn-x-2').click(function () {
        sceneRotate.x -= 10;
        _render();
    });

    // mouse control
    var _C2S = function (x, y, z) {
        var r = Math.sqrt(x * x + y * y + z * z);
        var t = Math.acos(z / r);
        var p = Math.atan(y / x);
        return {
            r: r,
            x: 90-t * 180 / Math.PI,
            y: p * 180 / Math.PI
        };
    };

    var _S2C = function (r, t, p) {
        return {
            x: r * Math.sin(t) * Math.cos(p),
            y: r * Math.sin(t) * Math.sin(p),
            z: r * Math.cos(t)
        };
    };


    // get mouse position from mouse event
    var _getMousePosition = function (e) {
        var pos = {};
        pos["x"] = e.pageX == undefined ? e.originalEvent.touches[0].pageX : e.pageX;
        pos["y"] = e.pageY == undefined ? e.originalEvent.touches[0].pageY : e.pageY;

        pos["x"] -= containorOffset.x;
        pos["y"] -= containorOffset.y;

        return pos;
    };

    var _lastPos = null;
    var startDrag = function (e) {
        e.preventDefault();
        var mousePos = _getMousePosition(e);
        _lastPos = _C2S(distance, mousePos.x, -mousePos.y);

        containor.bind("mousemove", onDrag);
        containor.bind("mouseup", stopDrag);
    };

    var onDrag = function (e) {
        e.preventDefault();
        var mousePos = _getMousePosition(e);
        var p = _C2S(distance, mousePos.x, -mousePos.y);

        console.log(mousePos.x, -mousePos.y,p.x, p.y);
        sceneRotate.x += p.x - _lastPos.x;
        sceneRotate.y += p.y - _lastPos.y;

        _lastPos = p;
        _render();
    };
    var stopDrag = function (e) {
        containor.unbind("mousemove", onDrag);
        containor.unbind("mouseup", stopDrag);

        return;
        var mousePos = _getMousePosition(e);
        var p = _C2S(mousePos.x, mousePos.y, distance);

        sceneRotate.x -= p.x - _lastPos.x;
        sceneRotate.y -= p.y - _lastPos.y;

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