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