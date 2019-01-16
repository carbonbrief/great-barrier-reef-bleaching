const $textSection = $('.text-section');
const $paddingSection = $('.padding-section');
const $map = $('#map');

// SET ELEMENT HEIGHTS

let screenHeight = $(window).height();
$map.css("height", screenHeight);
$paddingSection.css("height", screenHeight*0.65);
$('.padding-section-top').css("height", screenHeight*0.5);

let textHeight = $('#text-container').height();
$("#map-container").css("height", textHeight);

let placeholderHeight = $('#chart-placeholder').height();
$("#chart-container").css("height", (textHeight + placeholderHeight));

let chartFromTop = $('#section-1').height() + $('#section-2').height();
$("#chart-container").css("top", (chartFromTop + 10));

$( document ).ready(function() {

    // scroll to top on window reload
    $(document).scrollTop(0);

    $textSection.each(function(){

        let _this = this;
        let sectionName = $(this).attr('id');
        let graphFunction = "triangle" + sectionName;
        let mapFunction = "map" + sectionName;

        var inViewBottom = new Waypoint({
            element: _this,
            handler: function (direction) {
                if (direction == 'down'){
                    $(this.element).animate({'opacity': 1});
                    window[graphFunction]();
                    window[mapFunction]();
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
                    window[graphFunction]();
                    window[mapFunction]();
                    map.flyTo(locations[sectionName]);
                }
            },
            offset: '15%'
        });

    });

});