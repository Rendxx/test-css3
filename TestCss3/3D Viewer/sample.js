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
    var distance = 1000;    // distance from the obj to screen
    var radius = 250;       // control radius
    var _radius_squ = radius * radius;
    var _sincos = {
        x: [0, 1],
        y: [0, 1],
        z: [0, 1]
    };

    // button control
    $('.btn-z-1').click(function () {
        sceneRotate.z += 10;
        _sincos.z[0] = Math.sin(sceneRotate.z / 180 * Math.PI);
        _sincos.z[1] = Math.cos(sceneRotate.z / 180 * Math.PI);
        console.log(_rotate3d([0, 0, radius]));
        console.log('x: ' + _sincos.x);
        console.log('y: ' + _sincos.y);
        console.log('z: ' + _sincos.z);

        _render();
    });
    $('.btn-z-2').click(function () {
        sceneRotate.z -= 10;
        _sincos.z[0] = Math.sin(sceneRotate.z / 180 * Math.PI);
        _sincos.z[1] = Math.cos(sceneRotate.z / 180 * Math.PI);
        console.log(_rotate3d([0, 0, radius]));
        console.log('x: ' + _sincos.x);
        console.log('y: ' + _sincos.y);
        console.log('z: ' + _sincos.z);

        _render();
    });
    $('.btn-y-1').click(function () {
        sceneRotate.y += 10;
        _sincos.y[0] = Math.sin(sceneRotate.y / 180 * Math.PI);
        _sincos.y[1] = Math.cos(sceneRotate.y / 180 * Math.PI);
        console.log(_rotate3d([0, 0, radius]));
        console.log('x: ' + _sincos.x);
        console.log('y: ' + _sincos.y);
        console.log('z: ' + _sincos.z);

        _render();
    });
    $('.btn-y-2').click(function () {
        sceneRotate.y -= 10;
        _sincos.y[0] = Math.sin(sceneRotate.y / 180 * Math.PI);
        _sincos.y[1] = Math.cos(sceneRotate.y / 180 * Math.PI);
        console.log(_rotate3d([0, 0, radius]));
        console.log('x: ' + _sincos.x);
        console.log('y: ' + _sincos.y);
        console.log('z: ' + _sincos.z);

        _render();
    });
    $('.btn-x-1').click(function () {
        sceneRotate.x += 10;
        _sincos.x[0] = Math.sin(sceneRotate.x / 180 * Math.PI);
        _sincos.x[1] = Math.cos(sceneRotate.x / 180 * Math.PI);
        console.log(_rotate3d([0, 0, radius]));
        console.log('x: ' + _sincos.x);
        console.log('y: ' + _sincos.y);
        console.log('z: ' + _sincos.z);

        _render();
    });
    $('.btn-x-2').click(function () {
        sceneRotate.x -= 10;
        _sincos.x[0] = Math.sin(sceneRotate.x / 180 * Math.PI);
        _sincos.x[1] = Math.cos(sceneRotate.x / 180 * Math.PI);
        console.log(_rotate3d([0, 0, radius]));
        console.log('x: ' + _sincos.x);
        console.log('y: ' + _sincos.y);
        console.log('z: ' + _sincos.z);

        _render();
    });

    // mouse control
    var _C2S = function (x, y, z) {
        var r = Math.sqrt(x * x + y * y + z * z);
        var t = Math.acos(z / r);
        var p = Math.atan(y / x);
        return {
            r: r,
            x: t * 180 / Math.PI,
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

    // get {x,y,z} from related x, y in screen coordinate 
    var _screen2Coor = function (x, y) {
        /* 0. arguement coordinate: screen coordinate
         *  +---> x
         *  |
         *  ˅ y
         */

        /* 1. 2D coordinate: normal coordinate
         *   ˄ y
         *   |
         * --+----> x
         *   |
         */

        x = x - containorOffset.x;
        y = y - containorOffset.y;

        /* 2. 3D coordinate: normal coordinate
         * Assume the mouse touchs a ball with radius (defined before)
         * If the mouse click not within the ball area, make z = 0
         *    ˄ y
         *    |
         *    *----> x
         *   /
         *  z
         */
         
        var z = 0;
        var t =_radius_squ-(x * x + y * y);
        if (t > 0) z = Math.sqrt(t);

        return [x, y, z];
    };

    // get the position of the point after applying a 3D rotation
    // point: [x, y, z]
    var _rotate3d = function (point) {
        var x = point[0];
        var y = point[1];
        var z = point[2];

        var sin_x = _sincos.x[0];
        var cos_x = _sincos.x[1];
        var sin_y = _sincos.y[0];
        var cos_y = _sincos.y[1];
        var sin_z = _sincos.z[0];
        var cos_z = _sincos.z[1];

        var t;

        // rotate x
        t = (cos_x * y + sin_x * z).toFixed(2);
        z = (-sin_x * y + cos_x * z).toFixed(2);
        y = t;

        // rotate y
        t = (cos_y * x - sin_y * z).toFixed(2);
        z = (sin_y * x + cos_y * z).toFixed(2);
        x = t;

        // rotate z
        t = (cos_z * x + sin_z * y).toFixed(2);
        y = (-sin_z * x + cos_z * y).toFixed(2);
        x = t;

        return [x, y, z];
    };


    // get mouse position from mouse event
    var _getMousePosition = function (e) {
        var pos = {};
        pos["x"] = e.pageX == undefined ? e.originalEvent.touches[0].pageX : e.pageX;
        pos["y"] = e.pageY == undefined ? e.originalEvent.touches[0].pageY : e.pageY;

        return pos;
    };

    var _lastPos = null;
    var startDrag = function (e) {
        e.preventDefault();
        var mousePos = _getMousePosition(e);
        _lastPos = _C2S(distance, mousePos.x, -mousePos.y);
        var point = _screen2Coor(mousePos.x, mousePos.y);
        var newPoint = _rotate3d(point);

        //console.log('coor: ' + point);
        //console.log('tran: ' + newPoint);
        //containor.bind("mousemove", onDrag);
        //containor.bind("mouseup", stopDrag);
    };

    var onDrag = function (e) {
        e.preventDefault();
        var mousePos = _getMousePosition(e);
        var p = _C2S(distance, mousePos.x, -mousePos.y);

        console.log(mousePos.x, -mousePos.y,p.x, p.y);
        sceneRotate.x -= p.x - _lastPos.x;
        sceneRotate.y += p.y - _lastPos.y;

        _lastPos = p;
        _render();
    };
    var stopDrag = function (e) {
        //containor.unbind("mousemove", onDrag);
        //containor.unbind("mouseup", stopDrag);

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