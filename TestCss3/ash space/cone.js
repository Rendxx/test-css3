/// <reference path="ash.html" />
$(function () {
    var scene = $('.scene');
    var ashEle;
    var rotate = {
        x: 0,
        y: 0,
        z: 0
    };
    var scale = 1;

    $('.btn-front').click(function () {
        rotate.z += 10;
        ashEle.transform({
            rotateX: rotate.x,
            rotateY: rotate.y,
            rotateZ: rotate.z,
            scale: scale
        });
    });
    $('.btn-back').click(function () {
        rotate.z -= 10;
        ashEle.transform({
            rotateX: rotate.x,
            rotateY: rotate.y,
            rotateZ: rotate.z,
            scale: scale
        });
    });
    $('.btn-right').click(function () {
        rotate.y += 10;
        ashEle.transform({
            rotateX: rotate.x,
            rotateY: rotate.y,
            rotateZ: rotate.z,
            scale: scale
        });
    });
    $('.btn-left').click(function () {
        rotate.y -= 10;
        ashEle.transform({
            rotateX: rotate.x,
            rotateY: rotate.y,
            rotateZ: rotate.z,
            scale: scale
        });
    });
    $('.btn-top').click(function () {
        rotate.x += 10;
        ashEle.transform({
            rotateX: rotate.x,
            rotateY: rotate.y,
            rotateZ: rotate.z,
            scale: scale
        });
    });
    $('.btn-bottom').click(function () {
        rotate.x -= 10;
        ashEle.transform({
            rotateX: rotate.x,
            rotateY: rotate.y,
            rotateZ: rotate.z,
            scale: scale
        });
    });

    //////////////////////////////////

    //ashEle = _createAsh(10, 0, 0, 0);
    ashEle = new Particle(scene);
});


var Particle = function (containor) {
    var _html = '<div class="cone"><div class="face face-1"></div><div class="face face-2"></div><div class="face face-3"></div><div class="face face-4"></div></div>';
    //

    // html element
    var ele = null;
    var face = [];

    // parameter
    var rotate = [];
    var translate = [];

    this.transform = function (opts) {
        var transform = '';
        if (opts.x) transform += ' translateX(' + opts.x + 'px)';
        if (opts.y) transform += ' translateY(' + opts.y + 'px)';
        if (opts.z) transform += ' translateZ(' + opts.z + 'px)';
        if (opts.rotateX) transform += ' rotateX(' + (opts.rotateX) + 'deg)';
        if (opts.rotateY) transform += ' rotateY(' + (opts.rotateY) + 'deg)';
        if (opts.rotateZ) transform += ' rotateZ(' + (opts.rotateZ) + 'deg)';

        if (opts.scale) transform += ' scale(' + opts.scale + ')';

        ele.css('transform', transform);
        _render();
    };
    var _setupPara = function () {
        var size = 100;
        var offset = size * 0.2;
        var angle = 70.5;
        var centerOffset = -0.12 *size 

        // translate
        translate[0] = {
            x: 0,
            y: centerOffset,
            z: offset
        };
        translate[1] = {
            x: 0,
            y: centerOffset,
            z: offset
        };
        translate[2] = {
            x: 0,
            y: centerOffset,
            z: offset
        };
        translate[3] = {
            x: 0,
            y: centerOffset,
            z: offset
        };

        // rotate
        rotate[0] = {
            x: 180,
            y: 0,
            z: 0
        };
        rotate[1] = {
            x: -angle,
            y: 0,
            z: -180
        };
        rotate[2] = {
            x: -angle,
            y: 0,
            z: 60
        };
        rotate[3] = {
            x: -angle,
            y: 0,
            z: -60
        };
    };

    var _create = function () {
        ele = $(_html).appendTo(containor);
        face[0] = ele.children('.face-1');
        face[1] = ele.children('.face-2');
        face[2] = ele.children('.face-3');
        face[3] = ele.children('.face-4');
    };

    var _render = function () {
        for (var i = 0; i < 4; i++) {
            var transform = ''
                            + ' translateX(' + (translate[i].x) + 'px)'
                            + ' rotateZ(' + (rotate[i].z) + 'deg)'
                            + ' rotateX(' + (rotate[i].x) + 'deg)'
                            + ' rotateY(' + (rotate[i].y) + 'deg)'
                            + ' translateY(' + (translate[i].y) + 'px)'
                            + ' translateZ(' + (translate[i].z) + 'px)';
            face[i].css('transform', transform);
        }
    };

    var _init = function () {
        _create();
        _setupPara();
        _render();
    }();
};