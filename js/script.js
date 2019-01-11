const $section1 = $('#section-1');
const $section2 = $('#section-2');
const $section3 = $('#section-3');
const $section4 = $('#section-4');
const $textSection = $('.text-section');
const $map = $('#map');

let screenHeight = $(window).height();

// set map height to screenHeight

$map.css("height", screenHeight);

// calc where chart container should go here too

$( document ).ready(function() {

    $textSection.each(function(){
        var _this = this;
        var inview = new Waypoint({
            element: _this,
            handler: function (direction) {
                if (direction == 'down'){
                    $(this.element).animate({'opacity': 1})
                } else {
                    $(this.element).animate({'opacity': 0.2})
                }
            },
            offset: '55%'
        });

        var sectionName = $(this).attr('id');

        var moveMap = new Waypoint({
            element: _this,
            handler: function() {
                map.flyTo(locations[sectionName]);
            },
            offset: '55%'

        });

    });

    // $textSection.each(function(){
    //     var _this = this;
    //     var inview = new Waypoint({
    //         element: _this,
    //         handler: function (direction) {
    //             if (direction == 'down'){
    //                 $(this.element).animate({'opacity': 0.2})
    //             } else {
    //                 $(this.element).animate({'opacity': 1})
    //             }
    //         },
    //         offset: '20%'
    //     });

    // });

    // $textSection.waypoint(function(direction) {
    //         if (direction === 'down') {
    //         $(this).addClass("waypoint-focus");
    //         $(this).prev().removeClass("waypoint-focus");
    //         }
    // }, {
    //         offset: '50%'
    // });
    
    // $textSection.waypoint(function(direction) {
    //         if (direction === 'up') {
    //         $(this).addClass("waypoint-here");
    //         $(this).next().removeClass("waypoint-focus");
    //         }
    // }, {
    //         offset: '10%'
    // });	

    $section1.waypoint(function(direction){
        $map.css("background-image", "url('/img/Test-map-1.png')");
        trianglePos1();

        if (direction == 'down'){
            // placeholder for when want to use
        } else {
            //
        }

    }, {offset: '55%'});

    $section2.waypoint(function(){

            $map.css("background-image", "url('/img/Test-map-2.png')");
            trianglePos2();

    }, {offset: '55%'});

    $section3.waypoint(function(direction){

            $map.css("background-image", "url('/img/Test-map-1.png')");
            trianglePos3();
            
    }, {offset: '55%'});

    $section4.waypoint(function(direction){

        $map.css("background-image", "url('/img/Test-map-2.png')");
        trianglePos3();
        
    }, {offset: '55%'});

});