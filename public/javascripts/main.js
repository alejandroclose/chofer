console.log("main.js");

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWxlamFuZHJvY2xvc2UiLCJhIjoiY2prYTFkODU1MDhidzN2cWp1bmFseGxoZSJ9.HeAugAVJ8wr3NHFCOnkn-Q";
const map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/mapbox/streets-v9", // stylesheet location
  center: [2.15899, 41.38879],
  zoom: 14 // starting zoom
});

//Forward Geocoding
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken
})
// geocoder.on('result', (data)=>{
//   console.log(data);
//   document.getElementById('latitude').value = data.result.center[1];
//   document.getElementById('longitude').value = data.result.center[0];
// });
map.addControl(geocoder);
document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

//Route
map.on("load", () => {
  getRoute();
});

function getRoute() {
  console.log("routes started");
  var start = [2.15899, 41.38879];
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
