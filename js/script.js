const $textSection = $('.text-section');
const $paddingSection = $('.padding-section');
const $map = $('#map');

// SET ELEMENT HEIGHTS
let screenHeight = $(window).height();
let screenWidth = $(window).width();

function setHeights () {

    // get new height and width
    screenHeight = $(window).height();
    screenWidth = $(window).width();
    let $bleach = $(".bleaching");
    let bleachWidth;
    let bleachHeight;

    // check whether height or width will be the limiting factor for the scale of the bleaching animation
    // reset before updating variables
    if (screenHeight < (screenWidth * 0.6363)) {

        $bleach.css("height", (screenHeight - 80));
        bleachHeight = $bleach.height();

        $bleach.css("width", (bleachHeight * 1.5714));
        bleachWidth = $bleach.width();
        
    } else {

        $bleach.css("width", (screenWidth - 80));
        bleachWidth = $bleach.width();
    
        $bleach.css("height", (bleachWidth * 0.6363));
        bleachHeight = $bleach.height();

    }

    let bleachMargin = (screenHeight - bleachHeight)/2;
    $bleach.css("margin-top", bleachMargin);
    $bleach.css("top", bleachMargin);
    $bleach.css("margin-bottom", bleachMargin);

    $(".bleaching-wrapper").css("height", screenHeight + 700);
    $(".bleaching-wrapper").css("margin-left", "auto");
    $(".bleaching-wrapper").css("margin-right", "auto");

    $map.css("height", screenHeight);
    $paddingSection.css("height", screenHeight*0.7);
    $('.padding-section-top').css("height", screenHeight*0.5);

    let textHeight = $('#text-container').height();
    $("#map-container").css("height", textHeight);

    let placeholderHeight = $('#chart-placeholder').height();
    $("#chart-container").css("height", (textHeight + (placeholderHeight*2) - screenHeight));

    let chartFromTop = $('#section-1').height() + $('#section-2').height() + $('#section-3').height() + $('#section-4').height();
    $("#chart-container").css("top", (chartFromTop + 10));

}

setHeights();

$(document).ready(function() {

    // scroll to top on window reload
    $(document).scrollTop(0);

    window.addEventListener("resize", function(){
        setHeights();
    }, true);

    $textSection.each(function(){

        let _this = this;
        let sectionName = $(this).attr('id');
        let graphFunction = "triangle" + sectionName;

        var inViewBottom = new Waypoint({
            element: _this,
            handler: function (direction) {
                if (direction == 'down'){
                    $(this.element).animate({'opacity': 1});
                    window[graphFunction]();
                    if (screenHeight > 900) {
                        map.flyTo(locationsRetina[sectionName]);
                        // console.log("Retina " + sectionName);
                    } else if (screenHeight < 901 && screenHeight > 700) {
                        map.flyTo(locationsDesktop[sectionName]);
                        // console.log("Desktop " + sectionName);
                    } else if (screenHeight < 701 && screenHeight > 500) {
                        map.flyTo(locationsLaptop[sectionName]);
                        // console.log("Laptop " + sectionName);
                    } else {
                        map.flyTo(locationsMobile[sectionName]);
                        // console.log("Mobile " + sectionName);
                    };
                    updateMap(sectionName);
                } else {
                    $(this.element).animate({'opacity': 0.2});
                }
            },
            offset: '85%'
        });

        var inViewTop = new Waypoint({
            element: _this,
            handler: function (direction) {
                if (direction == 'down'){
                    $(this.element).animate({'opacity': 0.2});
                } else {
                    $(this.element).animate({'opacity': 1});
                    window[graphFunction]();
                    if (screenHeight > 900) {
                        map.flyTo(locationsRetina[sectionName]);
                    } else if (screenHeight < 901 && screenHeight > 700) {
                        map.flyTo(locationsDesktop[sectionName]);
                    } else if (screenHeight < 701 && screenHeight > 500) {
                        map.flyTo(locationsLaptop[sectionName]);
                    } else {
                        map.flyTo(locationsMobile[sectionName]);
                    };
                    updateMap(sectionName);
                }
            },
            offset: '15%'
        });

    });

});

// ALGAE ANIMATION
// set up animation to be triggered in scroll event

// append dots to DOM
// 2x3 for each of the 8 corals
for (i = 0; i < 24; i++) {
    $(".bleaching").append("<div class='algae dot" + (i + 1) + "'></div>");
    $(".bleaching").append("<div class='algae dot" + (i + 1) + "'></div>");
    $(".bleaching").append("<div class='algae dot" + (i + 1) + "'></div>");
}

// colour algae for coral 1 and coral 5
$(".dot1, .dot9, .dot17, .dot5, .dot13, .dot21").css("background-color", "#f4a7a2");
// coral 2
$(".dot2, .dot10, .dot18").css("background-color", "#fac883");
// coral 3
$(".dot3, .dot11, .dot19").css("background-color", "#f4b3ce");
// coral 4
$(".dot4, .dot12, .dot20").css("background-color", "#ffefa2");
// coral 6 and 7
$(".dot6, .dot14, .dot22, .dot7, .dot15, .dot23").css("background-color", "#dbc1f7");
// coral 8
$(".dot8, .dot16, .dot24").css("background-color", "#c1eff4");

var paths1 = [];
var paths2 = [];
var paths3 = [];
var paths4 = [];
var paths5 = [];
var paths6 = [];
var paths7 = [];
var paths8 = [];


function createPathVariables (){
    for (var i = 0; i <= 7; i++) {
        let name = "paths" + (i + 1);
        for (var j = 0; j <= 3; j++) {
            eval(name)[j] = anime.path(".path_" + (i + 1) + "_" + j);
        }
    }
    return eval(name)
}

createPathVariables();

var coral1Algae1 = anime({
    targets: '.dot1',
    translateX: function(el,i) { return paths1[i]('x')},
    translateY: function(el,i) { return paths1[i]('y')},
    rotate: function(el,i) { return paths1[i]('angle')},
    delay: function(el, i) { return i * 100; },
    opacity: 0,
    easing: 'linear',
    duration: 1000,
    autoplay: false
});

var coral1Algae2 = anime({
    targets: '.dot9',
    translateX: function(el,i) { return paths1[i]('x')},
    translateY: function(el,i) { return paths1[i]('y')},
    rotate: function(el,i) { return paths1[i]('angle')},
    delay: function(el, i) { return (i * 110) + 250; },
    opacity: 0,
    easing: 'linear',
    duration: 1000,
    autoplay: false
});

var coral1Algae3 = anime({
    targets: '.dot17',
    translateX: function(el,i) { return paths1[i]('x')},
    translateY: function(el,i) { return paths1[i]('y')},
    rotate: function(el,i) { return paths1[i]('angle')},
    delay: function(el, i) { return (i * 110) + 400; },
    opacity: 0,
    easing: 'linear',
    duration: 1000,
    autoplay: false
});

var coral2Algae1 = anime({
    targets: '.dot2',
    translateX: function(el,i) { return paths2[i]('x')},
    translateY: function(el,i) { return paths2[i]('y')},
    rotate: function(el,i) { return paths2[i]('angle')},
    delay: function(el, i) { return i * 100; },
    opacity: 0,
    easing: 'linear',
    duration: 1000,
    autoplay: false
});

var coral2Algae2 = anime({
    targets: '.dot10',
    translateX: function(el,i) { return paths2[i]('x')},
    translateY: function(el,i) { return paths2[i]('y')},
    rotate: function(el,i) { return paths2[i]('angle')},
    delay: function(el, i) { return (i * 110) + 200; },
    opacity: 0,
    easing: 'linear',
    duration: 1000,
    autoplay: false
});

var coral2Algae3 = anime({
    targets: '.dot18',
    translateX: function(el,i) { return paths2[i]('x')},
    translateY: function(el,i) { return paths2[i]('y')},
    rotate: function(el,i) { return paths2[i]('angle')},
    delay: function(el, i) { return (i * 110) + 400; },
    opacity: 0,
    easing: 'linear',
    duration: 1000,
    autoplay: false
});

var coral3Algae1 = anime({
    targets: '.dot3',
    translateX: function(el,i) { return paths3[i]('x')},
    translateY: function(el,i) { return paths3[i]('y')},
    rotate: function(el,i) { return paths3[i]('angle')},
    delay: function(el, i) { return i * 100; },
    opacity: 0,
    easing: 'linear',
    duration: 1000,
    autoplay: false
});

var coral3Algae2 = anime({
    targets: '.dot11',
    translateX: function(el,i) { return paths3[i]('x')},
    translateY: function(el,i) { return paths3[i]('y')},
    rotate: function(el,i) { return paths3[i]('angle')},
    delay: function(el, i) { return (i * 110) + 150; },
    opacity: 0,
    easing: 'linear',
    duration: 1000,
    autoplay: false
});

var coral3Algae3 = anime({
    targets: '.dot19',
    translateX: function(el,i) { return paths3[i]('x')},
    translateY: function(el,i) { return paths3[i]('y')},
    rotate: function(el,i) { return paths3[i]('angle')},
    delay: function(el, i) { return (i * 110) + 250; },
    opacity: 0,
    easing: 'linear',
    duration: 1000,
    autoplay: false
});

var coral4Algae1 = anime({
    targets: '.dot4',
    translateX: function(el,i) { return paths4[i]('x')},
    translateY: function(el,i) { return paths4[i]('y')},
    rotate: function(el,i) { return paths4[i]('angle')},
    delay: function(el, i) { return i * 100; },
    opacity: 0,
    easing: 'linear',
    duration: 1000,
    autoplay: false
});

var coral4Algae2 = anime({
    targets: '.dot12',
    translateX: function(el,i) { return paths4[i]('x')},
    translateY: function(el,i) { return paths4[i]('y')},
    rotate: function(el,i) { return paths4[i]('angle')},
    delay: function(el, i) { return (i * 110) + 250; },
    opacity: 0,
    easing: 'linear',
    duration: 1000,
    autoplay: false
});

var coral4Algae3 = anime({
    targets: '.dot20',
    translateX: function(el,i) { return paths4[i]('x')},
    translateY: function(el,i) { return paths4[i]('y')},
    rotate: function(el,i) { return paths4[i]('angle')},
    delay: function(el, i) { return (i * 110) + 400; },
    opacity: 0,
    easing: 'linear',
    duration: 1000,
    autoplay: false
});

var coral5Algae1 = anime({
    targets: '.dot5',
    translateX: function(el,i) { return paths5[i]('x')},
    translateY: function(el,i) { return paths5[i]('y')},
    rotate: function(el,i) { return paths5[i]('angle')},
    delay: function(el, i) { return i * 100; },
    opacity: 0,
    easing: 'linear',
    duration: 1000,
    autoplay: false
});

var coral5Algae2 = anime({
    targets: '.dot13',
    translateX: function(el,i) { return paths5[i]('x')},
    translateY: function(el,i) { return paths5[i]('y')},
    rotate: function(el,i) { return paths5[i]('angle')},
    delay: function(el, i) { return (i * 110) + 150; },
    opacity: 0,
    easing: 'linear',
    duration: 1000,
    autoplay: false
});

var coral5Algae3 = anime({
    targets: '.dot21',
    translateX: function(el,i) { return paths5[i]('x')},
    translateY: function(el,i) { return paths5[i]('y')},
    rotate: function(el,i) { return paths5[i]('angle')},
    delay: function(el, i) { return (i * 110) + 350; },
    opacity: 0,
    easing: 'linear',
    duration: 1000,
    autoplay: false
});


var coral6Algae1 = anime({
    targets: '.dot6',
    translateX: function(el,i) { return paths6[i]('x')},
    translateY: function(el,i) { return paths6[i]('y')},
    rotate: function(el,i) { return paths6[i]('angle')},
    delay: function(el, i) { return i * 100; },
    opacity: 0,
    easing: 'linear',
    duration: 1000,
    autoplay: false
});

var coral6Algae2 = anime({
    targets: '.dot14',
    translateX: function(el,i) { return paths6[i]('x')},
    translateY: function(el,i) { return paths6[i]('y')},
    rotate: function(el,i) { return paths6[i]('angle')},
    delay: function(el, i) { return (i * 110) + 150; },
    opacity: 0,
    easing: 'linear',
    duration: 1000,
    autoplay: false
});

var coral6Algae3 = anime({
    targets: '.dot22',
    translateX: function(el,i) { return paths6[i]('x')},
    translateY: function(el,i) { return paths6[i]('y')},
    rotate: function(el,i) { return paths6[i]('angle')},
    delay: function(el, i) { return (i * 110) + 300; },
    opacity: 0,
    easing: 'linear',
    duration: 1000,
    autoplay: false
});

var coral7Algae1 = anime({
    targets: '.dot7',
    translateX: function(el,i) { return paths7[i]('x')},
    translateY: function(el,i) { return paths7[i]('y')},
    rotate: function(el,i) { return paths7[i]('angle')},
    delay: function(el, i) { return i * 100; },
    opacity: 0,
    easing: 'linear',
    duration: 1000,
    autoplay: false
});

var coral7Algae2 = anime({
    targets: '.dot15',
    translateX: function(el,i) { return paths7[i]('x')},
    translateY: function(el,i) { return paths7[i]('y')},
    rotate: function(el,i) { return paths7[i]('angle')},
    delay: function(el, i) { return (i * 110) + 150; },
    opacity: 0,
    easing: 'linear',
    duration: 1000,
    autoplay: false
});

var coral7Algae3 = anime({
    targets: '.dot23',
    translateX: function(el,i) { return paths7[i]('x')},
    translateY: function(el,i) { return paths7[i]('y')},
    rotate: function(el,i) { return paths7[i]('angle')},
    delay: function(el, i) { return (i * 110) + 400; },
    opacity: 0,
    easing: 'linear',
    duration: 1000,
    autoplay: false
});

var coral8Algae1 = anime({
    targets: '.dot8',
    translateX: function(el,i) { return paths8[i]('x')},
    translateY: function(el,i) { return paths8[i]('y')},
    rotate: function(el,i) { return paths8[i]('angle')},
    delay: function(el, i) { return i * 100; },
    opacity: 0,
    easing: 'linear',
    duration: 1000,
    autoplay: false
});

var coral8Algae2 = anime({
    targets: '.dot16',
    translateX: function(el,i) { return paths8[i]('x')},
    translateY: function(el,i) { return paths8[i]('y')},
    rotate: function(el,i) { return paths8[i]('angle')},
    delay: function(el, i) { return (i * 110) + 200; },
    opacity: 0,
    easing: 'linear',
    duration: 1000,
    autoplay: false
});

var coral8Algae3 = anime({
    targets: '.dot24',
    translateX: function(el,i) { return paths8[i]('x')},
    translateY: function(el,i) { return paths8[i]('y')},
    rotate: function(el,i) { return paths8[i]('angle')},
    delay: function(el, i) { return (i * 110) + 400; },
    opacity: 0,
    easing: 'linear',
    duration: 1000,
    autoplay: false
});

// FISH ANIMATION

var fishPath1 = anime.path('.fish1path');
var fishPath2 = anime.path('.fish2path');
var fishPath3 = anime.path('.fish3path');

var fish1 = anime({
    targets: '.fish1',
    translateX: fishPath1('x'),
    translateY: fishPath1('y'),
    rotate: fishPath1('angle'),
    easing: 'linear',
    duration: 1000,
    autoplay: false
});

var fish2 = anime({
    targets: '.fish2',
    translateX: fishPath2('x'),
    translateY: fishPath2('y'),
    rotate: fishPath2('angle'),
    easing: 'linear',
    duration: 1000,
    autoplay: false
});

var fish3 = anime({
    targets: '.fish3',
    translateX: fishPath3('x'),
    translateY: fishPath3('y'),
    rotate: fishPath3('angle'),
    easing: 'linear',
    duration: 1000,
    autoplay: false
});

// RAYS ANIMATION
// var rays = anime({
//     targets: '.firstRays',
//     d: ["M1258,629C1258,281.6,976.4,0,629,0S0,281.6,0,629c-0.1,86.1,18.9,174.8,53.1,253.7l354.3-150.3L63.3,906.6c2.1,4.2,2.7,9.1,4.9,13.3l388-198.6L75.7,928.3c4.1,7.6,5.1,9.4,9.5,16.8l225.1-124.9L94.5,960.4c7.8,12.7,11.5,18.5,20.2,30.6l411-285.7l-399.8,301.1c2.2,2.9,3.6,4.8,5.8,7.7l237-180.6L136,1019.6c9.1,11.3,22.1,27.5,31.9,38.2l345.4-317.9l-328.6,335.6c8.3,8.2,16.8,15.1,25.5,22.8l270.2-297.3l-260.7,304.2c5.6,4.8,14.1,13.3,19.8,17.9l196.8-247.4l-193.3,250c6.1,4.7,10.9,8.4,17.3,12.9l239.2-323.9L276.5,1150c4,2.8,3.1,1.7,7.2,4.4l165.5-246.2l-161.4,248.9c3.9,2.5,13.6,9.2,17.5,11.6L473,902.2l-139.7,277.1L539,798l-195.9,391.3c11.5,6.1,13.3,7,25.1,12.3l156.2-336.7l-148.3,340.8c4.3,1.9,8.6,3.7,12.9,5.5l108.4-255.1l-99.8,258.7c2.8,1.1,8.7,3.2,11.5,4.3l120.7-312l-104.8,317c8.8,3.1,17.2,6.7,26.2,9.3l125.9-423l-116,425.7c3.3,0.9,10.7,2.8,14,3.6l66.4-258.1L478.5,1241c6.5,1.6,16,3.1,22.6,4.5l85.5-364.3l-42,371.1c5.5,0.7,11,1.4,16.5,2l33.5-297.6l-29.1,298c5.1,0.5,10.2,1,15.4,1.4L617,829.2L593.5,1257c9.1,0.5,18.3,0.8,27.6,1l8-208.3l8,208.3c9.6-0.1,19.1-0.5,28.6-1l-16.2-343l31.8,341.8c6.1-0.5,12.2-1.1,18.2-1.8l-47.2-444.5l61.8,442.7c10.9-1.5,21.6-3.2,32.3-5.2l-72.6-388.5L752,1246l4-0.8l-44.3-230l53.1,228.2c11.9-2.6,23.6-5.6,35.2-8.8l-95.4-342.1L805,1233c5.1-1.5,10.3-3,15.3-4.7l-138.2-441l147.4,438c3.1-1,6.2-2.1,9.2-3.2L686,784.1l164.6,433.6c7.7-2.9,15.2-5.9,22.8-9.1L739.5,865.9L916,1188.8c2.1-1.1,4.1-2.2,6.2-3.2L715,789.6l212.4,393.3c7.9-4.3,15.7-8.7,23.4-13.3L741.2,813.8l215.7,352.1c13.6-8.3,26.8-17.1,39.7-26.4l-227-319.3l233.6,314.5c9.7-7.2,19.1-14.6,28.4-22.3l-190.9-231l194.3,228.1c2.8-2.3,5.5-4.7,8.2-7L893.4,922.9l162.9,167.6c5.3-4.9,10.4-9.8,15.5-14.9L833.5,833.8l241.9,238.4c3.9-3.9,7.8-7.9,11.6-12l-275.8-261l279.5,256.8c3.9-4.2,7.8-8.5,11.6-12.9L950.7,896.6l170.6,123.9c2.4-3,4.8-6.1,7.2-9.2L766.6,731.8l368.4,270.7c6.6-8.9,12.9-18,19.1-27.3L807,743.8l352.6,223c4.4-7,8.8-14,12.9-21.2L933.2,805.1l241.4,137C1229.4,846.9,1258.2,738.9,1258,629z"],
//     duration: 3000,
//     direction: 'alternate',
//     loop: true,
//     easing: 'linear'
// });

$(window).on('scroll', function () {

    // FADE VIDEO

    let scrollTop = $(this).scrollTop();
    let offset = screenHeight / 2.4;
    let range = 250;
    // for bringing items in
    let calc1 = (scrollTop - offset + range) / range;
    // for fading items away
    let calc2 = 1 - calc1;

    $("#intro-vid").css({"opacity": calc2});

    if (calc2 > '1') {
        $("#intro-vid").css({ 'opacity': 1 });
    } else if ( calc2 < '0' ) {
        $("#intro-vid").css({ 'opacity': 0 });
    } else if (calc2 > '0') {
        // do nothing
    }

    // BLEACHING ANIMATION

    let picFromTop = $('#section-1').height() + $('#section-2').height();

    if (picFromTop > scrollTop) {
        $(".algae").css("visibility", "hidden");
    } else {
        $(".algae").css("visibility", "visible");
    }

    const lightness = 80;

    let calc3 = (scrollTop - picFromTop + 600) / 900;

    // ensure calc3 remains within range
    calc3 = Math.min(Math.max(calc3, 1), 1.25);

    // three lightness options depending on the original lightness of the coral

    const l = lightness * calc3;
    const l2 = l + 4
    const l3 = l + 8

    // coral 8
    $(".st208").css("fill", "hsl(186, 70%, " + l2 + "%" );
    // coral 7 and 6
    $(".st205").css("fill", "hsl(269, 77%, " + l3 + "%" );
    // coral 5 and 1
    $(".st204").css("fill", "hsl(4, 79%, " + l + "%" );
    $(".st195").css("fill", "hsl(4, 79%, " + l + "%" );
    $(".st196").css("fill", "hsl(4, 79%, " + l + "%" );
    // coral 4
    $(".st202").css("fill", "hsl(50, 100%, " + l + "%" );
    // coral 3
    $(".st199").css("fill", "hsl(335, 75%, " + l2 + "%" );
    // coral 2
    $(".st197").css("fill", "hsl(35, 92%, " + l + "%" );

    // TRIGGER ALGAE ANIMATION

    let calc4 = scrollTop - (picFromTop);

    calc4 = Math.min(Math.max(calc4, 0), 600);

    for (var i = 0; i <= 7; i++) {
        let name1 = "coral" + (i + 1) + "Algae1";
        let name2 = "coral" + (i + 1) + "Algae2";
        let name3 = "coral" + (i + 1) + "Algae3";

        eval(name1).seek(eval(name1).duration * (calc4 / 600));
        eval(name2).seek(eval(name2).duration * (calc4 / 600));
        eval(name3).seek(eval(name3).duration * (calc4 / 600));
    }

    // TRIGGER FISH ANIMATION

    let calc5 = Math.min(Math.max(calc4, 0), 800);

    fish1.seek(fish1.duration * (calc4 / 600));
    fish2.seek(fish2.duration * (calc4 / 600));
    fish3.seek(fish3.duration * (calc4 / 600));

    // PAUSE VIDEO 
    // when not in view

    let vid = document.getElementById("intro-vid");
    let introHeight  = $('#section-1').height();

    if (scrollTop > introHeight) {
        vid.pause();
    } else {
        vid.play();
    }

});

// position sticky polyfill

$(document).ready(function() {
    let elements = $('.sticky');
    Stickyfill.add(elements);
});

