const $section1 = $('#section-1');
const $section2 = $('#section-2');
const $section3 = $('#section-3');
const $section4 = $('#section-4');
const $textSection = $('.text-section');
const $paddingSection = $('.padding-section');
const $map = $('#map');

let screenHeight = $(window).height();

// set map height to screenHeight

$map.css("height", screenHeight);
$paddingSection.css("height", screenHeight*0.65);

// calc where chart container should go here too

$( document ).ready(function() {

    $textSection.each(function(){

        let _this = this;
        let sectionName = $(this).attr('id');
        let functionName = "triangle" + sectionName;

        var inViewBottom = new Waypoint({
            element: _this,
            handler: function (direction) {
                if (direction == 'down'){
                    $(this.element).animate({'opacity': 1});
                    window[functionName]();
                    map.flyTo(locations[sectionName]);
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
                    window[functionName]();
                    map.flyTo(locations[sectionName]);
                }
            },
            offset: '15%'
        });

    });

});