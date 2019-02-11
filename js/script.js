const $textSection = $('.text-section');
const $paddingSection = $('.padding-section');
const $map = $('#map');

// SET ELEMENT HEIGHTS
let screenHeight = $(window).height();
// let screenWidth = $(window).width();

function setHeights () {

    // get new height
    screenHeight = $(window).height();

    let bleachingMargin = (screenHeight - $('.bleaching').height())/2;
    console.log(bleachingMargin);
    $(".bleaching").css("margin-top", bleachingMargin);
    $(".bleaching").css("top", bleachingMargin);
    $(".bleaching").css("margin-bottom", bleachingMargin);

    $(".bleaching-wrapper").css("height", screenHeight + 400);

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

    // ANIMATE ALGAE
    // ensure that runs after anime.js has loaded

    
    // Use for loop to create variables for paths
    // var paths = [];

    // function createPathVariables(){
    //     for (var i = 0; i <= 3; ++i) {
    //         paths[i] = anime.path(".path" + i);
    //     }
    //     return paths;
    // }

    // createPathVariables();


    // var bleachAnimation1 = new Waypoint({
    //     element: document.getElementById('section-3'),
    //     handler: function (direction) {
    //         if (direction == 'down'){
    //             // ensure that opacity reset to 1 before animation
    //             $(".dot1").css("opacity", "1");
    //             firstAlgaeOut();
    //             $(".dot1").css("visibility", "visible");
    //         } else {

    //         }
    //     },
    //     offset: '20%'
    // });

    // var bleachAnimation2 = new Waypoint({
    //     element: document.getElementById('section-3'),
    //     handler: function (direction) {
    //         if (direction == 'down'){
    //             $(".dot2").css("opacity", "1");
    //             secondAlgaeOut();
    //             $(".dot2").css("visibility", "visible");
    //         } else {

    //         }
    //     },
    //     offset: '60%'
    // });

    // function firstAlgaeOut () { 
    //     anime({
    //     targets: '.dot1',
    //     translateX: paths[0]('x'),
    //     translateY: paths[0]('y'),
    //     rotate: paths[0]('angle'),
    //     opacity: 0,
    //     easing: 'easeInSine',
    //     duration: 3000,
    //     loop: false
    //     })
    // };

    // function secondAlgaeOut () {anime({
    //     targets: '.dot2',
    //     translateX: paths[1]('x'),
    //     translateY: paths[1]('y'),
    //     rotate: paths[1]('angle'),
    //     opacity: 0,
    //     easing: 'easeInSine',
    //     duration: 3000,
    //     loop: false
    // })};

});

// ALGAE ANIMATION
// set up animation to be triggered in scroll event

let path = anime.path(".path");

var firstAlgae = anime({
    targets: '.dot',
    translateX: path('x'),
    translateY: path('y'),
    rotate: path('angle'),
    delay: function(el, i) { return i * 100; },
    opacity: 0,
    easing: 'easeInSine',
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

    let calc3 = (scrollTop - picFromTop * 0.9 + screenHeight) / screenHeight;

    // ensure calc3 remains within range
    calc3 = Math.min(Math.max(calc3, 1), 1.25);

    const l = lightness * calc3;

    $(".st2").css("fill", "hsl(4, 79%, " + l + "%" );

    // TRIGGER ALGAE ANIMATION

    let calc4 = scrollTop - (picFromTop * 0.9);

    calc4 = Math.min(Math.max(calc4, 0), 400);

    //console.log(calc4);

    
    firstAlgae.seek(firstAlgae.duration * (calc4 / 100));

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