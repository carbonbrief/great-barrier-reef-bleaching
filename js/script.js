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

        $bleach.css("height", (screenHeight - 60));
        bleachHeight = $bleach.height();

        $bleach.css("width", (bleachHeight * 1.5714));
        bleachWidth = $bleach.width();
        
    } else {

        $bleach.css("width", (screenWidth - 60));
        bleachWidth = $bleach.width();
    
        $bleach.css("height", (bleachWidth * 0.6363));
        bleachHeight = $bleach.height();

    }

    let bleachMargin = (screenHeight - bleachHeight)/2;
    $bleach.css("margin-top", bleachMargin);
    $bleach.css("top", bleachMargin);
    $bleach.css("margin-bottom", bleachMargin);

    $(".bleaching-wrapper").css("height", screenHeight + 800);
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
for (i = 0; i < 16; i++) {
    $(".bleaching").append("<div class='algae dot" + (i + 1) + "'></div>");
    $(".bleaching").append("<div class='algae dot" + (i + 1) + "'></div>");
    $(".bleaching").append("<div class='algae dot" + (i + 1) + "'></div>");
}

// colour algae for coral 1 and coral 5
$(".dot1, .dot9, .dot5, .dot13").css("background-color", "#f4a7a2");
// coral 2
$(".dot2, .dot10").css("background-color", "#fac883");
// coral 3
$(".dot3, .dot11").css("background-color", "#f4b3ce");
// coral 4
$(".dot4, .dot12").css("background-color", "#ffefa2");
// coral 6 and 7
$(".dot6, .dot14, dot.7, .dot15").css("background-color", "#dbc1f7");
// coral 8
$(".dot8, .dot16").css("background-color", "#c1eff4");

// var pathsCoral8 = [];
// var pathsCoral7 = [];

// var paths = function (){
//     for (var i = 0; i <= 3; ++i) {
//         pathsCoral8[i] = anime.path(".path" + i);
//         pathsCoral7[i] = anime.path(".path" + i);
//     }
//     return [pathsCoral8, pathsCoral7];
// }

// console.log(paths);

var paths = [];

function createPathVariables (){
    for (var i = 0; i <= 3; ++i) {
        paths[i] = anime.path(".path" + i);
    }
    return paths;
}

createPathVariables();

// let path = anime.path(".path");

var firstAlgae = anime({
    targets: '.dot8',
    translateX: function(el,i) { return paths[i]('x')},
    translateY: function(el,i) { return paths[i]('y')},
    rotate: function(el,i) { return paths[i]('angle')},
    delay: function(el, i) { return i * 100; },
    opacity: 0,
    easing: 'linear',
    duration: 1000,
    autoplay: false
});

var secondAlgae = anime({
    targets: '.dot16',
    translateX: function(el,i) { return paths[i]('x')},
    translateY: function(el,i) { return paths[i]('y')},
    rotate: function(el,i) { return paths[i]('angle')},
    delay: function(el, i) { return (i * 105) + 60; },
    opacity: 0,
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

    const lightness = 80;

    let calc3 = (scrollTop - picFromTop + 600) / 900;

    // ensure calc3 remains within range
    calc3 = Math.min(Math.max(calc3, 1), 1.25);

    // three lightness options depending on the original lightness of the coral

    const l = lightness * calc3;
    const l2 = l + 5
    const l3 = l + 10

    // coral 8
    $(".st206").css("fill", "hsl(186, 70%, " + l2 + "%" );
    // coral 7 and 6
    $(".st205").css("fill", "hsl(269, 77%, " + l3 + "%" );
    // coral 5 and 1
    $(".st204").css("fill", "hsl(4, 79%, " + l + "%" );
    $(".st196").css("fill", "hsl(4, 79%, " + l + "%" );
    $(".st195").css("fill", "hsl(4, 79%, " + l + "%" );
    // coral 4
    $(".st203").css("fill", "hsl(50, 100%, " + l + "%" );
    // coral 3
    $(".st200").css("fill", "hsl(335, 75%, " + l2 + "%" );
    // coral 2
    $(".st198").css("fill", "hsl(35, 92%, " + l + "%" );

    // TRIGGER ALGAE ANIMATION

    let calc4 = scrollTop - (picFromTop);

    calc4 = Math.min(Math.max(calc4, 0), 600);
    
    firstAlgae.seek(firstAlgae.duration * (calc4 / 600));
    secondAlgae.seek(firstAlgae.duration * (calc4 / 600));

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