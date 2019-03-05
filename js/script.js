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
var rays = anime({
    targets: '.firstRays',
    points: [{value: ["1163.5,599.5 599.5,34.5 34.5,598.5 34.5,608.5 366.5,604.5 34.5,618.5 34.5,622.5 271.5,615.5 35.5,633.5 36.5,642.5 320.5,622.5 37.5,652.5 39.5,672.5 335.5,635.5 40.5,682.5 41.5,687.5 394.5,634.5 44.5,706.5 45.5,711.5 304.5,660.5 47.5,720.5 53.5,744.5 266.5,690.5 56.5,754.5 64.5,777.5 381.5,673.5 66.5,786.5 71.5,800.5 387.5,681.5 75.5,810.5 79.5,818.5 458.5,659.5 82.5,828.5 87.5,837.5 343.5,720.5 91.5,845.5 96.5,854.5 339.5,739.5 105.5,872.5 112.5,885.5 500.5,657.5 117.5,893.5 120.5,897.5 312.5,784.5 130.5,914.5 139.5,926.5 281.5,832.5 150.5,942.5 159.5,953.5 444.5,725.5 166.5,961.5 169.5,965.5 406.5,765.5 176.5,972.5 179.5,976.5 440.5,746.5 192.5,990.5 202.5,1001.5 415.5,788.5 210.5,1007.5 216.5,1014.5 521.5,688.5 224.5,1021.5 235.5,1031.5 425.5,808.5 243.5,1036.5 251.5,1043.5 345.5,928.5 258.5,1049.5 270.5,1058.5 453.5,805.5 278.5,1064.5 287.5,1069.5 512.5,733.5 303.5,1080.5 320.5,1090.5 447.5,872.5 329.5,1095.5 333.5,1097.5 472.5,841.5 342.5,1101.5 355.5,1108.5 446.5,926.5 364.5,1112.5 515.5,785.5 373.5,1116.5 387.5,1122.5 503.5,853.5 414.5,1132.5 433.5,1138.5 491.5,958.5 443.5,1141.5 452.5,1144.5 499.5,980.5 461.5,1146.5 476.5,1150.5 555.5,801.5 486.5,1151.5 499.5,1154.5 551.5,897.5 519.5,1158.5 539.5,1160.5 571.5,883.5 549.5,1162.5 568.5,1163.5 591.5,762.5 578.5,1163.5 598.5,1163.5 600.5,814.5 608.5,1163.5 618.5,1163.5 616.5,1014.5 628.5,1162.5 653.5,1161.5 634.5,943.5 662.5,1160.5 682.5,1157.5 611.5,689.5 701.5,1154.5 715.5,1151.5 650.5,833.5 725.5,1149.5 735.5,1146.5 695.5,976.5 744.5,1144.5 758.5,1140.5 685.5,885.5 768.5,1137.5 773.5,1136.5 643.5,733.5 782.5,1132.5 796.5,1127.5 719.5,906.5 814.5,1120.5 832.5,1113.5 737.5,897.5 841.5,1109.5 846.5,1106.5 689.5,778.5 863.5,1097.5 876.5,1091.5 754.5,868.5 884.5,1085.5 906.5,1072.5 733.5,799.5 922.5,1061.5 930.5,1055.5 843.5,930.5 938.5,1050.5 953.5,1038.5 680.5,699.5 961.5,1031.5 965.5,1028.5 779.5,807.5 973.5,1022.5 990.5,1005.5 853.5,858.5 997.5,998.5 1008.5,988.5 864.5,843.5 1020.5,972.5 1037.5,955.5 891.5,832.5 1043.5,946.5 1049.5,939.5 802.5,749.5 1054.5,930.5 1063.5,919.5 751.5,702.5 1069.5,910.5 1077.5,898.5 872.5,764.5 1087.5,881.5 1096.5,864.5 888.5,750.5 1101.5,855.5 1108.5,842.5 932.5,755.5 1113.5,833.5 1122.5,810.5 752.5,660.5 1126.5,801.5 1128.5,797.5 793.5,670.5 1130.5,787.5 1138.5,764.5 883.5,681.5 1144.5,744.5 1146.5,736.5 878.5,666.5 1148.5,726.5 1151.5,711.5 971.5,671.5 1153.5,702.5 1157.5,678.5 866.5,634.5 1159.5,668.5 1161.5,648.5 961.5,626.5 1162.5,629.5 "]}],
    duration: 2000,
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

