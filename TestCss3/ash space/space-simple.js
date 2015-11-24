$(function () {
    // data
    var scene = $('.scene');
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
    var ashTransform = [];
    var ashEle = [];
    var count = 500;
    var interval = 1000;
    var group = 0;
    var groupCount = 50;

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

    // sensor
    // sensor-top
    $('.sensor.topLeft_').mouseover(function () {
        sceneRotate = {
            x: -20,
            y: 20,
            z: 0
        };
        sceneTranslate = {
            x: 20,
            y: 20,
            z: 0
        };
        _render();
    });
    $('.sensor.topMid_').mouseover(function () {
        sceneRotate = {
            x: -20,
            y:0,
            z: 0
        };
        sceneTranslate = {
            x: -20,
            y: 20,
            z: 0
        };
        _render();
    });
    $('.sensor.topRight_').mouseover(function () {
        sceneRotate = {
            x: -20,
            y: -20,
            z: 0
        };
        sceneTranslate = {
            x: -20,
            y: 20,
            z: 0
        };
        _render();
    });

    // sensor-mid
    $('.sensor.midLeft_').mouseover(function () {
        sceneRotate = {
            x: 0,
            y: 20,
            z: 0
        };
        sceneTranslate = {
            x: 20,
            y: 0,
            z: 0
        };
        _render();
    });
    $('.sensor.midMid_').mouseover(function () {
        sceneRotate = {
            x: 0,
            y: 0,
            z: 0
        };
        sceneTranslate = {
            x: 0,
            y: 0,
            z: 0
        };
        _render();
    });
    $('.sensor.midRight_').mouseover(function () {
        sceneRotate = {
            x: 0,
            y: -20,
            z: 0
        };
        sceneTranslate = {
            x: -20,
            y: 0,
            z: 0
        };
        _render();
    });

    // sensor-btm
    $('.sensor.btmLeft_').mouseover(function () {
        sceneRotate = {
            x: 20,
            y: 20,
            z: 0
        };
        sceneTranslate = {
            x: 20,
            y: -20,
            z: 0
        };
        _render();
    });
    $('.sensor.btmMid_').mouseover(function () {
        sceneRotate = {
            x: 20,
            y: 0,
            z: 0
        };
        sceneTranslate = {
            x: 0,
            y: -20,
            z: 0
        };
        _render();
    });
    $('.sensor.btmRight_').mouseover(function () {
        sceneRotate = {
            x: 20,
            y: -20,
            z: 0
        };
        sceneTranslate = {
            x: -20,
            y: -20,
            z: 0
        };
        _render();
    });
    ///////////////////////////////////////////////////////

    var getRandom = function(range){
        return Math.random() * range * 2 - range;
    };

    var _render = function () {
        scene.css({
            'transform': 'rotateX(' + sceneRotate.x + 'deg) rotateY(' + sceneRotate.y + 'deg) rotateZ(' + sceneRotate.z + 'deg) translate3D(' + sceneTranslate.x + 'px, ' + sceneTranslate.y + 'px, ' + sceneTranslate.z + 'px)'
        });
        for (var i = 0; i < count; i++) {
            ashEle[i].children('.ash-inner').css('transform', 'rotateX(' + -sceneRotate.x + 'deg) rotateY(' + -sceneRotate.y + 'deg) rotateZ(' + -sceneRotate.z + 'deg)');
        } 
    };

    var startMove = function () {
        for (var i = group * groupCount, l = i + groupCount; i < l; i++) {
            ashEle[i].children('.ash-inner').css('transform', _data.moveClass[Math.floor(getRandom(12))]);
        }
        group = (group + 1) % 10;
    };

    var build = function (scene, count) {
        for (var i = 0; i < count; i++) {
            ashTransform[i] ={
                scale: getRandom(_data.range.scale) + 0.25,
                x: Math.floor(getRandom(_data.range.x)),
                y: Math.floor(getRandom(_data.range.y)),
                z: Math.floor(getRandom(_data.range.z))
            };
            ashEle[i] = $(_data.html.ash).appendTo(scene);
            var transform = 'translate3D(' + ashTransform[i].x + 'px ,' + ashTransform[i].y + 'px ,' + ashTransform[i].z + 'px) scale3d(' + ashTransform[i].scale + ',' + ashTransform[i].scale + ',' + ashTransform[i].scale + ')';
            ashEle[i].css({
                'transform': transform
            });
        }
        _render();
    };

    // parameter
    var _data = {
        html: {
            ash: '<div class="ash"><div class="ash-inner"><div class="texture texture-x"></div><div class="texture texture-y"></div><div class="texture texture-z"></div></div></div>'
        },
        range: {
            scale: 0.2,
            x: 400,
            y: 300,
            z: 1500
        },
        moveClass: [
            'translate3d(0, 0, 0)',
            'translate3d(-30px, 30px, 30px)',
            'translate3d(30px, -30px, 30px)',
            'translate3d(30px, 30px, -30px)',
            'translate3d(30px, -30px, -30px)',
            'translate3d(-30px, 30px, -30px)',
            'translate3d(-30px, -30px, 30px)',
            'translate3d(-30px, -30px, -30px)',
            'translate3d(30px, 30px, 30px)',
            'translate3d(0, -30px, 50px)',
            'translate3d(-50px, 0, 30px)',
            'translate3d(-30px, 50px, 0)'
        ]
    }

    //////////////////////////////////

    build(scene, count);
    //startMove();
    //setInterval(startMove, interval);
});