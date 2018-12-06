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

    // $textSection.waypoint(function(direction){
    //     if (direction == 'down'){
    //         $textSection.fadeTo(1000, 1);
    //     } else {
    //         $textSection.fadeTo(1000, 0.2);
    //     }
    // }, {offset: '55%'});

    $section2.waypoint(function(direction){
        if (direction == 'down'){
            $map.css("background-image", "url('/img/Test-map-2.png')");
        } else {
            $map.css("background-image", "url('/img/Test-map-1.png')");
        }
    }, {offset: '50%'});

});