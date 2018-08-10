console.log('main.js');

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxlamFuZHJvY2xvc2UiLCJhIjoiY2prYTFkODU1MDhidzN2cWp1bmFseGxoZSJ9.HeAugAVJ8wr3NHFCOnkn-Q';
const map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
  center: [2.15899, 41.38879],
  zoom: 14 // starting zoom
});

//Route
map.on('load', function() {
  getRoute();
});

function getRoute() {
  console.log('routes started')
  var start = [2.15899, 41.38879];
  var end = [2.18606, 41.36890];
  var directionsRequest = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?geometries=geojson&access_token=' + mapboxgl.accessToken;
  $.ajax({
    method: 'GET',
    url: directionsRequest,
  }).done(function(data) {
    var route = data.routes[0].geometry;
    map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: route
        }
      },
      paint: {
        'line-width': 2
      }
    });
    // this is where the code from the next step will go
  });
}