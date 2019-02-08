const $textSection = $('.text-section');
const $paddingSection = $('.padding-section');
const $map = $('#map');

// SET ELEMENT HEIGHTS
let screenHeight = $(window).height();
// let screenWidth = $(window).width();

function setHeights () {

    // get new height
    screenHeight = $(window).height();

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

window.addEventListener("resize", function(){
    setHeights();
}, true);

$(document).ready(function() {

    // scroll to top on window reload
    $(document).scrollTop(0);

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

        // BLEACHING ANIMATION

        // var bleachAnimationDown = new Waypoint({
        //     element: document.getElementById("section-3"),
        //     handler: function (direction) {
        //         if (direction == 'down'){
        //             $(this.element).animate({'opacity': 0.2});
        //         } else {
        //             // do nothing
        //         }
        //     },
        //     offset: "90%"
        // });

        // var bleachAnimationUp = new Waypoint({
        //     element: document.getElementById("section-3"),
        //     handler: function (direction) {
        //         if (direction == 'up'){
        //             $(this.element).animate({'opacity': 0.2});
        //         } else {
        //             // do nothing
        //         }
        //     },
        //     offset: "25%"
        // });

    });

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

    calc3 = Math.min(Math.max(calc3, 1), 1.3);

    const l = lightness * calc3;

    $(".coral2").css("fill", "hsl(4, 79%, " + l + "%" );

    console.log(calc3);

    // pause video when not in view
    let vid = document.getElementById("intro-vid");
    let introHeight  = $('#section-1').height();

    if (scrollTop > introHeight) {
        vid.pause();
    } else {
        vid.play();
    }

});