/// <reference path="ash.html" />
$(function () {
    var scene = $('.scene');
    var ashEle;
    var rotate = {
        x: 0,
        y: 0,
        z: 0
    };

    $('.btn-front').click(function () {
        rotate.z += 10;
        var transform = 'rotateX(' + rotate.x + 'deg) rotateY(' + rotate.y + 'deg) rotateZ(' + rotate.z + 'deg) scale(10)';
        ashEle.css('transform', transform);
    });
    $('.btn-back').click(function () {
        rotate.z -= 10;
        var transform = 'rotateX(' + rotate.x + 'deg) rotateY(' + rotate.y + 'deg) rotateZ(' + rotate.z + 'deg) scale(10)';
        ashEle.css('transform', transform);
    });
    $('.btn-right').click(function () {
        rotate.y += 10;
        var transform = 'rotateX(' + rotate.x + 'deg) rotateY(' + rotate.y + 'deg) rotateZ(' + rotate.z + 'deg) scale(10)';
        ashEle.css('transform', transform);
    });
    $('.btn-left').click(function () {
        rotate.y -= 10;
        var transform = 'rotateX(' + rotate.x + 'deg) rotateY(' + rotate.y + 'deg) rotateZ(' + rotate.z + 'deg) scale(10)';
        ashEle.css('transform', transform);
    });
    $('.btn-top').click(function () {
        rotate.x += 10;
        var transform = 'rotateX(' + rotate.x + 'deg) rotateY(' + rotate.y + 'deg) rotateZ(' + rotate.z + 'deg) scale(10)';
        ashEle.css('transform', transform);
    });
    $('.btn-bottom').click(function () {
        rotate.x -= 10;
        var transform = 'rotateX(' + rotate.x + 'deg) rotateY(' + rotate.y + 'deg) rotateZ(' + rotate.z + 'deg) scale(10)';
        ashEle.css('transform', transform);
    });


    var _createAsh = function (scale, x, y, z) {
        var ash = $(_data.html.ash);
        var transform = 'scale(10)';
        ash.css({
            'transform': transform
        });
        ash.appendTo(scene);
        return ash;
    };

    var _data = {
        html: {
            ash: '<div class="ash"><div class="texture texture-1"></div><div class="texture texture-2"></div><div class="texture texture-3"></div><div class="texture texture-4"></div></div>'
        },
        range:{
            scale:0.25,
            x:400,
            y:300,
            z:1500
        }
    }



    //////////////////////////////////

    //ashEle = _createAsh(10, 0, 0, 0);
    var ash = new Particle(scene);
});


var Particle = function (containor) {
    var _html = '<div class="particle"><div class="texture texture-1"></div><div class="texture texture-2"></div><div class="texture texture-3"></div><div class="texture texture-4"></div></div>';
    var ele = null;
    var face_1 = null;
    var face_2 = null;
    var face_3 = null;
    var face_4 = null;

    var _create = function () {
        ele = $(_html).appendTo(containor);
        face_1 = ele.children('.texture-1');
        face_2 = ele.children('.texture-2');
        face_3 = ele.children('.texture-3');
        face_4 = ele.children('.texture-4');

    };

    this.translate = function (opts) {

    };

    var _init = function () {
        _create()
    }();
};