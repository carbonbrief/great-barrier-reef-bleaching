const $section1 = $('#section-1');
const $section2 = $('#section-2');
const $section3 = $('#section-3');
const $textSection = $('.text-section');
const $map = $('#map');

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
            offset: '60%'
        });

    });

    $section1.waypoint(function(direction){
        $map.css("background-image", "url('/img/Test-map-1.png')");
        trianglePos1();

        if (direction == 'down'){
            // placeholder for when want to use
        } else {
            //
        }

    }, {offset: '40%'});

    $section2.waypoint(function(){

            $map.css("background-image", "url('/img/Test-map-2.png')");
            trianglePos2();

    }, {offset: '40%'});

    $section3.waypoint(function(direction){

            $map.css("background-image", "url('/img/Test-map-1.png')");
            trianglePos3();
            
    }, {offset: '40%'});

});