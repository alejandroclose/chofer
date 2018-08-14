console.log("main.js");

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWxlamFuZHJvY2xvc2UiLCJhIjoiY2prYTFkODU1MDhidzN2cWp1bmFseGxoZSJ9.HeAugAVJ8wr3NHFCOnkn-Q";


  navigator.geolocation.getCurrentPosition(position => {
    const point = [position.coords.longitude, position.coords.latitude];
    var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
      center: point, // starting position [lng, lat]
      zoom: 14 // starting zoom
    });
    var marker = new mapboxgl.Marker()
    .setLngLat(point)
    .addTo(map);

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken
    })
    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

const startLatLong = [position.coords.longitude, position.coords.latitude]; 

//Route
map.on("load", () => {
  getRoute();
});

function getRoute() {
  console.log("routes started");
  var start = startLatLong;
  var end = [2.18606, 41.3689];
  var directionsRequest =
    "https://api.mapbox.com/directions/v5/mapbox/driving-traffic/" +
    start[0] +
    "," +
    start[1] +
    ";" +
    end[0] +
    "," +
    end[1] +
    "?steps=true&geometries=geojson&access_token=" +
    mapboxgl.accessToken;
  $.ajax({
    method: "GET",
    url: directionsRequest
  }).done(function(data) {
    var route = data.routes[0].geometry;
    var instructions = document.getElementById("instructions");
    var steps = data.routes[0].legs[0].steps;
    steps.forEach(function(step) {
      instructions.insertAdjacentHTML(
        "beforeend",
        "<p>" + step.maneuver.instruction + "</p>"
      );
    });
    map.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: route
        }
      },
      paint: {
        "line-width": 3
      }
    });
    map.addLayer({
      id: "start",
      type: "circle",
      source: {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: start
          }
        }
      }
    });
    map.addLayer({
      id: "end",
      type: "circle",
      source: {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: end
          }
        }
      }
    });
  });
}
}, (error) => {
  console.error('No puedo obtener la locaclización', error);
})
