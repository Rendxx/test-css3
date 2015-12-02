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
        x: (containor[0].getBoundingClientRect().left + containor[0].getBoundingClientRect().right) / 2,
        y: (containor[0].getBoundingClientRect().top + containor[0].getBoundingClientRect().bottom) / 2
    };
    var distance = 1000;    // distance from the obj to screen
    var radius = 200;       // control radius
    var _radius_squ = radius * radius;
    var _sincos = {
        x: [0, 1],
        y: [0, 1],
        z: [0, 1]
    };

    var _matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    // button control
    $('.btn-z-1').click(function () {
        var sin = Math.sin(10 / 180 * Math.PI);
        var cos = Math.cos(10 / 180 * Math.PI);

        var m = [cos, -sin, 0, sin, cos, 0, 0, 0, 1];
        _matrix = _martixMulti(_matrix, m);
        _render2();
    });
    $('.btn-z-2').click(function () {
        var sin = Math.sin(-10 / 180 * Math.PI);
        var cos = Math.cos(-10 / 180 * Math.PI);

        var m = [cos, -sin, 0, sin, cos, 0, 0, 0, 1];
        _matrix = _martixMulti(_matrix, m);
        _render2();
    });
    $('.btn-y-1').click(function () {
        var sin = Math.sin(10 / 180 * Math.PI);
        var cos = Math.cos(10 / 180 * Math.PI);

        var m = [cos, 0, sin, 0, 1, 0, -sin, 0, cos];
        _matrix = _martixMulti(_matrix, m);
        _render2();
    });
    $('.btn-y-2').click(function () {
        var sin = Math.sin(-10 / 180 * Math.PI);
        var cos = Math.cos(-10 / 180 * Math.PI);

        var m = [cos, 0, sin, 0, 1, 0, -sin, 0, cos];
        _matrix = _martixMulti(_matrix, m);
        _render2();
    });
    $('.btn-x-1').click(function () {
        var sin = Math.sin(10 / 180 * Math.PI);
        var cos = Math.cos(10 / 180 * Math.PI);

        var m = [1, 0, 0, 0, cos, -sin, 0, sin, cos];
        _matrix = _martixMulti(_matrix, m);
        _render2();
    });
    $('.btn-x-2').click(function () {
        var sin = Math.sin(-10 / 180 * Math.PI);
        var cos = Math.cos(-10 / 180 * Math.PI);

        var m = [1, 0, 0, 0, cos, -sin, 0, sin, cos];
        _matrix = _martixMulti(_matrix, m);
        _render2();
    });

    // get radius from 3d coordinate
    var _getRadius = function (x, y, z) {
        var r = Math.sqrt(x * x + y * y + z * z);
        return {
            x: Math.asin(y / r),
            y: -Math.asin(x / r)
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
         *   |
         * --+----> x
         *   |
         *   ˅ y
         */

        x = x - containorOffset.x;
        y = y - containorOffset.y;

        /* 2. 3D coordinate: normal coordinate
         * Assume the mouse touchs a ball with radius (defined before)
         * If the mouse click not within the ball area, make z = 0
         *  z
         *   \
         *    *----> x
         *    |
         *    ˅ y
         */

        var z = 0;
        var t = _radius_squ - (x * x + y * y);
        if (t > 0) z = Math.sqrt(t);

        return [x, y, z];
    };

    // get the position of the point after applying a 3D rotation
    // point: [x, y, z]
    var _rotate3d = function (point) {
        var x = point[0];
        var y = point[1];
        var z = point[2];

        var sin_x = -_sincos.x[0];
        var cos_x = _sincos.x[1];
        var sin_y = -_sincos.y[0];
        var cos_y = _sincos.y[1];
        var sin_z = -_sincos.z[0];
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

    // multiple 2 matrixes(3*3)
    // A = [a00, a01, ... a0n, a10, ... a1n . a20 .. am0 , ... amn]
    var _martixMulti = function (A, B) {
        var rst = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        var n = 0;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                n = i * 3 + j;
                rst[n] = 0;
                for (var k = 0; k < 3; k++) {
                    rst[n] += A[i * 3 + k] * B[k * 3 + j];
                }
            }
        }

        return rst;
    };
    // window.mmm = _martixMulti;

    // get mouse position from mouse event
    var _getMousePosition = function (e) {
        var pos = {};
        pos["x"] = e.pageX == undefined ? e.originalEvent.touches[0].pageX : e.pageX;
        pos["y"] = e.pageY == undefined ? e.originalEvent.touches[0].pageY : e.pageY;

        return pos;
    };

    var _last = null;
    var startDrag = function (e) {
        e.preventDefault();
        var mousePos = _getMousePosition(e);
        //_last = _C2S(distance, mousePos.x, -mousePos.y);
        var point = _screen2Coor(mousePos.x, mousePos.y);
        _last = _getRadius(point[0], point[1], point[2]);

        //console.log('coor: ' + point);
        //console.log('tran: ' + _last);
        containor.bind("mousemove", onDrag);
        containor.bind("mouseup", stopDrag);
    };

    var onDrag = function (e) {
        e.preventDefault();
        var mousePos = _getMousePosition(e);
        //var p = _C2S(distance, mousePos.x, -mousePos.y);
        var point = _screen2Coor(mousePos.x, mousePos.y);
        var p = _getRadius(point[0], point[1], point[2]);

        console.log('[point] ' + point.join('  '));
        console.log('[radius-x] ' + p.x);
        console.log('[radius-y] ' + p.y);


        var r, sin, cos, m;
        r = p.x - _last.x;
        sin = Math.sin(r);
        cos = Math.cos(r);
        m = [1, 0, 0, 0, cos, -sin, 0, sin, cos];
        _matrix = _martixMulti(_matrix, m);
        console.log('dif-x: ' + r);

        r = p.y- _last.y;
        sin = Math.sin(r);
        cos = Math.cos(r);
        m = [cos, 0, sin, 0, 1, 0, -sin, 0, cos];
        _matrix = _martixMulti(_matrix, m);

        console.log('dif-y: ' + r);
        console.log(' ');

        _last = p;
        _render2();
    };
    var stopDrag = function (e) {
        containor.unbind("mousemove", onDrag);
        containor.unbind("mouseup", stopDrag);

        return;
        var mousePos = _getMousePosition(e);
        var p = _C2S(mousePos.x, mousePos.y, distance);

        sceneRotate.x -= p.x - _last.x;
        sceneRotate.y -= p.y - _last.y;

        _last = mousePos;
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
    var _render2 = function () {
        scene.css({
            'transform': 'matrix3d(' + _matrix[0] + ',' + _matrix[1] + ',' + _matrix[2] + ', 0,' + _matrix[3] + ',' + _matrix[4] + ',' + _matrix[5] + ', 0,' + _matrix[6] + ',' + _matrix[7] + ',' + _matrix[8] + ', 0,' + '0,0,0,1)'
        });
    };
});