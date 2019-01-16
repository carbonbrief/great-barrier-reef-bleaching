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

    map.addLayer({
        'id': 'satellite',
        'type': 'raster',
        'source': {
            'type': 'raster',
            'tiles': [
                'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            ],
            'tileSize': 256,
            'attribution': 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.'
        },
        'paint': {}
    });

    // add the satellite layer but hide it for now
    map.setLayoutProperty('satellite', 'visibility', 'none');

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
            "line-width": 1,
            "line-opacity": 0
        }
    });

    map.addSource("gbr-features", {
        "type": 'geojson',
        "buffer": 10,
        "tolerance": 0.5,
        data: './data/GBR-features.json'
    });
    
    map.addLayer({
        'id': 'gbr-features',
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
    .setLngLat([143.8, -10.5])
    .setHTML('<h3>Great Barrier Reef World Heritage Area</h3>');

});

// scroll actions

function updateMap (sectionName) {

    // popup
    if (sectionName == "Intro2") {
        popup.addTo(map);
    } else {
        popup.remove();
    };

    // world heritage
    if (sectionName == "Intro1") {
        map.setPaintProperty('world-heritage-site', 'line-opacity', 0);
    } else if (sectionName == "Intro2") {
        map.setPaintProperty('world-heritage-site', 'line-opacity', 1);
    } else {
        map.setPaintProperty('world-heritage-site', 'line-opacity', 0.4);
    };

    // bleaching circles and key visibility
    if (sectionName == "Intro1" || sectionName == "Intro2") {
        map.setLayoutProperty('mass-bleaching', 'visibility', 'none');
        $("#map-key").css("visibility", "hidden"); 
    } else {
        map.setLayoutProperty('mass-bleaching', 'visibility', 'visible');
        $("#map-key").css("visibility", "visible"); 
    };

    // bleaching data
    if (sectionName == "1998") {
        map.getSource('bleaching').setData('./data/1998.geojson');
    } else if (sectionName == "2002") {
        map.getSource('bleaching').setData('./data/2002.geojson');
    } else if (sectionName == "2016" || sectionName == "2016second") {
        map.getSource('bleaching').setData('./data/2016.geojson');
    } else if (sectionName == "2017") {
        map.getSource('bleaching').setData('./data/2017.geojson');
    } else {
        // do nothing for intros
    };

    // satellite imagery and GBR features visibility
    if (sectionName == "2016second") {
        map.setLayoutProperty('satellite', 'visibility', 'visible');
        map.setLayoutProperty('gbr-features', 'visibility', 'none');
    } else {
        map.setLayoutProperty('satellite', 'visibility', 'none');
        map.setLayoutProperty('gbr-features', 'visibility', 'visible');
    }


}

// locations to fly to

var locations = {
    'Intro1': {
        bearing: 0,
        center: [145, -19],
        zoom: 3.3,
        pitch: 0,
        speed: 0.5
    },
    'Intro2': {
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
        center: [144, -14],
        zoom: 8,
        pitch: 0.2,
        speed: 0.8
    },
    '2017': {
        bearing: 0,
        center: [147.60, -18.24],
        zoom: 4.6,
        pitch: 0,
        speed: 0.8
    },

}