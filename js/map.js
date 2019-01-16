if (!mapboxgl.supported()) {
    // do something
} else {
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
        center: [145, -19],
        zoom: 3.3
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
        id: 'world-heritage-site',
        type: 'line',
        source: "world-heritage",
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": "#333333",
            "line-width": 1
        }
    });

    map.addSource("gbr-features", {
        "type": 'geojson',
        "buffer": 10,
        "tolerance": 0.5,
        data: './data/GBR-features.json'
    });
    
    map.addLayer({
        'id': 'features',
        'type': 'fill',
        "source": "gbr-features",
        'layout': {},
        'paint': {
            'fill-color': '#333333',
            'fill-opacity': 0.8
        }

    });

    map.addSource("bleaching", {
        "type": 'geojson',
        data: './data/1998.geojson'
    });

    map.addLayer({
        'id': 'mass-bleaching',
        'type': 'circle',
        'source': "bleaching",
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

    // ensure that this layer is not visible to begin with
    map.setLayoutProperty('mass-bleaching', 'visibility', 'none');
    
    // create popup but don't add to map yet

    popup = new mapboxgl.Popup({closeButton: false})
    .setLngLat([145, -19])
    .setHTML('<h3>World Heritage Area</h3>')

});

// scroll actions

function mapIntro () {

    popup.addTo(map);

    map.setPaintProperty('world-heritage-site', 'line-opacity', 1);
    map.setLayoutProperty('mass-bleaching', 'visibility', 'none');    

}

function map1998 () {

    popup.remove();

    map.setPaintProperty('world-heritage-site', 'line-opacity', 0.4);
    map.setLayoutProperty('mass-bleaching', 'visibility', 'visible');
    map.getSource('bleaching').setData('./data/1998.geojson');
}

function map2002 () {
    map.setPaintProperty('world-heritage-site', 'line-opacity', 0.4);
    map.setLayoutProperty('mass-bleaching', 'visibility', 'visible');
    map.getSource('bleaching').setData('./data/2002.geojson');
}

function map2016 () {
    map.setPaintProperty('world-heritage-site', 'line-opacity', 0.4);
    map.setLayoutProperty('mass-bleaching', 'visibility', 'visible');
    map.getSource('bleaching').setData('./data/2016.geojson');
}

function map2016second () {
    map.setPaintProperty('world-heritage-site', 'line-opacity', 0.4);
    map.setLayoutProperty('mass-bleaching', 'visibility', 'visible');
    map.getSource('bleaching').setData('./data/2016.geojson');
}

function map2017 () {
    map.setPaintProperty('world-heritage-site', 'line-opacity', 0.4);
    map.setLayoutProperty('mass-bleaching', 'visibility', 'visible');
    map.getSource('bleaching').setData('./data/2017.geojson');
}

// create list of locations to fly to

var locations = {
    'Intro': {
        bearing: 0,
        center: [145, -19],
        zoom: 3.3,
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