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

    map.addSource("world-heritage", {
        "type": 'geojson',
        "buffer": 10,
        "tolerance": 0.5, // default is 0.375
        data: './data/GBR-world-heritage.json'
    });

    map.addLayer({
        id: 'world-heritage-simple',
        type: 'line',
        source: "world-heritage",
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": "#FF6F61",
            "line-width": 2
        }
    });

    map.addLayer({
        'id': '1998',
        'type': 'circle',
        'source': {
            type: 'geojson',
            data: './data/1998.geojson'
        },
        'paint': {
            'circle-radius': {
                'base': 1.75,
                'stops': [[1, 4], [8, 10]]
            },
            'circle-color': [
                'match',
                ['get', 'Bleach'],
                0, "rgba(198, 231, 250, 0.6)", // hex #c6e7fa
                1, 'rgba(255, 229, 100, 0.6)', // #FFE564
                2, 'rgba(255, 189, 99, 0.7)', // #FFBD63
                3, 'rgba(255, 150, 98, 0.8)', // FF9662
                /* other */ 'rgba(255, 111, 97, 0.9)' // #FF6F61
            ]
        }
    });

});

// create list of locations to fly to

var locations = {
    'Intro': {
        bearing: 0,
        center: [145, -19],
        zoom: 3.2,
        pitch: 0,
        speed: 0.5
    },
    '1998': {
        bearing: 0,
        center: [147.60, -18.24],
        zoom: 4.6,
        pitch: 0,
        speed: 0.5
    },
    '2002': {
        bearing: 0,
        center: [147.60, -18.24],
        zoom: 4.6,
        pitch: 0,
        speed: 0.5
    },
    '2016': {
        bearing: 0,
        center: [147.60, -18.24],
        zoom: 4.6,
        pitch: 0,
        speed: 0.5
    },
    '2016second': {
        bearing: 0,
        center: [143, -17.7],
        zoom: 5.2,
        pitch: 0.2,
        speed: 0.5
    },
    '2017': {
        bearing: 0,
        center: [147.60, -18.24],
        zoom: 4.6,
        pitch: 0,
        speed: 0.5
    },

}