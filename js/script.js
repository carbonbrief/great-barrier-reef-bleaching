const $section1 = $('#section-1');
const $section2 = $('#section-2');
const $section3 = $('#section-3');
const $map = $('#map');

$section2.waypoint(function(direction){
  if (direction == 'down'){
    $map.css("background-image", "url('/img/Test-map-2.png')");
  } else {
    $map.css("background-image", "url('/img/Test-map-1.png')");
  }
}, {offset: '50%'});