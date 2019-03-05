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

var newPoints = [{
    d: "M1179-149c0-347.4-281.6-629-629-629S-79-496.4-79-149c0,88.9,18.5,173.6,51.8,250.3L194,16L-13.2,131.4"
	+ "c2.1,4.2,4.3,8.5,6.5,12.7L131,74L-4.2,148.7c4.1,7.6,8.3,15.1,12.7,22.5L370.2-40.2L17.6,185.6c7.8,12.7,12.2,19.3,20.8,31.4"
	+ "l98.6-67l-95,72c2.2,2.9,7,9.4,9.2,12.3L211,117L58.3,243.3c9.1,11.4,19.8,25,29.7,35.7L296,96L105,296c8.3,8.1,14.3,13.3,23,21"
	+ "L377.2,51.1L142.1,329.8c5.6,4.8,11.2,9.4,17,14L412,27.5L166.2,349.3c6.1,4.7,9.5,7.2,15.8,11.7L433,18L193.4,369.2"
	+ "c4,2.8,6.4,4.1,10.6,6.8L394.9,90.6L209.8,380.1c3.9,2.5,10.8,6.1,14.8,8.5L368,170.5L254,402L431.1,74.6L265,412"
	+ "c11.5,6,15.2,7.5,27.1,12.8L464,44L296.1,426.6c4.3,1.9,8.6,3.7,12.9,5.5L422,170L320.6,436.8c2.8,1.1,3.5,1.4,6.4,2.4L452,124"
	+ "L346.5,446.3c8.8,3.1,13.6,4.6,22.6,7.2L484.3,82.2l-99.1,375.9c3.3,0.9,4.1,1.1,7.4,2L515.6-8.7L403.3,462.7"
	+ "c6.5,1.6,24.2,5.9,30.7,7.3l73.6-366.7l-42,371.1c5.5,0.7,9.2,1.2,14.8,1.8L532,19l-43.6,458c5.1,0.5,8.4,0.8,13.5,1.2L536,81"
	+ "l-19.2,398.1c9.2,0.5,16.1,0.8,25.3,0.9L550,138l18,342c9.6-0.1,11.5-0.5,21-1L566,74l36.3,403.9c6.1-0.5,12.2-1.1,18.2-1.8L593,197"
	+ "l42,277.3c10.9-1.5,14.4-2.3,25-4.3l-48-300l58,299c1.3-0.3,5.6-1.6,7-1.8L601,87l84.7,378.3c11.9-2.6,20.7-5,32.3-8.3l-92.4-342.7"
	+ "L726,455c5.1-1.5,10.3-3,15.3-4.7L684,260l66.5,187.4c3.1-1,6.2-2.1,9.2-3.2L677,198l94.6,241.8c7.7-2.9,15.2-5.9,22.8-9.1"
	+ "L660.5,87.9L814,423c2.1-1.1,27.1-14.3,29.2-15.4L680,93l170,311c7.9-4.3,12.3-6.4,20-11L642,3l235.8,384.9"
	+ "c13.6-8.3,19.3-11.6,32.2-20.9L690.6,42.1L928,355c9.7-7.2,15.3-13,24.5-20.7l-190.9-231l194.3,228.1c2.8-2.3,8.4-7.1,11.1-9.5"
	+ "L707.1,28.2l270.2,284.3c5.2-4.9,10.4-9.8,15.5-14.9L754.5,55.8l241.9,238.4c3.9-3.9,7.8-7.9,11.6-12L732.2,21.3L1010,280"
	+ "c3.9-4.2,13.7-16.9,17.6-21.3L932,170l105.4,78.2c2.4-3,9.6-11.7,12-14.8L687.6-46.2l368.5,270.7c6.6-8.9,12.9-18,19.1-27.3"
	+ "L728-34.2l350.9,225.9c4.4-7,10.5-16.9,14.7-24.1L843,22l257,134C1153,63.8,1179-35,1179-149z"
}];

var oldPoints = [{
    d: "M1179-149c0-347.39-281.61-629-629-629S-79-496.39-79-149c0,88.95,18.47,173.58,51.77,250.28l486.3-208.42"
    + "L-13.16,131.42c2.12,4.25,4.31,8.46,6.53,12.66L315.94-24.48L-4.17,148.69c4.09,7.58,8.32,15.08,12.7,22.47L370.19-40.25"
    + "L13.75,179.82c7.8,12.69,16.01,25.09,24.66,37.17L396.53-36.66L44.66,225.54c2.17,2.93,4.36,5.84,6.58,8.73L332.78,21.61"
    + "L58.35,243.32c9.06,11.35,18.51,22.37,28.32,33.06L391.63,3.64L108.41,298.9c8.27,8.15,16.76,16.07,25.47,23.75L377.21,51.06"
    + "L142.15,329.81c5.59,4.76,11.25,9.44,17,14.01L411.96,27.49L166.19,349.32c6.13,4.73,12.35,9.34,18.66,13.85l189.33-261.21"
    + "L193.45,369.23c4.04,2.79,8.13,5.53,12.24,8.22l189.2-286.81l-185.06,289.5c3.87,2.5,7.77,4.96,11.71,7.38l146.44-217.06"
    + "L265.66,380.3L431.11,74.56L257.06,407.74c11.48,6.05,23.17,11.75,35.05,17.1L416.08,151.8L296.12,426.63"
    + "c4.28,1.89,8.58,3.73,12.91,5.53L455.59,86.05L320.61,436.82c2.84,1.11,5.69,2.19,8.54,3.27L484.39,34.27L342.47,444.91"
    + "c8.78,3.07,17.65,5.96,26.61,8.64L484.27,82.24L385.2,458.15c3.32,0.9,6.66,1.77,10,2.61l93.55-363.85l-88.21,365.17"
    + "c6.48,1.58,13,3.08,19.56,4.46l87.52-363.25l-41.97,371.07c5.48,0.73,10.98,1.39,16.51,1.98l33.48-297.57L486.52,476.8"
    + "c5.11,0.51,10.24,0.97,15.39,1.36l36.19-426.9l-23.58,427.72c9.15,0.51,18.35,0.83,27.6,0.95l7.97-208.26l7.97,208.27"
    + "c9.58-0.12,19.11-0.47,28.59-1.01l-16.14-342.93l31.75,341.84c6.1-0.5,12.18-1.1,18.23-1.77L573.27,31.63l61.69,442.65"
    + "c10.86-1.47,21.63-3.21,32.3-5.21L594.7,80.56l78.25,387.4c1.35-0.27,2.7-0.52,4.04-0.79l-44.32-230.03l53.07,228.16"
    + "c11.88-2.61,23.63-5.56,35.24-8.83l-95.4-342.14l100.4,340.7c5.14-1.49,10.26-3.05,15.34-4.67L603.07,9.33l147.38,438.02"
    + "c3.1-1.04,6.18-2.12,9.25-3.2L607.05,6.19l164.58,433.62c7.65-2.88,15.24-5.9,22.75-9.06L660.48,87.93l176.53,322.91"
    + "c2.07-1.06,4.12-2.16,6.18-3.25L635.93,11.6l212.4,393.27c7.92-4.28,15.73-8.74,23.44-13.34L662.16,35.82l215.66,352.06"
    + "c13.59-8.32,26.85-17.13,39.74-26.42L690.59,42.13l233.55,314.51c9.67-7.17,19.13-14.62,28.36-22.32L761.57,103.36L955.87,331.5"
    + "c2.75-2.32,5.49-4.66,8.2-7.03L814.41,144.91l162.94,167.6c5.25-4.86,10.42-9.82,15.5-14.86L754.48,55.77l241.87,238.36"
    + "c3.91-3.94,7.79-7.92,11.6-11.97L732.25,21.26l279.5,256.84c3.93-4.25,7.81-8.55,11.63-12.91L871.66,118.64l170.61,123.93"
    + "c2.42-3.03,4.8-6.1,7.16-9.18L687.62-46.16l368.45,270.74c6.59-8.92,12.95-18.02,19.08-27.29L728.01-34.16l352.63,223"
    + "c4.45-6.97,8.74-14.04,12.92-21.2L854.24,27.12l241.36,137C1148.64,71.92,1179-34.99,1179-149z"
}];

// var rays = anime({
//     targets: '.firstRays',
//     d: {
//         value: newPoints.d,
//         duration: 500
//     },
//     easing: 'linear',
//     looping: true
// });

var rays = anime({
    targets: '.firstRays',
    d: ["M1258,629C1258,281.6,976.4,0,629,0S0,281.6,0,629c-0.1,86.1,18.9,174.8,53.1,253.7l354.3-150.3L63.3,906.6c2.1,4.2,2.7,9.1,4.9,13.3l388-198.6L75.7,928.3c4.1,7.6,5.1,9.4,9.5,16.8l225.1-124.9L94.5,960.4c7.8,12.7,11.5,18.5,20.2,30.6l411-285.7l-399.8,301.1c2.2,2.9,3.6,4.8,5.8,7.7l237-180.6L136,1019.6c9.1,11.3,22.1,27.5,31.9,38.2l345.4-317.9l-328.6,335.6c8.3,8.2,16.8,15.1,25.5,22.8l270.2-297.3l-260.7,304.2c5.6,4.8,14.1,13.3,19.8,17.9l196.8-247.4l-193.3,250c6.1,4.7,10.9,8.4,17.3,12.9l239.2-323.9L276.5,1150c4,2.8,3.1,1.7,7.2,4.4l165.5-246.2l-161.4,248.9c3.9,2.5,13.6,9.2,17.5,11.6L473,902.2l-139.7,277.1L539,798l-195.9,391.3c11.5,6.1,13.3,7,25.1,12.3l156.2-336.7l-148.3,340.8c4.3,1.9,8.6,3.7,12.9,5.5l108.4-255.1l-99.8,258.7c2.8,1.1,8.7,3.2,11.5,4.3l120.7-312l-104.8,317c8.8,3.1,17.2,6.7,26.2,9.3l125.9-423l-116,425.7c3.3,0.9,10.7,2.8,14,3.6l66.4-258.1L478.5,1241c6.5,1.6,16,3.1,22.6,4.5l85.5-364.3l-42,371.1c5.5,0.7,11,1.4,16.5,2l33.5-297.6l-29.1,298c5.1,0.5,10.2,1,15.4,1.4L617,829.2L593.5,1257c9.1,0.5,18.3,0.8,27.6,1l8-208.3l8,208.3c9.6-0.1,19.1-0.5,28.6-1l-16.2-343l31.8,341.8c6.1-0.5,12.2-1.1,18.2-1.8l-47.2-444.5l61.8,442.7c10.9-1.5,21.6-3.2,32.3-5.2l-72.6-388.5L752,1246l4-0.8l-44.3-230l53.1,228.2c11.9-2.6,23.6-5.6,35.2-8.8l-95.4-342.1L805,1233c5.1-1.5,10.3-3,15.3-4.7l-138.2-441l147.4,438c3.1-1,6.2-2.1,9.2-3.2L686,784.1l164.6,433.6c7.7-2.9,15.2-5.9,22.8-9.1L739.5,865.9L916,1188.8c2.1-1.1,4.1-2.2,6.2-3.2L715,789.6l212.4,393.3c7.9-4.3,15.7-8.7,23.4-13.3L741.2,813.8l215.7,352.1c13.6-8.3,26.8-17.1,39.7-26.4l-227-319.3l233.6,314.5c9.7-7.2,19.1-14.6,28.4-22.3l-190.9-231l194.3,228.1c2.8-2.3,5.5-4.7,8.2-7L893.4,922.9l162.9,167.6c5.3-4.9,10.4-9.8,15.5-14.9L833.5,833.8l241.9,238.4c3.9-3.9,7.8-7.9,11.6-12l-275.8-261l279.5,256.8c3.9-4.2,7.8-8.5,11.6-12.9L950.7,896.6l170.6,123.9c2.4-3,4.8-6.1,7.2-9.2L766.6,731.8l368.4,270.7c6.6-8.9,12.9-18,19.1-27.3L807,743.8l352.6,223c4.4-7,8.8-14,12.9-21.2L933.2,805.1l241.4,137C1229.4,846.9,1258.2,738.9,1258,629z"],
    duration: 3000,
    direction: 'alternate',
    loop: true,
    easing: 'linear'
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

// position sticky polyfill

$(document).ready(function() {
    let elements = $('.sticky');
    Stickyfill.add(elements);
});

