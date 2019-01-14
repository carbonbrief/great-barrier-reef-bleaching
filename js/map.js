if (!mapboxgl.supported()) {
    // do something
} else {
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
        center: [147.60, -18.24],
        zoom: 3.2
    });
}

map.scrollZoom.disable();

map.on('load', function () {

    map.addLayer({

        id: 'world-heritage-simple',
        type: 'line',
        source: {
            type: 'geojson',
            data: './data/GBR-world-heritage.json'
        },
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": "#FF6F61",
            "line-width": 2
        }

    });

});

// create list of locations to fly to

var locations = {
    '1998': {
        bearing: 0,
        center: [147.60, -18.24],
        zoom: 3.2,
        pitch: 0,
        speed: 0.5
    },
    '2002': {
        bearing: 0,
        center: [147.60, -18.24],
        zoom: 4,
        pitch: 0,
        speed: 0.5
    },
    '2016': {
        bearing: 0,
        center: [140, -18],
        zoom: 4,
        pitch: 0,
        speed: 0.5
    },
    '2016-2': {
        bearing: 0,
        center: [140, -17.8],
        zoom: 4.5,
        pitch: 0.2,
        speed: 0.5
    },
    '2017': {
        bearing: 0,
        center: [140, -18],
        zoom: 4,
        pitch: 0,
        speed: 0.5
    },

}