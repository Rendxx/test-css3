$(function () {
    // data
    var scene = $('.scene');
    var sceneRotate = {
        x: 0,
        y: 0,
        z: 0
    };
    var ashTransform = [];
    var ashEle = [];
    var count = 100;

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

    var getRandom = function(range){
        return Math.random() * range * 2 - range;
    };

    var _render = function () {
        for (var i = 0; i < count; i++) {
            var transform = 'rotateX(' + sceneRotate.x + 'deg) rotateY(' + sceneRotate.y + 'deg) rotateZ(' + sceneRotate.z + 'deg) translateX(' + ashTransform[i].x + 'px) translateY(' + ashTransform[i].y + 'px) translateZ(' + ashTransform[i].z + 'px) scale(' + ashTransform[i].scale + ')';
            ashEle[i].css({
                'transform': transform
            });
        }
    };

    var build = function (scene, count) {
        for (var i = 0; i < count; i++) {
            ashTransform[i] ={
                scale: getRandom(_data.range.scale) + 0.5,
                x: Math.floor(getRandom(_data.range.x)),
                y: Math.floor(getRandom(_data.range.y)),
                z: Math.floor(getRandom(_data.range.z))
            };
            ashEle[i] = $(_data.html.ash).appendTo(scene);
        }
        _render();
    };

    // parameter
    var _data = {
        html: {
            ash: '<div class="ash"><div class="texture texture-x"></div><div class="texture texture-y"></div><div class="texture texture-z"></div></div>'
        },
        range: {
            scale: 0.25,
            x: 400,
            y: 300,
            z: 1500
        }
    }

    //////////////////////////////////

    build(scene, count);
});